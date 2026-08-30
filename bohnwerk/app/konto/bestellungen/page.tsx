'use client';

import Image from 'next/image';
import { Package } from 'lucide-react';
import { RequireAuth } from '@/components/account/RequireAuth';
import { mockOrders } from '@/lib/data/account';
import { formatPrice } from '@/lib/utils';
import { useShop } from '@/lib/store';
import { getProductById } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const statusTone: Record<string, string> = {
  'In Bearbeitung': 'bg-copper-50 text-copper-700',
  Versendet: 'bg-sky-50 text-sky-700',
  Zugestellt: 'bg-emerald-50 text-emerald-700',
};

export default function OrdersPage() {
  return (
    <RequireAuth>
      <OrdersContent />
    </RequireAuth>
  );
}

function OrdersContent() {
  const { addToCart, pushToast } = useShop();

  function reorder(orderId: string) {
    const order = mockOrders.find((o) => o.id === orderId);
    if (!order) return;
    order.items.forEach((item) => {
      const match = getProductById(item.name.toLowerCase());
      addToCart({ productId: match?.id ?? item.name, slug: match?.slug ?? '', name: item.name, image: item.image, price: item.price, quantity: item.quantity });
    });
    pushToast('Artikel der Bestellung wurden zum Warenkorb hinzugefügt.', 'success');
  }

  if (mockOrders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink-900/15 py-16 text-center">
        <Package size={36} className="text-ink-300" />
        <p className="font-display text-lg font-semibold text-ink-900">Noch keine Bestellungen</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-display-sm font-semibold text-ink-900">Bestellungen</h1>
      <div className="mt-6 space-y-5">
        {mockOrders.map((order) => (
          <div key={order.id} className="rounded-2xl border border-ink-900/10 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-display text-sm font-semibold text-ink-900">Bestellung {order.id}</p>
                <p className="text-xs text-ink-500">{new Date(order.date).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
              </div>
              <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', statusTone[order.status])}>{order.status}</span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-3">
              {order.items.map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 rounded-xl bg-sand-100 px-3 py-2">
                  <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-cream-50">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-ink-900">{item.name}</p>
                    <p className="text-xs text-ink-400">
                      {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-ink-900/10 pt-4">
              <span className="font-display text-sm font-semibold text-ink-900">Gesamt: {formatPrice(order.total)}</span>
              <div className="flex gap-2">
                {order.trackingUrl && (
                  <a href={order.trackingUrl} className="rounded-full border border-ink-900/15 px-4 py-2 text-xs font-semibold text-ink-700 hover:bg-ink-900/5">
                    Sendung verfolgen
                  </a>
                )}
                <Button variant="ghost" size="sm" onClick={() => reorder(order.id)}>
                  Erneut bestellen
                </Button>
                <a href="#" className="rounded-full border border-ink-900/15 px-4 py-2 text-xs font-semibold text-ink-700 hover:bg-ink-900/5">
                  Rechnung (PDF)
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
