'use client';

import { useEffect, useState } from 'react';
import { FREE_SHIPPING_EUR } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

const messages = [
  `Kostenloser Versand ab ${formatPrice(FREE_SHIPPING_EUR)}`,
  'Frisch geröstet und in 1–2 Werktagen versendet',
  'Persönliche Kaufberatung: montags bis freitags 9–18 Uhr',
  'Jetzt neu: Limited Edition Panama Geisha',
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative z-[60] h-9 overflow-hidden bg-espresso-950 text-cream-100">
      <div className="container flex h-full items-center justify-center container-px">
        <p key={index} className="animate-fade-in text-center text-[12px] font-medium tracking-wide">
          {messages[index]}
        </p>
      </div>
    </div>
  );
}
