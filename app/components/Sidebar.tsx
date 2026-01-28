"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { menuData, MenuItem, AboutContent } from './menuData';

// Props interface for the Sidebar component
interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    initialActiveMenu?: string | null;
}

// Sidebar Header Component
const SidebarHeader: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="h-[72px] px-4 flex items-center border-b border-blue-900/30">
        {/* Close Button */}
        <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-blue-100/80 hover:text-white transition-colors"
            aria-label="Close Menu"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        
        {/* Vertical Divider */}
        <div className="h-8 w-px bg-blue-900/50 mx-4" />
        
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3" onClick={onClose}>
            <div className="relative h-8 w-8">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                />
            </div>
            <span className="text-lg font-semibold text-white tracking-tight">Datamills</span>
        </Link>
    </div>
);

// Menu Item Component
interface MenuItemButtonProps {
    menu: MenuItem;
    isActive: boolean;
    onClick: () => void;
    onMouseEnter: () => void;
}

const MenuItemButton: React.FC<MenuItemButtonProps> = ({ menu, isActive, onClick, onMouseEnter }) => {
    const hasExpandableContent = menu.submenu || menu.aboutContent;
    
    return (
        <button
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            className="w-full px-6 py-4 flex items-center justify-between text-left transition-all duration-300 group hover:bg-blue-900/10"
        >
            <div className="relative">
                <span className={`text-[15px] font-semibold tracking-wide transition-colors ${isActive ? 'text-white' : 'text-blue-100/90 group-hover:text-white'}`}>
                    {menu.name}
                </span>
                {/* McKinsey-style underline accent */}
                <div className={`absolute -bottom-1 left-0 h-[2px] bg-[#c4a052] transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} />
            </div>
            {hasExpandableContent && (
                <svg
                    className={`w-5 h-5 transition-all duration-300 ${isActive
                        ? 'text-white'
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
    );
};

// Sidebar Footer Component
const SidebarFooter: React.FC = () => (
    <div className="p-6 border-t border-blue-900/30 space-y-4">
        {/* Sign In */}
        <Link href="#" className="flex items-center gap-3 text-blue-100/70 hover:text-white transition-colors group">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm font-medium">Sign In</span>
        </Link>
        
        {/* Email Subscriptions */}
        <Link href="#" className="flex items-center gap-3 text-blue-100/70 hover:text-white transition-colors group">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium">Email Subscriptions</span>
        </Link>
    </div>
);

// About Us Panel Component
interface AboutUsPanelProps {
    aboutContent: AboutContent | undefined;
    isVisible: boolean;
}

const AboutUsPanel: React.FC<AboutUsPanelProps> = ({ aboutContent, isVisible }) => (
    <div
        className={`w-[320px] md:w-[500px] lg:w-[700px] h-full bg-[#f8fafc] transition-all duration-500 overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
        {aboutContent && (
            <div className="h-full flex flex-col">
                {/* About Us Header */}
                <div className="h-[80px] px-8 flex items-center border-b border-gray-200">
                    <div className="group">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-[#0a192f]">
                                {aboutContent.title}
                            </span>
                        </div>
                        {/* Underline accent */}
                        <div className="mt-1 w-16 h-[3px] bg-cyan-500" />
                    </div>
                </div>

                {/* About Us Content */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-2xl space-y-6">
                        {aboutContent.paragraphs.map((paragraph, index) => (
                            <p 
                                key={index} 
                                className="text-[15px] leading-relaxed text-[#334155]"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="mt-10 pt-8 border-t border-gray-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-[#0a192f]">Powering Innovation</p>
                                <p className="text-xs text-gray-500">Data-driven solutions for the future</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
);

// Submenu Panel Component
interface SubmenuPanelProps {
    activeMenuData: MenuItem | undefined;
    isVisible: boolean;
}

const SubmenuPanel: React.FC<SubmenuPanelProps> = ({ activeMenuData, isVisible }) => {
    // Flatten all items from all groups into a single array
    const allItems = activeMenuData?.submenu?.groups.flatMap(group => group.items) || [];
    
    // Split into 3 columns
    const itemsPerColumn = Math.ceil(allItems.length / 3);
    const column1 = allItems.slice(0, itemsPerColumn);
    const column2 = allItems.slice(itemsPerColumn, itemsPerColumn * 2);
    const column3 = allItems.slice(itemsPerColumn * 2);

    return (
        <div
            className={`w-[320px] md:w-[500px] lg:w-[700px] h-full bg-[#f8fafc] transition-all duration-500 overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            {activeMenuData?.submenu && (
                <div className="h-full flex flex-col">
                    {/* Submenu Header - McKinsey Style */}
                    <div className="h-[80px] px-8 flex items-center border-b border-gray-200">
                        <Link href="#" className="group">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-bold text-[#0a192f] group-hover:text-blue-700 transition-colors">
                                    {activeMenuData.submenu.title}
                                </span>
                                <svg 
                                    className="w-6 h-6 text-blue-600 transition-transform group-hover:translate-x-1" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                            {/* Underline accent */}
                            <div className="mt-1 w-12 h-[2px] bg-[#0a192f] group-hover:w-full transition-all duration-300" />
                        </Link>
                    </div>

                    {/* Submenu Content - McKinsey 3-column flat list */}
                    <div className="flex-1 px-8 py-6 overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-0">
                            {/* Column 1 */}
                            <ul className="space-y-1">
                                {column1.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href="#"
                                            className="block py-2 text-[15px] text-[#1a365d] hover:text-blue-600 transition-colors font-normal"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            
                            {/* Column 2 */}
                            <ul className="space-y-1">
                                {column2.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href="#"
                                            className="block py-2 text-[15px] text-[#1a365d] hover:text-blue-600 transition-colors font-normal"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            
                            {/* Column 3 */}
                            <ul className="space-y-1">
                                {column3.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href="#"
                                            className="block py-2 text-[15px] text-[#1a365d] hover:text-blue-600 transition-colors font-normal"
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

// Main Sidebar Component
export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, initialActiveMenu }) => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    // Set initial active menu when sidebar opens with a pre-selected menu
    useEffect(() => {
        if (isOpen && initialActiveMenu) {
            setActiveMenu(initialActiveMenu);
        }
    }, [isOpen, initialActiveMenu]);

    // Reset active menu when sidebar closes
    useEffect(() => {
        if (!isOpen) {
            setActiveMenu(null);
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
        setActiveMenu(activeMenu === menuId ? null : menuId);
    };

    const handleMenuHover = (menuId: string) => {
        const menu = menuData.find(m => m.id === menuId);
        if (menu?.submenu || menu?.aboutContent) {
            setActiveMenu(menuId);
        }
    };

    const activeMenuData = menuData.find(m => m.id === activeMenu);
    const showAboutPanel = activeMenuData?.id === 'about' && activeMenuData?.aboutContent;
    const showSubmenuPanel = activeMenuData?.submenu && !showAboutPanel;

    return (
        <>
            {/* Backdrop Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <aside
                className={`fixed top-0 left-0 h-full z-[95] flex transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Left Panel - Main Menu */}
                <div className="w-[280px] md:w-[340px] h-full bg-[#0a192f] border-r border-blue-900/30 flex flex-col">
                    <SidebarHeader onClose={onClose} />

                    {/* Menu Items */}
                    <nav className="flex-1 py-6 overflow-y-auto custom-scrollbar">
                        <ul className="space-y-1">
                            {menuData.map((menu) => (
                                <li key={menu.id}>
                                    <MenuItemButton
                                        menu={menu}
                                        isActive={activeMenu === menu.id}
                                        onClick={() => (menu.submenu || menu.aboutContent) && handleMenuClick(menu.id)}
                                        onMouseEnter={() => handleMenuHover(menu.id)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <SidebarFooter />
                </div>

                {/* Right Panel - Submenu or About Us */}
                {showAboutPanel ? (
                    <AboutUsPanel
                        aboutContent={activeMenuData?.aboutContent}
                        isVisible={true}
                    />
                ) : (
                    <SubmenuPanel
                        activeMenuData={activeMenuData}
                        isVisible={!!showSubmenuPanel}
                    />
                )}
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

