import React from 'react';
import { motion } from 'motion/react';
import {
  Armchair,
  Smartphone,
  Bike,
  Lightbulb,
  ShoppingCart,
  Cog,
  ArrowUpRight,
} from 'lucide-react';
import { PRODUCT_HUBS, ProductHub } from '../data/importNowData';
import { FlagCN } from './BrandPrimitives';

interface ProductCategoriesProps {
  onSelectCategory: (category: string) => void;
}

const HUB_ICONS: Record<ProductHub['icon'], React.ComponentType<{ className?: string }>> = {
  sofa: Armchair,
  smartphone: Smartphone,
  bike: Bike,
  lightbulb: Lightbulb,
  cart: ShoppingCart,
  cog: Cog,
};

export function ProductCategories({ onSelectCategory }: ProductCategoriesProps) {
  return (
    <section id="products" className="py-20 lg:py-28 bg-[#F8FAFC] border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#EA580C]">
            What we import
          </p>
          <h2 className="mt-3 font-display font-extrabold text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.1] tracking-[-0.025em] text-[#0B132B]">
            China has a market for every industry.{' '}
            <span className="bg-gradient-to-r from-[#EA580C] to-[#F97316] bg-clip-text text-transparent">
              We know each one.
            </span>
          </h2>
          <p className="mt-4 text-[17px] leading-[1.65] text-slate-600">
            Each industry has its own manufacturing hub. We take you straight to the source.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCT_HUBS.map((item, idx) => {
            const Icon = HUB_ICONS[item.icon];
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.06 }}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#EA580C]/40 hover:shadow-[0_18px_40px_-20px_rgba(11,19,43,0.16)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-slate-500">
                      <FlagCN className="w-4 h-2.5 rounded-[1.5px]" />
                      <span>{item.hub}</span>
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200/80 text-[#0B132B]/70 flex items-center justify-center group-hover:text-[#EA580C] group-hover:border-[#FFEDD5] group-hover:bg-[#FFF7ED] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="mt-5 font-display font-bold text-[20px] text-[#0B132B] tracking-tight">
                    {item.title}
                  </h3>

                  <ul className="mt-4 space-y-2.5">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-[14.5px] leading-[1.55] text-slate-600"
                      >
                        <span
                          className="mt-2 w-1.5 h-1.5 rounded-full bg-[#EA580C] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <p className="text-[13px] font-semibold text-[#0B132B] leading-snug">
                    {item.highlight}
                  </p>
                  <a
                    href="#contact"
                    onClick={() => onSelectCategory(item.quoteCategory)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:border-[#EA580C] hover:bg-[#EA580C] hover:text-white transition-colors shrink-0"
                    aria-label={`Request quote for ${item.title}`}
                    title={`Get a quote for ${item.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
