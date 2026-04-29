import type { Infographic } from "@/types";

export const jsonServer: Infographic = {
  id: "json-server",
  image: "/infographics/json-server.png",
  imageWidth: 1536,
  imageHeight: 1024,
  tags: ["Tools", "Backend"],
  publishedAt: "2025-09-02",
  updatedAt: "2026-04-28",
  readingMinutes: 7,
  translations: {
    tr: {
      slug: "json-server-kullanimi",
      title: "JSON Server Kullanımı: Saniyeler İçinde Sahte REST API",
      description:
        "JSON Server ile tek bir db.json dosyasından tam REST API'si üretin. Filtreleme, ilişkiler, sayfalama ve tüm CRUD endpointlerinin pratik rehberi.",
      imageAlt:
        "JSON Server infografiği: db.json dosyasından otomatik üretilen GET/POST/PUT/DELETE endpointleri, filtreleme ve ilişkilerle 12 bölümlü genel bakış",
      keywords: [
        "json server",
        "fake rest api",
        "mock api",
        "json server kurulum",
        "frontend prototip",
        "db.json",
        "rest api simülasyonu",
      ],
      content: {
        intro:
          "JSON Server, tek bir JSON dosyasından saniyeler içinde tam REST API üretebilen, frontend prototipleri ve demolar için tasarlanmış küçük ama güçlü bir araçtır. Backend hazır olmadan çalışmaya başlamak, mock servisler oluşturmak veya öğrenme/eğitim ortamı kurmak için en hızlı yoldur. Bu rehberde infografikteki tüm bölümleri açarak adım adım kurulumdan ileri kullanım senaryolarına kadar her şeyi anlatıyoruz.",
        sections: [
          {
            title: "JSON Server Nedir?",
            body: "JSON dosyalarından REST API üreten ve hızlı bir şekilde sahte servis ayağa kaldıran bir Node.js paketidir. Tek dosyalı bir veritabanı (db.json) ile çalışır; ön tarafa bakan tüm CRUD operasyonları otomatik üretilir. Backend kodu yazmadan prototip ve eğitim ortamları için idealdir.",
          },
          {
            title: "Neden JSON Server Kullanmalı?",
            body: "Bir projeyi başlatırken backend'in hazır olmaması frontend ekibinin hızını yavaşlatır. JSON Server bu gecikmeyi ortadan kaldırır ve UI'ı gerçek bir API'ye karşı geliştirme hissi verir.",
            bullets: [
              "Anında REST API başlatma — saniyeler içinde",
              "Veritabanı kurulumu yok — tek JSON dosyası yeterli",
              "Frontend gelişimini hızlandırır",
              "Demo ve eğitim ortamları için ideal",
              "Backend bağımlılığı olmadan çalışır",
            ],
          },
          {
            title: "Kurulum",
            body: "Global ya da proje bazlı kurabilirsiniz. Modern projelerde npm script üzerinden çalıştırmak en yaygın yaklaşımdır.",
            code: {
              language: "bash",
              code: `# Global
npm install -g json-server

# Çalışıyor mu kontrolü
npx json-server --version`,
            },
          },
          {
            title: "Veritabanı Dosyası Oluşturma",
            body: "JSON Server kök seviyede bir JSON nesnesi bekler. Her anahtar bir koleksiyon olarak ele alınır ve otomatik olarak /key adresinde erişilebilir hale gelir.",
            code: {
              language: "json",
              filename: "db.json",
              code: `{
  "posts": [
    { "id": 1, "title": "Hello", "views": 120 },
    { "id": 2, "title": "Mock API", "views": 87 }
  ],
  "comments": [
    { "id": 1, "postId": 1, "body": "Harika!" }
  ],
  "profile": { "name": "DevCards" }
}`,
            },
          },
          {
            title: "Sunucuyu Başlatma",
            body: "Aşağıdaki komut db.json dosyasını dinleyerek 3000 portunda bir API sunucusu açar. --port ile portu, --delay ile yapay gecikme ekleyebilirsiniz.",
            code: {
              language: "bash",
              code: `npx json-server --watch db.json --port 3001 --delay 250`,
            },
          },
          {
            title: "REST API Endpointleri",
            body: "Tüm fiilller otomatik üretilir; GET, POST, PUT, PATCH, DELETE doğrudan dosyaya yazar.",
            code: {
              language: "bash",
              code: `GET    /posts       → tüm post'lar
GET    /posts/1     → tek post
POST   /posts       → yeni post (id otomatik)
PUT    /posts/1     → tüm kaydı değiştir
PATCH  /posts/1     → kısmi güncelleme
DELETE /posts/1     → sil`,
            },
          },
          {
            title: "Sorgu Özellikleri",
            body: "Filtreleme, arama, sıralama ve sayfalama için zengin query parametreleri sunulur. Bu sayede gerçek bir API'ye çok yakın deneyim elde edilir.",
            code: {
              language: "bash",
              code: `# Filtreleme
GET /posts?views_gte=100

# Tam metin arama
GET /posts?q=hello

# Sıralama
GET /posts?_sort=views&_order=desc

# Sayfalama
GET /posts?_page=1&_limit=10`,
            },
          },
          {
            title: "İlişkiler (Relationships)",
            body: "Foreign key alanlarıyla embed ve expand desteği vardır. /posts/1/comments gibi nested route'lar otomatik çalışır.",
            code: {
              language: "bash",
              code: `# Bir post'un yorumları
GET /posts/1/comments

# Embed: post içindeki yorumları aynı anda al
GET /posts?_embed=comments

# Expand: yorumun içindeki post bilgisini al
GET /comments?_expand=post`,
            },
          },
          {
            title: "Temel Özellikler",
            body: "JSON Server tek başına epey yetenekli bir mock backend sunar:",
            bullets: [
              "Tam CRUD desteği",
              "Otomatik oluşturulan route'lar",
              "Custom middleware ile route ekleyebilme",
              "Watch modunda dosya değişince yeniden yüklenir",
              "Yapay gecikme (--delay) ile gerçekçi simülasyon",
              "CORS desteği etkin",
            ],
          },
          {
            title: "Kullanım Alanları",
            body: "JSON Server hangi senaryolarda işe yarar:",
            bullets: [
              "Frontend'i backend'den önce başlatmak",
              "API'lerin prototipini hızlıca test etmek",
              "Middleware'ler ve sahte verilerle demo hazırlamak",
              "Eğitim ve öğretim ortamları",
              "React Query gibi kütüphanelerle entegre çalıştırma",
            ],
          },
          {
            title: "Özet",
            body: "JSON Server; bir db.json dosyasını anında REST API'ye dönüştürür. Geliştirme süresini kısaltır, prototipler için mükemmeldir ve React Query gibi araçlarla sorunsuz çalışır. Üretim için tasarlanmış değildir; demo, prototip ve geliştirme amaçları için tercih edin.",
          },
        ],
        faq: [
          {
            question: "JSON Server production'da kullanılabilir mi?",
            answer:
              "Hayır. Eş zamanlı yazma korumaları, kimlik doğrulama, indeksleme veya ölçeklenebilirlik özellikleri yoktur. Production için Express, Fastify, NestJS veya Supabase/Firebase gibi BaaS hizmetlerini tercih edin.",
          },
          {
            question: "Kimlik doğrulama eklenebilir mi?",
            answer:
              "Evet, json-server-auth middleware'i ile JWT tabanlı auth ekleyebilir veya kendi Express middleware'inizi yazabilirsiniz. routes.json dosyasıyla ek özelleştirmeler de mümkün.",
          },
          {
            question: "Veriler nereye kaydediliyor?",
            answer:
              "Her POST/PUT/PATCH/DELETE doğrudan db.json dosyasına yazılır. Bu yüzden orijinal seed verisini ayrı bir dosyada (db.seed.json) tutmak iyi bir pratiktir.",
          },
          {
            question: "Gerçek backend'e geçince ne değişir?",
            answer:
              "fetch çağrılarınızı API client (axios, ky, ofetch) üzerinden ve baseURL ile yapıyorsanız, sadece environment variable'ı değiştirerek geçiş mümkündür. Endpoint sözleşmesini önceden tanımlamak temiz bir geçiş için en iyi yoldur.",
          },
          {
            question: "MSW ile farkı nedir?",
            answer:
              "MSW network'ü tarayıcı/test seviyesinde intercept eder; JSON Server gerçek bir HTTP sunucusudur. Mobil ve QA gibi farklı tüketicilerin de erişmesi gerekiyorsa JSON Server, sadece testler için MSW idealdir.",
          },
        ],
      },
    },
    en: {
      slug: "how-to-use-json-server",
      title: "How to Use JSON Server: Build a Fake REST API in Seconds",
      description:
        "Spin up a fully featured REST API from a single db.json file with JSON Server. Hands-on guide to filtering, relationships, pagination and full CRUD endpoints.",
      imageAlt:
        "JSON Server infographic: db.json automatically generates GET/POST/PUT/DELETE endpoints, plus filtering and relationships across 12 sections",
      keywords: [
        "json server",
        "fake rest api",
        "mock api",
        "json server setup",
        "frontend prototype",
        "db.json",
        "rest api mock",
      ],
      content: {
        intro:
          "JSON Server is a small but powerful tool that turns a single JSON file into a fully featured REST API in seconds — designed for frontend prototypes, demos and learning environments. It's the fastest way to start working before the backend exists, mock services or build training material. This guide expands every section of the infographic, taking you from setup to advanced patterns.",
        sections: [
          {
            title: "What is JSON Server?",
            body: "A Node.js package that creates a full REST API from a simple JSON file. It works with a single-file database (db.json) and auto-generates every CRUD endpoint your frontend needs — no backend code to write. It's ideal for prototyping, demos and teaching.",
          },
          {
            title: "Why Use JSON Server?",
            body: "When a project starts and the backend isn't ready, the frontend team is blocked. JSON Server removes that delay and lets you build the UI as if there were a real API.",
            bullets: [
              "Instant REST API setup — seconds",
              "No database needed — just a JSON file",
              "Speeds up frontend development",
              "Great for demos and training environments",
              "Works without any backend dependencies",
            ],
          },
          {
            title: "Installation",
            body: "Install globally or per-project. The most common modern approach is via an npm script.",
            code: {
              language: "bash",
              code: `# Global
npm install -g json-server

# Verify install
npx json-server --version`,
            },
          },
          {
            title: "Create a Database File",
            body: "JSON Server expects a JSON object at the root level. Each key becomes a collection that's automatically available at /key.",
            code: {
              language: "json",
              filename: "db.json",
              code: `{
  "posts": [
    { "id": 1, "title": "Hello", "views": 120 },
    { "id": 2, "title": "Mock API", "views": 87 }
  ],
  "comments": [
    { "id": 1, "postId": 1, "body": "Awesome!" }
  ],
  "profile": { "name": "DevCards" }
}`,
            },
          },
          {
            title: "Start the Server",
            body: "The command below watches db.json and starts an API on port 3001. Use --port to choose another port and --delay to simulate latency.",
            code: {
              language: "bash",
              code: `npx json-server --watch db.json --port 3001 --delay 250`,
            },
          },
          {
            title: "REST API Endpoints",
            body: "All verbs are auto-generated; GET, POST, PUT, PATCH, DELETE write directly to the file.",
            code: {
              language: "bash",
              code: `GET    /posts       → all posts
GET    /posts/1     → one post
POST   /posts       → create (id assigned)
PUT    /posts/1     → replace whole record
PATCH  /posts/1     → partial update
DELETE /posts/1     → delete`,
            },
          },
          {
            title: "Query Features",
            body: "Rich query parameters cover filtering, search, sort and pagination so you get an experience close to a real API.",
            code: {
              language: "bash",
              code: `# Filtering
GET /posts?views_gte=100

# Full-text search
GET /posts?q=hello

# Sort
GET /posts?_sort=views&_order=desc

# Paginate
GET /posts?_page=1&_limit=10`,
            },
          },
          {
            title: "Relationships",
            body: "Foreign-key fields support embed and expand. Nested routes like /posts/1/comments work out of the box.",
            code: {
              language: "bash",
              code: `# Comments of a post
GET /posts/1/comments

# Embed: include comments inside the post
GET /posts?_embed=comments

# Expand: include the parent post
GET /comments?_expand=post`,
            },
          },
          {
            title: "Key Features",
            body: "JSON Server alone gives you a remarkably capable mock backend:",
            bullets: [
              "Full CRUD support",
              "Auto-generated routes",
              "Custom routes via middleware",
              "Watch mode auto-reloads on file change",
              "Realistic latency simulation with --delay",
              "CORS enabled",
            ],
          },
          {
            title: "Use Cases",
            body: "Where JSON Server shines:",
            bullets: [
              "Starting the frontend before the backend",
              "Prototyping APIs quickly",
              "Building demos with middleware and seed data",
              "Teaching and training",
              "Pairing with libraries like React Query",
            ],
          },
          {
            title: "Summary",
            body: "JSON Server turns a db.json file into a working REST API instantly. It shortens development time, is great for prototypes and works seamlessly with libraries like React Query. It's not built for production — use it for demos, prototypes and development.",
          },
        ],
        faq: [
          {
            question: "Can I use JSON Server in production?",
            answer:
              "No. It has no concurrency-safe writes, authentication, indexing or scalability. For production, prefer Express, Fastify, NestJS or BaaS services like Supabase or Firebase.",
          },
          {
            question: "Can I add authentication?",
            answer:
              "Yes — middleware like json-server-auth lets you add JWT-based auth, or you can write your own Express middleware. routes.json offers further customization.",
          },
          {
            question: "Where is data stored?",
            answer:
              "Every POST/PUT/PATCH/DELETE writes directly to db.json. Keeping the original seed data in a separate file (db.seed.json) is a good practice.",
          },
          {
            question: "What changes when I switch to a real backend?",
            answer:
              "If your fetch calls go through an API client (axios, ky, ofetch) with a baseURL, switching is just an environment variable change. Defining the endpoint contract up front makes the migration clean.",
          },
          {
            question: "How does it compare with MSW?",
            answer:
              "MSW intercepts network calls in the browser/tests; JSON Server is a real HTTP server. If mobile or QA clients also need to hit the mock, JSON Server fits — for tests alone, MSW is ideal.",
          },
        ],
      },
    },
  },
};
