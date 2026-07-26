"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Search, 
  MapPin, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Sparkles,
  Award,
  BookOpen,
  DollarSign,
  Heart,
  ChevronRight,
  Filter,
  MessageSquare,
  HelpCircle,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  city: string;
  stream: string;
  courses: string[];
  specializations: string[];
  exams: string[];
  feeRange: string;
  fees: number; // numeric for sorting (in LPA or relative scale)
  rating: number;
  nirfRank?: number;
  type: string; // Public / Private
  description: string;
  logoText: string;
  slug: string;
  accreditation: string;
  image?: string;
}

const mockColleges: College[] = [
  {
    id: "1",
    name: "IIT Madras - Indian Institute of Technology",
    location: "Chennai, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Chennai",
    stream: "Engineering",
    courses: ["B.Tech", "M.Tech", "B.E"],
    specializations: ["Computer Science", "Mechanical", "Civil", "Electronics"],
    exams: ["JEE Main", "JEE Advanced", "GATE"],
    feeRange: "₹2.1 Lakhs/Yr",
    fees: 2.1,
    rating: 4.8,
    nirfRank: 1,
    type: "Public",
    description: "IIT Madras is a world-class public technical university known for its cutting-edge research, startup incubation cell, and massive lush green campus in Chennai.",
    logoText: "IITM",
    slug: "iit-madras",
    accreditation: "A++ Grade",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "2",
    name: "IIT Delhi - Indian Institute of Technology",
    location: "New Delhi, Delhi",
    state: "Delhi",
    city: "Delhi",
    stream: "Engineering",
    courses: ["B.Tech", "M.Tech", "B.E"],
    specializations: ["Computer Science", "Mechanical", "Civil", "Information Technology"],
    exams: ["JEE Main", "JEE Advanced", "GATE"],
    feeRange: "₹2.2 Lakhs/Yr",
    fees: 2.2,
    rating: 4.9,
    nirfRank: 2,
    type: "Public",
    description: "IIT Delhi is a premier engineering institute recognized for its outstanding placements, global alumni network, and strategic industry collaborations in the heart of India's capital.",
    logoText: "IITD",
    slug: "iit-delhi",
    accreditation: "A++ Grade",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "3",
    name: "IIM Ahmedabad - Indian Institute of Management",
    location: "Ahmedabad, Gujarat",
    state: "Gujarat",
    city: "Ahmedabad",
    stream: "Management",
    courses: ["MBA", "PGDM"],
    specializations: ["Finance", "Marketing", "General Management"],
    exams: ["CAT", "GMAT"],
    feeRange: "₹12.5 Lakhs/Yr",
    fees: 12.5,
    rating: 4.9,
    nirfRank: 1,
    type: "Public",
    description: "Indian Institute of Management Ahmedabad is India's leading business school, famous worldwide for its case-study pedagogy, rigorous curriculum, and high placement records.",
    logoText: "IIMA",
    slug: "iim-ahmedabad",
    accreditation: "EQUIS Accredited",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "4",
    name: "Galgotias University",
    location: "Greater Noida, Uttar Pradesh",
    state: "Uttar Pradesh",
    city: "Noida",
    stream: "Engineering",
    courses: ["B.Tech", "MBA", "B.E"],
    specializations: ["Computer Science", "Mechanical", "Electronics", "Information Technology"],
    exams: ["JEE Main", "CUET"],
    feeRange: "₹1.6 Lakhs/Yr",
    fees: 1.6,
    rating: 4.2,
    nirfRank: 95,
    type: "Private",
    description: "Galgotias University is a highly ranked private campus offering industry-aligned engineering, management, and design programs with placement tie-ups in top Fortune 500 companies.",
    logoText: "GU",
    slug: "galgotias-university",
    accreditation: "NAAC A+",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "5",
    name: "SIBM Pune - Symbiosis Institute of Business Management",
    location: "Pune, Maharashtra",
    state: "Maharashtra",
    city: "Pune",
    stream: "Management",
    courses: ["MBA", "PGDM"],
    specializations: ["Finance", "Marketing", "Human Resources"],
    exams: ["SNAP"],
    feeRange: "₹10.2 Lakhs/Yr",
    fees: 10.2,
    rating: 4.6,
    nirfRank: 17,
    type: "Private",
    description: "Symbiosis Institute of Business Management is a premier private management institute with a beautiful hilltop campus in Pune, celebrated for its niche student development programs.",
    logoText: "SIBM",
    slug: "sibm-pune",
    accreditation: "NAAC A++",
    image: "https://images.unsplash.com/photo-1541829019-259276a7f013?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "6",
    name: "RV College of Engineering",
    location: "Bangalore, Karnataka",
    state: "Karnataka",
    city: "Bangalore",
    stream: "Engineering",
    courses: ["B.Tech", "M.Tech"],
    specializations: ["Computer Science", "Electronics", "Mechanical", "Civil"],
    exams: ["COMEDK", "KCET"],
    feeRange: "₹2.5 Lakhs/Yr",
    fees: 2.5,
    rating: 4.4,
    nirfRank: 85,
    type: "Private",
    description: "RV College of Engineering is Bangalore's premier private institution, highly recognized for excellent core engineering and computer science placements within the IT hub.",
    logoText: "RVCE",
    slug: "rv-college-of-engineering",
    accreditation: "AICTE Approved",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "7",
    name: "AIIMS New Delhi - All India Institute of Medical Sciences",
    location: "New Delhi, Delhi",
    state: "Delhi",
    city: "Delhi",
    stream: "Medical",
    courses: ["MBBS"],
    specializations: ["General Medicine", "Pediatrics", "Surgery"],
    exams: ["NEET"],
    feeRange: "₹1,628/Yr",
    fees: 0.02, // very low fees
    rating: 4.9,
    nirfRank: 1,
    type: "Public",
    description: "AIIMS New Delhi is India's premier public medical sciences university, offering highly subsidized, world-class healthcare education, research facilities, and extensive clinical exposure.",
    logoText: "AIIMS",
    slug: "aiims-delhi",
    accreditation: "MCI Approved",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "8",
    name: "Kasturba Medical College Manipal",
    location: "Manipal, Karnataka",
    state: "Karnataka",
    city: "Bangalore",
    stream: "Medical",
    courses: ["MBBS"],
    specializations: ["General Medicine", "Surgery"],
    exams: ["NEET"],
    feeRange: "₹17.8 Lakhs/Yr",
    fees: 17.8,
    rating: 4.7,
    nirfRank: 10,
    type: "Private",
    description: "Kasturba Medical College Manipal is a top-ranked private medical institute offering exceptional clinical research laboratories, modern hospitals, and global learning partnerships.",
    logoText: "KMC",
    slug: "kmc-manipal",
    accreditation: "NAAC A++",
    image: "https://images.unsplash.com/photo-1551076805-e18690237571?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "9",
    name: "NID Ahmedabad - National Institute of Design",
    location: "Ahmedabad, Gujarat",
    state: "Gujarat",
    city: "Ahmedabad",
    stream: "Design",
    courses: ["B.Des", "M.Des"],
    specializations: ["Industrial Design", "Textile Design", "Communication Design"],
    exams: ["NID DAT"],
    feeRange: "₹3.8 Lakhs/Yr",
    fees: 3.8,
    rating: 4.8,
    nirfRank: 1,
    type: "Public",
    description: "National Institute of Design is India's premier design institute, globally recognized for its creative industrial product designs, visual design labs, and eminent expert panels.",
    logoText: "NID",
    slug: "nid-ahmedabad",
    accreditation: "Autonomous",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "10",
    name: "NLSIU Bangalore - National Law School of India University",
    location: "Bangalore, Karnataka",
    state: "Karnataka",
    city: "Bangalore",
    stream: "Law",
    courses: ["LLB"],
    specializations: ["Corporate Law", "Criminal Law", "Intellectual Property Law"],
    exams: ["CLAT"],
    feeRange: "₹2.5 Lakhs/Yr",
    fees: 2.5,
    rating: 4.9,
    nirfRank: 1,
    type: "Public",
    description: "National Law School of India University is India's premier legal institution, serving as a pioneer of the integrated five-year law degree model with exceptional legal clinics.",
    logoText: "NLSIU",
    slug: "nlsiu-bangalore",
    accreditation: "BCI Approved",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60"
  }
];

function CollegesListContent() {
  const searchParams = useSearchParams();

  // Search & Filter state variables
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedStreams, setSelectedStreams] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popularity");
  const [shortlisted, setShortlisted] = useState<string[]>([]);
  
  // Accordion open states
  const [accordionStates, setAccordionStates] = useState({
    state: true,
    city: true,
    stream: true,
    course: true,
    specialization: true
  });

  // Local filter search options states
  const [stateFilterSearch, setStateFilterSearch] = useState("");
  const [cityFilterSearch, setCityFilterSearch] = useState("");
  const [courseFilterSearch, setCourseFilterSearch] = useState("");
  const [specFilterSearch, setSpecFilterSearch] = useState("");

  // Read URL search params on mount
  useEffect(() => {
    const streamParam = searchParams.get("stream");
    const stateParam = searchParams.get("state");
    const cityParam = searchParams.get("city");
    const searchParam = searchParams.get("search");

    if (streamParam) setSelectedStreams([streamParam]);
    if (stateParam) setSelectedStates([stateParam.replace("-", " ")]);
    if (cityParam) setSelectedCities([cityParam]);
    if (searchParam) setSearchTerm(searchParam);
  }, [searchParams]);

  // Extract unique filter options from mockup database
  const filterOptions = useMemo(() => {
    const states = Array.from(new Set(mockColleges.map(c => c.state)));
    const cities = Array.from(new Set(mockColleges.map(c => c.city)));
    const streams = Array.from(new Set(mockColleges.map(c => c.stream)));
    
    const coursesSet = new Set<string>();
    mockColleges.forEach(c => c.courses.forEach(course => coursesSet.add(course)));
    
    const specializationsSet = new Set<string>();
    mockColleges.forEach(c => c.specializations.forEach(s => specializationsSet.add(s)));

    return {
      states,
      cities,
      streams,
      courses: Array.from(coursesSet),
      specializations: Array.from(specializationsSet)
    };
  }, []);

  // Filtered colleges list
  const filteredColleges = useMemo(() => {
    let result = [...mockColleges];

    // Search term matching name, location, courses or streams
    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.location.toLowerCase().includes(q) ||
        c.stream.toLowerCase().includes(q)
      );
    }

    // Filter by State
    if (selectedStates.length > 0) {
      result = result.filter(c => 
        selectedStates.some(state => c.state.toLowerCase() === state.toLowerCase())
      );
    }

    // Filter by City
    if (selectedCities.length > 0) {
      result = result.filter(c => 
        selectedCities.some(city => c.city.toLowerCase() === city.toLowerCase())
      );
    }

    // Filter by Stream
    if (selectedStreams.length > 0) {
      result = result.filter(c => 
        selectedStreams.some(stream => c.stream.toLowerCase() === stream.toLowerCase())
      );
    }

    // Filter by Course
    if (selectedCourses.length > 0) {
      result = result.filter(c => 
        c.courses.some(course => selectedCourses.includes(course))
      );
    }

    // Filter by Specialization
    if (selectedSpecializations.length > 0) {
      result = result.filter(c => 
        c.specializations.some(s => selectedSpecializations.includes(s))
      );
    }

    // Sorting logic
    if (sortBy === "popularity") {
      // Sort by NIRF Rank ascending (smaller is better). Colleges without ranks go to the bottom.
      result.sort((a, b) => (a.nirfRank || 999) - (b.nirfRank || 999));
    } else if (sortBy === "fees_asc") {
      result.sort((a, b) => a.fees - b.fees);
    } else if (sortBy === "fees_desc") {
      result.sort((a, b) => b.fees - a.fees);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchTerm, selectedStates, selectedCities, selectedStreams, selectedCourses, selectedSpecializations, sortBy]);

  // Read More inline toggle helper
  const [expandedDescriptions, setExpandedDescriptions] = useState<string[]>([]);
  const toggleDescription = (id: string) => {
    if (expandedDescriptions.includes(id)) {
      setExpandedDescriptions(expandedDescriptions.filter(descId => descId !== id));
    } else {
      setExpandedDescriptions([...expandedDescriptions, id]);
    }
  };

  // Toggle checklist filter options helper
  const toggleFilter = (type: string, value: string) => {
    if (type === "state") {
      setSelectedStates(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    } else if (type === "city") {
      setSelectedCities(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    } else if (type === "stream") {
      setSelectedStreams(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    } else if (type === "course") {
      setSelectedCourses(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    } else if (type === "specialization") {
      setSelectedSpecializations(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    }
  };

  // Reset all filters helper
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedStates([]);
    setSelectedCities([]);
    setSelectedStreams([]);
    setSelectedCourses([]);
    setSelectedSpecializations([]);
  };

  // Trigger admission modal on click of Apply Now/Brochure (opens globally handled modal)
  const openInquiryModal = (stream: string) => {
    if (typeof window !== "undefined") {
      // Dispatch custom event to trigger popup registration in LayoutWrapper
      const event = new CustomEvent("openAdmissionAlert", { detail: { stream } });
      window.dispatchEvent(event);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-16 md:pt-40">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6">
        
        {/* BREADCRUMBS & COUNT HEADER */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
              <Link href="/" className="hover:text-orange-500">Home</Link>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="text-slate-600">All Colleges</span>
            </div>
            <h1 className="font-outfit font-black text-2xl md:text-3xl text-slate-800 leading-tight mt-1 flex items-center gap-2">
              <Award className="w-7 h-7 text-orange-500" />
              Showing {filteredColleges.length} Colleges
            </h1>
          </div>

          {/* SORTING SELECT */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm self-stretch md:self-auto">
            <span className="text-[10px] font-black uppercase text-slate-400">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-bold text-slate-700 bg-transparent outline-none cursor-pointer"
            >
              <option value="popularity">Popularity (Rank)</option>
              <option value="rating">Rating (Stars)</option>
              <option value="fees_asc">Fees: Low to High</option>
              <option value="fees_desc">Fees: High to Low</option>
            </select>
          </div>
        </div>

        {/* ACTIVE FILTERS TAGS */}
        {(selectedStates.length > 0 || selectedCities.length > 0 || selectedStreams.length > 0 || selectedCourses.length > 0 || selectedSpecializations.length > 0 || searchTerm !== "") && (
          <div className="flex flex-wrap gap-2 items-center mb-6 bg-orange-50/50 border border-orange-100 p-3 rounded-2xl">
            <span className="text-[9px] uppercase font-black text-orange-600 tracking-wider">Active Filters:</span>
            
            {searchTerm !== "" && (
              <span className="flex items-center gap-1 bg-white text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                Query: "{searchTerm}"
                <X className="w-3 h-3 text-slate-400 hover:text-red-500 cursor-pointer" onClick={() => setSearchTerm("")} />
              </span>
            )}
            
            {selectedStates.map(st => (
              <span key={st} className="flex items-center gap-1 bg-white text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                {st}
                <X className="w-3 h-3 text-slate-400 hover:text-red-500 cursor-pointer" onClick={() => toggleFilter("state", st)} />
              </span>
            ))}
            
            {selectedCities.map(ct => (
              <span key={ct} className="flex items-center gap-1 bg-white text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                {ct}
                <X className="w-3 h-3 text-slate-400 hover:text-red-500 cursor-pointer" onClick={() => toggleFilter("city", ct)} />
              </span>
            ))}

            {selectedStreams.map(str => (
              <span key={str} className="flex items-center gap-1 bg-white text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                {str}
                <X className="w-3 h-3 text-slate-400 hover:text-red-500 cursor-pointer" onClick={() => toggleFilter("stream", str)} />
              </span>
            ))}

            {selectedCourses.map(cr => (
              <span key={cr} className="flex items-center gap-1 bg-white text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                {cr}
                <X className="w-3 h-3 text-slate-400 hover:text-red-500 cursor-pointer" onClick={() => toggleFilter("course", cr)} />
              </span>
            ))}

            {selectedSpecializations.map(sp => (
              <span key={sp} className="flex items-center gap-1 bg-white text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                {sp}
                <X className="w-3 h-3 text-slate-400 hover:text-red-500 cursor-pointer" onClick={() => toggleFilter("specialization", sp)} />
              </span>
            ))}

            <button 
              onClick={clearAllFilters}
              className="text-[9px] font-extrabold text-orange-600 hover:text-orange-700 uppercase tracking-widest hover:underline ml-auto"
            >
              Clear All
            </button>
          </div>
        )}

        {/* MAIN CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: FILTERS CARD */}
          <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm space-y-6">
            
            {/* SEARCH BOX */}
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Search Colleges</h4>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for college details..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-orange-400 focus:bg-white transition-all font-semibold"
                />
              </div>
            </div>

            {/* FILTER SECTIONS ACCORDION */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              
              {/* STATE FILTER */}
              <div className="border-b border-slate-100 pb-4">
                <button
                  onClick={() => setAccordionStates(p => ({ ...p, state: !p.state }))}
                  className="w-full flex items-center justify-between font-outfit font-extrabold text-slate-700 text-xs uppercase tracking-wider text-left"
                >
                  State
                  {accordionStates.state ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                
                {accordionStates.state && (
                  <div className="mt-3 space-y-3">
                    <input
                      type="text"
                      placeholder="Search options..."
                      value={stateFilterSearch}
                      onChange={(e) => setStateFilterSearch(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:border-orange-400"
                    />
                    <div className="max-h-40 overflow-y-auto space-y-2 no-scrollbar pr-1 pt-1">
                      {filterOptions.states
                        .filter(s => s.toLowerCase().includes(stateFilterSearch.toLowerCase()))
                        .map(state => (
                          <label key={state} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={selectedStates.includes(state)}
                              onChange={() => toggleFilter("state", state)}
                              className="accent-orange-500 rounded border-slate-300"
                            />
                            <span className="text-[11px] font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">{state}</span>
                          </label>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CITY FILTER */}
              <div className="border-b border-slate-100 pb-4">
                <button
                  onClick={() => setAccordionStates(p => ({ ...p, city: !p.city }))}
                  className="w-full flex items-center justify-between font-outfit font-extrabold text-slate-700 text-xs uppercase tracking-wider text-left"
                >
                  City
                  {accordionStates.city ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                
                {accordionStates.city && (
                  <div className="mt-3 space-y-3">
                    <input
                      type="text"
                      placeholder="Search options..."
                      value={cityFilterSearch}
                      onChange={(e) => setCityFilterSearch(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:border-orange-400"
                    />
                    <div className="max-h-40 overflow-y-auto space-y-2 no-scrollbar pr-1 pt-1">
                      {filterOptions.cities
                        .filter(c => c.toLowerCase().includes(cityFilterSearch.toLowerCase()))
                        .map(city => (
                          <label key={city} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={selectedCities.includes(city)}
                              onChange={() => toggleFilter("city", city)}
                              className="accent-orange-500 rounded border-slate-300"
                            />
                            <span className="text-[11px] font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">{city}</span>
                          </label>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* STREAM FILTER */}
              <div className="border-b border-slate-100 pb-4">
                <button
                  onClick={() => setAccordionStates(p => ({ ...p, stream: !p.stream }))}
                  className="w-full flex items-center justify-between font-outfit font-extrabold text-slate-700 text-xs uppercase tracking-wider text-left"
                >
                  Stream / Category
                  {accordionStates.stream ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                
                {accordionStates.stream && (
                  <div className="mt-3 space-y-2 pt-1">
                    {filterOptions.streams.map(stream => (
                      <label key={stream} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedStreams.includes(stream)}
                          onChange={() => toggleFilter("stream", stream)}
                          className="accent-orange-500 rounded border-slate-300"
                        />
                        <span className="text-[11px] font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">{stream}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* COURSES FILTER */}
              <div className="border-b border-slate-100 pb-4">
                <button
                  onClick={() => setAccordionStates(p => ({ ...p, course: !p.course }))}
                  className="w-full flex items-center justify-between font-outfit font-extrabold text-slate-700 text-xs uppercase tracking-wider text-left"
                >
                  Courses Offered
                  {accordionStates.course ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                
                {accordionStates.course && (
                  <div className="mt-3 space-y-3">
                    <input
                      type="text"
                      placeholder="Search options..."
                      value={courseFilterSearch}
                      onChange={(e) => setCourseFilterSearch(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:border-orange-400"
                    />
                    <div className="max-h-40 overflow-y-auto space-y-2 no-scrollbar pr-1 pt-1">
                      {filterOptions.courses
                        .filter(c => c.toLowerCase().includes(courseFilterSearch.toLowerCase()))
                        .map(course => (
                          <label key={course} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={selectedCourses.includes(course)}
                              onChange={() => toggleFilter("course", course)}
                              className="accent-orange-500 rounded border-slate-300"
                            />
                            <span className="text-[11px] font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">{course}</span>
                          </label>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* SPECIALIZATION FILTER */}
              <div className="pb-2">
                <button
                  onClick={() => setAccordionStates(p => ({ ...p, specialization: !p.specialization }))}
                  className="w-full flex items-center justify-between font-outfit font-extrabold text-slate-700 text-xs uppercase tracking-wider text-left"
                >
                  Specialization
                  {accordionStates.specialization ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                
                {accordionStates.specialization && (
                  <div className="mt-3 space-y-3">
                    <input
                      type="text"
                      placeholder="Search options..."
                      value={specFilterSearch}
                      onChange={(e) => setSpecFilterSearch(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:border-orange-400"
                    />
                    <div className="max-h-40 overflow-y-auto space-y-2 no-scrollbar pr-1 pt-1">
                      {filterOptions.specializations
                        .filter(sp => sp.toLowerCase().includes(specFilterSearch.toLowerCase()))
                        .map(spec => (
                          <label key={spec} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={selectedSpecializations.includes(spec)}
                              onChange={() => toggleFilter("specialization", spec)}
                              className="accent-orange-500 rounded border-slate-300"
                            />
                            <span className="text-[11px] font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">{spec}</span>
                          </label>
                        ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </aside>

          {/* RIGHT SIDE: COLLEGES CARDS LIST */}
          <main className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredColleges.length > 0 ? (
                filteredColleges.map((college) => {
                  const isExpanded = expandedDescriptions.includes(college.id);
                  const isShortlisted = shortlisted.includes(college.id);

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      key={college.id}
                      className="group bg-white border border-slate-200/80 hover:border-orange-500/35 rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(249,115,22,0.06)] transition-all duration-350 flex flex-col"
                    >
                      <div className="p-6 md:p-7 space-y-5">
                        
                        {/* CARD HEADER ROW */}
                        <div className="flex items-start gap-4 justify-between relative">
                          <div className="flex items-center gap-3.5">
                            {/* LOGO BOX */}
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200/60 flex items-center justify-center text-xs font-black text-slate-800 uppercase tracking-widest shadow-sm">
                              {college.logoText}
                            </div>
                            
                            {/* TITLE & METADATA */}
                            <div>
                              <Link 
                                href={`/colleges/${college.slug}`}
                                className="font-outfit font-black text-sm md:text-base text-slate-800 hover:text-orange-500 hover:underline leading-snug transition-colors line-clamp-1"
                              >
                                {college.name}
                              </Link>
                              
                              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-bold text-slate-500 mt-1">
                                <span className="flex items-center gap-1 text-slate-600">
                                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                  {college.location}
                                </span>
                                <span>•</span>
                                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[9px] uppercase tracking-wider font-extrabold">{college.type}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-100/50 px-2 py-0.5 rounded-md text-[9px] font-extrabold">
                                  ★ {college.rating}
                                </span>
                                {college.nirfRank && (
                                  <>
                                    <span>•</span>
                                    <span className="bg-orange-50 text-orange-700 border border-orange-100/50 px-2 py-0.5 rounded-md text-[9px] font-extrabold">
                                      #{college.nirfRank} NIRF
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* ACCREDITATION BADGE */}
                          <div className="hidden sm:block absolute top-0 right-0 bg-slate-50 text-slate-500 border border-slate-200/60 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider">
                            {college.accreditation}
                          </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div>
                          <p className={`text-xs text-slate-500 leading-relaxed font-semibold ${isExpanded ? "" : "line-clamp-2"}`}>
                            {college.description}
                          </p>
                          <button
                            onClick={() => toggleDescription(college.id)}
                            className="text-[10px] font-black text-orange-600 hover:text-orange-700 uppercase tracking-wider mt-1.5 hover:underline"
                          >
                            {isExpanded ? "Collapse Description" : "... Read More"}
                          </button>
                        </div>

                        {/* STATS MATRIX GRID */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#fcfdfe] border border-slate-100/80 rounded-2xl text-center">
                          <div className="space-y-1 border-r border-slate-100/60 last:border-0">
                            <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest flex items-center justify-center gap-1">
                              <BookOpen className="w-3.5 h-3.5 text-slate-405" />
                              Courses
                            </p>
                            <p className="font-outfit font-black text-[11px] text-slate-700 uppercase">
                              {college.courses.join(", ")}
                            </p>
                          </div>
                          
                          <div className="space-y-1 border-r border-slate-100/60 last:border-0">
                            <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest flex items-center justify-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-slate-405" />
                              Exams Accepted
                            </p>
                            <p className="font-outfit font-black text-[11px] text-slate-700">
                              {college.exams.join(", ")}
                            </p>
                          </div>

                          <div className="space-y-1 border-r border-slate-100/60 last:border-0">
                            <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest flex items-center justify-center gap-1">
                              <DollarSign className="w-3.5 h-3.5 text-slate-405" />
                              Tuition Fees
                            </p>
                            <p className="font-outfit font-black text-[11px] text-orange-600">
                              {college.feeRange}
                            </p>
                          </div>

                          <div className="space-y-1 last:border-0">
                            <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest flex items-center justify-center gap-1">
                              <Award className="w-3.5 h-3.5 text-slate-405" />
                              Accreditation
                            </p>
                            <p className="font-outfit font-black text-[11px] text-slate-600 uppercase">
                              {college.accreditation}
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* BOTTOM ACTION BUTTONS */}
                      <div className="bg-slate-50/50 border-t border-slate-100/80 px-6 py-4 flex items-center justify-between gap-4">
                        {/* Acc badge for mobile layout */}
                        <div className="sm:hidden bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-wider">
                          {college.accreditation}
                        </div>

                        <div className="flex items-center gap-2.5 ml-auto w-full sm:w-auto">
                          {/* Shortlist Toggle */}
                          <button
                            onClick={() => {
                              if (isShortlisted) {
                                setShortlisted(prev => prev.filter(id => id !== college.id));
                              } else {
                                setShortlisted(prev => [...prev, college.id]);
                              }
                            }}
                            className={`flex items-center justify-center gap-1.5 px-4 py-2 border rounded-xl text-xs font-black uppercase tracking-wider transition-all w-1/2 sm:w-auto ${
                              isShortlisted 
                                ? "bg-orange-50 border-orange-200 text-orange-600 shadow-sm"
                                : "bg-white border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isShortlisted ? "fill-orange-500 text-orange-500" : ""}`} />
                            {isShortlisted ? "Shortlisted" : "Shortlist"}
                          </button>

                          {/* Brochure CTA (Triggers inquiry/alerts popup) */}
                          <button
                            onClick={() => openInquiryModal(college.stream)}
                            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-orange-500/10 active:scale-95 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            Apply / Brochure
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  );
                })
              ) : (
                <div className="py-16 px-4 bg-white border border-slate-200 rounded-3xl text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                    <HelpCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-outfit font-black text-lg text-slate-800">No Colleges Found</h3>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      We couldn't find any colleges matching your active filters. Try adjusting or clearing filters to browse others.
                    </p>
                  </div>
                  <button 
                    onClick={clearAllFilters}
                    className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </AnimatePresence>
          </main>

        </div>

      </div>

      {/* MOBILE STICKY BOTTOM TALK TO EXPERTS BAR */}
      <div 
        onClick={() => openInquiryModal("General")}
        className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-[10.5px] tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer z-40 md:hidden shadow-[0_-5px_20px_rgba(249,115,22,0.25)] border-t border-orange-400/20 active:scale-[0.99] transition-all"
      >
        <MessageSquare className="w-4 h-4 animate-bounce" />
        Talk to Counseling Experts
      </div>

    </div>
  );
}

export default function CollegesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] gap-3">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest animate-pulse">Loading colleges...</p>
      </div>
    }>
      <CollegesListContent />
    </Suspense>
  );
}
