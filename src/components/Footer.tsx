import React from 'react';
import { Instagram, Phone } from 'lucide-react';
import {
  BLOG_ARTICLES,
  BlogArticle,
  CONTACT_INFO,
  SERVICES,
} from '../data/importNowData';
import { ImportNowLogo, WhatsAppIcon } from './BrandPrimitives';

interface FooterProps {
  onOpenArticle: (article: BlogArticle) => void;
  onOpenAllArticles: () => void;
}

const IMPORT_LINKS = [
  { label: 'Furniture & interiors', href: '#products' },
  { label: 'Electronics & tech', href: '#products' },
  { label: 'EV & automotive', href: '#products' },
  { label: 'Lighting', href: '#products' },
  { label: 'Supermarket goods', href: '#products' },
  { label: 'Canton Fair trips', href: '#trips' },
];

export function Footer({ onOpenArticle, onOpenAllArticles }: FooterProps) {
  return (
    <>
      <footer className="bg-[#0B132B] text-slate-300 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Brand column */}
            <div className="lg:col-span-3">
              <a href="#home" aria-label="ImportNow home">
                <ImportNowLogo light />
              </a>
              <p className="mt-4 text-[14.5px] leading-[1.65] text-slate-400">
                End-to-end imports from China to India: sourcing, factory inspection, shipping and
                customs. Save time. Reduce costs.
              </p>

              <div className="mt-6 flex items-center gap-2.5">
                <a
                  href={CONTACT_INFO.instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-lg border border-white/15 bg-white/5 hover:bg-[#EA580C] hover:border-[#EA580C] text-white flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={CONTACT_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-lg border border-white/15 bg-white/5 hover:bg-[#16A34A] hover:border-[#16A34A] text-white flex items-center justify-center transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
                <a
                  href={CONTACT_INFO.phoneHref}
                  aria-label="Call ImportNow"
                  className="w-10 h-10 rounded-lg border border-white/15 bg-white/5 hover:bg-[#EA580C] hover:border-[#EA580C] text-white flex items-center justify-center transition-colors"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Our services */}
            <div className="lg:col-span-2">
              <h4 className="font-display font-bold text-[14px] uppercase tracking-[0.08em] text-white">
                Our services
              </h4>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                {SERVICES.map((svc) => (
                  <li key={svc.num}>
                    <a
                      href="#services"
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {svc.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* What we import */}
            <div className="lg:col-span-2">
              <h4 className="font-display font-bold text-[14px] uppercase tracking-[0.08em] text-white">
                What we import
              </h4>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                {IMPORT_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Import guides */}
            <div className="lg:col-span-3">
              <h4 className="font-display font-bold text-[14px] uppercase tracking-[0.08em] text-white">
                Import guides
              </h4>
              <ul className="mt-4 space-y-2.5 text-[13.5px] leading-snug">
                {BLOG_ARTICLES.map((article) => (
                  <li key={article.slug}>
                    <button
                      type="button"
                      onClick={() => onOpenArticle(article)}
                      className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {article.title}
                    </button>
                  </li>
                ))}
                <li className="pt-1">
                  <button
                    type="button"
                    onClick={onOpenAllArticles}
                    className="font-semibold text-[#FB923C] hover:text-[#FDBA74] transition-colors cursor-pointer"
                  >
                    All articles →
                  </button>
                </li>
              </ul>
            </div>

            {/* Get in touch */}
            <div className="lg:col-span-2">
              <h4 className="font-display font-bold text-[14px] uppercase tracking-[0.08em] text-white">
                Get in touch
              </h4>
              <ul className="mt-4 space-y-3.5 text-[13.5px]">
                <li>
                  <div className="text-white font-semibold">Call / WhatsApp</div>
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="text-slate-400 hover:text-white transition-colors tabular-nums"
                  >
                    {CONTACT_INFO.phoneDisplay}
                  </a>
                </li>
                <li>
                  <div className="text-white font-semibold">India</div>
                  <div className="text-slate-400">{CONTACT_INFO.indiaOffice}</div>
                </li>
                <li>
                  <div className="text-white font-semibold">China</div>
                  <div className="text-slate-400">{CONTACT_INFO.chinaOffice}</div>
                </li>
                <li>
                  <div className="text-white font-semibold">Instagram</div>
                  <a
                    href={CONTACT_INFO.instagramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {CONTACT_INFO.instagramHandle}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-slate-400">
            <span>© 2026 ImportNow.in · All rights reserved.</span>
            <span>Hyderabad, India · Shanghai, China</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Direct Contact Button */}
      <a
        href={CONTACT_INFO.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat with ImportNow on WhatsApp"
        className="fixed bottom-5 right-5 z-50 w-13 h-13 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white shadow-[0_10px_25px_-5px_rgba(22,163,74,0.55)] flex items-center justify-center transition-transform duration-200 hover:scale-105"
      >
        <WhatsAppIcon className="w-6 h-6" />
      </a>
    </>
  );
}
