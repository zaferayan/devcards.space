import Link from "next/link";

type RelatedItem = {
  href: string;
  title: string;
  description: string;
  tags: string[];
};

type Props = {
  items: RelatedItem[];
  title: string;
  lead: string;
};

export function RelatedPosts({ items, title, lead }: Props) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-16">
      <h2 id="related-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
        {title}
      </h2>
      <p className="mt-2 text-ink-600 dark:text-ink-300">{lead}</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group block h-full rounded-xl border border-ink-100 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md dark:border-white/10 dark:bg-ink-800/80 dark:hover:border-accent/50"
            >
              <div className="mb-2 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent-dark dark:bg-accent/15 dark:text-accent-soft"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-base font-semibold leading-snug text-ink-900 transition-colors group-hover:text-accent-dark dark:text-white dark:group-hover:text-accent-soft">
                {item.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-ink-600 dark:text-ink-300">
                {item.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
