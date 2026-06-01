import { ImageResponse } from 'next/og';
import { getPayload } from 'payload';
import config from '@payload-config';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  });

  const post = result.docs[0];
  const title = post?.title ?? 'Blog';
  const excerpt = post?.excerpt ?? '';
  const date = post?.publishedAt
    ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(post.publishedAt))
    : '';

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#0B0B0B',
          display: 'flex',
          position: 'relative',
          fontFamily: 'sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Blueprint grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(46,46,46,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(46,46,46,0.3) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Left green accent panel */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 6,
            background: '#0F2318',
            borderRight: '1px solid rgba(198,168,92,0.2)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '56px 64px 56px 80px',
            width: '100%',
          }}
        >
          {/* Top — Design 3 style */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 8, height: 8, background: '#C6A85C', borderRadius: '50%' }} />
            <span style={{ color: '#C6A85C', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              thephilcode
            </span>
          </div>

          {/* Title block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ color: '#FFFFFF', fontSize: 52, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: 860 }}>
              {title}
            </div>
            {excerpt && (
              <div style={{ color: '#555555', fontSize: 18, lineHeight: 1.6, maxWidth: 680 }}>
                {excerpt}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              {date && (
                <>
                  <span style={{ color: '#2E2E2E', fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                    {date}
                  </span>
                  <span style={{ color: '#2E2E2E', fontSize: 11, fontFamily: 'monospace' }}>·</span>
                </>
              )}
              <span style={{ color: '#2E2E2E', fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                Blog Post
              </span>
            </div>
            <span style={{ color: '#C6A85C', fontSize: 12, letterSpacing: '0.15em' }}>
              thephilcode.vercel.app
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
