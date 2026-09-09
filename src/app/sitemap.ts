import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAllProducts } from "@/lib/products";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/catalogue",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/faq",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const productRoutes = getAllProducts().map((p) => ({
    url: `${siteConfig.url}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogRoutes = getAllPosts().map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
