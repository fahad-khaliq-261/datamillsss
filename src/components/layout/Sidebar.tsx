"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { menuData, MenuItem, AboutContent } from '@/lib/constants';

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

// Props interface for the Sidebar component
interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

// Sidebar Header Component
const SidebarHeader: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="h-14 px-3 sm:px-4 flex items-center justify-between border-b border-blue-900/30">
        <div className="flex items-center">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Close Menu"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            
            {/* Vertical Divider */}
            <div className="h-6 w-px bg-white/30 mx-2 sm:mx-3" />
            
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center gap-2" onClick={onClose}>
                <div className="relative h-6 w-6 sm:h-7 sm:w-7">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                    />
                </div>
                <span className="text-sm sm:text-base font-semibold text-white tracking-tight">Datamills</span>
            </Link>
        </div>
    </div>
);

// Menu Item Component
interface MenuItemButtonProps {
    menu: MenuItem;
    isActive: boolean;
    onClick: () => void;
    onMouseEnter: () => void;
    isMobileExpanded?: boolean;
}

const MenuItemButton: React.FC<MenuItemButtonProps> = ({ menu, isActive, onClick, onMouseEnter, isMobileExpanded }) => {
    const hasExpandableContent = menu.submenu || menu.aboutContent;
    
    return (
        <button
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-left transition-all duration-200 group"
        >
            <div className="relative">
                <span className={`text-sm sm:text-[15px] font-medium tracking-wide transition-colors ${isActive ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                    {menu.name}
                </span>
                {/* McKinsey-style underline accent */}
                <div className={`absolute -bottom-1 left-0 h-[2px] bg-[#c4a052] transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} />
            </div>
            {hasExpandableContent && (
                <svg
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white'} ${isMobileExpanded ? 'rotate-90' : ''} lg:rotate-0`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            )}
        </button>
    );
};

// Sidebar Footer Component
const SidebarFooter: React.FC = () => (
    <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 mt-auto border-t border-blue-900/30">
        {/* Sign In */}
        <Link href="#" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs sm:text-sm">Sign In</span>
        </Link>
        
        {/* Email Subscriptions */}
        <Link href="#" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-xs sm:text-sm">Email Subscriptions</span>
        </Link>
        
        {/* Contact Us - Mobile/Tablet Only */}
        <Link 
            href="/contact" 
            className="lg:hidden flex items-center justify-center gap-2 mt-4 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-lg"
        >
            Contact Us
        </Link>
    </div>
);

// Mobile Submenu Component (Inline expansion for small screens)
interface MobileSubmenuProps {
    menu: MenuItem;
    isExpanded: boolean;
    onClose: () => void;
}

const MobileSubmenu: React.FC<MobileSubmenuProps> = ({ menu, isExpanded, onClose }) => {
    if (!menu.submenu) return null;
    
    const allItems = menu.submenu.groups.flatMap(group => group.items);
    const basePath = getBasePath(menu.id);

    return (
        <div 
            className={`lg:hidden overflow-hidden transition-all duration-300 bg-[#071225] ${
                isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
            <ul className="py-2 px-2 sm:px-4">
                {allItems.map((item, index) => (
                    <li key={index}>
                        <Link
                            href={`${basePath}/${toSlug(item)}`}
                            onClick={onClose}
                            className="block py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-white/70 hover:text-cyan-400 transition-colors"
                        >
                            {item}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Mobile About Content Component (Inline expansion for About Us on small screens)
interface MobileAboutContentProps {
    aboutContent: AboutContent | undefined;
    isExpanded: boolean;
}

const MobileAboutContent: React.FC<MobileAboutContentProps> = ({ aboutContent, isExpanded }) => {
    if (!aboutContent) return null;

    return (
        <div 
            className={`lg:hidden overflow-hidden transition-all duration-300 bg-[#071225] ${
                isExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
            <div className="py-3 px-4 sm:px-6">
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed line-clamp-6">
                    {aboutContent.paragraphs[0]}
                </p>
                <Link 
                    href="/about" 
                    className="inline-flex items-center gap-1 mt-3 text-xs sm:text-sm text-cyan-400 hover:text-cyan-300"
                >
                    Learn more
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

// About Us Panel Component
interface AboutUsPanelProps {
    aboutContent: AboutContent | undefined;
    isVisible: boolean;
}

const AboutUsPanel: React.FC<AboutUsPanelProps> = ({ aboutContent, isVisible }) => (
    <div
        className={`flex-1 h-full bg-white transition-all duration-300 overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
        {aboutContent && (
            <div className="h-full flex flex-col">
                {/* About Us Header */}
                <div className="h-14 px-8 flex items-center border-b border-gray-200">
                    <Link href="#" className="group flex items-center gap-3">
                        <span className="text-xl font-bold text-[#0a192f] group-hover:text-blue-600 transition-colors">
                            {aboutContent.title}
                        </span>
                        <svg 
                            className="w-5 h-5 text-blue-600 transition-transform group-hover:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                {/* About Us Content */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-3xl space-y-6">
                        {aboutContent.paragraphs.map((paragraph, index) => (
                            <p 
                                key={index} 
                                className="text-[15px] leading-relaxed text-[#334155]"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </div>
);

// Submenu Panel Component - Full Width McKinsey Style
interface SubmenuPanelProps {
    activeMenuData: MenuItem | undefined;
    isVisible: boolean;
    onClose: () => void;
}

const SubmenuPanel: React.FC<SubmenuPanelProps> = ({ activeMenuData, isVisible, onClose }) => {
    // Flatten all items from all groups into a single array
    const allItems = activeMenuData?.submenu?.groups.flatMap(group => group.items) || [];
    
    // Split into 3 columns
    const itemsPerColumn = Math.ceil(allItems.length / 3);
    const column1 = allItems.slice(0, itemsPerColumn);
    const column2 = allItems.slice(itemsPerColumn, itemsPerColumn * 2);
    const column3 = allItems.slice(itemsPerColumn * 2);

    const basePath = activeMenuData ? getBasePath(activeMenuData.id) : '';

    return (
        <div
            className={`flex-1 h-full bg-white transition-all duration-300 overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            {activeMenuData?.submenu && (
                <div className="h-full flex flex-col">
                    {/* Submenu Header - McKinsey Style */}
                    <div className="h-14 px-8 flex items-center border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <span className="text-xl font-bold text-[#0a192f] underline decoration-2 underline-offset-8">
                                {activeMenuData.submenu.title}
                            </span>
                            <svg 
                                className="w-5 h-5 text-blue-600" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>

                    {/* Submenu Content - McKinsey 3-column flat list */}
                    <div className="flex-1 px-8 py-8 overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-0">
                            {/* Column 1 */}
                            <ul className="space-y-0">
                                {column1.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={`${basePath}/${toSlug(item)}`}
                                            onClick={onClose}
                                            className="block py-2.5 text-[15px] text-[#1a365d] hover:text-blue-600 transition-colors"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            
                            {/* Column 2 */}
                            <ul className="space-y-0">
                                {column2.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={`${basePath}/${toSlug(item)}`}
                                            onClick={onClose}
                                            className="block py-2.5 text-[15px] text-[#1a365d] hover:text-blue-600 transition-colors"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            
                            {/* Column 3 */}
                            <ul className="space-y-0">
                                {column3.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={`${basePath}/${toSlug(item)}`}
                                            onClick={onClose}
                                            className="block py-2.5 text-[15px] text-[#1a365d] hover:text-blue-600 transition-colors"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Main Sidebar Component - Full Screen McKinsey Style
export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(null);

    // Set default menu (Industries) when sidebar opens on desktop, reset when closes
    useEffect(() => {
        if (isOpen) {
            // Only auto-select on large screens (lg and above - 1024px)
            if (window.innerWidth >= 1024) {
                const firstMenuWithSubmenu = menuData.find(m => m.submenu);
                if (firstMenuWithSubmenu) {
                    setActiveMenu(firstMenuWithSubmenu.id);
                }
            }
        } else {
            setActiveMenu(null);
            setMobileExpandedMenu(null);
        }
    }, [isOpen]);

    // Prevent body scroll when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleMenuClick = (menuId: string) => {
        const menu = menuData.find(m => m.id === menuId);
        
        // On mobile/tablet (below lg), toggle inline expansion
        if (window.innerWidth < 1024) {
            if (menu?.submenu || menu?.aboutContent) {
                setMobileExpandedMenu(mobileExpandedMenu === menuId ? null : menuId);
            }
        } else {
            // On desktop (lg+), use the panel view
            setActiveMenu(activeMenu === menuId ? null : menuId);
        }
    };

    const handleMenuHover = (menuId: string) => {
        // Only use hover on desktop (lg+)
        if (window.innerWidth >= 1024) {
            const menu = menuData.find(m => m.id === menuId);
            if (menu?.submenu || menu?.aboutContent) {
                setActiveMenu(menuId);
            }
        }
    };

    const activeMenuData = menuData.find(m => m.id === activeMenu);
    const showAboutPanel = activeMenuData?.id === 'about' && activeMenuData?.aboutContent;
    const showSubmenuPanel = activeMenuData?.submenu && !showAboutPanel;

    return (
        <>
            {/* Full Screen Sidebar Container */}
            <div
                className={`fixed inset-0 z-[100] transition-all duration-500 ${
                    isOpen ? 'visible opacity-100' : 'invisible opacity-0'
                }`}
            >
                {/* Sidebar Content - Full Screen with Background */}
                <aside
                    className={`fixed inset-0 flex bg-white transition-transform duration-500 ease-out ${
                        isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    {/* Left Panel - Main Menu (Full width on mobile/tablet, fixed width on desktop) */}
                    <div className="w-full lg:w-[380px] h-full bg-[#0a192f] flex flex-col flex-shrink-0">
                        <SidebarHeader onClose={onClose} />

                        {/* Menu Items */}
                        <nav className="flex-1 py-2 sm:py-4 overflow-y-auto">
                            <ul>
                                {menuData.map((menu) => (
                                    <li key={menu.id}>
                                        <MenuItemButton
                                            menu={menu}
                                            isActive={activeMenu === menu.id}
                                            isMobileExpanded={mobileExpandedMenu === menu.id}
                                            onClick={() => (menu.submenu || menu.aboutContent) && handleMenuClick(menu.id)}
                                            onMouseEnter={() => handleMenuHover(menu.id)}
                                        />
                                        {/* Mobile Inline Submenu */}
                                        {menu.submenu && (
                                            <MobileSubmenu
                                                menu={menu}
                                                isExpanded={mobileExpandedMenu === menu.id}
                                                onClose={onClose}
                                            />
                                        )}
                                        {/* Mobile About Content */}
                                        {menu.aboutContent && (
                                            <MobileAboutContent
                                                aboutContent={menu.aboutContent}
                                                isExpanded={mobileExpandedMenu === menu.id}
                                            />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <SidebarFooter />
                    </div>

                    {/* Right Panel - Submenu or About Us (Hidden on mobile/tablet, visible on lg+) */}
                    <div className="hidden lg:block flex-1">
                        {showAboutPanel ? (
                            <AboutUsPanel
                                aboutContent={activeMenuData?.aboutContent}
                                isVisible={true}
                            />
                        ) : (
                            <SubmenuPanel
                                activeMenuData={activeMenuData}
                                isVisible={!!showSubmenuPanel}
                                onClose={onClose}
                            />
                        )}
                        
                        {/* Empty white space when no submenu */}
                        {!showAboutPanel && !showSubmenuPanel && (
                            <div className="h-full bg-white" />
                        )}
                    </div>
                </aside>
            </div>
        </>
    );
};

