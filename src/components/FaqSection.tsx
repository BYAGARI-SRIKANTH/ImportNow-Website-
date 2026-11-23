import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/importNowData';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First question open by default matching original HTML

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#F8FAFC] border-y border-slate-200/80">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#EA580C]">
            Questions
          </p>
          <h2 className="mt-3 font-display font-extrabold text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.1] tracking-[-0.025em] text-[#0B132B]">
            Before you import
          </h2>
        </div>

        <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200 bg-white rounded-2xl px-6 sm:px-8 shadow-[0_6px_24px_-14px_rgba(11,19,43,0.08)]">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${idx}`;
            const buttonId = `faq-btn-${idx}`;

            return (
              <div key={faq.question} className="py-5">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                >
                  <span className="font-display font-bold text-[17px] text-[#0B132B] group-hover:text-[#EA580C] transition-colors">
                    {faq.question}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen
                        ? 'bg-[#EA580C] border-[#EA580C] text-white rotate-180'
                        : 'bg-slate-50 border-slate-200 text-slate-600 group-hover:border-[#EA580C]/40'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[15.5px] leading-[1.7] text-slate-600 pr-10 pb-1">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
