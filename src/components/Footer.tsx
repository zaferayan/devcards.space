import Link from "next/link";
import { infographics } from "@/data/infographics";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { format } from "@/i18n/format";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: Props) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-ink-100 bg-ink-50 dark:border-white/10 dark:bg-ink-950">
      <div className="container-wide py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white font-bold"
              >
                d
              </span>
              <span className="text-base font-bold text-ink-900 dark:text-white">
                devcards<span className="text-accent">.space</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-ink-600 dark:text-ink-300">{dict.meta.siteDescription}</p>
          </div>
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
              {dict.footer.contentHeading}
            </h2>
            <ul className="space-y-2 text-sm">
              {infographics.slice(0, 5).map((item) => {
                const t = item.translations[locale];
                return (
                  <li key={item.id}>
                    <Link
                      href={`/${locale}/${t.slug}`}
                      className="text-ink-700 transition-colors hover:text-accent dark:text-ink-300 dark:hover:text-accent-soft"
                    >
                      {t.title.split(":")[0].split(" — ")[0]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
              {dict.footer.siteHeading}
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}`}
                  className="text-ink-700 transition-colors hover:text-accent dark:text-ink-300 dark:hover:text-accent-soft"
                >
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  className="text-ink-700 transition-colors hover:text-accent dark:text-ink-300 dark:hover:text-accent-soft"
                >
                  {dict.footer.sitemap}
                </Link>
              </li>
              <li>
                <Link
                  href="/robots.txt"
                  className="text-ink-700 transition-colors hover:text-accent dark:text-ink-300 dark:hover:text-accent-soft"
                >
                  {dict.footer.robots}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-ink-200 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center dark:border-white/10 dark:text-ink-400">
          <p>{format(dict.footer.rights, { year })}</p>
          <p>{dict.footer.poweredBy}</p>
        </div>
      </div>
    </footer>
  );
}
