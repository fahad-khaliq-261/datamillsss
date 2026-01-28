// Menu data types
export interface MenuGroup {
    name: string;
    isSubGroup?: boolean;
    items: string[];
}

export interface Submenu {
    title: string;
    groups: MenuGroup[];
}

export interface AboutContent {
    title: string;
    paragraphs: string[];
}

export interface MenuItem {
    id: string;
    name: string;
    submenu: Submenu | null;
    aboutContent?: AboutContent;
}

// Menu data structure
export const menuData: MenuItem[] = [
    {
        id: 'industries',
        name: 'Industries',
        submenu: {
            title: 'Industries',
            groups: [
                {
                    name: 'Column 1',
                    items: [
                        'Aerospace & Defense',
                        'Agriculture',
                        'Automotive & Assembly',
                        'Chemicals',
                        'Consumer Packaged Goods',
                        'Education',
                        'Electric Power & Natural Gas'
                    ]
                },
                {
                    name: 'Column 2',
                    items: [
                        'Energy and Materials',
                        'Engineering & Construction',
                        'Financial Services',
                        'Healthcare',
                        'Industrials & Electronics',
                        'Infrastructure',
                        'Life Sciences'
                    ]
                },
                {
                    name: 'Column 3',
                    items: [
                        'Logistics',
                        'Metals & Mining',
                        'Oil & Gas',
                        'Packaging & Paper',
                        'Private Capital',
                        'Public Sector',
                        'Real Estate'
                    ]
                },
                {
                    name: 'Column 4',
                    items: [
                        'Retail',
                        'Semiconductors',
                        'Social Sector',
                        'Technology & Telecommunications',
                        'Travel'
                    ]
                }
            ]
        }
    },
    {
        id: 'capabilities',
        name: 'Capabilities',
        submenu: {
            title: 'Capabilities',
            groups: [
                {
                    name: 'Column 1',
                    items: [
                        'Data Engineering',
                        'Business Intelligence',
                        'Predictive Analytics',
                        'Machine Learning',
                        'Natural Language Processing'
                    ]
                },
                {
                    name: 'Column 2',
                    items: [
                        'Computer Vision',
                        'Research - Math',
                        'Research - CS',
                        'Research - Finance/Eco',
                        'Data Governance'
                    ]
                },
                {
                    name: 'Column 3',
                    items: [
                        'Digital Transformation',
                        'Technology Consulting',
                        'Operations Strategy',
                        'Process Automation'
                    ]
                }
            ]
        }
    },
    {
        id: 'techstack',
        name: 'Tech & AI',
        submenu: {
            title: 'Tech & AI',
            groups: [
                {
                    name: 'Column 1',
                    items: [
                        'Cybersecurity',
                        'Data Governance',
                        'Cloud Architecture',
                        'Software Engineering',
                        'DevOps & MLOps'
                    ]
                },
                {
                    name: 'Column 2',
                    items: [
                        'AI Vision',
                        'AI Text & NLP',
                        'AI Speech',
                        'Agentic AI',
                        'LLM Fine-tuning'
                    ]
                },
                {
                    name: 'Column 3',
                    items: [
                        'FastAPI / Docker',
                        'Cloud Infrastructure',
                        'Tableau / Power BI',
                        'Data Pipelines'
                    ]
                }
            ]
        }
    },
    {
        id: 'insights',
        name: 'Our Insights',
        submenu: {
            title: 'Our Insights',
            groups: [
                {
                    name: 'Column 1',
                    items: [
                        'Featured Insights',
                        'Case Studies',
                        'Industry Reports',
                        'Research Papers'
                    ]
                },
                {
                    name: 'Column 2',
                    items: [
                        'Whitepapers',
                        'Webinars',
                        'Podcasts',
                        'Videos'
                    ]
                },
                {
                    name: 'Column 3',
                    items: [
                        'News & Updates',
                        'Expert Opinions',
                        'Trends & Analysis'
                    ]
                }
            ]
        }
    },
    {
        id: 'careers',
        name: 'Careers',
        submenu: {
            title: 'Careers',
            groups: [
                {
                    name: 'Column 1',
                    items: [
                        'Open Positions',
                        'Internships',
                        'Graduate Programs',
                        'Experienced Professionals'
                    ]
                },
                {
                    name: 'Column 2',
                    items: [
                        'Life at Datamills',
                        'Our Culture',
                        'Benefits & Perks',
                        'Learning & Development'
                    ]
                },
                {
                    name: 'Column 3',
                    items: [
                        'Diversity & Inclusion',
                        'Our Locations',
                        'FAQ'
                    ]
                }
            ]
        }
    },
    {
        id: 'about',
        name: 'About Us',
        submenu: null,
        aboutContent: {
            title: 'About Data-Mills',
            paragraphs: [
                "In today's fast-moving world, data is your most valuable asset; but only if you know how to use it. That is where Data-Mills comes in. We are a team of data experts, AI specialists, and researchers who help organizations solve real-world problems using the power of data and AI. From helping hospitals streamline paperwork and enhancing brand reach through data-driven social media marketing to making cities safer with smart surveillance, we make data work for people.",
                "Our mission is simple: help organizations unlock the full power of data and artificial intelligence to solve real challenges, drive innovation, and make better decisions. Whether it's automating healthcare processes, improving financial insights, or securing city-wide surveillance, Data-Mills delivers solutions that are impactful, intelligent, and built for the future."
            ]
        }
    },
    {
        id: 'blog',
        name: 'Datamills Blog',
        submenu: null
    }
];
