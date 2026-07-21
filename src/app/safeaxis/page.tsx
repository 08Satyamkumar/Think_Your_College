"use client";

import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, 
  Settings, 
  Grid, 
  Copy, 
  Check, 
  Info,
  ArrowRight, 
  RotateCcw,
  Sparkles,
  Wifi,
  Battery,
  Signal,
  Shield,
  User,
  Heart,
  ChevronRight,
  Eye
} from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

// Mock emergency contacts for Screen 2
const contactAvatars = [
  { name: "Mom", bg: "bg-red-100 text-red-600", initial: "M" },
  { name: "Dad", bg: "bg-blue-100 text-blue-600", initial: "D" },
  { name: "Brother", bg: "bg-emerald-100 text-emerald-600", initial: "B" },
];

export default function SafeAxisOnboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [deviceOS, setDeviceOS] = useState<"ios" | "android">("ios");
  const [showGridOverlay, setShowGridOverlay] = useState(false);
  const [simulatedDark, setSimulatedDark] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Auto-rotate slides for demonstration every 6 seconds, unless user interacts
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className={`min-h-screen bg-[#0F172A] text-slate-100 p-4 md:p-8 flex flex-col items-center justify-center ${poppins.variable} font-sans`}>
      {/* Background Decorative Mesh Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full bg-slate-800/40 blur-[80px]" />
      </div>

      <div className="w-full max-w-6xl z-10">
        {/* Header Block */}
        <header className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-6 gap-4">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-[#E53935] to-[#1565C0] flex items-center justify-center text-white font-extrabold text-sm tracking-wider">
                SA
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                SafeAxis Onboarding
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              High-Fidelity Component Specification • Apple Clean &amp; Material Concept
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setDeviceOS(deviceOS === "ios" ? "android" : "ios")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-all text-xs font-bold border border-slate-700 active:scale-95"
            >
              <Smartphone className="w-3.5 h-3.5 text-blue-400" />
              OS Style: <span className="text-white uppercase">{deviceOS}</span>
            </button>
            <button
              onClick={() => setShowGridOverlay(!showGridOverlay)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-xs font-bold border active:scale-95 ${
                showGridOverlay 
                  ? "bg-blue-600/20 border-blue-500 text-blue-300" 
                  : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              8px Grid: {showGridOverlay ? "ON" : "OFF"}
            </button>
            <button
              onClick={() => setSimulatedDark(!simulatedDark)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-all text-xs font-bold border border-slate-700 active:scale-95"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              Theme: <span className="text-white">{simulatedDark ? "Dark" : "Light"}</span>
            </button>
          </div>
        </header>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Device Simulator (iPhone/Android Frame) */}
          <div className="col-span-1 lg:col-span-6 flex justify-center py-4">
            
            {/* Phone Container */}
            <div className="relative shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[6px] border-slate-950 rounded-[48px] overflow-hidden bg-slate-950 p-[2px]">
              
              {/* Dynamic Island / Notch Mockup */}
              {deviceOS === "ios" ? (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-end px-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] mr-1.5" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0B2545]" />
                </div>
              ) : (
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-50 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1c1c1c]" />
                </div>
              )}

              {/* Status Bar */}
              <div className={`absolute top-0 left-0 right-0 h-12 z-40 flex items-end justify-between px-7 pb-1 text-xs font-semibold ${
                simulatedDark ? "text-slate-200" : "text-slate-800"
              }`}>
                {/* Time */}
                <div className="tracking-tight text-[11px] font-bold">19:54</div>
                
                {/* Status Icons */}
                <div className="flex items-center gap-1.5">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3.5 h-3.5" />
                  <Battery className="w-4 h-4" />
                </div>
              </div>

              {/* Home Screen Simulated Canvas (Standard mobile proportions 375x812) */}
              <div className={`w-[365px] h-[780px] transition-colors duration-300 relative flex flex-col justify-between overflow-hidden rounded-[40px] pt-12 pb-6 px-6 ${
                simulatedDark ? "bg-[#121212]" : "bg-[#FFFFFF]"
              }`}>
                
                {/* 8px Spacing Grid Visualizer Overlay */}
                {showGridOverlay && (
                  <div className="absolute inset-0 pointer-events-none z-30 opacity-20 bg-[linear-gradient(to_right,#E53935_1px,transparent_1px),linear-gradient(to_bottom,#E53935_1px,transparent_1px)] bg-[size:8px_8px]" />
                )}

                {/* Onboarding Screen Content - Animated via Framer Motion */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-grow flex flex-col justify-between h-full pt-4"
                  >
                    
                    {/* Top Segment: Illustration + Skip */}
                    <div className="flex flex-col flex-grow justify-between">
                      {/* Top Header Row (Skip Button) */}
                      <div className="flex justify-end items-center h-8">
                        {currentSlide < 2 && (
                          <button
                            onClick={() => goToSlide(2)}
                            className={`text-xs font-bold tracking-wide transition-colors py-1 px-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 ${
                              simulatedDark ? "text-slate-400 hover:text-white" : "text-[#1565C0] hover:text-[#0d47a1]"
                            }`}
                          >
                            Skip
                          </button>
                        )}
                      </div>

                      {/* Illustration Container (Approx 320px tall) */}
                      <div className="flex-grow flex items-center justify-center min-h-[280px]">
                        {currentSlide === 0 && (
                          /* Screen 1 Illustration: Confident Woman + Shield Background */
                          <div className="relative w-full max-w-[240px] h-[240px] flex items-center justify-center">
                            
                            {/* Floating Safe Ring Waves */}
                            <div className="absolute inset-0 rounded-full border border-blue-500/10 animate-ping duration-10000" />
                            <div className="absolute inset-4 rounded-full border border-red-500/10 animate-pulse duration-5000" />
                            
                            {/* Circular Vector Grid Backdrop */}
                            <svg className="absolute w-full h-full z-0 opacity-40" viewBox="0 0 200 200">
                              <circle cx="100" cy="100" r="80" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
                              <circle cx="100" cy="100" r="60" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                              <circle cx="100" cy="100" r="40" fill="none" stroke="#F8FAFC" strokeWidth="1.5" />
                              <circle cx="40" cy="50" r="3" fill="#1565C0" />
                              <circle cx="160" cy="150" r="4" fill="#E53935" />
                              <path d="M 120,40 L 130,45" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
                            </svg>

                            {/* Shield Graphic */}
                            <div className="absolute top-4 left-6 z-10 w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 shadow-lg border border-blue-100 dark:border-slate-800 flex items-center justify-center transform -rotate-12 animate-bounce duration-[4000ms]">
                              <Shield className="w-8 h-8 text-[#1565C0]" fill="#1565C0" fillOpacity="0.1" />
                            </div>

                            {/* Flat Vector Woman Walking Confidently */}
                            <svg className="w-full h-full z-20 relative" viewBox="0 0 240 240" fill="none">
                              {/* Background soft shadow shield */}
                              <path 
                                d="M120,40 L180,60 L180,110 C180,150 120,180 120,180 C120,180 60,150 60,110 L60,60 Z" 
                                fill="url(#shieldGrad)" 
                                className="transition-all duration-300"
                              />

                              {/* Woman Figure */}
                              {/* Legs (walking pose) */}
                              {/* Back leg (left) */}
                              <path d="M110,135 L95,185 L85,188" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                              {/* Front leg (right - stepping forward) */}
                              <path d="M122,135 L138,180 L152,185" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                              
                              {/* Left Shoe */}
                              <path d="M85,188 L75,187 L75,193 L88,193 Z" fill="#E53935" />
                              {/* Right Shoe */}
                              <path d="M152,185 L163,188 L160,194 L149,191 Z" fill="#1565C0" />

                              {/* Torso & Jacket */}
                              <path d="M102,95 C98,110 98,135 106,138 L126,138 C134,135 134,110 130,95 Z" fill="#1565C0" /> {/* Inner Blue top */}
                              <path d="M96,95 L108,138 L114,138 L104,95 Z" fill="#E53935" /> {/* Jacket Flap Left (Red) */}
                              <path d="M136,95 L124,138 L118,138 L128,95 Z" fill="#E53935" /> {/* Jacket Flap Right (Red) */}

                              {/* Arms (swinging) */}
                              {/* Left Arm (swinging back) */}
                              <path d="M100,95 L85,120 L78,118" stroke="#FFE0B2" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
                              {/* Right Arm (forward) */}
                              <path d="M132,95 L145,122 L152,120" stroke="#FFE0B2" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />

                              {/* Head & Neck */}
                              <rect x="112" y="80" width="8" height="12" rx="4" fill="#FFE0B2" />
                              <circle cx="116" cy="72" r="12" fill="#FFE0B2" />
                              
                              {/* Hair (flowing dark design) */}
                              <path d="M110,60 C110,60 128,58 128,70 C128,74 122,76 122,82 C120,86 112,88 108,82 C106,78 104,66 110,60 Z" fill="#2E2528" />
                              {/* Confident gaze path glasses/band */}
                              <path d="M116,68 L124,70" stroke="#1565C0" strokeWidth="2.5" strokeLinecap="round" />

                              {/* Gradients */}
                              <defs>
                                <linearGradient id="shieldGrad" x1="60" y1="40" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                                  <stop offset="0%" stopColor="#1565C0" stopOpacity="0.08" />
                                  <stop offset="100%" stopColor="#E53935" stopOpacity="0.08" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                        )}

                        {currentSlide === 1 && (
                          /* Screen 2 Illustration: Distress Alert Connection */
                          <div className="relative w-full max-w-[240px] h-[240px] flex items-center justify-center">
                            {/* Pulse alert circles */}
                            <div className="absolute w-32 h-32 rounded-full border-2 border-red-500/20 animate-ping" />
                            <div className="absolute w-24 h-24 rounded-full border border-blue-500/20 animate-pulse" />
                            
                            <svg className="w-full h-full z-10" viewBox="0 0 200 200" fill="none">
                              {/* Central Shield with SOS Pulsing */}
                              <circle cx="100" cy="100" r="32" fill="#E53935" fillOpacity="0.1" stroke="#E53935" strokeWidth="2" />
                              <path d="M100,82 L115,90 L115,108 C115,120 100,128 100,128 C100,128 85,120 85,108 L85,90 Z" fill="#E53935" />
                              
                              {/* Exclamation inside Shield */}
                              <path d="M100,92 L100,103 M100,109 L100,111" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

                              {/* Connection rays to contact bubbles */}
                              <path d="M100,68 L100,45" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
                              <path d="M72,85 L45,72" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
                              <path d="M128,85 L155,72" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />

                              {/* Floating contact avatars */}
                              <circle cx="100" cy="35" r="14" fill="#E0F2FE" stroke="#1565C0" strokeWidth="1.5" />
                              <path d="M96,32 A 4,4 0 0,1 104,32 M94,42 A 6,6 0 0,1 106,42" stroke="#1565C0" strokeWidth="1.5" strokeLinecap="round" />

                              <circle cx="35" cy="65" r="14" fill="#FEE2E2" stroke="#E53935" strokeWidth="1.5" />
                              <path d="M31,62 A 4,4 0 0,1 39,62 M29,72 A 6,6 0 0,1 41,72" stroke="#E53935" strokeWidth="1.5" strokeLinecap="round" />

                              <circle cx="165" cy="65" r="14" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
                              <path d="M161,62 A 4,4 0 0,1 169,62 M159,72 A 6,6 0 0,1 171,72" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </div>
                        )}

                        {currentSlide === 2 && (
                          /* Screen 3 Illustration: Real-time Safe Path Mapping */
                          <div className="relative w-full max-w-[240px] h-[240px] flex items-center justify-center">
                            
                            {/* Grid Map Backdrop */}
                            <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
                              {/* Grid lines representing street map */}
                              <rect x="20" y="20" width="160" height="160" rx="16" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
                              
                              <path d="M20,60 L180,60 M20,110 L180,110 M20,150 L180,150" stroke="#E2E8F0" strokeWidth="1.5" />
                              <path d="M60,20 L60,180 M110,20 L110,180 M150,20 L150,180" stroke="#E2E8F0" strokeWidth="1.5" />

                              {/* Secure Path Routing (Blue Accent) */}
                              <path d="M60,150 L60,110 L110,110 L110,60 M110,60 L150,60" stroke="#1565C0" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.2" />
                              <path d="M60,150 L60,110 L110,110 L110,60 M110,60 L150,60" stroke="#1565C0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                              {/* Shield checkpoint icons (Red Accent Warning Zone & Blue Safe Route) */}
                              {/* Safe endpoint */}
                              <circle cx="150" cy="60" r="10" fill="#1565C0" />
                              <path d="M147,60 L149,62 L153,58" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                              {/* User starting point pulse */}
                              <circle cx="60" cy="150" r="8" fill="#1565C0" fillOpacity="0.3" className="animate-ping" />
                              <circle cx="60" cy="150" r="5" fill="#1565C0" />

                              {/* High-risk Red Shield block zone */}
                              <circle cx="110" cy="140" r="12" fill="#FEE2E2" />
                              <path d="M106,136 L114,144 M114,136 L106,144" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Segment: Typography + Buttons */}
                    <div className="mt-8 flex flex-col gap-6">
                      
                      {/* Text Blocks (Heading & Description) */}
                      <div className="text-center px-2">
                        {currentSlide === 0 && (
                          <>
                            <h2 className={`text-2xl font-extrabold tracking-tight mb-2 ${
                              simulatedDark ? "text-white" : "text-slate-900"
                            }`}>
                              Your Safety Starts Here
                            </h2>
                            <p className="text-sm font-medium leading-relaxed text-slate-500 max-w-[280px] mx-auto">
                              Stay protected before, during and after emergencies.
                            </p>
                          </>
                        )}
                        {currentSlide === 1 && (
                          <>
                            <h2 className={`text-2xl font-extrabold tracking-tight mb-2 ${
                              simulatedDark ? "text-white" : "text-slate-900"
                            }`}>
                              Instant Distress Alert
                            </h2>
                            <p className="text-sm font-medium leading-relaxed text-slate-500 max-w-[280px] mx-auto">
                              Alert emergency contacts and local units in just one tap.
                            </p>
                          </>
                        )}
                        {currentSlide === 2 && (
                          <>
                            <h2 className={`text-2xl font-extrabold tracking-tight mb-2 ${
                              simulatedDark ? "text-white" : "text-slate-900"
                            }`}>
                              Real-time Safety Map
                            </h2>
                            <p className="text-sm font-medium leading-relaxed text-slate-500 max-w-[280px] mx-auto">
                              Share your live route coordinates with family automatically.
                            </p>
                          </>
                        )}
                      </div>

                      {/* Pagination Indicator Dots */}
                      <div className="flex justify-center items-center gap-2">
                        {[0, 1, 2].map((idx) => (
                          <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              currentSlide === idx 
                                ? "w-6 bg-[#1565C0]" 
                                : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>

                      {/* CTA Action Button */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={nextSlide}
                          style={{ height: "56px" }}
                          className="w-full bg-[#E53935] hover:bg-[#d32f2f] text-white font-semibold text-[16px] tracking-wide rounded-[16px] shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] duration-200"
                        >
                          {currentSlide === 2 ? "Get Started" : "Next"}
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>

                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Bottom Home Indicator Bar (Apple UI Specific) */}
                {deviceOS === "ios" && (
                  <div className="flex justify-center mt-3">
                    <div className={`w-32 h-1 rounded-full ${
                      simulatedDark ? "bg-slate-700" : "bg-slate-300"
                    }`} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Spec Inspector & Design Token Panel */}
          <div className="col-span-1 lg:col-span-6 space-y-6">
            
            {/* Design Spec Highlights Card */}
            <div className="bg-slate-950/60 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-red-500" />
                  <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-200">
                    Design Tokens &amp; Specifications
                  </h3>
                </div>
                <div className="px-2 py-0.5 rounded bg-[#E53935]/10 border border-[#E53935]/30 text-[10px] font-black text-[#E53935] tracking-widest">
                  8PX GRID
                </div>
              </div>

              {/* Grid 8px Spacing Specs */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Spacing Scale (8px Multiples)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { label: "p-2 / gap-2", value: "8px", desc: "Dots, status items" },
                    { label: "p-4 / gap-4", value: "16px", desc: "Title margin, round radius" },
                    { label: "p-6 / gap-6", value: "24px", desc: "Horizontal screen bounds" },
                    { label: "p-12 / gap-12", value: "48px", desc: "Description margins" },
                  ].map((s, idx) => (
                    <div key={idx} className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 text-center">
                      <p className="text-[10px] font-mono text-blue-400 font-bold">{s.label}</p>
                      <p className="text-sm font-extrabold text-white my-0.5">{s.value}</p>
                      <p className="text-[9px] text-slate-500">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Swatch Tokens */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Interactive Palette Accent Colors</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Red Accent */}
                  <div 
                    onClick={() => handleCopy("#E53935", "Red Accent")}
                    className="group bg-slate-900 hover:bg-slate-850 p-3 rounded-2xl border border-slate-800 flex items-center justify-between cursor-pointer transition-all hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E53935] shadow-lg shadow-red-500/20" />
                      <div>
                        <p className="text-xs font-bold text-slate-300">Accent Red</p>
                        <p className="text-xs font-mono text-slate-400">#E53935</p>
                      </div>
                    </div>
                    <button className="text-slate-500 group-hover:text-white transition-colors">
                      {copiedToken === "Red Accent" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Blue Accent */}
                  <div 
                    onClick={() => handleCopy("#1565C0", "Blue Accent")}
                    className="group bg-slate-900 hover:bg-slate-850 p-3 rounded-2xl border border-slate-800 flex items-center justify-between cursor-pointer transition-all hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1565C0] shadow-lg shadow-blue-500/20" />
                      <div>
                        <p className="text-xs font-bold text-slate-300">Accent Blue</p>
                        <p className="text-xs font-mono text-slate-400">#1565C0</p>
                      </div>
                    </div>
                    <button className="text-slate-500 group-hover:text-white transition-colors">
                      {copiedToken === "Blue Accent" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Typography Hierarchy */}
              <div className="space-y-3 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Typography (Poppins Google Font)</h4>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-slate-800/50 pb-2">
                    <span className="text-slate-400">Heading 1:</span>
                    <span className="text-white font-bold">24px (lh 32px) • Extrabold</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/50 pb-2">
                    <span className="text-slate-400">Body Copy:</span>
                    <span className="text-white">14px (lh 20px) • Medium (Slate-500)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/50 pb-2">
                    <span className="text-slate-400">Primary Button:</span>
                    <span className="text-white font-semibold">16px (h-56, rounded-16)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pagination dots:</span>
                    <span className="text-white">8px (w-6 for active element)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Steps and Features Info */}
            <div className="bg-slate-950/60 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Premium Onboarding Features
              </h3>
              
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <span><strong>Apple Clean + Material Concept:</strong> Supports dynamic OS layout swapping. iOS displays notch/Island status items and home line, while Material style concept showcases clean centered camera cutout.</span>
                </li>
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <span><strong>SVG Vectors:</strong> Beautiful custom, scaleable vector illustrations designed directly inside the code to optimize page speeds and load crisp rendering on any screen.</span>
                </li>
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <span><strong>Framer Motion Slide Transitions:</strong> Smooth screen transitions that simulate native app behaviors, supporting skip commands and step pagination.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
