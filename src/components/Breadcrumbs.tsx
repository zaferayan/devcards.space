import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  items: Crumb[];
  ariaLabel: string;
};

export function Breadcrumbs({ items, ariaLabel }: Props) {
  return (
    <nav aria-label={ariaLabel} className="mb-6 text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-ink-500 dark:text-ink-400">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-accent-dark transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "font-medium text-ink-700 dark:text-ink-200" : ""}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden className="text-ink-300 dark:text-ink-600">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
