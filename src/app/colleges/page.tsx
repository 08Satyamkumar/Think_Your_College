"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Search, 
  MapPin, 
  Star, 
  Filter, 
  SlidersHorizontal,
  X,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  stream: string;
  type: string;
  fees: number; // in Lakhs per year
  feesLabel: string;
  highestPackage: number; // in LPA
  highestPackageLabel: string;
  rating: number;
  slug: string;
  logo: string;
}

const mockColleges: College[] = [
  {
    id: "1",
    name: "IIT Delhi - Indian Institute of Technology",
    location: "New Delhi",
    state: "Delhi",
    stream: "Engineering",
    type: "Government",
    fees: 2.2,
    feesLabel: "₹2.2 Lakhs/Yr",
    highestPackage: 120.0,
    highestPackageLabel: "1.2 Cr PA",
    rating: 4.9,
    slug: "iit-delhi",
    logo: "IITD"
  },
  {
    id: "2",
    name: "IIM Ahmedabad - Indian Institute of Management",
    location: "Ahmedabad",
    state: "Gujarat",
    stream: "Management",
    type: "Government",
    fees: 12.5,
    feesLabel: "₹12.5 Lakhs/Yr",
    highestPackage: 61.5,
    highestPackageLabel: "61.5 Lakhs PA",
    rating: 4.9,
    slug: "iim-ahmedabad",
    logo: "IIMA"
  },
  {
    id: "3",
    name: "Galgotias University",
    location: "Greater Noida",
    state: "Uttar Pradesh",
    stream: "Engineering",
    type: "Private",
    fees: 1.6,
    feesLabel: "₹1.6 Lakhs/Yr",
    highestPackage: 35.0,
    highestPackageLabel: "35.0 Lakhs PA",
    rating: 4.2,
    slug: "galgotias-university",
    logo: "GU"
  },
  {
    id: "4",
    name: "SIBM Pune - Symbiosis Institute of Business Management",
    location: "Pune",
    state: "Maharashtra",
    stream: "Management",
    type: "Private",
    fees: 10.2,
    feesLabel: "₹10.2 Lakhs/Yr",
    highestPackage: 45.5,
    highestPackageLabel: "45.5 Lakhs PA",
    rating: 4.6,
    slug: "sibm-pune",
    logo: "SIBM"
  },
  {
    id: "5",
    name: "RV College of Engineering",
    location: "Bangalore",
    state: "Karnataka",
    stream: "Engineering",
    type: "Private",
    fees: 2.5,
    feesLabel: "₹2.5 Lakhs/Yr",
    highestPackage: 48.5,
    highestPackageLabel: "48.5 Lakhs PA",
    rating: 4.4,
    slug: "rv-college-of-engineering",
    logo: "RVCE"
  },
  {
    id: "6",
    name: "KMC Mangalore - Kasturba Medical College",
    location: "Mangalore",
    state: "Karnataka",
    stream: "Medical",
    type: "Private",
    fees: 17.8,
    feesLabel: "₹17.8 Lakhs/Yr",
    highestPackage: 15.0,
    highestPackageLabel: "15.0 Lakhs PA",
    rating: 4.7,
    slug: "kmc-mangalore",
    logo: "KMC"
  },
  {
    id: "7",
    name: "NLSIU - National Law School of India University",
    location: "Bangalore",
    state: "Karnataka",
    stream: "Law",
    type: "Government",
    fees: 2.1,
    feesLabel: "₹2.1 Lakhs/Yr",
    highestPackage: 22.0,
    highestPackageLabel: "22.0 Lakhs PA",
    rating: 4.8,
    slug: "nlsiu-bangalore",
    logo: "NLSIU"
  },
  {
    id: "8",
    name: "AIIMS Delhi - All India Institute of Medical Sciences",
    location: "New Delhi",
    state: "Delhi",
    stream: "Medical",
    type: "Government",
    fees: 0.02,
    feesLabel: "₹1,628/Yr",
    highestPackage: 30.0,
    highestPackageLabel: "30.0 Lakhs PA",
    rating: 5.0,
    slug: "aiims-delhi",
    logo: "AIIMS"
  },
  {
    id: "9",
    name: "IIT Bombay - Indian Institute of Technology",
    location: "Mumbai",
    state: "Maharashtra",
    stream: "Engineering",
    type: "Government",
    fees: 2.3,
    feesLabel: "₹2.3 Lakhs/Yr",
    highestPackage: 140.0,
    highestPackageLabel: "1.4 Cr PA",
    rating: 4.9,
    slug: "iit-bombay",
    logo: "IITB"
  },
  {
    id: "10",
    name: "IIM Bangalore - Indian Institute of Management",
    location: "Bangalore",
    state: "Karnataka",
    stream: "Management",
    type: "Government",
    fees: 11.8,
    feesLabel: "₹11.8 Lakhs/Yr",
    highestPackage: 55.0,
    highestPackageLabel: "55.0 Lakhs PA",
    rating: 4.8,
    slug: "iim-bangalore",
    logo: "IIMB"
  },
  {
    id: "11",
    name: "CMC Vellore - Christian Medical College",
    location: "Vellore",
    state: "Tamil Nadu",
    stream: "Medical",
    type: "Private",
    fees: 1.5,
    feesLabel: "₹1.5 Lakhs/Yr",
    highestPackage: 12.0,
    highestPackageLabel: "12.0 Lakhs PA",
    rating: 4.8,
    slug: "cmc-vellore",
    logo: "CMC"
  },
  {
    id: "12",
    name: "CNLU Patna - Chanakya National Law University",
    location: "Patna",
    state: "Bihar",
    stream: "Law",
    type: "Government",
    fees: 1.8,
    feesLabel: "₹1.8 Lakhs/Yr",
    highestPackage: 12.5,
    highestPackageLabel: "12.5 Lakhs PA",
    rating: 4.3,
    slug: "cnlu-patna",
    logo: "CNLU"
  },
  {
    id: "13",
    name: "BIT Mesra Patna Campus",
    location: "Patna",
    state: "Bihar",
    stream: "Engineering",
    type: "Private",
    fees: 2.8,
    feesLabel: "₹2.8 Lakhs/Yr",
    highestPackage: 18.0,
    highestPackageLabel: "18.0 Lakhs PA",
    rating: 4.1,
    slug: "bit-mesra-patna",
    logo: "BITP"
  },
  {
    id: "14",
    name: "Patna Science College",
    location: "Patna",
    state: "Bihar",
    stream: "Engineering",
    type: "Government",
    fees: 0.15,
    feesLabel: "₹15,000/Yr",
    highestPackage: 8.5,
    highestPackageLabel: "8.5 Lakhs PA",
    rating: 4.0,
    slug: "patna-science-college",
    logo: "PSC"
  },
  {
    id: "15",
    name: "NSIT Patna - Netaji Subhas Institute of Technology",
    location: "Patna",
    state: "Bihar",
    stream: "Engineering",
    type: "Private",
    fees: 1.1,
    feesLabel: "₹1.1 Lakhs/Yr",
    highestPackage: 9.0,
    highestPackageLabel: "9.0 Lakhs PA",
    rating: 3.9,
    slug: "nsit-patna",
    logo: "NSIT"
  }
];

function CollegesList() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialStream = searchParams.get("stream") || "All";
  const initialState = searchParams.get("state") || "All";
  const initialType = searchParams.get("type") || "All";

  // State
  const [search, setSearch] = useState(initialSearch);
  const [selectedStream, setSelectedStream] = useState(initialStream);
  const [selectedState, setSelectedState] = useState(initialState);
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedFeeRange, setSelectedFeeRange] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [comparisonCart, setComparisonCart] = useState<College[]>([]);

  // Sync with searchParams
  useEffect(() => {
    const s = searchParams.get("search");
    const st = searchParams.get("stream");
    if (s !== null) setSearch(s);
    if (st !== null) setSelectedStream(st);
  }, [searchParams]);

  // Derived filters
  const states = useMemo(() => ["All", "Delhi", "Karnataka", "Maharashtra", "Gujarat", "Uttar Pradesh", "Bihar", "Tamil Nadu"], []);
  const feeRanges = [
    { label: "All", value: "All" },
    { label: "Under ₹1 Lakh", value: "under-1" },
    { label: "₹1 - ₹3 Lakhs", value: "1-3" },
    { label: "₹3 - ₹5 Lakhs", value: "3-5" },
    { label: "Above ₹5 Lakhs", value: "above-5" },
  ];

  // Filtering Logic
  const filteredColleges = useMemo(() => {
    return mockColleges
      .filter((college) => {
        // Search Filter
        const matchesSearch = college.name.toLowerCase().includes(search.toLowerCase()) ||
                              college.location.toLowerCase().includes(search.toLowerCase());
        
        // Stream Filter
        const matchesStream = selectedStream === "All" || college.stream === selectedStream;

        // State Filter
        const matchesState = selectedState === "All" || college.state === selectedState;

        // Type Filter
        const matchesType = selectedType === "All" || college.type === selectedType;

        // Fee Filter
        let matchesFee = true;
        if (selectedFeeRange === "under-1") {
          matchesFee = college.fees < 1;
        } else if (selectedFeeRange === "1-3") {
          matchesFee = college.fees >= 1 && college.fees <= 3;
        } else if (selectedFeeRange === "3-5") {
          matchesFee = college.fees > 3 && college.fees <= 5;
        } else if (selectedFeeRange === "above-5") {
          matchesFee = college.fees > 5;
        }

        return matchesSearch && matchesStream && matchesState && matchesType && matchesFee;
      })
      .sort((a, b) => {
        if (sortBy === "placement") {
          return b.highestPackage - a.highestPackage;
        }
        if (sortBy === "fees-low") {
          return a.fees - b.fees;
        }
        if (sortBy === "rating") {
          return b.rating - a.rating;
        }
        return parseInt(a.id) - parseInt(b.id);
      });
  }, [search, selectedStream, selectedState, selectedType, selectedFeeRange, sortBy]);

  const handleToggleCompare = (college: College) => {
    if (comparisonCart.find(c => c.id === college.id)) {
      setComparisonCart(comparisonCart.filter(c => c.id !== college.id));
    } else {
      if (comparisonCart.length >= 3) {
        alert("You can compare up to 3 colleges at once.");
        return;
      }
      setComparisonCart([...comparisonCart, college]);
    }
  };

  const handleClearCart = () => {
    setComparisonCart([]);
  };

  return (
    <div className="space-y-8 relative">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-outfit font-extrabold text-3xl text-text_primary">Explore Colleges in India</h1>
          <p className="text-sm text-text_secondary">Faceted search with verified placement records & fees structure</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 border border-border bg-card rounded-xl text-sm w-full md:w-64 shadow-sm">
            <Search className="w-4 h-4 text-text_secondary" />
            <input 
              type="text" 
              placeholder="Search by name, location..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-text_primary placeholder-text_secondary w-full text-xs"
            />
          </div>

          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden flex items-center justify-center p-2.5 bg-card border border-border rounded-xl text-text_secondary hover:text-text_primary hover:bg-border/30"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* CORE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block bg-card border border-border p-6 rounded-2xl h-fit space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <h3 className="font-outfit font-bold text-base text-text_primary flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" />
              Filters
            </h3>
            <button 
              onClick={() => {
                setSelectedStream("All");
                setSelectedState("All");
                setSelectedType("All");
                setSelectedFeeRange("All");
                setSearch("");
              }}
              className="text-xs text-primary font-semibold hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* STREAM FILTER */}
          <div className="space-y-3">
            <label className="text-xs text-text_secondary font-bold uppercase tracking-wider">Stream</label>
            <div className="flex flex-col gap-2">
              {["All", "Engineering", "Management", "Medical", "Law"].map(st => (
                <button
                  key={st}
                  onClick={() => setSelectedStream(st)}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    selectedStream === st 
                      ? "bg-primary/10 text-primary" 
                      : "text-text_secondary hover:bg-border/30 hover:text-text_primary"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* STATE FILTER */}
          <div className="space-y-3">
            <label className="text-xs text-text_secondary font-bold uppercase tracking-wider">Location State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2.5 border border-border bg-background text-xs text-text_primary rounded-xl outline-none focus:border-primary"
            >
              {states.map(st => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>

          {/* FEE RANGE FILTER */}
          <div className="space-y-3">
            <label className="text-xs text-text_secondary font-bold uppercase tracking-wider">Annual Fee</label>
            <div className="flex flex-col gap-2">
              {feeRanges.map(range => (
                <button
                  key={range.value}
                  onClick={() => setSelectedFeeRange(range.value)}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    selectedFeeRange === range.value 
                      ? "bg-primary/10 text-primary" 
                      : "text-text_secondary hover:bg-border/30"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* TYPE FILTER */}
          <div className="space-y-3">
            <label className="text-xs text-text_secondary font-bold uppercase tracking-wider">College Type</label>
            <div className="flex gap-2">
              {["All", "Government", "Private"].map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex-1 py-2 text-center rounded-xl text-xs font-semibold border transition-all ${
                    selectedType === type 
                      ? "bg-primary/10 border-primary text-primary" 
                      : "bg-background border-border text-text_secondary hover:bg-border/30"
                  }`}
                >
                  {type === "All" ? "All" : type === "Government" ? "Govt" : "Private"}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* LISTINGS SIDE */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl shadow-sm text-sm">
            <p className="font-semibold text-text_secondary text-xs">
              Showing <span className="text-text_primary">{filteredColleges.length}</span> colleges
            </p>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-text_secondary font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-background border border-border px-2.5 py-1.5 rounded-lg text-xs text-text_primary outline-none focus:border-primary font-bold cursor-pointer"
              >
                <option value="popularity">Popularity</option>
                <option value="placement">Highest Package</option>
                <option value="fees-low">Lowest Fees</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* COLLEGES GRID */}
          {filteredColleges.length === 0 ? (
            <div className="py-20 bg-card border border-border rounded-2xl text-center space-y-4">
              <div className="w-16 h-16 bg-border rounded-full flex items-center justify-center mx-auto text-text_secondary">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-outfit font-bold text-lg text-text_primary">No Colleges Found</h3>
              <p className="text-sm text-text_secondary max-w-sm mx-auto">
                We couldn't find any college matching your search criteria. Try modifying your filter conditions.
              </p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredColleges.map((college) => {
                  const isCompared = comparisonCart.some(c => c.id === college.id);
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      key={college.id}
                      className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-premium hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="p-5 space-y-4 flex-1">
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-teal-500/10 border border-border flex items-center justify-center font-outfit font-extrabold text-sm text-primary">
                            {college.logo}
                          </div>
                          <div className="bg-background border border-border px-2 py-0.5 rounded-lg flex items-center gap-1 text-[10px] font-bold text-slate-800 dark:text-slate-100 shadow-sm">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            {college.rating}
                          </div>
                        </div>

                        <div>
                          <span className="text-[9px] uppercase tracking-wider font-extrabold text-primary">{college.stream} • {college.type}</span>
                          <h3 className="font-outfit font-bold text-base text-text_primary group-hover:text-primary transition-colors line-clamp-2 mt-1 leading-snug">
                            {college.name}
                          </h3>
                          <p className="flex items-center gap-1 text-[10px] text-text_secondary mt-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                            {college.location}, {college.state}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 py-2 px-3 bg-background border border-border rounded-xl text-[11px]">
                          <div>
                            <p className="text-[9px] text-text_secondary font-semibold">Highest Package</p>
                            <p className="font-outfit font-extrabold text-emerald-500 mt-0.5">{college.highestPackageLabel}</p>
                          </div>
                          <div>
                            <p className="text-[9px] text-text_secondary font-semibold">Annual Fee</p>
                            <p className="font-outfit font-extrabold text-text_primary mt-0.5">{college.feesLabel}</p>
                          </div>
                        </div>
                      </div>

                      <div className="px-5 pb-5 pt-0 flex flex-col gap-3">
                        <button
                          onClick={() => handleToggleCompare(college)}
                          className={`flex items-center justify-center gap-2 py-2 border rounded-xl text-xs font-semibold transition-all ${
                            isCompared 
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400" 
                              : "bg-background border-border text-text_secondary hover:bg-border/30"
                          }`}
                        >
                          <Layers className="w-3.5 h-3.5" />
                          {isCompared ? "Added to Compare" : "Compare College"}
                        </button>

                        <div className="flex gap-2">
                          <Link 
                            href={`/colleges/${college.slug}`}
                            className="flex-1 py-2 bg-background hover:bg-border/30 border border-border text-text_primary font-bold text-[11px] rounded-xl text-center transition-colors"
                          >
                            Details
                          </Link>
                          <button 
                            onClick={() => alert(`Registration callback requested for ${college.name}`)}
                            className="flex-1 py-2 bg-gradient-premium hover:bg-primary text-white font-bold text-[11px] rounded-xl shadow-sm transition-all"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* MOBILE DRAWER FILTERS */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end" onClick={() => setIsMobileFilterOpen(false)}>
          <div 
            className="w-80 h-full bg-card p-6 overflow-y-auto space-y-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsMobileFilterOpen(false)}
              className="absolute top-4 right-4 text-text_secondary hover:text-text_primary"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-outfit font-extrabold text-lg text-text_primary border-b border-border pb-3 flex items-center gap-2">
              Filter Colleges
            </h3>

            <div className="space-y-2">
              <label className="text-xs text-text_secondary font-bold uppercase">Stream</label>
              <div className="flex flex-wrap gap-2">
                {["All", "Engineering", "Management", "Medical", "Law"].map(st => (
                  <button
                    key={st}
                    onClick={() => setSelectedStream(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                      selectedStream === st 
                        ? "bg-primary border-primary text-white" 
                        : "bg-background border-border text-text_secondary"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-text_secondary font-bold uppercase">State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background text-xs rounded-xl outline-none"
              >
                {states.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-text_secondary font-bold uppercase">Annual Fee</label>
              <div className="flex flex-col gap-2">
                {feeRanges.map(range => (
                  <button
                    key={range.value}
                    onClick={() => setSelectedFeeRange(range.value)}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                      selectedFeeRange === range.value 
                        ? "bg-primary/10 text-primary" 
                        : "text-text_secondary hover:bg-border/30"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-text_secondary font-bold uppercase">College Type</label>
              <div className="flex gap-2">
                {["All", "Government", "Private"].map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`flex-1 py-2 text-center rounded-xl text-xs font-semibold border ${
                      selectedType === type 
                        ? "bg-primary border-primary text-white" 
                        : "bg-background border-border text-text_secondary"
                    }`}
                  >
                    {type === "All" ? "All" : type === "Government" ? "Govt" : "Private"}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 bg-primary text-white font-bold text-sm rounded-xl mt-6 shadow-md"
            >
              Apply Filters ({filteredColleges.length} Colleges)
            </button>
          </div>
        </div>
      )}

      {/* FLOATING COMPARISON CART WIDGET */}
      {comparisonCart.length > 0 && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border shadow-2xl p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4 z-40 max-w-[90vw] md:max-w-lg animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center gap-3 w-full justify-between md:justify-start">
            <div>
              <p className="text-xs font-bold text-text_primary">Compare Colleges</p>
              <p className="text-[10px] text-text_secondary">Comparing {comparisonCart.length} of 3</p>
            </div>
            <button 
              onClick={handleClearCart}
              className="md:hidden text-xs text-red-500 font-semibold hover:underline"
            >
              Clear
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full max-w-[260px] scrollbar-none py-1">
            {comparisonCart.map(c => (
              <div 
                key={c.id}
                className="relative bg-background border border-border px-2.5 py-1.5 rounded-lg flex items-center gap-2 flex-shrink-0"
              >
                <span className="text-[10px] font-bold text-slate-800 dark:text-slate-100">{c.logo}</span>
                <button 
                  onClick={() => handleToggleCompare(c)}
                  className="text-text_secondary hover:text-red-500 p-0.5 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button 
              onClick={handleClearCart}
              className="hidden md:block text-xs text-text_secondary hover:text-red-500 font-semibold px-2"
            >
              Clear
            </button>
            <Link 
              href={{
                pathname: "/compare",
                query: { ids: comparisonCart.map(c => c.id).join(",") }
              }}
              className="flex-1 md:flex-initial bg-primary hover:bg-primary_hover text-white font-bold text-xs px-4 py-2 rounded-xl text-center whitespace-nowrap shadow-sm"
            >
              Compare Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CollegesPage() {
  return (
    <React.Suspense fallback={
      <div className="py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-bold text-text_primary">Loading college listings...</p>
      </div>
    }>
      <CollegesList />
    </React.Suspense>
  );
}
