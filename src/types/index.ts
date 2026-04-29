import type { Locale } from "@/i18n/config";

export type Tag = "React" | "Tools" | "Backend" | "Frontend" | "DevOps" | "Testing";

export type CodeBlock = {
  language: string;
  code: string;
  filename?: string;
};

export type Section = {
  title: string;
  body: string;
  code?: CodeBlock;
  bullets?: string[];
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type LocalizedInfographic = {
  slug: string;
  title: string;
  description: string;
  imageAlt: string;
  keywords: string[];
  content: {
    intro: string;
    sections: Section[];
    faq: FAQItem[];
  };
};

export type Infographic = {
  id: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  tags: Tag[];
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  translations: Record<Locale, LocalizedInfographic>;
};
