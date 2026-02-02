import { IndustryConfig } from "../types";
import IndustryHero from "./IndustryHero";
import IndustryStats from "./IndustryStats";
import HelpAreasSection from "./HelpAreasSection";
import InsightsSection from "./InsightsSection";
import CTASection from "./CTASection";
import RelatedIndustries from "./RelatedIndustries";

interface IndustryPageTemplateProps {
  config: IndustryConfig;
}

export default function IndustryPageTemplate({ config }: IndustryPageTemplateProps) {
  return (
    <main className="min-h-screen pt-14">
      <IndustryHero
        title={config.title}
        description={config.heroDescription}
        backgroundImage={config.heroBackgroundImage}
      />

      <IndustryStats stats={config.stats} />

      <HelpAreasSection
        helpAreas={config.helpAreas}
        description={config.helpSectionDescription}
        accentColor={config.accentColor}
      />

      <InsightsSection
        insights={config.insights}
        accentColor={config.accentColor}
      />

      <CTASection
        title={config.ctaTitle}
        description={config.ctaDescription}
      />

      <RelatedIndustries industries={config.relatedIndustries} />
    </main>
  );
}

