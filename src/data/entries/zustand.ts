import type { Infographic } from "@/types";

export const zustand: Infographic = {
  id: "zustand",
  image: "/infographics/zustand.png",
  imageWidth: 1586,
  imageHeight: 992,
  tags: ["React", "Frontend"],
  publishedAt: "2026-04-29",
  updatedAt: "2026-04-29",
  readingMinutes: 7,
  translations: {
    tr: {
      slug: "zustand-nedir",
      title: "Zustand Nedir? Basit, Hızlı, Ölçeklenebilir State Management",
      description:
        "Zustand ile sıfır boilerplate'e yakın global state yönetimi. Store oluşturma, selectors, async actions, persist middleware ve TypeScript desteği.",
      imageAlt:
        "Zustand infografiği: store oluşturma, selectors, async actions ve persist middleware'i gösteren genel bakış",
      keywords: [
        "zustand",
        "zustand nedir",
        "react state management",
        "global state",
        "create store",
        "persist middleware",
        "redux alternative",
      ],
      content: {
        intro:
          "Zustand, React uygulamaları için tasarlanmış küçük, hızlı ve ölçeklenebilir bir global state management kütüphanesidir. Provider gerektirmez, Redux'a oranla minimum boilerplate ile çalışır ve TypeScript desteği baştan beri birinci sınıftır. Selectors ile gereksiz re-render'ları yazılı bir şekilde önler, persist middleware ile state'i localStorage'a kalıcı yazabilirsiniz. Bu rehberde infografikteki bölümleri açarak temel kullanımdan ileri pattern'lere kadar adım adım giderek tüm Zustand iş akışını gösteriyoruz.",
        sections: [
          {
            title: "Zustand Nedir?",
            body: "React için küçük, hızlı ve ölçeklenebilir bir state management kütüphanesidir. Reducer/action/dispatch boilerplate'i olmadan; çağrılan bir hook ile state ve setter elde edersiniz.",
            bullets: [
              "Daha az boilerplate",
              "Minimal setup",
              "Built-in React desteği",
              "Hem küçük hem büyük uygulamalar için",
            ],
          },
          {
            title: "Neden Zustand?",
            body: "Zustand'ın getirdiği avantajlar:",
            bullets: [
              "Provider gerektirmez",
              "Minimal API",
              "TypeScript ile yerleşik destek",
              "React Native API'siyle uyumlu",
              "Redux'a göre çok daha hafif (small footprint)",
            ],
          },
          {
            title: "Kurulum",
            body: "Tek paket; runtime bağımlılığı olarak kurulur.",
            code: {
              language: "bash",
              code: `npm install zustand`,
            },
          },
          {
            title: "Bir Store Oluşturma (Temel Fikir)",
            body: "create fonksiyonu, set'i alan bir factory ile state ve action'ları döndürür. Hook olarak kullanılabilir.",
            code: {
              language: "ts",
              filename: "stores/counter.ts",
              code: `import { create } from "zustand";

type CounterState = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

export const useCounter = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
}));`,
            },
          },
          {
            title: "Store'u Kullanma",
            body: "Store, doğrudan bir hook'tur. Değer ve action'ları okumak için çağırırsınız; component'i içine sarmaya gerek yok.",
            code: {
              language: "tsx",
              code: `function Counter() {
  const { count, increment } = useCounter();
  return (
    <button onClick={increment}>
      Count: {count}
    </button>
  );
}`,
            },
          },
          {
            title: "Selectors (ÖNEMLİ)",
            body: "Yalnızca ihtiyaç duyduğunuz alanı seçmek için selector geçirin. Bu, sadece o alan değiştiğinde re-render olmasını sağlar — performans için kritiktir.",
            code: {
              language: "ts",
              code: `const count = useCounter((s) => s.count);
const increment = useCounter((s) => s.increment);`,
            },
          },
          {
            title: "Async Actions",
            body: "Store içinde async fonksiyon tanımlayıp set'i çağırabilirsiniz. Veri çekme, login gibi async işler de doğal akışta yer alır.",
            code: {
              language: "ts",
              code: `export const useUsers = create((set) => ({
  users: [],
  loading: false,
  fetchUsers: async () => {
    set({ loading: true });
    const res = await fetch("/api/users");
    const users = await res.json();
    set({ users, loading: false });
  },
}));`,
            },
          },
          {
            title: "Persist Middleware",
            body: "persist middleware, store içeriğini localStorage'a yazar. Sayfa yenilense bile state korunur. sessionStorage veya custom storage da kullanılabilir.",
            code: {
              language: "ts",
              code: `import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTheme = create(
  persist<{ theme: "light" | "dark"; toggle: () => void }>(
    (set) => ({
      theme: "light",
      toggle: () =>
        set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
    }),
    { name: "theme" }
  )
);`,
            },
          },
          {
            title: "Temel Kavramlar",
            body: "Zustand ile sürekli karşılaşacağınız parçalar:",
            bullets: [
              "create — store oluşturmak",
              "set / get — state güncellemek ve okumak",
              "selectors — sadece ihtiyacınızı dinlemek",
              "persist — state'i kalıcı yazmak",
              "subscriber — store dışında dinlemek",
              "middleware — devtools, persist, immer vb.",
            ],
          },
          {
            title: "Zustand vs Redux",
            body: "İkisinin temel farkları:",
            bullets: [
              "Zustand: minimal boilerplate, provider yok, hızlı kurulum",
              "Redux: action/reducer/dispatch, daha katı yapı, daha fazla setup",
              "Zustand modern projelerde gittikçe yaygınlaşıyor",
              "Redux Toolkit, klasik Redux'a göre boilerplate'i azaltır ama yine de ağırdır",
            ],
          },
          {
            title: "Kullanım Alanları",
            body: "Zustand'ın özellikle parladığı senaryolar:",
            bullets: [
              "Global UI state (theme, modal, sidebar)",
              "Paylaşılan client state",
              "Küçük-orta ölçekli uygulamalar",
              "React Native uygulamaları",
              "Form draft/auto-save state",
            ],
          },
          {
            title: "Özet",
            body: "Zustand; basit, hızlı ve performanslıdır. Boilerplate'i minimum tutar, mükemmel geliştirici deneyimi sunar ve modern React uygulamaları için harika bir varsayılan tercihtir. Server state için React Query, client state için Zustand kombinasyonu modern stack'lerde en yaygın görünen ikilidir.",
          },
        ],
        faq: [
          {
            question: "Zustand mı, Redux Toolkit mi?",
            answer:
              "Yeni projelerde Zustand çoğu zaman yeterli ve daha az boilerplate getirir. Çok büyük ekipler, katı action history takibi veya devtools temelli iş akışı isteyenler için Redux Toolkit hâlâ güçlü bir seçim.",
          },
          {
            question: "Server state için de kullanılır mı?",
            answer:
              "Kullanılabilir ama önerilmez. React Query/TanStack Query gibi server state'e özel kütüphaneler cache, deduplication ve refetch konusunda çok daha üstündür. Zustand'ı client state için kullanın.",
          },
          {
            question: "TypeScript ile zorluk yaşar mıyım?",
            answer:
              "Hayır — Zustand'ın TS desteği güçlüdür. create<TState>() jenerik kullanımıyla tüm action ve state tipleri çıkarsanır. Sadece middleware kombinasyonlarında dikkatli tip imzaları gerekir.",
          },
          {
            question: "Birden fazla store olur mu?",
            answer:
              "Evet, idealdir. Her domain için ayrı store oluşturmak (auth, cart, ui) Zustand'ın önerdiği yaklaşımdır. Tek bir mega store yerine küçük store'larla daha temiz ve test edilebilir bir mimari kurarsınız.",
          },
          {
            question: "DevTools desteği var mı?",
            answer:
              "Evet — devtools middleware'i ile Redux DevTools'a action gönderebilirsiniz. Geliştirme sırasında state geçmişini görmek ve debug yapmak için çok kullanışlıdır.",
          },
        ],
      },
    },
    en: {
      slug: "what-is-zustand",
      title: "What is Zustand? Simple, Fast and Scalable State Management",
      description:
        "Near-zero-boilerplate global state for React with Zustand. Stores, selectors, async actions, persist middleware and full TypeScript support.",
      imageAlt:
        "Zustand infographic showing store creation, selectors, async actions and persist middleware",
      keywords: [
        "zustand",
        "what is zustand",
        "react state management",
        "global state",
        "create store",
        "persist middleware",
        "redux alternative",
      ],
      content: {
        intro:
          "Zustand is a small, fast and scalable global state management library for React applications. It needs no provider, ships with far less boilerplate than Redux, and has excellent TypeScript support out of the box. Selectors prevent unnecessary re-renders explicitly; persist middleware lets you write state straight to localStorage. This guide expands the infographic to cover everything from basic usage to advanced patterns.",
        sections: [
          {
            title: "What is Zustand?",
            body: "A small, fast and scalable state management library for React. Without reducer/action/dispatch boilerplate, you call a hook and get state plus setters.",
            bullets: [
              "Less boilerplate",
              "Minimal setup",
              "Built-in React support",
              "Works for both small and large apps",
            ],
          },
          {
            title: "Why Zustand?",
            body: "What Zustand brings to the table:",
            bullets: [
              "No provider required",
              "Minimal API",
              "Built-in TypeScript support",
              "Compatible with React Native APIs",
              "Much smaller footprint than Redux",
            ],
          },
          {
            title: "Installation",
            body: "Single package — installed as a runtime dependency.",
            code: {
              language: "bash",
              code: `npm install zustand`,
            },
          },
          {
            title: "Create a Store (Core Idea)",
            body: "create takes a factory that receives set and returns state and actions. The result is itself a hook.",
            code: {
              language: "ts",
              filename: "stores/counter.ts",
              code: `import { create } from "zustand";

type CounterState = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

export const useCounter = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
}));`,
            },
          },
          {
            title: "Using the Store",
            body: "The store is a hook. Read values and actions by calling it — no need to wrap your component in anything.",
            code: {
              language: "tsx",
              code: `function Counter() {
  const { count, increment } = useCounter();
  return (
    <button onClick={increment}>
      Count: {count}
    </button>
  );
}`,
            },
          },
          {
            title: "Selectors (IMPORTANT)",
            body: "Pass a selector to subscribe only to the slice you need. Your component re-renders only when that slice changes — critical for performance.",
            code: {
              language: "ts",
              code: `const count = useCounter((s) => s.count);
const increment = useCounter((s) => s.increment);`,
            },
          },
          {
            title: "Async Actions",
            body: "Define async functions inside the store and call set as needed. Data fetching, login flows and similar async work fit naturally.",
            code: {
              language: "ts",
              code: `export const useUsers = create((set) => ({
  users: [],
  loading: false,
  fetchUsers: async () => {
    set({ loading: true });
    const res = await fetch("/api/users");
    const users = await res.json();
    set({ users, loading: false });
  },
}));`,
            },
          },
          {
            title: "Persist Middleware",
            body: "The persist middleware writes the store to localStorage. State survives page reloads. You can also use sessionStorage or a custom storage.",
            code: {
              language: "ts",
              code: `import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTheme = create(
  persist<{ theme: "light" | "dark"; toggle: () => void }>(
    (set) => ({
      theme: "light",
      toggle: () =>
        set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
    }),
    { name: "theme" }
  )
);`,
            },
          },
          {
            title: "Key Concepts",
            body: "What you'll meet over and over:",
            bullets: [
              "create — building a store",
              "set / get — updating and reading state",
              "selectors — subscribing to slices",
              "persist — saving state",
              "subscriber — listening outside React",
              "middleware — devtools, persist, immer, …",
            ],
          },
          {
            title: "Zustand vs Redux",
            body: "The high-level differences:",
            bullets: [
              "Zustand: minimal boilerplate, no provider, fast setup",
              "Redux: actions/reducers/dispatch, stricter, more setup",
              "Zustand keeps growing in modern projects",
              "Redux Toolkit reduces classic Redux boilerplate but is still heavier",
            ],
          },
          {
            title: "Use Cases",
            body: "Where Zustand particularly shines:",
            bullets: [
              "Global UI state (theme, modal, sidebar)",
              "Shared client state",
              "Small-to-medium apps",
              "React Native apps",
              "Form draft / auto-save state",
            ],
          },
          {
            title: "Summary",
            body: "Zustand is simple, fast and performant. It minimizes boilerplate, offers a great DX and is a fantastic default for modern React apps. The most common modern combo is React Query for server state and Zustand for client state.",
          },
        ],
        faq: [
          {
            question: "Zustand or Redux Toolkit?",
            answer:
              "For new projects, Zustand is usually enough and brings far less boilerplate. Very large teams or those wanting strict action history and devtools-driven workflows might still prefer Redux Toolkit.",
          },
          {
            question: "Can I use it for server state?",
            answer:
              "You can, but it's not recommended. Libraries dedicated to server state — React Query / TanStack Query — handle cache, deduplication and refetch much better. Use Zustand for client state.",
          },
          {
            question: "Will TypeScript be hard?",
            answer:
              "No — Zustand's TS support is solid. The create<TState>() generic gives you typed state and actions automatically. You only need careful types when composing middleware.",
          },
          {
            question: "Can I have multiple stores?",
            answer:
              "Yes, that's the recommended pattern. Create a store per domain (auth, cart, ui) instead of a single mega-store — easier to test and reason about.",
          },
          {
            question: "Is there DevTools support?",
            answer:
              "Yes — the devtools middleware integrates with Redux DevTools, letting you inspect state history and actions during development.",
          },
        ],
      },
    },
  },
};
