import { tr, type Dictionary } from "./dictionaries/tr";
import { en } from "./dictionaries/en";
import type { Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { tr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary, Locale };
