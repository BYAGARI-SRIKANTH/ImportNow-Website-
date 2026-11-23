import React from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Factory,
  ShieldCheck,
  Ship,
  FileCheck2,
  Truck,
} from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/importNowData';

const ICON_MAP: Record<ServiceItem['icon'], React.ComponentType<{ className?: string }>> = {
  search: Search,
  factory: Factory,
  shield: ShieldCheck,
  ship: Ship,
  file: FileCheck2,
  truck: Truck,
};

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#EA580C]">
            End-to-end imports
          </p>
          <h2 className="mt-3 font-display font-extrabold text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.1] tracking-[-0.025em] text-[#0B132B]">
            One team from the{' '}
            <span className="bg-gradient-to-r from-[#EA580C] to-[#F97316] bg-clip-text text-transparent">
              factory floor
            </span>{' '}
            to your front door.
          </h2>
          <p className="mt-4 text-[17px] leading-[1.65] text-slate-600">
            Anyone can say they import from China. What you actually need is a smooth process, clear
            communication and a shipment that arrives safely.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = ICON_MAP[service.icon];
            return (
              <motion.article
                key={service.num}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
                className="group relative rounded-2xl border border-slate-200/90 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#EA580C]/40 hover:shadow-[0_18px_40px_-20px_rgba(11,19,43,0.16)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] border border-[#FFEDD5] text-[#EA580C] flex items-center justify-center transition-colors group-hover:bg-[#EA580C] group-hover:text-white group-hover:border-[#EA580C]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[13px] font-semibold text-slate-400 tabular-nums">
                    {service.num}
                  </span>
                </div>

                <h3 className="mt-6 font-display font-bold text-[19px] text-[#0B132B] tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.65] text-slate-600">
                  {service.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
