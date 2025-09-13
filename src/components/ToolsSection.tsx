"use client";
import Image from "next/image";
import type { MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";

interface ToolsSectionProps {
  pointerPosition: { x: number; y: number };
  onPointerMove: (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function ToolsSection({
  pointerPosition,
  onPointerMove,
}: ToolsSectionProps) {
  return (
    <section
      data-reveal
      className={`relative bg-gradient-to-b from-black via-[#0a0a0a] to-black py-24 px-4 sm:px-6 md:px-8 overflow-hidden transition-all duration-1000 ease-in-out`}
      onMouseMove={onPointerMove}
      style={{ contentVisibility: "auto", containIntrinsicSize: "1400px" }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Interactive Spotlight + Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${pointerPosition.x}% ${pointerPosition.y}%, rgba(255,255,255,0.08), transparent 60%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px, 40px 40px",
        }}
      />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold italic mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/85 to-white/60">
            TOOLS & SERVICES
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Everything you need to make informed decisions about your electric
            vehicle journey
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-full mx-auto">
          {/* Car Comparison Tool - Large Card */}
          <div
            data-reveal
            data-delay={0}
            className="group relative lg:col-span-2 transition-all ease-out duration-700"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/20 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <div className="flex flex-col lg:flex-row h-full">
                {/* Image Container - Left Side */}
                <div className="relative w-full lg:w-2/3 h-64 lg:h-auto overflow-hidden">
                  <img
                    src="/images/byd-compare.webp"
                    alt="Car comparison"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                  {/* Icon Overlay */}
                  <div className="absolute top-6 right-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content - Right Side */}
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-white/80 transition-colors duration-300">
                        Compare Cars
                      </h3>
                      <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                        Side-by-side comparison of BYD models to find your
                        perfect match. Analyze specifications, features, and
                        performance metrics.
                      </p>
                    </div>
                    <Link href="/compare-model">
                      <button className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-white/15 to-white/5 hover:from-white/25 hover:to-white/10 text-white py-3.5 md:py-4 px-6 text-base md:text-lg font-semibold border border-white/20 hover:border-white/30 backdrop-blur-lg transition-all duration-300 shadow-[0_6px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                        <span className="inline-flex items-center justify-center gap-2">
                          Compare Now
                          <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charging Locations - Medium Card */}
          <div
            data-reveal
            data-delay={100}
            className="group relative transition-all ease-out duration-700"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 overflow-hidden h-full shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              {/* Image Container - Top */}
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src="/images/byd-charging-station.webp"
                  alt="Charging station"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                {/* Icon Overlay */}
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white/80 transition-colors duration-300">
                    Find Charging
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed mb-6">
                    Locate nearby charging stations and plan your route
                    efficiently with real-time availability.
                  </p>
                </div>
                <Link href="/charging-stations">
                  <button className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-white/12 to-white/5 hover:from-white/22 hover:to-white/10 text-white py-3 px-5 text-sm md:text-base font-semibold border border-white/20 hover:border-white/30 backdrop-blur-lg transition-all duration-300 shadow-[0_4px_18px_rgba(0,0,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                    <span className="inline-flex items-center justify-center gap-2">
                      Find Stations
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Get a Quote - Medium Card */}
          <div
            data-reveal
            data-delay={200}
            className="group relative transition-all ease-out duration-700"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 overflow-hidden h-full shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              {/* Image Container - Top */}
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src="/images/byd-get-quote.webp"
                  alt="Get a Quote"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                {/* Icon Overlay */}
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src="/quote-icon.svg"
                      alt="Quote Icon"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white/80 transition-colors duration-300">
                    Get a Quote
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed mb-6">
                    Personalized pricing and financing options for your chosen
                    model with flexible payment plans.
                  </p>
                </div>
                <Link href="/get-a-quote">
                  <button className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-white/12 to-white/5 hover:from-white/22 hover:to-white/10 text-white py-3 px-5 text-sm md:text-base font-semibold border border-white/20 hover:border-white/30 backdrop-blur-lg transition-all duration-300 shadow-[0_4px_18px_rgba(0,0,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                    <span className="inline-flex items-center justify-center gap-2">
                      Get Quote
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Test Drive - Full Width Bottom Card */}
          <div
            data-reveal
            data-delay={300}
            className="group relative lg:col-span-2 transition-all ease-out duration-700"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/20 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <div className="flex flex-col lg:flex-row-reverse h-full">
                {/* Image Container - Right Side */}
                <div className="relative w-full lg:w-1/2 h-64 lg:h-auto overflow-hidden">
                  <img
                    src="/images/byd-test-drive.webp"
                    alt="Test drive experience"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/30 to-transparent"></div>
                  {/* Icon Overlay */}
                  <div className="absolute top-6 left-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src="/test-drive-icon.svg"
                        alt="Test Drive Icon"
                        className="w-10 h-10 sm:w-10 sm:h-10"
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
                </div>

                {/* Content - Left Side */}
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-white/80 transition-colors duration-300">
                        Book Test Drive
                      </h3>
                      <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                        Experience the thrill of electric driving with a
                        personalized test drive. Feel the power and innovation
                        firsthand.
                      </p>
                    </div>
                    <Link href="/book-test-drive">
                      <button className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-white/15 to-white/5 hover:from-white/25 hover:to-white/10 text-white py-3.5 md:py-4 px-6 text-base md:text-lg font-semibold border border-white/20 hover:border-white/30 backdrop-blur-lg transition-all duration-300 shadow-[0_6px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                        <span className="inline-flex items-center justify-center gap-2">
                          Book Now
                          <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div
          data-reveal
          data-delay={400}
          className="mt-16 max-w-4xl mx-auto transition-all ease-out duration-700"
        >
          <div className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need Personalized Assistance?
            </h3>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              Our expert team is here to help you find the perfect electric
              vehicle and answer all your questions about BYD technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl text-base md:text-lg font-semibold transition-all duration-300 transform hover:scale-105 border border-white/20 backdrop-blur-md shadow-[0_6px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                  Contact Sales
                </button>
              </Link>
              <Link href="/schedule-consultation">
                <button className="bg-white/5 hover:bg-white/15 text-white border border-white/20 hover:border-white/30 px-8 py-3 rounded-xl text-base md:text-lg font-semibold transition-all duration-300 backdrop-blur-md">
                  Schedule Consultation
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
