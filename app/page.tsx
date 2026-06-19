import type { Metadata } from "next";

import { ContentPreview } from "@/components/sections/ContentPreview";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarketSection } from "@/components/sections/MarketSection";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServiceOverview } from "@/components/sections/ServiceOverview";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { site } from "@/config/site";
import { faqs } from "@/content/faqs";

export const metadata: Metadata = site.metadata.home;

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ServiceOverview />
      <ProcessSection />
      <UseCasesSection />
      <MarketSection />
      <PrinciplesSection />
      <ContentPreview />
      <FAQSection faqs={faqs} />
      <CTASection />
    </>
  );
}
