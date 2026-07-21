"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Star, 
  Building, 
  Briefcase, 
  BookOpen, 
  GraduationCap, 
  CheckCircle, 
  Download,
  PhoneCall,
  Wifi,
  User,
  Coffee,
  Heart,
  TrendingUp
} from "lucide-react";

const iconMap: Record<string, any> = {
  Building,
  BookOpen,
  Wifi,
  Coffee,
  Heart
};



// Database mapping for colleges based on slug
const collegesDb: Record<string, {
  name: string;
  location: string;
  nirfRank: string;
  rating: number;
  ratingCount: string;
  type: string;
  estd: string;
  stream: string;
  highestPackage: string;
  averagePackage: string;
  totalFees: string;
  courses: { name: string; duration: string; fees: string; eligibility: string }[];
  recruiters: string[];
  reviews: { id: string; author: string; course: string; year: string; rating: number; title: string; content: string }[];
  cutoffs: { branch: string; openRank: string | number; closeRank: string | number }[];
  facilities: { name: string; icon: string }[];
}> = {
  "iim-ahmedabad": {
    name: "IIM Ahmedabad - Indian Institute of Management",
    location: "Vastrapur, Ahmedabad, Gujarat",
    nirfRank: "NIRF #1 (Management)",
    rating: 4.9,
    ratingCount: "348 Reviews",
    type: "Government (Autonomous)",
    estd: "1961",
    stream: "Management",
    highestPackage: "61.5 LPA",
    averagePackage: "32.8 LPA",
    totalFees: "₹25.0 Lakhs (2 Years)",
    courses: [
      { name: "MBA / PGP (Post Graduate Programme in Management)", duration: "2 Years", fees: "₹12,50,000 / Yr", eligibility: "CAT percentile (99.5+) + Interview" },
      { name: "PGP-FABM (Food and Agri-Business Management)", duration: "2 Years", fees: "₹11,00,000 / Yr", eligibility: "CAT percentile (98.0+) + Interview" },
      { name: "PGPX (Executive MBA for Professionals)", duration: "1 Year", fees: "₹30,00,000 / Yr", eligibility: "GMAT/GRE + 4+ Years Experience" }
    ],
    recruiters: ["McKinsey", "BCG", "Bain & Co", "Goldman Sachs", "JP Morgan", "Morgan Stanley", "Google", "Microsoft"],
    reviews: [
      { id: "1", author: "Aman Sen", course: "MBA (Batch 2024)", year: "3 days ago", rating: 5, title: "The pinnacle of business education in Asia", content: "Outstanding academic rigor, cases are taught by world-class faculty. The peer group is extremely brilliant. Placements are 100% within the first two days of the placement drive." }
    ],
    cutoffs: [
      { branch: "General Category CAT Percentile", openRank: "99.9", closeRank: "99.5" },
      { branch: "OBC Category CAT Percentile", openRank: "95.0", closeRank: "92.0" },
      { branch: "SC/ST Category CAT Percentile", openRank: "90.0", closeRank: "85.0" }
    ],
    facilities: [
      { name: "Central Library", icon: "BookOpen" },
      { name: "High-Speed Wi-Fi", icon: "Wifi" },
      { name: "Executive Hostel", icon: "Building" },
      { name: "Student Canteen", icon: "Coffee" }
    ]
  },
  "iim-bangalore": {
    name: "IIM Bangalore - Indian Institute of Management",
    location: "Bannerghatta Road, Bangalore, Karnataka",
    nirfRank: "NIRF #2 (Management)",
    rating: 4.8,
    ratingCount: "298 Reviews",
    type: "Government (Autonomous)",
    estd: "1973",
    stream: "Management",
    highestPackage: "55.0 LPA",
    averagePackage: "30.5 LPA",
    totalFees: "₹24.5 Lakhs (2 Years)",
    courses: [
      { name: "MBA / PGP (Post Graduate Programme in Management)", duration: "2 Years", fees: "₹12,25,000 / Yr", eligibility: "CAT percentile (99.3+) + Interview" },
      { name: "PGP-BA (Business Analytics)", duration: "2 Years", fees: "₹12,25,000 / Yr", eligibility: "CAT percentile (99.0+) + interview" },
      { name: "EPGP (One Year MBA for Executives)", duration: "1 Year", fees: "₹28,50,000 / Yr", eligibility: "GMAT/GRE + 5+ Years Experience" }
    ],
    recruiters: ["McKinsey", "BCG", "Bain & Co", "Microsoft", "Amazon", "Aditya Birla Group", "Tata Group"],
    reviews: [
      { id: "1", author: "Shikha Hegde", course: "MBA (Batch 2024)", year: "5 days ago", rating: 5, title: "Exceptional peer learning and campus life", content: "Lush green stone-walled campus is a treat. Academic standards are very high but the placement outcomes justify the hard work. Extremely strong alumni network." }
    ],
    cutoffs: [
      { branch: "General Category CAT Percentile", openRank: "99.8", closeRank: "99.3" },
      { branch: "OBC Category CAT Percentile", openRank: "94.5", closeRank: "91.8" }
    ],
    facilities: [
      { name: "Green Campus", icon: "Building" },
      { name: "Auditorium", icon: "Building" },
      { name: "Central Library", icon: "BookOpen" },
      { name: "High-Speed Wi-Fi", icon: "Wifi" }
    ]
  },
  "sibm-pune": {
    name: "SIBM Pune - Symbiosis Institute of Business Management",
    location: "Lavale Campus, Pune, Maharashtra",
    nirfRank: "NIRF #17 (Management)",
    rating: 4.6,
    ratingCount: "256 Reviews",
    type: "Private (Deemed)",
    estd: "1978",
    stream: "Management",
    highestPackage: "45.5 LPA",
    averagePackage: "23.0 LPA",
    totalFees: "₹20.4 Lakhs (2 Years)",
    courses: [
      { name: "MBA (Master of Business Administration)", duration: "2 Years", fees: "₹10,20,000 / Yr", eligibility: "SNAP score + GE-PIWAT (98.0+ SNAP percentile)" },
      { name: "MBA in Innovation & Entrepreneurship", duration: "2 Years", fees: "₹8,50,000 / Yr", eligibility: "SNAP score + GE-PIWAT" },
      { name: "Executive MBA", duration: "2 Years", fees: "₹3,50,000 / Yr", eligibility: "Written Test + 2+ Years Experience" }
    ],
    recruiters: ["ITC", "P&G", "Accenture", "Wipro", "HDFC Bank", "ICICI Bank", "Deloitte", "KPMG"],
    reviews: [
      { id: "1", author: "Rohan Deshmukh", course: "MBA General (Batch 2025)", year: "1 week ago", rating: 5, title: "Hilltop paradise with outstanding corporate connections", content: "The Lavale campus is beautiful. Excellent industry exposure through guest lectures. The placement cell is incredibly active and brings top-tier FMCG and consulting firms." }
    ],
    cutoffs: [
      { branch: "SNAP Percentile Cutoff", openRank: "98.5", closeRank: "97.8" }
    ],
    facilities: [
      { name: "Hilltop Campus", icon: "Building" },
      { name: "Modern Sports Complex", icon: "Heart" },
      { name: "Hostels", icon: "Building" },
      { name: "Wi-Fi Access", icon: "Wifi" }
    ]
  },
  "iit-delhi": {
    name: "IIT Delhi - Indian Institute of Technology",
    location: "Hauz Khas, New Delhi, Delhi",
    nirfRank: "NIRF #2 (Engineering)",
    rating: 4.9,
    ratingCount: "842 Reviews",
    type: "Government (Autonomous)",
    estd: "1961",
    stream: "Engineering",
    highestPackage: "1.2 Crore PA",
    averagePackage: "21.5 Lakhs PA",
    totalFees: "₹8.8 Lakhs (4 Years)",
    courses: [
      { name: "B.Tech Computer Science and Engineering", duration: "4 Years", fees: "₹2,20,000 / Yr", eligibility: "JEE Advanced + 75% in 12th Class" },
      { name: "B.Tech Electronics and Communication Engineering", duration: "4 Years", fees: "₹2,20,000 / Yr", eligibility: "JEE Advanced + 75% in 12th Class" },
      { name: "B.Tech Mechanical Engineering", duration: "4 Years", fees: "₹2,20,000 / Yr", eligibility: "JEE Advanced + 75% in 12th Class" },
      { name: "B.Tech Civil Engineering", duration: "4 Years", fees: "₹2,20,000 / Yr", eligibility: "JEE Advanced + 75% in 12th Class" }
    ],
    recruiters: ["Microsoft", "Google", "Amazon", "TCS", "Infosys", "Goldman Sachs", "Uber", "Apple"],
    reviews: [
      { id: "1", author: "Rahul Sharma", course: "B.Tech CSE (Batch 2024)", year: "2 days ago", rating: 5, title: "The best engineering experience in India", content: "Campus life is amazing and placements are second to none. Faculty are highly research-oriented but very approachable. Hostel facilities are good with proper high-speed internet everywhere." },
      { id: "2", author: "Anjali Gupta", course: "B.Tech ECE (Batch 2025)", year: "1 week ago", rating: 4, title: "Rigorous academics but rewarding opportunities", content: "The curriculum is tough and exams are frequent. However, the placement cell is extremely helpful. Coding culture in campus is outstanding, even for non-CSE branches." }
    ],
    cutoffs: [
      { branch: "Computer Science (CSE)", openRank: 115, closeRank: 118 },
      { branch: "Electronics & Communication (ECE)", openRank: 420, closeRank: 580 },
      { branch: "Mechanical Engineering", openRank: 850, closeRank: 1200 },
      { branch: "Civil Engineering", openRank: 1800, closeRank: 2400 }
    ],
    facilities: [
      { name: "High-Speed Wi-Fi", icon: "Wifi" },
      { name: "Modern Labs", icon: "Building" },
      { name: "Central Library", icon: "BookOpen" },
      { name: "Student Canteen", icon: "Coffee" },
      { name: "Sports Complex", icon: "Heart" }
    ]
  }
};

export default function CollegeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Selected Tab State
  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "placement" | "reviews" | "cutoff">("overview");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", stream: "Engineering" });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", phone: "", stream: "Engineering" });
    }, 2000);
  };

  // Lookup details for college based on slug, fallback to iit-delhi
  const collegeInfo = collegesDb[slug] || collegesDb["iit-delhi"];

  const cutoffsTabName = collegeInfo.stream === "Management" ? "CAT Cutoffs" : "JEE Cutoffs";

  const tabs = [
    { id: "overview", name: "Overview" },
    { id: "courses", name: "Courses & Fees" },
    { id: "placement", name: "Placements" },
    { id: "reviews", name: "Reviews" },
    { id: "cutoff", name: cutoffsTabName }
  ] as const;

  return (
    <div className="space-y-8">
      {/* COLLEGE HERO BANNER */}
      <section className="relative rounded-3xl overflow-hidden h-[250px] md:h-[350px] bg-slate-900 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-transparent z-10" />
        
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-teal-500/20 flex items-center justify-center text-white/10 text-6xl font-black font-outfit select-none">
          {collegeInfo.name.split(" - ")[0]}
        </div>

        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20 space-y-3 max-w-4xl text-white">
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 bg-primary text-white text-[9px] font-extrabold rounded-lg tracking-wider uppercase">
              {collegeInfo.type}
            </span>
            <span className="px-2.5 py-1 bg-emerald-500 text-white text-[9px] font-extrabold rounded-lg tracking-wider uppercase">
              {collegeInfo.nirfRank}
            </span>
          </div>

          <h1 className="font-outfit font-extrabold text-2xl md:text-3xl tracking-tight leading-tight">
            {collegeInfo.name}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300 font-sans">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" />
              {collegeInfo.location}
            </span>
            <span>Estd. {collegeInfo.estd}</span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-white">{collegeInfo.rating}</span> ({collegeInfo.ratingCount})
            </span>
          </div>
        </div>
      </section>

      {/* STICKY TAB NAV BAR */}
      <div className="sticky top-16 md:top-0 bg-background/80 backdrop-blur-md z-30 border-b border-border py-2 flex items-center overflow-x-auto scrollbar-none gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id 
                ? "bg-primary text-white shadow-md shadow-primary/10" 
                : "text-text_secondary hover:bg-border/30 hover:text-text_primary"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* CORE GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        
        {/* LEFT COLUMN: TAB CONTENT (70%) */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm min-h-[300px]"
            >
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h2 className="font-outfit font-bold text-lg text-text_primary">About the Institution</h2>
                    <p className="text-xs text-text_secondary leading-relaxed">
                      Indian Institute of Technology Delhi (IIT Delhi) is a public research university located in Hauz Khas, Delhi, India. Established in 1961, it is one of the oldest and most prestigious Institutes of Technology in India.
                    </p>
                    <p className="text-xs text-text_secondary leading-relaxed">
                      IIT Delhi offers Bachelor of Technology programs in various fields as well as postgraduate degrees including M.Tech, Ph.D., and MBA. The campus is spread over 325 acres of lush green land and hosts state-of-the-art labs, incubation centers, and research parks.
                    </p>
                  </div>

                  {/* KEY STATS QUICK VIEW */}
                  <div className="grid grid-cols-3 gap-4 py-4 px-6 bg-background border border-border rounded-2xl">
                    <div className="text-center">
                      <p className="text-[9px] text-text_secondary font-semibold uppercase">Highest Pack</p>
                      <p className="font-outfit font-extrabold text-sm md:text-base text-emerald-500">{collegeInfo.highestPackage}</p>
                    </div>
                    <div className="text-center border-x border-border">
                      <p className="text-[9px] text-text_secondary font-semibold uppercase">Average Fee</p>
                      <p className="font-outfit font-extrabold text-sm md:text-base text-text_primary">{collegeInfo.totalFees}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] text-text_secondary font-semibold uppercase">NIRF Rank</p>
                      <p className="font-outfit font-extrabold text-sm md:text-base text-primary">{collegeInfo.nirfRank.split(" ")[1] || "Rank"}</p>
                    </div>
                  </div>

                  {/* FACILITIES */}
                  <div className="space-y-3">
                    <h3 className="font-outfit font-bold text-sm text-text_primary">Campus Facilities</h3>
                    <div className="flex flex-wrap gap-3">
                      {collegeInfo.facilities.map((fac, idx) => {
                        const IconComponent = iconMap[fac.icon] || Building;
                        return (
                          <div 
                            key={idx}
                            className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-xl text-xs font-semibold text-text_secondary"
                          >
                            <IconComponent className="w-4 h-4 text-primary" />
                            {fac.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: COURSES & FEES */}
              {activeTab === "courses" && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-border">
                    <h2 className="font-outfit font-bold text-lg text-text_primary">Undergraduate Programs (B.Tech)</h2>
                    <p className="text-[10px] text-text_secondary">Detailed tuition fees structure and eligibility criteria</p>
                  </div>

                  <div className="space-y-4">
                    {collegeInfo.courses.map((course, idx) => (
                      <div 
                        key={idx}
                        className="p-4 border border-border bg-background rounded-2xl space-y-3 hover:border-primary/20 transition-all duration-200"
                      >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                          <h3 className="font-outfit font-bold text-sm text-text_primary leading-snug">
                            {course.name}
                          </h3>
                          <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-lg h-fit w-fit whitespace-nowrap">
                            {course.fees}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] font-semibold text-text_secondary pt-2 border-t border-border/40">
                          <p>⏱ Duration: {course.duration}</p>
                          <p>🎯 Entry Requirement: {course.eligibility}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: PLACEMENTS */}
              {activeTab === "placement" && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-border">
                    <h2 className="font-outfit font-bold text-lg text-text_primary">Placement Highlights (2024 Batch)</h2>
                    <p className="text-[10px] text-text_secondary">Highest package, average salary package, and placement rate statistics</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center space-y-1">
                      <Briefcase className="w-5 h-5 text-emerald-500 mx-auto" />
                      <p className="text-[10px] text-text_secondary font-semibold">Highest Package</p>
                      <p className="font-outfit font-black text-base md:text-lg text-emerald-600 dark:text-emerald-400">{collegeInfo.highestPackage}</p>
                    </div>

                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl text-center space-y-1">
                      <TrendingUp className="w-5 h-5 text-primary mx-auto" />
                      <p className="text-[10px] text-text_secondary font-semibold">Average Package</p>
                      <p className="font-outfit font-black text-base md:text-lg text-primary">{collegeInfo.averagePackage}</p>
                    </div>

                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-center space-y-1">
                      <GraduationCap className="w-5 h-5 text-amber-500 mx-auto" />
                      <p className="text-[10px] text-text_secondary font-semibold">Placement Rate</p>
                      <p className="font-outfit font-black text-base md:text-lg text-amber-600 dark:text-amber-400">97.2%</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-outfit font-bold text-sm text-text_primary">Top Recruiter Networks</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {collegeInfo.recruiters.map((rec) => (
                        <div 
                          key={rec}
                          className="flex items-center justify-center p-3 bg-background border border-border rounded-xl font-bold text-xs text-text_secondary"
                        >
                          {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: REVIEWS */}
              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-border flex items-center justify-between">
                    <div>
                      <h2 className="font-outfit font-bold text-lg text-text_primary">Student Reviews</h2>
                      <p className="text-[10px] text-text_secondary">Real reviews verified by current and former students</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {collegeInfo.reviews.map((rev) => (
                      <div key={rev.id} className="p-4 border border-border bg-background rounded-2xl space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-text_secondary">
                              <User className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="font-outfit font-bold text-xs text-text_primary">{rev.author}</h4>
                              <p className="text-[9px] text-text_secondary">{rev.course} • {rev.year}</p>
                            </div>
                          </div>

                          <div className="bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg flex items-center gap-1 text-[9px] font-extrabold text-amber-600 dark:text-amber-400">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {rev.rating}.0 / 5.0
                          </div>
                        </div>

                        <div className="space-y-1">
                          <h5 className="font-outfit font-bold text-xs text-text_primary">"{rev.title}"</h5>
                          <p className="text-[11px] text-text_secondary leading-relaxed font-medium">{rev.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: CUTOFFS */}
              {activeTab === "cutoff" && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-border">
                    <h2 className="font-outfit font-bold text-lg text-text_primary">JEE Advanced Cutoff Ranks (Round 1)</h2>
                    <p className="text-[10px] text-text_secondary">Official closing ranks cutoff trends for primary branches</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-[11px]">
                      <thead>
                        <tr className="border-b border-border text-text_secondary uppercase font-bold">
                          <th className="py-2 px-3">B.Tech Branch</th>
                          <th className="py-2 px-3">Opening Rank</th>
                          <th className="py-2 px-3">Closing Rank</th>
                        </tr>
                      </thead>
                      <tbody className="font-medium text-text_primary">
                        {collegeInfo.cutoffs.map((cutoff, idx) => (
                          <tr key={idx} className="border-b border-border/40 hover:bg-border/10">
                            <td className="py-2.5 px-3 font-bold">{cutoff.branch}</td>
                            <td className="py-2.5 px-3 text-emerald-500 font-bold">{cutoff.openRank}</td>
                            <td className="py-2.5 px-3 text-red-500 font-bold">{cutoff.closeRank}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: STICKY INQUIRY CARD (30%) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="sticky top-20 bg-card border border-border p-6 rounded-3xl shadow-sm space-y-6">
            <div className="space-y-2">
              <h3 className="font-outfit font-bold text-base text-text_primary">Admission Counsel Support</h3>
              <p className="text-[11px] text-text_secondary leading-relaxed">
                Connect with our expert admissions advisor. Get syllabus, fee concession structure, and document guidelines.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] text-text_secondary font-bold">Student Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="Enter full name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-xl bg-background text-xs text-text_primary outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] text-text_secondary font-bold">Mobile Number</label>
                <input 
                  required
                  type="tel" 
                  placeholder="Enter mobile number" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-xl bg-background text-xs text-text_primary outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2 pt-2">
                <button 
                  type="submit"
                  className="w-full py-2.5 bg-primary hover:bg-primary_hover text-white font-bold text-xs rounded-xl active:scale-95 transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  Call Me Back
                </button>

                <button 
                  type="button"
                  onClick={() => alert("Downloading brochure...")}
                  className="w-full py-2.5 border border-border hover:bg-border/30 text-text_primary font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-text_secondary" />
                  Download Brochure
                </button>
              </div>
            </form>

            <div className="pt-4 border-t border-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <p className="text-[9px] text-text_secondary leading-relaxed">
                Your data is 100% confidential. Admissions guidance under Bihar Student Credit Card accepted.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP CONFIRMATION SUCCESS */}
      <AnimatePresence>
        {formSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xs p-6 bg-card border border-border rounded-2xl text-center space-y-4 shadow-2xl"
            >
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-outfit font-bold text-base text-text_primary">Request Registered!</h3>
              <p className="text-xs text-text_secondary">
                Our counselor will connect with you on **+91 {formData.phone}** within 15 minutes.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
