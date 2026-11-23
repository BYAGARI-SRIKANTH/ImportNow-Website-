import React from 'react';
import { motion } from 'motion/react';
import { Check, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO, SHANGHAI_CHECKS } from '../data/importNowData';

export function ShanghaiOffice() {
  return (
    <section id="shanghai" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left column: Officially in China narrative & 4 verified checks */}
          <div className="lg:col-span-6">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#EA580C]">
              Officially in China
            </p>
            <h2 className="mt-3 font-display font-extrabold text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.08] tracking-[-0.025em] text-[#0B132B]">
              Many claim an office in China.{' '}
              <span className="bg-gradient-to-r from-[#EA580C] to-[#F97316] bg-clip-text text-transparent">
                We have the licence.
              </span>
            </h2>
            <p className="mt-5 text-[17px] leading-[1.68] text-slate-600">
              ImportNow operates through its own registered company in Shanghai,{' '}
              <strong className="font-semibold text-[#0B132B]">
                {CONTACT_INFO.chinaCompany}
              </strong>{' '}
              That means we can sign contracts with factories, pay suppliers locally and stand
              behind every order.
            </p>

            <ul className="mt-8 space-y-4">
              {SHANGHAI_CHECKS.map((item, idx) => (
                <motion.li
                  key={item.lead}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className="flex items-start gap-3.5"
                >
                  <span className="mt-0.5 w-6 h-6 rounded-md bg-[#FFF7ED] border border-[#FFEDD5] text-[#EA580C] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.75]" />
                  </span>
                  <div className="text-[15.5px] leading-[1.55] text-slate-600">
                    <strong className="font-semibold text-[#0B132B]">{item.lead}</strong>{' '}
                    {item.detail}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right column: Official Shanghai Business Licence card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[490px] rounded-2xl p-[10px] bg-gradient-to-br from-[#0B132B] via-[#1E293B] to-[#0B132B] shadow-[0_28px_60px_-24px_rgba(11,19,43,0.38)]">
              <div className="license-paper relative rounded-xl border border-amber-900/20 p-7 sm:p-9 overflow-hidden">
                {/* Decorative corner filigree borders */}
                <div
                  className="pointer-events-none absolute inset-3 rounded-lg border border-amber-800/20"
                  aria-hidden="true"
                />

                <div className="relative z-10 text-center pb-5 border-b border-amber-900/15">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-900/10 text-[#B45309] mb-3">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-[28px] sm:text-[32px] font-bold tracking-[0.22em] text-[#7C2D12] leading-none">
                    营业执照
                  </div>
                  <div className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-900/75">
                    BUSINESS LICENCE
                  </div>
                </div>

                <dl className="relative z-10 mt-6 space-y-4 text-[14px]">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-3">
                    <dt className="sm:col-span-3 font-mono text-[11px] uppercase tracking-[0.12em] text-amber-900/65 pt-0.5">
                      Company
                    </dt>
                    <dd className="sm:col-span-9 font-display font-bold text-[#0B132B]">
                      {CONTACT_INFO.chinaCompany}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-3">
                    <dt className="sm:col-span-3 font-mono text-[11px] uppercase tracking-[0.12em] text-amber-900/65 pt-0.5">
                      Location
                    </dt>
                    <dd className="sm:col-span-9 font-medium text-[#0B132B]/90">
                      Shanghai, People&apos;s Republic of China
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-3">
                    <dt className="sm:col-span-3 font-mono text-[11px] uppercase tracking-[0.12em] text-amber-900/65 pt-0.5">
                      Scope
                    </dt>
                    <dd className="sm:col-span-9 font-medium text-[#0B132B]/90">
                      Supply chain, sourcing &amp; international trade
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-3">
                    <dt className="sm:col-span-3 font-mono text-[11px] uppercase tracking-[0.12em] text-amber-900/65 pt-0.5">
                      Serving
                    </dt>
                    <dd className="sm:col-span-9 font-medium text-[#0B132B]/90">
                      Importers across India
                    </dd>
                  </div>
                </dl>

                {/* Bottom verification block: QR matrix + Official red company seal */}
                <div className="relative z-10 mt-8 pt-5 border-t border-amber-900/15 flex items-end justify-between gap-4">
                  {/* Crisp geometric verification matrix */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 p-1.5 rounded bg-white border border-amber-900/20 grid grid-cols-5 grid-rows-5 gap-[2px]"
                      aria-hidden="true"
                    >
                      {[
                        1, 1, 1, 0, 1,
                        1, 0, 1, 1, 0,
                        1, 1, 0, 1, 1,
                        0, 1, 1, 0, 1,
                        1, 0, 1, 1, 1,
                      ].map((bit, i) => (
                        <span
                          key={i}
                          className={bit ? 'bg-[#0B132B]' : 'bg-transparent'}
                        />
                      ))}
                    </div>
                    <div className="text-[11px] leading-tight text-amber-950/65 font-mono">
                      <div>SHANGHAI</div>
                      <div>REGISTERED ENTITY</div>
                    </div>
                  </div>

                  {/* Official Red Stamp */}
                  <div className="seal-stamp w-24 h-24 rounded-full flex items-center justify-center text-center -rotate-12 bg-red-600/[0.04] select-none shrink-0">
                    <span className="font-mono text-[9px] font-bold leading-[1.35] tracking-[0.06em] text-[#C42424]">
                      SHANGHAI
                      <br />
                      SHENGQIAO
                      <br />
                      TRADING
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
