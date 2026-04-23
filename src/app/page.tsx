import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TrustedSection from "./components/TrustedSection";
import FeaturesSection from "./components/FeaturesSection";
import AppScreensSection from "./components/AppScreensSection";
import MiniScreensSection from "./components/MiniScreensSection";
import PricingSection from "./components/PricingSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="dark bg-background text-foreground min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustedSection />
      <FeaturesSection />
      <AppScreensSection />
      <MiniScreensSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
