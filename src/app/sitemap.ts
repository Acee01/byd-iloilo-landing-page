import { MetadataRoute } from "next";
import { getAllCarModels } from "../lib/carModels";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://byd-iloilo.com";

  // Get all car models for dynamic routes
  const carModels = await getAllCarModels();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/models`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  // Dynamic model pages
  const modelPages = carModels.map((model) => ({
    url: `${baseUrl}/models/${model.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...modelPages];
}
