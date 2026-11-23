import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Armchair,
  Bike,
  Plane,
  Route,
  Store,
} from 'lucide-react';
import { BLOG_ARTICLES, BlogArticle } from '../data/importNowData';
import { FlagCN, FlagIN } from './BrandPrimitives';

interface BlogSectionProps {
  onOpenArticle: (article: BlogArticle) => void;
  onOpenAllArticles: () => void;
}

const COVER_ICONS: Record<BlogArticle['icon'], React.ComponentType<{ className?: string }>> = {
  route: Route,
  market: Store,
  sofa: Armchair,
  ev: Bike,
  plane: Plane,
};

export function BlogSection({ onOpenArticle, onOpenAllArticles }: BlogSectionProps) {
  const featured = BLOG_ARTICLES.filter((a) => a.featured);

  return (
    <section id="guides" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#EA580C]">
              Import guides
            </p>
            <h2 className="mt-3 font-display font-extrabold text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.1] tracking-[-0.025em] text-[#0B132B]">
              Learn before you import.
            </h2>
            <p className="mt-3.5 text-[17px] leading-[1.65] text-slate-600">
              Practical guides on sourcing, shipping, customs and business ideas from China.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenAllArticles}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-300 hover:border-[#0B132B] text-[#0B132B] font-semibold text-[14.5px] transition-colors bg-white whitespace-nowrap cursor-pointer"
          >
            <span>View all articles</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((article, idx) => {
            const Icon = COVER_ICONS[article.icon];
            return (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group rounded-2xl border border-slate-200/90 bg-white overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-[#EA580C]/40 hover:shadow-[0_18px_40px_-20px_rgba(11,19,43,0.16)]"
              >
                {/* Cover banner */}
                <button
                  type="button"
                  onClick={() => onOpenArticle(article)}
                  className={`relative aspect-[16/10] w-full text-left overflow-hidden bg-gradient-to-br ${article.coverTone} p-6 flex flex-col justify-between cursor-pointer`}
                >
                  {article.coverImage && (
                    <>
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#070D1F]/90 via-[#070D1F]/55 to-[#070D1F]/30"
                        aria-hidden="true"
                      />
                    </>
                  )}

                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#FB923C]">
                      {article.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-white/80 text-[11px]">
                      <FlagCN className="w-3.5 h-2.5 rounded-[1.5px]" />
                      <span aria-hidden="true">→</span>
                      <FlagIN className="w-3.5 h-2.5 rounded-[1.5px]" />
                    </span>
                  </div>

                  <div className="relative z-10 flex items-end justify-between gap-4">
                    <span className="font-display font-bold text-[18px] leading-snug text-white line-clamp-2">
                      {article.shortTitle}
                    </span>
                    <Icon
                      className="w-8 h-8 text-white/25 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#FB923C]/70"
                      aria-hidden="true"
                    />
                  </div>
                </button>

                {/* Article details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[12.5px] font-medium text-slate-500">
                      <span>{article.date}</span>
                      <span className="text-slate-300" aria-hidden="true">
                        ·
                      </span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="mt-2.5 font-display font-bold text-[18px] leading-snug text-[#0B132B] group-hover:text-[#EA580C] transition-colors">
                      <button
                        type="button"
                        onClick={() => onOpenArticle(article)}
                        className="text-left cursor-pointer"
                      >
                        {article.title}
                      </button>
                    </h3>

                    <p className="mt-2.5 text-[14.5px] leading-[1.6] text-slate-600">
                      {article.excerpt}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenArticle(article)}
                    className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#EA580C] hover:text-[#C2410C] transition-colors cursor-pointer self-start"
                  >
                    <span>Read more</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
