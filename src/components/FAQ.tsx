import type { FAQItem } from "@/types";

type Props = {
  items: FAQItem[];
  title: string;
  lead: string;
};

export function FAQ({ items, title, lead }: Props) {
  return (
    <section aria-labelledby="faq-heading" className="mt-16">
      <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
        {title}
      </h2>
      <p className="mt-2 text-ink-600 dark:text-ink-300">{lead}</p>
      <div className="mt-6 divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-ink-800/80">
        {items.map((item, idx) => (
          <details
            key={idx}
            className="group p-5 sm:p-6 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-start justify-between gap-4 text-left">
              <h3 className="text-base sm:text-lg font-semibold text-ink-900 dark:text-white">
                {item.question}
              </h3>
              <span
                aria-hidden
                className="mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition-transform group-open:rotate-180 dark:border-white/10 dark:text-ink-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>
            <p className="mt-3 text-ink-700 leading-relaxed dark:text-ink-300">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
