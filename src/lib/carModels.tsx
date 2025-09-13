export interface CarModel {
  id: string;
  name: string;
  price: string; // Display price with currency symbol and formatting
  vehicle_type: string;
  image: string;
  colors: CarModelColors; // Available colors for this model
  description: string; // This is the description of the car model
  dimensions: Dimensions; // This is the dimensions of the car model
  powertrain: Powertrain; // This is the powertrain of the car model
  performance: Performance; // This is the performance of the car model
  chassis: Chassis;
}

export interface CarColor {
  hex: string;
  name: string;
  image: string;
}

export interface CarModelColors {
  colors: CarColor[];
}

export interface Dimensions {
  overall_length: string;
  overall_width: string;
  overall_height: string;
  wheelbase: string;
  unladen_ground_clearance: string;
  luggage_capacity: string;
  turning_radius: string;
  curb_weight: string;
  seating_capacity: string;
}

export interface Powertrain {
  technology: string;
  drivetrain: string;
  front_motor_type: string;
  front_motor_power: string;
  front_motor_torque: string;
}

export interface Performance {
  acceleration: string;
  ev_driving_ranger: string;
  battery_type: string;
  battery_capacity: string;
}

export interface Chassis {
  front_suspension: string;
  rear_suspension: string;
  front_brake: string;
  rear_brake: string;
  wheel_type: string;
  tire_size: string;
}

// In-memory dataset. Replace this with a real API later if needed.
const CAR_MODELS: CarModel[] = [
  {
    id: "atto-3",
    name: "BYD Atto 3 Dynamic",
    price: "₱1,598,000",
    vehicle_type: "Hatchback",
    image: "/images/byd-atto-3.webp",
    colors: {
      colors: [
        {
          hex: "#1a1a1a",
          name: "Cosmic Black",
          image: "/images/atto-3-cosmic-black.webp", // Default
        },
        {
          hex: "#ffffff",
          name: "Ski White",
          image: "/images/atto-3-ski-white.webp",
        },
        {
          hex: "#808080",
          name: "Boulder Grey",
          image: "/images/atto-3-boulder-grey.webp",
        },
      ],
    },
    description:
      "The BYD Atto 3 Dynamic is a compact electric SUV that offers a sleek and modern design. It features a powerful electric motor and a long-range battery, making it a great choice for city driving and daily commutes.",
    dimensions: {
      overall_length: "4,250 mm",
      overall_width: "1,875 mm",
      overall_height: "1,680 mm",
      wheelbase: "2,720 mm",
      unladen_ground_clearance: "160 mm",
      luggage_capacity: "400 L",
      turning_radius: "5.2 m",
      curb_weight: "1,850 kg",
      seating_capacity: "5",
    },
    powertrain: {
      technology: "Full Electric",
      drivetrain: "Front Motor",
      front_motor_type: "Electric",
      front_motor_power: "150 kW",
      front_motor_torque: "310 Nm",
    },
    performance: {
      acceleration: "6.9 s",
      ev_driving_ranger: "420 km",
      battery_type: "Lithium-ion",
      battery_capacity: "60.48 kWh",
    },
    chassis: {
      front_suspension: "MacPherson Strut",
      rear_suspension: "Multi-Link",
      front_brake: "Disc",
      rear_brake: "Disc",
      wheel_type: "16-inch Alloy",
      tire_size: "205/55 R16",
    },
  },
  {
    id: "dolphin",
    name: "BYD Dolphin",
    price: "₱1,398,000",
    vehicle_type: "Hatchback",
    image: "/images/byd-dolphin.webp",
    colors: {
      colors: [
        {
          hex: "#f3f3f3",
          name: "Cream White",
          image: "/images/BYD-Dolphin-Color-CreamWhite.webp",
        },
        {
          hex: "#757273",
          name: "Urban Grey",
          image: "/images/dolphin-urban-grey.webp",
        },
      ],
    },
    description:
      "The BYD Dolphin is a compact electric hatchback that offers a sleek and modern design. It features a powerful electric motor and a long-range battery, making it a great choice for city driving and daily commutes.",
    powertrain: {
      technology: "Full Electric",
      drivetrain: "Front Motor",
      front_motor_type: "Electric",
      front_motor_power: "150 kW",
      front_motor_torque: "310 Nm",
    },
    dimensions: {
      overall_length: "4,250 mm",
      overall_width: "1,875 mm",
      overall_height: "1,680 mm",
      wheelbase: "2,720 mm",
      unladen_ground_clearance: "160 mm",
      luggage_capacity: "400 L",
      turning_radius: "5.2 m",
      curb_weight: "1,850 kg",
      seating_capacity: "5",
    },
    performance: {
      acceleration: "6.9 s",
      ev_driving_ranger: "420 km",
      battery_type: "Lithium-ion",
      battery_capacity: "60.48 kWh",
    },
    chassis: {
      front_suspension: "MacPherson Strut",
      rear_suspension: "Multi-Link",
      front_brake: "Disc",
      rear_brake: "Disc",
      wheel_type: "16-inch Alloy",
      tire_size: "205/55 R16",
    },
  },
  {
    id: "seagull",
    name: "BYD Seagull",
    price: "₱998,000",
    vehicle_type: "Mini Hatchback",
    image: "/images/byd-seagull.webp",
    colors: {
      colors: [
        {
          hex: "#a5ad19",
          name: "Sprout Green",
          image: "/images/seagull-sprout-green.webp",
        },
        {
          hex: "#eceee7",
          name: "Apricity White",
          image: "/images/BYD-Seagull-Color-ApricityWhite.webp",
        },
        {
          hex: "#050505",
          name: "Delan Black",
          image: "/images/BYD-Seagull-Color-DelanBlack.webp",
        },
      ],
    },
    description:
      "The BYD Seagull is a compact electric mini hatchback that offers a sleek and modern design. It features a powerful electric motor and a long-range battery, making it a great choice for city driving and daily commutes.",
    powertrain: {
      technology: "Full Electric",
      drivetrain: "Front Motor",
      front_motor_type: "Electric",
      front_motor_power: "150 kW",
      front_motor_torque: "310 Nm",
    },
    dimensions: {
      overall_length: "4,250 mm",
      overall_width: "1,875 mm",
      overall_height: "1,680 mm",
      wheelbase: "2,720 mm",
      unladen_ground_clearance: "160 mm",
      luggage_capacity: "400 L",
      turning_radius: "5.2 m",
      curb_weight: "1,850 kg",
      seating_capacity: "5",
    },
    performance: {
      acceleration: "6.9 s",
      ev_driving_ranger: "420 km",
      battery_type: "Lithium-ion",
      battery_capacity: "60.48 kWh",
    },
    chassis: {
      front_suspension: "MacPherson Strut",
      rear_suspension: "Multi-Link",
      front_brake: "Disc",
      rear_brake: "Disc",
      wheel_type: "16-inch Alloy",
      tire_size: "205/55 R16",
    },
  },
  {
    id: "seal_advanced",
    name: "BYD Seal Advanced",
    price: "₱1,798,000",
    vehicle_type: "Hatchback",
    image: "/images/byd-SealAdvanced.webp",
    colors: {
      colors: [
        {
          hex: "#3d5373",
          name: "Arctic Blue",
          image: "/images/BYD-SealEV-Color-ArcticBlue.webp",
        },
        {
          hex: "#a9b4c0",
          name: "Aurora White",
          image: "/images/BYD-SealEV-Color-AuroraWhite.webp",
        },
        {
          hex: "#1d2129",
          name: "Cosmos Black",
          image: "/images/BYD-SealEV-Color-CosmosBlack.webp",
        },
        {
          hex: "#2c415a",
          name: "Atlantis Grey",
          image: "/images/BYD-SealEV-Color-AtlantisGrey.webp",
        },
      ],
    },
    description:
      "The BYD Seal Advanced is a premium electric hatchback that offers a sleek and modern design. It features a powerful electric motor and a long-range battery, making it a great choice for city driving and daily commutes.",
    powertrain: {
      technology: "Full Electric",
      drivetrain: "Front Motor",
      front_motor_type: "Electric",
      front_motor_power: "150 kW",
      front_motor_torque: "310 Nm",
    },
    dimensions: {
      overall_length: "4,250 mm",
      overall_width: "1,875 mm",
      overall_height: "1,680 mm",
      wheelbase: "2,720 mm",
      unladen_ground_clearance: "160 mm",
      luggage_capacity: "400 L",
      turning_radius: "5.2 m",
      curb_weight: "1,850 kg",
      seating_capacity: "5",
    },
    performance: {
      acceleration: "6.9 s",
      ev_driving_ranger: "420 km",
      battery_type: "Lithium-ion",
      battery_capacity: "60.48 kWh",
    },
    chassis: {
      front_suspension: "MacPherson Strut",
      rear_suspension: "Multi-Link",
      front_brake: "Disc",
      rear_brake: "Disc",
      wheel_type: "16-inch Alloy",
      tire_size: "205/55 R16",
    },
  },
  {
    id: "tang",
    name: "BYD Tang",
    price: "₱2,298,000",
    vehicle_type: "Hatchback",
    image: "/images/byd-tang.webp",
    colors: {
      colors: [
        {
          hex: "#030509",
          name: "Silver Sand Black",
          image: "/images/BYD-Tang-Color-SilverSandBlack.webp",
        },
        {
          hex: "#e7eaf3",
          name: "Snowy White",
          image: "/images/BYD-Tang-Color-SnowyWhite.webp",
        },
        {
          hex: "#8c8f97",
          name: "Ridge Grey",
          image: "/images/BYD-Tang-Color-RidgeGrey.webp",
        },
      ],
    },
    description:
      "The BYD Tang is a premium electric SUV that combines luxury with sustainability. It features advanced electric technology and spacious interior design.",
    powertrain: {
      technology: "Full Electric",
      drivetrain: "Front Motor",
      front_motor_type: "Electric",
      front_motor_power: "150 kW",
      front_motor_torque: "310 Nm",
    },
    dimensions: {
      overall_length: "4,250 mm",
      overall_width: "1,875 mm",
      overall_height: "1,680 mm",
      wheelbase: "2,720 mm",
      unladen_ground_clearance: "160 mm",
      luggage_capacity: "400 L",
      turning_radius: "5.2 m",
      curb_weight: "1,850 kg",
      seating_capacity: "5",
    },
    performance: {
      acceleration: "6.9 s",
      ev_driving_ranger: "420 km",
      battery_type: "Lithium-ion",
      battery_capacity: "60.48 kWh",
    },
    chassis: {
      front_suspension: "MacPherson Strut",
      rear_suspension: "Multi-Link",
      front_brake: "Disc",
      rear_brake: "Disc",
      wheel_type: "16-inch Alloy",
      tire_size: "205/55 R16",
    },
  },
  {
    id: "han",
    name: "BYD Han",
    price: "₱3,298,000",
    vehicle_type: "Hatchback",
    image: "/images/byd-han.webp",
    colors: {
      colors: [
        {
          hex: "#090909",
          name: "Cosmos Black",
          image: "/images/BYD-Han-Color-CosmosBlack.webp",
        },
        {
          hex: "#f8fcfd",
          name: "Arctic White",
          image: "/images/BYD-Han-Color-ArcticWhite.webp",
        },
      ],
    },
    description:
      "The BYD Han is a luxury electric sedan that represents the pinnacle of BYD's electric vehicle technology and design excellence.",
    powertrain: {
      technology: "Full Electric",
      drivetrain: "Front Motor",
      front_motor_type: "Electric",
      front_motor_power: "150 kW",
      front_motor_torque: "310 Nm",
    },
    dimensions: {
      overall_length: "4,250 mm",
      overall_width: "1,875 mm",
      overall_height: "1,680 mm",
      wheelbase: "2,720 mm",
      unladen_ground_clearance: "160 mm",
      luggage_capacity: "400 L",
      turning_radius: "5.2 m",
      curb_weight: "1,850 kg",
      seating_capacity: "5",
    },
    performance: {
      acceleration: "6.9 s",
      ev_driving_ranger: "420 km",
      battery_type: "Lithium-ion",
      battery_capacity: "60.48 kWh",
    },
    chassis: {
      front_suspension: "MacPherson Strut",
      rear_suspension: "Multi-Link",
      front_brake: "Disc",
      rear_brake: "Disc",
      wheel_type: "16-inch Alloy",
      tire_size: "205/55 R16",
    },
  },
  {
    id: "emax",
    name: "BYD eMAX 7 Standard",
    price: "₱3,598,000",
    vehicle_type: "Hatchback",
    image: "/images/byd-emax7.webp",
    colors: {
      colors: [
        {
          hex: "#424952",
          name: "Cosmos Black",
          image: "/images/BYD-eMax7-Color-CosmosBlack.webp",
        },
        {
          hex: "#a3b0c0",
          name: "Crystal White",
          image: "/images/BYD-eMax7-Color-CrystalWhite.webp",
        },
        {
          hex: "#455979",
          name: "Quartz Blue",
          image: "/images/BYD-eMax7-Color-QuartzBlue.webp",
        },
        {
          hex: "#47494a",
          name: "Harbour Grey",
          image: "/images/BYD-eMax7-Color-HarbourGrey.webp",
        },
      ],
    },
    description:
      "The BYD eMAX 7 Standard is a professional electric vehicle designed for commercial and fleet use with advanced electric technology.",
    powertrain: {
      technology: "Full Electric",
      drivetrain: "Front Motor",
      front_motor_type: "Electric",
      front_motor_power: "150 kW",
      front_motor_torque: "310 Nm",
    },
    dimensions: {
      overall_length: "4,250 mm",
      overall_width: "1,875 mm",
      overall_height: "1,680 mm",
      wheelbase: "2,720 mm",
      unladen_ground_clearance: "160 mm",
      luggage_capacity: "400 L",
      turning_radius: "5.2 m",
      curb_weight: "1,850 kg",
      seating_capacity: "5",
    },
    performance: {
      acceleration: "6.9 s",
      ev_driving_ranger: "420 km",
      battery_type: "Lithium-ion",
      battery_capacity: "60.48 kWh",
    },
    chassis: {
      front_suspension: "MacPherson Strut",
      rear_suspension: "Multi-Link",
      front_brake: "Disc",
      rear_brake: "Disc",
      wheel_type: "16-inch Alloy",
      tire_size: "205/55 R16",
    },
  },
  {
    id: "sealion",
    name: "BYD Sealion 5 DM-i",
    price: "₱2,198,000",
    vehicle_type: "Hatchback",
    image: "/images/byd-sealion-dmi.webp",
    colors: {
      colors: [
        {
          hex: "#e6e8ea",
          name: "Stone Grey",
          image: "/images/BYD-Sealion6-DMi-Color-StoneGrey.webp",
        },
        {
          hex: "#414246",
          name: "Harbour Grey",
          image: "/images/BYD-Sealion6-DMi-Color-HarbourGrey.webp",
        },
        {
          hex: "#ebedef",
          name: "Arctic White",
          image: "/images/BYD-Sealion6-DMi-Color-ArcticWhite.webp",
        },
      ],
    },
    description:
      "The BYD Sealion 5 DM-i is a hybrid electric vehicle that combines electric and traditional powertrain technology for optimal efficiency.",
    powertrain: {
      technology: "Full Electric",
      drivetrain: "Front Motor",
      front_motor_type: "Electric",
      front_motor_power: "150 kW",
      front_motor_torque: "310 Nm",
    },
    dimensions: {
      overall_length: "4,250 mm",
      overall_width: "1,875 mm",
      overall_height: "1,680 mm",
      wheelbase: "2,720 mm",
      unladen_ground_clearance: "160 mm",
      luggage_capacity: "400 L",
      turning_radius: "5.2 m",
      curb_weight: "1,850 kg",
      seating_capacity: "5",
    },
    performance: {
      acceleration: "6.9 s",
      ev_driving_ranger: "420 km",
      battery_type: "Lithium-ion",
      battery_capacity: "60.48 kWh",
    },
    chassis: {
      front_suspension: "MacPherson Strut",
      rear_suspension: "Multi-Link",
      front_brake: "Disc",
      rear_brake: "Disc",
      wheel_type: "16-inch Alloy",
      tire_size: "205/55 R16",
    },
  },
  {
    id: "eMax7SuperiorCaptain",
    name: "BYD eMax 7 Superior Captain",
    price: "₱1,198,000",
    vehicle_type: "Hatchback",
    image: "/images/byd-emax7.webp",
    colors: {
      colors: [
        {
          hex: "#455979",
          name: "Quartz Blue",
          image: "/images/BYD-eMax7-Color-QuartzBlue.webp",
        },
        {
          hex: "#a3b0c0",
          name: "Crystal White",
          image: "/images/BYD-eMax7-Color-CrystalWhite.webp",
        },
        {
          hex: "#424952",
          name: "Cosmos Black",
          image: "/images/BYD-eMax7-Color-CosmosBlack.webp",
        },
        {
          hex: "#47494a",
          name: "Harbour Grey",
          image: "/images/BYD-eMax7-Color-HarbourGrey.webp",
        },
      ],
    },
    description:
      "The BYD eMax 7 Superior Captain is a premium electric vehicle designed for executive and professional use with advanced features and comfort.",
    powertrain: {
      technology: "Full Electric",
      drivetrain: "Front Motor",
      front_motor_type: "Electric",
      front_motor_power: "150 kW",
      front_motor_torque: "310 Nm",
    },
    dimensions: {
      overall_length: "4,250 mm",
      overall_width: "1,875 mm",
      overall_height: "1,680 mm",
      wheelbase: "2,720 mm",
      unladen_ground_clearance: "160 mm",
      luggage_capacity: "400 L",
      turning_radius: "5.2 m",
      curb_weight: "1,850 kg",
      seating_capacity: "5",
    },
    performance: {
      acceleration: "6.9 s",
      ev_driving_ranger: "420 km",
      battery_type: "Lithium-ion",
      battery_capacity: "60.48 kWh",
    },
    chassis: {
      front_suspension: "MacPherson Strut",
      rear_suspension: "Multi-Link",
      front_brake: "Disc",
      rear_brake: "Disc",
      wheel_type: "16-inch Alloy",
      tire_size: "205/55 R16",
    },
  },
];

export const carModelsData = CAR_MODELS;

export function parseCurrencyToNumber(value: string): number {
  return parseInt(value.replace(/[^\d]/g, ""), 10);
}

// Simulated async helpers (fetch-like). Replace with real fetch() if you move to an API.
export async function getAllCarModels(): Promise<CarModel[]> {
  return CAR_MODELS;
}

export async function getCarModelById(id: string): Promise<CarModel | null> {
  return CAR_MODELS.find((m) => m.id === id) ?? null;
}

export interface SearchModelsOptions {
  query?: string;
  powertrains?: string[];
  vehicleTypes?: string[];
  minPrice?: number;
  maxPrice?: number;
}
