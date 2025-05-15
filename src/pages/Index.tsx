
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import TechnologySection from "../components/TechnologySection";
import ImpactSection from "../components/ImpactSection";
import AppSection from "../components/AppSection";
import PricingSection from "../components/PricingSection";
import SupportSection from "../components/SupportSection";
import Footer from "../components/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "Energram - Powering the Future with Solar + Intelligence";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <TechnologySection />
        <ImpactSection />
        <AppSection />
        <PricingSection />
        <SupportSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
