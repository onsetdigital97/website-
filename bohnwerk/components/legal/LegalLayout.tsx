import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export function LegalLayout({ title, updated, children }: { title: string; updated?: string; children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: title }]} />
      <div className="container container-px py-14">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-display-md font-semibold text-ink-900">{title}</h1>
          {updated && <p className="mt-2 text-sm text-ink-400">Stand: {updated}</p>}
          <div className="prose-legal mt-8 space-y-6 text-sm leading-relaxed text-ink-700 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink-900 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
