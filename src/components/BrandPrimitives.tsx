import React from 'react';

export function FlagCN({ className = 'w-4 h-3 rounded-[2px] shrink-0' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={className}
      aria-label="China flag"
      role="img"
    >
      <rect width="30" height="20" fill="#de2910" />
      <path
        fill="#ffde00"
        d="M5 3l1.18 3.6h3.8l-3.07 2.23 1.17 3.6L5 10.2l-3.08 2.23 1.18-3.6L.02 6.6h3.8z"
      />
      <circle cx="10.5" cy="2.5" r=".9" fill="#ffde00" />
      <circle cx="12.5" cy="4.6" r=".9" fill="#ffde00" />
      <circle cx="12.5" cy="7.6" r=".9" fill="#ffde00" />
      <circle cx="10.5" cy="9.6" r=".9" fill="#ffde00" />
    </svg>
  );
}

export function FlagIN({ className = 'w-4 h-3 rounded-[2px] shrink-0' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={className}
      aria-label="India flag"
      role="img"
    >
      <rect width="30" height="20" fill="#ffffff" />
      <rect width="30" height="6.67" fill="#ff9933" />
      <rect y="13.33" width="30" height="6.67" fill="#138808" />
      <circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" strokeWidth=".7" />
      <circle cx="15" cy="10" r=".6" fill="#000080" />
    </svg>
  );
}

export function ImportNowLogo({
  light = false,
  className = '',
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center font-display font-extrabold tracking-[-0.04em] text-[20px] leading-none whitespace-nowrap select-none ${
        light ? 'text-white' : 'text-[#0B132B]'
      } ${className}`}
    >
      <span>IMP</span>
      <svg
        viewBox="0 0 24 24"
        className="w-[18px] h-[18px] mx-[1px] text-[#EA580C] -mt-[1px] shrink-0"
        aria-hidden="true"
      >
        <path
          d="M8.2 3.1A9.5 9.5 0 1 0 15.8 3.1"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.6"
          strokeLinecap="round"
        />
        <path
          d="M12 1.5v10.2M7.6 8l4.4 4.6L16.4 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>RTNOW</span>
    </span>
  );
}

export function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.8-1.2 2.2 2.2 0 00.1-1.2c0-.1-.2-.2-.5-.3z" />
    </svg>
  );
}
