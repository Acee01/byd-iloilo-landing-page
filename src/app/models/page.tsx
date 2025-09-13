"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ScrollToTop from "../../components/ScrollToTop";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import ModelActions from "../../components/ModelActions";
import Sidebar from "../../components/Sidebar";
import {
  type CarModel,
  getAllCarModels,
  parseCurrencyToNumber,
} from "../../lib/carModels";

// Data source
let initialModelsCache: CarModel[] | null = null;

// Wireframe Skeleton Component
const WireframeSkeleton = () => (
  <div className="min-h-screen bg-black overflow-hidden">
    {/* Navigation Skeleton */}
    <div className="relative z-10 bg-gradient-to-b from-black/90 via-black/60 to-transparent w-full">
      <nav className="flex items-center px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 container mx-auto">
        <div className="w-24 h-8 bg-white/10 rounded animate-pulse"></div>
        <div className="absolute left-1/2 transform -translate-x-1/2 w-32 h-12 bg-white/10 rounded animate-pulse"></div>
        <div className="ml-auto w-16 h-8 bg-white/10 rounded animate-pulse"></div>
      </nav>
    </div>

    {/* Background Elements */}
    <div className="absolute inset-0">
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
    </div>

    {/* Header Skeleton */}
    <header className="relative z-10 pt-20 pb-16 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto text-center">
        <div className="h-10 w-64 sm:w-80 md:w-96 bg-white/10 rounded mx-auto mb-4 animate-pulse"></div>
        <div className="h-4 w-64 sm:w-96 md:w-[32rem] bg-white/10 rounded mx-auto animate-pulse"></div>
      </div>
    </header>

    {/* Search Bar Skeleton */}
    <div className="relative z-10 px-4 sm:px-6 md:px-8 mb-12">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-2">
            <div className="h-10 bg-white/5 rounded-xl animate-pulse"></div>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 bg-white/10 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    {/* Filters Skeleton */}
    <div className="relative z-10 px-4 sm:px-6 md:px-8 mb-12">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5"
            aria-hidden="true"
          ></div>
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
            <div className="h-4 w-20 bg-white/10 rounded animate-pulse"></div>
            <div className="h-6 w-16 bg-white/10 rounded animate-pulse"></div>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Powertrain */}
            <div>
              <div className="h-4 w-24 bg-white/10 rounded mb-3 animate-pulse"></div>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded bg-white/10 animate-pulse"></div>
                    <div className="h-3 w-24 bg-white/10 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
            {/* Vehicle Type */}
            <div>
              <div className="h-4 w-28 bg-white/10 rounded mb-3 animate-pulse"></div>
              <div className="space-y-2 max-h-40 pr-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded bg-white/10 animate-pulse"></div>
                    <div className="h-3 w-28 bg-white/10 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
            {/* Pricing */}
            <div>
              <div className="h-4 w-16 bg-white/10 rounded mb-3 animate-pulse"></div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="h-9 bg-white/10 rounded-lg border border-white/15 animate-pulse"></div>
                <div className="h-9 bg-white/10 rounded-lg border border-white/15 animate-pulse"></div>
              </div>
              <div className="h-1 w-full bg-white/10 rounded overflow-hidden">
                <div className="h-1 w-1/2 bg-white/30 animate-pulse"></div>
              </div>
              <div className="mt-2 h-3 w-40 bg-white/10 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Results count */}
    <div className="relative z-10 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto">
        <div className="h-4 w-48 bg-white/10 rounded mb-6 animate-pulse"></div>
      </div>
    </div>

    {/* Models Grid Skeleton */}
    <div className="relative z-10 px-4 sm:px-6 md:px-8 pb-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-full mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                {/* Car Image */}
                <div className="w-full h-40 md:h-44 lg:h-48 bg-white/10 animate-pulse"></div>
                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <div className="h-5 w-40 bg-white/10 rounded animate-pulse"></div>
                  <div className="h-3 w-28 bg-white/10 rounded animate-pulse"></div>
                  <div className="h-6 w-24 bg-white/10 rounded-full border border-white/15 animate-pulse"></div>
                  <div className="flex items-center gap-2 pt-1">
                    <div className="h-3 w-24 bg-white/10 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-white/10 rounded animate-pulse"></div>
                  </div>
                  <div className="pt-2 grid grid-cols-2 gap-3">
                    <div className="h-9 bg-white/10 rounded-lg border border-white/15 animate-pulse"></div>
                    <div className="h-9 bg-white/10 rounded-lg border border-white/15 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function ModelsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [carModels, setCarModels] = useState<CarModel[]>([]);
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPowertrains, setSelectedPowertrains] = useState<string[]>([]);
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>(
    []
  );
  const prices = useMemo(
    () => carModels.map((m) => parseCurrencyToNumber(m.price)),
    [carModels]
  );
  const minPrice = useMemo(
    () => (prices.length ? Math.min(...prices) : 0),
    [prices]
  );
  const maxPrice = useMemo(
    () => (prices.length ? Math.max(...prices) : 0),
    [prices]
  );
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });
  const [minInput, setMinInput] = useState<string>("");
  const [maxInput, setMaxInput] = useState<string>("");
  const powertrainOptions = ["Full Electric", "DM-i", "DMO"];
  const vehicleTypeOptions = [
    "Compact Sedan",
    "Compact SUV",
    "Performance SUV",
    "Executive Sedan",
    "Midsize Performance Sedan",
    "Mini Hatchback",
    "Hatchback",
    "Pickup Truck",
    "MPV",
  ];

  // Intersection Observer for lazy loading
  const observerRef = useRef<IntersectionObserver | null>(null);
  const modelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await getAllCarModels();
      setCarModels(data);
    };
    load();
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Set page title and meta description
  useEffect(() => {
    document.title = "Our Models | BYD Iloilo - Electric Vehicles Philippines";

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Explore our complete range of BYD electric vehicles in Iloilo, Philippines. Browse Atto 3, Dolphin, Seal, Han, Tang, and more. Find the perfect electric car for your sustainable lifestyle."
      );
    }
  }, []);

  // Initialize price range once data is available
  useEffect(() => {
    if (carModels.length && prices.length) {
      setPriceRange({ min: Math.min(...prices), max: Math.max(...prices) });
    }
  }, [carModels, prices]);

  // Fallback to show models if intersection observer fails
  useEffect(() => {
    if (isLoading) return;

    const fallbackTimer = setTimeout(() => {
      const modelElements = document.querySelectorAll(".group.cursor-pointer");
      modelElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-8");
        }, index * 100);
      });
    }, 2000);

    return () => clearTimeout(fallbackTimer);
  }, [isLoading]);

  const filteredModels = useCallback(() => {
    const query = searchQuery.trim().toLowerCase();
    return carModels.filter((model) => {
      const numericPrice = parseInt(model.price.replace(/[^\d]/g, ""));
      const matchesSearch =
        query === "" || model.name.toLowerCase().includes(query);
      const matchesPowertrain =
        selectedPowertrains.length === 0 ||
        selectedPowertrains.includes(model.powertrain.technology);
      const matchesVehicleType =
        selectedVehicleTypes.length === 0 ||
        selectedVehicleTypes.includes(model.vehicle_type);
      const matchesPrice =
        numericPrice >= priceRange.min && numericPrice <= priceRange.max;
      return (
        matchesSearch && matchesPowertrain && matchesVehicleType && matchesPrice
      );
    });
  }, [
    searchQuery,
    selectedPowertrains,
    selectedVehicleTypes,
    priceRange.min,
    priceRange.max,
  ]);

  // Lazy loading setup
  useEffect(() => {
    if (typeof window === "undefined" || isLoading) return;

    // Clear previous refs
    modelRefs.current = [];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("opacity-100", "translate-y-0");
            target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { rootMargin: "100px", threshold: 0.1 }
    );

    return () => observerRef.current?.disconnect();
  }, [isLoading]);

  // Observe models when they change
  useEffect(() => {
    if (typeof window === "undefined" || isLoading || !observerRef.current)
      return;

    // Wait for next tick to ensure DOM is updated
    setTimeout(() => {
      modelRefs.current.forEach((ref) => {
        if (ref) observerRef.current?.observe(ref);
      });
    }, 100);
  }, [
    searchQuery,
    selectedPowertrains,
    selectedVehicleTypes,
    priceRange.min,
    priceRange.max,
    isLoading,
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Generate structured data for all models
  const modelsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BYD Electric Vehicle Models",
    description:
      "Complete range of BYD electric vehicles available in Iloilo, Philippines",
    itemListElement: carModels.map((model, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: model.name,
        description: `${model.vehicle_type} - ${model.powertrain.technology}`,
        image: model.colors.colors[0].image,
        brand: {
          "@type": "Brand",
          name: "BYD",
        },
        category: "Electric Vehicle",
        vehicleType: model.vehicle_type,
        powertrain: model.powertrain.technology,
        offers: {
          "@type": "Offer",
          price: model.price,
          priceCurrency: "PHP",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "BYD Iloilo",
          },
        },
      },
    })),
  };

  if (isLoading) {
    return <WireframeSkeleton />;
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(modelsStructuredData),
        }}
      />
      <Sidebar isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />

      <Navbar showContent={true} onToggleSidebar={toggleSidebar} />

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      <header className="relative z-10 pt-20 pb-16 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold italic mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/85 to-white/60">
            OUR MODELS
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Experience the future of mobility with BYD's innovative electric
            vehicles. Each model represents the perfect blend of innovation,
            performance, and sustainability.
          </p>
        </div>
      </header>

      {/* Advanced Search & Filters Section */}
      <section className="relative z-10 px-4 sm:px-6 md:px-8 mb-12">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-2">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search Model Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-white placeholder-white/50 px-4 py-3 outline-none"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-white/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Models Grid */}
        <div className="relative z-10 px-4 sm:px-6 md:px-8 pb-20">
          <div className="container mx-auto">
            {/* Horizontal Filters Container */}
            <div className="mb-8">
              <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5"
                  aria-hidden="true"
                ></div>
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
                  <h2 className="text-white text-sm font-semibold tracking-wide">
                    Filters
                  </h2>
                  <button
                    onClick={() => {
                      setSelectedPowertrains([]);
                      setSelectedVehicleTypes([]);
                      setPriceRange({ min: minPrice, max: maxPrice });
                      setSearchQuery("");
                      setMinInput("");
                      setMaxInput("");
                      searchInputRef.current?.focus();
                    }}
                    className="text-xs px-3 py-1 rounded-lg border border-white/15 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Clear all
                  </button>
                </div>

                {/* Sections - landscape layout */}
                <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Powertrain */}
                  <section>
                    <h3 className="text-white-600 font-semibold text-sm mb-3">
                      Powertrain
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {powertrainOptions.map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedPowertrains.includes(opt)}
                            onChange={() => {
                              setSelectedPowertrains((prev) =>
                                prev.includes(opt)
                                  ? prev.filter((v) => v !== opt)
                                  : [...prev, opt]
                              );
                            }}
                            className="h-4 w-4 rounded border-white/30 bg-transparent text-white focus:ring-white/40"
                          />
                          <span className="text-sm text-white/90">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </section>

                  {/* Vehicle Type */}
                  <section>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white-600 font-semibold text-sm">
                        Vehicle Type
                      </h3>
                      <button
                        onClick={() => setSelectedVehicleTypes([])}
                        className="text-xs px-2 py-1 rounded-md border border-white/15 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1 sidebar-scrollbar">
                      {vehicleTypeOptions.map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedVehicleTypes.includes(opt)}
                            onChange={() => {
                              setSelectedVehicleTypes((prev) =>
                                prev.includes(opt)
                                  ? prev.filter((v) => v !== opt)
                                  : [...prev, opt]
                              );
                            }}
                            className="h-4 w-4 rounded border-white/30 bg-transparent text-white focus:ring-white/40"
                          />
                          <span className="text-sm text-white/90">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </section>

                  {/* Pricing */}
                  <section>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white-600 font-semibold text-sm">
                        Pricing
                      </h3>
                      <button
                        onClick={() => {
                          setPriceRange({ min: minPrice, max: maxPrice });
                          setMinInput("");
                          setMaxInput("");
                        }}
                        className="text-xs px-2 py-1 rounded-md border border-white/15 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <label className="block text-[11px] text-white/60 mb-1">
                          Min
                        </label>
                        <div className="relative">
                          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/60 text-xs">
                            ₱
                          </span>
                          <input
                            type="text"
                            value={minInput}
                            onChange={(e) => {
                              const v = e.target.value;
                              setMinInput(v);
                              const raw = v.replace(/[^\d]/g, "");
                              const parsed =
                                raw === "" ? minPrice : parseInt(raw, 10);
                              setPriceRange((r) => {
                                const clamped = Math.max(
                                  minPrice,
                                  Math.min(
                                    isNaN(parsed) ? minPrice : parsed,
                                    r.max - 1
                                  )
                                );
                                return { ...r, min: clamped };
                              });
                            }}
                            onBlur={() => {
                              const raw = minInput.replace(/[^\d]/g, "");
                              const parsed =
                                raw === "" ? minPrice : parseInt(raw, 10);
                              setPriceRange((r) => {
                                const clamped = Math.max(
                                  minPrice,
                                  Math.min(
                                    isNaN(parsed) ? minPrice : parsed,
                                    r.max - 1
                                  )
                                );
                                return { ...r, min: clamped };
                              });
                            }}
                            min={minPrice}
                            max={priceRange.max - 1}
                            placeholder="Min"
                            className="w-full bg-white/10 text-white placeholder-white/40 rounded-lg border border-white/15 px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] text-white/60 mb-1">
                          Max
                        </label>
                        <div className="relative">
                          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/60 text-xs">
                            ₱
                          </span>
                          <input
                            type="text"
                            value={maxInput}
                            onChange={(e) => {
                              const v = e.target.value;
                              setMaxInput(v);
                              const raw = v.replace(/[^\d]/g, "");
                              const parsed =
                                raw === "" ? maxPrice : parseInt(raw, 10);
                              setPriceRange((r) => {
                                const clamped = Math.min(
                                  maxPrice,
                                  Math.max(
                                    isNaN(parsed) ? maxPrice : parsed,
                                    r.min + 1
                                  )
                                );
                                return { ...r, max: clamped };
                              });
                            }}
                            onBlur={() => {
                              const raw = maxInput.replace(/[^\d]/g, "");
                              const parsed =
                                raw === "" ? maxPrice : parseInt(raw, 10);
                              setPriceRange((r) => {
                                const clamped = Math.min(
                                  maxPrice,
                                  Math.max(
                                    isNaN(parsed) ? maxPrice : parsed,
                                    r.min + 1
                                  )
                                );
                                return { ...r, max: clamped };
                              });
                            }}
                            min={priceRange.min + 1}
                            max={maxPrice}
                            placeholder="Max"
                            className="w-full bg-white/10 text-white placeholder-white/40 rounded-lg border border-white/15 px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="relative py-2">
                      <div className="h-1 rounded bg-white/10">
                        <div
                          className="h-1 rounded bg-white/40"
                          style={{
                            width: `${
                              ((priceRange.max - priceRange.min) /
                                (maxPrice - minPrice)) *
                              100
                            }%`,
                            marginLeft: `${
                              ((priceRange.min - minPrice) /
                                (maxPrice - minPrice)) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                      {/* Range inputs overlay */}
                      <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange.min}
                        onChange={(e) => {
                          const next = Math.min(
                            Number(e.target.value),
                            priceRange.max - 1
                          );
                          setPriceRange((r) => ({ ...r, min: next }));
                          setMinInput(String(next));
                        }}
                        className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer"
                        aria-label="Minimum price"
                      />
                      <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange.max}
                        onChange={(e) => {
                          const next = Math.max(
                            Number(e.target.value),
                            priceRange.min + 1
                          );
                          setPriceRange((r) => ({ ...r, max: next }));
                          setMaxInput(String(next));
                        }}
                        className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer"
                        aria-label="Maximum price"
                      />
                      <div className="mt-2 flex items-center justify-between text-[11px] text-white/60">
                        <span>
                          ₱{priceRange.min.toLocaleString()} - ₱
                          {priceRange.max.toLocaleString()}
                        </span>
                        <span>Range</span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* Results */}
            <div>
              <div className="mb-4 flex items-center justify-between text-sm text-white/70">
                <span>
                  Showing {filteredModels().length} of {carModels.length}
                </span>
              </div>
              {filteredModels().length === 0 ? (
                <div className="max-w-2xl mx-auto">
                  <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5"
                      aria-hidden="true"
                    ></div>
                    <div className="p-8 sm:p-10">
                      <div className="flex items-center gap-4">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 border border-white/15 text_white/90">
                          <svg
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-white text-lg font-semibold">
                            No results found
                          </h3>
                          <p className="text-white/70 text-sm">
                            Try adjusting your search or clear it to see all
                            models.
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center gap-3">
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setSelectedPowertrains([]);
                            setSelectedVehicleTypes([]);
                            setPriceRange({ min: minPrice, max: maxPrice });
                            searchInputRef.current?.focus();
                          }}
                          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-black bg-white hover:bg-white/90 border border-white/10 transition-colors duration-200"
                        >
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          Clear search
                        </button>
                        <span className="text-white/60 text-xs">
                          Tip: search by model name like "Atto" or "Dolphin"
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-full mx-auto">
                  {filteredModels().map((model: CarModel, index: number) => (
                    <div
                      key={model.id}
                      ref={(el) => {
                        modelRefs.current[index] = el;
                      }}
                      className="group opacity-0 translate-y-8 transition-all duration-700 ease-out"
                      style={{ animationDelay: `${index * 100}ms` }}
                      onMouseEnter={() => setHoveredModel(model.id)}
                      onMouseLeave={() => setHoveredModel(null)}
                    >
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
                            <div className="font-bold text-white">
                              {model.price}
                            </div>
                          </div>

                          {/* Actions pinned to bottom */}
                          <ModelActions modelId={model.id} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <ScrollToTop />
    </div>
  );
}
