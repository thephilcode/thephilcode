'use client';

import { useState } from 'react';
import RevealWrapper from './RevealWrapper';

const SOCIAL_LINKS = [
  {
    label: 'github.com/thephilcode',
    href: 'https://github.com/thephilcode',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'linkedin.com/in/philipayo',
    href: 'https://linkedin.com/in/philipayo',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'linktr.ee/philipayo',
    href: 'https://linktr.ee/philipayo',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.073 3.573L16.57 0l-3.497 3.573zm-2.148 0L7.43 0l3.496 3.573zM12 7.927l-5.498-5.5L4 4.931l5.498 5.498H4v2.143h5.498L4 18.07l2.502 2.502L12 15.075l5.498 5.497L20 18.07l-5.498-5.498H20v-2.143h-5.498L20 4.93l-2.502-2.504z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const form = e.currentTarget;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        form.reset();
        setStatus('success');
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        const data = await res.json().catch(() => ({}));
        const msg: string =
          (data as { errors?: { message: string }[] })?.errors?.map(err => err.message).join(', ') ||
          'Something went wrong. Please try again.';
        setErrorMsg(msg);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 6000);
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    }
  }

  return (
    <section id="contact" className="section" aria-label="Contact">
      <div className="container">
        <header className="section__header">
          <p className="section-label">// Contact</p>
          <div className="divider" />
          <h2 className="section-title">Get in Touch</h2>
        </header>

        <div className="contact__inner">
          {/* Left — intro + social */}
          <div>
            <RevealWrapper>
              <p className="contact__intro">
                Open to freelance work, collaborations, and interesting problems. Send a message
                and I&apos;ll get back to you.
              </p>
            </RevealWrapper>

            <RevealWrapper delay={80}>
              <ul className="contact__social-list" role="list">
                {SOCIAL_LINKS.map(({ label, href, icon }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact__social"
                    >
                      <span className="contact__social-icon">{icon}</span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </RevealWrapper>
          </div>

          {/* Right — Formspree form */}
          <RevealWrapper delay={160}>
            <form
              className="form"
              action="https://formspree.io/f/xzdkvkzl"
              method="POST"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="form__group">
                <label htmlFor="name" className="form__label">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="form__input"
                  placeholder="Your name"
                  required
                  autoComplete="name"
                />
              </div>

              <div className="form__group">
                <label htmlFor="email" className="form__label">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form__input"
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="form__group">
                <label htmlFor="message" className="form__label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form__textarea"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              {status === 'success' && (
                <p className="form__status success" role="status">
                  Message sent. I&apos;ll be in touch.
                </p>
              )}
              {status === 'error' && (
                <p className="form__status error" role="alert">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'sending'}
                style={{ alignSelf: 'flex-start' }}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
