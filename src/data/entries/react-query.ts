import type { Infographic } from "@/types";

export const reactQuery: Infographic = {
  id: "react-query",
  image: "/infographics/react-query.png",
  imageWidth: 1536,
  imageHeight: 1024,
  tags: ["React", "Frontend"],
  publishedAt: "2025-08-15",
  updatedAt: "2026-04-28",
  readingMinutes: 9,
  translations: {
    tr: {
      slug: "react-query-nedir",
      title: "React Query Nedir? TypeScript ile Sunucu Durumu Yönetimi",
      description:
        "React Query (TanStack Query) ile veri çekme, cache, senkronizasyon ve mutation'ları kolayca yönetin. TypeScript-first, otomatik cache, refetch ve invalidation rehberi.",
      imageAlt:
        "React Query infografiği: data fetching, caching, synchronization, reliability ve TypeScript-first başlıklarıyla 9 bölümlü genel bakış",
      keywords: [
        "react query",
        "tanstack query",
        "useQuery",
        "useMutation",
        "react veri yönetimi",
        "react cache",
        "server state typescript",
      ],
      content: {
        intro:
          "React Query (yeni adıyla TanStack Query), React uygulamalarında server state yönetimi için tasarlanmış, TypeScript-first bir veri çekme kütüphanesidir. Önbellekleme, senkronizasyon, arka plan güncellemeleri ve gereksiz useEffect kullanımını ortadan kaldırarak modern uygulamaların veri katmanını sadeleştirir. Bu infografik dokuz bölümde React Query'nin tüm temellerini özetler; aşağıdaki bölümlerde her birini koduyla birlikte detaylandırıyoruz.",
        sections: [
          {
            title: "React Query Nedir?",
            body: "React'ta server state yönetimi için bir veri çekme kütüphanesidir. Cache, senkronizasyon ve arka plan güncellemelerini otomatik halleder; gereksiz useEffect kullanımını ortadan kaldırır. Üstelik TypeScript desteği baştan beri birinci sınıftır.",
            bullets: [
              "Sunucu verisi için cache + senkronizasyon",
              "Arka planda otomatik güncelleme",
              "Gereksiz useEffect / loading state kodlarını siler",
            ],
          },
          {
            title: "Neden React Query Kullanmalı?",
            body: "Manuel fetch kodları büyüdükçe loading, error, retry, deduplication ve refetch yönetimi karmaşıklaşır. React Query bu kalıpları sıfır yapılandırma ile çözer ve uygulamanın hem hızını hem geliştirici deneyimini artırır.",
            bullets: [
              "Otomatik cache ve istek tekilleştirme (deduplication)",
              "Arka planda yeniden çekme ve senkronizasyon",
              "Built-in loading, error ve success durumları",
              "Retry ve stale-while-revalidate stratejisi",
              "Daha az boilerplate, daha temiz componentler",
            ],
          },
          {
            title: "Kurulum",
            body: "Tek paket kurulumu yeterlidir. Daha sonra QueryClient'ı oluşturup uygulamanızı QueryClientProvider ile sararsınız.",
            code: {
              language: "bash",
              code: "npm install @tanstack/react-query",
            },
          },
          {
            title: "Kurulum: QueryClientProvider",
            body: "Cache'i tüm uygulamanın paylaşabilmesi için QueryClient'ı bir kez oluşturup root'ta provider ile sağlamak gerekir. State olarak useState ile sarmalamak SSR senaryolarında yeniden oluşturmayı engeller.",
            code: {
              language: "tsx",
              filename: "app/providers.tsx",
              code: `"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}`,
            },
          },
          {
            title: "useQuery + TypeScript ile Veri Çekme",
            body: "useQuery; queryKey ve queryFn parametrelerini alır, geri dönüş değerini sizin tip tanımınıza göre çıkarsar. TypeScript ile birleşince data, error ve isLoading tamamen tip-güvenli olur.",
            code: {
              language: "tsx",
              filename: "components/Users.tsx",
              code: `import { useQuery } from "@tanstack/react-query";

type User = {
  id: number;
  name: string;
  email: string;
};

async function fetchUsers(): Promise<User[]> {
  const res = await fetch("/api/users");
  return res.json();
}

export function Users() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Yükleniyor…</p>;
  if (isError) return <p>Bir hata oluştu</p>;

  return (
    <ul>
      {data?.map((u) => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}`,
            },
          },
          {
            title: "useMutation ile Veri Yazma",
            body: "Server'a yazma işlemleri için useMutation kullanılır. onSuccess içinde queryClient.invalidateQueries çağırarak ilgili sorguların yeniden çekilmesini ve UI'ın güncellenmesini sağlarsınız.",
            code: {
              language: "tsx",
              filename: "components/CreateUser.tsx",
              code: `import { useMutation, useQueryClient } from "@tanstack/react-query";

export function CreateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ name: "Ada" })}>
      Kullanıcı ekle
    </button>
  );
}`,
            },
          },
          {
            title: "Yeniden Kullanılabilir Custom Hook",
            body: "Aynı sorguyu birden fazla bileşende kullanmak için kendi hook'unuza sarmalamak iyi bir pratiktir. Bu hem cache anahtarının tutarlı kalmasını hem de business logic'in tek yerde toplanmasını sağlar.",
            code: {
              language: "tsx",
              filename: "hooks/useUsers.ts",
              code: `export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60,
  });
}

// Kullanımı
const { data, isLoading } = useUsers();`,
            },
          },
          {
            title: "Temel Kavramlar",
            body: "React Query'nin gücünü anlamak için bilmeniz gereken anahtar kavramlar:",
            bullets: [
              "queryKey — cache anahtarı; veri tekilleştirme ve identitiy için kullanılır",
              "queryFn — Promise döndüren async fonksiyon",
              "staleTime — verinin ne kadar süre 'taze' kabul edileceği",
              "cacheTime / gcTime — kullanılmayan cache'in ne kadar süre tutulacağı",
              "isLoading & isError — UI durumları için hazır flag'ler",
              "enabled — sorgunun şartlı çalışması için (örn. id geldiğinde)",
            ],
          },
          {
            title: "Özet",
            body: "React Query, server state'i client state'ten ayırır; daha az boilerplate ile daha hızlı ve dayanıklı UI'lar üretmenizi sağlar. TypeScript ile mükemmel uyum içinde çalışır ve özel hook'lar yazmayı kolaylaştırır. React Query bugün TanStack Query adıyla aynı kütüphane olarak yaşamını sürdürmektedir.",
          },
        ],
        faq: [
          {
            question: "React Query Redux'un yerine geçer mi?",
            answer:
              "Server state için evet — Redux ile yazılan birçok fetch/cache kalıbı doğrudan React Query'ye taşınabilir. Form, modal, UI gibi client state'iniz varsa Zustand veya Redux Toolkit ile birlikte kullanmak yaygın bir tercihtir.",
          },
          {
            question: "Next.js App Router ile uyumlu mu?",
            answer:
              "Evet. Sunucuda prefetchQuery ile ön yükleme yapıp HydrationBoundary ile istemciye aktarabilirsiniz. Bu, hem SEO hem TTI açısından idealdir.",
          },
          {
            question: "Query Key nasıl yapılandırılmalı?",
            answer:
              "Array olarak tanımlayın ve bağımlılıklarınızı dahil edin: ['users'], ['users', userId], ['users', { status: 'active' }]. Tutarlı bir naming convention bakım kolaylığı getirir.",
          },
          {
            question: "TanStack Query ile aynı şey mi?",
            answer:
              "Evet. React Query, framework-agnostik bir aileye dönüştürüldü ve adı TanStack Query oldu. React paketi @tanstack/react-query üzerinden devam ediyor.",
          },
          {
            question: "staleTime değerini ne yapmalıyım?",
            answer:
              "Çoğu okuma odaklı uygulama için 30-60 saniye iyi bir başlangıçtır. Çok sık değişen veriler için düşürün, neredeyse hiç değişmeyen veriler için Infinity bile kullanılabilir.",
          },
        ],
      },
    },
    en: {
      slug: "what-is-react-query",
      title: "What is React Query? Manage Server State with TypeScript",
      description:
        "Use React Query (TanStack Query) for data fetching, caching, sync and mutations. TypeScript-first, automatic cache, refetch and invalidation walkthrough.",
      imageAlt:
        "React Query infographic showing data fetching, caching, synchronization, reliability and TypeScript-first across nine sections",
      keywords: [
        "react query",
        "tanstack query",
        "useQuery",
        "useMutation",
        "react data fetching",
        "react cache",
        "server state typescript",
      ],
      content: {
        intro:
          "React Query (now known as TanStack Query) is a TypeScript-first data-fetching library purpose-built for managing server state in React applications. It handles caching, synchronization and background updates automatically and removes the need for ad-hoc useEffect calls. The infographic boils React Query down to nine sections; this guide expands each one with code.",
        sections: [
          {
            title: "What is React Query?",
            body: "A data-fetching library for managing server state in React. It automatically handles caching, synchronization and background updates, and eliminates excessive useEffect usage. TypeScript support is first-class out of the box.",
            bullets: [
              "Cache + synchronization for server data",
              "Automatic background refresh",
              "Removes excessive useEffect / loading-state code",
            ],
          },
          {
            title: "Why Use React Query?",
            body: "As manual fetch code grows, the management of loading, error, retry, deduplication and refetch states becomes complex. React Query solves these patterns with zero configuration and improves both performance and developer experience.",
            bullets: [
              "Automatic caching and request deduplication",
              "Background refetch and synchronization",
              "Built-in loading, error and success states",
              "Retry and stale-while-revalidate strategy",
              "Cleaner components with less boilerplate",
            ],
          },
          {
            title: "Installation",
            body: "A single package install is enough. Then create a QueryClient and wrap your app with QueryClientProvider.",
            code: {
              language: "bash",
              code: "npm install @tanstack/react-query",
            },
          },
          {
            title: "Setup: QueryClientProvider",
            body: "To share the cache across the entire app, create the QueryClient once and provide it at the root. Wrapping the instance in useState avoids re-creating it during SSR re-renders.",
            code: {
              language: "tsx",
              filename: "app/providers.tsx",
              code: `"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}`,
            },
          },
          {
            title: "Fetching Data with useQuery + TypeScript",
            body: "useQuery takes queryKey and queryFn parameters and infers the return type from your typing. Combined with TypeScript, data, error and isLoading become fully type-safe.",
            code: {
              language: "tsx",
              filename: "components/Users.tsx",
              code: `import { useQuery } from "@tanstack/react-query";

type User = {
  id: number;
  name: string;
  email: string;
};

async function fetchUsers(): Promise<User[]> {
  const res = await fetch("/api/users");
  return res.json();
}

export function Users() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <ul>
      {data?.map((u) => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}`,
            },
          },
          {
            title: "Writing with useMutation",
            body: "useMutation handles writes. Inside onSuccess, call queryClient.invalidateQueries to refetch the affected queries — the UI then updates automatically.",
            code: {
              language: "tsx",
              filename: "components/CreateUser.tsx",
              code: `import { useMutation, useQueryClient } from "@tanstack/react-query";

export function CreateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ name: "Ada" })}>
      Add user
    </button>
  );
}`,
            },
          },
          {
            title: "Reusable Custom Hook",
            body: "When the same query is consumed by multiple components, wrap it in your own hook. This keeps the cache key consistent and centralizes the business logic.",
            code: {
              language: "tsx",
              filename: "hooks/useUsers.ts",
              code: `export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60,
  });
}

// Usage
const { data, isLoading } = useUsers();`,
            },
          },
          {
            title: "Key Concepts",
            body: "The vocabulary you'll see again and again with React Query:",
            bullets: [
              "queryKey — cache identifier used for dedupe and identity",
              "queryFn — async function returning a Promise",
              "staleTime — how long data is considered fresh",
              "cacheTime / gcTime — how long unused cache is retained",
              "isLoading & isError — ready-to-use UI flags",
              "enabled — to run a query conditionally (e.g. when id is set)",
            ],
          },
          {
            title: "Summary",
            body: "React Query separates server state from client state, letting you ship faster and more resilient UIs with less boilerplate. It works perfectly with TypeScript and pairs naturally with custom hooks. The library lives on today as TanStack Query.",
          },
        ],
        faq: [
          {
            question: "Does React Query replace Redux?",
            answer:
              "For server state, yes — many fetch/cache patterns originally built with Redux can move to React Query. If you have client state (forms, modals, UI flags), pairing it with Zustand or Redux Toolkit is the common path.",
          },
          {
            question: "Does it work with the Next.js App Router?",
            answer:
              "Yes. Prefetch on the server with prefetchQuery and hand off to the client through HydrationBoundary. This is ideal for both SEO and TTI.",
          },
          {
            question: "How should I structure Query Keys?",
            answer:
              "Use arrays and include your dependencies: ['users'], ['users', userId], ['users', { status: 'active' }]. A consistent naming convention pays off as the project grows.",
          },
          {
            question: "Is it the same as TanStack Query?",
            answer:
              "Yes. React Query was generalized into a framework-agnostic family and renamed TanStack Query. The React build ships as @tanstack/react-query.",
          },
          {
            question: "What staleTime should I pick?",
            answer:
              "30–60 seconds is a good baseline for read-heavy apps. Lower it for fast-changing data; for near-immutable data you can even use Infinity.",
          },
        ],
      },
    },
  },
};
