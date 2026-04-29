export const siteConfig = {
  name: "devcards.space",
  shortName: "DevCards",
  url: "https://devcards.space",
  description:
    "Modern web geliştirme araçları ve kütüphaneleri için detaylı, SEO odaklı developer infografikleri. React, Node.js, geliştirici araçları hakkında pratik rehberler.",
  locale: "tr_TR",
  language: "tr",
  twitter: "@devcards_space",
  author: "DevCards",
  ogImage: "/og-default.png",
  keywords: [
    "developer infografik",
    "yazılım rehberi",
    "react",
    "node.js",
    "javascript araçları",
    "frontend",
    "backend",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
