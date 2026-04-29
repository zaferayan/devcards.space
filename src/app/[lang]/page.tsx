import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { JsonLd } from "@/components/JsonLd";
import { infographics, getAllTags } from "@/data/infographics";
import { siteConfig } from "@/lib/site";
import { isLocale, locales, localeMeta, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { format } from "@/i18n/format";

type Params = { lang: string };

export function generateStaticParams(): Params[] {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  const url = `${siteConfig.url}/${lang}`;

  return {
    title: dict.meta.siteTitle,
    description: dict.meta.siteDescription,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        tr: "/tr",
        en: "/en",
        "x-default": "/tr",
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      locale: localeMeta[lang].ogLocale,
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      images: ["/og-default.svg"],
      creator: siteConfig.twitter,
    },
  };
}

export default async function HomePage({ params }: { params: Promise<Params> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const tags = getAllTags();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: dict.meta.siteDescription,
    inLanguage: localeMeta[locale].htmlLang,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/${locale}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: infographics.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${siteConfig.url}/${locale}/${item.translations[locale].slug}`,
      name: item.translations[locale].title,
    })),
  };

  return (
    <>
      <JsonLd data={[websiteSchema, itemListSchema]} />

      <section className="relative overflow-hidden border-b border-ink-100 dark:border-white/10">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-accent-soft/40 via-white to-white dark:from-accent/15 dark:via-ink-900 dark:to-ink-900"
        />
        <div
          aria-hidden
          className="absolute -top-24 right-1/3 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
        />
        <div className="container-wide relative py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/80 px-3 py-1 text-xs font-medium text-accent-dark backdrop-blur dark:border-accent/30 dark:bg-white/10 dark:text-accent-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {dict.home.badge}
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl lg:text-6xl dark:text-white">
              {dict.home.headline1}
              <br />
              <span className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
                {dict.home.headline2}
              </span>
            </h1>
            <p className="mt-6 text-lg text-ink-600 sm:text-xl dark:text-ink-300">{dict.home.subhead}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="rounded-full bg-white px-3 py-1 text-ink-700 ring-1 ring-ink-100 dark:bg-white/10 dark:text-ink-200 dark:ring-white/10">
                {format(dict.home.cardsCount, { n: infographics.length })}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-ink-700 ring-1 ring-ink-100 dark:bg-white/10 dark:text-ink-200 dark:ring-white/10">
                {format(dict.home.categoriesCount, { n: tags.length })}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-ink-700 ring-1 ring-ink-100 dark:bg-white/10 dark:text-ink-200 dark:ring-white/10">
                {dict.home.languageBadge}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide py-12 sm:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl dark:text-white">
              {dict.home.sectionTitle}
            </h2>
            <p className="mt-1 text-ink-600 dark:text-ink-300">{dict.home.sectionLead}</p>
          </div>
        </div>
        <SearchAndFilter
          locale={locale}
          dict={dict}
          infographics={infographics}
          tags={tags}
        />
      </section>
    </>
  );
}
