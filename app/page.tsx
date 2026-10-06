import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import ShowcaseGallery from "@/components/ShowcaseGallery";
import SiteDrawing from "@/components/SiteDrawing";
import SelectedWork from "@/components/SelectedWork";
import BeforeAfter from "@/components/BeforeAfter";
import InquiryCTA from "@/components/InquiryCTA";
import Footer from "@/components/Footer";

// One continuous story: entry → introduction → sideways showcase →
// site drawing → selected work → before/after → inquiry → contact (footer).
export default function Home() {
  return (
    <main id="main" className="bg-ink text-paper">
      <Navbar />
      <Hero />
      <IntroSection />
      <ShowcaseGallery />
      <SiteDrawing />
      <SelectedWork />
      <BeforeAfter />
      <InquiryCTA />
      <Footer />
    </main>
  );
}
