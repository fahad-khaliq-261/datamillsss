// Industry Page Types - Centralized type definitions for all industry pages

export interface HelpArea {
  title: string;
  description: string;
  icon: string;
}

export interface Insight {
  category: string;
  title: string;
  slug?: string;
  summary?: string;
  date: string;
  image?: string;
  href?: string; // Legacy - for static insights without slugs
}

export interface Stat {
  value: string;
  label: string;
}

export interface RelatedIndustry {
  name: string;
  slug: string;
}

export interface IndustryConfig {
  // Metadata
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  
  // Hero Section
  heroDescription: string;
  heroBackgroundImage?: string;
  
  // Theme customization
  accentColor: 'blue' | 'cyan' | 'purple' | 'emerald' | 'amber' | 'rose';
  
  // Content sections
  stats: Stat[];
  helpAreas: HelpArea[];
  helpSectionDescription: string;
  insights: Insight[];
  
  // CTA Section
  ctaTitle: string;
  ctaDescription: string;
  
  // Related Industries
  relatedIndustries: RelatedIndustry[];
}

// Accent color mappings for consistent theming
export const accentColorClasses = {
  blue: {
    text: 'text-blue-600',
    textHover: 'hover:text-blue-700',
    border: 'hover:border-blue-500',
    groupHover: 'group-hover:text-blue-600',
  },
  cyan: {
    text: 'text-cyan-600',
    textHover: 'hover:text-cyan-700',
    border: 'hover:border-cyan-500',
    groupHover: 'group-hover:text-cyan-600',
  },
  purple: {
    text: 'text-purple-600',
    textHover: 'hover:text-purple-700',
    border: 'hover:border-purple-500',
    groupHover: 'group-hover:text-purple-600',
  },
  emerald: {
    text: 'text-emerald-600',
    textHover: 'hover:text-emerald-700',
    border: 'hover:border-emerald-500',
    groupHover: 'group-hover:text-emerald-600',
  },
  amber: {
    text: 'text-amber-600',
    textHover: 'hover:text-amber-700',
    border: 'hover:border-amber-500',
    groupHover: 'group-hover:text-amber-600',
  },
  rose: {
    text: 'text-rose-600',
    textHover: 'hover:text-rose-700',
    border: 'hover:border-rose-500',
    groupHover: 'group-hover:text-rose-600',
  },
} as const;

