"use client";

import Link from "next/link";

type ModelActionsProps = {
  modelId: string;
};

export default function ModelActions({ modelId }: ModelActionsProps) {
  return (
    <div className="mt-auto space-y-2 pt-2">
      {/* Explore Button */}
      <div>
        <Link href={`/models/${modelId}`}>
          <button className="relative w-full group/btn rounded-xl px-4 py-3 text-sm font-medium text-white/90 bg-white/10 backdrop-blur-md border border_white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-white/15 hover:border-white/25 hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:scale-[0.99]">
            <span
              className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            ></span>
            <span className="relative z-10 flex items-center justify-between tracking-wide">
              <span>Explore this model</span>
              <svg
                className="ml-3 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M13 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </Link>
      </div>
      {/* Get A Quote Button */}
      <div>
        <Link href="/get-a-quote">
          <button className="relative w-full group/btn rounded-xl px-4 py-3 text-sm font-medium text-black bg-white hover:bg-white/90 border border-white/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:scale-[0.99]">
            <span
              className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-black/5 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            ></span>
            <span className="relative z-10 flex items-center justify-between tracking-wide">
              <span>Get A Quote</span>
              <svg
                className="ml-3 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 8h10M7 12h6M21 12c0 4.418-4.03 8-9 8a9.84 9.84 0 01-3.64-.68L3 20l1.17-3.12A7.83 7.83 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
