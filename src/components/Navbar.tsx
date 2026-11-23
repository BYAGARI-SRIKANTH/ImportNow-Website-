import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data/importNowData';
import { ImportNowLogo } from './BrandPrimitives';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHash, setActiveHash] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(1, Math.max(0, y / docHeight)) : 0);

      // Determine active section
      const sections = NAV_LINKS.map((l) => l.href.replace('#', ''));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            current = `#${id}`;
          }
        }
      }
      setActiveHash(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Top reading progress line */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none origin-left bg-gradient-to-r from-[#EA580C] to-[#F97316]"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      <header
        id="nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_2px_20px_-8px_rgba(11,19,43,0.08)]'
            : 'bg-white/80 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">
          {/* Left: Brand Wordmark */}
          <a
            href="#home"
            onClick={handleLinkClick}
            className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C] rounded-md py-1"
            aria-label="ImportNow home"
          >
            <ImportNowLogo />
          </a>

          {/* Center: Single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {NAV_LINKS.map((item) => {
              const isActive = activeHash === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-[14px] font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-[#EA580C]'
                      : 'text-[#0B132B]/75 hover:text-[#0B132B]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right: Primary CTA + Mobile menu toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white text-[14px] font-semibold whitespace-nowrap transition-colors shadow-xs"
            >
              Get a free quote
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-[#0B132B] hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile navigation drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 shadow-lg px-5 py-4">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`px-3 py-2.5 rounded-lg text-[15px] font-medium transition-colors ${
                    activeHash === item.href
                      ? 'bg-[#FFF7ED] text-[#EA580C]'
                      : 'text-[#0B132B] hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="mt-3 inline-flex items-center justify-center px-4 py-3 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white text-[15px] font-semibold transition-colors"
              >
                Get a free quote
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
