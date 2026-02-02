import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  IndustryPageTemplate,
  getIndustryConfig,
  getAllIndustrySlugs,
  getIndustryInsights,
} from "@/features/industries";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getIndustryConfig(slug);
  
  if (!config) {
    return {
      title: "Industry Not Found | Datamills",
    };
  }
  
  return {
    title: config.metaTitle,
    description: config.metaDescription,
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const config = getIndustryConfig(slug);
  
  if (!config) {
    notFound();
  }
  
  // Fetch insights from Supabase ONLY (no static data)
  const insights = await getIndustryInsights(config.slug);

  // Create config with Supabase insights
  const configWithInsights = {
    ...config,
    insights,
  };

  return <IndustryPageTemplate config={configWithInsights} />;
}

