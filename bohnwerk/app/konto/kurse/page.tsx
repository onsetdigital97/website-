'use client';

import Image from 'next/image';
import { GraduationCap } from 'lucide-react';
import { RequireAuth } from '@/components/account/RequireAuth';
import { courses } from '@/lib/data';
import { LinkButton } from '@/components/ui/Button';

export default function CourseBookingsPage() {
  return (
    <RequireAuth>
      <CourseBookingsContent />
    </RequireAuth>
  );
}

function CourseBookingsContent() {
  const booked = [{ course: courses[0], date: courses[0].dates[0] }];

  return (
    <div>
      <h1 className="font-display text-display-sm font-semibold text-ink-900">Kursbuchungen</h1>
      {booked.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink-900/15 py-16 text-center">
          <GraduationCap size={36} className="text-ink-300" />
          <p className="font-display text-lg font-semibold text-ink-900">Noch keine Kurse gebucht</p>
          <LinkButton href="/kurse" variant="primary" size="sm">
            Kurse entdecken
          </LinkButton>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {booked.map(({ course, date }) => (
            <div key={course.id} className="flex flex-col gap-4 rounded-2xl border border-ink-900/10 p-5 sm:flex-row sm:items-center">
              <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-28">
                <Image src={course.image} alt="" fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-display text-sm font-semibold text-ink-900">{course.title}</p>
                <p className="mt-1 text-xs text-ink-500">
                  {new Date(date.date).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })} · {date.time} · {course.location}
                </p>
              </div>
              <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Bestätigt</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
