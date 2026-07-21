"use client";

import React, { useState } from "react";
import AuthModal from "@/components/AuthModal";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  GraduationCap, 
  ChevronDown, 
  Menu, 
  X, 
  Award,
  BookOpen,
  Layers,
  FileText,
  MapPin,
  Shuffle,
  Star,
  Percent,
  Compass,
  MessageSquare,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  ChevronRight
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

interface MegaMenuItem {
  category: string;
  links: { name: string; href: string }[];
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMbaTab, setActiveMbaTab] = useState("Top Ranked Colleges");
  const [activeEngTab, setActiveEngTab] = useState("Top Ranked Colleges");
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: "login" | "signup" }>({
    open: false,
    mode: "login",
  });
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  // Theme is always light — useTheme kept for context but toggle not used
  useTheme();

  // MBA Mega Menu Sub-tabs structure matching screenshot
  const mbaTabs: Record<string, { name: string; href: string }[]> = {
    "Top Ranked Colleges": [
      { name: "Top MBA Colleges in India", href: "/colleges/ranking?stream=Management" },
      { name: "Top Private MBA Colleges in India", href: "/colleges/ranking?stream=Management" },
      { name: "Top MBA Colleges in Bangalore", href: "/colleges?stream=Management&state=Karnataka" },
      { name: "Top MBA Colleges in Mumbai", href: "/colleges?stream=Management&state=Maharashtra" },
      { name: "Top MBA Colleges in Pune", href: "/colleges?stream=Management&state=Maharashtra" },
      { name: "Top MBA Colleges in Hyderabad", href: "/colleges?stream=Management" },
      { name: "Top MBA Colleges in Delhi", href: "/colleges?stream=Management&state=Delhi" },
      { name: "Top MBA Colleges in Chennai", href: "/colleges?stream=Management" },
      { name: "Top MBA Colleges in Maharashtra", href: "/colleges?stream=Management&state=Maharashtra" },
      { name: "Top MBA Colleges in Kolkata", href: "/colleges?stream=Management" },
      { name: "Top MBA Colleges in Kerala", href: "/colleges?stream=Management" },
    ],
    "Popular Courses": [
      { name: "MBA General", href: "/colleges?stream=Management" },
      { name: "Executive MBA", href: "/colleges?stream=Management" },
      { name: "Distance MBA", href: "/colleges?stream=Management" },
      { name: "PGDM Program", href: "/colleges?stream=Management" },
    ],
    "Popular Specializations": [
      { name: "MBA in Finance", href: "/colleges?stream=Management&search=Finance" },
      { name: "MBA in Healthcare Management", href: "/colleges?stream=Management&search=Healthcare" },
      { name: "MBA in HR", href: "/colleges?stream=Management&search=HR" },
      { name: "MBA in IT", href: "/colleges?stream=Management&search=IT" },
      { name: "MBA in Operations Management", href: "/colleges?stream=Management&search=Operations" },
      { name: "MBA in Marketing", href: "/colleges?stream=Management&search=Marketing" },
      { name: "MBA in International Business", href: "/colleges?stream=Management&search=International" },
      { name: "MBA in Pharmaceutical Management", href: "/colleges?stream=Management&search=Pharmaceutical" },
      { name: "MBA in Digital Marketing", href: "/colleges?stream=Management&search=Digital" },
      { name: "MBA in Data Analytics", href: "/colleges?stream=Management&search=Analytics" },
      { name: "MBA in Entrepreneurship", href: "/colleges?stream=Management&search=Entrepreneurship" },
      { name: "MBA in Family Managed Business", href: "/colleges?stream=Management&search=Family" },
      { name: "MBA in Agriculture", href: "/colleges?stream=Management&search=Agriculture" },
      { name: "MBA in product management", href: "/colleges?stream=Management&search=product" },
      { name: "MBA in General Management", href: "/colleges?stream=Management&search=General" },
      { name: "MBA in Data Science", href: "/colleges?stream=Management&search=Data" },
    ],
    "Exams": [
      { name: "CAT", href: "/predictor?exam=CAT" },
      { name: "CMAT", href: "/predictor?exam=CMAT" },
      { name: "SNAP", href: "/predictor?exam=SNAP" },
      { name: "XAT", href: "/predictor?exam=XAT" },
      { name: "MAT", href: "/predictor?exam=MAT" },
      { name: "ATMA", href: "/predictor?exam=ATMA" },
      { name: "NMAT by GMAC", href: "/predictor?exam=NMAT" },
      { name: "IBSAT", href: "/predictor?exam=IBSAT" },
      { name: "KIITEE Management", href: "/predictor?exam=KIITEE" },
      { name: "UPCET", href: "/predictor?exam=UPCET" },
      { name: "UPESMET", href: "/predictor?exam=UPESMET" },
      { name: "All MBA Exams >", href: "/predictor" },
      { name: "Exam Calendar >", href: "/predictor" },
    ],
    "Colleges By Location": [
      { name: "MBA Colleges in India", href: "/colleges?stream=Management" },
      { name: "MBA Colleges in Bangalore", href: "/colleges?stream=Management&state=Karnataka" },
      { name: "MBA Colleges in Chennai", href: "/colleges?stream=Management&state=Tamil Nadu" },
      { name: "MBA Colleges in Delhi-NCR", href: "/colleges?stream=Management&state=Delhi" },
      { name: "MBA Colleges in Hyderabad", href: "/colleges?stream=Management" },
      { name: "MBA Colleges in Kolkata", href: "/colleges?stream=Management" },
      { name: "MBA Colleges in Mumbai", href: "/colleges?stream=Management&state=Maharashtra" },
      { name: "MBA Colleges in Pune", href: "/colleges?stream=Management&state=Maharashtra" },
      { name: "All Locations >", href: "/colleges?stream=Management" },
    ],
    "Compare Colleges": [
      { name: "IIM Ahmedabad Vs IIM Bangalore", href: "/compare?ids=1,2" },
      { name: "IIM Ahmedabad Vs IIM Calcutta", href: "/compare?ids=1,10" },
      { name: "SIBM Pune Vs SCMHRD Pune", href: "/compare?ids=7,14" },
      { name: "SP Jain (SPJIMR) Vs MDI Gurgaon", href: "/compare?ids=11,15" },
      { name: "NMIMS SBM Mumbai Vs SP Jain (SPJIMR)", href: "/compare?ids=12,11" },
      { name: "Compare other MBA colleges >", href: "/compare" },
    ],
    "College Reviews": [
      { name: "IIM Ahmedabad Reviews", href: "/colleges/iim-ahmedabad#reviews" },
      { name: "IIM Bangalore Reviews", href: "/colleges/iim-bangalore#reviews" },
      { name: "IIM Calcutta Reviews", href: "/colleges/iim-calcutta#reviews" },
      { name: "IIM Lucknow Reviews", href: "/colleges/iim-lucknow#reviews" },
      { name: "IIM Kozhikode Reviews", href: "/colleges/iim-kozhikode#reviews" },
      { name: "IIM Indore Reviews", href: "/colleges/iim-indore#reviews" },
      { name: "FMS Delhi Reviews", href: "/colleges/fms-delhi#reviews" },
      { name: "SP Jain Reviews", href: "/colleges/sp-jain#reviews" },
      { name: "MDI Gurgaon Reviews", href: "/colleges/mdi-gurgaon#reviews" },
      { name: "Write a review >", href: "/contact?subject=Review" },
    ],
    "CAT Percentile Predictor": [
      { name: "Calculate CAT Cutoffs", href: "/predictor" },
      { name: "Predict Counseling Chances", href: "/predictor" },
    ],
    "College Predictors": [
      { name: "IIM & Non IIM Call Predictor", href: "/predictor?exam=CAT" },
      { name: "CAT College Predictor", href: "/predictor?exam=CAT" },
      { name: "MAH CET College Predictor", href: "/predictor?exam=MAHCET" },
      { name: "XAT College/ Call Predictor", href: "/predictor?exam=XAT" },
      { name: "IIFT College predictor", href: "/predictor?exam=IIFT" },
      { name: "NMAT College predictor", href: "/predictor?exam=NMAT" },
      { name: "SNAP College and Call Predictor", href: "/predictor?exam=SNAP" },
      { name: "CMAT College predictor", href: "/predictor?exam=CMAT" },
      { name: "MBA College predictor >", href: "/predictor" },
      { name: "MAT College predictor", href: "/predictor?exam=MAT" },
      { name: "KMAT College predictor", href: "/predictor?exam=KMAT" },
      { name: "TANCET College predictor", href: "/predictor?exam=TANCET" },
      { name: "TSICET College predictor", href: "/predictor?exam=TSICET" },
      { name: "IBSAT College predictor", href: "/predictor?exam=IBSAT" },
      { name: "UPCET College predictor", href: "/predictor?exam=UPCET" },
    ],
    "Ask Current MBA Students": [
      { name: "XIME Bangalore", href: "/colleges/xime-bangalore" },
      { name: "SIBM Pune", href: "/colleges/sibm-pune" },
      { name: "JBIMS Mumbai", href: "/colleges/jbims-mumbai" },
      { name: "FMS", href: "/colleges/fms-delhi" },
      { name: "IIM Ahmedabad", href: "/colleges/iim-ahmedabad" },
      { name: "NMIMS", href: "/colleges/nmims-mumbai" },
      { name: "Other MBA colleges >", href: "/colleges?stream=Management" },
    ],
    "Resources": [
      { name: "MBA Alumni Salary Data", href: "/colleges/ranking?stream=Management" },
      { name: "Ask a Question", href: "/contact?subject=QnA" },
      { name: "Discussions", href: "/contact?subject=Discussion" },
      { name: "MBA News", href: "/predictor" },
      { name: "MBA Articles", href: "/predictor" },
      { name: "Apply to colleges", href: "/colleges?stream=Management" },
      { name: "Trends in MBA", href: "/colleges/ranking?stream=Management" },
    ]
  };

  const mbaTabIcons: Record<string, any> = {
    "Top Ranked Colleges": Award,
    "Popular Courses": BookOpen,
    "Popular Specializations": Layers,
    "Exams": FileText,
    "Colleges By Location": MapPin,
    "Compare Colleges": Shuffle,
    "College Reviews": Star,
    "CAT Percentile Predictor": Percent,
    "College Predictors": Compass,
    "Ask Current MBA Students": MessageSquare,
    "Resources": Sparkles
  };

  const engTabIcons: Record<string, any> = {
    "Top Ranked Colleges": Award,
    "Popular Courses": BookOpen,
    "Popular Specializations": Layers,
    "Exams": FileText,
    "Colleges By Location": MapPin,
    "Compare Colleges": Shuffle,
    "Rank Predictors": Percent,
    "Percentile Predictors": Percent,
    "College Predictors": Compass,
    "College Reviews": Star,
    "Resources": Sparkles
  };

  // Engineering Mega Menu Sub-tabs structure matching screenshot
  const engTabs: Record<string, { name: string; href: string }[]> = {
    "Top Ranked Colleges": [
      { name: "Top Engineering Colleges in India", href: "/colleges/ranking?stream=Engineering" },
      { name: "Top Private Engineering Colleges in India", href: "/colleges/ranking?stream=Engineering&type=Private" },
      { name: "Top IITs in India", href: "/colleges?stream=Engineering" },
      { name: "Top NITs in India", href: "/colleges?stream=Engineering" },
      { name: "Top Engineering Colleges in Bangalore", href: "/colleges?stream=Engineering&state=Karnataka" },
      { name: "Top Engineering Colleges in Karnataka", href: "/colleges?stream=Engineering&state=Karnataka" },
      { name: "Top Engineering Colleges in Hyderabad", href: "/colleges?stream=Engineering" },
      { name: "Top Engineering Colleges in Pune", href: "/colleges?stream=Engineering&state=Maharashtra" },
      { name: "Top Engineering Colleges in Mumbai", href: "/colleges?stream=Engineering&state=Maharashtra" },
      { name: "Top Engineering Colleges in Maharashtra", href: "/colleges?stream=Engineering&state=Maharashtra" },
      { name: "Top Engineering Colleges in Chennai", href: "/colleges?stream=Engineering" },
      { name: "Top Engineering Colleges in Kerala", href: "/colleges?stream=Engineering" },
      { name: "Top Engineering Colleges in Delhi", href: "/colleges?stream=Engineering&state=Delhi" },
      { name: "Top Engineering Colleges in Telangana", href: "/colleges?stream=Engineering" },
      { name: "Top Engineering Colleges in Gujarat", href: "/colleges?stream=Engineering&state=Gujarat" },
      { name: "Top Engineering Colleges in West Bengal", href: "/colleges?stream=Engineering" },
    ],
    "Popular Courses": [
      { name: "B.Tech / B.E.", href: "/colleges?stream=Engineering" },
      { name: "M.Tech / M.E.", href: "/colleges?stream=Engineering" },
      { name: "Diploma in Engineering", href: "/colleges?stream=Engineering" },
    ],
    "Popular Specializations": [
      { name: "Computer Science Engineering (CSE)", href: "/colleges?stream=Engineering&search=Computer" },
      { name: "Electronics & Comm Engineering (ECE)", href: "/colleges?stream=Engineering&search=Electronics" },
      { name: "Mechanical Engineering (ME)", href: "/colleges?stream=Engineering&search=Mechanical" },
      { name: "Civil Engineering (CE)", href: "/colleges?stream=Engineering&search=Civil" },
      { name: "Information Technology (IT)", href: "/colleges?stream=Engineering&search=Information" },
    ],
    "Exams": [
      { name: "JEE Main Predictor", href: "/predictor" },
      { name: "JEE Advanced Predictor", href: "/predictor" },
      { name: "GATE Exam Cutoffs", href: "/colleges" },
      { name: "WBJEE Details", href: "/colleges" },
    ],
    "Colleges By Location": [
      { name: "Colleges in Delhi NCR", href: "/colleges?state=Delhi" },
      { name: "Colleges in Bangalore", href: "/colleges?state=Karnataka" },
      { name: "Colleges in Pune", href: "/colleges?state=Maharashtra" },
      { name: "Colleges in Patna (Bihar)", href: "/colleges?state=Bihar" },
      { name: "Colleges in Mumbai", href: "/colleges?state=Maharashtra" },
    ],
    "Compare Colleges": [
      { name: "Compare Top B.Tech Colleges", href: "/compare" },
      { name: "Compare IIT Delhi vs IIT Bombay", href: "/compare" },
    ],
    "Rank Predictors": [
      { name: "JEE Main Rank Predictor", href: "/predictor" },
      { name: "JEE Advanced Rank Predictor", href: "/predictor" },
    ],
    "Percentile Predictors": [
      { name: "JEE Main Percentile Predictor", href: "/predictor" },
    ],
    "College Predictors": [
      { name: "B.Tech College Predictor", href: "/predictor" },
    ],
    "College Reviews": [
      { name: "Read IIT Delhi Reviews", href: "/colleges/iit-delhi" },
      { name: "Read Galgotias Reviews", href: "/colleges/galgotias-university" },
    ],
    "Resources": [
      { name: "Bihar Credit Card for B.Tech", href: "/credit-card" },
      { name: "B.Tech Admission Guidelines", href: "/contact" },
    ]
  };

  // Categories for Row 2 (Dropdown Items)
  const categories = ["MBA", "ENGINEERING", "MEDICAL", "DESIGN", "MORE", "COUNSELING"];

  // Mobile Navigation Links
  const mobileLinks = [
    { name: "Home", href: "/" },
    { name: "All Colleges", href: "/colleges" },
    { name: "Compare Colleges", href: "/compare" },
    { name: "College Predictor", href: "/predictor" },
    { name: "Bihar Credit Card", href: "/credit-card" },
    { name: "Contact Counseling", href: "/contact" },
  ];

  // Mega Menu contents matching the categories
  const megaMenus: Record<string, MegaMenuItem[]> = {
    MBA: [
      {
        category: "Top MBA Colleges",
        links: [
          { name: "IIM Ahmedabad", href: "/colleges/iim-ahmedabad" },
          { name: "SIBM Pune", href: "/colleges/sibm-pune" },
          { name: "IIM Bangalore", href: "/colleges/iim-bangalore" },
        ]
      },
      {
        category: "Popular Exams",
        links: [
          { name: "CAT Exam", href: "/predictor" },
          { name: "SNAP Exam", href: "/predictor" },
          { name: "CMAT Exam", href: "/colleges" },
        ]
      },
      {
        category: "MBA Specializations",
        links: [
          { name: "MBA in Finance", href: "/colleges?stream=Management" },
          { name: "MBA in Marketing", href: "/colleges?stream=Management" },
          { name: "MBA in HR", href: "/colleges?stream=Management" },
        ]
      }
    ],
    ENGINEERING: [
      {
        category: "Top Engineering Colleges",
        links: [
          { name: "IIT Delhi", href: "/colleges/iit-delhi" },
          { name: "IIT Bombay", href: "/colleges/iit-bombay" },
          { name: "RV College of Engineering", href: "/colleges/rv-college-of-engineering" },
        ]
      },
      {
        category: "Popular Exams",
        links: [
          { name: "JEE Main", href: "/predictor" },
          { name: "JEE Advanced", href: "/colleges/iit-delhi" },
          { name: "WBJEE", href: "/colleges" },
        ]
      },
      {
        category: "Specializations",
        links: [
          { name: "Computer Science (CSE)", href: "/colleges?stream=Engineering" },
          { name: "Electronics & Comm (ECE)", href: "/colleges?stream=Engineering" },
          { name: "Mechanical Engineering", href: "/colleges?stream=Engineering" },
        ]
      }
    ],
    MEDICAL: [
      {
        category: "Top Medical Colleges",
        links: [
          { name: "AIIMS Delhi", href: "/colleges/aiims-delhi" },
          { name: "KMC Mangalore", href: "/colleges/kmc-mangalore" },
          { name: "CMC Vellore", href: "/colleges/cmc-vellore" },
        ]
      },
      {
        category: "Entrance Exams",
        links: [
          { name: "NEET UG", href: "/predictor" },
          { name: "AIIMS Entrance", href: "/colleges" },
        ]
      },
      {
        category: "Courses Offered",
        links: [
          { name: "MBBS", href: "/colleges?stream=Medical" },
          { name: "BDS Dental", href: "/colleges?stream=Medical" },
          { name: "B.Sc Nursing", href: "/colleges?stream=Medical" },
        ]
      }
    ],
    DESIGN: [
      {
        category: "Top Design Institutes",
        links: [
          { name: "NIFT Patna", href: "/colleges/nift-patna" },
          { name: "NID Ahmedabad", href: "/colleges" },
        ]
      },
      {
        category: "Specializations",
        links: [
          { name: "Fashion Design", href: "/colleges" },
          { name: "Communication Design", href: "/colleges" },
          { name: "Industrial Design", href: "/colleges" },
        ]
      },
      {
        category: "Direct Admission",
        links: [
          { name: "Scholarship Schemes", href: "/credit-card" },
          { name: "Free Counseling", href: "/contact" },
        ]
      }
    ],
    MORE: [
      {
        category: "Law Programs",
        links: [
          { name: "NLSIU Bangalore", href: "/colleges/nlsiu-bangalore" },
          { name: "CNLU Patna", href: "/colleges/cnlu-patna" },
        ]
      },
      {
        category: "Admission Schemes",
        links: [
          { name: "Bihar Student Credit Card", href: "/credit-card" },
          { name: "DRCC Registration Guidelines", href: "/credit-card" },
        ]
      },
      {
        category: "Quick Tools",
        links: [
          { name: "College Predictor Tool", href: "/predictor" },
          { name: "Compare Colleges Hub", href: "/compare" },
        ]
      }
    ],
    COUNSELING: [
      {
        category: "Guidance Services",
        links: [
          { name: "Free Profile Evaluation", href: "/contact" },
          { name: "Direct Admission Quota Help", href: "/contact" },
          { name: "Document Verification Desk", href: "/credit-card" },
        ]
      },
      {
        category: "Support Hotlines",
        links: [
          { name: "Patna Office: +91 91358", href: "/contact" },
          { name: "Noida Office: +91 94733", href: "/contact" },
        ]
      },
      {
        category: "Action steps",
        links: [
          { name: "Book counseling slot", href: "/contact" },
          { name: "Request advisor callback", href: "/contact" },
        ]
      }
    ]
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  if (pathname && pathname.startsWith("/safeaxis")) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background text-text_primary flex flex-col font-sans transition-all duration-300">
      
      {/* SHIKSHA SCREENSHOT MATCHING DOUBLE-ROW HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-brand_header text-slate-800 z-40 shadow-md transition-colors backdrop-blur-md border-b border-amber-100/50">
        
        {/* ROW 1: TOP ROW (Logo, Wide Search Bar, Login/Sign Up) */}
        <div className="h-16 max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between gap-6">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-premium text-white shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-outfit font-black text-base tracking-tight text-slate-950 hover:text-primary transition-colors uppercase">
              Think Your College
            </span>
          </Link>

          {/* Wide Global Search Bar (Conjoined Input & Button) */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="hidden md:flex items-center flex-1 max-w-2xl h-10 bg-white rounded-md overflow-hidden shadow-sm border border-amber-200/60"
          >
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Colleges, Courses, Exams, QnA, & Articles"
              className="flex-1 px-4 h-full bg-transparent border-none outline-none text-slate-800 text-xs placeholder-slate-400 font-semibold"
            />
            <button 
              type="submit"
              className="h-full px-7 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 transition-all text-white font-extrabold text-xs tracking-wider uppercase flex items-center justify-center flex-shrink-0 active:scale-95 shadow-inner"
            >
              Search
            </button>
          </form>

          {/* Right auth links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-bold whitespace-nowrap">
            <motion.button
              onClick={() => setAuthModal({ open: true, mode: "login" })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="text-slate-700 hover:text-primary font-bold transition-colors"
            >
              Login
            </motion.button>
            <motion.button
              onClick={() => setAuthModal({ open: true, mode: "signup" })}
              whileHover={{ scale: 1.05, boxShadow: "0 4px 18px rgba(249,115,22,0.35)" }}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-[11px] tracking-wide shadow-sm shadow-orange-500/20 transition-all"
            >
              Sign Up
            </motion.button>
          </div>

          {/* MOBILE MENU TRIGGER */}
          <div className="flex md:hidden items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-800 p-1"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ROW 2: SUB-NAVIGATION BAR (Dropdown Category Items) */}
        <div className="border-t border-amber-100/50 bg-amber-50/30 overflow-x-auto no-scrollbar scroll-smooth">
          <div 
            className="max-w-[1440px] mx-auto px-4 md:px-12 flex items-center justify-start md:justify-center gap-1 h-11 relative min-w-max md:min-w-0"
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            {categories.map((category) => (
              <div 
                key={category}
                className="h-full flex items-center"
                onMouseEnter={() => setActiveMegaMenu(category)}
              >
                <button 
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setExpandedMobileCategory(category);
                      setIsMobileMenuOpen(true);
                    }
                  }}
                  className="flex items-center gap-1 px-4 h-full text-[10px] font-black tracking-wider text-slate-700 hover:text-primary hover:bg-amber-100/30 transition-colors uppercase whitespace-nowrap"
                >
                  {category}
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${activeMegaMenu === category ? "rotate-180 text-primary" : ""}`} />
                </button>
              </div>
            ))}

            {/* MEGA MENU DROPDOWN PANEL FOR MBA */}
            <AnimatePresence>
              {activeMegaMenu === "MBA" && (
                <div 
                  className="absolute top-[46px] left-1/2 -translate-x-1/2 w-[850px] z-50 pointer-events-auto"
                  onMouseEnter={() => setActiveMegaMenu("MBA")}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95, rotateX: -6 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97, transition: { duration: 0.15 } }}
                    transition={{ type: "spring", stiffness: 380, damping: 26 }}
                    style={{ transformOrigin: "top center", perspective: 1000 }}
                    className="w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-amber-100/40 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(245,158,11,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex text-text_primary overflow-hidden"
                  >
                    {/* Floating Glowing Gradient border at top */}
                    <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 shadow-[0_1px_10px_rgba(245,158,11,0.5)] z-20" />

                    {/* Dynamic Animated Glass Ambient Background */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-2xl">
                      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.05),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.04),transparent_40%)] animate-[spin_25s_linear_infinite]" />
                      <div className="absolute top-[10%] right-[10%] w-[200px] h-[200px] bg-amber-500/8 dark:bg-amber-500/4 rounded-full blur-[80px] animate-[pulse_6s_ease-in-out_infinite]" />
                      <div className="absolute bottom-[10%] left-[10%] w-[200px] h-[200px] bg-indigo-500/8 dark:bg-indigo-500/4 rounded-full blur-[80px] animate-[pulse_6s_ease-in-out_infinite_3s]" />
                    </div>

                    {/* Left Column: Vertical Sub-Tabs Menu */}
                    <div className="w-[240px] bg-slate-50/40 dark:bg-slate-950/40 border-r border-border/60 p-3 space-y-1.5 pt-4 relative z-10">
                      {Object.keys(mbaTabs).map((tabName) => {
                        const TabIcon = mbaTabIcons[tabName] || Award;
                        const isActive = activeMbaTab === tabName;
                        return (
                          <button
                            key={tabName}
                            onMouseEnter={() => setActiveMbaTab(tabName)}
                            className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[10.5px] font-extrabold tracking-wide transition-all duration-200 ${
                              isActive
                                ? "bg-gradient-to-r from-amber-500/10 to-orange-600/10 text-primary border-l-4 border-primary pl-3 shadow-sm shadow-amber-500/5"
                                : "text-text_secondary hover:bg-amber-500/5 hover:text-text_primary hover:translate-x-0.5"
                            }`}
                          >
                            <TabIcon className={`w-3.5 h-3.5 ${isActive ? "text-primary animate-pulse" : "text-slate-400 dark:text-slate-500"}`} />
                            {tabName}
                          </button>
                        );
                      })}
                    </div>

                    {/* Middle Column: Dynamic Link Lists */}
                    <div className="flex-1 p-6 relative pt-7 z-10">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                      
                      <h4 className="text-[10.5px] uppercase tracking-wider font-black text-primary border-b border-border/60 pb-2 mb-4 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        {activeMbaTab}
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3 relative z-10">
                        {mbaTabs[activeMbaTab]?.map((link, idx) => (
                          <Link
                            key={idx}
                            href={link.href}
                            onClick={() => setActiveMegaMenu(null)}
                            className="group/link text-xs font-semibold text-text_secondary hover:text-primary transition-all flex items-center gap-1 py-1 hover:translate-x-1 duration-200"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/link:bg-primary transition-colors flex-shrink-0" />
                            <span className="flex-1 line-clamp-1">{link.name}</span>
                            {link.name.endsWith(">") ? null : (
                              <ChevronRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-primary flex-shrink-0" />
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Featured Colleges */}
                    <div className="w-[220px] bg-slate-50/30 dark:bg-slate-950/20 p-6 border-l border-border/60 flex flex-col justify-between pt-7 relative z-10">
                      <div>
                        <h4 className="text-[10px] uppercase tracking-wider font-extrabold text-primary border-b border-border/60 pb-2 mb-4 flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-amber-500" />
                          Top MBA Choices
                        </h4>
                        <div className="space-y-3">
                          {[
                            { name: "IIM Ahmedabad", rate: "4.9", rank: "NIRF #1", slug: "iim-ahmedabad", color: "from-amber-500 to-orange-600" },
                            { name: "IIM Bangalore", rate: "4.8", rank: "NIRF #2", slug: "iim-bangalore", color: "from-indigo-500 to-purple-600" },
                            { name: "SIBM Pune", rate: "4.6", rank: "NIRF #17", slug: "sibm-pune", color: "from-emerald-500 to-teal-600" }
                          ].map((c, idx) => (
                            <Link
                              key={idx}
                              href={`/colleges/${c.slug}`}
                              onClick={() => setActiveMegaMenu(null)}
                              className="group/feat block p-2 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-200"
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c.color} text-white flex items-center justify-center text-[10px] font-black shadow-sm`}>
                                  {c.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[10px] font-black text-text_primary group-hover/feat:text-primary transition-colors truncate">{c.name}</p>
                                  <div className="flex items-center gap-1.5 text-[8px] font-bold text-text_secondary mt-0.5">
                                    <span className="text-amber-500">★ {c.rate}</span>
                                    <span>•</span>
                                    <span className="text-primary">{c.rank}</span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                      
                      <Link 
                        href="/colleges?stream=Management"
                        onClick={() => setActiveMegaMenu(null)}
                        className="mt-4 w-full py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-center font-bold text-[9px] uppercase tracking-wider rounded-lg active:scale-95 transition-all flex items-center justify-center gap-1 shadow-sm shadow-primary/10"
                      >
                        Explore All Colleges
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* MEGA MENU DROPDOWN PANEL FOR ENGINEERING */}
            <AnimatePresence>
              {activeMegaMenu === "ENGINEERING" && (
                <div 
                  className="absolute top-[46px] left-1/2 -translate-x-1/2 w-[850px] z-50 pointer-events-auto"
                  onMouseEnter={() => setActiveMegaMenu("ENGINEERING")}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95, rotateX: -6 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97, transition: { duration: 0.15 } }}
                    transition={{ type: "spring", stiffness: 380, damping: 26 }}
                    style={{ transformOrigin: "top center", perspective: 1000 }}
                    className="w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-blue-100/40 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(59,130,246,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex text-text_primary overflow-hidden"
                  >
                    {/* Floating Glowing Gradient border at top */}
                    <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 shadow-[0_1px_10px_rgba(99,102,241,0.5)] z-20" />

                    {/* Dynamic Animated Glass Ambient Background */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-2xl">
                      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.05),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.04),transparent_40%)] animate-[spin_28s_linear_infinite]" />
                      <div className="absolute top-[10%] right-[10%] w-[200px] h-[200px] bg-blue-500/8 dark:bg-blue-500/4 rounded-full blur-[80px] animate-[pulse_6s_ease-in-out_infinite]" />
                      <div className="absolute bottom-[10%] left-[10%] w-[200px] h-[200px] bg-purple-500/8 dark:bg-purple-500/4 rounded-full blur-[80px] animate-[pulse_6s_ease-in-out_infinite_3.5s]" />
                    </div>

                    {/* Left Column: Vertical Sub-Tabs Menu */}
                    <div className="w-[240px] bg-slate-50/40 dark:bg-slate-950/40 border-r border-border/60 p-3 space-y-1.5 pt-4 relative z-10">
                      {Object.keys(engTabs).map((tabName) => {
                        const TabIcon = engTabIcons[tabName] || Award;
                        const isActive = activeEngTab === tabName;
                        return (
                          <button
                            key={tabName}
                            onMouseEnter={() => setActiveEngTab(tabName)}
                            className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[10.5px] font-extrabold tracking-wide transition-all duration-200 ${
                              isActive
                                ? "bg-gradient-to-r from-blue-500/10 to-indigo-600/10 text-primary border-l-4 border-primary pl-3 shadow-sm shadow-blue-500/5"
                                : "text-text_secondary hover:bg-blue-500/5 hover:text-text_primary hover:translate-x-0.5"
                            }`}
                          >
                            <TabIcon className={`w-3.5 h-3.5 ${isActive ? "text-primary animate-pulse" : "text-slate-400 dark:text-slate-500"}`} />
                            {tabName}
                          </button>
                        );
                      })}
                    </div>

                    {/* Middle Column: Dynamic Link Lists */}
                    <div className="flex-1 p-6 relative pt-7 z-10">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                      
                      <h4 className="text-[10.5px] uppercase tracking-wider font-black text-primary border-b border-border/60 pb-2 mb-4 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                        {activeEngTab}
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3 relative z-10">
                        {engTabs[activeEngTab]?.map((link, idx) => (
                          <Link
                            key={idx}
                            href={link.href}
                            onClick={() => setActiveMegaMenu(null)}
                            className="group/link text-xs font-semibold text-text_secondary hover:text-primary transition-all flex items-center gap-1 py-1 hover:translate-x-1 duration-200"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/link:bg-primary transition-colors flex-shrink-0" />
                            <span className="flex-1 line-clamp-1">{link.name}</span>
                            <ChevronRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-primary flex-shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Featured Colleges */}
                    <div className="w-[220px] bg-slate-50/30 dark:bg-slate-950/20 p-6 border-l border-border/60 flex flex-col justify-between pt-7 relative z-10">
                      <div>
                        <h4 className="text-[10px] uppercase tracking-wider font-extrabold text-primary border-b border-border/60 pb-2 mb-4 flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-blue-500" />
                          Top Engineering Choices
                        </h4>
                        <div className="space-y-3">
                          {[
                            { name: "IIT Delhi", rate: "4.9", rank: "NIRF #2", slug: "iit-delhi", color: "from-blue-500 to-indigo-600" },
                            { name: "IIT Bombay", rate: "4.9", rank: "NIRF #3", slug: "iit-bombay", color: "from-indigo-500 to-purple-600" },
                            { name: "RVCE Bangalore", rate: "4.4", rank: "NIRF #85", slug: "rv-college-of-engineering", color: "from-amber-500 to-orange-600" }
                          ].map((c, idx) => (
                            <Link
                              key={idx}
                              href={`/colleges/${c.slug}`}
                              onClick={() => setActiveMegaMenu(null)}
                              className="group/feat block p-2 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-200"
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c.color} text-white flex items-center justify-center text-[10px] font-black shadow-sm`}>
                                  {c.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[10px] font-black text-text_primary group-hover/feat:text-primary transition-colors truncate">{c.name}</p>
                                  <div className="flex items-center gap-1.5 text-[8px] font-bold text-text_secondary mt-0.5">
                                    <span className="text-amber-500">★ {c.rate}</span>
                                    <span>•</span>
                                    <span className="text-primary">{c.rank}</span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                      
                      <Link 
                        href="/colleges?stream=Engineering"
                        onClick={() => setActiveMegaMenu(null)}
                        className="mt-4 w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-center font-bold text-[9px] uppercase tracking-wider rounded-lg active:scale-95 transition-all flex items-center justify-center gap-1 shadow-sm shadow-primary/10"
                      >
                        Explore All Colleges
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* MEGA MENU DROPDOWN PANEL FOR OTHER CHANNELS */}
            <AnimatePresence>
              {activeMegaMenu !== null && activeMegaMenu !== "MBA" && activeMegaMenu !== "ENGINEERING" && megaMenus[activeMegaMenu] && (
                <div 
                  className="absolute top-[46px] left-1/2 -translate-x-1/2 w-[720px] z-50 pointer-events-auto"
                  onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
                >
                  <motion.div
                    key={activeMegaMenu}
                    initial={{ opacity: 0, y: 15, scale: 0.95, rotateX: -6 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97, transition: { duration: 0.15 } }}
                    transition={{ type: "spring", stiffness: 380, damping: 26 }}
                    style={{ transformOrigin: "top center", perspective: 1000 }}
                    className="w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-teal-100/40 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(20,184,166,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-6 grid grid-cols-3 gap-6 text-text_primary overflow-hidden"
                  >
                    {/* Floating Glowing Gradient border at top */}
                    <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-emerald-400 via-teal-500 to-indigo-500 shadow-[0_1px_10px_rgba(16,185,129,0.3)] z-20" />

                    {/* Dynamic Animated Glass Ambient Background */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-2xl">
                      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.04),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.04),transparent_40%)] animate-[spin_24s_linear_infinite]" />
                      <div className="absolute top-[10%] right-[10%] w-[180px] h-[180px] bg-emerald-500/8 dark:bg-emerald-500/4 rounded-full blur-[80px] animate-[pulse_6s_ease-in-out_infinite]" />
                      <div className="absolute bottom-[10%] left-[10%] w-[180px] h-[180px] bg-teal-500/8 dark:bg-teal-500/4 rounded-full blur-[80px] animate-[pulse_6s_ease-in-out_infinite_2.5s]" />
                    </div>

                    {megaMenus[activeMegaMenu].map((section, idx) => (
                      <div key={idx} className="space-y-3 relative z-10">
                        <h4 className="text-[10px] uppercase tracking-wider font-extrabold text-primary border-b border-border/60 pb-1.5 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                          {section.category}
                        </h4>
                        <ul className="space-y-2">
                          {section.links.map((link, lIdx) => (
                            <li key={lIdx}>
                              <Link 
                                href={link.href}
                                onClick={() => setActiveMegaMenu(null)}
                                className="group/link text-xs font-semibold text-text_secondary hover:text-primary transition-all flex items-center gap-1 py-0.5 hover:translate-x-0.5 duration-200"
                              >
                                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/link:bg-primary transition-colors flex-shrink-0" />
                                <span className="flex-1">{link.name}</span>
                                <ChevronRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-primary flex-shrink-0" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER DRAWER */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <aside 
            className="w-72 max-w-[80vw] h-full bg-card border-r border-border p-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-border pb-4 mt-4">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-premium text-white">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="font-outfit font-black text-sm tracking-tight text-slate-950 hover:text-primary transition-colors uppercase">
                    Think Your College
                  </span>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-text_secondary hover:text-text_primary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile search */}
              <form onSubmit={handleSearchSubmit} className="flex border border-border rounded-xl bg-background overflow-hidden p-1">
                <input 
                  type="text"
                  placeholder="Search Colleges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent px-3 text-xs text-text_primary outline-none"
                />
                <button type="submit" className="px-3.5 py-1.5 bg-primary text-white text-xs font-bold rounded-lg">Go</button>
              </form>

              <nav className="space-y-1">
                {mobileLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                        isActive 
                          ? "bg-primary text-white" 
                          : "text-text_secondary hover:bg-border/40"
                      }`}
                    >
                      <span className="font-sans">{link.name}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Expandable Category Accordions */}
              <div className="space-y-2 pt-3 border-t border-border/60">
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase px-1 mb-2">Explore Categories</p>
                {categories.map((category) => {
                  const isExpanded = expandedMobileCategory === category;
                  const menuItems = megaMenus[category] || [];
                  return (
                    <div key={category} className="border border-border/40 rounded-xl overflow-hidden bg-slate-50/50">
                      <button
                        onClick={() => setExpandedMobileCategory(isExpanded ? null : category)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-black tracking-wider transition-colors uppercase ${
                          isExpanded ? "bg-amber-500/5 text-primary border-l-4 border-primary pl-3" : "text-slate-700 hover:bg-slate-100/50"
                        }`}
                      >
                        <span>{category}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isExpanded ? "rotate-180 text-primary" : ""}`} />
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white border-t border-border/30 overflow-hidden"
                          >
                            <div className="p-3.5 space-y-4">
                              {menuItems.map((item) => (
                                <div key={item.category} className="space-y-1.5">
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{item.category}</p>
                                  <div className="grid grid-cols-1 gap-1 pl-2 border-l border-slate-100">
                                    {item.links.map((link) => (
                                      <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-xs font-bold text-slate-700 hover:text-primary py-1 block transition-colors"
                                      >
                                        • {link.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <motion.button
                  onClick={() => { setIsMobileMenuOpen(false); setAuthModal({ open: true, mode: "login" }); }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  Login
                </motion.button>
                <motion.button
                  onClick={() => { setIsMobileMenuOpen(false); setAuthModal({ open: true, mode: "signup" }); }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-sm tracking-wide shadow-sm"
                >
                  Sign Up
                </motion.button>
              </div>
            </div>
            
            <div className="text-center text-[10px] text-text_secondary pt-6 border-t border-border">
              Think Your College © 2026
            </div>
          </aside>
        </div>
      )}

      {/* MAIN VIEW CONTENT ( Taller Header requires pt-28 on desktop, pt-20 on mobile ) */}
      <div className="flex-grow pt-16 md:pt-[108px]">
        <main className="w-full max-w-[1440px] mx-auto p-6 md:p-8">
          {children}
        </main>
      </div>

      {/* ══════════════════════════════════════════
           MEGA FOOTER
         ══════════════════════════════════════════ */}
      <footer className="mt-16 border-t border-border bg-slate-900 dark:bg-slate-950 text-slate-300 text-[12px]">

        {/* ── ASK QUESTION BANNER ── */}
        <div className="bg-slate-800 dark:bg-slate-900 border-b border-slate-700">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center gap-4">
            <p className="font-bold text-white text-sm md:text-base shrink-0">
              Get our experts to answer your questions within 24 Hrs
            </p>
            <div className="flex flex-1 w-full max-w-2xl gap-2">
              <input
                type="text"
                placeholder="Write your questions here"
                className="flex-1 px-4 py-2.5 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm outline-none border border-slate-200 dark:border-slate-600 focus:border-orange-400 transition-colors placeholder:text-slate-400"
              />
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 6px 20px rgba(249,115,22,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-sm tracking-wide shrink-0"
              >
                Ask Question
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── MEGA LINK COLUMNS (Row 1) ── */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* MBA */}
          <div className="space-y-2.5">
            <h4 className="font-black text-white text-sm tracking-wide mb-4">MBA</h4>
            {["MBA","Top MBA Colleges","MBA Colleges","Executive MBA Colleges","MBA Exams","CAT","MAT","Online MBA","MBA College Predictors"].map(l => (
              <Link key={l} href="/colleges" className="block text-slate-400 hover:text-orange-400 transition-colors leading-snug">{l}</Link>
            ))}
          </div>

          {/* Engineering */}
          <div className="space-y-2.5">
            <h4 className="font-black text-white text-sm tracking-wide mb-4">Engineering</h4>
            {["Engineering","Top Engineering Colleges","Engineering Colleges","Engineering Exams","JEE Main","JEE Advanced","Engineering College Predictors","B.Tech Colleges","Gate Colleges"].map(l => (
              <Link key={l} href="/colleges" className="block text-slate-400 hover:text-orange-400 transition-colors leading-snug">{l}</Link>
            ))}
          </div>

          {/* Medicine */}
          <div className="space-y-2.5">
            <h4 className="font-black text-white text-sm tracking-wide mb-4">Medicine</h4>
            {["NEET UG","NEET PG","NEET SS","NEET MDS","INI CET","FMGE","AIAPGET","Top Medical Colleges","Medical Colleges","Medical Exams"].map(l => (
              <Link key={l} href="/colleges" className="block text-slate-400 hover:text-orange-400 transition-colors leading-snug">{l}</Link>
            ))}
          </div>

          {/* Other Courses */}
          <div className="space-y-2.5">
            <h4 className="font-black text-white text-sm tracking-wide mb-4">Other Courses</h4>
            {["Animation","B.Com","B.Sc","BBA","CA","Fashion Designing","Hotel Management","Law","Mass Communication","MBBS"].map(l => (
              <Link key={l} href="/colleges" className="block text-slate-400 hover:text-orange-400 transition-colors leading-snug">{l}</Link>
            ))}
          </div>

          {/* Sarkari Exams */}
          <div className="space-y-2.5">
            <h4 className="font-black text-white text-sm tracking-wide mb-4">Sarkari Exams</h4>
            {["RRB Group D","RRB NTPC","CTET","UPTET","UGC NET","DSSSB","SSC CGL","SSC CHSL","SSC GD","NDA"].map(l => (
              <Link key={l} href="/colleges" className="block text-slate-400 hover:text-orange-400 transition-colors leading-snug">{l}</Link>
            ))}
          </div>
        </div>

        {/* ── MEGA LINK COLUMNS (Row 2) ── */}
        <div className="border-t border-slate-800 max-w-[1440px] mx-auto px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Resources */}
          <div className="space-y-2.5">
            <h4 className="font-black text-white text-sm tracking-wide mb-4">Resources</h4>
            {["Careers after 12th","Courses After 12th","Ask a Question","Write a college review","Articles","Law College Predictors","Hospitality College Predictor","NCERT Solutions","NCERT Solutions Class 12 Maths","NCERT Solutions Class 12 Physics"].map(l => (
              <Link key={l} href="/contact" className="block text-slate-400 hover:text-orange-400 transition-colors leading-snug">{l}</Link>
            ))}
          </div>

          {/* Important Updates */}
          <div className="space-y-2.5">
            <h4 className="font-black text-white text-sm tracking-wide mb-4">Important Updates</h4>
            {["XAT 2027","MH CET LAW 2026","CAT 2025 Question Paper","NEET College Predictor","NEET Rank Predictor","CAT 2026","BITSAT 2026","MHT CET 2026","NIFT 2026","VITEEE 2026"].map(l => (
              <Link key={l} href="/predictor" className="block text-slate-400 hover:text-orange-400 transition-colors leading-snug">{l}</Link>
            ))}
          </div>

          {/* Study Abroad */}
          <div className="space-y-2.5">
            <h4 className="font-black text-white text-sm tracking-wide mb-4">Study Abroad</h4>
            {["Study Abroad Home","BTech abroad","MBA abroad","MS abroad","GRE","GMAT","SAT","IELTS","TOEFL"].map(l => (
              <Link key={l} href="/colleges" className="block text-slate-400 hover:text-orange-400 transition-colors leading-snug">{l}</Link>
            ))}
          </div>

          {/* Get App */}
          <div className="space-y-4">
            <h4 className="font-black text-white text-sm tracking-wide mb-4">Get App, It's faster and better</h4>
            <motion.a
              href="#"
              whileHover={{ scale: 1.04, x: 3 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-600 hover:border-orange-500 bg-slate-800 hover:bg-slate-700 transition-all group"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" fill="currentColor">
                <path d="M3.18 23.76c.3.17.64.24.99.21l12.6-12.6-3.03-3.03L3.18 23.76zM.73 2.36C.28 2.8 0 3.5 0 4.44v15.12c0 .94.28 1.64.74 2.08l.11.1L8.5 14.1v-.2L.84 2.26l-.11.1zM20.08 10.3l-2.28-1.32-3.27 3.27 3.27 3.27 2.3-1.33c.66-.38.66-1.01 0-1.39l-.02-.5zM4.17.26L16.77 12.86l-3.03 3.03L1.18.49C1.52.15 1.94.01 2.4.01c.63 0 1.23.26 1.77.25z" />
              </svg>
              <div>
                <p className="text-[9px] text-slate-400">GET IT ON</p>
                <p className="font-black text-white text-sm leading-tight">Google Play</p>
              </div>
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.04, x: 3 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-600 hover:border-orange-500 bg-slate-800 hover:bg-slate-700 transition-all group"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <p className="text-[9px] text-slate-400">DOWNLOAD ON THE</p>
                <p className="font-black text-white text-sm leading-tight">App Store</p>
              </div>
            </motion.a>
          </div>
        </div>

        {/* ── ABOUT / GROUP / ENTERPRISE STRIP ── */}
        <div className="border-t border-slate-800">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* About TYC */}
            <div className="space-y-2.5">
              <h4 className="font-black text-white text-sm tracking-wide mb-4">About Think Your College</h4>
              {["About Us","Management Team","Careers","TYC Authors","FAQs","Contact Us"].map(l => (
                <Link key={l} href="/contact" className="block text-slate-400 hover:text-orange-400 transition-colors">{l}</Link>
              ))}
            </div>

            {/* Our Group */}
            <div className="space-y-2.5">
              <h4 className="font-black text-white text-sm tracking-wide mb-4">Our Group</h4>
              {["Careers Portal","Jobs Platform","Resume Builder","Internships","99acres.com","AmbitionBox.com","TYC Abroad","Job Portal"].map(l => (
                <Link key={l} href="#" className="block text-slate-400 hover:text-orange-400 transition-colors">{l}</Link>
              ))}
            </div>

            {/* Enterprise */}
            <div className="space-y-2.5">
              <h4 className="font-black text-white text-sm tracking-wide mb-4">Enterprise</h4>
              {["Client Login","Advertising / Sales Enquiries","Add Colleges","Partner With Us","Bulk Counseling"].map(l => (
                <Link key={l} href="/contact" className="block text-slate-400 hover:text-orange-400 transition-colors">{l}</Link>
              ))}
            </div>

            {/* Contact + Social */}
            <div className="space-y-5">
              <div>
                <h4 className="font-black text-white text-sm tracking-wide mb-3">Get in Touch</h4>
                <motion.a
                  href="tel:+918585951111"
                  whileHover={{ x: 3 }}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 hover:border-orange-500 text-slate-300 hover:text-orange-400 transition-all text-xs font-bold"
                >
                  📱 +91 8585951111
                </motion.a>
              </div>
              <div>
                <h4 className="font-black text-white text-sm tracking-wide mb-3">Contribute</h4>
                <motion.a
                  href="/contact"
                  whileHover={{ x: 3 }}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 hover:border-orange-500 text-slate-300 hover:text-orange-400 transition-all text-xs font-bold"
                >
                  ✏️ Write Review
                </motion.a>
              </div>
              <div>
                <h4 className="font-black text-white text-sm tracking-wide mb-3">Follow Us</h4>
                <div className="flex gap-2">
                  {[
                    { label: "Instagram", icon: "📸" },
                    { label: "YouTube",   icon: "▶️" },
                    { label: "Facebook",  icon: "👤" },
                    { label: "Twitter",   icon: "🐦" },
                  ].map(s => (
                    <motion.a
                      key={s.label}
                      href="#"
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      title={s.label}
                      className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-700 hover:border-orange-500 bg-slate-800 hover:bg-slate-700 transition-all text-base"
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="border-t border-slate-800 bg-slate-950">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-black text-white text-sm tracking-tight uppercase">Think Your College</p>
                <p className="text-[9px] text-slate-500 tracking-widest">India's #1 College Discovery Platform</p>
              </div>
            </div>

            {/* Bottom Links */}
            <div className="flex flex-wrap justify-center gap-4 text-[10px] text-slate-500">
              {["Grievances","Notices / Summons","Privacy","Sitemap","Terms & Conditions"].map(l => (
                <Link key={l} href="/contact" className="hover:text-orange-400 transition-colors">{l}</Link>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-[10px] text-slate-600 text-right">
              © 2026 Think Your College. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ── AUTH MODAL ── */}
      <AuthModal
        isOpen={authModal.open}
        defaultMode={authModal.mode}
        onClose={() => setAuthModal(m => ({ ...m, open: false }))}
      />
    </div>
  );
}
