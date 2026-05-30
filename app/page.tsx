import Navbar from "@/components/Navbar";
import ScarcityRibbon from "@/components/ScarcityRibbon";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

// Admin edits purge this route on-demand via revalidatePath("/").
// This is a safety net so out-of-band DB edits (Supabase dashboard, SQL)
// still surface within 10 minutes.
export const revalidate = 600;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ussly",
  description:
    "Independent web design studio hand-coding websites for local businesses with character.",
  url: "https://ussly.design",
  email: "hello@ussly.design",
  telephone: "+1-425-954-3019",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lynnwood",
    addressRegion: "WA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Lynnwood" },
    { "@type": "City", name: "Seattle" },
    { "@type": "AdministrativeArea", name: "Puget Sound" },
  ],
  knowsAbout: [
    "Web design",
    "Brand systems",
    "Hand-coded websites",
    "Restaurant websites",
    "Local SEO",
  ],
  sameAs: [
    "https://instagram.com/usslydesignss",
    "https://tiktok.com/@usslydesigns",
    "https://www.are.na/ussly-designs",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <ScarcityRibbon />
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
