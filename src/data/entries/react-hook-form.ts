import type { Infographic } from "@/types";

export const reactHookForm: Infographic = {
  id: "react-hook-form",
  image: "/infographics/react-hook-form.png",
  imageWidth: 1586,
  imageHeight: 992,
  tags: ["React", "Frontend"],
  publishedAt: "2026-04-28",
  updatedAt: "2026-04-28",
  readingMinutes: 7,
  translations: {
    tr: {
      slug: "react-hook-form-nedir",
      title: "React Hook Form Nedir? Performant ve Esnek Form Yönetimi",
      description:
        "React Hook Form ile daha az re-render, daha az kod ve daha güçlü validation. useForm, Controller, watch ve TypeScript ile entegrasyon rehberi.",
      imageAlt:
        "React Hook Form infografiği: useForm, validation, controlled components ve TypeScript desteğini gösteren 13 bölümlü genel bakış",
      keywords: [
        "react hook form",
        "useForm",
        "react form yönetimi",
        "form validation",
        "controlled components",
        "watch reset",
        "react form library",
      ],
      content: {
        intro:
          "React Hook Form, hafif olmasıyla, performansıyla ve TypeScript desteğiyle modern React uygulamalarındaki form yönetiminin de-facto kütüphanesi haline gelen bir araçtır. Geleneksel controlled form yaklaşımının her tuş vuruşunda re-render yaratmasının önüne geçer, ref tabanlı uncontrolled yaklaşımı ile bileşenlerinizi sade tutar. Bu rehberde infografikteki 13 bölümü açarak temel kurulumdan watch/reset gibi ileri özelliklere kadar her şeyi gösteriyoruz.",
        sections: [
          {
            title: "React Hook Form Nedir?",
            body: "React'ta form yönetimi için hafif bir kütüphanedir. Daha az re-render, daha az kod, doğal TypeScript desteği ve harici kütüphanelere ihtiyaç duymadan validation imkanı sağlar.",
            bullets: [
              "Hafif — küçük bundle",
              "Daha az re-render → daha iyi performans",
              "Sadeleştirilmiş validation",
              "Built-in TypeScript desteği",
            ],
          },
          {
            title: "Neden React Hook Form?",
            body: "Form kütüphanesi seçerken kıymet veren detaylar:",
            bullets: [
              "Az re-render — yalnızca değişen alanlar render edilir",
              "Kolay validation",
              "Bağımsız çalışır — başka kütüphane gerekmez",
              "Built-in TypeScript desteği",
              "Az kod, daha temiz componentler",
            ],
          },
          {
            title: "Daha İyi Performans",
            body: "Controlled formlarda her tuş vuruşu tüm form'u re-render eder. React Hook Form, ref tabanlı uncontrolled yaklaşımıyla yalnızca gerçekten değişen alanları yeniden render eder; sonuç, daha hızlı UI ve düşük CPU kullanımı.",
          },
          {
            title: "Temel Kurulum",
            body: "useForm hook'u tüm form akışınızın merkezidir; register, handleSubmit ve formState kapsamlı API sunar.",
            code: {
              language: "tsx",
              filename: "components/LoginForm.tsx",
              code: `import { useForm } from "react-hook-form";

type FormData = { email: string; password: string };

export function LoginForm() {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      <input type="password" {...register("password")} />
      <button type="submit">Giriş yap</button>
    </form>
  );
}`,
            },
          },
          {
            title: "Temel Form Örneği",
            body: "register fonksiyonu input'a ad ve ref bağlar; handleSubmit form gönderildiğinde data'yı toplayıp callback'e geçirir.",
          },
          {
            title: "Validation",
            body: "Validation kuralları doğrudan register'e parametre olarak verilir: required, minLength, pattern gibi yerleşik kurallar veya custom validate fonksiyonu. Hata mesajlarına formState.errors üzerinden erişilir.",
            code: {
              language: "tsx",
              code: `<input
  {...register("email", {
    required: "Email gerekli",
    pattern: {
      value: /^\\S+@\\S+$/i,
      message: "Geçersiz email",
    },
  })}
/>
{errors.email && <span>{errors.email.message}</span>}`,
            },
          },
          {
            title: "Form State",
            body: "formState; errors, isDirty, isSubmitting, touchedFields, isValid gibi kullanışlı durum bilgilerini içerir. UI'ı buna göre koşullandırabilirsiniz.",
            bullets: [
              "errors — alan bazında hata mesajları",
              "isDirty — form değişti mi",
              "isSubmitting — submit sürüyor mu",
              "touchedFields — dokunulmuş alanlar",
              "isValid — tüm validation'lar geçti mi",
            ],
          },
          {
            title: "Controlled Components",
            body: "Material UI, Chakra UI veya kendi custom input'larınız gibi ref kabul etmeyen bileşenleri kullanmak için Controller bileşeni vardır.",
            code: {
              language: "tsx",
              code: `import { Controller, useForm } from "react-hook-form";

<Controller
  name="country"
  control={control}
  rules={{ required: true }}
  render={({ field }) => <Select {...field} options={options} />}
/>`,
            },
          },
          {
            title: "TypeScript Desteği",
            body: "useForm jenerik tipini formunuzun şekline ayarlayarak tüm register/setValue/watch çağrılarını tip-güvenli yaparsınız. Otomatik tamamlama hatasız form yapısı kurmanıza yardım eder.",
            code: {
              language: "tsx",
              code: `type Form = { email: string; age: number };
const { register, watch } = useForm<Form>();
watch("email"); // string
watch("age");   // number`,
            },
          },
          {
            title: "Watch & Reset",
            body: "watch alanların güncel değerini izlemek için, reset formu ilk değerlere veya yeni bir set'e döndürmek için kullanılır. Bağlı UI senaryolarında çok kullanışlıdır.",
            code: {
              language: "tsx",
              code: `const email = watch("email");

reset(); // baştaki değerlere
reset({ email: "ada@dev.com" });`,
            },
          },
          {
            title: "Temel Kavramlar",
            body: "API'de en sık kullandığınız parçalar:",
            bullets: [
              "useForm — formun ana hook'u",
              "register — input'u forma bağlar",
              "handleSubmit — submit pipeline'ı",
              "validation — required/min/max/pattern/validate",
              "Controller — kontrollü bileşenler için sarmalayıcı",
              "watch / reset — gözleme ve sıfırlama",
            ],
          },
          {
            title: "Kullanım Alanları",
            body: "React Hook Form'un yıldızlandığı senaryolar:",
            bullets: [
              "Login & register formları",
              "Çok adımlı formlar (multi-step)",
              "E-ticaret checkout süreçleri",
              "Filtre ve arama formları",
              "Admin paneli CRUD ekranları",
            ],
          },
          {
            title: "Özet",
            body: "React Hook Form; hızlı ve hafif form yönetimi sunar, re-render sayısını azaltır ve gelişmiş validation imkânı sağlar. Modern React projelerinde form denildiğinde ilk akla gelen kütüphanedir; özellikle Zod ile birleşince tip-güvenli form akışları çok güçlüdür.",
          },
        ],
        faq: [
          {
            question: "React Hook Form ile Formik arasındaki fark nedir?",
            answer:
              "Formik daha eski ve controlled bir API sunar; her tuş vuruşunda re-render olur. React Hook Form ref tabanlı çalışır, daha az re-render ve daha küçük bundle ile gelir. Yeni projelerde RHF tercih edilir.",
          },
          {
            question: "Zod ile birlikte nasıl kullanırım?",
            answer:
              "@hookform/resolvers/zod paketiyle Zod schema'sını resolver olarak useForm'a verirsiniz; tüm validation Zod tarafından yapılır ve tipler otomatik çıkarılır.",
          },
          {
            question: "Server-side render uyumlu mu?",
            answer:
              "Evet, Next.js App Router ile sorunsuz çalışır. useForm bir Client Component içinde tanımlanmalıdır; sayfanın geri kalanı Server Component kalabilir.",
          },
          {
            question: "useFieldArray ne işe yarar?",
            answer:
              "Dinamik liste alanları (örneğin kullanıcı eklenip çıkarılan formlar) için kullanılır. append, remove, move gibi yardımcılar getirir ve listeyi performanslı tutar.",
          },
          {
            question: "Async validation yapılabilir mi?",
            answer:
              "Evet — validate fonksiyonu Promise döndürebilir. Email kullanılabilirliği gibi sunucu doğrulamaları için idealdir; isValidating state'i ile UI'ı yönetebilirsiniz.",
          },
        ],
      },
    },
    en: {
      slug: "what-is-react-hook-form",
      title: "What is React Hook Form? Performant, Flexible Form Management",
      description:
        "Fewer re-renders, less code and stronger validation with React Hook Form. Practical guide to useForm, Controller, watch and TypeScript integration.",
      imageAlt:
        "React Hook Form infographic showing useForm, validation, controlled components and TypeScript support across 13 sections",
      keywords: [
        "react hook form",
        "useForm",
        "react form management",
        "form validation",
        "controlled components",
        "watch reset",
        "react form library",
      ],
      content: {
        intro:
          "React Hook Form has become the de-facto form library in modern React thanks to its lightweight footprint, performance and TypeScript support. It avoids the per-keystroke re-renders of the controlled approach by using a ref-based uncontrolled model that keeps your components clean. This guide walks through every section of the infographic, from basic setup to advanced features like watch and reset.",
        sections: [
          {
            title: "What is React Hook Form?",
            body: "A lightweight library for managing forms in React. It uses fewer re-renders, less code, native TypeScript support, and built-in validation without depending on external libraries.",
            bullets: [
              "Lightweight — small bundle",
              "Fewer re-renders → better performance",
              "Simplified validation",
              "Built-in TypeScript support",
            ],
          },
          {
            title: "Why React Hook Form?",
            body: "What makes it stand out when picking a form library:",
            bullets: [
              "Fewer re-renders — only changing fields update",
              "Easy validation",
              "Standalone — no extra libraries needed",
              "Built-in TypeScript support",
              "Less code, cleaner components",
            ],
          },
          {
            title: "Better Performance",
            body: "Controlled forms re-render the entire form on every keystroke. React Hook Form's ref-based uncontrolled approach re-renders only the fields that actually change — resulting in a faster UI and lower CPU usage.",
          },
          {
            title: "Basic Setup",
            body: "useForm is the heart of your form; register, handleSubmit and formState give you a complete API.",
            code: {
              language: "tsx",
              filename: "components/LoginForm.tsx",
              code: `import { useForm } from "react-hook-form";

type FormData = { email: string; password: string };

export function LoginForm() {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      <input type="password" {...register("password")} />
      <button type="submit">Sign in</button>
    </form>
  );
}`,
            },
          },
          {
            title: "Basic Form Example",
            body: "register binds a name and ref to an input; handleSubmit collects the data on submit and passes it to your callback.",
          },
          {
            title: "Validation",
            body: "Pass validation rules directly to register: required, minLength, pattern or a custom validate function. Errors are read from formState.errors.",
            code: {
              language: "tsx",
              code: `<input
  {...register("email", {
    required: "Email is required",
    pattern: {
      value: /^\\S+@\\S+$/i,
      message: "Invalid email",
    },
  })}
/>
{errors.email && <span>{errors.email.message}</span>}`,
            },
          },
          {
            title: "Form State",
            body: "formState exposes useful flags: errors, isDirty, isSubmitting, touchedFields, isValid. Drive your UI from these.",
            bullets: [
              "errors — per-field error messages",
              "isDirty — has the form changed?",
              "isSubmitting — submit in progress",
              "touchedFields — fields the user touched",
              "isValid — all validations passed",
            ],
          },
          {
            title: "Controlled Components",
            body: "Use Controller for components that don't accept refs — Material UI, Chakra UI or your own custom inputs.",
            code: {
              language: "tsx",
              code: `import { Controller, useForm } from "react-hook-form";

<Controller
  name="country"
  control={control}
  rules={{ required: true }}
  render={({ field }) => <Select {...field} options={options} />}
/>`,
            },
          },
          {
            title: "TypeScript Support",
            body: "Set the useForm generic to your form shape and every register/setValue/watch call becomes type-safe. Autocomplete keeps you out of typos.",
            code: {
              language: "tsx",
              code: `type Form = { email: string; age: number };
const { register, watch } = useForm<Form>();
watch("email"); // string
watch("age");   // number`,
            },
          },
          {
            title: "Watch & Reset",
            body: "watch tracks live field values; reset returns the form to its defaults or a new set. Both shine in dependent UI scenarios.",
            code: {
              language: "tsx",
              code: `const email = watch("email");

reset(); // back to defaults
reset({ email: "ada@dev.com" });`,
            },
          },
          {
            title: "Key Concepts",
            body: "The API parts you'll use most often:",
            bullets: [
              "useForm — main form hook",
              "register — connects an input to the form",
              "handleSubmit — submit pipeline",
              "validation — required/min/max/pattern/validate",
              "Controller — wrapper for controlled components",
              "watch / reset — observe and reset",
            ],
          },
          {
            title: "Use Cases",
            body: "Where React Hook Form excels:",
            bullets: [
              "Login & register forms",
              "Multi-step forms",
              "E-commerce checkout",
              "Filter and search forms",
              "Admin CRUD screens",
            ],
          },
          {
            title: "Summary",
            body: "React Hook Form provides fast, lightweight form management, reduces re-renders and gives you advanced validation. It's the first library that comes to mind for forms in modern React — especially powerful when paired with Zod for type-safe schemas.",
          },
        ],
        faq: [
          {
            question: "How is it different from Formik?",
            answer:
              "Formik is older and offers a controlled API that re-renders on every keystroke. React Hook Form is ref-based with fewer re-renders and a smaller bundle. New projects tend to pick RHF.",
          },
          {
            question: "How do I use it with Zod?",
            answer:
              "Use @hookform/resolvers/zod and pass your Zod schema as a resolver to useForm. Validation runs through Zod and types are inferred automatically.",
          },
          {
            question: "Is it SSR-compatible?",
            answer:
              "Yes — works seamlessly with the Next.js App Router. Define useForm inside a Client Component; the rest of the page can stay as Server Components.",
          },
          {
            question: "What is useFieldArray for?",
            answer:
              "For dynamic list fields (forms where users can add/remove rows). It exposes helpers like append, remove and move and keeps the list performant.",
          },
          {
            question: "Can I do async validation?",
            answer:
              "Yes — validate can return a Promise. Ideal for things like email-availability checks; you can drive UI from the isValidating flag.",
          },
        ],
      },
    },
  },
};
