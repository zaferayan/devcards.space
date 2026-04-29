import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllParams,
  getInfographicByLocaleSlug,
  getRelatedInfographics,
  getAlternateLocaleSlugs,
} from "@/data/infographics";
import { siteConfig } from "@/lib/site";
import { isLocale, locales, localeMeta, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { format } from "@/i18n/format";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CodeBlock } from "@/components/CodeBlock";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { RelatedPosts } from "@/components/RelatedPosts";
import { ZoomableImage } from "@/components/ZoomableImage";

type Params = { lang: string; slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getAllParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) {
    return { title: "Not found", description: "" };
  }
  const found = getInfographicByLocaleSlug(lang, slug);
  if (!found) {
    return { title: "Not found", description: "" };
  }
  const { item, t } = found;
  const url = `${siteConfig.url}/${lang}/${t.slug}`;
  const altSlugs = getAlternateLocaleSlugs(item.id);

  const languages: Record<string, string> = {};
  for (const code of locales) {
    languages[code] = `/${code}/${altSlugs[code]}`;
  }
  languages["x-default"] = `/tr/${altSlugs.tr}`;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    alternates: {
      canonical: `/${lang}/${t.slug}`,
      languages,
    },
    openGraph: {
      type: "article",
      url,
      title: t.title,
      description: t.description,
      siteName: siteConfig.name,
      locale: localeMeta[lang].ogLocale,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeMeta[l].ogLocale),
      publishedTime: item.publishedAt,
      modifiedTime: item.updatedAt,
      authors: [siteConfig.author],
      tags: item.tags,
      images: [
        {
          url: item.image,
          width: item.imageWidth,
          height: item.imageHeight,
          alt: t.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: [item.image],
      creator: siteConfig.twitter,
    },
  };
}

export default async function InfographicPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const found = getInfographicByLocaleSlug(locale, slug);
  if (!found) notFound();

  const { item, t } = found;
  const dict = getDictionary(locale);
  const related = getRelatedInfographics(item.id, locale, 3);
  const url = `${siteConfig.url}/${locale}/${t.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.title,
    description: t.description,
    image: [`${siteConfig.url}${item.image}`],
    datePublished: item.publishedAt,
    dateModified: item.updatedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/og-default.svg`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: localeMeta[locale].htmlLang,
    keywords: t.keywords.join(", "),
    articleSection: item.tags.join(", "),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.content.faq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: dict.detail.breadcrumbHome,
        item: `${siteConfig.url}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t.title.split(":")[0],
        item: url,
      },
    ],
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(dict.dateLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <>
      <JsonLd data={[articleSchema, faqSchema, breadcrumbSchema]} />

      <article className="pb-12">
        <header className="border-b border-ink-100 bg-gradient-to-b from-accent-soft/30 to-white dark:border-white/10 dark:from-accent/15 dark:to-ink-900">
          <div className="container-narrow pt-10 pb-12">
            <Breadcrumbs
              ariaLabel={dict.detail.breadcrumbAriaLabel}
              items={[
                { label: dict.detail.breadcrumbHome, href: `/${locale}` },
                { label: t.title.split(":")[0] },
              ]}
            />

            <div className="mb-4 flex flex-wrap items-center gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-accent-dark ring-1 ring-accent/20 dark:bg-white/10 dark:text-accent-soft dark:ring-accent/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl dark:text-white">
              {t.title}
            </h1>

            <p className="mt-4 text-lg text-ink-600 sm:text-xl dark:text-ink-300">{t.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-500 dark:text-ink-400">
              <time dateTime={item.publishedAt}>
                {dict.detail.publishedLabel} {formatDate(item.publishedAt)}
              </time>
              <span aria-hidden>·</span>
              <time dateTime={item.updatedAt}>
                {dict.detail.updatedLabel} {formatDate(item.updatedAt)}
              </time>
              <span aria-hidden>·</span>
              <span>{format(dict.detail.readingMinutes, { n: item.readingMinutes })}</span>
            </div>
          </div>
        </header>

        <div className="container-narrow">
          <ZoomableImage
            src={item.image}
            alt={t.imageAlt}
            width={item.imageWidth}
            height={item.imageHeight}
            caption={t.imageAlt}
            zoomLabel={dict.detail.zoomImage}
            closeLabel={dict.detail.closeImage}
            hint={dict.detail.zoomHint}
            actualSizeLabel={dict.detail.actualSize}
            fitToScreenLabel={dict.detail.fitToScreen}
          />

          <div className="prose-content">
            <p className="text-lg text-ink-700 leading-[1.75] dark:text-ink-200">{t.content.intro}</p>

            {t.content.sections.map((section, idx) => (
              <section key={idx} aria-labelledby={`section-${idx}`}>
                <h2 id={`section-${idx}`}>{section.title}</h2>
                <p>{section.body}</p>
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {section.code ? <CodeBlock block={section.code} /> : null}
              </section>
            ))}
          </div>

          <FAQ title={dict.detail.faqTitle} lead={dict.detail.faqLead} items={t.content.faq} />

          <RelatedPosts
            title={dict.detail.relatedTitle}
            lead={dict.detail.relatedLead}
            items={related.map(({ item: rItem, t: rT }) => ({
              href: `/${locale}/${rT.slug}`,
              title: rT.title.split(":")[0],
              description: rT.description,
              tags: rItem.tags,
            }))}
          />

          <div className="mt-12 rounded-2xl border border-ink-100 bg-ink-50 p-6 text-center dark:border-white/10 dark:bg-ink-800/80">
            <p className="text-sm font-semibold text-ink-900 dark:text-white">{dict.detail.ctaTitle}</p>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{dict.detail.ctaLead}</p>
            <Link
              href={`/${locale}`}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              {dict.detail.ctaButton}
              <svg
                aria-hidden
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
