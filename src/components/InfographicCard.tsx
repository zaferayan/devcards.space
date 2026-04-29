import Image from "next/image";
import Link from "next/link";
import type { Infographic } from "@/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { format } from "@/i18n/format";

type Props = {
  infographic: Infographic;
  locale: Locale;
  dict: Dictionary;
  priority?: boolean;
};

const cardLogos: Record<
  string,
  {
    src: string;
    label: string;
    theme: string;
    imageClassName?: string;
  }
> = {
  "react-query": {
    src: "/svgl/react-query.svg",
    label: "React Query",
    theme: "from-[#fff1f2] via-white to-[#eff6ff]",
  },
  nextjs: {
    src: "/svgl/nextjs.svg",
    label: "Next.js",
    theme: "from-[#f8fafc] via-white to-[#e0f2fe]",
  },
  vite: {
    src: "/svgl/vite.svg",
    label: "Vite",
    theme: "from-[#fef3c7] via-white to-[#ede9fe]",
  },
  zustand: {
    src: "/svgl/zustand.svg",
    label: "Zustand",
    theme: "from-[#fef3c7] via-white to-[#f8fafc]",
    imageClassName: "max-h-24 max-w-32",
  },
  "react-router": {
    src: "/svgl/react-router.svg",
    label: "React Router",
    theme: "from-[#fff1f2] via-white to-[#f8fafc]",
    imageClassName: "max-h-20 max-w-32",
  },
  "react-hook-form": {
    src: "/svgl/react-hook-form.svg",
    label: "React Hook Form",
    theme: "from-[#ecfeff] via-white to-[#fdf2f8]",
  },
  zod: {
    src: "/svgl/zod.svg",
    label: "Zod",
    theme: "from-[#eef2ff] via-white to-[#f0f9ff]",
    imageClassName: "max-h-20 max-w-32",
  },
  axios: {
    src: "/svgl/javascript.svg",
    label: "JavaScript",
    theme: "from-[#fef9c3] via-white to-[#f8fafc]",
  },
  daisyui: {
    src: "/svgl/daisyui.svg",
    label: "daisyUI",
    theme: "from-[#fdf2f8] via-white to-[#ecfeff]",
  },
  "json-server": {
    src: "/svgl/json.svg",
    label: "JSON",
    theme: "from-[#f0fdf4] via-white to-[#fefce8]",
  },
  concurrently: {
    src: "/svgl/npm.svg",
    label: "NPM",
    theme: "from-[#fef2f2] via-white to-[#f8fafc]",
  },
  bash: {
    src: "/svgl/bash.svg",
    label: "Bash",
    theme: "from-[#f0fdf4] via-white to-[#f8fafc]",
  },
};

export function InfographicCard({ infographic, locale, dict, priority = false }: Props) {
  const t = infographic.translations[locale];
  const cardLogo = cardLogos[infographic.id];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 dark:border-white/10 dark:bg-ink-800/80 dark:hover:border-accent/50 dark:hover:shadow-accent/10">
      <Link
        href={`/${locale}/${t.slug}`}
        className="absolute inset-0 z-10"
        aria-label={format(dict.card.titleAriaLabel, { title: t.title })}
      >
        <span className="sr-only">{t.title}</span>
      </Link>

      <div
        className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br ${
          cardLogo?.theme ?? "from-ink-50 via-white to-accent-soft/40"
        }`}
      >
        <div aria-hidden className="absolute inset-0 hidden bg-ink-900/80 dark:block" />
        <Image
          src={cardLogo?.src ?? infographic.image}
          alt={cardLogo ? `${cardLogo.label} logo` : t.imageAlt}
          width={144}
          height={144}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={`pointer-events-none relative z-[1] h-auto max-h-24 w-auto max-w-28 object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105 ${
            cardLogo?.imageClassName ?? ""
          }`}
          unoptimized={Boolean(cardLogo)}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {infographic.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-dark dark:bg-accent/15 dark:text-accent-soft"
            >
              {tag}
            </span>
          ))}
          <span className="inline-flex items-center text-xs text-ink-500 dark:text-ink-400">
            · {format(dict.card.readingMinutes, { n: infographic.readingMinutes })}
          </span>
        </div>

        <h2 className="mb-2 text-lg font-bold leading-snug text-ink-900 transition-colors group-hover:text-accent-dark dark:text-white dark:group-hover:text-accent-soft">
          {t.title}
        </h2>

        <p className="line-clamp-3 text-sm text-ink-600 leading-relaxed dark:text-ink-300">
          {t.description}
        </p>

        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-dark dark:text-accent-soft">
          {dict.card.readMore}
          <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </article>
  );
}
