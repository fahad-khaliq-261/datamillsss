"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { menuData } from './menuData';

// Hamburger Button Component - McKinsey Style (3 horizontal lines)
interface HamburgerButtonProps {
    onClick: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-white hover:opacity-80 transition-opacity"
        aria-label="Toggle Menu"
    >
        <span className="w-6 h-[2px] bg-white" />
        <span className="w-6 h-[2px] bg-white" />
        <span className="w-6 h-[2px] bg-white" />
    </button>
);

// Logo Component - McKinsey Style
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

// Nav Item Component - McKinsey Style
interface NavItemProps {
    label: string;
    hasDropdown: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, hasDropdown, onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-1 px-3 py-2 text-[13px] font-medium text-white/90 hover:text-white transition-colors"
    >
        {label}
        {hasDropdown && (
            <svg 
                className="w-3 h-3 ml-0.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        )}
    </button>
);

// Search Button Component
const SearchButton: React.FC = () => (
    <button 
        className="w-10 h-10 flex items-center justify-center text-white/90 hover:text-white transition-colors"
        aria-label="Search"
    >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </button>
);

// Main Navbar Component
export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    const openSidebarWithMenu = (menuId: string) => {
        setActiveMenuId(menuId);
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
        setActiveMenuId(null);
    };

    return (
        <>
            {/* Main Navbar - McKinsey Style */}
            <nav
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
                            <HamburgerButton onClick={openSidebar} />
                            
                            {/* Vertical Divider */}
                            <div className="h-6 w-px bg-white/30 mx-3" />
                            
                            <Logo />
                        </div>

                        {/* Center Section - Nav Items (Hidden on mobile) */}
                        <div className="hidden lg:flex items-center">
                            {menuData.map((menu) => {
                                const hasDropdown = !!(menu.submenu || menu.aboutContent);
                                return (
                                    <NavItem
                                        key={menu.id}
                                        label={menu.name}
                                        hasDropdown={hasDropdown}
                                        onClick={() => openSidebarWithMenu(menu.id)}
                                    />
                                );
                            })}
                        </div>

                        {/* Right Section - Sign In, Subscribe, Search */}
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
            </nav>

            {/* Sidebar Component with optional pre-selected menu */}
            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={closeSidebar} 
                initialActiveMenu={activeMenuId}
            />
        </>
    );
};
