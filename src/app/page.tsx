"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModelActions from "../components/ModelActions";
import ToolsSection from "../components/ToolsSection";
import type { MouseEvent as ReactMouseEvent } from "react";
import { getAllCarModels, type CarModel } from "../lib/carModels";
import { getAllBlogPosts, type BlogPost } from "../lib/blogPosts";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoTimeouts = useRef<Map<HTMLVideoElement, NodeJS.Timeout>>(
    new Map()
  );
  const [pointerPosition, setPointerPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 50, y: 50 });
  const techVideoRef = useRef<HTMLVideoElement>(null);
  const [isTechPlaying, setIsTechPlaying] = useState(false);
  const [isTechMuted, setIsTechMuted] = useState(true);
  const [homeModels, setHomeModels] = useState<CarModel[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Simulate loading time
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      // Show content after loading completes
      setTimeout(() => {
        setShowContent(true);
        setPlayVideo(true);
        // Show toast after content is visible
        setTimeout(() => {
          setShowToast(true);
        }, 1000);
      }, 500);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    const load = async () => {
      const [models, posts] = await Promise.all([
        getAllCarModels(),
        getAllBlogPosts(),
      ]);
      setHomeModels(models);
      setBlogPosts(posts);
    };
    load();
  }, []);

  useEffect(() => {
    if (playVideo && videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Video autoplay failed:", error);
        });
    }
  }, [playVideo]);

  // Video control functions
  const handleVideoPlay = (video: HTMLVideoElement) => {
    // Clear any existing timeout for this video
    if (videoTimeouts.current.has(video)) {
      clearTimeout(videoTimeouts.current.get(video)!);
      videoTimeouts.current.delete(video);
    }

    // Set a small delay before playing to prevent rapid play/pause
    const timeout = setTimeout(() => {
      if (video.paused) {
        video.play().catch(() => {
          // Handle autoplay restriction gracefully
        });
      }
    }, 100);

    videoTimeouts.current.set(video, timeout);
  };

  const handleVideoPause = (video: HTMLVideoElement) => {
    // Clear any existing timeout for this video
    if (videoTimeouts.current.has(video)) {
      clearTimeout(videoTimeouts.current.get(video)!);
      videoTimeouts.current.delete(video);
    }

    // Set a small delay before pausing to prevent rapid play/pause
    const timeout = setTimeout(() => {
      if (!video.paused) {
        video.pause();
      }
    }, 100);

    videoTimeouts.current.set(video, timeout);
  };

  // Cleanup video timeouts on unmount
  useEffect(() => {
    return () => {
      videoTimeouts.current.forEach((timeout) => clearTimeout(timeout));
      videoTimeouts.current.clear();
    };
  }, []);

  // Scroll progress tracker
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        docHeight > 0
          ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
          : 0;
      setScrollProgress(progress);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePointerMove = (
    event: ReactMouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const xPercent = ((event.clientX - bounds.left) / bounds.width) * 100;
    const yPercent = ((event.clientY - bounds.top) / bounds.height) * 100;
    setPointerPosition({ x: xPercent, y: yPercent });
  };

  const playTechVideo = async () => {
    const video = techVideoRef.current;
    if (!video) return;
    try {
      await video.play();
      setIsTechPlaying(true);
    } catch (error) {
      // Autoplay restrictions will be resolved by user interactions (buttons)
    }
  };

  const pauseTechVideo = () => {
    const video = techVideoRef.current;
    if (!video) return;
    video.pause();
    setIsTechPlaying(false);
  };

  const toggleTechPlayPause = async () => {
    const video = techVideoRef.current;
    if (!video) return;
    if (video.paused) {
      await playTechVideo();
    } else {
      pauseTechVideo();
    }
  };

  const toggleTechMute = () => {
    const video = techVideoRef.current;
    if (!video) return;
    const nextMuted = !isTechMuted;
    video.muted = nextMuted;
    setIsTechMuted(nextMuted);
  };

  useEffect(() => {
    const video = techVideoRef.current;
    if (!video) return;
    if (typeof window === "undefined") return;

    const isMobile =
      window.matchMedia("(max-width: 640px)").matches ||
      /iPhone|iPad|Android/i.test(navigator.userAgent);

    if (!isMobile) return;

    // Ensure attributes required for iOS autoplay
    video.muted = true;
    video.setAttribute("playsinline", "true");

    const tryPlay = () => {
      video
        .play()
        .then(() => setIsTechPlaying(true))
        .catch(() => {
          // Ignore autoplay errors on mobile
        });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tryPlay();
          } else {
            video.pause();
            setIsTechPlaying(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    // Initial attempt
    tryPlay();

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-40">
        <div
          className="h-full bg-gradient-to-r from-white via-white/70 to-white/40"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Loading Screen */}
      <div
        className={`fixed inset-0 z-50 bg-gradient-to-br from-black via-gray-900 via-black/80 to-transparent transition-all duration-1000 ease-in-out ${
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse">
            <Image
              src="/images/loading-logo.webp"
              alt="BYD Logo"
              width={250}
              height={250}
              className="opacity-90"
              priority
              unoptimized={false}
            />
          </div>
        </div>
      </div>

      <Sidebar isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />

      {/* Hero Section */}
      <section
        className={`relative min-h-screen flex flex-col transition-all duration-1000 ease-in-out ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Background Car Video */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            autoPlay
            className="w-full h-full object-cover object-contain"
          >
            <source src="/mp4/hero-page-bg.mp4" type="video/mp4" />
          </video>

          {/* Vignette Effect Overlay */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/60 pointer-events-none"></div>
        </div>

        <Navbar showContent={showContent} onToggleSidebar={toggleSidebar} />

        {/* Video Control Button */}
        <div
          className={`absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-20 transition-all duration-1000 ease-out delay-1200 ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <button
            onClick={toggleVideo}
            className="bg-white/10 hover:bg-white/20 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </section>

      {/* Models Section */}
      <section
        className="relative bg-gradient-to-b from-black via-gray to-black py-20 px-4 sm:px-6 md:px-8 overflow-hidden"
        onMouseMove={handlePointerMove}
        style={{ contentVisibility: "auto", containIntrinsicSize: "1200px" }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
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

        <div className="container mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-start mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold italic mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/85 to-white/60">
              MORE BYD MODELS
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed">
              Experience the future of mobility with BYD's innovative electric
              vehicles
            </p>
          </div>

          {/* Card Grid - Enhanced Flexbox with Hover Effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-full mx-auto">
            {homeModels.slice(0, 3).map((model, idx) => (
              <div key={model.id} className="group">
                <div className="group relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex flex-col h-full">
                  {/* Glassmorphism Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  {/* Car Image Background */}
                  <div className="relative w-full h-40 md:h-44 lg:h-48 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0"></div>
                    <Image
                      src={model.colors.colors[0].image}
                      alt={model.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-contain"
                      unoptimized={false}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col gap-2 grow">
                    {/* Car Model Name */}
                    <h3 className="text-xl font-bold text-white leading-tight group-hover:text-white/90 transition-colors duration-300">
                      {model.name}
                    </h3>

                    {/* Powertrain Badge */}
                    <div>
                      <p className="text-gray-300 text-sm leading-relaxed font-light group-hover:text-gray-200 transition-colors duration-300 line-clamp-1">
                        {model.vehicle_type}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium text-white/90 bg-white/10 border border-white/15 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
                        <svg
                          className="h-3.5 w-3.5 text-white/80"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 3L4 14h6l-1 7 9-11h-6l1-7z"
                          />
                        </svg>
                        {model.powertrain.technology}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="text-start flex items-center gap-2">
                      <div className="text-gray-400">Starting Price</div>
                      <div className="font-bold text-white">{model.price}</div>
                    </div>

                    {/* Actions pinned to bottom */}
                    <ModelActions modelId={model.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/models"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl text-sm font-semibold border border-white/20 backdrop-blur-md hover:bg-white/20 transition-colors"
            >
              View all models
              <svg
                className="w-4 h-4"
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
            </Link>
          </div>
        </div>
      </section>

      {/* Smart EV Technology: Video Feature Card */}
      <section
        className="relative bg-gradient-to-b from-black via-black/95 to-black py-24 px-4 sm:px-6 md:px-8 overflow-hidden"
        style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 container mx-auto">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white/85 to-white/60">
              SMART EV TECHNOLOGY
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg mt-5 leading-relaxed max-w-3xl mx-auto">
              Experience BYD innovation. Hover to preview technology in motion.
            </p>
          </div>

          <div
            className="max-w-full mx-auto group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl hover:shadow-white/10 transition-all"
            onMouseEnter={playTechVideo}
            onMouseLeave={pauseTechVideo}
          >
            {/* Video */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9]">
              <video
                ref={techVideoRef}
                className="absolute inset-0 w-full h-full object-cover opacity-100"
                muted={isTechMuted}
                loop
                playsInline
                autoPlay
                preload="none"
              >
                <source
                  src="https://video.wixstatic.com/video/79c726_280f51abf85342228f7eea7f53bac6c2/1080p/mp4/file.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none sm:hidden" />
            </div>

            {/* Card Content (not overlayed on video) */}
            <div className="relative p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-6">
              <div className="max-w-xl">
                <h3 className="text-white text-2xl sm:text-3xl font-bold">
                  Blade Battery. Intelligent Drive.
                </h3>
                <p className="text-gray-200/90 text-sm sm:text-base mt-2 max-w-xl">
                  Safety-first chemistry, fast charging, and smooth performance
                  designed for modern electric mobility.
                </p>
              </div>
              <div className="flex w-full sm:w-auto items-center gap-3">
                <button
                  onClick={toggleTechMute}
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-2 rounded-lg text-sm font-semibold border border-white/20 backdrop-blur-md hover:bg-white/20 transition-colors w-full sm:w-auto justify-center"
                  aria-label={isTechMuted ? "Unmute video" : "Mute video"}
                >
                  {isTechMuted ? (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M5 9v6h4l5 5V4L9 9H5z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M5 9v6h4l5 5V4L9 9H5z" />
                      <path
                        d="M16.5 12a4.5 4.5 0 010 6.364M19 9a7 7 0 010 9.9"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                  <span>{isTechMuted ? "Unmute" : "Mute"}</span>
                </button>
                <button
                  onClick={toggleTechPlayPause}
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-2 rounded-lg text-sm font-semibold border border-white/20 backdrop-blur-md hover:bg-white/20 transition-colors w-full sm:w-auto justify-center"
                  aria-label={isTechPlaying ? "Pause video" : "Play video"}
                >
                  {isTechPlaying ? (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                  <span>{isTechPlaying ? "Pause" : "Play"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section
        className="relative bg-gradient-to-b from-black via-[#0b0b0b] to-black py-24 px-4 sm:px-6 md:px-8 overflow-hidden"
        onMouseMove={handlePointerMove}
        style={{ contentVisibility: "auto", containIntrinsicSize: "1000px" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl opacity-30"></div>
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px at ${pointerPosition.x}% ${pointerPosition.y}%, rgba(255,255,255,0.10), transparent 60%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px, 40px 40px",
          }}
        />

        <div className="relative z-10 container mx-auto">
          <div className="text-start mx-auto mb-14">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white/85 to-white/60">
              From the BYD Journal
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg mt-4">
              Stories, insights, and updates on electric mobility.
            </p>
          </div>

          {blogPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
              {/* Featured Post */}
              <Link
                href={blogPosts[0].href}
                className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-transparent hover:from-white/40 hover:via-white/10 transition-all duration-500"
              >
                <div className="relative overflow-hidden rounded-3xl bg-white/10 border border-white/10 backdrop-blur-2xl h-full shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <img
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </div>
                  <div className="p-7 flex flex-col gap-4">
                    <h3 className="text-white text-2xl sm:text-3xl font-bold leading-tight group-hover:text-white/90 transition-colors">
                      {blogPosts[0].title}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl line-clamp-3 overflow-hidden">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/15 border border-white/20 text-white flex items-center justify-center text-xs font-semibold">
                          <Image
                            src="/images/byd-logo.webp"
                            alt="BYD"
                            width={24}
                            height={24}
                            unoptimized={false}
                          />
                        </div>
                        <span className="text-gray-300 text-xs">
                          {blogPosts[0].date}
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-2 text-white/90 group-hover:text-white transition-colors text-sm font-semibold">
                        Read article
                        <svg
                          className="w-4 h-4"
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
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Two Stacked Posts */}
              <div className="grid grid-rows-2 gap-6">
                {blogPosts.slice(1, 3).map((post, idx) => (
                  <Link
                    key={idx}
                    href={post.href}
                    className="group relative overflow-hidden rounded-3xl bg-white/10 border border-white/10 backdrop-blur-2xl transition-all duration-500 hover:scale-[1.01] hover:border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                  >
                    <div className="relative w-full h-full min-h-[180px] md:min-h-[220px]">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <h3 className="text-white text-xl font-bold leading-tight group-hover:text-white/90 transition-colors">
                          {post.title}
                        </h3>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-gray-300 text-xs">
                            {post.date}
                          </span>
                          <span className="inline-flex items-center gap-2 text-white/90 group-hover:text-white transition-colors text-xs font-semibold">
                            Read article
                            <svg
                              className="w-3.5 h-3.5"
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
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl text-sm font-semibold border border-white/20 backdrop-blur-md hover:bg-white/20 transition-colors"
            >
              View all posts
              <svg
                className="w-4 h-4"
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
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <ToolsSection
        pointerPosition={pointerPosition}
        onPointerMove={handlePointerMove}
      />

      <Footer />

      <ScrollToTop />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-50 animate-in slide-in-from-bottom-2 duration-500">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white mb-2">
                  Information Disclaimer
                </p>
                <p className="text-xs text-gray-300 leading-relaxed mb-3">
                  All information on this page is for demonstration purposes
                  only and may not be accurate. For official BYD information,
                  please visit the original website.
                </p>
                <div className="flex items-center justify-between">
                  <a
                    href="https://www.bydcarsphilippines.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Visit Official BYD Website
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                  <button
                    onClick={() => setShowToast(false)}
                    className="text-gray-400 hover:text-white transition-colors p-1"
                    aria-label="Close notification"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
