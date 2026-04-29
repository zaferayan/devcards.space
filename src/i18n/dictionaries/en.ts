import type { Dictionary } from "./tr";

export const en: Dictionary = {
  meta: {
    siteTitle: "devcards.space — Developer Infographics",
    siteDescription:
      "Detailed, SEO-friendly developer infographics for modern web tools and libraries. Practical guides on React, Node.js, and the broader developer toolchain.",
    notFoundTitle: "Page not found",
    notFoundDescription:
      "The infographic you are looking for does not exist or has been removed.",
  },
  nav: {
    home: "Home",
    allCards: "All cards",
    skipToContent: "Skip to content",
    primary: "Primary",
    languageLabel: "Language",
    themeLabel: "Toggle theme",
  },
  home: {
    badge: "Developer-first infographics",
    headline1: "Explain complex topics",
    headline2: "in a single visual.",
    subhead:
      "React Query, JSON Server, Concurrently and more — deep, SEO-focused technical infographics built for developers.",
    cardsCount: "{n} cards",
    categoriesCount: "{n} categories",
    languageBadge: "English content",
    sectionTitle: "All Infographics",
    sectionLead: "Start typing to search or pick a category.",
    searchPlaceholder: "Search: react query, json server, concurrently...",
    searchAriaLabel: "Search infographics",
    resultCount: "{n} results",
    tagFilterLabel: "Tag filter",
    tagAll: "All",
    emptyTitle: "No results found",
    emptyLead: "Try a different keyword or tag.",
  },
  card: {
    readingMinutes: "{n} min read",
    readMore: "Read more",
    titleAriaLabel: "Open {title}",
  },
  detail: {
    breadcrumbHome: "Home",
    publishedLabel: "Published:",
    updatedLabel: "Updated:",
    readingMinutes: "{n} minute read",
    faqTitle: "Frequently Asked Questions",
    faqLead: "Common questions about this topic.",
    relatedTitle: "Related Posts",
    relatedLead: "Other infographics on connected topics.",
    ctaTitle: "Discover more developer infographics",
    ctaLead: "Visit the homepage so you don't miss new content.",
    ctaButton: "See all infographics",
    breadcrumbAriaLabel: "Breadcrumb",
    zoomImage: "Zoom image",
    closeImage: "Close image",
    zoomHint: "Click for fullscreen",
    actualSize: "Actual size",
    fitToScreen: "Fit to screen",
  },
  notFound: {
    code: "404",
    title: "Page not found",
    lead:
      "The infographic you're looking for doesn't exist or may have been removed. Head back to the homepage to explore other content.",
    cta: "Back to homepage",
  },
  footer: {
    contentHeading: "Content",
    siteHeading: "Site",
    sitemap: "Sitemap",
    robots: "robots.txt",
    rights: "© {year} devcards.space. All rights reserved.",
    poweredBy: "Built with Next.js · Tailwind CSS",
  },
  dateLocale: "en-US",
};
