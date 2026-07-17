import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import Benefits1 from "@/components/landing/benefits1";
import Benefits2 from "@/components/landing/benefits2";
import HowItWorks from "@/components/landing/how-it-works";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Benefits1 />
      <Benefits2 />
      <HowItWorks />
    </main>
  );
}