"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

type Props = {
  label: string;
};

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  try {
    window.localStorage.setItem("theme", theme);
  } catch {
    // Theme still applies for the current session when storage is unavailable.
  }
}

export function ThemeToggle({ label }: Props) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 transition-colors hover:border-accent/40 hover:bg-accent-soft hover:text-accent-dark dark:border-white/10 dark:bg-ink-800 dark:text-ink-200 dark:hover:border-accent/50 dark:hover:bg-ink-700 dark:hover:text-white"
      aria-label={label}
      title={label}
      onClick={() => {
        const nextTheme = isDark ? "light" : "dark";
        applyTheme(nextTheme);
        setTheme(nextTheme);
      }}
    >
      {isDark ? <Sun aria-hidden className="h-4 w-4" /> : <Moon aria-hidden className="h-4 w-4" />}
    </button>
  );
}
