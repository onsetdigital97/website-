import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-paper">
      <ol className="mx-auto flex max-w-(--container-page) flex-wrap items-center gap-1 px-6 py-4 text-xs text-graphite md:px-10">
        <li>
          <Link to="/" className="hover:text-ink hover:underline underline-offset-4">Start</Link>
        </li>
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center gap-1">
            <ChevronRight className="size-3" aria-hidden="true" />
            {index === items.length - 1 ? (
              <span aria-current="page" className="text-ink">{item.name}</span>
            ) : (
              <Link to={item.path} className="hover:text-ink hover:underline underline-offset-4">{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
