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

export interface MenuItem {
    id: string;
    name: string;
    submenu: Submenu | null;
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
                    name: 'Target Markets',
                    items: ['Legal Health', 'Retail', 'Digital Marketing', 'Financial Services', 'Education']
                },
                {
                    name: 'Healthcare',
                    isSubGroup: true,
                    items: ['Clinical Analytics', 'Medical Research', 'Patient Outcomes', 'Pharma & Life Sciences']
                },
                {
                    name: 'Technology',
                    items: ['SaaS & Software', 'Semiconductors', 'Telecommunications', 'Media & Entertainment']
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
                    name: 'Research',
                    isSubGroup: true,
                    items: ['Math', 'CS', 'Finance / Eco']
                },
                {
                    name: 'Data & Analytics',
                    items: ['Data Engineering', 'Business Intelligence', 'Predictive Analytics']
                },
                {
                    name: 'Strategy',
                    items: ['Digital Transformation', 'Technology Consulting', 'Operations']
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
                    name: 'Core Technologies',
                    items: ['Cybersecurity', 'Compliance / Data Governance', 'Architecture', 'Engineering']
                },
                {
                    name: 'AI Gen (Agentic)',
                    isSubGroup: true,
                    items: ['Vision', 'Text', 'Speech']
                },
                {
                    name: 'Integration',
                    items: ['FastAPI / Docker']
                },
                {
                    name: 'Infrastructure',
                    items: ['DevOps', 'Cloud']
                },
                {
                    name: 'Analytics',
                    items: ['Tableau / Power BI']
                }
            ]
        }
    },
    {
        id: 'insights',
        name: 'Our Insights',
        submenu: null
    },
    {
        id: 'careers',
        name: 'Careers',
        submenu: null
    },
    {
        id: 'about',
        name: 'About Us',
        submenu: null
    },
    {
        id: 'blog',
        name: 'Datamills Blog',
        submenu: null
    }
];
