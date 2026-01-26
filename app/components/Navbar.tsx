"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

// Menu data structure
const menuData = [
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

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when sidebar is open
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isSidebarOpen]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        if (!isSidebarOpen) {
            setActiveMenu(null);
        }
    };

    const handleMenuClick = (menuId: string) => {
        setActiveMenu(activeMenu === menuId ? null : menuId);
    };

    const activeMenuData = menuData.find(m => m.id === activeMenu);

    return (
        <>
            {/* Main Navbar */}
            <nav
                className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 md:px-10 py-4 ${isScrolled
                    ? 'bg-[#0a192f]/95 backdrop-blur-xl border-b border-blue-900/50 shadow-2xl'
                    : 'bg-[#0a192f]'
                    }`}
                role="navigation"
                aria-label="Main Navigation"
            >
                <div className="max-w-[1440px] mx-auto flex justify-between items-center">
                    {/* Left side - Hamburger + Logo */}
                    <div className="flex items-center gap-4">
                        {/* Hamburger Menu Button */}
                        <button
                            onClick={toggleSidebar}
                            className="relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 group"
                            aria-label="Toggle Menu"
                            aria-expanded={isSidebarOpen}
                        >
                            <span className={`block w-6 h-0.5 bg-blue-100/80 transition-all duration-300 ${isSidebarOpen ? 'rotate-45 translate-y-2' : 'group-hover:w-7'}`} />
                            <span className={`block w-6 h-0.5 bg-blue-100/80 transition-all duration-300 ${isSidebarOpen ? 'opacity-0' : 'group-hover:w-5'}`} />
                            <span className={`block w-6 h-0.5 bg-blue-100/80 transition-all duration-300 ${isSidebarOpen ? '-rotate-45 -translate-y-2' : 'group-hover:w-7'}`} />
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center group">
                            <div className="relative h-10 w-10 md:h-12 md:w-12 transition-transform duration-300 group-hover:scale-110">
                                <Image
                                    src="/logo.png"
                                    alt="Portfolio Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <span className="ml-3 text-xl font-bold text-white tracking-tight hidden md:block">
                                Datamills
                            </span>
                        </Link>
                    </div>

                    {/* Right side - Quick links */}
                    <div className="hidden lg:flex items-center gap-6">
                        <Link href="#" className="text-[13px] font-medium tracking-wide text-blue-100/70 hover:text-white transition-colors">
                            Contact
                        </Link>
                        <Link href="#" className="text-[13px] font-medium tracking-wide text-blue-100/70 hover:text-white transition-colors">
                            Search
                        </Link>
                        <button className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-sm hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/20">
                            Get Started
                        </button>
                    </div>

                    {/* Mobile menu icon */}
                    <button className="lg:hidden p-2">
                        <svg className="w-5 h-5 text-blue-100/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Backdrop Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity duration-500 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={toggleSidebar}
            />

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full z-[95] flex transition-transform duration-500 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Left Panel - Main Menu */}
                <div className="w-[280px] md:w-[340px] h-full bg-[#0a192f] border-r border-blue-900/30 flex flex-col">
                    {/* Header */}
                    <div className="h-[72px] px-6 flex items-center justify-between border-b border-blue-900/30">
                        <button
                            onClick={toggleSidebar}
                            className="w-10 h-10 flex items-center justify-center text-blue-100/80 hover:text-white transition-colors"
                            aria-label="Close Menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <Link href="/" className="flex items-center gap-2" onClick={toggleSidebar}>
                            <div className="relative h-8 w-8">
                                <Image
                                    src="/logo.png"
                                    alt="Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-lg font-bold text-white">Datamills</span>
                        </Link>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 py-6 overflow-y-auto custom-scrollbar">
                        <ul className="space-y-1">
                            {menuData.map((menu) => (
                                <li key={menu.id}>
                                    <button
                                        onClick={() => menu.submenu && handleMenuClick(menu.id)}
                                        onMouseEnter={() => setHoveredItem(menu.id)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        className={`w-full px-6 py-4 flex items-center justify-between text-left transition-all duration-300 group ${activeMenu === menu.id
                                            ? 'bg-blue-900/30 border-l-[3px] border-cyan-400'
                                            : 'border-l-[3px] border-transparent hover:bg-blue-900/20 hover:border-blue-400/50'
                                            }`}
                                    >
                                        <span className={`text-[15px] font-semibold tracking-wide transition-colors ${activeMenu === menu.id ? 'text-cyan-400' : 'text-blue-100/90 group-hover:text-white'
                                            }`}>
                                            {menu.name}
                                        </span>
                                        {menu.submenu && (
                                            <svg
                                                className={`w-5 h-5 transition-all duration-300 ${activeMenu === menu.id
                                                    ? 'text-cyan-400 rotate-0'
                                                    : 'text-blue-100/50 group-hover:text-white group-hover:translate-x-1'
                                                    }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Footer Links */}
                    <div className="p-6 border-t border-blue-900/30">
                        <div className="flex flex-wrap gap-4 text-sm">
                            <Link href="#" className="text-blue-100/60 hover:text-cyan-400 transition-colors">Contact</Link>
                            <Link href="#" className="text-blue-100/60 hover:text-cyan-400 transition-colors">LinkedIn</Link>
                            <Link href="#" className="text-blue-100/60 hover:text-cyan-400 transition-colors">GitHub</Link>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Submenu */}
                <div
                    className={`w-[320px] md:w-[500px] lg:w-[700px] h-full bg-[#f8fafc] transition-all duration-500 overflow-hidden ${activeMenu ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {activeMenuData?.submenu && (
                        <div className="h-full flex flex-col">
                            {/* Submenu Header */}
                            <div className="h-[72px] px-8 flex items-center border-b border-gray-200">
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 text-[#0a192f] hover:text-cyan-600 transition-colors group"
                                >
                                    <span className="text-xl font-bold">{activeMenuData.submenu.title}</span>
                                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Submenu Content */}
                            <div className="flex-1 p-8 overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {activeMenuData.submenu.groups.map((group, groupIndex) => (
                                        <div key={groupIndex} className="space-y-4">
                                            <h3 className={`text-sm font-bold uppercase tracking-wider ${group.isSubGroup ? 'text-cyan-600' : 'text-gray-500'
                                                }`}>
                                                {group.name}
                                                {group.isSubGroup && (
                                                    <span className="ml-2 text-[10px] px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded-full">
                                                        Sub
                                                    </span>
                                                )}
                                            </h3>
                                            <ul className="space-y-3">
                                                {group.items.map((item, itemIndex) => (
                                                    <li key={itemIndex}>
                                                        <Link
                                                            href="#"
                                                            className="text-[15px] text-[#1a365d] hover:text-cyan-600 transition-colors font-medium inline-block relative group"
                                                        >
                                                            {item}
                                                            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full" />
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Custom Scrollbar Styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(100, 200, 255, 0.3);
                    border-radius: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(100, 200, 255, 0.5);
                }
            `}</style>
        </>
    );
};
