import type { Infographic } from "@/types";

export const reactQuery: Infographic = {
  id: "react-query",
  image: "/infographics/react-query.png",
  imageWidth: 1536,
  imageHeight: 1024,
  tags: ["React", "Frontend"],
  publishedAt: "2025-08-15",
  updatedAt: "2026-04-29",
  readingMinutes: 16,
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
              "Gereksiz useEffect / pending state kodlarını siler",
            ],
          },
          {
            title: "Neden React Query Kullanmalı?",
            body: "Manuel fetch kodları büyüdükçe pending, error, retry, deduplication ve refetch yönetimi karmaşıklaşır. React Query bu kalıpları sıfır yapılandırma ile çözer ve uygulamanın hem hızını hem geliştirici deneyimini artırır.",
            bullets: [
              "Otomatik cache ve istek tekilleştirme (deduplication)",
              "Arka planda yeniden çekme ve senkronizasyon",
              "Built-in pending, error ve success durumları",
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
            body: "useQuery; queryKey ve queryFn parametrelerini alır, geri dönüş değerini sizin tip tanımınıza göre çıkarsar. TanStack Query v5'te ilk yükleme durumu için temel flag isPending'dir; TypeScript ile birleşince data, error ve isPending tamamen tip-güvenli olur.",
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
  const { data, isPending, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isPending) return <p>Yükleniyor…</p>;
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

type CreateUserInput = {
  name: string;
  email: string;
};

async function createUser(input: CreateUserInput) {
  const res = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(input),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Kullanıcı oluşturulamadı");
  return res.json();
}

export function CreateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (input: CreateUserInput) => createUser(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ name: "Ada", email: "ada@example.com" })}>
      Kullanıcı ekle
    </button>
  );
}`,
            },
          },
          {
            title: "Custom useQuery Hook'u",
            body: "İlk refactor genelde useQuery kodunu componentten çıkarıp küçük bir hook'a taşımaktır. Böylece component sadece UI ile ilgilenir; veri çekme, cache anahtarı ve tazelik ayarı tek yerde kalır.",
            code: {
              language: "tsx",
              filename: "hooks/useUsers.ts",
              code: `import { useQuery } from "@tanstack/react-query";

type User = {
  id: number;
  name: string;
  email: string;
};

async function fetchUsers(): Promise<User[]> {
  const res = await fetch("/api/users");

  if (!res.ok) {
    throw new Error("Kullanıcılar alınamadı");
  }

  return res.json() as Promise<User[]>;
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60,
  });
}

// Component içinde
const { data: users = [], isPending, isError } = useUsers();`,
            },
          },
          {
            title: "Custom useMutation Hook'u",
            body: "Mutation tarafında da aynı yaklaşım geçerlidir. createUser fonksiyonunu ve cache invalidation mantığını useCreateUser içine taşırsanız form componentleri daha sade ve tekrar kullanılabilir olur.",
            code: {
              language: "tsx",
              filename: "hooks/useCreateUser.ts",
              code: `import { useMutation, useQueryClient } from "@tanstack/react-query";

type User = {
  id: number;
  name: string;
  email: string;
};

type CreateUserInput = Pick<User, "name" | "email">;

async function createUser(input: CreateUserInput): Promise<User> {
  const res = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(input),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Kullanıcı oluşturulamadı");
  }

  return res.json() as Promise<User>;
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateUserInput) => createUser(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

// Component içinde
const createUserMutation = useCreateUser();
createUserMutation.mutate({ name: "Ada", email: "ada@example.com" });`,
            },
          },
          {
            title: "TypeScript için Query Key Factory",
            body: "Custom hook yazarken ilk adım query key'leri tek yerden üretmektir. Böylece liste, detay ve filtreli sorgular aynı isimlendirme standardını kullanır; invalidation ve optimistic update kodları da tip-güvenli kalır.",
            code: {
              language: "tsx",
              filename: "features/users/queryKeys.ts",
              code: `export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: UserFilters) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

export type UserFilters = {
  search?: string;
  role?: "admin" | "editor" | "viewer";
};`,
            },
          },
          {
            title: "Tipli API Katmanı",
            body: "Hook'ları temiz tutmak için fetch kodlarını küçük ve tipli API fonksiyonlarına ayırın. React Query bu fonksiyonların Promise dönüş tipini okuyarak data tipini otomatik çıkarır.",
            code: {
              language: "tsx",
              filename: "features/users/api.ts",
              code: `import type { UserFilters } from "./queryKeys";

export type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
};

export type CreateUserInput = Pick<User, "name" | "email" | "role">;
export type UpdateUserInput = Partial<CreateUserInput>;

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);

  if (!res.ok) {
    throw new Error("Request failed");
  }

  return res.json() as Promise<T>;
}

export function getUsers(filters: UserFilters = {}) {
  const search = new URLSearchParams();
  if (filters.search) search.set("search", filters.search);
  if (filters.role) search.set("role", filters.role);

  return request<User[]>(\`/api/users?\${search.toString()}\`);
}

export function getUser(id: number) {
  return request<User>(\`/api/users/\${id}\`);
}

export function createUser(input: CreateUserInput) {
  return request<User>("/api/users", {
    method: "POST",
    body: JSON.stringify(input),
    headers: { "Content-Type": "application/json" },
  });
}

export function updateUser(id: number, input: UpdateUserInput) {
  return request<User>(\`/api/users/\${id}\`, {
    method: "PATCH",
    body: JSON.stringify(input),
    headers: { "Content-Type": "application/json" },
  });
}`,
            },
          },
          {
            title: "Liste Hook'u: useUsers",
            body: "Filtre alan bir liste hook'u hem query key'i hem query function'ı tek yerde toplar. keepPreviousData ile filtre değişirken eski listeyi ekranda tutabilir, staleTime ile gereksiz istekleri azaltabilirsiniz.",
            code: {
              language: "tsx",
              filename: "features/users/hooks.ts",
              code: `import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers, type UserFilters } from "./api";
import { userKeys } from "./queryKeys";

export function useUsers(filters: UserFilters = {}) {
  return useQuery({
    queryKey: userKeys.list(filters),
    queryFn: () => getUsers(filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
}`,
            },
          },
          {
            title: "Detay Hook'u: useUser",
            body: "Detay sayfalarında id gelmeden sorguyu çalıştırmamak için enabled kullanın. initialData ile listede zaten bulunan kullanıcıyı detay cache'ine başlangıç verisi olarak taşıyabilirsiniz.",
            code: {
              language: "tsx",
              filename: "features/users/hooks.ts",
              code: `import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, type User } from "./api";
import { userKeys } from "./queryKeys";

export function useUser(id?: number) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: id ? userKeys.detail(id) : userKeys.details(),
    queryFn: () => getUser(id as number),
    enabled: typeof id === "number",
    initialData: () => {
      const users = queryClient.getQueriesData<User[]>({
        queryKey: userKeys.lists(),
      });

      return users
        .flatMap(([, data]) => data ?? [])
        .find((user) => user.id === id);
    },
  });
}`,
            },
          },
          {
            title: "Mutation Hook'u: useCreateUser",
            body: "Yazma işlemlerini de custom hook'a taşımak componentleri sadeleştirir. mutationFn input tipi CreateUserInput olur; onSuccess tarafında liste query'lerini invalidate ederek UI'ın güncel kalmasını sağlarsınız.",
            code: {
              language: "tsx",
              filename: "features/users/hooks.ts",
              code: `import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, type CreateUserInput } from "./api";
import { userKeys } from "./queryKeys";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateUserInput) => createUser(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}`,
            },
          },
          {
            title: "Optimistic Update: useUpdateUser",
            body: "Kullanıcı güncelleme gibi işlemlerde optimistic update ile UI'ı server cevabını beklemeden güncelleyebilirsiniz. onMutate eski cache'i saklar, hata olursa rollback yapar, işlem bitince ilgili query'leri yeniden doğrular.",
            code: {
              language: "tsx",
              filename: "features/users/hooks.ts",
              code: `import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser, type UpdateUserInput, type User } from "./api";
import { userKeys } from "./queryKeys";

type UpdateUserVariables = {
  id: number;
  input: UpdateUserInput;
};

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: UpdateUserVariables) => updateUser(id, input),
    onMutate: async ({ id, input }) => {
      await queryClient.cancelQueries({ queryKey: userKeys.detail(id) });

      const previousUser = queryClient.getQueryData<User>(userKeys.detail(id));

      queryClient.setQueryData<User>(userKeys.detail(id), (current) =>
        current ? { ...current, ...input } : current
      );

      return { previousUser };
    },
    onError: (_error, variables, context) => {
      queryClient.setQueryData(userKeys.detail(variables.id), context?.previousUser);
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}`,
            },
          },
          {
            title: "Component İçinde Kullanım",
            body: "Custom hook yapısı kurulduktan sonra component sadece UI durumlarıyla ilgilenir. data, mutate, isPending ve error alanları TypeScript tarafından doğru tiplerle gelir.",
            code: {
              language: "tsx",
              filename: "components/UserList.tsx",
              code: `export function UserList() {
  const users = useUsers({ role: "editor" });
  const createUser = useCreateUser();

  if (users.isPending) return <p>Yükleniyor...</p>;
  if (users.isError) return <p>{users.error.message}</p>;

  return (
    <>
      <button
        disabled={createUser.isPending}
        onClick={() =>
          createUser.mutate({
            name: "Ada Lovelace",
            email: "ada@example.com",
            role: "editor",
          })
        }
      >
        Kullanıcı ekle
      </button>

      <ul>
        {users.data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}`,
            },
          },
          {
            title: "v5 Durum Flag'leri",
            body: "TanStack Query v5'te status: 'loading' yerine status: 'pending' kullanılır. isPending verinin henüz hazır olmadığı ilk durumu anlatır; isFetching arka plan dahil aktif fetch'i, isLoading ise isPending && isFetching türetilmiş durumunu temsil eder.",
            code: {
              language: "tsx",
              filename: "components/UsersStatus.tsx",
              code: `const users = useUsers();

if (users.isPending) return <p>Yükleniyor...</p>;
if (users.isError) return <p>{users.error.message}</p>;

return (
  <>
    {users.isFetching && <span>Güncelleniyor...</span>}
    <UserTable users={users.data} />
  </>
);`,
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
              "isPending & isError — UI durumları için hazır flag'ler",
              "isFetching — ilk yükleme ve arka plan refetch sırasında aktif olur",
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
              "Removes excessive useEffect / pending-state code",
            ],
          },
          {
            title: "Why Use React Query?",
            body: "As manual fetch code grows, the management of pending, error, retry, deduplication and refetch states becomes complex. React Query solves these patterns with zero configuration and improves both performance and developer experience.",
            bullets: [
              "Automatic caching and request deduplication",
              "Background refetch and synchronization",
              "Built-in pending, error and success states",
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
            body: "useQuery takes queryKey and queryFn parameters and infers the return type from your typing. In TanStack Query v5, isPending is the primary flag for the initial no-data state; combined with TypeScript, data, error and isPending become fully type-safe.",
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
  const { data, isPending, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isPending) return <p>Loading…</p>;
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

type CreateUserInput = {
  name: string;
  email: string;
};

async function createUser(input: CreateUserInput) {
  const res = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(input),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Could not create user");
  return res.json();
}

export function CreateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (input: CreateUserInput) => createUser(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ name: "Ada", email: "ada@example.com" })}>
      Add user
    </button>
  );
}`,
            },
          },
          {
            title: "Custom useQuery Hook",
            body: "The first refactor is usually moving useQuery out of the component and into a small hook. The component can then focus on UI while data fetching, cache identity and freshness settings live in one place.",
            code: {
              language: "tsx",
              filename: "hooks/useUsers.ts",
              code: `import { useQuery } from "@tanstack/react-query";

type User = {
  id: number;
  name: string;
  email: string;
};

async function fetchUsers(): Promise<User[]> {
  const res = await fetch("/api/users");

  if (!res.ok) {
    throw new Error("Could not fetch users");
  }

  return res.json() as Promise<User[]>;
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60,
  });
}

// Inside a component
const { data: users = [], isPending, isError } = useUsers();`,
            },
          },
          {
            title: "Custom useMutation Hook",
            body: "The same pattern applies to mutations. Move createUser and cache invalidation into useCreateUser, and your form components become smaller and easier to reuse.",
            code: {
              language: "tsx",
              filename: "hooks/useCreateUser.ts",
              code: `import { useMutation, useQueryClient } from "@tanstack/react-query";

type User = {
  id: number;
  name: string;
  email: string;
};

type CreateUserInput = Pick<User, "name" | "email">;

async function createUser(input: CreateUserInput): Promise<User> {
  const res = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(input),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Could not create user");
  }

  return res.json() as Promise<User>;
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateUserInput) => createUser(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

// Inside a component
const createUserMutation = useCreateUser();
createUserMutation.mutate({ name: "Ada", email: "ada@example.com" });`,
            },
          },
          {
            title: "Query Key Factory for TypeScript",
            body: "The first step in a custom hook setup is generating query keys from one place. Lists, details and filtered queries then share the same naming convention, while invalidation and optimistic updates stay type-safe.",
            code: {
              language: "tsx",
              filename: "features/users/queryKeys.ts",
              code: `export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: UserFilters) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

export type UserFilters = {
  search?: string;
  role?: "admin" | "editor" | "viewer";
};`,
            },
          },
          {
            title: "Typed API Layer",
            body: "Keep hooks clean by moving fetch code into small typed API functions. React Query reads the Promise return type from those functions and infers the data type automatically.",
            code: {
              language: "tsx",
              filename: "features/users/api.ts",
              code: `import type { UserFilters } from "./queryKeys";

export type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
};

export type CreateUserInput = Pick<User, "name" | "email" | "role">;
export type UpdateUserInput = Partial<CreateUserInput>;

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);

  if (!res.ok) {
    throw new Error("Request failed");
  }

  return res.json() as Promise<T>;
}

export function getUsers(filters: UserFilters = {}) {
  const search = new URLSearchParams();
  if (filters.search) search.set("search", filters.search);
  if (filters.role) search.set("role", filters.role);

  return request<User[]>(\`/api/users?\${search.toString()}\`);
}

export function getUser(id: number) {
  return request<User>(\`/api/users/\${id}\`);
}

export function createUser(input: CreateUserInput) {
  return request<User>("/api/users", {
    method: "POST",
    body: JSON.stringify(input),
    headers: { "Content-Type": "application/json" },
  });
}

export function updateUser(id: number, input: UpdateUserInput) {
  return request<User>(\`/api/users/\${id}\`, {
    method: "PATCH",
    body: JSON.stringify(input),
    headers: { "Content-Type": "application/json" },
  });
}`,
            },
          },
          {
            title: "List Hook: useUsers",
            body: "A list hook that accepts filters keeps both the query key and the query function in one place. keepPreviousData keeps the old list on screen while filters change, and staleTime reduces unnecessary requests.",
            code: {
              language: "tsx",
              filename: "features/users/hooks.ts",
              code: `import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers, type UserFilters } from "./api";
import { userKeys } from "./queryKeys";

export function useUsers(filters: UserFilters = {}) {
  return useQuery({
    queryKey: userKeys.list(filters),
    queryFn: () => getUsers(filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
}`,
            },
          },
          {
            title: "Detail Hook: useUser",
            body: "For detail pages, use enabled so the query does not run before an id exists. With initialData, you can seed the detail cache from any user already present in list caches.",
            code: {
              language: "tsx",
              filename: "features/users/hooks.ts",
              code: `import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, type User } from "./api";
import { userKeys } from "./queryKeys";

export function useUser(id?: number) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: id ? userKeys.detail(id) : userKeys.details(),
    queryFn: () => getUser(id as number),
    enabled: typeof id === "number",
    initialData: () => {
      const users = queryClient.getQueriesData<User[]>({
        queryKey: userKeys.lists(),
      });

      return users
        .flatMap(([, data]) => data ?? [])
        .find((user) => user.id === id);
    },
  });
}`,
            },
          },
          {
            title: "Mutation Hook: useCreateUser",
            body: "Moving write operations into custom hooks keeps components focused. mutationFn receives CreateUserInput, and onSuccess invalidates list queries so the UI stays fresh.",
            code: {
              language: "tsx",
              filename: "features/users/hooks.ts",
              code: `import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, type CreateUserInput } from "./api";
import { userKeys } from "./queryKeys";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateUserInput) => createUser(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}`,
            },
          },
          {
            title: "Optimistic Update: useUpdateUser",
            body: "For user updates, optimistic updates let the UI change before the server responds. onMutate stores the old cache, onError rolls back if needed, and onSettled revalidates the affected queries.",
            code: {
              language: "tsx",
              filename: "features/users/hooks.ts",
              code: `import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser, type UpdateUserInput, type User } from "./api";
import { userKeys } from "./queryKeys";

type UpdateUserVariables = {
  id: number;
  input: UpdateUserInput;
};

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: UpdateUserVariables) => updateUser(id, input),
    onMutate: async ({ id, input }) => {
      await queryClient.cancelQueries({ queryKey: userKeys.detail(id) });

      const previousUser = queryClient.getQueryData<User>(userKeys.detail(id));

      queryClient.setQueryData<User>(userKeys.detail(id), (current) =>
        current ? { ...current, ...input } : current
      );

      return { previousUser };
    },
    onError: (_error, variables, context) => {
      queryClient.setQueryData(userKeys.detail(variables.id), context?.previousUser);
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}`,
            },
          },
          {
            title: "Using the Hooks in a Component",
            body: "Once the custom hook structure is in place, the component only deals with UI states. TypeScript gives you correctly typed data, mutate, isPending and error fields.",
            code: {
              language: "tsx",
              filename: "components/UserList.tsx",
              code: `export function UserList() {
  const users = useUsers({ role: "editor" });
  const createUser = useCreateUser();

  if (users.isPending) return <p>Loading...</p>;
  if (users.isError) return <p>{users.error.message}</p>;

  return (
    <>
      <button
        disabled={createUser.isPending}
        onClick={() =>
          createUser.mutate({
            name: "Ada Lovelace",
            email: "ada@example.com",
            role: "editor",
          })
        }
      >
        Add user
      </button>

      <ul>
        {users.data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}`,
            },
          },
          {
            title: "v5 Status Flags",
            body: "In TanStack Query v5, status: 'loading' became status: 'pending'. isPending describes the initial no-data state; isFetching covers any active fetch including background refetches, and isLoading is the derived isPending && isFetching state.",
            code: {
              language: "tsx",
              filename: "components/UsersStatus.tsx",
              code: `const users = useUsers();

if (users.isPending) return <p>Loading...</p>;
if (users.isError) return <p>{users.error.message}</p>;

return (
  <>
    {users.isFetching && <span>Updating...</span>}
    <UserTable users={users.data} />
  </>
);`,
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
              "isPending & isError — ready-to-use UI flags",
              "isFetching — active during initial loads and background refetches",
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
