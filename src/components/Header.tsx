import Link from "next/link";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:border-white/10 dark:bg-ink-900/80 dark:supports-[backdrop-filter]:bg-ink-900/70">
      <div className="container-wide flex h-16 items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          aria-label={`${siteConfig.name} ${dict.nav.home}`}
          className="group flex items-center gap-2"
        >
          <span
            aria-hidden
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white font-bold transition-transform group-hover:scale-105"
          >
            d
          </span>
          <span className="text-base font-bold text-ink-900 dark:text-white">
            devcards<span className="text-accent">.space</span>
          </span>
        </Link>
        <nav aria-label={dict.nav.primary} className="flex items-center gap-1 text-sm font-medium">
          <Link
            href={`/${locale}`}
            className="hidden sm:inline-flex rounded-md px-3 py-2 text-ink-700 transition-colors hover:bg-accent-soft hover:text-accent dark:text-ink-200 dark:hover:bg-white/10 dark:hover:text-white"
          >
            {dict.nav.allCards}
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer noopener"
            className="hidden sm:inline-flex rounded-md px-3 py-2 text-ink-700 transition-colors hover:bg-accent-soft hover:text-accent dark:text-ink-200 dark:hover:bg-white/10 dark:hover:text-white"
          >
            GitHub
          </a>
          <ThemeToggle label={dict.nav.themeLabel} />
          <LanguageSwitcher current={locale} label={dict.nav.languageLabel} />
        </nav>
      </div>
    </header>
  );
}
