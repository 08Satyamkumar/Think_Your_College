"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Award, 
  Search, 
  MapPin, 
  Star, 
  TrendingUp, 
  BookOpen, 
  CheckCircle,
  ChevronRight,
  Sparkles
} from "lucide-react";

interface RankedCollege {
  id: string;
  name: string;
  location: string;
  state: string;
  stream: string;
  type: string; // Government or Private
  logo: string;
  slug: string;
  fees: string;
  placements: string;
  rating: number;
  ranks: {
    nirf: number;
    bt: number;
    outlook: number;
  };
}

const mockRankedColleges: RankedCollege[] = [
  {
    id: "1",
    name: "IIM Ahmedabad - Indian Institute of Management",
    location: "Ahmedabad",
    state: "Gujarat",
    stream: "Management",
    type: "Government",
    logo: "IIMA",
    slug: "iim-ahmedabad",
    fees: "₹12.5 Lakhs/Yr",
    placements: "32.8 LPA Average",
    rating: 4.9,
    ranks: { nirf: 1, bt: 1, outlook: 1 }
  },
  {
    id: "2",
    name: "IIM Bangalore - Indian Institute of Management",
    location: "Bangalore",
    state: "Karnataka",
    stream: "Management",
    type: "Government",
    logo: "IIMB",
    slug: "iim-bangalore",
    fees: "₹11.8 Lakhs/Yr",
    placements: "30.5 LPA Average",
    rating: 4.8,
    ranks: { nirf: 2, bt: 2, outlook: 2 }
  },
  {
    id: "3",
    name: "IIT Delhi - Indian Institute of Technology",
    location: "New Delhi",
    state: "Delhi",
    stream: "Engineering",
    type: "Government",
    logo: "IITD",
    slug: "iit-delhi",
    fees: "₹2.2 Lakhs/Yr",
    placements: "25.0 LPA Average",
    rating: 4.9,
    ranks: { nirf: 2, bt: 0, outlook: 1 }
  },
  {
    id: "4",
    name: "IIT Bombay - Indian Institute of Technology",
    location: "Mumbai",
    state: "Maharashtra",
    stream: "Engineering",
    type: "Government",
    logo: "IITB",
    slug: "iit-bombay",
    fees: "₹2.3 Lakhs/Yr",
    placements: "26.8 LPA Average",
    rating: 4.9,
    ranks: { nirf: 3, bt: 0, outlook: 2 }
  },
  {
    id: "5",
    name: "AIIMS Delhi - All India Institute of Medical Sciences",
    location: "New Delhi",
    state: "Delhi",
    stream: "Medical",
    type: "Government",
    logo: "AIIMS",
    slug: "aiims-delhi",
    fees: "₹1,628/Yr",
    placements: "18.0 LPA Average",
    rating: 5.0,
    ranks: { nirf: 1, bt: 0, outlook: 1 }
  },
  {
    id: "6",
    name: "NLSIU - National Law School of India University",
    location: "Bangalore",
    state: "Karnataka",
    stream: "Law",
    type: "Government",
    logo: "NLSIU",
    slug: "nlsiu-bangalore",
    fees: "₹2.1 Lakhs/Yr",
    placements: "16.0 LPA Average",
    rating: 4.8,
    ranks: { nirf: 1, bt: 0, outlook: 1 }
  },
  {
    id: "7",
    name: "SIBM Pune - Symbiosis Institute of Business Management",
    location: "Pune",
    state: "Maharashtra",
    stream: "Management",
    type: "Private",
    logo: "SIBM",
    slug: "sibm-pune",
    fees: "₹10.2 Lakhs/Yr",
    placements: "23.0 LPA Average",
    rating: 4.6,
    ranks: { nirf: 17, bt: 10, outlook: 8 }
  },
  {
    id: "8",
    name: "CMC Vellore - Christian Medical College",
    location: "Vellore",
    state: "Tamil Nadu",
    stream: "Medical",
    type: "Private",
    logo: "CMC",
    slug: "cmc-vellore",
    fees: "₹1.5 Lakhs/Yr",
    placements: "9.5 LPA Average",
    rating: 4.8,
    ranks: { nirf: 3, bt: 0, outlook: 3 }
  },
  {
    id: "9",
    name: "KMC Mangalore - Kasturba Medical College",
    location: "Mangalore",
    state: "Karnataka",
    stream: "Medical",
    type: "Private",
    logo: "KMC",
    slug: "kmc-mangalore",
    fees: "₹17.8 Lakhs/Yr",
    placements: "12.0 LPA Average",
    rating: 4.7,
    ranks: { nirf: 21, bt: 0, outlook: 15 }
  },
  {
    id: "10",
    name: "RV College of Engineering",
    location: "Bangalore",
    state: "Karnataka",
    stream: "Engineering",
    type: "Private",
    logo: "RVCE",
    slug: "rv-college-of-engineering",
    fees: "₹2.5 Lakhs/Yr",
    placements: "14.5 LPA Average",
    rating: 4.4,
    ranks: { nirf: 85, bt: 0, outlook: 30 }
  },
  {
    id: "11",
    name: "CNLU Patna - Chanakya National Law University",
    location: "Patna",
    state: "Bihar",
    stream: "Law",
    type: "Government",
    logo: "CNLU",
    slug: "cnlu-patna",
    fees: "₹1.8 Lakhs/Yr",
    placements: "8.5 LPA Average",
    rating: 4.3,
    ranks: { nirf: 25, bt: 0, outlook: 20 }
  },
  {
    id: "12",
    name: "BIT Mesra Patna Campus",
    location: "Patna",
    state: "Bihar",
    stream: "Engineering",
    type: "Private",
    logo: "BITP",
    slug: "bit-mesra-patna",
    fees: "₹2.8 Lakhs/Yr",
    placements: "10.0 LPA Average",
    rating: 4.1,
    ranks: { nirf: 60, bt: 0, outlook: 45 }
  },
  {
    id: "13",
    name: "Galgotias University",
    location: "Greater Noida",
    state: "Uttar Pradesh",
    stream: "Engineering",
    type: "Private",
    logo: "GU",
    slug: "galgotias-university",
    fees: "₹1.6 Lakhs/Yr",
    placements: "8.5 LPA Average",
    rating: 4.2,
    ranks: { nirf: 95, bt: 0, outlook: 55 }
  },
  {
    id: "14",
    name: "Patna Science College",
    location: "Patna",
    state: "Bihar",
    stream: "Engineering",
    type: "Government",
    logo: "PSC",
    slug: "patna-science-college",
    fees: "₹15,000/Yr",
    placements: "4.5 LPA Average",
    rating: 4.0,
    ranks: { nirf: 150, bt: 0, outlook: 100 }
  },
  {
    id: "15",
    name: "NSIT Patna - Netaji Subhas Institute of Technology",
    location: "Patna",
    state: "Bihar",
    stream: "Engineering",
    type: "Private",
    logo: "NSIT",
    slug: "nsit-patna",
    fees: "₹1.1 Lakhs/Yr",
    placements: "5.5 LPA Average",
    rating: 3.9,
    ranks: { nirf: 190, bt: 0, outlook: 120 }
  }
];

function RankingContent() {
  const searchParams = useSearchParams();
  const initialStream = searchParams.get("stream") || "All";
  const initialType = searchParams.get("type") || "All";

  // State
  const [publisher, setPublisher] = useState<"nirf" | "bt" | "outlook">("nirf");
  const [selectedStream, setSelectedStream] = useState(initialStream);
  const [selectedType, setSelectedType] = useState(initialType);
  const [searchQuery, setSearchQuery] = useState("");

  const publishers = [
    { id: "nirf", name: "NIRF Ranking 2025" },
    { id: "bt", name: "Business Today 2025" },
    { id: "outlook", name: "Outlook 2026" }
  ] as const;

  const streams = ["All", "Engineering", "Management", "Medical", "Law"];

  // Filter rankings based on selected states
  const rankedData = useMemo(() => {
    return mockRankedColleges
      .filter(college => {
        // Must have rank for this publisher
        const rank = college.ranks[publisher];
        if (rank === 0) return false;

        // Stream Filter
        if (selectedStream !== "All" && college.stream.toLowerCase() !== selectedStream.toLowerCase()) {
          return false;
        }

        // Type Filter (Government/Private)
        if (selectedType !== "All" && college.type.toLowerCase() !== selectedType.toLowerCase()) {
          return false;
        }

        // Search Query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return college.name.toLowerCase().includes(q) || college.location.toLowerCase().includes(q);
        }

        return true;
      })
      .sort((a, b) => a.ranks[publisher] - b.ranks[publisher]);
  }, [publisher, selectedStream, selectedType, searchQuery]);

  return (
    <div className="space-y-8">
      {/* HERO SECTION */}
      <div className="bg-card border border-border p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
            <Award className="w-4 h-4" />
            UGC & NIRF Approved Ranks
          </div>
          <h1 className="font-outfit font-black text-2xl md:text-3xl text-text_primary leading-tight">
            Top Ranked Colleges in India
          </h1>
          <p className="text-text_secondary text-xs md:text-sm max-w-2xl leading-relaxed">
            Compare premium educational institutes verified by national rank publishers like NIRF, Outlook, and Business Today. Check real-time seat matrices and counseling cutoffs.
          </p>
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="bg-card border border-border p-4 rounded-2xl shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
        
        {/* Publisher Tabs (NIRF / BT / Outlook) */}
        <div className="flex bg-background border border-border p-1 rounded-xl w-full lg:w-auto">
          {publishers.map((pub) => (
            <button
              key={pub.id}
              onClick={() => setPublisher(pub.id)}
              className={`flex-1 lg:flex-initial px-4 py-2 text-center rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                publisher === pub.id 
                  ? "bg-primary text-white shadow-sm" 
                  : "text-text_secondary hover:text-text_primary"
              }`}
            >
              {pub.name}
            </button>
          ))}
        </div>

        {/* Stream Filters */}
        <div className="flex flex-wrap gap-2 justify-center w-full lg:w-auto">
          {streams.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStream(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                selectedStream === st 
                  ? "bg-primary/10 border-primary/25 text-primary" 
                  : "bg-background border-border text-text_secondary hover:bg-border/30"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search Bar inside rankings */}
        <div className="relative w-full lg:w-64">
          <input 
            type="text"
            placeholder="Search a college in rankings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-border bg-background rounded-xl text-xs outline-none focus:border-primary text-text_primary font-semibold"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* RANKINGS CONTENT TABLE */}
      {rankedData.length === 0 ? (
        <div className="py-20 bg-card border border-border rounded-3xl text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto text-text_secondary border border-border">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="font-outfit font-bold text-lg text-text_primary">No Rankings Match</h3>
          <p className="text-xs text-text_secondary max-w-sm mx-auto">
            We couldn't find any ranked colleges matching your conditions. Try switching publishers or streams.
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-500/5 text-text_secondary text-[10px] font-bold uppercase tracking-wider border-b border-border">
                  <th className="py-4 px-6 text-center w-20">Rank</th>
                  <th className="py-4 px-6">College Details</th>
                  <th className="py-4 px-6 w-40">Annual Fees</th>
                  <th className="py-4 px-6 w-44">Placements</th>
                  <th className="py-4 px-6 w-48 text-center">Admission Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {rankedData.map((college) => {
                  const rankVal = college.ranks[publisher];
                  return (
                    <tr 
                      key={college.id}
                      className="hover:bg-slate-500/5 transition-colors"
                    >
                      {/* Rank Position */}
                      <td className="py-5 px-6 text-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-black shadow-sm ${
                          rankVal === 1 
                            ? "bg-amber-500 text-white shadow-amber-500/20" 
                            : rankVal === 2 
                            ? "bg-slate-400 text-white shadow-slate-400/20" 
                            : rankVal === 3 
                            ? "bg-amber-700/80 text-white" 
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        }`}>
                          #{rankVal}
                        </span>
                      </td>

                      {/* College Logo, Name, Location */}
                      <td className="py-5 px-6">
                        <div className="flex gap-4 items-center">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-teal-500/10 border border-border flex items-center justify-center font-outfit font-extrabold text-xs text-primary flex-shrink-0">
                            {college.logo}
                          </div>
                          <div>
                            <Link 
                              href={`/colleges/${college.slug}`}
                              className="font-outfit font-extrabold text-xs text-text_primary hover:text-primary transition-colors block leading-tight line-clamp-2"
                            >
                              {college.name}
                            </Link>
                            <div className="flex items-center gap-3 mt-1.5">
                              <span className="inline-flex items-center gap-1 text-[9px] text-text_secondary font-bold">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                {college.location}, {college.state}
                              </span>
                              <span className="w-1 h-1 bg-border rounded-full" />
                              <span className="text-[9px] font-black uppercase text-primary tracking-wider">
                                {college.stream}
                              </span>
                              <span className="w-1 h-1 bg-border rounded-full" />
                              <div className="flex items-center gap-0.5 text-[9px] font-black text-amber-500">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                {college.rating}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Course Fees */}
                      <td className="py-5 px-6 font-outfit font-extrabold text-xs text-text_primary">
                        {college.fees}
                        <span className="block text-[8px] text-text_secondary font-medium mt-0.5">Average Tution Fee</span>
                      </td>

                      {/* Average Packages */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="font-outfit font-extrabold text-xs text-emerald-600 dark:text-emerald-400">
                            {college.placements}
                          </span>
                        </div>
                        <span className="block text-[8px] text-text_secondary font-semibold mt-0.5">Verified Placement Packages</span>
                      </td>

                      {/* Counseling Actions */}
                      <td className="py-5 px-6 text-center">
                        <div className="flex gap-2 justify-center">
                          <Link
                            href={`/colleges/${college.slug}`}
                            className="px-3.5 py-2 border border-border hover:bg-border/30 rounded-xl text-[10px] font-bold text-text_secondary transition-colors"
                          >
                            Details
                          </Link>
                          <button
                            onClick={() => alert(`Registration callback requested for ${college.name}`)}
                            className="px-4 py-2 bg-gradient-premium hover:bg-primary text-white font-bold text-[10px] rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                          >
                            Apply Now
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* QUICK PREDICTOR CALLOUT */}
      <div className="bg-gradient-premium border border-primary/20 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md text-white">
        <div className="space-y-2">
          <h4 className="font-outfit font-extrabold text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
            Confused About Your Counseling Options?
          </h4>
          <p className="text-xs text-indigo-100 max-w-xl">
            Input your JEE, CAT, or NEET ranks into our automated counseling predictor tool to evaluate your admission chances instantly.
          </p>
        </div>
        <Link 
          href="/predictor"
          className="w-full md:w-auto px-5 py-3 bg-white text-primary hover:bg-indigo-50 font-bold text-xs rounded-xl shadow-md text-center"
        >
          Predict My College
        </Link>
      </div>

    </div>
  );
}

export default function RankingPage() {
  return (
    <React.Suspense fallback={
      <div className="py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-bold text-text_primary">Loading college rankings...</p>
      </div>
    }>
      <RankingContent />
    </React.Suspense>
  );
}
