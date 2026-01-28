"use client";

import React, { useEffect, useRef, useState } from 'react';

interface MousePosition {
    x: number;
    y: number;
}

// 🎨 CURSOR STYLE OPTIONS - Change this value to switch cursor styles:
// 1 = Targeting Reticle (sci-fi crosshair)
// 2 = Glowing Orb (minimal elegant)
// 3 = Tech Scanner (futuristic HUD)
// 0 = No custom cursor
const CURSOR_STYLE = 1;

export const InteractiveOrb: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState<MousePosition>({ x: 0.5, y: 0.5 });
    const [absolutePos, setAbsolutePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            setMousePos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
            // Store absolute position for cursor
            setAbsolutePos({ 
                x: e.clientX - rect.left, 
                y: e.clientY - rect.top 
            });
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

    const offsetX = (mousePos.x - 0.5) * 50;
    const offsetY = (mousePos.y - 0.5) * 50;

    // Cursor Style 1: Targeting Reticle
    const CursorStyle1 = () => (
        <div className="relative">
            {/* Outer rotating ring */}
            <div className="absolute -inset-5 animate-[spin_3s_linear_infinite]">
                <svg width="56" height="56" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(6,182,212,0.6)" strokeWidth="1" strokeDasharray="6 3"/>
                </svg>
            </div>
            {/* Inner counter-rotating ring */}
            <div className="absolute -inset-3 animate-[spin_2s_linear_infinite_reverse]">
                <svg width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(139,92,246,0.5)" strokeWidth="1" strokeDasharray="3 3"/>
                </svg>
            </div>
            {/* Crosshairs */}
            <div className="absolute -inset-4">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent"/>
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400/80 to-transparent"/>
            </div>
            {/* Center dot */}
            <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(6,182,212,1)]"/>
        </div>
    );

    // Cursor Style 2: Glowing Orb (Minimal)
    const CursorStyle2 = () => (
        <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-4 bg-cyan-400/20 rounded-full blur-xl animate-pulse"/>
            {/* Ring */}
            <div className="absolute -inset-3 border border-cyan-400/40 rounded-full"/>
            {/* Core */}
            <div className="w-3 h-3 bg-gradient-to-br from-white to-cyan-400 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.8)]">
                <div className="absolute inset-0.5 bg-white/60 rounded-full blur-[1px]"/>
            </div>
        </div>
    );

    // Cursor Style 3: Tech Scanner
    const CursorStyle3 = () => (
        <div className="relative">
            {/* Scanning effect */}
            <div className="absolute -inset-6 animate-[ping_2s_ease-out_infinite]">
                <div className="w-full h-full border border-cyan-400/30 rounded-full"/>
            </div>
            {/* Corner brackets */}
            <div className="absolute -inset-4">
                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-cyan-400"/>
                <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-cyan-400"/>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-cyan-400"/>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-cyan-400"/>
            </div>
            {/* Diamond shape */}
            <div className="absolute -inset-2 rotate-45 border border-purple-400/50"/>
            {/* Center */}
            <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8),0_0_16px_rgba(6,182,212,0.6)]"/>
            {/* Data text */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-mono text-cyan-400/80 whitespace-nowrap">
                {Math.round(mousePos.x * 100)}:{Math.round(mousePos.y * 100)}
            </div>
        </div>
    );

    const renderCursor = () => {
        switch(CURSOR_STYLE) {
            case 1: return <CursorStyle1 />;
            case 2: return <CursorStyle2 />;
            case 3: return <CursorStyle3 />;
            default: return null;
        }
    };

    return (
        <div 
            ref={containerRef}
            className="relative w-full h-full cursor-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Custom Cursor */}
            {isHovered && CURSOR_STYLE > 0 && (
                <div 
                    className="absolute pointer-events-none z-50"
                    style={{
                        left: absolutePos.x,
                        top: absolutePos.y,
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    {renderCursor()}
                </div>
            )}

            {/* Ambient background glow */}
            <div className="absolute inset-0">
                <div 
                    className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
                    style={{
                        background: `
                            radial-gradient(ellipse at center, rgba(6,182,212,0.12) 0%, transparent 50%),
                            radial-gradient(ellipse at 30% 40%, rgba(139,92,246,0.08) 0%, transparent 40%),
                            radial-gradient(ellipse at 70% 60%, rgba(59,130,246,0.08) 0%, transparent 40%)
                        `,
                        transform: `translate(calc(-50% + ${offsetX * 0.2}px), calc(-50% + ${offsetY * 0.2}px))`,
                        filter: isHovered ? 'blur(40px)' : 'blur(60px)',
                        opacity: isHovered ? 1 : 0.7,
                    }}
                />
            </div>

            {/* Outer DNA helix rings */}
            <div 
                className="absolute inset-0 transition-transform duration-1000"
                style={{ transform: `translate(${offsetX * 0.15}px, ${offsetY * 0.15}px)` }}
            >
                {[0, 1, 2].map((i) => (
                    <div 
                        key={i}
                        className="absolute inset-0"
                        style={{
                            animation: `spin3D ${40 + i * 10}s linear infinite${i % 2 ? ' reverse' : ''}`,
                            animationDelay: `${i * -5}s`
                        }}
                    >
                        <div 
                            className="absolute inset-8 rounded-full"
                            style={{
                                border: `1px solid rgba(${i === 0 ? '6,182,212' : i === 1 ? '139,92,246' : '59,130,246'},${0.15 - i * 0.03})`,
                                transform: `rotateX(${60 + i * 10}deg) rotateY(${i * 20}deg)`,
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Particle field */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => {
                    const size = 1 + Math.random() * 3;
                    const duration = 15 + Math.random() * 20;
                    const delay = Math.random() * -20;
                    const startX = Math.random() * 100;
                    const startY = Math.random() * 100;
                    const color = i % 3 === 0 ? 'cyan' : i % 3 === 1 ? 'purple' : 'blue';
                    
                    return (
                        <div
                            key={i}
                            className="absolute rounded-full pointer-events-none"
                            style={{
                                width: size,
                                height: size,
                                left: `${startX}%`,
                                top: `${startY}%`,
                                background: color === 'cyan' 
                                    ? 'rgba(6,182,212,0.8)' 
                                    : color === 'purple' 
                                        ? 'rgba(139,92,246,0.6)' 
                                        : 'rgba(59,130,246,0.5)',
                                boxShadow: color === 'cyan' 
                                    ? '0 0 10px rgba(6,182,212,0.8), 0 0 20px rgba(6,182,212,0.4)' 
                                    : 'none',
                                animation: `particleFloat ${duration}s ease-in-out infinite`,
                                animationDelay: `${delay}s`,
                                transform: `translate(${offsetX * (0.1 + i * 0.02)}px, ${offsetY * (0.1 + i * 0.02)}px)`,
                            }}
                        />
                    );
                })}
            </div>

            {/* Orbital rings with nodes */}
            {[
                { inset: 12, duration: 25, particles: 8, color: 'cyan', size: 2.5 },
                { inset: 20, duration: 35, particles: 6, color: 'purple', size: 2, reverse: true },
                { inset: 28, duration: 20, particles: 4, color: 'blue', size: 3 },
            ].map((ring, ringIndex) => (
                <div 
                    key={ringIndex}
                    className="absolute transition-transform duration-500"
                    style={{ 
                        inset: `${ring.inset}%`,
                        transform: `translate(${offsetX * (0.3 + ringIndex * 0.1)}px, ${offsetY * (0.3 + ringIndex * 0.1)}px)` 
                    }}
                >
                    {/* Ring border with gradient */}
                    <div 
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: `conic-gradient(from ${ringIndex * 60}deg, 
                                transparent, 
                                rgba(${ring.color === 'cyan' ? '6,182,212' : ring.color === 'purple' ? '139,92,246' : '59,130,246'},0.3), 
                                transparent, 
                                rgba(${ring.color === 'cyan' ? '6,182,212' : ring.color === 'purple' ? '139,92,246' : '59,130,246'},0.2), 
                                transparent
                            )`,
                            mask: 'radial-gradient(transparent 95%, black 96%, black 100%, transparent 100%)',
                            WebkitMask: 'radial-gradient(transparent 95%, black 96%, black 100%, transparent 100%)',
                            animation: `spin ${ring.duration}s linear infinite${ring.reverse ? ' reverse' : ''}`,
                        }}
                    />
                    
                    {/* Orbiting particles */}
                    {[...Array(ring.particles)].map((_, i) => (
                        <div 
                            key={i}
                            className="absolute inset-0"
                            style={{
                                animation: `spin ${ring.duration}s linear infinite${ring.reverse ? ' reverse' : ''}`,
                                animationDelay: `${(i * ring.duration) / ring.particles}s`
                            }}
                        >
                            <div 
                                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                                style={{
                                    width: ring.size * (1 + (i % 2) * 0.5),
                                    height: ring.size * (1 + (i % 2) * 0.5),
                                    background: ring.color === 'cyan' 
                                        ? 'linear-gradient(135deg, #22d3ee, #06b6d4)' 
                                        : ring.color === 'purple'
                                            ? 'linear-gradient(135deg, #a78bfa, #8b5cf6)'
                                            : 'linear-gradient(135deg, #60a5fa, #3b82f6)',
                                    boxShadow: `0 0 ${ring.size * 4}px rgba(${ring.color === 'cyan' ? '6,182,212' : ring.color === 'purple' ? '139,92,246' : '59,130,246'},0.8)`,
                                }}
                            />
                        </div>
                    ))}
                </div>
            ))}

            {/* Energy waves */}
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ transform: `translate(calc(-50% + ${offsetX * 0.5}px), calc(-50% + ${offsetY * 0.5}px))` }}
            >
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                            width: 80 + i * 40,
                            height: 80 + i * 40,
                            border: `1px solid rgba(6,182,212,${0.3 - i * 0.08})`,
                            animation: `pulseWave ${3 + i}s ease-out infinite`,
                            animationDelay: `${i * 0.5}s`,
                        }}
                    />
                ))}
            </div>

            {/* Central core */}
            <div 
                className="absolute top-1/2 left-1/2 transition-all duration-200"
                style={{ transform: `translate(calc(-50% + ${offsetX * 0.7}px), calc(-50% + ${offsetY * 0.7}px))` }}
            >
                {/* Outer glow layers */}
                <div className={`absolute -inset-20 transition-all duration-500 ${isHovered ? 'scale-125' : 'scale-100'}`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/10 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
                </div>
                
                <div className={`absolute -inset-12 transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-purple-500/20 rounded-full blur-2xl" />
                </div>
                
                <div className={`absolute -inset-8 bg-cyan-400/40 rounded-full blur-xl transition-all duration-300 ${isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-70'}`} />
                
                {/* Core sphere with layers */}
                <div className={`relative transition-transform duration-300 ${isHovered ? 'scale-125' : 'scale-100'}`}>
                    {/* Outer shell */}
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-cyan-300 via-cyan-400 to-blue-500 shadow-[0_0_60px_rgba(6,182,212,0.8),0_0_100px_rgba(6,182,212,0.4),inset_0_0_20px_rgba(255,255,255,0.3)]">
                        {/* Inner highlight */}
                        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/50 via-cyan-200/30 to-transparent" />
                        
                        {/* Bright spot */}
                        <div className="absolute top-1.5 left-2 w-4 h-4 bg-white/70 rounded-full blur-[4px]" />
                        
                        {/* Secondary highlight */}
                        <div className="absolute bottom-2 right-2 w-2 h-2 bg-white/40 rounded-full blur-[2px]" />
                    </div>
                    
                    {/* Rotating halo */}
                    <div className="absolute inset-[-8px] animate-[spin_8s_linear_infinite]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_10px_rgba(6,182,212,1)]" />
                    </div>
                    <div className="absolute inset-[-8px] animate-[spin_8s_linear_infinite_reverse]">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full shadow-[0_0_8px_rgba(139,92,246,1)]" />
                    </div>
                </div>
            </div>

            {/* Connecting network lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="rgba(6,182,212,0.4)" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="rgba(139,92,246,0.3)" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                
                {/* Animated scanning line */}
                <line 
                    x1="0%" y1="50%" x2="100%" y2="50%" 
                    stroke="url(#lineGrad1)" 
                    strokeWidth="1"
                    filter="url(#glow)"
                    style={{ transform: `translateY(${offsetY * 0.4}px)` }}
                >
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
                </line>
                <line 
                    x1="50%" y1="0%" x2="50%" y2="100%" 
                    stroke="url(#lineGrad2)" 
                    strokeWidth="1"
                    filter="url(#glow)"
                    style={{ transform: `translateX(${offsetX * 0.4}px)` }}
                >
                    <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
                </line>
            </svg>

            {/* Data visualization elements */}
            <div className="absolute bottom-8 left-8 flex items-end gap-1 opacity-30">
                {[...Array(8)].map((_, i) => (
                    <div 
                        key={i}
                        className="w-1 bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-t"
                        style={{
                            height: 8 + Math.sin(i * 0.8) * 16 + 8,
                            animation: `dataBar ${2 + i * 0.2}s ease-in-out infinite`,
                            animationDelay: `${i * 0.1}s`,
                        }}
                    />
                ))}
            </div>

            {/* Tech labels */}
            <div className="absolute top-8 right-8 text-right opacity-20">
                <div className="text-[10px] font-mono text-cyan-400 tracking-widest animate-pulse">NEURAL.NET</div>
                <div className="text-[8px] font-mono text-slate-500 mt-1">v2.0.26</div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spin3D {
                    from { transform: rotateY(0deg) rotateX(60deg); }
                    to { transform: rotateY(360deg) rotateX(60deg); }
                }
                @keyframes pulseWave {
                    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
                    100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
                }
                @keyframes particleFloat {
                    0%, 100% { 
                        transform: translateY(0) translateX(0) scale(1); 
                        opacity: 0.3;
                    }
                    25% { 
                        transform: translateY(-30px) translateX(20px) scale(1.2); 
                        opacity: 0.8;
                    }
                    50% { 
                        transform: translateY(-10px) translateX(-10px) scale(0.9); 
                        opacity: 0.5;
                    }
                    75% { 
                        transform: translateY(-40px) translateX(10px) scale(1.1); 
                        opacity: 0.9;
                    }
                }
                @keyframes dataBar {
                    0%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(1.5); }
                }
            `}</style>
        </div>
    );
};
