"use client";

import Image from "next/image";
import Link from "next/link";

type NavbarProps = {
  showContent: boolean;
  onToggleSidebar: () => void;
};

export default function Navbar({ showContent, onToggleSidebar }: NavbarProps) {
  return (
    <div className="relative z-10 bg-gradient-to-b from-black/90 via-black/60 to-transparent w-full">
      <nav className="flex items-center px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 lg:container mx-auto">
        {/* Left - Hamburger Menu */}
        <div
          className={`relative group transition-all duration-1000 ease-out delay-500 ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <button
            onClick={onToggleSidebar}
            className="flex items-center space-x-1 sm:space-x-2 text-white cursor-pointer hover:opacity-50 transition-opacity"
          >
            <div className="flex flex-col space-y-0.5 sm:space-y-1">
              <div className="w-4 h-0.5 sm:w-6 bg-white"></div>
              <div className="w-4 h-0.5 sm:w-6 bg-white"></div>
              <div className="w-4 h-0.5 sm:w-6 bg-white"></div>
            </div>
            <span className="text-xs sm:text-sm font-medium tracking-wider uppercase hidden sm:block">
              MENU
            </span>
          </button>
          {/* Hover Label */}
          <div className="absolute top-full left-0 mt-2 px-3 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap hidden sm:block">
            Open Menu
          </div>
        </div>

        {/* Center - BYD Logo (Absolutely Positioned) */}
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 group transition-all duration-1000 ease-out delay-700 ${
            showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <Link href="/">
            <Image
              src="/images/byd-logo.webp"
              alt="BYD Logo"
              width={120}
              height={120}
              className="hover:opacity-50 transition-opacity h-[clamp(15px,4vw,20px)] w-auto"
              priority
              unoptimized={false}
            />
          </Link>
          {/* Hover Label */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap hidden sm:block">
            BYDIloilo.com.ph
          </div>
        </div>

        {/* Right - Contact Icon */}
        <div
          className={`relative group ml-auto transition-all duration-1000 ease-out delay-900 ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <Link href="/contact">
            <Image
              src="/contact-icon.svg"
              alt="Contact Icon"
              className="w-5 h-5 sm:w-6 sm:h-6"
              width={24}
              height={24}
            />
          </Link>
          {/* Hover Label */}
          <div className="absolute top-full right-0 mt-2 px-3 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap hidden sm:block">
            Contact Support
          </div>
        </div>
      </nav>
    </div>
  );
}
