import { Hero } from '@/components/home/Hero';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { BestsellerSlider } from '@/components/home/BestsellerSlider';
import { CoffeeFinder } from '@/components/home/CoffeeFinder';
import { MachineShowcase } from '@/components/home/MachineShowcase';
import { TechSplit } from '@/components/home/TechSplit';
import { CoffeeRangeTeaser } from '@/components/home/CoffeeRangeTeaser';
import { SubscriptionTeaser } from '@/components/home/SubscriptionTeaser';
import { CoursesTeaser } from '@/components/home/CoursesTeaser';
import { BrandPromise } from '@/components/home/BrandPromise';
import { Story } from '@/components/home/Story';
import { SocialProof } from '@/components/home/SocialProof';
import { MagazineTeaser } from '@/components/home/MagazineTeaser';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { getBestsellers, getNewProducts } from '@/lib/data';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <BestsellerSlider title="Unsere Bestseller" eyebrow="Beliebt" products={getBestsellers()} viewAllHref="/kaffee" />
      <CoffeeFinder />
      <MachineShowcase />
      <TechSplit />
      <CoffeeRangeTeaser />
      <SubscriptionTeaser />
      <BestsellerSlider title="Neu eingetroffen" eyebrow="Neuheiten" products={getNewProducts()} viewAllHref="/kaffee" />
      <CoursesTeaser />
      <BrandPromise />
      <Story />
      <SocialProof />
      <MagazineTeaser />
      <NewsletterSection />
    </>
  );
}
