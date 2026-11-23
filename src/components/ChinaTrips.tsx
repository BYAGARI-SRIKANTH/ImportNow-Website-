import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Building2,
  Calendar,
  Factory,
  FileText,
  Languages,
  MapPin,
  Utensils,
} from 'lucide-react';
import {
  CANTON_FAIR_IMAGE,
  TRIP_CITIES,
  TRIP_INCLUSIONS,
} from '../data/importNowData';

interface ChinaTripsProps {
  onSelectTripQuote: () => void;
}

const INCLUSION_ICONS = {
  file: FileText,
  building: Building2,
  utensils: Utensils,
  languages: Languages,
  factory: Factory,
  mappin: MapPin,
};

export function ChinaTrips({ onSelectTripQuote }: ChinaTripsProps) {
  return (
    <section id="trips" className="py-20 lg:py-28 bg-[#F8FAFC] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#EA580C]">
            Business trips to China
          </p>
          <h2 className="mt-3 font-display font-extrabold text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.1] tracking-[-0.025em] text-[#0B132B]">
            Your business trip doesn&apos;t have to{' '}
            <span className="bg-gradient-to-r from-[#EA580C] to-[#F97316] bg-clip-text text-transparent">
              feel like work.
            </span>
          </h2>
          <p className="mt-4 text-[17px] leading-[1.65] text-slate-600">
            Guided trips to the Canton Fair, wholesale markets and factories you choose. Our clients
            often tell us it felt like a personal trip, not a business tour.
          </p>
        </div>

        {/* Bento-style Asymmetric Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Dominant Hero Image Card */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-12 relative rounded-2xl overflow-hidden min-h-[340px] sm:min-h-[380px] flex items-end bg-[#0B132B]"
          >
            <img
              src={CANTON_FAIR_IMAGE}
              alt="Guangzhou skyline and Canton Fair Pazhou exhibition center at golden twilight"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Multi-stop dark gradient scrim ensuring crisp text legibility */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#070D1F]/95 via-[#070D1F]/65 to-[#070D1F]/20"
              aria-hidden="true"
            />

            <div className="relative z-10 w-full p-7 sm:p-10 lg:p-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#FB923C]">
                  Canton Fair · Guangzhou
                </p>
                <h3 className="mt-2.5 font-display font-extrabold text-[clamp(1.65rem,3vw,2.45rem)] leading-[1.12] tracking-[-0.02em] text-white">
                  Meet factories face to face. We handle everything else.
                </h3>
                <p className="mt-3.5 text-[16px] leading-[1.65] text-slate-200 max-w-xl">
                  Walk the world&apos;s biggest trade fair with a guide who speaks the language,
                  then visit the factories you shortlist.
                </p>
              </div>

              {/* Clean typographic destination strip (zero pill clutter) */}
              <div className="lg:text-right">
                <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-slate-300 mb-2">
                  Trip highlights &amp; markets
                </div>
                <div className="flex flex-wrap lg:justify-end items-center gap-x-2.5 gap-y-1 text-[14px] font-semibold text-white">
                  {TRIP_CITIES.map((city, idx) => (
                    <React.Fragment key={city}>
                      <span>{city}</span>
                      {idx < TRIP_CITIES.length - 1 && (
                        <span className="text-[#F97316]" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>

          {/* What's Included Card */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-8"
          >
            <h3 className="font-display font-bold text-[20px] text-[#0B132B]">
              What&apos;s included
            </h3>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TRIP_INCLUSIONS.map((inc) => {
                const Icon = INCLUSION_ICONS[inc.icon];
                return (
                  <div
                    key={inc.label}
                    className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[14.5px] font-medium text-[#0B132B] leading-snug">
                      {inc.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.article>

          {/* Next Departures Card */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-[20px] text-[#0B132B]">
                  Next departures
                </h3>
                <Calendar className="w-5 h-5 text-[#EA580C]" aria-hidden="true" />
              </div>

              <div className="mt-6 space-y-3.5">
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-[#F8FAFC]">
                  <div>
                    <div className="font-display font-bold text-[16px] text-[#0B132B]">Spring</div>
                    <div className="text-[13.5px] text-slate-600">Canton Fair · April–May</div>
                  </div>
                  <span className="font-mono text-[12px] font-semibold text-[#EA580C]">
                    Guangzhou
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-[#F8FAFC]">
                  <div>
                    <div className="font-display font-bold text-[16px] text-[#0B132B]">Autumn</div>
                    <div className="text-[13.5px] text-slate-600">
                      Canton Fair · October–November
                    </div>
                  </div>
                  <span className="font-mono text-[12px] font-semibold text-[#EA580C]">
                    Guangzhou
                  </span>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              onClick={onSelectTripQuote}
              className="mt-7 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-semibold text-[15px] transition-colors shadow-xs"
            >
              <span>Join the next trip</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
