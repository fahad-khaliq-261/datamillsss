"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Research', href: '#' },
        { name: 'Economic Futures', href: '#' },
        { name: 'Commitments', href: '#', hasDropdown: true },
        { name: 'Learn', href: '#', hasDropdown: true },
        { name: 'News', href: '#' },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-[100] transition-all duration-500 px-10 py-5 ${isScrolled
                ? 'bg-[#0a192f]/90 backdrop-blur-xl border-b border-blue-900/50 py-4 shadow-2xl'
                : 'bg-transparent'
                }`}
            role="navigation"
            aria-label="Main Navigation"
        >
            <div className="max-w-[1440px] mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center group">
                    <div className="relative h-12 w-12 transition-transform duration-300 group-hover:scale-110">
                        <Image
                            src="/logo.png"
                            alt="Stratosphere Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Links on the Right */}
                <div className="flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            /* text-blue-100/60 gives that "cool" navy aesthetic */
                            className="text-[13px] font-semibold tracking-wide text-blue-100/60 hover:text-white transition-colors flex items-center gap-1.5 group"
                        >
                            {link.name}
                            {link.hasDropdown && (
                                <svg
                                    className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-all group-hover:translate-y-0.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            )}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};