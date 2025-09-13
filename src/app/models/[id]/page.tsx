"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollToTop from "../../../components/ScrollToTop";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import ToolsSection from "../../../components/ToolsSection";
import { carModelsData, CarModel } from "../../../lib/carModels";
import type { MouseEvent as ReactMouseEvent } from "react";

export default function ModelDetailPage() {
  const params = useParams();
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [showContent] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pointerPosition, setPointerPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 50, y: 50 });

  // Lazy loading states
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handlePointerMove = (
    event: ReactMouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const xPercent = ((event.clientX - bounds.left) / bounds.width) * 100;
    const yPercent = ((event.clientY - bounds.top) / bounds.height) * 100;
    setPointerPosition({ x: xPercent, y: yPercent });
  };

  // Color customization helper functions
  const getColorName = (hexColor: string): string => {
    if (!selectedModel) return "Custom Color";
    const color = selectedModel.colors.colors.find((c) => c.hex === hexColor);
    return color?.name || "Custom Color";
  };

  const getColorImage = (hexColor: string): string => {
    if (!selectedModel) return "";
    const color = selectedModel.colors.colors.find((c) => c.hex === hexColor);
    return color?.image || selectedModel.colors.colors[0]?.image || "";
  };

  const isLightColor = (hexColor: string): boolean => {
    const hex = hexColor.replace("#", "");
    const bigint = parseInt(
      hex.length === 3
        ? hex
            .split("")
            .map((c) => c + c)
            .join("")
        : hex,
      16
    );
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    // Perceived brightness (YIQ)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 186; // true if light
  };

  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor);

    // Update car images with color-specific images
    const carImages = document.querySelectorAll(
      '[id*="modelColorImage"], [id*="customizationColorImage"]'
    );
    const newImageSrc = getColorImage(newColor);

    carImages.forEach((img) => {
      if (img instanceof HTMLImageElement) {
        img.src = newImageSrc;
      }
    });

    // Update color names
    const colorNames = document.querySelectorAll('[id*="CurrentColorName"]');
    const colorName = getColorName(newColor);
    colorNames.forEach((nameElement) => {
      if (nameElement instanceof HTMLElement) {
        nameElement.textContent = colorName;
      }
    });
  };

  // Helper function to register section for observation
  const registerSection = (sectionId: string, element: HTMLElement | null) => {
    if (element) {
      sectionRefs.current.set(sectionId, element);
      element.setAttribute("data-section-id", sectionId);
      if (observerRef.current && !visibleSections.has(sectionId)) {
        observerRef.current.observe(element);
      }
    }
  };

  // Intersection Observer setup for lazy loading
  useEffect(() => {
    if (typeof window === "undefined") return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute("data-section-id");
          if (sectionId) {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set(prev).add(sectionId));
            }
          }
        });
      },
      {
        rootMargin: "100px 0px", // Start loading 100px before entering viewport
        threshold: 0.1,
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Observe sections when they mount
  useEffect(() => {
    if (!observerRef.current) return;

    sectionRefs.current.forEach((element, sectionId) => {
      if (element && !visibleSections.has(sectionId)) {
        observerRef.current?.observe(element);
      }
    });
  }, [visibleSections]);

  // Make overview section visible immediately
  useEffect(() => {
    setVisibleSections((prev) => new Set(prev).add("overview"));
  }, []);

  // Set page title and meta description based on selected model
  useEffect(() => {
    if (selectedModel) {
      document.title = `${selectedModel.name} | BYD Iloilo - Electric Vehicles Philippines`;

      // Update meta description
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          `Discover the ${selectedModel.name} - ${selectedModel.vehicle_type} with ${selectedModel.powertrain.technology} technology. Starting at ${selectedModel.price}. Available at BYD Iloilo, Philippines.`
        );
      }
    }
  }, [selectedModel]);

  useEffect(() => {
    const modelId = params.id as string;
    const model = carModelsData.find((m) => m.id === modelId);
    if (model) {
      setSelectedModel(model);
      // Set default color to the first color in the model's colors array
      const defaultColor = model.colors.colors[0]?.hex || "#1a1a1a";
      setSelectedColor(defaultColor);

      // Set initial color-specific image
      const initialImageSrc = getColorImage(defaultColor);

      // Update all car images with the initial color
      setTimeout(() => {
        const carImages = document.querySelectorAll(
          '[id*="modelColorImage"], [id*="customizationColorImage"]'
        );
        carImages.forEach((img) => {
          if (img instanceof HTMLImageElement) {
            img.src = initialImageSrc;
          }
        });
      }, 100);
    }
  }, [params.id]);

  // Generate structured data for individual model
  const modelStructuredData = selectedModel
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: selectedModel.name,
        description: `${selectedModel.vehicle_type} - ${selectedModel.powertrain.technology} technology`,
        image: selectedModel.colors.colors.map((color) => color.image),
        brand: {
          "@type": "Brand",
          name: "BYD",
        },
        category: "Electric Vehicle",
        vehicleType: selectedModel.vehicle_type,
        powertrain: selectedModel.powertrain.technology,
        color: selectedModel.colors.colors.map((color) => color.name),
        offers: {
          "@type": "Offer",
          price: selectedModel.price,
          priceCurrency: "PHP",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "BYD Iloilo",
            url: "https://byd-iloilo.com",
          },
        },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Vehicle Type",
            value: selectedModel.vehicle_type,
          },
          {
            "@type": "PropertyValue",
            name: "Powertrain",
            value: selectedModel.powertrain.technology,
          },
          {
            "@type": "PropertyValue",
            name: "Available Colors",
            value: selectedModel.colors.colors
              .map((color) => color.name)
              .join(", "),
          },
        ],
      }
    : null;

  if (!selectedModel) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black pb-24 md:pb-0">
      {modelStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(modelStructuredData),
          }}
        />
      )}
      <Sidebar isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />

      <Navbar showContent={showContent} onToggleSidebar={toggleSidebar} />

      {/* Sticky Section Navigation - Section links and model info */}
      <nav className="sticky top-0 z-20">
        <div className="bg-white/10 backdrop-blur-2xl">
          <div className="max-w-full mx-auto px-6 lg:container">
            <div className="flex items-center justify-center md:justify-between h-14">
              {/* Left - Section Links */}
              <div className="flex items-center space-x-6">
                <a
                  href="#overview"
                  className="text-white/70 hover:text-white text-sm font-medium transition-colors"
                >
                  Overview
                </a>
                <a
                  href="#customize"
                  className="text-white/70 hover:text-white text-sm font-medium transition-colors"
                >
                  Customize
                </a>
                <a
                  href="#specs"
                  className="text-white/70 hover:text-white text-sm font-medium transition-colors"
                >
                  Specifications
                </a>
                <a
                  href="#features"
                  className="text-white/70 hover:text-white text-sm font-medium transition-colors"
                >
                  Features
                </a>
              </div>

              {/* Right - Model Info and Quote Button */}
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-3 text-right">
                  <div>
                    <h3 className="text-white font-semibold text-sm">
                      {selectedModel.name}
                    </h3>
                    <p className="text-white/60 text-xs">
                      Starting at {selectedModel.price}
                    </p>
                  </div>
                </div>
                <button className="hidden md:inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
                  Get A Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section - Background image with enhanced typography */}
      <section
        id="overview"
        className="relative z-10"
        ref={(el) => registerSection("overview", el)}
      >
        {visibleSections.has("overview") && (
          <div className="relative min-h-[100vh] lg:min-h-[40vh] p-20 overflow-hidden border border-white/10">
            {/* Background (color-aware) */}
            <Image
              src={selectedModel.image}
              alt={selectedModel.name}
              fill
              priority
              id="modelColorImage"
              className="object-cover"
            />

            {/* Readability overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
            <div className="absolute inset-0 [background:radial-gradient(100%_60%_at_85%_20%,rgba(255,255,255,0.18)_0%,rgba(0,0,0,0)_60%)] mix-blend-overlay opacity-50" />

            {/* Content */}
            <div className="relative h-full w-full">
              <div className="container mx-auto h-full flex items-end pb-10 lg:items-center lg:pb-0">
                <div className="w-full max-w-2xl flex flex-col gap-5">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
                    <span className="block drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]">
                      {selectedModel.name}
                    </span>
                  </h1>

                  <p className="text-sm sm:text-md text-white/85 max-w-xl tracking-wide">
                    {selectedModel.description}
                  </p>

                  <div className="inline-flex items-center gap-2">
                    <span className="text-white/80 text-sm">Starting at</span>
                    <span className="text-sm font-bold text-white">
                      {selectedModel.price}
                    </span>
                  </div>

                  {/* Powertrain Badge */}
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium text-white/90 bg-white/10 border border-white/15 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
                      {selectedModel.powertrain.technology}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium text-white/90 bg-white/10 border border-white/15 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
                      {selectedModel.vehicle_type}
                    </span>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div>
                      <Link href="#">
                        <button className="relative w-full group/btn rounded-xl px-4 py-3 text-sm font-medium text-white/90 bg-white/10 backdrop-blur-md border border_white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-white/15 hover:border-white/25 hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:scale-[0.99]">
                          <span
                            className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                            aria-hidden="true"
                          ></span>
                          <span className="relative z-10 flex items-center justify-between tracking-wide">
                            <span>Schedule Test Drive</span>
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
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Color Customization Section */}
      <section
        id="customize"
        className="relative z-10 px-4 sm:px-6 md:px-8 pb-20"
        ref={(el) => registerSection("customize", el)}
      >
        {visibleSections.has("customize") && (
          <div className="container mx-auto">
            {/* Header Section */}
            <header className="relative z-10 pt-20 pb-16 px-4 sm:px-6 md:px-8">
              <div className="container mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold italic mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/85 to-white/60">
                  Customize Your {selectedModel.name}
                </h1>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                  Experience your {selectedModel.name} in different colors with
                  our interactive color visualization tool
                </p>
              </div>
            </header>

            {/* Car Display - Futuristic Frame */}
            <div className="max-w-5xl mx-auto mb-12">
              <div className="relative group">
                {/* Main Car Image Container */}
                <div className="relative h-[500px] lg:h-[600px] rounded-[28px] overflow-hidden border border-white/10 bg-black/30 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                  {/* Neon grid background */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.06),transparent_45%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:100%_28px]" />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:28px_100%]" />
                  </div>

                  {/* Accent edges */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="absolute top-6 left-6 h-10 w-10 rounded-xl border border-white/10 bg-white/5" />
                  <div className="absolute top-6 right-6 h-10 w-10 rounded-xl border border-white/10 bg-white/5" />

                  {/* Car Image */}
                  <Image
                    src={getColorImage(selectedColor || "#1a1a1a")}
                    alt={selectedModel.name}
                    fill
                    className="object-contain object-center"
                    id="customizationColorImage"
                  />

                  {/* Floating Color Badge */}
                  <div className="absolute top-6 left-6 py-2 pl-2 pr-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl flex items-center gap-2">
                    <span
                      className="inline-block h-5 w-5 rounded-full border border-white/30"
                      style={{ backgroundColor: selectedColor || "#1a1a1a" }}
                    />
                    <span className="text-white/90 text-sm font-semibold tracking-wide">
                      {getColorName(selectedColor || "#1a1a1a")}
                    </span>
                  </div>

                  {/* Bottom glow */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-24 bg-white/10 blur-3xl rounded-full" />
                </div>
              </div>
            </div>

            {/* Color Selection Panel - Futuristic */}
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h4 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Available Colors
                </h4>
                <p className="text-gray-400 text-lg">
                  Click on any color to see it applied to your{" "}
                  {selectedModel.name}
                </p>
              </div>

              {/* Swatch Grid */}
              <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto justify-items-center justify-center">
                {selectedModel?.colors.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorChange(color.hex)}
                    aria-label={`Select ${color.name}`}
                    className={`group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/60 focus-visible:ring-offset-black rounded-2xl p-[2px] transition-transform ${
                      selectedColor === color.hex
                        ? "scale-105"
                        : "hover:scale-105"
                    }`}
                  >
                    {/* Outer neon frame */}
                    <div
                      className={`rounded-2xl w-20 h-20 md:w-24 md:h-24 border ${
                        selectedColor === color.hex
                          ? "border-white/60"
                          : "border-white/25"
                      } bg-white/5 backdrop-blur-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.4)] relative overflow-hidden`}
                    >
                      {/* Glow ring */}
                      <div
                        className={`absolute -inset-1 rounded-3xl blur-xl transition-opacity ${
                          selectedColor === color.hex
                            ? "opacity-40"
                            : "opacity-0 group-hover:opacity-30"
                        }`}
                        style={{
                          background: `radial-gradient(closest-side, ${color.hex}, transparent)`,
                        }}
                      />

                      {/* Core swatch */}
                      <div
                        className="absolute inset-2 rounded-xl border border-white/20"
                        style={{ backgroundColor: color.hex }}
                      />

                      {/* Check badge */}
                      {selectedColor === color.hex && (
                        <div
                          className={`absolute top-2 right-2 h-7 w-7 rounded-full flex items-center justify-center shadow-lg z-10 ${
                            isLightColor(color.hex)
                              ? "bg-black text-white"
                              : "bg-white text-black"
                          }`}
                        >
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Label */}
                    <div className="mt-2 text-center">
                      <div className="text-white/90 text-xs font-medium tracking-wide">
                        {color.name}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Specifications Section */}
      <section
        id="specs"
        className="relative z-10 px-4 sm:px-6 md:px-8 pb-20"
        ref={(el) => registerSection("specs", el)}
      >
        {visibleSections.has("specs") && (
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Technical Specifications
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Dimensions
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Overall Length (mm)</span>
                    <span className="text-white font-semibold">
                      {selectedModel.dimensions.overall_length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Overall Width (mm)</span>
                    <span className="text-white font-semibold">
                      {selectedModel.dimensions.overall_width}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Overall Height (mm)</span>
                    <span className="text-white font-semibold">
                      {selectedModel.dimensions.overall_height}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Wheelbase (mm)</span>
                    <span className="text-white font-semibold">
                      {selectedModel.dimensions.wheelbase}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">
                      Unladen Ground Clearance (mm)
                    </span>
                    <span className="text-white font-semibold">
                      {selectedModel.dimensions.unladen_ground_clearance}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Luggage Capacity</span>
                    <span className="text-white font-semibold">
                      {selectedModel.dimensions.luggage_capacity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Turning Radius</span>
                    <span className="text-white font-semibold">
                      {selectedModel.dimensions.turning_radius}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Curb Weight</span>
                    <span className="text-white font-semibold">
                      {selectedModel.dimensions.curb_weight}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Seating Capacity</span>
                    <span className="text-white font-semibold">
                      {selectedModel.dimensions.seating_capacity}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Powertrain
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Technology</span>
                    <span className="text-white font-semibold">
                      {selectedModel.powertrain.technology}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Drivetrain</span>
                    <span className="text-white font-semibold">
                      {selectedModel.powertrain.drivetrain}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Front Motor Type</span>
                    <span className="text-white font-semibold">
                      <span className="text-white font-semibold">
                        {selectedModel.powertrain.front_motor_type}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Front Motor Power</span>
                    <span className="text-white font-semibold">
                      <span className="text-white font-semibold">
                        {selectedModel.powertrain.front_motor_power}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Front Motor Torque</span>
                    <span className="text-white font-semibold">
                      <span className="text-white font-semibold">
                        {selectedModel.powertrain.front_motor_torque}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Performance
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Acceleration</span>
                    <span className="text-white font-semibold">
                      {selectedModel.performance.acceleration}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">EV Driving Range</span>
                    <span className="text-white font-semibold">
                      {selectedModel.performance.ev_driving_ranger}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Battery Type</span>
                    <span className="text-white font-semibold">
                      {selectedModel.performance.battery_type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Battery Capacity</span>
                    <span className="text-white font-semibold">
                      {selectedModel.performance.battery_capacity}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Chassis
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Front Suspension</span>
                    <span className="text-white font-semibold">
                      {selectedModel.chassis.front_suspension}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Rear Suspension</span>
                    <span className="text-white font-semibold">
                      {selectedModel.chassis.rear_suspension}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Front Brake</span>
                    <span className="text-white font-semibold">
                      {selectedModel.chassis.front_brake}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Rear Brake</span>
                    <span className="text-white font-semibold">
                      {selectedModel.chassis.rear_brake}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Wheel Type</span>
                    <span className="text-white font-semibold">
                      {selectedModel.chassis.wheel_type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Tire Size</span>
                    <span className="text-white font-semibold">
                      {selectedModel.chassis.tire_size}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 px-4 sm:px-6 md:px-8 pb-20"
        ref={(el) => registerSection("features", el)}
      >
        {visibleSections.has("features") && (
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Key Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Advanced Electric Powertrain",
                "Modern Design & Styling",
                "Premium Interior Materials",
                "Smart Connectivity Features",
                "Advanced Safety Systems",
                "Eco-Friendly Technology",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-2xl rounded-xl border border-white/10"
                >
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <span className="text-gray-200 text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Tools Section */}
      <ToolsSection
        pointerPosition={pointerPosition}
        onPointerMove={handlePointerMove}
      />

      {/* Mobile Sticky Footer: Model Name + Price + Get Quote */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-white/10 md:hidden transition-all duration-300">
        <div className="max-w-full mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-white leading-none">
              {selectedModel.name}
            </span>
            <span className="text-xs text-white/60 leading-tight">
              Starting at{" "}
              <span className="font-bold">{selectedModel.price}</span>
            </span>
          </div>
          <button className="inline-flex items-center justify-center gap-2 bg-white text-black px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
            Get A Quote
          </button>
        </div>
      </div>

      <Footer />

      <ScrollToTop />
    </div>
  );
}
