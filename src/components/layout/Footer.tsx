"use client";

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

// Footer Link Component - prefetch disabled to prevent 404 errors for placeholder pages
interface FooterLinkProps {
    href: string;
    children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
    <Link 
        href={href} 
        prefetch={false}
        className="text-white/70 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
    >
        {children}
    </Link>
);

// Social Icon Component
interface SocialIconProps {
    href: string;
    label: string;
    children: React.ReactNode;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, label, children }) => (
    <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-cyan-500 hover:text-white transition-all duration-300"
    >
        {children}
    </a>
);

// Footer Column Component
interface FooterColumnProps {
    title: string;
    links: { label: string; href: string }[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => (
    <div>
        <h3 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-4">
            {title}
        </h3>
        <ul className="space-y-1.5 sm:space-y-3">
            {links.map((link, index) => (
                <li key={index}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
            ))}
        </ul>
    </div>
);

// Footer data
const footerData = {
    industries: [
        { label: 'Healthcare', href: '/industries/healthcare' },
        { label: 'Financial Services', href: '/industries/financial-services' },
        { label: 'Technology', href: '/industries/technology-and-telecommunications' },
        { label: 'Retail', href: '/industries/retail' },
        { label: 'Energy', href: '/industries/energy-and-materials' },
    ],
    capabilities: [
        { label: 'Data Engineering', href: '/capabilities/data-engineering' },
        { label: 'Machine Learning', href: '/capabilities/machine-learning' },
        { label: 'Business Intelligence', href: '/capabilities/business-intelligence' },
        { label: 'Predictive Analytics', href: '/capabilities/predictive-analytics' },
        { label: 'Digital Transformation', href: '/capabilities/digital-transformation' },
    ],
    company: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Our Insights', href: '/insights' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Partners', href: '/partners' },
    ],
    resources: [
        { label: 'Case Studies', href: '/insights/case-studies' },
        { label: 'Whitepapers', href: '/insights/whitepapers' },
        { label: 'Blog', href: '/blog' },
        { label: 'Webinars', href: '/insights/webinars' },
        { label: 'FAQ', href: '/faq' },
    ],
};

// Main Footer Component
export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0a192f] border-t border-white/10">
            {/* Main Footer Content */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-10">
                    {/* Company Info */}
                    <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-2">
                        <Link href="/" className="flex items-center mb-4 sm:mb-6">
                            <div className="relative h-8 w-8 sm:h-10 sm:w-10 mr-2 sm:mr-3">
                                <Image
                                    src="/logo.png"
                                    alt="Datamills Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
                                Datamills
                            </span>
                        </Link>
                        <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-sm">
                            Empowering organizations to unlock the full potential of data and AI. 
                            We deliver intelligent solutions that drive innovation and transform businesses.
                        </p>
                        
                        {/* Social Icons */}
                        <div className="flex gap-2 sm:gap-3">
                            <SocialIcon href="https://linkedin.com" label="LinkedIn">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </SocialIcon>
                            <SocialIcon href="https://twitter.com" label="Twitter">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </SocialIcon>
                            <SocialIcon href="https://github.com" label="GitHub">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </SocialIcon>
                            <SocialIcon href="https://youtube.com" label="YouTube">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </SocialIcon>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <FooterColumn title="Industries" links={footerData.industries} />
                    <FooterColumn title="Capabilities" links={footerData.capabilities} />
                    <FooterColumn title="Company" links={footerData.company} />
                    <FooterColumn title="Resources" links={footerData.resources} />
                </div>
                
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
                        <p className="text-white/50 text-xs sm:text-sm text-center md:text-left">
                            © {currentYear} Datamills. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6">
                            <FooterLink href="/privacy">Privacy Policy</FooterLink>
                            <FooterLink href="/terms">Terms of Service</FooterLink>
                            <FooterLink href="/cookies">Cookie Policy</FooterLink>
                            <FooterLink href="/accessibility">Accessibility</FooterLink>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

