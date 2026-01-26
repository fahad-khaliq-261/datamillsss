"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';

// Hamburger Button Component
interface HamburgerButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ isOpen, onClick }) => (
    <button
        onClick={onClick}
        className={`relative w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-500 group
            ${isOpen 
                ? 'bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.3)]' 
                : 'hover:bg-blue-900/50'
            }`}
        aria-label="Toggle Menu"
        aria-expanded={isOpen}
    >
        <div className={`relative w-6 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
            {/* Top line */}
            <span 
                className={`absolute left-0 h-[2px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] origin-center
                    ${isOpen 
                        ? 'w-6 top-1/2 -translate-y-1/2 rotate-45 bg-cyan-400' 
                        : 'w-6 top-0 bg-blue-100/80 group-hover:w-5 group-hover:bg-cyan-300'
                    }`} 
            />
            {/* Middle line */}
            <span 
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] rounded-full transition-all duration-300 ease-out
                    ${isOpen 
                        ? 'w-0 opacity-0 bg-cyan-400' 
                        : 'w-4 bg-blue-100/80 group-hover:w-6 group-hover:bg-cyan-300'
                    }`} 
            />
            {/* Bottom line */}
            <span 
                className={`absolute left-0 h-[2px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] origin-center
                    ${isOpen 
                        ? 'w-6 top-1/2 -translate-y-1/2 -rotate-45 bg-cyan-400' 
                        : 'w-6 bottom-0 bg-blue-100/80 group-hover:w-4 group-hover:bg-cyan-300'
                    }`} 
            />
        </div>
    </button>
);

// Logo Component
const Logo: React.FC = () => (
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
);

// Navigation Links Component
const NavLinks: React.FC = () => (
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
);

// Mobile Search Button Component
const MobileSearchButton: React.FC = () => (
    <button className="lg:hidden p-2">
        <svg className="w-5 h-5 text-blue-100/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </button>
);

// Main Navbar Component
export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

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
                        <HamburgerButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
                        <Logo />
                    </div>

                    {/* Right side - Quick links */}
                    <NavLinks />

                    {/* Mobile menu icon */}
                    <MobileSearchButton />
                </div>
            </nav>

            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        </>
    );
};
