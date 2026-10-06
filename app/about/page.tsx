import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutCinematicHero from "@/components/about/AboutCinematicHero";
import ServiceStory from "@/components/about/ServiceStory";
import CraftGrid from "@/components/about/CraftGrid";
import ProcessFlow from "@/components/about/ProcessFlow";
import FinalStatement from "@/components/about/FinalStatement";
import AboutFinalCTA from "@/components/about/AboutFinalCTA";
import { company } from "@/lib/data";

export default function AboutPage() {
  return (
    <main id="main" className="bg-ink text-paper">
      <Navbar />

      <AboutCinematicHero />

      <ServiceStory />

      <CraftGrid />

      <ProcessFlow />

      {/* Leadership — kept factual, no invented history or figures */}
      <section className="hr-line py-20">
        <div className="container-sbi grid md:grid-cols-2 gap-10 max-w-2xl">
          <div>
            <p className="text-xs text-clay tracking-wide mb-2">Chairman</p>
            <h3 className="font-serif text-2xl">{company.chairman}</h3>
          </div>
          <div>
            <p className="text-xs text-clay tracking-wide mb-2">Director</p>
            <h3 className="font-serif text-2xl">{company.director}</h3>
          </div>
        </div>
      </section>

      <FinalStatement />

      <AboutFinalCTA />

      <Footer />
    </main>
  );
}
