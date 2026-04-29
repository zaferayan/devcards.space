import Link from "next/link";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const headerList = await headers();
  const headerLocale = headerList.get("x-locale");
  const locale = headerLocale && isLocale(headerLocale) ? headerLocale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="container-narrow flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">
        {dict.notFound.code}
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl dark:text-white">
        {dict.notFound.title}
      </h1>
      <p className="mt-4 max-w-md text-ink-600 dark:text-ink-300">{dict.notFound.lead}</p>
      <Link
        href={`/${locale}`}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
      >
        {dict.notFound.cta}
      </Link>
    </div>
  );
}
