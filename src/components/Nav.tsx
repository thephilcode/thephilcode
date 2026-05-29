'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SECTION_LINKS = [
  { label: 'About',   hash: 'about' },
  { label: 'Contact', hash: 'contact' },
];

export default function Nav() {
  const [scrolled, setScrolled]    = useState(false);
  const [menuOpen, setMenuOpen]    = useState(false);
  const [activeSection, setActive] = useState('');
  const pathname = usePathname();
  const isHome = pathname === '/';

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
    if (!isHome) return;
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) current = section.id;
    });
    setActive(current);
  }, [isHome]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!isHome) return; // let href="/#hash" navigate normally
    e.preventDefault();
    const target = document.querySelector(`#${hash}`);
    if (!target) return;
    const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const isWorkActive = pathname.startsWith('/projects');
  const isBlogActive = pathname.startsWith('/blog');

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} aria-label="Primary navigation">
        <div className="container">
          <div className="nav__inner">
            <Link href="/" className="nav__logo" aria-label="thephilcode — home">
              THEPHILCODE
            </Link>

            <ul className="nav__links" role="list">
              <li>
                <Link
                  href="/projects"
                  className={`nav__link${isWorkActive ? ' active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className={`nav__link${isBlogActive ? ' active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
              {SECTION_LINKS.map(({ label, hash }) => (
                <li key={hash}>
                  <a
                    href={`${isHome ? '' : '/'}#${hash}`}
                    className={`nav__link${activeSection === hash ? ' active' : ''}`}
                    onClick={e => handleAnchorClick(e, hash)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <button
              className={`nav__hamburger${menuOpen ? ' open' : ''}`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(prev => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`nav__overlay${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <Link
          href="/projects"
          className={`nav__link${isWorkActive ? ' active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Work
        </Link>
        <Link
          href="/blog"
          className={`nav__link${isBlogActive ? ' active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Blog
        </Link>
        {SECTION_LINKS.map(({ label, hash }) => (
          <a
            key={hash}
            href={`${isHome ? '' : '/'}#${hash}`}
            className="nav__link"
            onClick={e => handleAnchorClick(e, hash)}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  );
}
