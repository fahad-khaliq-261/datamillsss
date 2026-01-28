"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './Sidebar';
import { menuData, MenuItem } from './menuData';

// Hamburger Button Component - McKinsey Style (3 horizontal lines) with hover
interface HamburgerButtonProps {
    onClick: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
        aria-label="Toggle Menu"
    >
        <span className="w-6 h-[2px] bg-white transition-all duration-200 group-hover:bg-white/70 group-hover:w-5" />
        <span className="w-6 h-[2px] bg-white transition-all duration-200 group-hover:bg-white/70" />
        <span className="w-6 h-[2px] bg-white transition-all duration-200 group-hover:bg-white/70 group-hover:w-5" />
    </button>
);

// Logo Component
const Logo: React.FC = () => (
    <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-2">
            <Image
                src="/logo.png"
                alt="Datamills Logo"
                fill
                className="object-contain"
                priority
            />
        </div>
        <span className="text-lg font-semibold text-white tracking-tight">
            Datamills
        </span>
    </Link>
);

// Search Button Component
const SearchButton: React.FC = () => (
    <button 
        className="w-12 h-12 flex items-center justify-center text-white/90 hover:text-white transition-colors"
        aria-label="Search"
    >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </button>
);

// Helper function to convert item name to URL slug
const toSlug = (name: string): string => {
    return name
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

// Get the base path for menu items
const getBasePath = (menuId: string): string => {
    const pathMap: Record<string, string> = {
        'industries': '/industries',
        'capabilities': '/capabilities',
        'techstack': '/tech',
        'insights': '/insights',
        'careers': '/careers',
    };
    return pathMap[menuId] || '';
};

// Dropdown Panel Component - McKinsey Style
interface DropdownPanelProps {
    menu: MenuItem;
    isVisible: boolean;
    onClose: () => void;
}

const DropdownPanel: React.FC<DropdownPanelProps> = ({ menu, isVisible, onClose }) => {
    if (!menu.submenu) return null;
    
    // Flatten all items from all groups
    const allItems = menu.submenu.groups.flatMap(group => group.items);
    
    // Split into 4 columns for McKinsey style
    const itemsPerColumn = Math.ceil(allItems.length / 4);
    const columns = [
        allItems.slice(0, itemsPerColumn),
        allItems.slice(itemsPerColumn, itemsPerColumn * 2),
        allItems.slice(itemsPerColumn * 2, itemsPerColumn * 3),
        allItems.slice(itemsPerColumn * 3),
    ].filter(col => col.length > 0);

    const basePath = getBasePath(menu.id);

    return (
        <div 
            className={`absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 ${
                isVisible 
                    ? 'opacity-100 visible translate-y-0' 
                    : 'opacity-0 invisible -translate-y-2'
            }`}
        >
            <div className="max-w-[1400px] mx-auto px-8 py-8">
                {/* Panel Header */}
                <div className="inline-flex items-center gap-2 mb-8">
                    <span className="text-2xl font-bold text-[#0a192f] underline decoration-2 underline-offset-8">
                        {menu.submenu.title}
                    </span>
                    <svg 
                        className="w-6 h-6 text-blue-600" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>

                {/* Items Grid - 4 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-0">
                    {columns.map((column, colIndex) => (
                        <ul key={colIndex} className="space-y-1">
                            {column.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                    <Link
                                        href={`${basePath}/${toSlug(item)}`}
                                        className="block py-2 text-[15px] text-[#1a365d] hover:text-blue-600 transition-colors"
                                        onClick={onClose}
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Nav Item Component with Dropdown
interface NavItemProps {
    menu: MenuItem;
    isActive: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ menu, isActive, onMouseEnter, onMouseLeave }) => {
    // Only show dropdown arrow for items with actual submenu dropdown
    const hasDropdown = !!menu.submenu;
    
    return (
        <div 
            className="relative"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <button
                className={`flex items-center gap-1 px-3 py-4 text-[14px] font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-white/80 hover:text-white'
                }`}
            >
                {menu.name}
                {hasDropdown && (
                    <svg 
                        className={`w-3 h-3 ml-0.5 transition-transform ${isActive ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                )}
            </button>
            
            {/* Active indicator line */}
            <div className={`absolute bottom-0 left-3 right-3 h-[3px] bg-[#c4a052] transition-all ${
                isActive ? 'opacity-100' : 'opacity-0'
            }`} />
        </div>
    );
};

// Main Navbar Component
export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMouseEnter = (menuId: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        const menu = menuData.find(m => m.id === menuId);
        if (menu?.submenu) {
            setActiveDropdown(menuId);
        }
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 100);
    };

    const handleDropdownMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const handleDropdownMouseLeave = () => {
        // Close immediately when leaving dropdown area
        setActiveDropdown(null);
    };

    const closeDropdown = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setActiveDropdown(null);
    };

    const activeMenu = menuData.find(m => m.id === activeDropdown);

    return (
        <>
            {/* Main Navbar */}
            <nav
                ref={navRef}
                className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
                    isScrolled
                        ? 'bg-[#0a192f]/95 backdrop-blur-md shadow-lg'
                        : 'bg-[#0a192f]'
                }`}
                role="navigation"
                aria-label="Main Navigation"
            >
                <div className="max-w-[1600px] mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between h-14">
                        
                        {/* Left Section - Hamburger + Logo */}
                        <div className="flex items-center">
                            <HamburgerButton onClick={() => setIsSidebarOpen(true)} />
                            <div className="h-6 w-px bg-white/30 mx-3" />
                            <Logo />
                        </div>

                        {/* Center Section - Nav Items */}
                        <div className="hidden lg:flex items-center">
                            {menuData.map((menu) => (
                                <NavItem
                                    key={menu.id}
                                    menu={menu}
                                    isActive={activeDropdown === menu.id}
                                    onMouseEnter={() => handleMouseEnter(menu.id)}
                                    onMouseLeave={handleMouseLeave}
                                />
                            ))}
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-1">
                            <Link 
                                href="#" 
                                className="hidden md:block px-3 py-2 text-[13px] font-medium text-white/90 hover:text-white transition-colors"
                            >
                                Sign In
                            </Link>
                            <span className="hidden md:block text-white/50">|</span>
                            <Link 
                                href="#" 
                                className="hidden md:block px-3 py-2 text-[13px] font-medium text-white/90 hover:text-white transition-colors"
                            >
                                Subscribe
                            </Link>
                            <SearchButton />
                        </div>
                    </div>
                </div>

                {/* Dropdown Panel */}
                {activeMenu && (
                    <div
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                    >
                        <DropdownPanel 
                            menu={activeMenu} 
                            isVisible={!!activeDropdown}
                            onClose={closeDropdown}
                        />
                    </div>
                )}
            </nav>

            {/* Sidebar for Mobile / Hamburger */}
            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />
        </>
    );
};
