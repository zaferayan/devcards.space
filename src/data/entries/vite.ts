import type { Infographic } from "@/types";

export const vite: Infographic = {
  id: "vite",
  image: "/infographics/vite.png",
  imageWidth: 1586,
  imageHeight: 992,
  tags: ["Tools", "Frontend"],
  publishedAt: "2026-04-29",
  updatedAt: "2026-04-29",
  readingMinutes: 8,
  translations: {
    tr: {
      slug: "vite-nedir",
      title: "Vite Nedir? Yeni Nesil Frontend Geliştirme Aracı",
      description:
        "Vite ile native ESM tabanlı, anında başlayan dev server ve şimşek hızında HMR. Kurulum, plugin sistemi, production build ve Webpack ile karşılaştırma.",
      imageAlt:
        "Vite infografiği: Native ESM dev server, HMR, plugin sistemi ve Webpack ile karşılaştırmayı gösteren 13 bölümlü genel bakış",
      keywords: [
        "vite",
        "vite nedir",
        "frontend build tool",
        "esm dev server",
        "hmr",
        "rollup",
        "webpack vite",
      ],
      content: {
        intro:
          "Vite, modern frontend geliştirme deneyimini yeniden tanımlayan bir build tool ve dev server'dır. Webpack gibi araçların aksine native ES Modules üzerinden çalışarak dev server'ı saniyeler içinde başlatır, milisaniyeler içinde Hot Module Replacement uygular ve production build için Rollup'ı kullanarak optimize çıktı üretir. Bu rehberde infografikteki 13 bölümü açarak Vite'ı baştan sona inceliyoruz.",
        sections: [
          {
            title: "Vite Nedir?",
            body: "Modern bir frontend build aracı ve dev server'ıdır. Native ES Modules tabanlıdır ve hızlı dev experience için tasarlanmıştır. React, Vue, Svelte ve daha fazlasını destekler.",
            bullets: [
              "Modern frontend build tool ve dev server",
              "Native ES Modules (ESM) kullanır",
              "Hızlı dev deneyimi için tasarlandı",
              "React, Vue, Svelte ve daha fazlasını destekler",
            ],
          },
          {
            title: "Neden Vite?",
            body: "Vite'ın size hazır verdikleri:",
            bullets: [
              "Anında dev server başlangıcı (no bundling)",
              "Şimşek hızında HMR (Hot Module Replacement)",
              "Talep üzerine modül yüklemesi (on-demand)",
              "Minimal yapılandırma",
              "Optimize edilmiş production build",
            ],
          },
          {
            title: "Kurulum (React Örneği)",
            body: "create-vite ile şablonu seçerek tek komutla başlayın.",
            code: {
              language: "bash",
              code: `npm create vite@latest`,
            },
          },
          {
            title: "Proje Kurulumu",
            body: "Şablon oluştuktan sonra bağımlılıkları kurup dev server'ı başlatmanız yeterli.",
            code: {
              language: "bash",
              code: `cd my-app
npm install
npm run dev`,
            },
          },
          {
            title: "Dev Server (Temel Fikir)",
            body: "Vite, dev sırasında hiç bundling yapmaz. Tarayıcı modülleri tek tek native ESM ile yükler; bu nedenle proje büyüklüğü dev başlatma süresini neredeyse hiç etkilemez.",
            bullets: [
              "Modülleri native ESM ile sunar",
              "Sadece ihtiyaç duyulan parça yüklenir",
              "Full bundle rebuild yok",
            ],
          },
          {
            title: "Hot Module Replacement (HMR)",
            body: "Vite yalnızca değişen modülleri günceller. Sayfa yenilenmez, state korunur. Değişiklikler millisaniyeler içinde yansır.",
            code: {
              language: "ts",
              code: `if (import.meta.hot) {
  import.meta.hot.accept();
}`,
            },
          },
          {
            title: "TypeScript Desteği",
            body: "TypeScript built-in olarak desteklenir; ek konfigürasyon gerekmez. Vite, esbuild ile şimşek hızında transpile yapar.",
            bullets: [
              "TypeScript için yerleşik destek",
              "Ek config yok",
              "esbuild ile hızlı transpile",
            ],
          },
          {
            title: "Production Build",
            body: "Production build için Vite altta Rollup kullanır; tree-shaking, code splitting ve optimize edilmiş statik varlıklar üretir.",
            code: {
              language: "bash",
              code: `npm run build`,
            },
          },
          {
            title: "Plugin Sistemi",
            body: "Vite'ın esnekliği zengin plugin ekosisteminden gelir. React, Vue, Svelte, ESLint, image optimization gibi sayısız plugin mevcuttur.",
            code: {
              language: "ts",
              filename: "vite.config.ts",
              code: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});`,
            },
          },
          {
            title: "Temel Kavramlar",
            body: "Vite'ın hızını ve mimarisini anlamak için bilmeniz gerekenler:",
            bullets: [
              "ESM (native modules)",
              "Dev server vs build (iki farklı yol)",
              "HMR",
              "Plugin sistemi",
              "Talep üzerine yükleme (on-demand loading)",
            ],
          },
          {
            title: "Vite vs Webpack",
            body: "İki aracın temel farkları:",
            bullets: [
              "Vite: bundling yok dev'de, daha hızlı, ESM tabanlı",
              "Webpack: dev'de bundle gerekir, daha yavaş, klasik konfigürasyon",
              "Vite minimal config gerektirir; Webpack daha fazla esneklik ama daha karmaşık setup",
            ],
          },
          {
            title: "Kullanım Alanları",
            body: "Vite'ın özellikle parladığı senaryolar:",
            bullets: [
              "React uygulamaları",
              "SPA geliştirme",
              "Hızlı prototipleme",
              "Modern frontend projeleri",
              "Monorepo + workspace setup'ları",
            ],
          },
          {
            title: "Özet",
            body: "Vite; son derece hızlı dev deneyimi sunar, minimal yapılandırma ile çalışır ve modern frontend iş akışlarına uygundur. ESM + Rollup + esbuild kombinasyonu sayesinde hem geliştirme hem üretimde hız ve performansı bir arada verir; modern projeler için zorlukla aşılabilen bir varsayılan tercihtir.",
          },
        ],
        faq: [
          {
            question: "Vite Webpack'in yerine geçer mi?",
            answer:
              "Pek çok proje için evet. Vite native ESM ile dev'de bundling yapmaz, çok daha hızlı bir deneyim sunar. Webpack'in geniş plugin ekosistemine bağımlı olan projelerde geçiş daha dikkatli planlanmalı.",
          },
          {
            question: "Tarayıcı uyumluluğu nasıl?",
            answer:
              "Production build modern tarayıcıları hedefler, ancak @vitejs/plugin-legacy ile eski tarayıcılar için ek bundle üretebilirsiniz. Dev mode için modern tarayıcı (ESM destekli) yeterlidir.",
          },
          {
            question: "Next.js veya Remix yerine Vite mi?",
            answer:
              "Sadece SPA istiyorsanız Vite. SSR, dosya tabanlı routing ve framework özellikleri istiyorsanız Next.js veya Remix tercih edilir. Vite + Remix kombinasyonu da yaygındır.",
          },
          {
            question: "esbuild ve Rollup neden ikisi birden?",
            answer:
              "esbuild dev'de transpile için kullanılır (Go ile yazıldığı için çok hızlı). Production build'de Rollup kullanılır çünkü tree-shaking ve plugin uyumu daha olgundur.",
          },
          {
            question: "SSR mümkün mü?",
            answer:
              "Vite SSR API'si vardır; framework yazmak için kullanılır. Doğrudan ürün geliştiriyorsanız Next.js, Nuxt, SvelteKit gibi Vite tabanlı framework'leri tercih etmek daha kolaydır.",
          },
        ],
      },
    },
    en: {
      slug: "what-is-vite",
      title: "What is Vite? Next-Generation Frontend Tooling",
      description:
        "Vite ships an ESM-native dev server that starts instantly and lightning-fast HMR. Walk through setup, the plugin system, production builds and a Webpack comparison.",
      imageAlt:
        "Vite infographic showing native ESM dev server, HMR, plugin system and a Webpack comparison across 13 sections",
      keywords: [
        "vite",
        "what is vite",
        "frontend build tool",
        "esm dev server",
        "hmr",
        "rollup",
        "webpack vite",
      ],
      content: {
        intro:
          "Vite redefines the modern frontend developer experience. Unlike tools such as Webpack, it serves your code via native ES Modules, starting the dev server in seconds, applying Hot Module Replacement in milliseconds, and shipping optimized production output via Rollup. This guide expands all 13 sections of the infographic so you can see Vite end to end.",
        sections: [
          {
            title: "What is Vite?",
            body: "A modern frontend build tool and dev server. It runs on native ES Modules and is engineered for a fast dev experience. It supports React, Vue, Svelte and more.",
            bullets: [
              "Modern frontend build tool and dev server",
              "Uses native ES Modules (ESM)",
              "Designed for fast developer experience",
              "Supports React, Vue, Svelte and more",
            ],
          },
          {
            title: "Why Vite?",
            body: "What you get out of the box:",
            bullets: [
              "Instant dev server start (no bundling)",
              "Lightning-fast HMR (Hot Module Replacement)",
              "On-demand module loading",
              "Minimal configuration",
              "Optimized production builds",
            ],
          },
          {
            title: "Installation (React Example)",
            body: "Use create-vite to scaffold any template with a single command.",
            code: {
              language: "bash",
              code: `npm create vite@latest`,
            },
          },
          {
            title: "Project Setup",
            body: "After the template lands, install dependencies and start the dev server.",
            code: {
              language: "bash",
              code: `cd my-app
npm install
npm run dev`,
            },
          },
          {
            title: "Dev Server (Core Idea)",
            body: "Vite never bundles during development. The browser pulls modules one by one via native ESM, which means project size barely affects dev startup time.",
            bullets: [
              "Serves files using native ESM",
              "Only what's needed is loaded",
              "No full bundle rebuild",
            ],
          },
          {
            title: "Hot Module Replacement (HMR)",
            body: "Vite updates only the modules that changed. The page doesn't reload, state is preserved. Changes appear in milliseconds.",
            code: {
              language: "ts",
              code: `if (import.meta.hot) {
  import.meta.hot.accept();
}`,
            },
          },
          {
            title: "TypeScript Support",
            body: "TypeScript works out of the box — no extra config required. esbuild handles transpilation at lightning speed.",
            bullets: [
              "Built-in support for TypeScript",
              "No extra config required",
              "Fast transpilation with esbuild",
            ],
          },
          {
            title: "Production Build",
            body: "For production, Vite uses Rollup under the hood. You get tree-shaking, code splitting and optimized static assets.",
            code: {
              language: "bash",
              code: `npm run build`,
            },
          },
          {
            title: "Plugin System",
            body: "Vite's flexibility comes from a rich plugin ecosystem — React, Vue, Svelte, ESLint, image optimization and many more.",
            code: {
              language: "ts",
              filename: "vite.config.ts",
              code: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});`,
            },
          },
          {
            title: "Key Concepts",
            body: "What you should know to grok Vite's speed and architecture:",
            bullets: [
              "ESM (native modules)",
              "Dev server vs build (two different paths)",
              "HMR",
              "Plugin system",
              "On-demand loading",
            ],
          },
          {
            title: "Vite vs Webpack",
            body: "The core differences:",
            bullets: [
              "Vite: no dev bundling, faster, ESM-based",
              "Webpack: bundling required in dev, slower, classic config",
              "Vite needs minimal config; Webpack is more flexible but more complex",
            ],
          },
          {
            title: "Use Cases",
            body: "Where Vite particularly shines:",
            bullets: [
              "React applications",
              "SPA development",
              "Rapid prototyping",
              "Modern frontend projects",
              "Monorepo + workspace setups",
            ],
          },
          {
            title: "Summary",
            body: "Vite delivers an extremely fast dev experience, runs with minimal configuration and fits modern frontend workflows. With ESM + Rollup + esbuild, both development and production stay fast and performant — it's a hard default to beat for modern projects.",
          },
        ],
        faq: [
          {
            question: "Does Vite replace Webpack?",
            answer:
              "For most projects, yes. Vite skips bundling in dev with native ESM and is dramatically faster. Projects deeply tied to Webpack's plugin ecosystem need to plan the migration carefully.",
          },
          {
            question: "What about browser compatibility?",
            answer:
              "Production builds target modern browsers, but @vitejs/plugin-legacy can emit additional bundles for old ones. Dev mode requires a modern (ESM-capable) browser.",
          },
          {
            question: "Vite vs Next.js or Remix?",
            answer:
              "If you only need an SPA, Vite. If you want SSR, file-based routing and framework features, Next.js or Remix. Vite + Remix is also a popular combination.",
          },
          {
            question: "Why both esbuild and Rollup?",
            answer:
              "esbuild handles dev transpilation (it's written in Go and extremely fast). Production builds use Rollup because its tree-shaking and plugin compatibility are more mature.",
          },
          {
            question: "Is SSR possible?",
            answer:
              "Vite has an SSR API used to build frameworks. If you're shipping a product, picking a Vite-based framework like Next.js, Nuxt or SvelteKit is usually easier.",
          },
        ],
      },
    },
  },
};
