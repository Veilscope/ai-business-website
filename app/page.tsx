import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
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
import { createSeoMetadata } from "@/lib/seo";
import { faqJsonLd, serviceListJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = createSeoMetadata(site.metadata.home);

export default function HomePage() {
  return (
    <>
      <JsonLd data={[serviceListJsonLd(), faqJsonLd()]} />
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
