import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, Check, ChevronLeft, ChevronRight, Ship } from 'lucide-react';
import { JOURNEY_STEPS } from '../data/importNowData';
import { FlagCN, FlagIN } from './BrandPrimitives';
import { JourneySeaCanvas } from './JourneySeaCanvas';

const NAVBAR_HEIGHT = 72;
const TOTAL_STEPS = JOURNEY_STEPS.length;

export function ImportJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<number>(0);

  // Direct DOM refs for 60fps progress bar & day counter updates without React re-renders per pixel
  const fillBarRef = useRef<HTMLDivElement>(null);
  const shipMarkerRef = useRef<HTMLDivElement>(null);
  const dayReadoutRef = useRef<HTMLSpanElement>(null);
  const pctReadoutRef = useRef<HTMLSpanElement>(null);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Detect prefers-reduced-motion dynamically
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Sync visual progress bar & active step index from normalized [0..1] scroll progress
  const applyProgressToUI = useCallback((progress: number) => {
    const clamped = Math.min(1, Math.max(0, progress));
    progressRef.current = clamped;

    const pct = clamped * 100;
    if (fillBarRef.current) {
      fillBarRef.current.style.width = `${pct.toFixed(2)}%`;
    }
    if (shipMarkerRef.current) {
      shipMarkerRef.current.style.left = `${pct.toFixed(2)}%`;
    }
    if (dayReadoutRef.current) {
      const dayNum = Math.max(1, Math.min(34, Math.round(1 + clamped * 33)));
      dayReadoutRef.current.textContent = `Day ${dayNum}`;
    }
    if (pctReadoutRef.current) {
      pctReadoutRef.current.textContent = `${Math.round(pct)}%`;
    }

    const nextStep = Math.min(TOTAL_STEPS - 1, Math.floor(clamped * TOTAL_STEPS));
    setActiveStep((prev) => (prev === nextStep ? prev : nextStep));
  }, []);

  // Scroll listener driving the sticky 3D shipment animation in both directions
  useEffect(() => {
    let rafId: number | null = null;

    const computeScrollProgress = () => {
      rafId = null;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportStageHeight = Math.max(1, window.innerHeight - NAVBAR_HEIGHT);
      const scrollableDistance = Math.max(1, rect.height - viewportStageHeight);

      // 0 when section top docks under fixed navbar; 1 when section bottom meets viewport bottom
      const rawProgress = (NAVBAR_HEIGHT - rect.top) / scrollableDistance;
      applyProgressToUI(rawProgress);
    };

    const onScrollOrResize = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(computeScrollProgress);
      }
    };

    computeScrollProgress();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [applyProgressToUI]);

  // Smoothly scroll window to a specific stage when user clicks a step or arrow button
  const scrollToStep = useCallback(
    (stepIndex: number) => {
      const section = sectionRef.current;
      if (!section) return;

      const clampedIndex = Math.min(TOTAL_STEPS - 1, Math.max(0, stepIndex));
      const rect = section.getBoundingClientRect();
      const sectionTopDoc = window.scrollY + rect.top;
      const viewportStageHeight = Math.max(1, window.innerHeight - NAVBAR_HEIGHT);
      const scrollableDistance = Math.max(1, rect.height - viewportStageHeight);

      // Target midpoint of the chosen stage (exact start for step 0, exact end for final step)
      const targetProgress =
        clampedIndex === 0
          ? 0.01
          : clampedIndex === TOTAL_STEPS - 1
          ? 0.99
          : (clampedIndex + 0.5) / TOTAL_STEPS;

      const targetScrollY = sectionTopDoc - NAVBAR_HEIGHT + targetProgress * scrollableDistance;

      window.scrollTo({
        top: targetScrollY,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    },
    [reducedMotion],
  );

  const current = JOURNEY_STEPS[activeStep];

  return (
    <section
      id="journey"
      ref={sectionRef}
      aria-label="How it works — China to India shipment journey"
      className="relative bg-[#0B132B] text-white h-[430vh] md:h-[480vh] scroll-mt-[72px]"
    >
      {/* Sticky full-viewport 3D ocean stage — docks cleanly below the 72px fixed navbar */}
      <div className="sticky top-[72px] h-[calc(100dvh-72px)] w-full overflow-hidden flex flex-col">
        {/* Background Layer: Full-bleed interactive Three.js 3D cargo ship & ocean */}
        <div className="absolute inset-0 z-0">
          <JourneySeaCanvas progressRef={progressRef} reducedMotion={reducedMotion} />
        </div>

        {/* Protective editorial gradient scrim (no backdrop-blur over WebGL) */}
        <div
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#070D1F]/88 via-[#070D1F]/22 to-[#070D1F]/92 lg:bg-gradient-to-r lg:from-[#070D1F]/90 lg:via-[#070D1F]/35 lg:to-[#070D1F]/25"
          aria-hidden="true"
        />

        {/* Foreground UI Layer */}
        <div className="relative z-20 flex flex-col justify-between h-full max-w-7xl w-full mx-auto px-5 sm:px-6 lg:px-8 py-5 sm:py-7">
          {/* Top Header & Step Progress Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="text-[11.5px] font-bold uppercase tracking-[0.15em] text-[#F97316]">
                How it works
              </p>
              <h2 className="mt-1.5 font-display font-extrabold text-[clamp(1.6rem,3.1vw,2.65rem)] leading-[1.08] tracking-[-0.025em] text-white">
                Watch your order travel from China to India.
              </h2>
            </div>

            {/* Step X/6 Progress Indicator & Manual Step Controls */}
            <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-end">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#070D1F]/92 border border-white/15 text-[12.5px] font-semibold text-slate-100">
                <Ship className="w-3.5 h-3.5 text-[#F97316]" aria-hidden="true" />
                <span className="font-mono text-[#FB923C] tabular-nums">
                  Step {current.number}/{TOTAL_STEPS}
                </span>
                <span className="text-white/25" aria-hidden="true">
                  ·
                </span>
                <span className="hidden md:inline text-slate-300 font-normal">
                  {current.statusText}
                </span>
                <span
                  ref={pctReadoutRef}
                  className="md:hidden font-mono text-slate-300 tabular-nums"
                >
                  0%
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollToStep(activeStep - 1)}
                  disabled={activeStep === 0}
                  aria-label="Scroll to previous shipment stage"
                  className="w-9 h-9 rounded-lg border border-white/15 bg-[#070D1F]/90 hover:bg-white/15 disabled:opacity-35 disabled:pointer-events-none flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToStep(activeStep + 1)}
                  disabled={activeStep === TOTAL_STEPS - 1}
                  aria-label="Scroll to next shipment stage"
                  className="w-9 h-9 rounded-lg border border-white/15 bg-[#070D1F]/90 hover:bg-white/15 disabled:opacity-35 disabled:pointer-events-none flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Middle Area: Desktop Left 6-Stage Interactive Timeline / Mobile Bottom Active Stage Card */}
          <div className="my-auto py-3 flex flex-col justify-end lg:justify-center lg:max-w-[410px]">
            {/* Desktop vertical 6-stage interactive list */}
            <ol className="hidden lg:flex flex-col gap-2">
              {JOURNEY_STEPS.map((step, index) => {
                const isActive = index === activeStep;
                const isDone = index < activeStep;

                return (
                  <li key={step.number}>
                    <button
                      type="button"
                      onClick={() => scrollToStep(index)}
                      aria-current={isActive ? 'step' : undefined}
                      className={`w-full text-left rounded-xl px-4 py-3 border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#070D1F]/95 border-[#F97316] shadow-[0_12px_28px_-12px_rgba(234,88,12,0.5)]'
                          : isDone
                          ? 'bg-[#070D1F]/78 border-white/15 hover:bg-[#070D1F]/90'
                          : 'bg-[#070D1F]/62 border-white/10 hover:bg-[#070D1F]/82 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 w-6 h-6 rounded-md shrink-0 flex items-center justify-center font-mono text-[11.5px] font-bold tabular-nums transition-colors ${
                            isActive
                              ? 'bg-[#EA580C] text-white'
                              : isDone
                              ? 'bg-[#EA580C]/25 text-[#FB923C]'
                              : 'bg-white/10 text-slate-300'
                          }`}
                        >
                          {isDone ? <Check className="w-3.5 h-3.5 stroke-[2.75]" /> : step.number}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h3
                              className={`font-display font-bold text-[14.5px] leading-snug transition-colors ${
                                isActive ? 'text-white' : 'text-slate-200'
                              }`}
                            >
                              {step.title}
                            </h3>
                            <span className="font-mono text-[11px] text-slate-400 shrink-0 tabular-nums">
                              {step.dayLabel}
                            </span>
                          </div>

                          <div
                            className={`grid transition-all duration-300 ease-out ${
                              isActive
                                ? 'grid-rows-[1fr] opacity-100 mt-1.5'
                                : 'grid-rows-[0fr] opacity-0'
                            }`}
                          >
                            <div className="overflow-hidden">
                              <p className="text-[13px] leading-[1.55] text-slate-300">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Mobile & Tablet compact active stage card (keeps 3D ship unobstructed above) */}
            <div className="lg:hidden mt-auto rounded-xl bg-[#070D1F]/92 border border-[#F97316]/70 p-4 shadow-xl">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-6 h-6 rounded-md bg-[#EA580C] text-white font-mono text-[12px] font-bold flex items-center justify-center shrink-0 tabular-nums">
                    {current.number}
                  </span>
                  <h3 className="font-display font-bold text-[15.5px] text-white truncate">
                    {current.title}
                  </h3>
                </div>
                <span className="font-mono text-[11.5px] text-[#FB923C] shrink-0 tabular-nums">
                  {current.dayLabel}
                </span>
              </div>

              <p className="mt-2 text-[13.5px] leading-[1.55] text-slate-300">
                {current.description}
              </p>

              {/* 6 clickable stage dots for mobile */}
              <div className="mt-3.5 flex items-center gap-1.5" role="tablist" aria-label="Shipment stages">
                {JOURNEY_STEPS.map((step, index) => (
                  <button
                    key={step.number}
                    type="button"
                    role="tab"
                    aria-selected={index === activeStep}
                    aria-label={`Stage ${step.number}: ${step.title}`}
                    onClick={() => scrollToStep(index)}
                    className={`h-1.5 flex-1 rounded-full transition-colors cursor-pointer ${
                      index === activeStep
                        ? 'bg-[#EA580C]'
                        : index < activeStep
                        ? 'bg-[#FB923C]/55'
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar: Continuous Shanghai -> Chennai Route Progress Tracker */}
          <div className="rounded-xl border border-white/15 bg-[#070D1F]/92 px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5">
            {/* Origin: China */}
            <div className="flex items-center justify-between sm:justify-start gap-2.5 shrink-0">
              <div className="flex items-center gap-2.5">
                <FlagCN className="w-5 h-3.5 rounded-[2px]" />
                <div>
                  <div className="font-display font-bold text-[13.5px] text-white leading-tight">
                    Shanghai
                  </div>
                  <div className="text-[11px] text-slate-400">China departure</div>
                </div>
              </div>

              {/* Mobile-only Chennai label paired on same row */}
              <div className="flex sm:hidden items-center gap-2.5">
                <div className="text-right">
                  <div className="font-display font-bold text-[13.5px] text-white leading-tight">
                    Chennai
                  </div>
                  <div className="text-[11px] text-slate-400">India arrival</div>
                </div>
                <FlagIN className="w-5 h-3.5 rounded-[2px]" />
              </div>
            </div>

            {/* Continuous Scroll-Synced Progress Track */}
            <div className="relative flex-1 h-7 flex items-center">
              <div className="w-full h-1.5 rounded-full bg-white/15 overflow-hidden">
                <div
                  ref={fillBarRef}
                  className="h-full rounded-full bg-gradient-to-r from-[#EA580C] to-[#FB923C] will-change-[width]"
                  style={{ width: '0%' }}
                />
              </div>

              {/* 6 stage milestone ticks along the track */}
              <div
                className="pointer-events-none absolute inset-x-0 flex items-center justify-between px-0.5"
                aria-hidden="true"
              >
                {JOURNEY_STEPS.map((s, idx) => (
                  <span
                    key={s.number}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      idx <= activeStep ? 'bg-[#FB923C]' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>

              {/* Moving Ship Marker */}
              <div
                ref={shipMarkerRef}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#EA580C] border-2 border-[#070D1F] shadow-md flex items-center justify-center text-white will-change-[left]"
                style={{ left: '0%' }}
                aria-hidden="true"
              >
                <Ship className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Destination: India + Live Day Counter & Scroll Cue */}
            <div className="hidden sm:flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="text-right">
                  <div className="font-display font-bold text-[13.5px] text-white leading-tight">
                    Chennai
                  </div>
                  <div className="text-[11px] text-slate-400">India arrival</div>
                </div>
                <FlagIN className="w-5 h-3.5 rounded-[2px]" />
              </div>

              <div className="pl-3 border-l border-white/15 flex items-center gap-2.5">
                <span
                  ref={dayReadoutRef}
                  className="px-2.5 py-1 rounded-md border border-white/15 bg-white/5 font-mono text-[12px] font-semibold text-[#FB923C] tabular-nums min-w-[64px] text-center"
                >
                  Day 1
                </span>
                <span
                  className="hidden xl:inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-[0.12em] text-slate-400"
                  aria-hidden="true"
                >
                  <span>{activeStep === TOTAL_STEPS - 1 ? 'Done' : 'Scroll'}</span>
                  <ArrowDown className="w-3 h-3 text-[#F97316]" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
