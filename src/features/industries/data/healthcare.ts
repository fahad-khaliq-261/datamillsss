import { IndustryConfig } from "../types";

export const healthcareConfig: IndustryConfig = {
  slug: "healthcare",
  title: "Healthcare",
  metaTitle: "Healthcare | Datamills",
  metaDescription:
    "How Datamills helps healthcare organizations with advanced analytics, AI, and digital transformation.",

  heroDescription:
    "Transforming healthcare delivery through advanced analytics, artificial intelligence, and data-driven solutions that improve patient outcomes and operational efficiency.",

  accentColor: "cyan",

  stats: [
    { value: "100+", label: "Healthcare Projects" },
    { value: "35%", label: "Avg. Cost Reduction" },
    { value: "50M+", label: "Patient Records Analyzed" },
    { value: "99.9%", label: "HIPAA Compliance" },
  ],

  helpAreas: [
    {
      title: "Clinical Analytics",
      description:
        "Advanced patient data analysis, outcome prediction, and clinical decision support systems.",
      icon: "🏥",
    },
    {
      title: "Medical Research",
      description:
        "AI-powered research acceleration, drug discovery analytics, and clinical trial optimization.",
      icon: "🔬",
    },
    {
      title: "Patient Outcomes",
      description:
        "Predictive models for patient risk stratification and personalized treatment plans.",
      icon: "❤️",
    },
    {
      title: "Healthcare Operations",
      description:
        "Streamline administrative processes, reduce paperwork, and optimize resource allocation.",
      icon: "📋",
    },
    {
      title: "Telehealth Solutions",
      description:
        "Digital health platforms, remote patient monitoring, and virtual care analytics.",
      icon: "💻",
    },
    {
      title: "Compliance & Security",
      description:
        "HIPAA-compliant data solutions, security analytics, and regulatory reporting.",
      icon: "🔒",
    },
  ],

  helpSectionDescription:
    "We partner with healthcare organizations to solve their most complex challenges through data-driven solutions.",

  insights: [
    {
      category: "Article",
      title: "AI in Healthcare: Transforming patient care through predictive analytics",
      date: "January 2026",
    },
    {
      category: "Case Study",
      title: "How we helped a hospital network reduce readmissions by 35%",
      date: "December 2025",
    },
    {
      category: "Report",
      title: "The future of digital health: Trends shaping 2026 and beyond",
      date: "November 2025",
    },
  ],

  ctaTitle: "Ready to transform healthcare delivery?",
  ctaDescription:
    "Let's discuss how our healthcare expertise can help you improve patient outcomes and operational efficiency.",

  relatedIndustries: [
    { name: "Life Sciences", slug: "life-sciences" },
    { name: "Public Sector", slug: "public-sector" },
    { name: "Technology & Telecommunications", slug: "technology" },
  ],
};

