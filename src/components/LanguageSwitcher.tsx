"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import { localeSwapMap } from "@/lib/localeSwap";

type Props = {
  current: Locale;
  label: string;
};

export function LanguageSwitcher({ current, label }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function buildHref(target: Locale): string {
    if (!pathname) return `/${target}`;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${target}`;
    const [first, second, ...rest] = segments;

    if ((locales as readonly string[]).includes(first)) {
      const sourceLocale = first as Locale;
      if (second && localeSwapMap[sourceLocale]?.[second]?.[target]) {
        const swapped = localeSwapMap[sourceLocale][second][target];
        return `/${target}/${swapped}${rest.length ? `/${rest.join("/")}` : ""}`;
      }
      return `/${target}${second ? `/${second}` : ""}${rest.length ? `/${rest.join("/")}` : ""}`;
    }
    return `/${target}${pathname}`;
  }

  function handleSelect(target: Locale) {
    if (target === current) return;
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    const href = buildHref(target);
    startTransition(() => {
      router.push(href);
    });
  }

  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center rounded-full border border-ink-200 bg-white p-0.5 text-xs font-semibold dark:border-white/10 dark:bg-ink-800"
    >
      {locales.map((locale) => {
        const isActive = locale === current;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => handleSelect(locale)}
            disabled={isPending && !isActive}
            aria-pressed={isActive}
            aria-label={localeMeta[locale].name}
            className={`relative rounded-full px-2.5 py-1 transition-colors ${
              isActive
                ? "bg-accent text-white"
                : "text-ink-600 hover:text-accent-dark dark:text-ink-300 dark:hover:text-white"
            }`}
          >
            {localeMeta[locale].flag}
          </button>
        );
      })}
    </div>
  );
}
