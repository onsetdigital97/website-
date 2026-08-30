import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { courses, getCourseBySlug } from '@/lib/data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Gallery } from '@/components/product/Gallery';
import { CourseBooking } from './CourseBooking';

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const course = getCourseBySlug(params.slug);
  if (!course) return {};
  return { title: course.title, description: course.description, openGraph: { images: [course.image] } };
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);
  if (!course) notFound();

  return (
    <>
      <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: 'Barista-Kurse', href: '/kurse' }, { label: course.title }]} />
      <div className="container container-px py-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Gallery images={[course.image]} name={course.title} />
          <CourseBooking course={course} />
        </div>

        <div className="mt-16 border-t border-ink-900/10 pt-16">
          <h2 className="font-display text-display-sm font-semibold text-ink-900">Beschreibung</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-600">{course.description}</p>
        </div>
      </div>
    </>
  );
}
