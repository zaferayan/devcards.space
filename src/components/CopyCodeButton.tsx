"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

type Props = {
  code: string;
};

async function copyToClipboard(code: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(code);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = code;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export function CopyCodeButton({ code }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  return (
    <button
      type="button"
      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-ink-700 bg-ink-800 text-ink-300 transition-colors hover:border-ink-600 hover:bg-ink-700 hover:text-white"
      aria-label={copied ? "Copied code" : "Copy code"}
      title={copied ? "Copied" : "Copy code"}
      onClick={async () => {
        await copyToClipboard(code);
        setCopied(true);
      }}
    >
      {copied ? <Check aria-hidden className="h-3.5 w-3.5" /> : <Copy aria-hidden className="h-3.5 w-3.5" />}
    </button>
  );
}
