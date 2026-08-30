import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AccountSidebar } from '@/components/account/AccountSidebar';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: 'Mein Konto' }]} />
      <div className="container container-px py-10">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          <AccountSidebar />
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
