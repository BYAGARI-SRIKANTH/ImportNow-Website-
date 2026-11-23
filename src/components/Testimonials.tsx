import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/importNowData';

export function Testimonials() {
  return (
    <section id="stories" className="py-20 lg:py-28 bg-[#F8FAFC] border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#EA580C]">
            Client stories
          </p>
          <h2 className="mt-3 font-display font-extrabold text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.1] tracking-[-0.025em] text-[#0B132B]">
            Heard from the people{' '}
            <span className="bg-gradient-to-r from-[#EA580C] to-[#F97316] bg-clip-text text-transparent">
              who made the trip.
            </span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-7 h-7 text-[#EA580C]/35 mb-4" aria-hidden="true" />
                <p className="text-[15.5px] leading-[1.7] text-[#0B132B]/90">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="mt-7 pt-5 border-t border-slate-100 flex items-center gap-3.5">
                <span className="w-11 h-11 rounded-full bg-[#0B132B] text-white font-display font-bold text-[14px] flex items-center justify-center shrink-0">
                  {item.initials}
                </span>
                <div>
                  <div className="font-display font-bold text-[15px] text-[#0B132B]">
                    {item.name}
                  </div>
                  <div className="text-[13px] text-slate-500">{item.role}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
