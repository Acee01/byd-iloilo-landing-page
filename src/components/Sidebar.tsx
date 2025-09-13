"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onToggleSidebar: () => void;
}

export default function Sidebar({ isOpen, onToggleSidebar }: SidebarProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sidebar z-40 transition-all duration-300"
          onClick={onToggleSidebar}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative h-full bg-white/10 backdrop-blur-2xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.6)] saturate-150 overflow-hidden rounded-r-2xl">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="absolute -left-24 top-24 h-48 w-48 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/5">
              <div className="text-white flex items-center gap-3">
                <Image
                  src="/images/byd-logo.webp"
                  alt="BYD Logo"
                  width={100}
                  height={100}
                  className="opacity-90 drop-shadow"
                  priority
                  unoptimized={false}
                />
              </div>
              <button
                onClick={onToggleSidebar}
                className="text-white/80 hover:text-white transition-colors duration-200 p-2 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/10"
                aria-label="Close sidebar"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 p-5 overflow-y-auto sidebar-scrollbar">
              <nav className="space-y-2">
                <Link
                  href="/"
                  aria-current={isActive("/") ? "page" : undefined}
                  className={`group flex items-center justify-between text-white/90 hover:text-white transition-all duration-200 py-3 px-4 rounded-xl border ${
                    isActive("/")
                      ? "bg-white/10 border-white/10 shadow-[0_2px_12px_rgba(255,255,255,0.06)]"
                      : "bg-white/0 border-transparent hover:bg-white/10 hover:border-white/10 hover:shadow-[0_2px_12px_rgba(255,255,255,0.06)]"
                  }`}
                >
                  <span className="font-medium">Home</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <Link
                  href="/models"
                  aria-current={isActive("/models") ? "page" : undefined}
                  className={`group flex items-center justify-between text-white/90 hover:text-white transition-all duration-200 py-3 px-4 rounded-xl border ${
                    isActive("/models")
                      ? "bg-white/10 border-white/10 shadow-[0_2px_12px_rgba(255,255,255,0.06)]"
                      : "bg-white/0 border-transparent hover:bg-white/10 hover:border-white/10 hover:shadow-[0_2px_12px_rgba(255,255,255,0.06)]"
                  }`}
                >
                  <span className="font-medium">Models</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <Link
                  href="/about"
                  aria-current={isActive("/about") ? "page" : undefined}
                  className={`group flex items-center justify-between text-white/90 hover:text-white transition-all duration-200 py-3 px-4 rounded-xl border ${
                    isActive("/about")
                      ? "bg-white/10 border-white/10 shadow-[0_2px_12px_rgba(255,255,255,0.06)]"
                      : "bg-white/0 border-transparent hover:bg-white/10 hover:border-white/10 hover:shadow-[0_2px_12px_rgba(255,255,255,0.06)]"
                  }`}
                >
                  <span className="font-medium">About BYD</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <Link
                  href="/technology"
                  aria-current={isActive("/technology") ? "page" : undefined}
                  className={`group flex items-center justify-between text-white/90 hover:text-white transition-all duration-200 py-3 px-4 rounded-xl border ${
                    isActive("/technology")
                      ? "bg-white/10 border-white/10 shadow-[0_2px_12px_rgba(255,255,255,0.06)]"
                      : "bg-white/0 border-transparent hover:bg-white/10 hover:border-white/10 hover:shadow-[0_2px_12px_rgba(255,255,255,0.06)]"
                  }`}
                >
                  <span className="font-medium">Technology</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <Link
                  href="/contact"
                  aria-current={isActive("/contact") ? "page" : undefined}
                  className={`group flex items-center justify-between text-white/90 hover:text-white transition-all duration-200 py-3 px-4 rounded-xl border ${
                    isActive("/contact")
                      ? "bg-white/10 border-white/10 shadow-[0_2px_12px_rgba(255,255,255,0.06)]"
                      : "bg-white/0 border-transparent hover:bg-white/10 hover:border-white/10 hover:shadow-[0_2px_12px_rgba(255,255,255,0.06)]"
                  }`}
                >
                  <span className="font-medium">Contact</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </nav>

              <div className="my-6 border-t border-white/10"></div>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <h3 className="text-white font-semibold text-sm mb-2">
                    Visit Our Showroom
                  </h3>
                  <p className="text-gray-200/90 text-xs leading-relaxed">
                    Experience the future of electric mobility at BYD Iloilo.
                    Book your test drive today.
                  </p>
                </div>

                <div className="flex items-center space-x-3 text-gray-300 text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <Link
                    href="https://maps.google.com/?q=Iloilo+City+Philippines+BYD+Showroom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <span>Iloilo City, Philippines</span>
                    <svg
                      className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-white/10 bg-white/5">
              <div className="text-gray-300 text-xs text-center">
                © 2025 BYD Iloilo. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
