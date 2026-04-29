import type { Infographic } from "@/types";

export const nextjs: Infographic = {
  id: "nextjs",
  image: "/infographics/nextjs.png",
  imageWidth: 1586,
  imageHeight: 992,
  tags: ["React", "Frontend"],
  publishedAt: "2026-04-28",
  updatedAt: "2026-04-28",
  readingMinutes: 9,
  translations: {
    tr: {
      slug: "nextjs-nedir",
      title: "Next.js Nedir? Production için React Framework'ü",
      description:
        "Next.js (App Router) ile fullstack React uygulamaları geliştirin. SSR, SSG, ISR, API routes, Server Components ve performans avantajlarının pratik rehberi.",
      imageAlt:
        "Next.js infografiği: App Router, SSR/SSG/ISR, API routes ve Server vs Client Components başlıklarını gösteren 13 bölümlü genel bakış",
      keywords: [
        "next.js",
        "next.js nedir",
        "react framework",
        "app router",
        "server components",
        "ssr ssg isr",
        "fullstack react",
      ],
      content: {
        intro:
          "Next.js, React'in üzerine inşa edilmiş, fullstack uygulamalar geliştirmek için Vercel tarafından bakımı yapılan endüstri standardı bir framework'tür. Server-side rendering, static site generation, API rotaları, görüntü ve font optimizasyonu gibi production için kritik özellikleri kutudan çıkar çıkmaz sunar. App Router'la birlikte React Server Components da ekosisteme tam entegre edildi. Bu rehberde infografikteki 13 bölümü açarak Next.js'in modern özelliklerini tek tek inceliyoruz.",
        sections: [
          {
            title: "Next.js Nedir?",
            body: "Production için inşa edilmiş bir React framework'üdür. Server-side rendering, static site generation ve performans, ölçeklenebilirlik ve SEO için tasarlanmıştır. Vercel tarafından geliştirilir ve modern web uygulamalarının go-to seçeneklerinden biridir.",
            bullets: [
              "Fullstack React uygulamaları için framework",
              "SSR + SSG desteği",
              "Performans, ölçeklenebilirlik ve SEO odaklı",
            ],
          },
          {
            title: "Neden Next.js?",
            body: "Next.js'in size hazır verdikleri:",
            bullets: [
              "Built-in routing (file-based)",
              "Server-side rendering & static site generation (SSG)",
              "API rotaları (backend frontend içinde)",
              "Görüntü ve performans optimizasyonu",
              "Mükemmel geliştirici deneyimi",
              "Hızlı performans, SEO dostu, fullstack hazır",
            ],
          },
          {
            title: "Kurulum",
            body: "Tek komutla yeni bir Next.js projesi oluşturabilirsiniz; create-next-app interaktif bir wizard ile App Router, TypeScript, Tailwind, ESLint seçimlerini sunar.",
            code: {
              language: "bash",
              code: `npx create-next-app@latest`,
            },
          },
          {
            title: "Proje Yapısı",
            body: "App Router'la birlikte gelen modern dizin yapısı dosya tabanlı routing'e dayanır. Her klasör bir route, layout.tsx layout, page.tsx route'un sayfasıdır.",
            code: {
              language: "text",
              code: `app/
├── layout.tsx        # ortak layout
├── page.tsx          # / sayfası
├── about/
│   └── page.tsx      # /about
└── api/
    └── hello/
        └── route.ts  # /api/hello`,
            },
          },
          {
            title: "App Router (ÖNEMLİ)",
            body: "Next.js 13+ ile gelen yeni routing sistemi. React Server Components'i varsayılan olarak destekler, layout, loading ve streaming gibi modern özelliklere yerleşik altyapı sağlar.",
            bullets: [
              "Next.js'teki yeni routing sistemi",
              "React Server Components varsayılan",
              "Layout, loading ve streaming desteği",
              "Nested routes ile parça parça UI",
            ],
          },
          {
            title: "Server vs Client Components",
            body: "App Router'da componentler varsayılan olarak Server Component'tir. Client Component yapmak için dosyanın en üstüne 'use client' yazılır.",
            bullets: [
              "Server Component: sunucuda render olur, daha hızlı, browser JS yok",
              "Client Component: tarayıcıda çalışır, useState/useEffect kullanılabilir",
              "İkisi nested olarak birleşebilir",
            ],
            code: {
              language: "tsx",
              code: `"use client";
// bu dosya artık Client Component`,
            },
          },
          {
            title: "Render Stratejileri",
            body: "Next.js bir sayfa için 4 farklı render stratejisi sunar; sayfa düzeyinde tercih yapabilirsiniz.",
            bullets: [
              "SSR — her istekte sunucuda render",
              "SSG — build time'da render edilir, statik HTML üretir",
              "ISR — SSG + arka planda yenileme (incremental static regeneration)",
              "CSR — sadece istemcide render",
            ],
          },
          {
            title: "Veri Çekme (App Router)",
            body: "App Router'da Server Component'ler async olabilir; doğrudan await ile veri çekersiniz. fetch otomatik cache yönetimi yapar.",
            code: {
              language: "tsx",
              filename: "app/posts/page.tsx",
              code: `export default async function Posts() {
  const res = await fetch("https://api.example.com");
  const data = await res.json();
  return <ul>{data.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}`,
            },
          },
          {
            title: "API Routes",
            body: "Backend endpoint'leri uygulamanın içinde route.ts dosyaları ile yazılır. GET, POST, PUT, PATCH, DELETE export'larıyla HTTP fiilleri tanımlanır.",
            code: {
              language: "ts",
              filename: "app/api/hello/route.ts",
              code: `export async function GET() {
  return Response.json({ message: "Merhaba API" });
}`,
            },
          },
          {
            title: "Temel Özellikler",
            body: "Next.js'in production-ready paketinde gelen güçler:",
            bullets: [
              "Dosya tabanlı routing",
              "Server Components",
              "Built-in API routes",
              "Görüntü optimizasyonu (next/image)",
              "Otomatik kod bölme (code splitting)",
              "TypeScript desteği yerleşik",
            ],
          },
          {
            title: "Next.js mı, React mı?",
            body: "İkisinin amacı farklıdır:",
            bullets: [
              "Next.js: fullstack framework — SSR, SSG, SEO, production-ready",
              "React: sadece UI kütüphanesi — sıfırdan kurmak gerek",
              "Yeni başlayanlar Next.js ile başlamayı tercih ediyor",
            ],
          },
          {
            title: "Kullanım Alanları",
            body: "Next.js'in en sık kullanıldığı senaryolar:",
            bullets: [
              "SEO odaklı websiteler",
              "E-ticaret platformları",
              "SaaS dashboardları",
              "Blog ve içerik platformları",
              "Fullstack web uygulamaları",
            ],
          },
          {
            title: "Özet",
            body: "Next.js; frontend ve backend'i birleştirir, performansı ve SEO'yu iyileştirir, production-ready varsayılanlarla gelir. Modern, hızlı ve ölçeklenebilir web uygulamaları için React framework'ü seçimleri arasında zirvede yer alır.",
          },
        ],
        faq: [
          {
            question: "App Router mı, Pages Router mı?",
            answer:
              "Yeni projeler için App Router. Server Components, layout, loading.tsx ve streaming gibi modern özellikleri sadece App Router destekler. Pages Router hâlâ destekleniyor ama feature gap büyüyor.",
          },
          {
            question: "Vercel olmadan deploy edebilir miyim?",
            answer:
              "Evet — Node.js çalıştırabilen herhangi bir host (AWS, Docker, Cloudflare Workers) çalışır. Vercel optimize bir entegrasyon sunar ama zorunlu değildir.",
          },
          {
            question: "SSR mı, SSG mı?",
            answer:
              "Sayfa içeriği sık değişiyorsa ve kullanıcı bazlı ise SSR. İçerik değişmiyorsa SSG, ara senaryolar için ISR. App Router'da bu seçim sayfa/route düzeyinde olur, varsayılan static.",
          },
          {
            question: "API Routes yerine ayrı bir backend lazım mı?",
            answer:
              "Küçük/orta projeler için Next.js API Routes yeterli. Çok yüksek throughput, uzun süreli işlemler veya farklı dil ekipleri varsa ayrı backend (NestJS, Go vs.) tercih edilebilir.",
          },
          {
            question: "Server Components'te npm paketi kullanabilir miyim?",
            answer:
              "Evet, sunucuda çalışan herhangi bir paket kullanılabilir. Browser API'lerine ihtiyaç duyan paketler ('use client' gerektirir) sadece Client Components içinde çalışır.",
          },
        ],
      },
    },
    en: {
      slug: "what-is-nextjs",
      title: "What is Next.js? The React Framework for Production",
      description:
        "Build full-stack React apps with Next.js (App Router). Hands-on guide to SSR, SSG, ISR, API routes, Server Components and performance.",
      imageAlt:
        "Next.js infographic showing App Router, SSR/SSG/ISR, API routes and Server vs Client Components across 13 sections",
      keywords: [
        "next.js",
        "what is nextjs",
        "react framework",
        "app router",
        "server components",
        "ssr ssg isr",
        "fullstack react",
      ],
      content: {
        intro:
          "Next.js is the industry-standard React framework, maintained by Vercel, for building full-stack applications. It ships server-side rendering, static site generation, API routes, image and font optimization — and other production essentials — out of the box. With the App Router it now fully integrates React Server Components into the ecosystem. This guide expands all 13 sections of the infographic so you can see modern Next.js end to end.",
        sections: [
          {
            title: "What is Next.js?",
            body: "A React framework built for production. It supports server-side rendering, static site generation and is engineered for performance, scalability and SEO. Maintained by Vercel, it's one of the go-to choices for modern web apps.",
            bullets: [
              "Framework for full-stack React apps",
              "SSR + SSG support",
              "Built for performance, scalability and SEO",
            ],
          },
          {
            title: "Why Next.js?",
            body: "What you get out of the box:",
            bullets: [
              "Built-in (file-based) routing",
              "Server-side rendering & static site generation",
              "API routes (backend inside the frontend)",
              "Image and performance optimization",
              "Great developer experience",
              "Fast, SEO-friendly, fullstack-ready",
            ],
          },
          {
            title: "Installation",
            body: "Create a new Next.js project with one command; create-next-app walks you through App Router, TypeScript, Tailwind and ESLint choices interactively.",
            code: {
              language: "bash",
              code: `npx create-next-app@latest`,
            },
          },
          {
            title: "Project Structure",
            body: "The modern App Router layout is built on file-based routing. Every folder is a route, layout.tsx is the layout, page.tsx is the route's page.",
            code: {
              language: "text",
              code: `app/
├── layout.tsx        # shared layout
├── page.tsx          # / page
├── about/
│   └── page.tsx      # /about
└── api/
    └── hello/
        └── route.ts  # /api/hello`,
            },
          },
          {
            title: "App Router (IMPORTANT)",
            body: "The new routing system introduced in Next.js 13. It defaults to React Server Components and offers built-in support for layouts, loading states and streaming.",
            bullets: [
              "New routing system in Next.js",
              "Uses React Server Components by default",
              "Supports layouts, loading and streaming",
              "Nested routes for piece-by-piece UI",
            ],
            code: {
              language: "tsx",
              code: `"use client";
// this file is now a Client Component`,
            },
          },
          {
            title: "Server vs Client Components",
            body: "In the App Router, components are Server Components by default. Add the 'use client' directive at the top of a file to make it a Client Component.",
            bullets: [
              "Server Component: renders on the server, faster, no browser JS",
              "Client Component: runs in the browser, can use useState/useEffect",
              "The two compose freely",
            ],
          },
          {
            title: "Rendering Strategies",
            body: "Next.js offers four rendering strategies — pick at the page level.",
            bullets: [
              "SSR — render on the server per request",
              "SSG — render at build time, ship static HTML",
              "ISR — SSG + background revalidation",
              "CSR — render on the client only",
            ],
          },
          {
            title: "Data Fetching (App Router)",
            body: "Server Components can be async — you await your data directly. fetch handles caching automatically.",
            code: {
              language: "tsx",
              filename: "app/posts/page.tsx",
              code: `export default async function Posts() {
  const res = await fetch("https://api.example.com");
  const data = await res.json();
  return <ul>{data.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}`,
            },
          },
          {
            title: "API Routes",
            body: "Write backend endpoints inside your app via route.ts files. Export GET, POST, PUT, PATCH, DELETE to handle HTTP verbs.",
            code: {
              language: "ts",
              filename: "app/api/hello/route.ts",
              code: `export async function GET() {
  return Response.json({ message: "Hello API" });
}`,
            },
          },
          {
            title: "Key Features",
            body: "Production-ready capabilities Next.js packages together:",
            bullets: [
              "File-based routing",
              "Server Components",
              "Built-in API routes",
              "Image optimization (next/image)",
              "Automatic code splitting",
              "Built-in TypeScript support",
            ],
          },
          {
            title: "Next.js vs React",
            body: "They serve different goals:",
            bullets: [
              "Next.js: fullstack framework — SSR, SSG, SEO, production-ready",
              "React: just a UI library — you set up everything else",
              "Beginners increasingly start with Next.js",
            ],
          },
          {
            title: "Use Cases",
            body: "Where Next.js gets used most:",
            bullets: [
              "SEO-driven marketing sites",
              "E-commerce platforms",
              "SaaS dashboards",
              "Blogs and content platforms",
              "Full-stack web apps",
            ],
          },
          {
            title: "Summary",
            body: "Next.js combines frontend and backend, improves performance and SEO, and ships with production-ready defaults. It sits at the top of the list of React framework choices for modern, fast and scalable web apps.",
          },
        ],
        faq: [
          {
            question: "App Router or Pages Router?",
            answer:
              "App Router for new projects. Server Components, layouts, loading.tsx and streaming are App Router only. Pages Router is still supported but the feature gap keeps growing.",
          },
          {
            question: "Can I deploy without Vercel?",
            answer:
              "Yes — any host that runs Node.js (AWS, Docker, Cloudflare Workers) works. Vercel offers an optimized integration, but it's not required.",
          },
          {
            question: "SSR or SSG?",
            answer:
              "If content changes often and is user-specific, SSR. If it's stable, SSG; for the in-between, ISR. In the App Router this is decided per-route, with static as the default.",
          },
          {
            question: "Do I still need a separate backend?",
            answer:
              "API Routes are enough for small/medium projects. For very high throughput, long-running jobs or polyglot teams, a dedicated backend (NestJS, Go, etc.) is still appropriate.",
          },
          {
            question: "Can I use npm packages in Server Components?",
            answer:
              "Yes — any package that runs on the server. Packages that need browser APIs require 'use client' and only work inside Client Components.",
          },
        ],
      },
    },
  },
};
