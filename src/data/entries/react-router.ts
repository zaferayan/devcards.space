import type { Infographic } from "@/types";

export const reactRouter: Infographic = {
  id: "react-router",
  image: "/infographics/react-router.png",
  imageWidth: 1586,
  imageHeight: 992,
  tags: ["React", "Frontend"],
  publishedAt: "2026-04-28",
  updatedAt: "2026-04-28",
  readingMinutes: 7,
  translations: {
    tr: {
      slug: "react-router-nedir",
      title: "React Router v7 Nedir? Declarative Routing Rehberi",
      description:
        "React Router v7 ile React uygulamalarında declarative routing. BrowserRouter, Routes, Link, useNavigate, nested routes ve protected routes.",
      imageAlt:
        "React Router v7 infografiği: BrowserRouter, Routes, Link, useNavigate ve nested routes başlıklarını gösteren 13 bölümlü genel bakış",
      keywords: [
        "react router",
        "react router v7",
        "declarative routing",
        "useNavigate",
        "useParams",
        "nested routes",
        "outlet",
      ],
      content: {
        intro:
          "React Router, single-page React uygulamalarında URL yönetimi için yıllardır kullanılan ve v7 ile birlikte data-aware modlar gibi yeni özellikler kazanan bir kütüphanedir. JSX tabanlı declarative API'sini ve full SPA desteğini koruyarak Routes, Link, useNavigate, useParams ve Outlet gibi yapı taşlarıyla esnek bir routing katmanı sunar. Bu rehberde infografikteki 13 bölümü açarak temel kurulumdan protected routes'a kadar tüm akışı işliyoruz.",
        sections: [
          {
            title: "React Router Nedir?",
            body: "React uygulamaları için bir routing kütüphanesidir. Sayfalar arasında geçişi etkinleştirir, full SPA desteği sağlar ve JSX ile çalışır.",
            bullets: [
              "React için routing kütüphanesi",
              "Sayfalar arası geçiş",
              "Full SPA desteği",
              "JSX ile çalışır",
            ],
          },
          {
            title: "Declarative Routing Nedir?",
            body: "Route'larınızı JSX olarak tanımlarsınız ve UI yapısı doğal olarak rotalara eşlenir. Daha az boilerplate, daha iyi okunabilirlik anlamına gelir.",
            bullets: [
              "JSX ile route'ları tanımlar",
              "Okunması ve bakımı kolay",
              "Çoğu React projesi için ideal",
            ],
          },
          {
            title: "Kurulum",
            body: "Tek paket kurulumu yeterlidir; v7 framework olmadan da kullanılabilir.",
            code: {
              language: "bash",
              code: `npm install react-router`,
            },
          },
          {
            title: "Temel Kurulum",
            body: "Uygulamanızı BrowserRouter ile sarmalayın; bu router'ın history API ile çalışmasını sağlar.",
            code: {
              language: "tsx",
              filename: "main.tsx",
              code: `import { BrowserRouter } from "react-router";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);`,
            },
          },
          {
            title: "Route Tanımlama (Declarative Mode)",
            body: "Routes ve Route bileşenleri ile path-to-element eşleşmesini deklaratif şekilde yazarsınız.",
            code: {
              language: "tsx",
              code: `import { Routes, Route } from "react-router";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/users/:id" element={<UserDetail />} />
</Routes>`,
            },
          },
          {
            title: "Navigasyon: Link",
            body: "Sayfalar arası geçiş için Link bileşeni kullanılır. Tıklamada tarayıcı yenilenmez; tamamen client-side gezinme yapılır.",
            code: {
              language: "tsx",
              code: `import { Link } from "react-router";

<nav>
  <Link to="/">Ana sayfa</Link>
  <Link to="/about">Hakkında</Link>
</nav>`,
            },
          },
          {
            title: "useNavigate Hook",
            body: "Programatik navigasyon için useNavigate kullanılır. Form submit sonrası, login sonrası vb. yönlendirmeler için idealdir.",
            code: {
              language: "tsx",
              code: `import { useNavigate } from "react-router";

const navigate = useNavigate();
navigate("/dashboard");
navigate(-1);            // geri
navigate("/users", { replace: true });`,
            },
          },
          {
            title: "Route Parametreleri",
            body: ":id gibi parametre tanımlanmış route'larda useParams ile değerleri okursunuz. Tipi tanımlamak için generic kullanmak iyi bir pratiktir.",
            code: {
              language: "tsx",
              code: `import { useParams } from "react-router";

function UserDetail() {
  const { id } = useParams();
  return <p>Kullanıcı id: {id}</p>;
}`,
            },
          },
          {
            title: "Nested Routes",
            body: "Route içinde Route yazarak iç içe rotalar tanımlanır. Parent component, child route'ları Outlet ile render eder.",
            code: {
              language: "tsx",
              code: `<Routes>
  <Route path="dashboard" element={<DashboardLayout />}>
    <Route index element={<Overview />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>`,
            },
          },
          {
            title: "Outlet",
            body: "Outlet, child route'un render edileceği yer için bir placeholder'dır. Layout componentlerinin parça-parça UI yapmasını sağlar.",
            code: {
              language: "tsx",
              code: `import { Outlet } from "react-router";

export function DashboardLayout() {
  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}`,
            },
          },
          {
            title: "Protected Routes",
            body: "Auth gerektiren rotaları sarmalamak için bir wrapper component yazılır. Kullanıcı yetkisizse Navigate ile login sayfasına yönlendirilir.",
            code: {
              language: "tsx",
              code: `function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuth = useAuth();
  if (!isAuth) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>`,
            },
          },
          {
            title: "Temel Kavramlar",
            body: "API'nin omurgası şu birkaç parçadır:",
            bullets: [
              "Routes & Route — path/element eşlemesi",
              "Link — declarative navigation",
              "useNavigate — programatik navigasyon",
              "useParams — URL parametreleri",
              "Outlet — child route placeholder",
              "Conditional routing — protected/redirect",
            ],
          },
          {
            title: "Özet",
            body: "React Router v7; declarative ve readable JSX-tabanlı routing sunar. Kurulumu kolay, ölçeklenmesi kolaydır ve çoğu React projesi için yeterlidir. Next.js kullanmıyorsanız SPA'larda standart tercihtir.",
          },
        ],
        faq: [
          {
            question: "React Router v6 ile v7 farkı nedir?",
            answer:
              "v7 paket adını react-router olarak sadeleştirir, framework modu (Remix mirası) ve data-aware route'lar gibi yenilikler getirir. Declarative kullanım ise neredeyse aynıdır; mevcut projeler kolayca yükseltilir.",
          },
          {
            question: "Next.js varken React Router gerekir mi?",
            answer:
              "Hayır. Next.js dosya tabanlı routing'e sahiptir. React Router yalnızca pure SPA veya Vite/CRA gibi framework'süz kurulumlarda kullanılır.",
          },
          {
            question: "404 sayfası nasıl yapılır?",
            answer:
              "Route'ların sonunda <Route path=\"*\" element={<NotFound />} /> tanımlamanız yeterli. Eşleşen rota olmadığında bu component gösterilir.",
          },
          {
            question: "Query string'ler nasıl yönetilir?",
            answer:
              "useSearchParams hook'u get/set API'si sunar. Filtre, sayfa, sort gibi state'ler URL'de tutulduğunda paylaşılabilir ve geri tuşuyla uyumlu olur.",
          },
          {
            question: "Code splitting nasıl yaparım?",
            answer:
              "React.lazy + Suspense ile route bileşenlerini lazy-load edersiniz. v7 framework modunda rota başına otomatik bölme de mümkündür.",
          },
        ],
      },
    },
    en: {
      slug: "what-is-react-router",
      title: "What is React Router v7? Declarative Routing Made Simple",
      description:
        "Use React Router v7 for declarative routing in React apps. Walkthrough of BrowserRouter, Routes, Link, useNavigate, nested routes and protected routes.",
      imageAlt:
        "React Router v7 infographic: BrowserRouter, Routes, Link, useNavigate and nested routes across 13 sections",
      keywords: [
        "react router",
        "react router v7",
        "declarative routing",
        "useNavigate",
        "useParams",
        "nested routes",
        "outlet",
      ],
      content: {
        intro:
          "React Router has been the long-standing routing library for single-page React apps and v7 introduces data-aware modes alongside the classic declarative API. It keeps its JSX-first approach and full SPA support while providing the building blocks — Routes, Link, useNavigate, useParams, Outlet — for a flexible routing layer. This guide walks every section of the infographic, from setup to protected routes.",
        sections: [
          {
            title: "What is React Router?",
            body: "A routing library for React applications. It enables navigation between pages, supports full SPAs and works with JSX.",
            bullets: [
              "Routing library for React",
              "Page-to-page navigation",
              "Full SPA support",
              "Works with JSX",
            ],
          },
          {
            title: "What is Declarative Routing?",
            body: "You define routes as JSX and the UI structure naturally maps to URLs. Less boilerplate, better readability.",
            bullets: [
              "Define routes with JSX",
              "Easy to read and maintain",
              "Perfect for most React apps",
            ],
          },
          {
            title: "Installation",
            body: "Single package install — v7 also works without a framework.",
            code: {
              language: "bash",
              code: `npm install react-router`,
            },
          },
          {
            title: "Basic Setup",
            body: "Wrap your app with BrowserRouter so the router can use the History API.",
            code: {
              language: "tsx",
              filename: "main.tsx",
              code: `import { BrowserRouter } from "react-router";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);`,
            },
          },
          {
            title: "Defining Routes (Declarative Mode)",
            body: "Routes and Route components let you map paths to elements declaratively.",
            code: {
              language: "tsx",
              code: `import { Routes, Route } from "react-router";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/users/:id" element={<UserDetail />} />
</Routes>`,
            },
          },
          {
            title: "Navigation: Link",
            body: "Use Link for in-app navigation. The browser doesn't reload — it's pure client-side routing.",
            code: {
              language: "tsx",
              code: `import { Link } from "react-router";

<nav>
  <Link to="/">Home</Link>
  <Link to="/about">About</Link>
</nav>`,
            },
          },
          {
            title: "useNavigate Hook",
            body: "useNavigate gives you programmatic navigation — perfect for after-form-submit redirects, post-login flows and so on.",
            code: {
              language: "tsx",
              code: `import { useNavigate } from "react-router";

const navigate = useNavigate();
navigate("/dashboard");
navigate(-1);            // back
navigate("/users", { replace: true });`,
            },
          },
          {
            title: "Route Params",
            body: "For routes with parameters like :id, read them with useParams. Using a generic for the typed shape is a good practice.",
            code: {
              language: "tsx",
              code: `import { useParams } from "react-router";

function UserDetail() {
  const { id } = useParams();
  return <p>User id: {id}</p>;
}`,
            },
          },
          {
            title: "Nested Routes",
            body: "Nest Route inside Route to define hierarchical routes. The parent component renders children through Outlet.",
            code: {
              language: "tsx",
              code: `<Routes>
  <Route path="dashboard" element={<DashboardLayout />}>
    <Route index element={<Overview />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>`,
            },
          },
          {
            title: "Outlet",
            body: "Outlet is the placeholder where child routes render. It lets layout components compose UI piece by piece.",
            code: {
              language: "tsx",
              code: `import { Outlet } from "react-router";

export function DashboardLayout() {
  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}`,
            },
          },
          {
            title: "Protected Routes",
            body: "Wrap auth-required routes with a small component. If the user isn't authenticated, Navigate redirects them to login.",
            code: {
              language: "tsx",
              code: `function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuth = useAuth();
  if (!isAuth) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>`,
            },
          },
          {
            title: "Key Concepts",
            body: "The backbone of the API:",
            bullets: [
              "Routes & Route — path-to-element mapping",
              "Link — declarative navigation",
              "useNavigate — programmatic navigation",
              "useParams — URL parameters",
              "Outlet — child route placeholder",
              "Conditional routing — protected/redirect",
            ],
          },
          {
            title: "Summary",
            body: "React Router v7 offers declarative, readable, JSX-based routing. It's easy to set up, easy to scale and good enough for most React apps. If you're not on Next.js, it's the standard pick for SPAs.",
          },
        ],
        faq: [
          {
            question: "What changed between v6 and v7?",
            answer:
              "v7 simplifies the package name to react-router and introduces a framework mode (Remix lineage) plus data-aware routes. Declarative usage is nearly identical; existing projects upgrade smoothly.",
          },
          {
            question: "Do I need React Router with Next.js?",
            answer:
              "No. Next.js has file-based routing built in. React Router is for pure SPAs or framework-less setups (Vite/CRA).",
          },
          {
            question: "How do I add a 404 page?",
            answer:
              "Add <Route path=\"*\" element={<NotFound />} /> at the end of your routes. It catches any URL that doesn't match.",
          },
          {
            question: "How do I manage query strings?",
            answer:
              "Use useSearchParams — it gives you a get/set API. Storing filter, page or sort state in the URL makes it shareable and back-button friendly.",
          },
          {
            question: "How do I add code splitting?",
            answer:
              "Use React.lazy + Suspense to lazy-load route components. In v7 framework mode, per-route splitting can also be automatic.",
          },
        ],
      },
    },
  },
};
