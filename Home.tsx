/* ============================================================
   SQUISHLY Home Page – Assembles all landing page sections
   Design: Dreamy Glassmorphism + Organic Softness
   Sections: Navbar, Hero, Products, HowItWorks, Benefits,
             SocialProof, Preorder, CTA, Footer
   ============================================================ */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BenefitsSection from "@/components/BenefitsSection";
import StudentBusinessSection from "@/components/StudentBusinessSection";
import PreorderSection from "@/components/PreorderSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProductSection />
      <HowItWorksSection />
      <BenefitsSection />
      <StudentBusinessSection />
      <PreorderSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
