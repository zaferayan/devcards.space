import type { Infographic } from "@/types";

export const reactQuery: Infographic = {
  id: "react-query",
  image: "/infographics/react-query.png",
  imageWidth: 1536,
  imageHeight: 1024,
  tags: ["React", "Frontend"],
  publishedAt: "2025-08-15",
  updatedAt: "2026-04-30",
  readingMinutes: 9,
  translations: {
    tr: {
      slug: "react-query-nedir",
      title: "React Query Nedir? Axios ve TypeScript ile Mutation Rehberi",
      description:
        "React Query (TanStack Query) ile Axios baseURL ayarı, login mutation, create user ve update user hook'larını TypeScript ile kurun.",
      imageAlt:
        "React Query infografik kartı: server state, cache, mutation ve TypeScript konularını özetleyen görsel",
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
          "React Query (TanStack Query), React uygulamalarında server state'i yönetmek için kullanılır. Gerçek projelerde bu yapı genelde Axios ile kurulan tek bir API client'ın üzerine oturur: login, create user ve update user gibi mutation hook'ları tek yerde yazılır; componentler sadece form state'i ve UI durumlarıyla ilgilenir.",
        sections: [
          {
            title: "React Query Nedir?",
            body: "React Query, API'den gelen veriyi cache'ler, yeniden doğrular ve mutation sonrası UI'ın güncel kalmasını kolaylaştırır. Client state yerine server state'e odaklanır; yani form input'u değil, API cevabı, loading/pending durumu, hata ve cache senkronizasyonu onun alanıdır.",
            bullets: [
              "Server state için cache ve yeniden doğrulama",
              "useQuery ile okuma, useMutation ile yazma",
              "Mutation sonrası invalidateQueries ile otomatik refetch",
              "TypeScript ile input ve response tiplerini uçtan uca koruma",
            ],
          },
          {
            title: "Kurulum",
            body: "React Query ve Axios'u birlikte kullanacağız. React Query server state'i, Axios ise HTTP client katmanını yönetecek.",
            code: {
              language: "bash",
              code: "npm install @tanstack/react-query axios",
            },
          },
          {
            title: "QueryClientProvider",
            body: "Uygulamanın cache'i paylaşabilmesi için QueryClient'ı root seviyesinde bir kez oluşturup provider ile sarmalayın.",
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
            title: "Axios BaseURL Ayarı",
            body: "Tek bir Axios instance oluşturmak tekrar eden baseURL, header ve token ayarlarını merkezileştirir. Hook'lar artık raw fetch veya dağınık axios çağrıları yerine bu api instance'ını kullanır.",
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
            body: "Input ve response tiplerini önce ayırmak hook'ları temiz tutar. Login farklı bir response döner; user create/update ise User modeli üzerinden ilerler.",
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
            body: "Login bir yazma işlemidir; bu yüzden useMutation ile modellenir. Başarılı olunca token'ı Axios instance'a ve localStorage'a yazabilir, kullanıcı bilgisini component tarafında kullanabilirsiniz.",
            code: {
              language: "tsx",
              filename: "features/auth/useLogin.ts",
              code: `import { useMutation } from "@tanstack/react-query";
import { api, setAuthToken } from "@/lib/api";
import type { LoginInput, LoginResponse } from "@/features/users/types";

export const useLogin = () => {
  return useMutation({
    mutationFn: (input: LoginInput) =>
      api.post<LoginResponse>("/auth/login", input).then(({ data }) => data),
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
            body: "Form submit içinde sonucu bekleyecekseniz mutateAsync'i .then/.catch ile zincirlemek daha okunaklıdır. Hata yakalama, başarı sonrası redirect veya toast gibi sıralı işleri tek akışta tutarsınız.",
            code: {
              language: "tsx",
              filename: "components/LoginForm.tsx",
              code: `"use client";

import { useRouter } from "next/navigation";
import { useLogin } from "@/features/auth/useLogin";

export function LoginForm() {
  const router = useRouter();
  const login = useLogin();

  function onSubmit(input: { email: string; password: string }) {
    login
      .mutateAsync(input)
      .then((session) => {
        router.push("/dashboard");
        console.log("Hoş geldin", session.user.name);
      })
      .catch(() => {
        console.log("Email veya şifre hatalı");
      });
  }

  return (
    <button
      disabled={login.isPending}
      onClick={() => onSubmit({ email: "ada@dev.com", password: "secret" })}
    >
      {login.isPending ? "Giriş yapılıyor..." : "Giriş yap"}
    </button>
  );
}`,
            },
          },
          {
            title: "User Query Key'leri",
            body: "Create ve update işlemlerinden sonra hangi cache'in yenileneceğini netleştirmek için query key'leri tek yerden üretin.",
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
            body: "Yeni kullanıcı oluşturulduğunda liste cache'ini invalidate etmek yeterlidir. Böylece listeyi elle set etmeye gerek kalmadan React Query güncel veriyi yeniden çeker.",
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
    mutationFn: (input: CreateUserInput) =>
      api.post<User>("/users", input).then(({ data }) => data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};`,
            },
          },
          {
            title: "Update User Mutation",
            body: "Update mutation'ı id ve input alır. Başarılı olunca hem detay cache'ini hem liste cache'ini invalidate ederek ekranda eski veri kalmasını engellersiniz.",
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
    mutationFn: ({ id, input }: UpdateUserVariables) =>
      api.patch<User>("/users/" + id, input).then(({ data }) => data),
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(user.id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};`,
            },
          },
          {
            title: "Formlarda Kullanımı",
            body: "Basit buton veya tek aksiyonlarda mutate yeterlidir. Submit akışı içinde sonuç beklemek, sayfa yönlendirmek veya toast göstermek istiyorsanız mutateAsync'i .then/.catch ile kullanın.",
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

updateUser
  .mutateAsync({
    id: "user_123",
    input: { role: "admin" },
  })
  .then((user) => {
    console.log("Güncellendi", user.name);
  });`,
            },
          },
          {
            title: "v5 Durum Flag'leri",
            body: "TanStack Query v5'te ilk bekleme durumu için isPending kullanın. isFetching aktif fetch'i, isError hata durumunu, mutation.isPending ise yazma işleminin devam ettiğini anlatır.",
            bullets: [
              "query.isPending — data henüz hazır değil",
              "query.isFetching — ilk yükleme veya arka plan refetch aktif",
              "mutation.isPending — POST/PATCH/DELETE işlemi devam ediyor",
              "mutation.isError — mutation hata ile sonuçlandı",
            ],
          },
          {
            title: "Özet",
            body: "React Query'yi gerçek projede okunaklı yapan şey, HTTP katmanını Axios instance'a; server state işlerini ise küçük custom hook'lara ayırmaktır. Login, create user ve update user gibi mutation'lar bu yapıda net, tipli ve tekrar kullanılabilir kalır.",
          },
        ],
        faq: [
          {
            question: "Login için useQuery mi useMutation mi?",
            answer:
              "useMutation. Login server'da yeni bir oturum/token üreten yazma işlemidir; cache'lenebilir bir okuma sorgusu gibi düşünülmemelidir.",
          },
          {
            question: "mutate mi mutateAsync mi kullanmalıyım?",
            answer:
              "Basit buton tıklaması için mutate yeterlidir. Form submit içinde sonuç bekleme, .then/.catch, redirect veya toast sıralaması gerekiyorsa mutateAsync daha uygundur.",
          },
          {
            question: "Token'ı nerede saklamalıyım?",
            answer:
              "Örnek sadelik için localStorage kullanıyor. Daha güvenli uygulamalarda httpOnly cookie tercih edilir; bu durumda Axios instance withCredentials ile ayarlanabilir.",
          },
          {
            question: "Create/update sonrası neden invalidateQueries var?",
            answer:
              "Mutation server'daki veriyi değiştirir. invalidateQueries ilgili cache'i stale işaretler ve React Query'nin güncel veriyi yeniden çekmesini sağlar.",
          },
          {
            question: "TanStack Query ile React Query aynı şey mi?",
            answer:
              "Evet. React Query, TanStack Query ailesine taşındı. React paketi @tanstack/react-query olarak kullanılır.",
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
    mutationFn: (input: LoginInput) =>
      api.post<LoginResponse>("/auth/login", input).then(({ data }) => data),
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
            body: "Use mutateAsync with .then/.catch when the submit flow needs to wait for a result. It keeps success redirects, toast messages and error handling in one promise chain.",
            code: {
              language: "tsx",
              filename: "components/LoginForm.tsx",
              code: `"use client";

import { useRouter } from "next/navigation";
import { useLogin } from "@/features/auth/useLogin";

export function LoginForm() {
  const router = useRouter();
  const login = useLogin();

  function onSubmit(input: { email: string; password: string }) {
    login
      .mutateAsync(input)
      .then((session) => {
        router.push("/dashboard");
        console.log("Welcome", session.user.name);
      })
      .catch(() => {
        console.log("Invalid email or password");
      });
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
    mutationFn: (input: CreateUserInput) =>
      api.post<User>("/users", input).then(({ data }) => data),
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
    mutationFn: ({ id, input }: UpdateUserVariables) =>
      api.patch<User>("/users/" + id, input).then(({ data }) => data),
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
            body: "For simple button actions, mutate is enough. For submit flows that need a result, redirects or toast sequencing, use mutateAsync with .then/.catch.",
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

updateUser
  .mutateAsync({
    id: "user_123",
    input: { role: "admin" },
  })
  .then((user) => {
    console.log("Updated", user.name);
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
              "Use mutate for simple button clicks. Use mutateAsync when a submit flow needs a result, .then/.catch handling, redirects or toast sequencing.",
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
