import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function verifyTurnstile(token: string | undefined, ip: string | undefined): Promise<boolean> {
  if (process.env.NODE_ENV === 'development') return true; // Turnstile rejects localhost — skip in dev
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token, remoteip: ip }),
  });
  const data = await res.json() as { success: boolean };
  return data.success;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      name?: string;
      email?: string;
      message?: string;
      'cf-turnstile-response'?: string;
    };

    const name    = body.name?.trim();
    const email   = body.email?.trim();
    const message = body.message?.trim();
    const token   = body['cf-turnstile-response'];

    // Basic validation
    if (!name || name.length < 2)     return NextResponse.json({ error: 'Name must be at least 2 characters.' }, { status: 400 });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    if (!message || message.length < 10) return NextResponse.json({ error: 'Message must be at least 10 characters.' }, { status: 400 });

    // Turnstile
    const ip = req.headers.get('x-forwarded-for') ?? undefined;
    const captchaOk = await verifyTurnstile(token, ip);
    if (!captchaOk) return NextResponse.json({ error: 'CAPTCHA verification failed. Please refresh and try again.' }, { status: 400 });

    // Save to Payload
    const payload = await getPayload({ config });
    await payload.create({
      collection: 'submissions',
      data: { name, email, message },
      overrideAccess: true,
    });

    // Send notification email via Resend
    const toEmail = process.env.RESEND_TO_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>';

    if (toEmail) {
      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: email,
        subject: `New message from ${name} — thephilcode`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          '',
          message,
        ].join('\n'),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[/api/contact]', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
