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

export default function Home() {
  return (
    <>
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
