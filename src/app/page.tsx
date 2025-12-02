// ===========================================
// LANDING PAGE
// ===========================================

import {
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  PricingSection,
  CTASection,
  Footer,
  SectionDivider,
} from '@/components/landing';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Wave Divider */}
      <SectionDivider variant="wave" />

      {/* Features Section */}
      <FeaturesSection />

      {/* Gradient Divider */}
      <SectionDivider variant="gradient" />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Particles Divider */}
      <SectionDivider variant="particles" />

      {/* Pricing Section */}
      <PricingSection />

      {/* Mesh Divider */}
      <SectionDivider variant="mesh" />

      {/* Final CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
