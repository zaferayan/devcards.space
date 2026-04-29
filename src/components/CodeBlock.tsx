import type { CodeBlock as CodeBlockType } from "@/types";
import { CopyCodeButton } from "@/components/CopyCodeButton";
import { createHighlighter } from "shiki";

type Props = {
  block: CodeBlockType;
};

const theme = "github-dark-default";
const supportedLanguages = [
  "javascript",
  "typescript",
  "tsx",
  "bash",
  "json",
  "css",
  "html",
  "plaintext",
];
const highlighterPromise = createHighlighter({
  themes: [theme],
  langs: supportedLanguages,
});

const languageAliases: Record<string, string> = {
  js: "javascript",
  javascript: "javascript",
  ts: "typescript",
  typescript: "typescript",
  tsx: "tsx",
  bash: "bash",
  sh: "bash",
  shell: "bash",
  json: "json",
  css: "css",
  html: "html",
  text: "plaintext",
  plaintext: "plaintext",
};

function normalizeLanguage(language: string) {
  return languageAliases[language.toLowerCase()] ?? "plaintext";
}

export async function CodeBlock({ block }: Props) {
  const highlighter = await highlighterPromise;
  const highlightedCode = highlighter.codeToHtml(block.code, {
    lang: normalizeLanguage(block.language),
    theme,
  });

  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-ink-800 bg-ink-900 text-ink-100 shadow-lg shadow-ink-900/10">
      <figcaption className="flex items-center justify-between border-b border-ink-800 bg-ink-900 px-4 py-2.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </span>
          {block.filename ? (
            <span className="ml-2 font-mono text-ink-300">{block.filename}</span>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-ink-800 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-300">
            {block.language}
          </span>
          <CopyCodeButton code={block.code} />
        </div>
      </figcaption>
      <div
        className="syntax-highlight overflow-x-auto text-[13px] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </figure>
  );
}
