import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, X } from 'lucide-react';
import { BLOG_ARTICLES, BlogArticle } from '../data/importNowData';
import { FlagCN, FlagIN } from './BrandPrimitives';

interface ArticleModalProps {
  isOpen: boolean;
  article: BlogArticle | null; // null shows "All articles" directory
  onClose: () => void;
  onSelectArticle: (article: BlogArticle | null) => void;
}

export function ArticleModal({
  isOpen,
  article,
  onClose,
  onSelectArticle,
}: ArticleModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-[#070D1F]/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label={article ? article.title : 'ImportNow Import Guides'}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[88vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-[#F8FAFC]">
          {article ? (
            <button
              type="button"
              onClick={() => onSelectArticle(null)}
              className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-600 hover:text-[#0B132B] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All import guides</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 text-[14px] font-display font-bold text-[#0B132B]">
              <BookOpen className="w-4 h-4 text-[#EA580C]" />
              <span>ImportNow Guides &amp; Playbooks ({BLOG_ARTICLES.length})</span>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {article ? (
            <div>
              <div className="flex flex-wrap items-center gap-2.5 text-[12.5px] font-semibold text-slate-500">
                <span className="text-[#EA580C] uppercase tracking-[0.12em]">
                  {article.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{article.date}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
              </div>

              <h2 className="mt-3 font-display font-extrabold text-[24px] sm:text-[30px] leading-[1.18] tracking-tight text-[#0B132B]">
                {article.title}
              </h2>

              <p className="mt-4 text-[16px] leading-[1.7] text-slate-600 border-b border-slate-200 pb-6">
                {article.excerpt}
              </p>

              <div className="mt-6 space-y-6">
                {article.sections.map((sec) => (
                  <div key={sec.heading}>
                    <h3 className="font-display font-bold text-[18px] text-[#0B132B]">
                      {sec.heading}
                    </h3>
                    <p className="mt-2 text-[15.5px] leading-[1.75] text-slate-600">{sec.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-xl bg-[#0B132B] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-display font-bold text-[17px]">
                    Ready to source from China?
                  </div>
                  <p className="mt-1 text-[14px] text-slate-300">
                    Share your product and quantity for free supplier options and landed costs.
                  </p>
                </div>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-semibold text-[14px] whitespace-nowrap transition-colors"
                >
                  <span>Get a free quote</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {BLOG_ARTICLES.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => onSelectArticle(item)}
                  className="w-full text-left p-5 rounded-xl border border-slate-200 hover:border-[#EA580C]/50 hover:bg-[#FFF7ED]/30 transition-all cursor-pointer group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[12px] font-semibold">
                    <span className="uppercase tracking-[0.12em] text-[#EA580C]">
                      {item.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-slate-500">
                      <FlagCN className="w-3.5 h-2.5 rounded-[1.5px]" />
                      <span aria-hidden="true">→</span>
                      <FlagIN className="w-3.5 h-2.5 rounded-[1.5px]" />
                      <span className="ml-1">{item.readTime}</span>
                    </span>
                  </div>
                  <h3 className="mt-2 font-display font-bold text-[17px] text-[#0B132B] group-hover:text-[#EA580C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">
                    {item.excerpt}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
