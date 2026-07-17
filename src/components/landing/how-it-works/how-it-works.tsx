import HowItWorksSection from "./how-it-works-section";
import InteractiveCta from "../interactive-cta";

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#1a0f2e] text-white">
      <div className="container mx-auto flex flex-col gap-20 px-4 py-20">
        <HowItWorksSection />
        <InteractiveCta />
      </div>
    </section>
  );
}
