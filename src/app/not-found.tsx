"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Sidebar from "../components/Sidebar";

export default function NotFound() {
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
            <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white/85 to-white/60 leading-none">
              404
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-white via-white/70 to-white/40 mx-auto mt-4"></div>
          </div>

          {/* Error Message */}
          <div className="mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Page Under Development
            </h2>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed">
              This page is currently under development. We're working hard to
              bring you the best electric vehicle experience. Please check back
              soon!
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
