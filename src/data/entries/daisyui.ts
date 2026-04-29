import type { Infographic } from "@/types";

export const daisyui: Infographic = {
  id: "daisyui",
  image: "/infographics/daisyui.png",
  imageWidth: 1586,
  imageHeight: 992,
  tags: ["Frontend"],
  publishedAt: "2026-04-28",
  updatedAt: "2026-04-28",
  readingMinutes: 5,
  translations: {
    tr: {
      slug: "daisyui-nedir",
      title: "daisyUI Nedir? Tailwind CSS ile Hızlı Component Sistemi",
      description:
        "daisyUI ile Tailwind utility class'larının üzerine hazır bileşen ve tema sistemi ekleyin. Kurulum, Vite plugin yapılandırması ve örnek bileşenlerin pratik rehberi.",
      imageAlt:
        "daisyUI infografiği: Tailwind CSS üzerine kurulu component plugin, kurulum ve tema sistemini gösteren 12 bölümlü genel bakış",
      keywords: [
        "daisyui",
        "tailwind component library",
        "daisyui kurulum",
        "tailwind plugin",
        "tailwind tema",
        "component library",
      ],
      content: {
        intro:
          "daisyUI, Tailwind CSS'in üzerine kurulu, hazır bileşen sınıfları ve tema sistemi sunan resmi bir plugin'dir. Tailwind utility'lerinin esnekliğini koruyarak buton, kart, modal gibi yaygın bileşenler için kısa ve okunabilir class'lar verir; üstelik onlarca temayı tek satırla aktif edersiniz. Bu rehberde infografikteki bölümleri açarak React + Vite üzerinde nasıl kurulup kullanılacağını gösteriyoruz.",
        sections: [
          {
            title: "daisyUI Nedir?",
            body: "Tailwind CSS plugin'i olarak çalışan ve hazır bileşen class'ları sağlayan bir kütüphanedir. btn, card, modal, alert gibi semantik class'lar Tailwind utility'leriyle birleştiğinde sıfırdan tasarım sistemi kurma derdi ortadan kalkar.",
            bullets: [
              "Tailwind tabanlı component plugin",
              "Önceden tanımlı bileşenler",
              "Tailwind ile birlikte çalışır, yerine geçmez",
              "React, Vue, HTML — framework agnostic",
            ],
          },
          {
            title: "Neden daisyUI Kullanmalı?",
            body: "Tailwind sıfırdan her şeyi yazmanızı gerektirir; bu küçük projelerde verimli olsa da büyük ekiplerde tekrar eden class kombinasyonları yorucu hale gelir. daisyUI bu tekrarı semantik class'larla soğurur.",
            bullets: [
              "Tailwind'i daha hızlı yapar",
              "Built-in tema desteği (light/dark + 30+ tema)",
              "Tailwind utility'lerine tam uyumlu",
              "Karanlık mod hazır gelir",
              "Daha az custom CSS yazmanız gerekir",
            ],
          },
          {
            title: "Kurulum: React + Vite",
            body: "Bir React + Vite projesi başlatmak için resmi Vite şablonu yeterli. daisyUI'yi sonradan ekleyeceğiz.",
            code: {
              language: "bash",
              code: `npm create vite@latest my-app -- --template react
cd my-app
npm install`,
            },
          },
          {
            title: "Tailwind + daisyUI Kurulumu",
            body: "Tailwind CSS'i kurup daisyUI'yi plugin olarak ekleyin.",
            code: {
              language: "bash",
              code: `npm install -D tailwindcss @tailwindcss/vite daisyui@latest`,
            },
          },
          {
            title: "Vite Plugin Yapılandırması",
            body: "Vite config içinde Tailwind plugin'ini ekleyin; daisyUI Tailwind tarafından otomatik tüketilecek.",
            code: {
              language: "ts",
              filename: "vite.config.ts",
              code: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`,
            },
          },
          {
            title: "CSS'e daisyUI'yi Ekleme",
            body: "Tailwind v4 syntax'ı ile @plugin yönergesi kullanarak daisyUI'yi etkinleştirin. Bu satır temaları ve component class'larını otomatik dahil eder.",
            code: {
              language: "css",
              filename: "src/index.css",
              code: `@import "tailwindcss";
@plugin "daisyui";`,
            },
          },
          {
            title: "Örnek Bileşen: Button",
            body: "btn class'ı temel buton stilini, btn-primary varyant rengini, btn-outline kontur stilini sağlar. Birleştirerek istediğiniz çeşitliliği elde edersiniz.",
            code: {
              language: "tsx",
              code: `<button className="btn btn-primary">
  Click me
</button>

<button className="btn btn-outline btn-secondary">
  Outline
</button>`,
            },
          },
          {
            title: "Liste Bileşeni",
            body: "menu class'ı navigation menüleri için optimize edilmiş bir liste sunar. base class ile çevreleyip içine li/a ekleyerek dakikalar içinde yan menü oluşturabilirsiniz.",
            code: {
              language: "tsx",
              code: `<ul className="menu bg-base-200 rounded-box w-56">
  <li><a>Dashboard</a></li>
  <li><a>Projects</a></li>
  <li><a>Tasks</a></li>
  <li><a>Settings</a></li>
</ul>`,
            },
          },
          {
            title: "Temel Özellikler",
            body: "daisyUI'nin paketle birlikte gelen güçleri:",
            bullets: [
              "Semantik class isimleri (btn, card, modal)",
              "30+ hazır tema (cupcake, dracula, forest, …)",
              "Tailwind utility'lerle tam uyum",
              "Karanlık mod hazır",
              "Component varyantları ve boyutları",
            ],
          },
          {
            title: "Temalar",
            body: "Bir tema değiştirmek için CSS plugin satırına theme listesi vermek yeterli. data-theme attribute'u ile çalışma anında geçiş de mümkün.",
            code: {
              language: "html",
              code: `<html data-theme="dracula">
  <body>...</body>
</html>`,
            },
          },
          {
            title: "Kullanım Alanları",
            body: "daisyUI'nin parladığı senaryolar:",
            bullets: [
              "Admin paneli ve dashboard'lar",
              "MVP ve hızlı prototipler",
              "İç araçlar ve B2B uygulamalar",
              "SaaS ürünlerinin marketing/onboarding sayfaları",
            ],
          },
          {
            title: "Özet",
            body: "daisyUI; Tailwind CSS deneyimini hızlandırır, daha az kod yazmanızı sağlar ve tutarlı bir tasarım sistemi kurmanıza yardım eder. Tailwind'in özgürlüğünü kaybetmeden bileşen ergonomisi kazandırır — özellikle hızlı geliştirme ve MVP'ler için ideal.",
          },
        ],
        faq: [
          {
            question: "daisyUI Tailwind'in yerine geçer mi?",
            answer:
              "Hayır, Tailwind plugin'idir; üzerine eklenir. Hâlâ tüm Tailwind utility'lerini kullanabilirsiniz. daisyUI sadece sık kullanılan class kombinasyonlarına semantik isim verir.",
          },
          {
            question: "shadcn/ui ile farkı nedir?",
            answer:
              "shadcn/ui Radix tabanlı, projeye kopyalanan headless componentlerdir. daisyUI ise saf CSS class kütüphanesidir. shadcn daha esnek/erişilebilir, daisyUI daha hızlı kurulur ve framework bağımsızdır.",
          },
          {
            question: "Tema sayısı ne kadar?",
            answer:
              "Resmi temalar 30'dan fazla. Kendi temanızı `themes` config'inde tanımlayabilir veya CSS değişkenlerini override edebilirsiniz. Light/dark otomatik olarak prefers-color-scheme'e bağlanabilir.",
          },
          {
            question: "Bundle boyutu büyür mü?",
            answer:
              "Tailwind purge (content) doğru yapılandırıldığında sadece kullandığınız class'lar bundle'a girer. daisyUI'nin genel etkisi az; tema CSS değişkenleri minimal yer kaplar.",
          },
          {
            question: "React Native ile çalışır mı?",
            answer:
              "Hayır — daisyUI saf CSS olduğundan React Native'de doğrudan çalışmaz. RN için NativeWind, Tamagui veya Restyle gibi alternatifler vardır.",
          },
        ],
      },
    },
    en: {
      slug: "what-is-daisyui",
      title: "What is daisyUI? Build UIs Faster with Tailwind Components",
      description:
        "Layer prebuilt components and a theming system on top of Tailwind utilities with daisyUI. Practical guide to setup, the Vite plugin and example components.",
      imageAlt:
        "daisyUI infographic: a Tailwind-based component plugin showing setup and theming across 12 sections",
      keywords: [
        "daisyui",
        "tailwind component library",
        "daisyui setup",
        "tailwind plugin",
        "tailwind themes",
        "component library",
      ],
      content: {
        intro:
          "daisyUI is the official component plugin built on top of Tailwind CSS. It preserves all the flexibility of Tailwind utilities while providing short, readable class names for common components — buttons, cards, modals — and lets you switch among dozens of themes with a single line. This guide walks through the infographic and shows how to install and use it on a React + Vite stack.",
        sections: [
          {
            title: "What is daisyUI?",
            body: "A Tailwind CSS plugin that ships ready-made component classes. Semantic classes like btn, card, modal and alert combine with Tailwind utilities so you don't have to invent a design system from scratch.",
            bullets: [
              "Tailwind-based component plugin",
              "Predefined components",
              "Works with Tailwind, doesn't replace it",
              "React, Vue, HTML — framework agnostic",
            ],
          },
          {
            title: "Why Use daisyUI?",
            body: "Tailwind has you write everything from scratch — efficient on small projects but tiring in large teams where the same class combinations repeat everywhere. daisyUI absorbs that repetition into semantic classes.",
            bullets: [
              "Makes Tailwind faster",
              "Built-in theming (light/dark + 30+ themes)",
              "Fully compatible with Tailwind utilities",
              "Dark mode ready out of the box",
              "Less custom CSS to write",
            ],
          },
          {
            title: "Setup: React + Vite",
            body: "Bootstrap a React + Vite project with the official template. We'll add daisyUI on top.",
            code: {
              language: "bash",
              code: `npm create vite@latest my-app -- --template react
cd my-app
npm install`,
            },
          },
          {
            title: "Install Tailwind + daisyUI",
            body: "Install Tailwind CSS and add daisyUI as a plugin.",
            code: {
              language: "bash",
              code: `npm install -D tailwindcss @tailwindcss/vite daisyui@latest`,
            },
          },
          {
            title: "Configure the Vite Plugin",
            body: "Add the Tailwind plugin to your Vite config; daisyUI is consumed by Tailwind automatically.",
            code: {
              language: "ts",
              filename: "vite.config.ts",
              code: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`,
            },
          },
          {
            title: "Add daisyUI to CSS",
            body: "Use Tailwind v4 @plugin syntax to enable daisyUI. This single line pulls in themes and component classes.",
            code: {
              language: "css",
              filename: "src/index.css",
              code: `@import "tailwindcss";
@plugin "daisyui";`,
            },
          },
          {
            title: "Example Button",
            body: "btn provides the base button style, btn-primary picks a variant color, btn-outline gives the outlined version. Mix and match for any combination you need.",
            code: {
              language: "tsx",
              code: `<button className="btn btn-primary">
  Click me
</button>

<button className="btn btn-outline btn-secondary">
  Outline
</button>`,
            },
          },
          {
            title: "List Component",
            body: "menu provides a list optimized for navigation. Wrap with the base class and drop li/a inside to build a sidebar in minutes.",
            code: {
              language: "tsx",
              code: `<ul className="menu bg-base-200 rounded-box w-56">
  <li><a>Dashboard</a></li>
  <li><a>Projects</a></li>
  <li><a>Tasks</a></li>
  <li><a>Settings</a></li>
</ul>`,
            },
          },
          {
            title: "Key Features",
            body: "What daisyUI brings out of the box:",
            bullets: [
              "Semantic class names (btn, card, modal)",
              "30+ ready themes (cupcake, dracula, forest, …)",
              "Full Tailwind utility compatibility",
              "Dark mode ready",
              "Component variants and sizes",
            ],
          },
          {
            title: "Themes",
            body: "Just provide a theme list to the CSS plugin line. You can switch at runtime via the data-theme attribute.",
            code: {
              language: "html",
              code: `<html data-theme="dracula">
  <body>...</body>
</html>`,
            },
          },
          {
            title: "Use Cases",
            body: "Where daisyUI shines:",
            bullets: [
              "Admin panels and dashboards",
              "MVPs and rapid prototypes",
              "Internal tools and B2B apps",
              "Marketing/onboarding pages of SaaS products",
            ],
          },
          {
            title: "Summary",
            body: "daisyUI accelerates the Tailwind experience, lets you write less code and helps you maintain a consistent design system. It adds component ergonomics without sacrificing Tailwind's freedom — especially good for fast iteration and MVPs.",
          },
        ],
        faq: [
          {
            question: "Does daisyUI replace Tailwind?",
            answer:
              "No, it's a Tailwind plugin layered on top. You still use all Tailwind utilities — daisyUI just gives semantic names to common combinations.",
          },
          {
            question: "How is it different from shadcn/ui?",
            answer:
              "shadcn/ui ships Radix-based headless components you copy into your project. daisyUI is a pure CSS class library. shadcn is more flexible/accessible; daisyUI is faster to set up and framework-agnostic.",
          },
          {
            question: "How many themes are there?",
            answer:
              "30+ official themes. You can define your own in the themes config or override CSS variables. Light/dark can hook automatically into prefers-color-scheme.",
          },
          {
            question: "Does it bloat my bundle?",
            answer:
              "When Tailwind's content config is correct, only the classes you use end up in the bundle. daisyUI's overall footprint is small; theme CSS variables take minimal space.",
          },
          {
            question: "Does it work with React Native?",
            answer:
              "No — daisyUI is pure CSS, so it doesn't apply to RN. For React Native, look at NativeWind, Tamagui or Restyle.",
          },
        ],
      },
    },
  },
};
