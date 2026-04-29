export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

export const localeMeta: Record<Locale, { name: string; htmlLang: string; ogLocale: string; flag: string }> = {
  tr: { name: "Türkçe", htmlLang: "tr", ogLocale: "tr_TR", flag: "TR" },
  en: { name: "English", htmlLang: "en", ogLocale: "en_US", flag: "EN" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function pickLocale(input: string | null | undefined): Locale {
  if (!input) return defaultLocale;
  const lower = input.toLowerCase();
  for (const locale of locales) {
    if (lower === locale || lower.startsWith(`${locale}-`)) return locale;
  }
  return defaultLocale;
}
