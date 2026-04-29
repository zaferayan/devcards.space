export type Dictionary = {
  meta: {
    siteTitle: string;
    siteDescription: string;
    notFoundTitle: string;
    notFoundDescription: string;
  };
  nav: {
    home: string;
    allCards: string;
    skipToContent: string;
    primary: string;
    languageLabel: string;
    themeLabel: string;
  };
  home: {
    badge: string;
    headline1: string;
    headline2: string;
    subhead: string;
    cardsCount: string;
    categoriesCount: string;
    languageBadge: string;
    sectionTitle: string;
    sectionLead: string;
    searchPlaceholder: string;
    searchAriaLabel: string;
    resultCount: string;
    tagFilterLabel: string;
    tagAll: string;
    emptyTitle: string;
    emptyLead: string;
  };
  card: {
    readingMinutes: string;
    readMore: string;
    titleAriaLabel: string;
  };
  detail: {
    breadcrumbHome: string;
    publishedLabel: string;
    updatedLabel: string;
    readingMinutes: string;
    faqTitle: string;
    faqLead: string;
    relatedTitle: string;
    relatedLead: string;
    ctaTitle: string;
    ctaLead: string;
    ctaButton: string;
    breadcrumbAriaLabel: string;
    zoomImage: string;
    closeImage: string;
    zoomHint: string;
    actualSize: string;
    fitToScreen: string;
  };
  notFound: {
    code: string;
    title: string;
    lead: string;
    cta: string;
  };
  footer: {
    contentHeading: string;
    siteHeading: string;
    sitemap: string;
    robots: string;
    rights: string;
    poweredBy: string;
  };
  dateLocale: string;
};

export const tr: Dictionary = {
  meta: {
    siteTitle: "devcards.space — Developer İnfografikleri",
    siteDescription:
      "Modern web geliştirme araçları ve kütüphaneleri için detaylı, SEO odaklı developer infografikleri. React, Node.js, geliştirici araçları hakkında pratik rehberler.",
    notFoundTitle: "Sayfa bulunamadı",
    notFoundDescription:
      "Aradığınız infografik mevcut değil veya kaldırılmış olabilir.",
  },
  nav: {
    home: "Ana sayfa",
    allCards: "Tüm kartlar",
    skipToContent: "İçeriğe atla",
    primary: "Birincil",
    languageLabel: "Dil",
    themeLabel: "Temayı değiştir",
  },
  home: {
    badge: "Developer-first infografikler",
    headline1: "Karmaşık konuları",
    headline2: "tek görselde anlat.",
    subhead:
      "React Query, JSON Server, Concurrently ve daha fazlası — geliştiriciler için hazırlanmış SEO odaklı, derin teknik infografikler.",
    cardsCount: "{n} kart",
    categoriesCount: "{n} kategori",
    languageBadge: "Türkçe içerik",
    sectionTitle: "Tüm İnfografikler",
    sectionLead: "Aramak için yazmaya başlayın veya kategori seçin.",
    searchPlaceholder: "Ara: react query, json server, concurrently...",
    searchAriaLabel: "İnfografiklerde ara",
    resultCount: "{n} sonuç",
    tagFilterLabel: "Etiket filtresi",
    tagAll: "Tümü",
    emptyTitle: "Hiç sonuç bulunamadı",
    emptyLead: "Farklı bir anahtar kelime veya etiket deneyin.",
  },
  card: {
    readingMinutes: "{n} dk okuma",
    readMore: "Devamını oku",
    titleAriaLabel: "{title} sayfasını aç",
  },
  detail: {
    breadcrumbHome: "Ana sayfa",
    publishedLabel: "Yayın:",
    updatedLabel: "Güncelleme:",
    readingMinutes: "{n} dakika okuma",
    faqTitle: "Sıkça Sorulan Sorular",
    faqLead: "Bu konuda en çok merak edilenler.",
    relatedTitle: "İlgili İçerikler",
    relatedLead: "Bu konuyla bağlantılı diğer infografikler.",
    ctaTitle: "Daha fazla developer infografiği keşfedin",
    ctaLead: "Yeni içerikleri kaçırmamak için ana sayfayı ziyaret edin.",
    ctaButton: "Tüm infografikleri gör",
    breadcrumbAriaLabel: "Sayfa yolu",
    zoomImage: "Görseli büyüt",
    closeImage: "Görseli kapat",
    zoomHint: "Tam ekran için tıklayın",
    actualSize: "Gerçek boyut",
    fitToScreen: "Ekrana sığdır",
  },
  notFound: {
    code: "404",
    title: "Sayfa bulunamadı",
    lead:
      "Aradığınız infografik mevcut değil veya kaldırılmış olabilir. Ana sayfaya dönüp diğer içerikleri keşfedebilirsiniz.",
    cta: "Ana sayfaya dön",
  },
  footer: {
    contentHeading: "İçerik",
    siteHeading: "Site",
    sitemap: "Sitemap",
    robots: "robots.txt",
    rights: "© {year} devcards.space. Tüm hakları saklıdır.",
    poweredBy: "Next.js · Tailwind CSS ile geliştirildi",
  },
  dateLocale: "tr-TR",
};
