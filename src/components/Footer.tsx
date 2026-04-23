import ScrollReveal from './animations/ScrollReveal';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <ScrollReveal>
          <div className="footer__inner">
            <p className="footer__copy">
              &copy; {new Date().getFullYear()} Ayo Philip Odongo. All rights reserved.
            </p>
            <a href="#hero" className="footer__back-top" aria-label="Back to top">
              Back to top
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path
                  d="M5 9V1M1 5l4-4 4 4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
