import type { Infographic } from "@/types";

export const zod: Infographic = {
  id: "zod",
  image: "/infographics/zod.png",
  imageWidth: 1586,
  imageHeight: 992,
  tags: ["Frontend", "Tools"],
  publishedAt: "2026-04-29",
  updatedAt: "2026-04-29",
  readingMinutes: 8,
  translations: {
    tr: {
      slug: "zod-nedir",
      title: "Zod Nedir? Modern Uygulamalar için Tip-Güvenli Validation",
      description:
        "Zod ile TypeScript tipinden runtime validation üretin. Schema tanımlama, parse, safeParse, type inference ve React Hook Form entegrasyonu.",
      imageAlt:
        "Zod infografiği: TypeScript-first schema validation, parse/safeParse, type inference ve React Hook Form ile kullanımını gösteren genel bakış",
      keywords: [
        "zod",
        "zod nedir",
        "schema validation",
        "typescript validation",
        "z.object",
        "z.infer",
        "react hook form zod",
      ],
      content: {
        intro:
          "Zod, TypeScript-first bir schema validation kütüphanesidir. Bir kez schema yazdığınızda hem tipinizi hem runtime kontrolünüzü aynı yerden alırsınız; bu da form, API gövdesi, environment variable gibi tüm 'güvenilmez' verileri tek bir tutarlı şekilde doğrulamanızı sağlar. Bu rehberde infografikteki bölümleri açarak basit schema'lardan refinement'e ve React Hook Form entegrasyonuna kadar tüm akışı ele alıyoruz.",
        sections: [
          {
            title: "Zod Nedir?",
            body: "TypeScript-first bir schema validation kütüphanesidir. Hem tip güvenliği (compile time) hem de güvenilebilir runtime kontrolü sağlar. API yanıtları, formlar, env değişkenleri için tek bir doğrulama dili sunar.",
            bullets: [
              "TypeScript-first schema validation",
              "Runtime tip güvenliği",
              "Güvenilen tip sistemi",
            ],
          },
          {
            title: "Neden Zod?",
            body: "Zod'un birçok diğer kütüphaneye olan üstünlükleri:",
            bullets: [
              "Tip-güvenli runtime validation",
              "Kolay schema tanımı",
              "Yardımcı tip çıkarımı (z.infer)",
              "Sıfır bağımlılık (zero-dep)",
              "Aktif ve hızlı büyüyen ekosistem",
            ],
          },
          {
            title: "Kurulum",
            body: "Tek paket; runtime bağımlılığı olarak kurulur.",
            code: {
              language: "bash",
              code: `npm install zod`,
            },
          },
          {
            title: "Temel Schema",
            body: "z.object ile bir schema tanımlarsınız. Her alan için z.string(), z.number(), z.boolean() gibi yardımcılar vardır.",
            code: {
              language: "ts",
              code: `import { z } from "zod";

const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
});`,
            },
          },
          {
            title: "Parse & Validation",
            body: "schema.parse(data) veriyi doğrular; hata varsa exception fırlatır. Başarılıysa tip-güvenli sonucu döndürür.",
            code: {
              language: "ts",
              code: `const data = UserSchema.parse({
  name: "Ada",
  age: 30,
  email: "ada@dev.com",
});
// data: { name: string; age: number; email: string }`,
            },
          },
          {
            title: "Safe Parse (ÖNEMLİ)",
            body: "safeParse exception fırlatmadan { success, data | error } döner. Hatayı try/catch yerine if/else ile ele almak istediğinizde kullanışlıdır.",
            code: {
              language: "ts",
              code: `const result = UserSchema.safeParse(input);

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error.format());
}`,
            },
          },
          {
            title: "Type Inference (Anahtar Özellik)",
            body: "z.infer<typeof Schema> ile schema'dan TypeScript tipini otomatik çıkarırsınız. Schema tek doğru kaynak haline gelir; ayrıca tip yazmanız gerekmez.",
            code: {
              language: "ts",
              code: `type User = z.infer<typeof UserSchema>;
// { name: string; age: number; email: string }`,
            },
          },
          {
            title: "İleri Validation",
            body: "Zod string ve number için zincirlenebilir kurallar sunar: min, max, regex, email, url, uuid, length…",
            code: {
              language: "ts",
              code: `z.string().min(3).max(20);
z.string().email();
z.string().regex(/^[a-z]+$/i);
z.number().int().positive();`,
            },
          },
          {
            title: "Refinement (Custom Rules)",
            body: "Standart kuralların yetmediği yerde refine ile özel kontrol fonksiyonu eklersiniz. Ek olarak superRefine ve transform ile veriyi dönüştürebilir, çapraz alan kuralları yazabilirsiniz.",
            code: {
              language: "ts",
              code: `z.string().refine((val) => val !== "test", {
  message: "Test değerine izin yok",
});`,
            },
          },
          {
            title: "Nested Schemas",
            body: "Schema'lar iç içe olabilir; obje içinde obje, dizi, dizi içinde obje vb. yapıları rahatça modelleyebilirsiniz.",
            code: {
              language: "ts",
              code: `const PostSchema = z.object({
  title: z.string(),
  author: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  tags: z.array(z.string()),
});`,
            },
          },
          {
            title: "React Hook Form ile Kullanım (ÖNEMLİ)",
            body: "@hookform/resolvers/zod ile RHF'ye Zod schema'yı resolver olarak verirsiniz; tüm validation Zod tarafından yapılır ve tipler otomatik çıkar.",
            code: {
              language: "tsx",
              code: `import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});`,
            },
          },
          {
            title: "Temel Kavramlar",
            body: "Zod ile çalışırken sürekli kullanacağınız parçalar:",
            bullets: [
              "schema — z.object, z.string, z.number…",
              "parse / safeParse — runtime kontrol",
              "z.infer — schema'dan tip çıkarma",
              "refine / superRefine — custom kurallar",
              "transform — veriyi dönüştürme",
            ],
          },
          {
            title: "Kullanım Alanları",
            body: "Zod'un en sık tercih edildiği yerler:",
            bullets: [
              "Form validation (RHF + Zod)",
              "API request/response parsing",
              "Environment variable doğrulaması",
              "tRPC ve Zod-tabanlı SDK'lar",
              "Backend payload validation",
            ],
          },
          {
            title: "Özet",
            body: "Zod; tek bir schema'dan hem güçlü TypeScript tipleri hem güvenilir runtime validation üretir. Daha güvenli kod yazmanızı sağlar, code generation gerektirmez ve modern stack'lerin hemen her katmanına uyar — formlar, API'ler, env'ler. Tek bir komutla başlayıp tüm validation katmanını birleştirebilirsiniz.",
          },
        ],
        faq: [
          {
            question: "Zod, Yup'tan ne kadar farklı?",
            answer:
              "Yup eski ve JavaScript-first kökenlidir. Zod baştan TypeScript-first tasarlandığı için tip çıkarımı çok daha güçlüdür. Yup hâlâ olgun ama yeni projelerde Zod tercih ediliyor.",
          },
          {
            question: "Bundle boyutu nasıl?",
            answer:
              "Zod ~12 kB gzip civarındadır. Tree-shaking ile yalnızca kullandığınız parçalar dahil olur. Performans hassas ortamlar için Valibot gibi daha hafif alternatifler de var.",
          },
          {
            question: "tRPC ile birlikte mi kullanılır?",
            answer:
              "Evet — tRPC, input/output şemalarını Zod ile tanımlamayı tercih eder. Schema'dan hem server hem client tipleri otomatik üretilir; uçtan uca tip güvenliği sağlanır.",
          },
          {
            question: "Server-side validation için yeterli mi?",
            answer:
              "Evet. Next.js API Routes, Node.js, Bun veya Deno fark etmez — payload'ları Zod ile parse ederek kötü/eksik girdileri ilk kapıda yakalayabilirsiniz.",
          },
          {
            question: "transform ne işe yarar?",
            answer:
              "Validation sırasında veriyi dönüştürür: \"42\" → 42, trim, lowercase, default değer atama gibi işlemler için kullanılır. Schema'nın çıktı tipi de buna göre güncellenir.",
          },
        ],
      },
    },
    en: {
      slug: "what-is-zod",
      title: "What is Zod? Type-Safe Validation for Modern Apps",
      description:
        "Generate runtime validation from TypeScript types with Zod. Schema definitions, parse, safeParse, type inference and React Hook Form integration.",
      imageAlt:
        "Zod infographic: TypeScript-first schema validation, parse/safeParse, type inference and React Hook Form integration",
      keywords: [
        "zod",
        "what is zod",
        "schema validation",
        "typescript validation",
        "z.object",
        "z.infer",
        "react hook form zod",
      ],
      content: {
        intro:
          "Zod is a TypeScript-first schema validation library. Write a schema once and you get both your type and your runtime checks — a single, consistent way to validate everything 'untrusted' (form data, API bodies, environment variables). This guide expands the infographic, taking you from simple schemas through refinement and React Hook Form integration.",
        sections: [
          {
            title: "What is Zod?",
            body: "A TypeScript-first schema validation library. It gives you both compile-time type safety and trustworthy runtime checks. It provides a single validation language for API responses, forms and env variables.",
            bullets: [
              "TypeScript-first schema validation",
              "Runtime type safety",
              "A type system you can trust",
            ],
          },
          {
            title: "Why Zod?",
            body: "Where Zod stands out among alternatives:",
            bullets: [
              "Type-safe runtime validation",
              "Easy schema definition",
              "Helpful type inference (z.infer)",
              "Zero dependencies",
              "Active, fast-growing ecosystem",
            ],
          },
          {
            title: "Installation",
            body: "A single package — installed as a runtime dependency.",
            code: {
              language: "bash",
              code: `npm install zod`,
            },
          },
          {
            title: "Basic Schema",
            body: "Define a schema with z.object. For each field there are helpers like z.string(), z.number() and z.boolean().",
            code: {
              language: "ts",
              code: `import { z } from "zod";

const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
});`,
            },
          },
          {
            title: "Parsing & Validation",
            body: "schema.parse(data) validates data and throws on failure. On success it returns the type-safe value.",
            code: {
              language: "ts",
              code: `const data = UserSchema.parse({
  name: "Ada",
  age: 30,
  email: "ada@dev.com",
});
// data: { name: string; age: number; email: string }`,
            },
          },
          {
            title: "Safe Parse (IMPORTANT)",
            body: "safeParse returns { success, data | error } without throwing. Use it when you'd rather branch with if/else than try/catch.",
            code: {
              language: "ts",
              code: `const result = UserSchema.safeParse(input);

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error.format());
}`,
            },
          },
          {
            title: "Type Inference (Key Feature)",
            body: "z.infer<typeof Schema> derives the TypeScript type from your schema. The schema becomes the single source of truth — you don't need to write the type separately.",
            code: {
              language: "ts",
              code: `type User = z.infer<typeof UserSchema>;
// { name: string; age: number; email: string }`,
            },
          },
          {
            title: "Advanced Validation",
            body: "Chain rules on strings and numbers: min, max, regex, email, url, uuid, length…",
            code: {
              language: "ts",
              code: `z.string().min(3).max(20);
z.string().email();
z.string().regex(/^[a-z]+$/i);
z.number().int().positive();`,
            },
          },
          {
            title: "Refinement (Custom Rules)",
            body: "When the standard rules aren't enough, refine adds a custom check. superRefine and transform let you transform values and write cross-field rules.",
            code: {
              language: "ts",
              code: `z.string().refine((val) => val !== "test", {
  message: "Test value is not allowed",
});`,
            },
          },
          {
            title: "Nested Schemas",
            body: "Schemas can nest — objects inside objects, arrays of objects, etc. — and you can model anything cleanly.",
            code: {
              language: "ts",
              code: `const PostSchema = z.object({
  title: z.string(),
  author: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  tags: z.array(z.string()),
});`,
            },
          },
          {
            title: "Use with React Hook Form (IMPORTANT)",
            body: "Pass your Zod schema as a resolver via @hookform/resolvers/zod. RHF uses Zod for validation and infers types automatically.",
            code: {
              language: "tsx",
              code: `import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});`,
            },
          },
          {
            title: "Key Concepts",
            body: "The pieces you'll keep reaching for:",
            bullets: [
              "schema — z.object, z.string, z.number…",
              "parse / safeParse — runtime checks",
              "z.infer — derive types from a schema",
              "refine / superRefine — custom rules",
              "transform — transform values",
            ],
          },
          {
            title: "Use Cases",
            body: "Where Zod shows up most often:",
            bullets: [
              "Form validation (RHF + Zod)",
              "API request/response parsing",
              "Environment variable validation",
              "tRPC and Zod-based SDKs",
              "Backend payload validation",
            ],
          },
          {
            title: "Summary",
            body: "Zod produces strong TypeScript types and trustworthy runtime validation from a single schema. Less unsafe code, no code generation, and a fit for almost every layer of a modern stack — forms, APIs, environment. Start with a single command and unify your validation layer.",
          },
        ],
        faq: [
          {
            question: "How is Zod different from Yup?",
            answer:
              "Yup is older and JavaScript-first. Zod was designed TypeScript-first, so its inference is much stronger. Yup is mature, but new projects tend to pick Zod.",
          },
          {
            question: "What's the bundle size?",
            answer:
              "Around ~12kB gzip. With tree-shaking only the parts you use end up in the bundle. For perf-sensitive setups there are lighter alternatives like Valibot.",
          },
          {
            question: "Is it used with tRPC?",
            answer:
              "Yes — tRPC prefers Zod for input/output schemas. The schema generates types for both server and client, giving you end-to-end type safety.",
          },
          {
            question: "Is it enough for server-side validation?",
            answer:
              "Yes. Whether it's Next.js API Routes, Node.js, Bun or Deno — parsing payloads with Zod catches bad/missing input at the gate.",
          },
          {
            question: "What is transform for?",
            answer:
              "It transforms data during validation: \"42\" → 42, trimming, lowercasing, defaulting, etc. The schema's output type updates accordingly.",
          },
        ],
      },
    },
  },
};
