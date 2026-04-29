import type { Infographic } from "@/types";

export const reactQuery: Infographic = {
  id: "react-query",
  image: "/infographics/react-query.png",
  imageWidth: 1536,
  imageHeight: 1024,
  tags: ["React", "Frontend"],
  publishedAt: "2025-08-15",
  updatedAt: "2026-04-29",
  readingMinutes: 9,
  translations: {
    tr: {
      slug: "react-query-nedir",
      title: "React Query Nedir? Axios ve TypeScript ile Mutation Rehberi",
      description:
        "React Query (TanStack Query) ile Axios baseURL ayari, login mutation, create user ve update user hook'larini TypeScript ile kurun.",
      imageAlt:
        "React Query infografik karti: server state, cache, mutation ve TypeScript konularini ozetleyen gorsel",
      keywords: [
        "react query",
        "tanstack query",
        "useMutation",
        "mutateAsync",
        "axios react query",
        "login mutation",
        "typescript mutation",
      ],
      content: {
        intro:
          "React Query (TanStack Query), React uygulamalarinda server state'i yonetmek icin kullanilir. Gercek projelerde bu yapi genelde Axios ile kurulan tek bir API client'in uzerine oturur: login, create user ve update user gibi mutation hook'lari tek yerde yazilir; componentler sadece form state'i ve UI durumlariyla ilgilenir.",
        sections: [
          {
            title: "React Query Nedir?",
            body: "React Query, API'den gelen veriyi cache'ler, yeniden dogrular ve mutation sonrasi UI'in guncel kalmasini kolaylastirir. Client state yerine server state'e odaklanir; yani form input'u degil, API cevabi, loading/pending durumu, hata ve cache senkronizasyonu onun alanidir.",
            bullets: [
              "Server state icin cache ve yeniden dogrulama",
              "useQuery ile okuma, useMutation ile yazma",
              "Mutation sonrasi invalidateQueries ile otomatik refetch",
              "TypeScript ile input ve response tiplerini uctan uca koruma",
            ],
          },
          {
            title: "Kurulum",
            body: "React Query ve Axios'u birlikte kullanacagiz. React Query server state'i, Axios ise HTTP client katmanini yonetecek.",
            code: {
              language: "bash",
              code: "npm install @tanstack/react-query axios",
            },
          },
          {
            title: "QueryClientProvider",
            body: "Uygulamanin cache'i paylasabilmesi icin QueryClient'i root seviyesinde bir kez olusturup provider ile sarmalayin.",
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
            title: "Axios BaseURL Ayari",
            body: "Tek bir Axios instance olusturmak tekrar eden baseURL, header ve token ayarlarini merkezilestirir. Hook'lar artik raw fetch veya daginik axios cagirilari yerine bu api instance'ini kullanir.",
            code: {
              language: "ts",
              filename: "lib/api.ts",
              code: `import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.zaferayan.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export function setAuthToken(token?: string) {
  if (token) {
    api.defaults.headers.common.Authorization = "Bearer " + token;
    return;
  }

  delete api.defaults.headers.common.Authorization;
}`,
            },
          },
          {
            title: "Ortak TypeScript Tipleri",
            body: "Input ve response tiplerini once ayirmak hook'lari temiz tutar. Login farkli bir response doner; user create/update ise User modeli uzerinden ilerler.",
            code: {
              language: "ts",
              filename: "features/users/types.ts",
              code: `export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
};

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};

export type CreateUserInput = {
  name: string;
  email: string;
  role: User["role"];
};

export type UpdateUserInput = Partial<CreateUserInput>;`,
            },
          },
          {
            title: "Login Mutation",
            body: "Login bir yazma islemidir; bu yuzden useMutation ile modellenir. Basarili olunca token'i Axios instance'a ve localStorage'a yazabilir, kullanici bilgisini component tarafinda kullanabilirsiniz.",
            code: {
              language: "tsx",
              filename: "features/auth/useLogin.ts",
              code: `import { useMutation } from "@tanstack/react-query";
import { api, setAuthToken } from "@/lib/api";
import type { LoginInput, LoginResponse } from "@/features/users/types";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const { data } = await api.post<LoginResponse>("/auth/login", input);
      return data;
    },
    onSuccess: (data) => {
      setAuthToken(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
    },
  });
};`,
            },
          },
          {
            title: "Login Formunda mutateAsync",
            body: "Form submit icinde sonuc bekleyecekseniz mutateAsync daha okunaklidir. try/catch ile hatayi yakalar, basari sonrasi redirect veya toast gibi sirali isleri rahatca yaparsiniz.",
            code: {
              language: "tsx",
              filename: "components/LoginForm.tsx",
              code: `"use client";

import { useRouter } from "next/navigation";
import { useLogin } from "@/features/auth/useLogin";

export function LoginForm() {
  const router = useRouter();
  const login = useLogin();

  async function onSubmit(input: { email: string; password: string }) {
    try {
      const session = await login.mutateAsync(input);
      router.push("/dashboard");
      console.log("Hos geldin", session.user.name);
    } catch {
      console.log("Email veya sifre hatali");
    }
  }

  return (
    <button
      disabled={login.isPending}
      onClick={() => onSubmit({ email: "ada@dev.com", password: "secret" })}
    >
      {login.isPending ? "Giris yapiliyor..." : "Giris yap"}
    </button>
  );
}`,
            },
          },
          {
            title: "User Query Key'leri",
            body: "Create ve update islemlerinden sonra hangi cache'in yenilenecegini netlestirmek icin query key'leri tek yerden uretin.",
            code: {
              language: "ts",
              filename: "features/users/queryKeys.ts",
              code: `export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  detail: (id: string) => [...userKeys.all, "detail", id] as const,
};`,
            },
          },
          {
            title: "Create User Mutation",
            body: "Yeni kullanici olusturuldugunda liste cache'ini invalidate etmek yeterlidir. Boylece listeyi elle set etmeye gerek kalmadan React Query guncel veriyi yeniden ceker.",
            code: {
              language: "tsx",
              filename: "features/users/useCreateUser.ts",
              code: `import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { userKeys } from "./queryKeys";
import type { CreateUserInput, User } from "./types";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateUserInput) => {
      const { data } = await api.post<User>("/users", input);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};`,
            },
          },
          {
            title: "Update User Mutation",
            body: "Update mutation'i id ve input alir. Basarili olunca hem detay cache'ini hem liste cache'ini invalidate ederek ekranda eski veri kalmasini engellersiniz.",
            code: {
              language: "tsx",
              filename: "features/users/useUpdateUser.ts",
              code: `import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { userKeys } from "./queryKeys";
import type { UpdateUserInput, User } from "./types";

type UpdateUserVariables = {
  id: string;
  input: UpdateUserInput;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: UpdateUserVariables) => {
      const { data } = await api.patch<User>("/users/" + id, input);
      return data;
    },
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(user.id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};`,
            },
          },
          {
            title: "Formlarda Kullanimi",
            body: "Basit buton veya tek aksiyonlarda mutate yeterlidir. Submit akisi icinde sonuc beklemek, sayfa yonlendirmek veya toast gostermek istiyorsaniz mutateAsync kullanin.",
            code: {
              language: "tsx",
              filename: "components/UserActions.tsx",
              code: `const createUser = useCreateUser();
const updateUser = useUpdateUser();

createUser.mutate({
  name: "Ada Lovelace",
  email: "ada@dev.com",
  role: "editor",
});

await updateUser.mutateAsync({
  id: "user_123",
  input: { role: "admin" },
});`,
            },
          },
          {
            title: "v5 Durum Flag'leri",
            body: "TanStack Query v5'te ilk bekleme durumu icin isPending kullanin. isFetching aktif fetch'i, isError hata durumunu, mutation.isPending ise yazma isleminin devam ettigini anlatir.",
            bullets: [
              "query.isPending — data henuz hazir degil",
              "query.isFetching — ilk yukleme veya arka plan refetch aktif",
              "mutation.isPending — POST/PATCH/DELETE islemi devam ediyor",
              "mutation.isError — mutation hata ile sonuclandi",
            ],
          },
          {
            title: "Ozet",
            body: "React Query'yi gercek projede okunakli yapan sey, HTTP katmanini Axios instance'a; server state islerini ise kucuk custom hook'lara ayirmaktir. Login, create user ve update user gibi mutation'lar bu yapida net, tipli ve tekrar kullanilabilir kalir.",
          },
        ],
        faq: [
          {
            question: "Login icin useQuery mi useMutation mi?",
            answer:
              "useMutation. Login server'da yeni bir oturum/token ureten yazma islemidir; cache'lenebilir bir okuma sorgusu gibi dusunulmemelidir.",
          },
          {
            question: "mutate mi mutateAsync mi kullanmaliyim?",
            answer:
              "Basit button click icin mutate yeterlidir. Form submit icinde await, try/catch, redirect veya toast siralamasi gerekiyorsa mutateAsync daha uygundur.",
          },
          {
            question: "Token'i nerede saklamaliyim?",
            answer:
              "Ornek sadelik icin localStorage kullaniyor. Daha guvenli uygulamalarda httpOnly cookie tercih edilir; bu durumda Axios instance withCredentials ile ayarlanabilir.",
          },
          {
            question: "Create/update sonrasi neden invalidateQueries var?",
            answer:
              "Mutation server'daki veriyi degistirir. invalidateQueries ilgili cache'i stale isaretler ve React Query'nin guncel veriyi yeniden cekmesini saglar.",
          },
          {
            question: "TanStack Query ile React Query ayni sey mi?",
            answer:
              "Evet. React Query, TanStack Query ailesine tasindi. React paketi @tanstack/react-query olarak kullanilir.",
          },
        ],
      },
    },
    en: {
      slug: "what-is-react-query",
      title: "What is React Query? Mutation Guide with Axios and TypeScript",
      description:
        "Use React Query (TanStack Query) with an Axios baseURL, login mutation, create user and update user hooks in TypeScript.",
      imageAlt:
        "React Query infographic card summarizing server state, cache, mutations and TypeScript",
      keywords: [
        "react query",
        "tanstack query",
        "useMutation",
        "mutateAsync",
        "axios react query",
        "login mutation",
        "typescript mutation",
      ],
      content: {
        intro:
          "React Query (TanStack Query) manages server state in React applications. In real projects it usually sits on top of a single Axios API client: login, create user and update user mutations live in reusable hooks, while components focus on form state and UI.",
        sections: [
          {
            title: "What is React Query?",
            body: "React Query caches API data, revalidates it and keeps the UI fresh after mutations. It focuses on server state: API responses, pending states, errors and cache synchronization, not local form inputs.",
            bullets: [
              "Cache and revalidation for server state",
              "useQuery for reads, useMutation for writes",
              "invalidateQueries after mutations",
              "End-to-end TypeScript types for input and response models",
            ],
          },
          {
            title: "Installation",
            body: "We will use React Query and Axios together. React Query manages server state; Axios manages the HTTP client layer.",
            code: {
              language: "bash",
              code: "npm install @tanstack/react-query axios",
            },
          },
          {
            title: "QueryClientProvider",
            body: "Create a single QueryClient at the root so the whole app can share the same cache.",
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
            title: "Axios BaseURL Setup",
            body: "A single Axios instance centralizes baseURL, headers and token configuration. Hooks can use this api instance instead of scattered fetch or axios calls.",
            code: {
              language: "ts",
              filename: "lib/api.ts",
              code: `import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.zaferayan.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export function setAuthToken(token?: string) {
  if (token) {
    api.defaults.headers.common.Authorization = "Bearer " + token;
    return;
  }

  delete api.defaults.headers.common.Authorization;
}`,
            },
          },
          {
            title: "Shared TypeScript Types",
            body: "Define input and response types up front to keep mutation hooks readable. Login returns an auth response; create and update operations work with the User model.",
            code: {
              language: "ts",
              filename: "features/users/types.ts",
              code: `export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
};

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};

export type CreateUserInput = {
  name: string;
  email: string;
  role: User["role"];
};

export type UpdateUserInput = Partial<CreateUserInput>;`,
            },
          },
          {
            title: "Login Mutation",
            body: "Login is a write operation, so model it with useMutation. On success you can attach the token to the Axios instance and store it for later requests.",
            code: {
              language: "tsx",
              filename: "features/auth/useLogin.ts",
              code: `import { useMutation } from "@tanstack/react-query";
import { api, setAuthToken } from "@/lib/api";
import type { LoginInput, LoginResponse } from "@/features/users/types";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const { data } = await api.post<LoginResponse>("/auth/login", input);
      return data;
    },
    onSuccess: (data) => {
      setAuthToken(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
    },
  });
};`,
            },
          },
          {
            title: "mutateAsync in a Login Form",
            body: "Use mutateAsync when the submit flow needs to await a result. It works nicely with try/catch, redirects and toast messages.",
            code: {
              language: "tsx",
              filename: "components/LoginForm.tsx",
              code: `"use client";

import { useRouter } from "next/navigation";
import { useLogin } from "@/features/auth/useLogin";

export function LoginForm() {
  const router = useRouter();
  const login = useLogin();

  async function onSubmit(input: { email: string; password: string }) {
    try {
      const session = await login.mutateAsync(input);
      router.push("/dashboard");
      console.log("Welcome", session.user.name);
    } catch {
      console.log("Invalid email or password");
    }
  }

  return (
    <button
      disabled={login.isPending}
      onClick={() => onSubmit({ email: "ada@dev.com", password: "secret" })}
    >
      {login.isPending ? "Signing in..." : "Sign in"}
    </button>
  );
}`,
            },
          },
          {
            title: "User Query Keys",
            body: "Create and update mutations need to know which cache entries should be refreshed. Generate query keys from one place.",
            code: {
              language: "ts",
              filename: "features/users/queryKeys.ts",
              code: `export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  detail: (id: string) => [...userKeys.all, "detail", id] as const,
};`,
            },
          },
          {
            title: "Create User Mutation",
            body: "After creating a user, invalidate the list cache. React Query will refetch fresh data without manual list management.",
            code: {
              language: "tsx",
              filename: "features/users/useCreateUser.ts",
              code: `import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { userKeys } from "./queryKeys";
import type { CreateUserInput, User } from "./types";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateUserInput) => {
      const { data } = await api.post<User>("/users", input);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};`,
            },
          },
          {
            title: "Update User Mutation",
            body: "The update mutation receives an id and an input payload. On success, invalidate both the detail cache and the list cache so stale data does not remain on screen.",
            code: {
              language: "tsx",
              filename: "features/users/useUpdateUser.ts",
              code: `import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { userKeys } from "./queryKeys";
import type { UpdateUserInput, User } from "./types";

type UpdateUserVariables = {
  id: string;
  input: UpdateUserInput;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: UpdateUserVariables) => {
      const { data } = await api.patch<User>("/users/" + id, input);
      return data;
    },
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(user.id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};`,
            },
          },
          {
            title: "Using Them in Forms",
            body: "For simple button actions, mutate is enough. For submit flows that need awaits, redirects or toast sequencing, use mutateAsync.",
            code: {
              language: "tsx",
              filename: "components/UserActions.tsx",
              code: `const createUser = useCreateUser();
const updateUser = useUpdateUser();

createUser.mutate({
  name: "Ada Lovelace",
  email: "ada@dev.com",
  role: "editor",
});

await updateUser.mutateAsync({
  id: "user_123",
  input: { role: "admin" },
});`,
            },
          },
          {
            title: "v5 Status Flags",
            body: "In TanStack Query v5, use isPending for the initial waiting state. isFetching means an active fetch is happening, isError means the operation failed, and mutation.isPending means a write is still running.",
            bullets: [
              "query.isPending — data is not ready yet",
              "query.isFetching — initial load or background refetch is active",
              "mutation.isPending — POST/PATCH/DELETE is running",
              "mutation.isError — mutation finished with an error",
            ],
          },
          {
            title: "Summary",
            body: "React Query becomes much easier to read when the HTTP layer lives in an Axios instance and server-state work lives in small custom hooks. Login, create user and update user mutations stay typed, reusable and easy to call from forms.",
          },
        ],
        faq: [
          {
            question: "Should login use useQuery or useMutation?",
            answer:
              "useMutation. Login creates a new session/token on the server, so it is a write operation rather than a cacheable read query.",
          },
          {
            question: "Should I use mutate or mutateAsync?",
            answer:
              "Use mutate for simple button clicks. Use mutateAsync when a submit flow needs await, try/catch, redirects or toast sequencing.",
          },
          {
            question: "Where should I store the token?",
            answer:
              "The example uses localStorage for simplicity. More secure apps often use httpOnly cookies; with that setup, configure Axios with withCredentials.",
          },
          {
            question: "Why invalidateQueries after create/update?",
            answer:
              "A mutation changes server data. invalidateQueries marks the related cache as stale and lets React Query fetch fresh data.",
          },
          {
            question: "Is TanStack Query the same as React Query?",
            answer:
              "Yes. React Query moved into the TanStack Query family. The React package is @tanstack/react-query.",
          },
        ],
      },
    },
  },
};
