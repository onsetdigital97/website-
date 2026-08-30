'use client';

import { useState } from 'react';
import { Clock, MapPin, Users, Check, CheckCircle2 } from 'lucide-react';
import { Course } from '@/lib/types';
import { formatPrice, cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export function CourseBooking({ course }: { course: Course }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(course.dates.find((d) => d.seatsBooked < d.seatsTotal)?.id ?? null);
  const [booked, setBooked] = useState(false);

  if (booked) {
    const date = course.dates.find((d) => d.id === selectedDate);
    return (
      <div className="flex flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 size={36} className="text-emerald-600" />
        <p className="mt-4 font-display text-lg font-semibold text-ink-900">Kursplatz reserviert!</p>
        <p className="mt-2 text-sm text-ink-600">
          {course.title} am {date && new Date(date.date).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}. Eine Bestätigung folgt per E-Mail.
        </p>
      </div>
    );
  }

  const dateOption = course.dates.find((d) => d.id === selectedDate);

  return (
    <div>
      <p className="eyebrow text-copper-500">{course.level}</p>
      <h1 className="mt-1.5 font-display text-display-sm font-semibold text-ink-900">{course.title}</h1>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink-500">
        <span className="flex items-center gap-1.5">
          <Clock size={14} /> {course.durationHours} Stunden
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin size={14} /> {course.location}
        </span>
      </div>
      <p className="mt-4 font-display text-2xl font-semibold text-ink-900">{formatPrice(course.price)}</p>
      <p className="text-xs text-ink-400">pro Person</p>

      <div className="mt-6">
        <p className="text-sm font-semibold text-ink-900">Termin wählen</p>
        <div className="mt-3 space-y-2.5">
          {course.dates.map((d) => {
            const soldOut = d.seatsBooked >= d.seatsTotal;
            const seatsLeft = d.seatsTotal - d.seatsBooked;
            return (
              <label
                key={d.id}
                className={cn(
                  'flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors',
                  soldOut ? 'cursor-not-allowed border-ink-900/10 opacity-50' : selectedDate === d.id ? 'border-copper-500 bg-copper-50' : 'border-ink-900/15 hover:border-copper-300'
                )}
              >
                <span className="flex items-center gap-3">
                  <input type="radio" name="date" disabled={soldOut} checked={selectedDate === d.id} onChange={() => setSelectedDate(d.id)} className="h-4 w-4 text-copper-500 focus:ring-copper-500" />
                  <span>
                    <span className="block text-sm font-semibold text-ink-900">
                      {new Date(d.date).toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long' })}
                    </span>
                    <span className="block text-xs text-ink-500">{d.time}</span>
                  </span>
                </span>
                <span className={cn('flex items-center gap-1 text-xs font-semibold', soldOut ? 'text-terracotta-600' : 'text-emerald-700')}>
                  <Users size={13} /> {soldOut ? 'Ausgebucht' : `${seatsLeft} Plätze frei`}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <Button variant="primary" size="lg" className="mt-6 w-full" disabled={!dateOption || dateOption.seatsBooked >= dateOption.seatsTotal} onClick={() => setBooked(true)}>
        Kursplatz buchen
      </Button>

      <div className="mt-6 border-t border-ink-900/10 pt-6">
        <p className="text-sm font-semibold text-ink-900">Leistungsumfang</p>
        <ul className="mt-3 space-y-2">
          {course.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-ink-600">
              <Check size={15} className="mt-0.5 shrink-0 text-copper-500" /> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
