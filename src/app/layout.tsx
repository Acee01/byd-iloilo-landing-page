import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "BYD Iloilo - Philippines | Electric Vehicles & Sustainable Mobility",
    template: "%s | BYD Iloilo",
  },
  description:
    "BYD Iloilo offers premium electric vehicles in the Philippines. Explore our range of electric cars, SUVs, and commercial vehicles including Atto 3, Dolphin, Seal, Han, Tang, and more. Experience sustainable mobility with cutting-edge technology.",
  keywords: [
    "BYD Philippines",
    "Electric Vehicles Philippines",
    "BYD Iloilo",
    "Electric Cars Philippines",
    "EV Philippines",
    "Sustainable Mobility",
    "BYD Atto 3",
    "BYD Dolphin",
    "BYD Seal",
    "BYD Han",
    "BYD Tang",
    "Electric SUV Philippines",
    "Zero Emission Vehicles",
    "Green Technology",
    "Electric Vehicle Dealer Iloilo",
    "EV Charging Station",
    "Electric Car Price Philippines",
    "BYD Electric Cars",
    "Clean Energy Vehicles",
    "Eco-Friendly Transportation",
  ],
  authors: [{ name: "BYD Iloilo", url: "https://byd-iloilo.com" }],
  creator: "BYD Iloilo",
  publisher: "BYD Iloilo",
  applicationName: "BYD Iloilo",
  category: "Automotive",
  classification: "Electric Vehicle Dealership",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://byd-iloilo.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-PH": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    title:
      "BYD Iloilo - Philippines | Electric Vehicles & Sustainable Mobility",
    description:
      "Discover BYD's innovative electric vehicles in Iloilo, Philippines. Experience the future of sustainable mobility with our premium range of electric cars, SUVs, and commercial vehicles.",
    url: "https://byd-iloilo.com",
    siteName: "BYD Iloilo",
    images: [
      {
        url: "/images/byd-logo.webp",
        width: 1200,
        height: 630,
        alt: "BYD Iloilo - Electric Vehicles Philippines",
      },
      {
        url: "/images/byd-atto-3.webp",
        width: 1200,
        height: 630,
        alt: "BYD Atto 3 Electric SUV",
      },
      {
        url: "/images/byd-dolphin.webp",
        width: 1200,
        height: 630,
        alt: "BYD Dolphin Electric Hatchback",
      },
    ],
    locale: "en_PH",
    type: "website",
    countryName: "Philippines",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "BYD Iloilo - Philippines | Electric Vehicles & Sustainable Mobility",
    description:
      "Discover BYD's innovative electric vehicles in Iloilo, Philippines. Experience sustainable mobility with cutting-edge technology.",
    images: ["/images/byd-logo.webp"],
    creator: "@BYDIloilo",
    site: "@BYDIloilo",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "BYD Iloilo",
    "application-name": "BYD Iloilo",
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://byd-iloilo.com/#organization",
        name: "BYD Iloilo",
        url: "https://byd-iloilo.com",
        logo: {
          "@type": "ImageObject",
          url: "https://byd-iloilo.com/images/byd-logo.webp",
          width: 200,
          height: 60,
        },
        description:
          "BYD Iloilo offers premium electric vehicles in the Philippines. Experience sustainable mobility with cutting-edge technology.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Iloilo",
          addressCountry: "Philippines",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+63-XXX-XXX-XXXX",
          contactType: "sales",
          areaServed: "Philippines",
          availableLanguage: "English",
        },
        sameAs: [
          "https://www.facebook.com/bydiloilo",
          "https://www.instagram.com/bydiloilo",
          "https://www.twitter.com/bydiloilo",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://byd-iloilo.com/#website",
        url: "https://byd-iloilo.com",
        name: "BYD Iloilo - Electric Vehicles Philippines",
        description:
          "Discover BYD's innovative electric vehicles in Iloilo, Philippines. Experience the future of sustainable mobility.",
        publisher: {
          "@id": "https://byd-iloilo.com/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://byd-iloilo.com/models?search={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://byd-iloilo.com/#localbusiness",
        name: "BYD Iloilo",
        image: "https://byd-iloilo.com/images/byd-logo.webp",
        description: "Electric vehicle dealership in Iloilo, Philippines",
        url: "https://byd-iloilo.com",
        telephone: "+63-XXX-XXX-XXXX",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Iloilo City",
          addressLocality: "Iloilo",
          addressRegion: "Western Visayas",
          postalCode: "5000",
          addressCountry: "PH",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 10.7202,
          longitude: 122.5621,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
        priceRange: "₱₱₱",
        paymentAccepted: "Cash, Credit Card, Bank Transfer",
        currenciesAccepted: "PHP",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
