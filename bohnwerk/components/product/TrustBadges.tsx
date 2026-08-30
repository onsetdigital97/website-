import { Truck, RotateCcw, ShieldCheck, Lock } from 'lucide-react';

export function TrustBadges() {
  return (
    <ul className="grid grid-cols-2 gap-3 border-t border-ink-900/10 pt-5 text-xs text-ink-500 sm:grid-cols-4">
      <li className="flex items-center gap-1.5">
        <Truck size={15} className="text-copper-500" /> Schneller Versand
      </li>
      <li className="flex items-center gap-1.5">
        <RotateCcw size={15} className="text-copper-500" /> 14 Tage Rückgabe
      </li>
      <li className="flex items-center gap-1.5">
        <ShieldCheck size={15} className="text-copper-500" /> Käuferschutz
      </li>
      <li className="flex items-center gap-1.5">
        <Lock size={15} className="text-copper-500" /> Sichere Zahlung
      </li>
    </ul>
  );
}
