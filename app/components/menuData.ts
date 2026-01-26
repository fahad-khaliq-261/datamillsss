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
        id: 'datamills',
        name: 'Datamills',
        submenu: {
            title: 'Datamills',
            groups: [
                {
                    name: 'Researcher',
                    isSubGroup: true,
                    items: ['Math', 'CS', 'Finance / Eco']
                },
                {
                    name: 'Targeted Industry',
                    items: ['Legal Health', 'Retail', 'Digital Marketing']
                },
                {
                    name: 'Healthcare',
                    isSubGroup: true,
                    items: []
                }
            ]
        }
    },
    {
        id: 'techstack',
        name: 'Tech Stack',
        submenu: {
            title: 'Tech Stack',
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
        id: 'capabilities',
        name: 'Capabilities',
        submenu: null
    },
    {
        id: 'insights',
        name: 'Our Insights',
        submenu: null
    },
    {
        id: 'about',
        name: 'About Us',
        submenu: null
    },
    {
        id: 'blog',
        name: 'Blog',
        submenu: null
    }
];

