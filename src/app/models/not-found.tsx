"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";
import Sidebar from "../../components/Sidebar";

export default function ModelNotFound() {
  const [showContent, setShowContent] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pointerPosition, setPointerPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 50, y: 50 });

  useEffect(() => {
    // Show content after component mounts
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePointerMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const xPercent = ((event.clientX - bounds.left) / bounds.width) * 100;
    const yPercent = ((event.clientY - bounds.top) / bounds.height) * 100;
    setPointerPosition({ x: xPercent, y: yPercent });
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Interactive Spotlight + Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${pointerPosition.x}% ${pointerPosition.y}%, rgba(255,255,255,0.10), transparent 60%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px, 40px 40px",
        }}
      />

      <Sidebar isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
      <Navbar showContent={true} onToggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <main
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8"
        onMouseMove={handlePointerMove}
      >
        <div
          className={`text-center transition-all duration-1000 ease-in-out ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/85 to-white/60 leading-none">
              404
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-white via-white/70 to-white/40 mx-auto mt-4"></div>

            {/* Development Badge */}
            <div className="mt-6 inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium border border-yellow-500/30">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              Under Development
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-12 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
              Model Page Under Development
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              This model page is currently under development. We're working hard
              to bring you detailed information about our electric vehicles.
              Please check back soon!
            </p>
          </div>

          {/* BYD Car Image */}
          <div className="mb-12 relative">
            <div className="relative w-48 h-32 sm:w-64 sm:h-40 md:w-80 md:h-48 mx-auto">
              <Image
                src="/images/byd-atto-3.webp"
                alt="BYD Electric Vehicle"
                fill
                className="object-contain opacity-60"
                priority
              />
            </div>
            {/* Floating animation */}
            <div className="absolute inset-0 animate-pulse">
              <div className="w-full h-full bg-white/5 rounded-lg blur-xl"></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/models"
              className="group relative inline-flex items-center gap-3 bg-white/10 text-white px-6 py-3 rounded-xl text-sm font-semibold border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
            >
              <svg
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              All Models
            </Link>

            <Link
              href="/"
              className="group relative inline-flex items-center gap-3 bg-white/10 text-white px-6 py-3 rounded-xl text-sm font-semibold border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
            >
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              Back to Home
            </Link>
          </div>

          {/* Popular Models */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-white text-lg font-semibold mb-6">
              Popular BYD Models
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "BYD Atto 3",
                  href: "/models/atto-3",
                  image: "/images/byd-atto-3.webp",
                },
                {
                  name: "BYD Dolphin",
                  href: "/models/dolphin",
                  image: "/images/byd-dolphin.webp",
                },
                {
                  name: "BYD Seal",
                  href: "/models/seal",
                  image: "/images/byd-SealAdvanced.webp",
                },
              ].map((model, index) => (
                <Link
                  key={index}
                  href={model.href}
                  className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="relative w-full h-24">
                    <Image
                      src={model.image}
                      alt={model.name}
                      fill
                      className="object-contain opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-white text-sm font-medium text-center group-hover:text-white/90 transition-colors">
                      {model.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
