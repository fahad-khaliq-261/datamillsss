"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { menuData, MenuItem } from './menuData';

// Props interface for the Sidebar component
interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

// Sidebar Header Component
const SidebarHeader: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="h-[72px] px-6 flex items-center justify-between border-b border-blue-900/30">
        <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-blue-100/80 hover:text-white transition-colors"
            aria-label="Close Menu"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <Link href="/" className="flex items-center gap-2" onClick={onClose}>
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
);

// Menu Item Component
interface MenuItemButtonProps {
    menu: MenuItem;
    isActive: boolean;
    onClick: () => void;
    onMouseEnter: () => void;
}

const MenuItemButton: React.FC<MenuItemButtonProps> = ({ menu, isActive, onClick, onMouseEnter }) => (
    <button
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        className={`w-full px-6 py-4 flex items-center justify-between text-left transition-all duration-300 group ${isActive
            ? 'bg-blue-900/30 border-l-[3px] border-cyan-400'
            : 'border-l-[3px] border-transparent hover:bg-blue-900/20 hover:border-blue-400/50'
            }`}
    >
        <span className={`text-[15px] font-semibold tracking-wide transition-colors ${isActive ? 'text-cyan-400' : 'text-blue-100/90 group-hover:text-white'
            }`}>
            {menu.name}
        </span>
        {menu.submenu && (
            <svg
                className={`w-5 h-5 transition-all duration-300 ${isActive
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
);

// Sidebar Footer Component
const SidebarFooter: React.FC = () => (
    <div className="p-6 border-t border-blue-900/30">
        <div className="flex flex-wrap gap-4 text-sm">
            <Link href="#" className="text-blue-100/60 hover:text-cyan-400 transition-colors">Contact</Link>
            <Link href="#" className="text-blue-100/60 hover:text-cyan-400 transition-colors">LinkedIn</Link>
            <Link href="#" className="text-blue-100/60 hover:text-cyan-400 transition-colors">GitHub</Link>
        </div>
    </div>
);

// Submenu Panel Component
interface SubmenuPanelProps {
    activeMenuData: MenuItem | undefined;
    isVisible: boolean;
}

const SubmenuPanel: React.FC<SubmenuPanelProps> = ({ activeMenuData, isVisible }) => (
    <div
        className={`w-[320px] md:w-[500px] lg:w-[700px] h-full bg-[#f8fafc] transition-all duration-500 overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}
    >
        {activeMenuData?.submenu && (
            <div className="h-full flex flex-col">
                {/* Submenu Header - McKinsey Style */}
                <div className="h-[80px] px-8 flex items-center border-b border-gray-200">
                    <Link
                        href="#"
                        className="group"
                    >
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
                        <div className="mt-1 w-12 h-[3px] bg-blue-600 group-hover:w-full transition-all duration-300" />
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
);

// Main Sidebar Component
export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

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
        if (menu?.submenu) {
            setActiveMenu(menuId);
        }
    };

    const activeMenuData = menuData.find(m => m.id === activeMenu);

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
                                        onClick={() => menu.submenu && handleMenuClick(menu.id)}
                                        onMouseEnter={() => handleMenuHover(menu.id)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <SidebarFooter />
                </div>

                {/* Right Panel - Submenu */}
                <SubmenuPanel
                    activeMenuData={activeMenuData}
                    isVisible={!!activeMenu}
                />
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

