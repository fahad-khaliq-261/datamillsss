"use client";

import React, { memo } from 'react';

/**
 * PRODUCTION-OPTIMIZED InteractiveOrb
 * - Removed mouse tracking (heavy re-renders)
 * - Removed complex SVG filters
 * - Removed inline style animations
 * - Using pure CSS animations only
 * - Minimal DOM elements
 */
export const InteractiveOrb: React.FC = memo(() => {
    return (
        <div className="relative w-full h-full">
            {/* Ambient background glow - CSS only */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[400px] h-[400px] bg-gradient-radial from-cyan-500/15 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow" />
            </div>

            {/* Outer ring */}
            <div className="absolute inset-[15%] rounded-full border border-cyan-500/20 animate-spin-slow" />
            
            {/* Middle ring */}
            <div className="absolute inset-[25%] rounded-full border border-purple-500/15 animate-spin-reverse" />

            {/* Central core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Glow */}
                <div className="absolute -inset-16 bg-cyan-400/20 rounded-full blur-2xl animate-pulse-slow" />
                <div className="absolute -inset-8 bg-cyan-400/30 rounded-full blur-xl" />
                
                {/* Core sphere */}
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-cyan-300 via-cyan-400 to-blue-500 shadow-[0_0_60px_rgba(6,182,212,0.6)]">
                    {/* Inner highlight */}
                    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent" />
                    <div className="absolute top-2 left-2 w-4 h-4 bg-white/50 rounded-full blur-sm" />
                </div>
                
                {/* Orbiting dot */}
                <div className="absolute inset-[-10px] animate-spin-medium">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(6,182,212,1)]" />
                </div>
            </div>

            {/* Floating particles - CSS only, reduced count */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-float-1" />
                <div className="absolute top-[60%] left-[70%] w-1 h-1 bg-purple-400/50 rounded-full animate-float-2" />
                <div className="absolute top-[40%] left-[20%] w-1 h-1 bg-blue-400/40 rounded-full animate-float-3" />
                <div className="absolute top-[70%] left-[40%] w-1.5 h-1.5 bg-cyan-400/50 rounded-full animate-float-1 animation-delay-1000" />
            </div>

            {/* Styles for custom animations */}
            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.05); }
                }
                @keyframes float-1 {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
                    50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
                }
                @keyframes float-2 {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
                    50% { transform: translateY(-15px) translateX(-10px); opacity: 0.7; }
                }
                @keyframes float-3 {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
                    50% { transform: translateY(-25px) translateX(5px); opacity: 0.6; }
                }
                .animate-spin-slow {
                    animation: spin-slow 30s linear infinite;
                }
                .animate-spin-reverse {
                    animation: spin-reverse 40s linear infinite;
                }
                .animate-spin-medium {
                    animation: spin-slow 8s linear infinite;
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                .animate-float-1 {
                    animation: float-1 6s ease-in-out infinite;
                }
                .animate-float-2 {
                    animation: float-2 8s ease-in-out infinite;
                }
                .animate-float-3 {
                    animation: float-3 7s ease-in-out infinite;
                }
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
                .bg-gradient-radial {
                    background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
                }
            `}</style>
        </div>
    );
});

InteractiveOrb.displayName = 'InteractiveOrb';
