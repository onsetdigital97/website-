import { FlavorProfile as FlavorProfileType } from '@/lib/types';

const labels: { key: keyof FlavorProfileType; label: string }[] = [
  { key: 'saeure', label: 'Säure' },
  { key: 'koerper', label: 'Körper' },
  { key: 'suesse', label: 'Süße' },
  { key: 'intensitaet', label: 'Intensität' },
  { key: 'roestgrad', label: 'Röstgrad' },
];

export function FlavorProfile({ profile }: { profile: FlavorProfileType }) {
  return (
    <div className="space-y-3.5">
      {labels.map(({ key, label }) => (
        <div key={key}>
          <div className="mb-1 flex items-center justify-between text-xs font-medium text-ink-700">
            <span>{label}</span>
            <span className="text-ink-300">{profile[key]}/5</span>
          </div>
          <div className="flex gap-1" role="img" aria-label={`${label}: ${profile[key]} von 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`h-2 flex-1 rounded-full ${i < profile[key] ? 'bg-copper-500' : 'bg-ink-900/10'}`} aria-hidden="true" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
