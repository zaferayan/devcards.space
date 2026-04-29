import type { MetadataRoute } from "next";
import { infographics } from "@/data/infographics";
import { siteConfig } from "@/lib/site";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homeAlternates: Record<string, string> = {};
  for (const code of locales) {
    homeAlternates[code] = `${siteConfig.url}/${code}`;
  }

  const homeEntries: MetadataRoute.Sitemap = locales.map((code) => ({
    url: `${siteConfig.url}/${code}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages: homeAlternates },
  }));

  const itemEntries: MetadataRoute.Sitemap = [];
  for (const item of infographics) {
    const itemAlternates: Record<string, string> = {};
    for (const code of locales) {
      itemAlternates[code] = `${siteConfig.url}/${code}/${item.translations[code].slug}`;
    }
    for (const code of locales) {
      itemEntries.push({
        url: `${siteConfig.url}/${code}/${item.translations[code].slug}`,
        lastModified: new Date(item.updatedAt),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: itemAlternates },
      });
    }
  }

  return [...homeEntries, ...itemEntries];
}
