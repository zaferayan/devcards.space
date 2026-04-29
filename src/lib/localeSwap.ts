import { infographics } from "@/data/infographics";
import { locales, type Locale } from "@/i18n/config";

type SwapMap = Record<Locale, Record<string, Record<Locale, string>>>;

function build(): SwapMap {
  const map = {} as SwapMap;
  for (const locale of locales) {
    map[locale] = {};
  }

  for (const item of infographics) {
    for (const sourceLocale of locales) {
      const sourceSlug = item.translations[sourceLocale].slug;
      const entry: Record<Locale, string> = {} as Record<Locale, string>;
      for (const targetLocale of locales) {
        entry[targetLocale] = item.translations[targetLocale].slug;
      }
      map[sourceLocale][sourceSlug] = entry;
    }
  }

  return map;
}

export const localeSwapMap: SwapMap = build();
