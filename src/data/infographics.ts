import type { Infographic, LocalizedInfographic } from "@/types";
import type { Locale } from "@/i18n/config";

import { reactQuery } from "./entries/react-query";
import { jsonServer } from "./entries/json-server";
import { concurrently } from "./entries/concurrently";
import { axios } from "./entries/axios";
import { bash } from "./entries/bash";
import { daisyui } from "./entries/daisyui";
import { nextjs } from "./entries/nextjs";
import { reactHookForm } from "./entries/react-hook-form";
import { reactRouter } from "./entries/react-router";
import { vite } from "./entries/vite";
import { zod } from "./entries/zod";
import { zustand } from "./entries/zustand";

export const infographics: Infographic[] = [
  reactQuery,
  nextjs,
  vite,
  zustand,
  reactRouter,
  reactHookForm,
  zod,
  axios,
  daisyui,
  jsonServer,
  concurrently,
  bash,
];

export function getInfographicByLocaleSlug(
  locale: Locale,
  slug: string
): { item: Infographic; t: LocalizedInfographic } | undefined {
  for (const item of infographics) {
    const t = item.translations[locale];
    if (t && t.slug === slug) return { item, t };
  }
  return undefined;
}

export function getInfographicById(id: string): Infographic | undefined {
  return infographics.find((item) => item.id === id);
}

export function getAllSlugsForLocale(locale: Locale): string[] {
  return infographics.map((item) => item.translations[locale].slug);
}

export function getAllParams(): { lang: string; slug: string }[] {
  const params: { lang: string; slug: string }[] = [];
  for (const item of infographics) {
    for (const lang of Object.keys(item.translations) as Locale[]) {
      params.push({ lang, slug: item.translations[lang].slug });
    }
  }
  return params;
}

export function getRelatedInfographics(
  id: string,
  locale: Locale,
  limit = 3
): Array<{ item: Infographic; t: LocalizedInfographic }> {
  const current = getInfographicById(id);
  if (!current) return [];

  const scored = infographics
    .filter((item) => item.id !== id)
    .map((item) => ({
      item,
      score: item.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score);

  return scored
    .slice(0, limit)
    .map((entry) => ({ item: entry.item, t: entry.item.translations[locale] }));
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  for (const item of infographics) {
    for (const tag of item.tags) tagSet.add(tag);
  }
  return Array.from(tagSet).sort();
}

export function getAlternateLocaleSlugs(id: string): Record<Locale, string> {
  const item = getInfographicById(id);
  if (!item) return { tr: "", en: "" };
  return {
    tr: item.translations.tr.slug,
    en: item.translations.en.slug,
  };
}
