import type { Infographic } from "@/types";

export const axios: Infographic = {
  id: "axios",
  image: "/infographics/axios.png",
  imageWidth: 1586,
  imageHeight: 992,
  tags: ["Frontend", "Tools"],
  publishedAt: "2026-04-28",
  updatedAt: "2026-04-29",
  readingMinutes: 9,
  translations: {
    tr: {
      slug: "axios-nedir",
      title: "Axios Nedir? Modern Uygulamalar için Pratik HTTP İstemcisi",
      description:
        "Axios ile fetch'ten daha güçlü, Promise-based HTTP istekleri yapın. Interceptor, instance, hata yönetimi ve query params kullanım rehberi.",
      imageAlt:
        "Axios infografiği: GET, POST, instance, interceptor ve hata yönetimi başlıklarını gösteren 12 bölümlü genel bakış",
      keywords: [
        "axios",
        "axios nedir",
        "http istemcisi",
        "axios interceptor",
        "axios instance",
        "fetch alternatifi",
        "react axios",
      ],
      content: {
        intro:
          "Axios, tarayıcı ve Node.js'te çalışabilen, Promise tabanlı, yıllardır endüstri standardı bir HTTP istemcisidir. fetch'in eksik bıraktığı yerleri dolduran otomatik JSON dönüşümü, request/response interceptor'ları, instance yapısı ve gelişmiş hata yönetimi özellikleriyle modern uygulamalara hız kazandırır. Bu rehberde Axios'u sıfırdan kurup gerçek senaryolarda nasıl yapılandırıldığını adım adım anlatıyoruz.",
        sections: [
          {
            title: "Axios Nedir?",
            body: "Promise tabanlı, hem tarayıcı hem Node.js ortamlarında çalışan bir HTTP istemcisidir. fetch ile karşılaştırıldığında otomatik JSON parse, GET/POST/PUT/DELETE gibi kısayollar ve daha güçlü bir hata yönetimi sunar. Modern uygulamaların API katmanı için en yaygın seçimlerdendir.",
            bullets: [
              "Promise tabanlı — async/await uyumlu",
              "Tarayıcı + Node.js'te tek API",
              "Otomatik JSON dönüşümü",
              "REST API'lerle iyi çalışır",
            ],
          },
          {
            title: "Neden Axios Kullanmalı?",
            body: "fetch standart, ancak büyüyen projelerde tekrar eden konfigürasyon ihtiyacı doğar. Axios bu konfigürasyonu instance ve interceptor üzerinden merkezîleştirir.",
            bullets: [
              "Daha temiz syntax — kısa ve okunaklı",
              "Otomatik JSON parse",
              "Request/response interceptor'ları",
              "Built-in timeout yönetimi",
              "REST API'lerle harika uyum",
            ],
          },
          {
            title: "Kurulum",
            body: "Tek komut ile projenize ekleyebilirsiniz; runtime bağımlılığı olarak kurulur.",
            code: {
              language: "bash",
              code: `npm install axios`,
            },
          },
          {
            title: "Temel GET İsteği",
            body: "axios.get tek bir Promise döndürür; response.data alanı doğrudan parse edilmiş veriyi içerir.",
            code: {
              language: "ts",
              filename: "api/users.ts",
              code: `import axios from "axios";

const fetchUsers = async () => {
  const res = await axios.get("/api/users");
  return res.data;
};`,
            },
          },
          {
            title: "POST İsteği",
            body: "İkinci parametre body'dir; Axios objeyi otomatik JSON'a çevirir ve uygun Content-Type başlığını ekler.",
            code: {
              language: "ts",
              filename: "api/users.ts",
              code: `await axios.post("/api/users", {
  name: "Ada",
  email: "ada@dev.com",
});`,
            },
          },
          {
            title: "TypeScript ile GET",
            body: "Axios generic tip alabilir. Böylece response.data alanı any yerine beklediğiniz model olarak gelir ve component tarafında autocomplete/type-safety kazanırsınız.",
            code: {
              language: "ts",
              filename: "api/users.ts",
              code: `import axios from "axios";

type User = {
  id: string;
  name: string;
  email: string;
};

export async function getUsers() {
  const res = await axios.get<User[]>("/api/users");
  return res.data;
}

const users = await getUsers();
users[0].email; // string`,
            },
          },
          {
            title: "TypeScript ile POST",
            body: "Request body ve response modelini ayrı tipleyin. Özellikle form, auth ve create/update akışlarında hatalı alan adlarını erken yakalamak için çok değerlidir.",
            code: {
              language: "ts",
              filename: "api/users.ts",
              code: `import { api } from "@/lib/api";

type CreateUserInput = {
  name: string;
  email: string;
};

type User = CreateUserInput & {
  id: string;
};

export async function createUser(input: CreateUserInput) {
  const res = await api.post<User>("/users", input);
  return res.data;
}

await createUser({
  name: "Ada",
  email: "ada@dev.com",
});`,
            },
          },
          {
            title: "Axios Instance (ÖNEMLİ)",
            body: "Tekrar eden ayarları bir instance'a toplayın: baseURL, timeout, ortak başlıklar. Tüm uygulamadan aynı instance'ı kullanmak yapılandırma karmaşasını ortadan kaldırır.",
            code: {
              language: "ts",
              filename: "lib/api.ts",
              code: `import axios from "axios";

export const api = axios.create({
  baseURL: "https://example.com/api",
  timeout: 5000,
  headers: { Accept: "application/json" },
});

api.get("/users");`,
            },
          },
          {
            title: "Tipli API Katmanı",
            body: "Projede raw axios çağrılarını component içine yaymak yerine küçük, tipli fonksiyonlar yazın. Bu yapı React Query, Zustand veya server actions ile daha rahat birleşir.",
            code: {
              language: "ts",
              filename: "services/users.ts",
              code: `import { api } from "@/lib/api";

type ApiResponse<T> = {
  data: T;
  message?: string;
};

type User = {
  id: string;
  name: string;
  role: "admin" | "editor" | "viewer";
};

export async function getUser(id: string) {
  const res = await api.get<ApiResponse<User>>(\`/users/\${id}\`);
  return res.data.data;
}`,
            },
          },
          {
            title: "Interceptor'lar",
            body: "İstek/yanıt akışına global olarak müdahale etmek için interceptor kullanılır. Token eklemek, hataları merkezî yakalamak veya logging yapmak için idealdir.",
            code: {
              language: "ts",
              filename: "lib/api.ts",
              code: `api.interceptors.request.use((config) => {
  config.headers.Authorization = \`Bearer \${getToken()}\`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);`,
            },
          },
          {
            title: "Hata Yönetimi",
            body: "fetch'ten farklı olarak Axios, 4xx/5xx kodlarında otomatik olarak Promise'ı reject eder. try/catch ile yakalayıp error.response üzerinden detaylara erişirsiniz.",
            code: {
              language: "ts",
              code: `type ApiError = {
  message: string;
  code?: string;
};

try {
  const res = await api.get("/users");
} catch (err) {
  if (axios.isAxiosError<ApiError>(err)) {
    console.log(err.response?.status, err.response?.data);
  }
}`,
            },
          },
          {
            title: "Request Config",
            body: "Tek bir istek için ayarları override edebilirsiniz: headers, timeout, params, withCredentials gibi alanlar config objesinde geçilir.",
            code: {
              language: "ts",
              code: `await api.get("/users", {
  headers: { "X-Trace-Id": "abc" },
  timeout: 2000,
  withCredentials: true,
});`,
            },
          },
          {
            title: "Query Params",
            body: "params alanı objeyi alır ve URL'ye ?key=value formatında ekler. Karmaşık nesneler için özel paramsSerializer da kullanılabilir.",
            code: {
              language: "ts",
              code: `await api.get("/posts", {
  params: { page: 1, limit: 10 },
});
// → /posts?page=1&limit=10`,
            },
          },
          {
            title: "Kullanım Alanları",
            body: "Axios'un tipik kullanım senaryoları:",
            bullets: [
              "REST API tüketimi",
              "Authentication akışları (token interceptor)",
              "TypeScript ile tipli API servisleri",
              "Modern frontend frameworkleriyle",
              "React Query gibi kütüphanelerle birlikte",
            ],
          },
          {
            title: "Özet",
            body: "Axios; HTTP isteklerini sadeleştiren, güçlü ve esnek bir kütüphanedir. fetch'e göre temizleyici syntax, daha güvenilir hata yönetimi ve geniş ölçeklenebilirlik sunar. Küçük scriptlerden enterprise uygulamalara kadar her ölçekte çalışır ve modern JavaScript ekosisteminin go-to HTTP istemcisidir.",
          },
        ],
        faq: [
          {
            question: "Axios mı, fetch mi?",
            answer:
              "fetch yerleşik bir API; Axios ek özellikler getirir. Küçük projelerde fetch yeterli olabilir; ancak interceptor, instance ve daha temiz hata yönetimi gerektiğinde Axios önemli avantaj sağlar.",
          },
          {
            question: "Axios bundle boyutu ne kadar?",
            answer:
              "Yaklaşık ~13kB gzip. Modern build araçları tree-shaking yaptığında etki minimaldır. Performans için kritik bir mobil uygulamada fetch tercih edilebilir, çoğu web uygulaması için bu boyut önemsizdir.",
          },
          {
            question: "Axios SSR ile çalışır mı?",
            answer:
              "Evet — Node.js'te de aynı API ile çalışır. Next.js gibi framework'lerde server tarafında veri çekmek için kullanılabilir. Cookie tabanlı auth için withCredentials veya custom header'lar yapılandırılır.",
          },
          {
            question: "Token refresh nasıl yapılır?",
            answer:
              "Response interceptor içinde 401 yakalanıp refresh endpoint'ine istek atılır, ardından orijinal istek yeni token'la tekrar gönderilir. Bekleyen istekleri kuyruklamak için küçük bir state objesi gerekir.",
          },
          {
            question: "Axios + React Query birlikte mi kullanılır?",
            answer:
              "Evet, çok yaygın bir kalıptır. Axios HTTP katmanını, React Query cache/state katmanını yönetir. queryFn içinde axios.get çağırarak ikisinin avantajlarını birleştirebilirsiniz.",
          },
        ],
      },
    },
    en: {
      slug: "what-is-axios",
      title: "What is Axios? A Practical HTTP Client for Modern Apps",
      description:
        "Make HTTP requests with Axios — a Promise-based client more powerful than fetch. Walkthrough covers instances, interceptors, error handling and query params.",
      imageAlt:
        "Axios infographic showing GET, POST, instance, interceptor and error handling across 12 sections",
      keywords: [
        "axios",
        "what is axios",
        "http client",
        "axios interceptor",
        "axios instance",
        "fetch alternative",
        "react axios",
      ],
      content: {
        intro:
          "Axios is a Promise-based HTTP client that runs in both the browser and Node.js — for years the industry standard. It fills in fetch's gaps with automatic JSON parsing, request/response interceptors, an instance pattern and richer error handling, making the API layer of modern apps faster to ship. This guide walks through how to install Axios and configure it in real-world scenarios.",
        sections: [
          {
            title: "What is Axios?",
            body: "A Promise-based HTTP client that works in both the browser and Node.js. Compared to fetch it adds automatic JSON parsing, shortcuts for GET/POST/PUT/DELETE and a more robust error model. It's one of the most popular choices for an app's API layer.",
            bullets: [
              "Promise-based — async/await friendly",
              "Single API for browser + Node.js",
              "Automatic JSON conversion",
              "Plays nicely with REST APIs",
            ],
          },
          {
            title: "Why Use Axios?",
            body: "fetch is standard, but as projects grow you end up repeating configuration. Axios centralizes that configuration through instances and interceptors.",
            bullets: [
              "Cleaner syntax — short and readable",
              "Automatic JSON parsing",
              "Request/response interceptors",
              "Built-in timeout management",
              "Great fit for REST APIs",
            ],
          },
          {
            title: "Installation",
            body: "Add it with one command as a runtime dependency.",
            code: {
              language: "bash",
              code: `npm install axios`,
            },
          },
          {
            title: "Basic GET Request",
            body: "axios.get returns a single Promise; response.data already contains parsed data.",
            code: {
              language: "ts",
              filename: "api/users.ts",
              code: `import axios from "axios";

const fetchUsers = async () => {
  const res = await axios.get("/api/users");
  return res.data;
};`,
            },
          },
          {
            title: "POST Request",
            body: "The second argument is the body; Axios serializes the object to JSON and sets the right Content-Type header.",
            code: {
              language: "ts",
              filename: "api/users.ts",
              code: `await axios.post("/api/users", {
  name: "Ada",
  email: "ada@dev.com",
});`,
            },
          },
          {
            title: "GET with TypeScript",
            body: "Axios accepts generic types. That makes response.data the model you expect instead of any, giving your components autocomplete and type safety.",
            code: {
              language: "ts",
              filename: "api/users.ts",
              code: `import axios from "axios";

type User = {
  id: string;
  name: string;
  email: string;
};

export async function getUsers() {
  const res = await axios.get<User[]>("/api/users");
  return res.data;
}

const users = await getUsers();
users[0].email; // string`,
            },
          },
          {
            title: "POST with TypeScript",
            body: "Type the request body and response model separately. This is especially useful for forms, auth flows and create/update screens where field names drift easily.",
            code: {
              language: "ts",
              filename: "api/users.ts",
              code: `import { api } from "@/lib/api";

type CreateUserInput = {
  name: string;
  email: string;
};

type User = CreateUserInput & {
  id: string;
};

export async function createUser(input: CreateUserInput) {
  const res = await api.post<User>("/users", input);
  return res.data;
}

await createUser({
  name: "Ada",
  email: "ada@dev.com",
});`,
            },
          },
          {
            title: "Axios Instance (IMPORTANT)",
            body: "Collect repeated settings into an instance: baseURL, timeout, common headers. Using a single instance everywhere removes configuration drift.",
            code: {
              language: "ts",
              filename: "lib/api.ts",
              code: `import axios from "axios";

export const api = axios.create({
  baseURL: "https://example.com/api",
  timeout: 5000,
  headers: { Accept: "application/json" },
});

api.get("/users");`,
            },
          },
          {
            title: "Typed API Layer",
            body: "Instead of spreading raw axios calls across components, write small typed functions. This shape plugs cleanly into React Query, Zustand or server actions.",
            code: {
              language: "ts",
              filename: "services/users.ts",
              code: `import { api } from "@/lib/api";

type ApiResponse<T> = {
  data: T;
  message?: string;
};

type User = {
  id: string;
  name: string;
  role: "admin" | "editor" | "viewer";
};

export async function getUser(id: string) {
  const res = await api.get<ApiResponse<User>>(\`/users/\${id}\`);
  return res.data.data;
}`,
            },
          },
          {
            title: "Interceptors",
            body: "Use interceptors to globally hook into the request/response lifecycle. They're perfect for attaching tokens, central error handling and logging.",
            code: {
              language: "ts",
              filename: "lib/api.ts",
              code: `api.interceptors.request.use((config) => {
  config.headers.Authorization = \`Bearer \${getToken()}\`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);`,
            },
          },
          {
            title: "Error Handling",
            body: "Unlike fetch, Axios automatically rejects on 4xx/5xx codes. Catch with try/catch and inspect error.response for details.",
            code: {
              language: "ts",
              code: `type ApiError = {
  message: string;
  code?: string;
};

try {
  const res = await api.get("/users");
} catch (err) {
  if (axios.isAxiosError<ApiError>(err)) {
    console.log(err.response?.status, err.response?.data);
  }
}`,
            },
          },
          {
            title: "Request Config",
            body: "You can override settings on a per-request basis: headers, timeout, params, withCredentials and more.",
            code: {
              language: "ts",
              code: `await api.get("/users", {
  headers: { "X-Trace-Id": "abc" },
  timeout: 2000,
  withCredentials: true,
});`,
            },
          },
          {
            title: "Query Params",
            body: "The params field accepts an object and appends ?key=value to the URL. For complex shapes you can supply a paramsSerializer.",
            code: {
              language: "ts",
              code: `await api.get("/posts", {
  params: { page: 1, limit: 10 },
});
// → /posts?page=1&limit=10`,
            },
          },
          {
            title: "Use Cases",
            body: "Where Axios shines:",
            bullets: [
              "Consuming REST APIs",
              "Authentication flows (token interceptor)",
              "Typed API services with TypeScript",
              "Modern frontend frameworks",
              "Working alongside React Query",
            ],
          },
          {
            title: "Summary",
            body: "Axios is a strong, flexible library that simplifies HTTP requests. Compared to fetch it offers cleaner syntax, more reliable error handling and better scalability. From small scripts to enterprise apps, it remains the go-to HTTP client of the modern JavaScript ecosystem.",
          },
        ],
        faq: [
          {
            question: "Axios or fetch?",
            answer:
              "fetch is built-in; Axios adds extras. For tiny projects fetch is enough — but when you need interceptors, instances and cleaner error handling, Axios pulls ahead.",
          },
          {
            question: "How big is Axios?",
            answer:
              "Roughly ~13kB gzip. With tree-shaking the impact is minimal. For performance-critical mobile work fetch may be preferable; for most web apps it's negligible.",
          },
          {
            question: "Does Axios work with SSR?",
            answer:
              "Yes — same API on Node.js. In frameworks like Next.js you can use it for server-side data fetching. For cookie-based auth, configure withCredentials or pass custom headers.",
          },
          {
            question: "How do I do token refresh?",
            answer:
              "Catch 401s in the response interceptor, call your refresh endpoint, then retry the original request with the new token. A small state object queues pending requests during refresh.",
          },
          {
            question: "Can I use Axios with React Query?",
            answer:
              "Yes — that's a common pattern. Axios handles the HTTP layer; React Query handles cache/state. Just call axios.get inside your queryFn.",
          },
        ],
      },
    },
  },
};
