"use client";

import { useMemo, useState } from "react";
import type { Infographic } from "@/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { format } from "@/i18n/format";
import { InfographicCard } from "./InfographicCard";

type Props = {
  infographics: Infographic[];
  tags: string[];
  locale: Locale;
  dict: Dictionary;
};

export function SearchAndFilter({ infographics, tags, locale, dict }: Props) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return infographics.filter((item) => {
      const matchesTag = activeTag
        ? item.tags.includes(activeTag as Infographic["tags"][number])
        : true;
      if (!matchesTag) return false;
      if (!q) return true;
      const t = item.translations[locale];
      const haystack = [
        t.title,
        t.description,
        t.content.intro,
        ...t.keywords,
        ...item.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, activeTag, infographics, locale]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <label htmlFor="search" className="sr-only">
          {dict.home.searchAriaLabel}
        </label>
        <div className="relative flex-1">
          <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400 dark:text-ink-500"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            id="search"
            type="search"
            placeholder={dict.home.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-ink-200 bg-white py-3 pl-10 pr-4 text-sm text-ink-800 placeholder:text-ink-400 transition-colors focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15 dark:border-white/10 dark:bg-ink-800 dark:text-ink-100 dark:placeholder:text-ink-500"
            aria-label={dict.home.searchAriaLabel}
          />
        </div>
        <p className="text-xs text-ink-500 dark:text-ink-400" aria-live="polite">
          {format(dict.home.resultCount, { n: filtered.length })}
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label={dict.home.tagFilterLabel}>
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={`tag-chip ${activeTag === null ? "tag-chip-active" : ""}`}
          aria-pressed={activeTag === null}
        >
          {dict.home.tagAll}
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            className={`tag-chip ${tag === activeTag ? "tag-chip-active" : ""}`}
            aria-pressed={tag === activeTag}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-ink-50 p-12 text-center dark:border-white/10 dark:bg-ink-800">
          <p className="text-ink-700 font-medium dark:text-ink-100">{dict.home.emptyTitle}</p>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{dict.home.emptyLead}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, idx) => (
            <InfographicCard
              key={item.id}
              infographic={item}
              locale={locale}
              dict={dict}
              priority={idx < 3}
            />
          ))}
        </div>
      )}
    </div>
  );
}
