"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="relative bg-black border-t border-white/10"
      style={{ contentVisibility: "auto", containIntrinsicSize: "600px" }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/byd-logo.webp"
                alt="BYD"
                width={80}
                height={80}
                priority
                unoptimized={false}
              />
              <div className="text-white font-semibold">Iloilo</div>
            </div>
            <p className="text-gray-400 text-sm mt-4 max-w-xs">
              Electrifying Iloilo with modern mobility—innovation, design, and
              sustainable performance.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link
                  className="hover:text-white transition-colors"
                  href="/models"
                >
                  Models
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-colors"
                  href="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-colors"
                  href="/technology"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-colors"
                  href="/support"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link
                  className="hover:text-white transition-colors"
                  href="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-colors"
                  href="/news"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-colors"
                  href="/careers"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-colors"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Iloilo City, Philippines</li>
              <li>support@ace.com.ph</li>
              <li>+63 900 000 0000</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.facebook.com"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-2.9h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.3.2 2.3.2v2.6h-1.3c-1.3 0-1.7.8-1.7 1.6v1.9H16l-.4 2.9h-2.3v7A10 10 0 0022 12z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
                </svg>
              </a>
              <a
                href="https://www.twitter.com"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="X"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h3l-7.5 8.6L22 22h-6.7l-4.2-5.6L5.9 22H3l8-9.2L4 2h6.8l3.8 5.1L18 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-gray-400 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} BYD Iloilo. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link
              href="/cookies"
              className="hover:text-white transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
