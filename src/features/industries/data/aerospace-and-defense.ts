import { IndustryConfig } from "../types";

export const aerospaceDefenseConfig: IndustryConfig = {
  slug: "aerospace-and-defense",
  title: "Aerospace & Defense",
  metaTitle: "Aerospace & Defense | Datamills",
  metaDescription:
    "How Datamills helps aerospace and defense organizations with advanced analytics, AI, and digital transformation.",

  heroDescription:
    "Transforming defense and aerospace operations through advanced analytics, artificial intelligence, and cutting-edge technology solutions.",
  heroBackgroundImage: "/industries/aerospace-hero.jpg",

  accentColor: "blue",

  stats: [
    { value: "50+", label: "Defense Projects" },
    { value: "$2B+", label: "Cost Savings Delivered" },
    { value: "15+", label: "Years Experience" },
    { value: "99.9%", label: "System Uptime" },
  ],

  helpAreas: [
    {
      title: "Defense Analytics",
      description:
        "Advanced threat detection, intelligence analysis, and predictive modeling for defense operations.",
      icon: "🛡️",
    },
    {
      title: "Supply Chain Optimization",
      description:
        "End-to-end supply chain visibility, demand forecasting, and logistics optimization.",
      icon: "📦",
    },
    {
      title: "Predictive Maintenance",
      description:
        "AI-powered maintenance scheduling to maximize aircraft and equipment availability.",
      icon: "⚙️",
    },
    {
      title: "Cybersecurity Solutions",
      description:
        "Advanced threat detection and security analytics for critical infrastructure.",
      icon: "🔒",
    },
    {
      title: "Mission Planning",
      description:
        "Data-driven mission planning and operational analytics platforms.",
      icon: "🎯",
    },
    {
      title: "Digital Transformation",
      description:
        "Modernizing legacy systems and implementing cloud-native solutions.",
      icon: "🚀",
    },
  ],

  helpSectionDescription:
    "We partner with aerospace and defense organizations to solve their most complex challenges through data-driven solutions.",

  insights: [
    {
      category: "Article",
      title: "The future of defense: AI-powered decision making",
      date: "January 2026",
      image: "/insights/defense-ai.jpg",
    },
    {
      category: "Case Study",
      title: "How we helped a defense contractor reduce maintenance costs by 40%",
      date: "December 2025",
      image: "/insights/maintenance.jpg",
    },
    {
      category: "Report",
      title: "Aerospace supply chain resilience in the digital age",
      date: "November 2025",
      image: "/insights/supply-chain.jpg",
    },
  ],

  ctaTitle: "Ready to transform your operations?",
  ctaDescription:
    "Let's discuss how our aerospace and defense expertise can help you achieve your strategic objectives.",

  relatedIndustries: [
    { name: "Technology & Telecommunications", slug: "technology" },
    { name: "Public Sector", slug: "public-sector" },
    { name: "Energy & Utilities", slug: "energy" },
  ],
};

