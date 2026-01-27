"use client";

import React, { useEffect, useRef, useState } from 'react';

interface MousePosition {
    x: number;
    y: number;
}

export const InteractiveOrb: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState<MousePosition>({ x: 0.5, y: 0.5 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            setMousePos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    // Calculate movement offsets based on mouse position
    const offsetX = (mousePos.x - 0.5) * 40;
    const offsetY = (mousePos.y - 0.5) * 40;

    return (
        <div 
            ref={containerRef}
            className="relative w-full h-full cursor-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Custom cursor */}
            {isHovered && (
                <div 
                    className="absolute w-6 h-6 pointer-events-none z-50 transition-transform duration-100"
                    style={{
                        left: `${mousePos.x * 100}%`,
                        top: `${mousePos.y * 100}%`,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <div className="w-full h-full border-2 border-cyan-400 rounded-full animate-ping opacity-75" />
                    <div className="absolute inset-1 bg-cyan-400 rounded-full" />
                </div>
            )}

            {/* Outer rotating ring */}
            <div 
                className="absolute inset-0 transition-transform duration-700 ease-out"
                style={{ 
                    transform: `translate(${offsetX * 0.3}px, ${offsetY * 0.3}px)` 
                }}
            >
                <div className="absolute inset-0 border border-slate-700/50 rounded-full animate-[spin_60s_linear_infinite]" />
                
                {/* Orbiting particles on outer ring */}
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-slate-500 rounded-full shadow-[0_0_10px_rgba(100,116,139,0.5)]" />
                </div>
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite_reverse]">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-slate-600 rounded-full" />
                </div>
            </div>

            {/* Middle ring */}
            <div 
                className="absolute inset-8 transition-transform duration-500 ease-out"
                style={{ 
                    transform: `translate(${offsetX * 0.5}px, ${offsetY * 0.5}px)` 
                }}
            >
                <div className="absolute inset-0 border border-slate-700/40 rounded-full animate-[spin_45s_linear_infinite_reverse]" />
                
                {/* Orbiting particles */}
                <div className="absolute inset-0 animate-[spin_15s_linear_infinite]">
                    <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500/50 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.3)]" />
                </div>
                <div className="absolute inset-0 animate-[spin_12s_linear_infinite_reverse]">
                    <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-slate-400 rounded-full" />
                </div>
            </div>

            {/* Inner ring */}
            <div 
                className="absolute inset-16 transition-transform duration-300 ease-out"
                style={{ 
                    transform: `translate(${offsetX * 0.7}px, ${offsetY * 0.7}px)` 
                }}
            >
                <div className="absolute inset-0 border border-slate-700/30 rounded-full animate-[spin_30s_linear_infinite]" />
                
                {/* Orbiting particles */}
                <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400/70 rounded-full" />
                </div>
            </div>

            {/* Innermost ring */}
            <div 
                className="absolute inset-24 transition-transform duration-200 ease-out"
                style={{ 
                    transform: `translate(${offsetX * 0.9}px, ${offsetY * 0.9}px)` 
                }}
            >
                <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
            </div>

            {/* Center glowing orb */}
            <div 
                className="absolute top-1/2 left-1/2 transition-all duration-150 ease-out"
                style={{ 
                    transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))` 
                }}
            >
                {/* Outer glow */}
                <div className={`absolute -inset-8 bg-cyan-500/20 rounded-full blur-xl transition-all duration-300 ${isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-50'}`} />
                
                {/* Middle glow */}
                <div className={`absolute -inset-4 bg-cyan-400/30 rounded-full blur-lg transition-all duration-300 ${isHovered ? 'scale-125' : 'scale-100'}`} />
                
                {/* Core */}
                <div className={`relative w-5 h-5 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all duration-300 ${isHovered ? 'scale-150' : 'scale-100'}`}>
                    <div className="absolute inset-1 bg-white/30 rounded-full blur-[2px]" />
                </div>
            </div>

            {/* Connecting lines that follow mouse */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Horizontal line */}
                <line 
                    x1="0%" 
                    y1="50%" 
                    x2="100%" 
                    y2="50%" 
                    stroke="url(#lineGradientH)" 
                    strokeWidth="1"
                    className="transition-all duration-500"
                    style={{
                        transform: `translateY(${offsetY * 0.5}px)`,
                        transformOrigin: 'center'
                    }}
                />
                {/* Vertical line */}
                <line 
                    x1="50%" 
                    y1="0%" 
                    x2="50%" 
                    y2="100%" 
                    stroke="url(#lineGradientV)" 
                    strokeWidth="1"
                    className="transition-all duration-500"
                    style={{
                        transform: `translateX(${offsetX * 0.5}px)`,
                        transformOrigin: 'center'
                    }}
                />
                
                {/* Gradient definitions */}
                <defs>
                    <linearGradient id="lineGradientH" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="30%" stopColor="rgba(51, 65, 85, 0.3)" />
                        <stop offset="50%" stopColor="rgba(34, 211, 238, 0.5)" />
                        <stop offset="70%" stopColor="rgba(51, 65, 85, 0.3)" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <linearGradient id="lineGradientV" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="30%" stopColor="rgba(51, 65, 85, 0.3)" />
                        <stop offset="50%" stopColor="rgba(34, 211, 238, 0.5)" />
                        <stop offset="70%" stopColor="rgba(51, 65, 85, 0.3)" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-slate-500/50 rounded-full"
                        style={{
                            left: `${20 + (i * 10)}%`,
                            top: `${15 + (i * 12) % 70}%`,
                            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                            animationDelay: `${i * 0.3}s`,
                            transform: `translate(${offsetX * (0.2 + i * 0.1)}px, ${offsetY * (0.2 + i * 0.1)}px)`
                        }}
                    />
                ))}
            </div>

            {/* Styles for custom animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) scale(1);
                        opacity: 0.5;
                    }
                    50% {
                        transform: translateY(-20px) scale(1.2);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};

