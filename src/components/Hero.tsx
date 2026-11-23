import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { HERO_STATS, ROUTE_MARQUEE } from '../data/importNowData';
import { FlagCN, FlagIN } from './BrandPrimitives';
import { HeroGlobeCanvas } from './HeroGlobeCanvas';

export function Hero() {
  return (
    <section
      id="home"
      className="relative bg-white pt-[76px] overflow-x-clip border-b border-slate-100"
    >
      {/* Subtle atmospheric sky-blue ambient glow behind the right globe */}
      <div
        className="pointer-events-none absolute -top-12 right-0 w-[680px] h-[680px] rounded-full opacity-50"
        style={{
          background:
            'radial-gradient(circle, rgba(96,165,250,0.14) 0%, rgba(59,130,246,0.05) 45%, transparent 72%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-6 pb-10 lg:pt-8 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left column: Proposition, CTAs, and Verified Statistics */}
          <div className="lg:col-span-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-wide text-[#0B132B]/80 mb-4"
            >
              <span className="inline-flex items-center gap-1.5">
                <FlagCN />
                <span className="text-[#EA580C] font-bold" aria-hidden="true">
                  →
                </span>
                <FlagIN />
              </span>
              <span className="text-slate-300" aria-hidden="true">
                ·
              </span>
              <span>Trusted by 500+ Indian businesses</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="font-display font-extrabold text-[#0B132B] tracking-[-0.03em] leading-[1.06] text-[clamp(2.25rem,4.1vw,3.7rem)] max-w-xl"
            >
              Import directly from China.{' '}
              <span className="bg-gradient-to-r from-[#EA580C] via-[#F97316] to-[#D97706] bg-clip-text text-transparent">
                Without the guesswork.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-5 text-[16.5px] sm:text-[17.5px] leading-[1.65] text-slate-600 max-w-xl"
            >
              Sourcing, factory inspection, shipping and customs, handled end to end by a team with
              its own company in Shanghai. You choose the product. We bring it to your door.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-7 flex flex-wrap items-center gap-3.5"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-semibold text-[15px] transition-colors shadow-sm"
              >
                <span>Get a free sourcing quote</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#journey"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-slate-300 hover:border-[#0B132B] text-[#0B132B] font-semibold text-[15px] transition-colors bg-white"
              >
                See how it works
              </a>
            </motion.div>

            {/* Key Statistics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="mt-10 pt-7 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-5"
            >
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-extrabold text-[24px] sm:text-[26px] tracking-tight text-[#0B132B] tabular-nums leading-none">
                    {stat.value}
                  </div>
                  <div className="mt-1.5 text-[12.5px] leading-snug text-slate-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column: Large Photorealistic 3D Earth Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-6 relative h-[360px] sm:h-[460px] lg:h-[580px] xl:h-[630px] lg:-mr-6 xl:-mr-12 w-full flex items-center justify-center"
          >
            <HeroGlobeCanvas />
          </motion.div>
        </div>

        {/* Subtle scroll cue */}
        <div className="hidden lg:flex justify-center mt-2">
          <a
            href="#services"
            className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-slate-400 hover:text-[#0B132B] transition-colors"
          >
            <span>Scroll</span>
            <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Continuous Shipping Corridor Marquee */}
      <div
        className="w-full overflow-hidden border-t border-slate-200 bg-[#F8FAFC] py-3.5 select-none"
        aria-label="Active China to India import corridors"
      >
        <div className="animate-marquee">
          {[...ROUTE_MARQUEE, ...ROUTE_MARQUEE].map((route, index) => (
            <div
              key={`${route.from}-${route.to}-${index}`}
              className="inline-flex items-center gap-2.5 mx-6 text-[13px] font-semibold text-[#0B132B]/80 whitespace-nowrap"
            >
              <span>{route.from}</span>
              <span className="text-[#EA580C] font-bold" aria-hidden="true">
                →
              </span>
              <span>{route.to}</span>
              <span className="ml-6 text-slate-300" aria-hidden="true">
                ·
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
