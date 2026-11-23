import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Package } from 'lucide-react';
import { COMPLETED_PROJECTS, CompletedProject } from '../data/importNowData';
import { FlagCN } from './BrandPrimitives';

function ProjectCard({ project, index }: { project: CompletedProject; index: number }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: (index % 2) * 0.08 }}
      className="group rounded-2xl border border-slate-200/90 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#EA580C]/40 hover:shadow-[0_18px_40px_-20px_rgba(11,19,43,0.16)] flex flex-col"
    >
      {/* 4:3 Editorial Photograph with resilient fallback */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {!imgFailed ? (
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0B132B] to-[#1E293B] text-white/80 p-6">
            <Package className="w-10 h-10 text-[#F97316]" />
            <span className="mt-2 text-xs font-mono uppercase tracking-wider">
              {project.route}
            </span>
          </div>
        )}

        {/* Protective dark gradient scrim at bottom of photo for crisp route label */}
        <div
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070D1F]/85 via-[#070D1F]/40 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute bottom-3.5 left-4 inline-flex items-center gap-2 text-[12.5px] font-semibold text-white">
          <FlagCN className="w-4 h-2.5 rounded-[1.5px]" />
          <span>{project.route}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display font-bold text-[19px] text-[#0B132B] tracking-tight">
            {project.title}
          </h3>
          <p className="mt-2 text-[14.5px] leading-[1.6] text-slate-600">{project.description}</p>
        </div>

        {/* Clean unboxed typographic metadata */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-[12.5px] font-semibold text-slate-500">
          <span>{project.meta[0]}</span>
          <span className="text-[#EA580C]" aria-hidden="true">
            ·
          </span>
          <span>{project.meta[1]}</span>
        </div>
      </div>
    </motion.article>
  );
}

export function CompletedProjects() {
  return (
    <section id="work" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#EA580C]">
            Recently delivered
          </p>
          <h2 className="mt-3 font-display font-extrabold text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.1] tracking-[-0.025em] text-[#0B132B]">
            Another container unloaded,{' '}
            <span className="bg-gradient-to-r from-[#EA580C] to-[#F97316] bg-clip-text text-transparent">
              another happy client.
            </span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPLETED_PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
