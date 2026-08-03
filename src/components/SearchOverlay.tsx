"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  GraduationCap,
  MapPin,
  Star,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSuggestions([]);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const fetchSuggestions = async (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/colleges?limit=8&search=${encodeURIComponent(val)}`,
      );
      const data = await res.json();
      setSuggestions(data.colleges || []);
    } catch (e) {
      console.error("Error fetching search suggestions:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/colleges?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleSelectSuggestion = (college: any) => {
    const slug =
      college.slug || college.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    router.push(`/colleges/${slug}`);
    onClose();
  };

  const popularSearches = [
    { name: "IIM Ahmedabad", type: "Management", slug: "iim-ahmedabad" },
    { name: "IIT Delhi", type: "Engineering", slug: "iit-delhi" },
    {
      name: "Galgotias University",
      type: "Engineering",
      slug: "galgotias-university-greater-noida",
    },
    { name: "AIIMS New Delhi", type: "Medical", slug: "aiims-delhi" },
    { name: "CAT Exam Predictor", type: "Exam", href: "/predictor?exam=CAT" },
    {
      name: "B.Tech Colleges in Pune",
      type: "Location",
      href: "/colleges?stream=Engineering&state=Maharashtra",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-white z-[150] overflow-y-auto flex flex-col font-sans"
        >
          {/* Header Bar */}
          <div className="w-full max-w-5xl mx-auto px-6 pt-8 md:pt-16 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-600 text-white shadow-sm shadow-orange-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-outfit font-black text-sm tracking-tight text-slate-800 uppercase">
                Think Your College
              </span>
            </div>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Search Box Section */}
          <div className="w-full max-w-4xl mx-auto px-6 py-6 flex-1 flex flex-col">
            <form onSubmit={handleSearchSubmit} className="relative group mb-8">
              <div className="flex items-center w-full rounded-2xl border-2 border-slate-200 focus-within:border-orange-500 bg-white shadow-lg shadow-slate-100 focus-within:shadow-[0_10px_30px_rgba(249,115,22,0.15)] transition-all duration-300 h-16 md:h-20 overflow-hidden">
                <Search className="w-6 h-6 text-slate-400 ml-5 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => fetchSuggestions(e.target.value)}
                  placeholder="Search Colleges, Courses, Exams, or Locations..."
                  className="flex-1 px-4 h-full bg-transparent border-none outline-none text-slate-800 text-base md:text-xl font-bold placeholder-slate-400"
                />

                {query.trim() && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setSuggestions([]);
                    }}
                    className="mr-3 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="submit"
                  className="h-full px-8 md:px-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-sm md:text-base tracking-wider uppercase flex items-center justify-center flex-shrink-0 active:scale-95 shadow-md shadow-orange-500/20 transition-all duration-200"
                >
                  Search
                </button>
              </div>
              <p className="text-xs text-slate-400 font-semibold mt-2.5 pl-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                Start typing to get real-time autocomplete suggestions from our
                database
              </p>
            </form>

            {/* Results / Autocomplete Suggestions panel */}
            <div className="flex-1 min-h-[300px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                    Searching Database...
                  </p>
                </div>
              ) : query.trim() ? (
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider pl-1">
                    Matching Recommendations ({suggestions.length})
                  </h3>

                  {suggestions.length > 0 ? (
                    <div className="border border-slate-100 rounded-xl bg-white overflow-hidden shadow-md max-h-[60vh] overflow-y-auto">
                      {suggestions.map((item, idx) => (
                        <div
                          key={item.id || idx}
                          onClick={() => handleSelectSuggestion(item)}
                          className="flex items-center justify-between px-6 py-4 hover:bg-orange-50/50 border-b border-slate-100 last:border-none cursor-pointer transition-all duration-150 group"
                        >
                          <span className="text-sm font-semibold text-slate-700 group-hover:text-orange-600 transition-colors truncate pr-4">
                            {item.name}
                          </span>
                          <span className="text-xs font-bold text-slate-400 group-hover:text-orange-500 transition-colors uppercase tracking-wider flex-shrink-0">
                            {item.name.toLowerCase().includes("exam") ||
                            item.name.toLowerCase().includes("cet")
                              ? "Exam"
                              : "College"}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                      <p className="text-sm font-bold text-slate-500">
                        No colleges matched "{query}"
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Try another search keyword or verify the spelling
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* Popular / Default searches */
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                      Popular Searches
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {popularSearches.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          if (item.href) {
                            router.push(item.href);
                          } else if (item.slug) {
                            router.push(`/colleges/${item.slug}`);
                          }
                          onClose();
                        }}
                        className="group flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white hover:border-orange-500/35 hover:shadow-md hover:shadow-orange-500/5 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-9 h-9 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors duration-300">
                            <Search className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-700 group-hover:text-orange-600 transition-colors">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                              {item.type}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-orange-500 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
