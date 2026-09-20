import { Plus } from "lucide-react";
import type { FAQItem } from "@/content/types";

export function Faq({ items, title = "Häufige Fragen" }: { items: FAQItem[]; title?: string }) {
  if (items.length === 0) return null;

  return (
    <div>
      <p className="kicker text-graphite">FAQ</p>
      <h2 className="mt-4 font-display text-3xl text-balance">{title}</h2>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <details key={item.question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium">
              {item.question}
              <Plus className="size-4 shrink-0 transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="mt-3 max-w-2xl text-graphite">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
