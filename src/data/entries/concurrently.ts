import type { Infographic } from "@/types";

export const concurrently: Infographic = {
  id: "concurrently",
  image: "/infographics/concurrently.png",
  imageWidth: 1586,
  imageHeight: 992,
  tags: ["Tools", "DevOps"],
  publishedAt: "2025-10-10",
  updatedAt: "2026-04-28",
  readingMinutes: 6,
  translations: {
    tr: {
      slug: "concurrently-nedir",
      title: "Concurrently Nedir? Aynı Anda Birden Fazla Komut Çalıştırma",
      description:
        "Concurrently ile npm script'lerini paralel çalıştırın. Renkli loglar, etiketler, --kill-others ve glob desteğiyle full-stack geliştirme akışını tek terminale toplayın.",
      imageAlt:
        "Concurrently infografiği: tek komutun frontend, backend ve mock servisleri paralel çalıştırdığını ve renkli etiketli logları gösteren 12 bölümlü genel bakış",
      keywords: [
        "concurrently",
        "npm script paralel",
        "tek komut",
        "monorepo",
        "package.json scripts",
        "developer experience",
        "kill-others",
      ],
      content: {
        intro:
          "Concurrently, birden fazla npm script'ini ya da shell komutunu aynı terminalde paralel çalıştıran küçük ama vazgeçilmez bir CLI aracıdır. Frontend, backend ve mock servisleri ayrı terminallerde tutmak yerine tek komutla başlatabilir, etiketli ve renkli logları sayesinde hangi sürecin ne yaptığını net görebilirsiniz. Bu rehberde infografikteki 12 bölümü açarak temel kullanımdan kill-others ve glob pattern'lere kadar her detayı anlatıyoruz.",
        sections: [
          {
            title: "Concurrently Nedir?",
            body: "Birden fazla shell komutunu paralel çalıştırmanızı sağlayan Node.js tabanlı bir CLI aracıdır. Frontend ve backend, watcher ve test gibi farklı süreçleri tek terminalde takip etmek için tasarlanmıştır.",
          },
          {
            title: "Neden Kullanmalı?",
            body: "Modern projelerde aynı anda birden fazla süreç çalıştırmak çok yaygındır: dev server, mock API, type checker, watcher… Concurrently bu süreçleri tek komutla başlatır ve onboarding'i kolaylaştırır.",
            bullets: [
              "Tek komutla N tane süreç başlatma",
              "Renkli ve etiketli loglar — hangi log nereden belli",
              "Geliştirme döneminde zaman tasarrufu",
              "Fullstack ve mikroservis akışları için ideal",
              "Geliştirici deneyimini sadeleştirir",
            ],
          },
          {
            title: "Kurulum",
            body: "Tek satırla projenize ekleyebilirsiniz; genelde dev dependency olarak kurulur.",
            code: {
              language: "bash",
              code: `npm install -D concurrently

# veya
npm install -g concurrently --version`,
            },
          },
          {
            title: "Temel Kullanım",
            body: "Birden fazla komutu tırnak içinde concurrently'ye geçirmeniz yeterli; her biri paralel başlar.",
            code: {
              language: "bash",
              code: `npx concurrently "npm run dev" "npm run api"`,
            },
          },
          {
            title: "package.json Örneği",
            body: "En yaygın kullanım, kök dev script'in concurrently ile alt komutları başlatmasıdır.",
            code: {
              language: "json",
              filename: "package.json",
              code: `{
  "scripts": {
    "dev": "concurrently \\"npm run client\\" \\"npm run server\\"",
    "client": "vite",
    "server": "node db.json --port 3001"
  }
}`,
            },
          },
          {
            title: "Çıktı Davranışı",
            body: "Concurrently'nin loglarını okumayı kolaylaştıran detaylar:",
            bullets: [
              "Tüm komutlar paralel çalışır",
              "Loglar etiketli ve renkli olarak ortak terminale yazılır",
              "exit code'lar ana process'e yansıtılır — CI'da güvenli",
              "Süreçler kolayca takip edilir",
            ],
          },
          {
            title: "Sık Kullanılan Seçenekler",
            body: "En çok ihtiyaç duyulan bayraklar ve ne işe yaradıkları:",
            code: {
              language: "bash",
              code: `--names           Komutlara isim verir
--prefix-colors   Etiket renklerini ayarlar
--kill-others     Biri ölünce hepsini kapat
--restart-tries   Başarısız komutu yeniden dener
--group           Çıktıları gruplandırır`,
            },
          },
          {
            title: "Seçeneklerle Örnek",
            body: "İsim, renk ve kill-others'ı bir arada kullandığınızda terminal çıktınız çok daha okunabilir hale gelir.",
            code: {
              language: "bash",
              code: `npx concurrently \\
  -n CLIENT,API \\
  --prefix-colors "cyan.bold,magenta" \\
  --kill-others \\
  "npm run client" \\
  "npm run api"`,
            },
          },
          {
            title: "Sıralı Mod",
            body: "Komutları sırayla çalıştırmak için --sequential bayrağı vardır. Bu, paralel olmaktan ziyade adım adım build/test gibi senaryolar için kullanılır.",
            code: {
              language: "bash",
              code: `npx concurrently --sequential \\
  "npm run build" \\
  "npm run start"`,
            },
          },
          {
            title: "Kullanım Alanları",
            body: "Concurrently'nin gerçek hayatta hayat kurtardığı senaryolar:",
            bullets: [
              "Frontend + API server'ı birlikte çalıştırma",
              "Fullstack geliştirme akışları",
              "Mikroservis geliştirme ortamları",
              "Watcher (lint + test) aynı anda",
              "Docker ya da yerel dev orkestrasyonu",
            ],
          },
          {
            title: "İpuçları",
            body: "Daha temiz bir setup için:",
            bullets: [
              "Komutları kısa ve okunabilir tutun",
              "Güvenli kapanış için --kill-others kullanın",
              "Vite ve JSON Server gibi araçlarla mükemmel uyumludur",
              "Glob pattern: \"npm:dev:*\" ile dev: ile başlayan tüm script'leri otomatik dahil edin",
            ],
          },
          {
            title: "Özet",
            body: "Concurrently, birden fazla komutun yönetimini sadeleştirir, geliştirici akışını hızlandırır ve modern fullstack iş akışları için neredeyse zorunlu bir araçtır. Hafif, hızlı ve kullanımı çok kolaydır — ekibinizin onboarding'ini iyileştirir.",
          },
        ],
        faq: [
          {
            question: "Concurrently ile npm-run-all farkı nedir?",
            answer:
              "İkisi de paralel script çalıştırır; ancak npm-run-all uzun süredir bakımsız, concurrently aktif geliştirilmektedir. Renk/etiket seçenekleri ve kill-others gibi gelişmiş özellikleriyle yeni projelerde concurrently tercih edilir.",
          },
          {
            question: "CI'da kullanmak güvenli mi?",
            answer:
              "Evet — özellikle --kill-others-on-fail bayrağıyla. Süreçlerden biri başarısız olduğunda diğerleri durur ve gereksiz CI dakikası harcanmaz; exit code'lar doğru forward edilir.",
          },
          {
            question: "Windows'ta düzgün çalışıyor mu?",
            answer:
              "Evet; cross-platform çalışır. && veya & gibi shell operatörlerinden kaçının, bunun yerine concurrently'nin tırnaklı sözdizimini kullanın — POSIX ve Windows shell'lerinde aynı davranış garantili.",
          },
          {
            question: "Sırayla çalıştırma için ne kullanmalıyım?",
            answer:
              "concurrently --sequential bayrağını kullanın veya doğrudan && operatörü ile zincirleyin. Karmaşık monorepo akışları için Turborepo veya Nx daha iyi olabilir.",
          },
          {
            question: "Glob desteği var mı?",
            answer:
              "Evet. \"npm:dev:*\" yazarak dev: ile başlayan tüm script'leri otomatik dahil edebilirsiniz; bu, yeni servis eklediğinizde root script'i değiştirmek zorunda kalmamanızı sağlar.",
          },
        ],
      },
    },
    en: {
      slug: "what-is-concurrently",
      title: "What is Concurrently? Run Multiple Commands at the Same Time",
      description:
        "Run npm scripts in parallel with Concurrently. Colored logs, named labels, --kill-others and glob support — collapse your full-stack dev flow into a single terminal.",
      imageAlt:
        "Concurrently infographic: a single command launches frontend, backend and mock services in parallel with colored, labeled logs across 12 sections",
      keywords: [
        "concurrently",
        "parallel npm scripts",
        "single command",
        "monorepo",
        "package.json scripts",
        "developer experience",
        "kill-others",
      ],
      content: {
        intro:
          "Concurrently is a small but indispensable CLI tool that runs multiple npm scripts or shell commands in parallel inside the same terminal. Instead of juggling separate terminals for frontend, backend and mock services, you start everything with one command and read clearly labeled, colored logs to see exactly what each process is doing. This guide walks through all 12 sections of the infographic, from basic usage to kill-others and glob patterns.",
        sections: [
          {
            title: "What is Concurrently?",
            body: "A Node.js-based CLI tool that lets you run multiple shell commands in parallel. It's built to keep dev server, mock API, type checker and watcher visible inside a single terminal.",
          },
          {
            title: "Why Use It?",
            body: "Modern projects routinely run several processes at once. Concurrently launches them all with one command and makes onboarding easier for new team members.",
            bullets: [
              "Start N processes with a single command",
              "Colored, labeled logs — clear which line came from where",
              "Saves time during development",
              "Great for fullstack and microservice setups",
              "Simplifies developer experience",
            ],
          },
          {
            title: "Installation",
            body: "Add it with one line; usually as a dev dependency.",
            code: {
              language: "bash",
              code: `npm install -D concurrently

# or
npm install -g concurrently --version`,
            },
          },
          {
            title: "Basic Usage",
            body: "Pass quoted commands to concurrently and they all start in parallel.",
            code: {
              language: "bash",
              code: `npx concurrently "npm run dev" "npm run api"`,
            },
          },
          {
            title: "package.json Example",
            body: "The most common pattern: a root dev script that fans out to sub-scripts via concurrently.",
            code: {
              language: "json",
              filename: "package.json",
              code: `{
  "scripts": {
    "dev": "concurrently \\"npm run client\\" \\"npm run server\\"",
    "client": "vite",
    "server": "node db.json --port 3001"
  }
}`,
            },
          },
          {
            title: "Output Behavior",
            body: "Details that make Concurrently's output easy to read:",
            bullets: [
              "All commands run in parallel",
              "Logs go to a shared terminal with labels and colors",
              "Exit codes propagate to the parent process — safe in CI",
              "Easy to track multiple microprocesses",
            ],
          },
          {
            title: "Common Options",
            body: "The flags you'll reach for most often:",
            code: {
              language: "bash",
              code: `--names           Assign names to commands
--prefix-colors   Set custom colors for logs
--kill-others     Stop all if one fails
--restart-tries   Retry failed processes
--group           Group output together`,
            },
          },
          {
            title: "Example with Options",
            body: "Combining names, colors and kill-others gives you a much more readable terminal.",
            code: {
              language: "bash",
              code: `npx concurrently \\
  -n CLIENT,API \\
  --prefix-colors "cyan.bold,magenta" \\
  --kill-others \\
  "npm run client" \\
  "npm run api"`,
            },
          },
          {
            title: "Sequential Mode",
            body: "Use --sequential to run commands one after another. This is for step-by-step build/start flows rather than truly parallel work.",
            code: {
              language: "bash",
              code: `npx concurrently --sequential \\
  "npm run build" \\
  "npm run start"`,
            },
          },
          {
            title: "Use Cases",
            body: "Real-world scenarios where Concurrently saves the day:",
            bullets: [
              "Running frontend + API server together",
              "Fullstack development setups",
              "Microfrontend development",
              "Running watchers (lint + test) at the same time",
              "Docker or local dev orchestration",
            ],
          },
          {
            title: "Tips",
            body: "For a cleaner setup:",
            bullets: [
              "Keep scripts short and readable",
              "Use --kill-others for safer shutdowns",
              "Combines great with tools like Vite and JSON Server",
              "Glob pattern: \"npm:dev:*\" matches every dev: script automatically",
            ],
          },
          {
            title: "Summary",
            body: "Concurrently simplifies running multiple commands, improves terminal organization and is essential for modern dev workflows. It's lightweight, fast and easy to use — and noticeably improves team onboarding.",
          },
        ],
        faq: [
          {
            question: "How is it different from npm-run-all?",
            answer:
              "Both run scripts in parallel, but npm-run-all has been unmaintained for a while; concurrently is actively developed and offers richer color/label options and advanced features like kill-others. For new projects, prefer concurrently.",
          },
          {
            question: "Is it safe to use in CI?",
            answer:
              "Yes — especially with --kill-others-on-fail. When one process fails the others stop, you don't burn extra CI minutes, and exit codes propagate correctly.",
          },
          {
            question: "Does it work on Windows?",
            answer:
              "Yes, it's cross-platform. Avoid shell operators like && or & inside scripts; use concurrently's quoted syntax instead — that guarantees the same behavior on POSIX and Windows shells.",
          },
          {
            question: "How do I run things sequentially?",
            answer:
              "Pass --sequential or chain commands with &&. For complex monorepo workflows, Turborepo or Nx may be a better fit.",
          },
          {
            question: "Is there glob support?",
            answer:
              "Yes. \"npm:dev:*\" matches every script that starts with dev:, so you don't have to update the root script every time you add a new service.",
          },
        ],
      },
    },
  },
};
