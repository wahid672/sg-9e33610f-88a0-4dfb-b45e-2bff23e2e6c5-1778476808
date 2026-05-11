import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Categories } from "@/components/Categories";
import { TopSellers } from "@/components/TopSellers";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <FeaturedProducts />
        <Categories />
        <TopSellers />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}