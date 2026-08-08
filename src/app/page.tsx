"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  TrendingUp,
  Building2,
  MapPin,
  DollarSign,
  Star,
  Users,
  Compass,
  ArrowRight,
  Phone,
  CheckCircle,
  FileText,
  X,
  Code,
  Palette,
  FlaskConical,
  Calendar,
  ChevronRight,
  Layers,
  Award,
  ChevronLeft,
  Cog,
  Stethoscope,
  BarChart3,
  Scale,
  Terminal,
  Music,
} from "lucide-react";

interface CollegeMock {
  id: string;
  name: string;
  location: string;
  rating: number;
  highestPackage: string;
  averagePackage: string;
  averageFee: string;
  type: string;
  slug: string;
  stream: string;
  image: string;
  nirfRank?: number;
}

const topCities = [
  {
    name: "Delhi NCR",
    collegesCount: "650+ Colleges",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop&q=60",
    slug: "Delhi",
  },
  {
    name: "Mumbai",
    collegesCount: "527+ Colleges",
    image:
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&auto=format&fit=crop&q=60",
    slug: "Mumbai",
  },
  {
    name: "Bangalore",
    collegesCount: "54+ Colleges",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=60",
    slug: "Bangalore",
  },
  {
    name: "Chennai",
    collegesCount: "479+ Colleges",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=60",
    slug: "Chennai",
  },
  {
    name: "Kolkata",
    collegesCount: "175+ Colleges",
    image:
      "https://images.unsplash.com/photo-1558431382-27e303142255?w=600&auto=format&fit=crop&q=60",
    slug: "Kolkata",
  },
  {
    name: "Hyderabad",
    collegesCount: "12+ Colleges",
    image:
      "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?w=600&auto=format&fit=crop&q=60",
    slug: "Hyderabad",
  },
  {
    name: "Pune",
    collegesCount: "677+ Colleges",
    image:
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&auto=format&fit=crop&q=60",
    slug: "Pune",
  },
  {
    name: "Bhopal",
    collegesCount: "242+ Colleges",
    image:
      "https://images.unsplash.com/photo-1509216242873-7786f446f465?w=600&auto=format&fit=crop&q=60",
    slug: "Bhopal",
  },
  {
    name: "Indore",
    collegesCount: "187+ Colleges",
    image:
      "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=600&auto=format&fit=crop&q=60",
    slug: "Indore",
  },
  {
    name: "Nagpur",
    collegesCount: "249+ Colleges",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&auto=format&fit=crop&q=60",
    slug: "Nagpur",
  },
  {
    name: "Ahmedabad",
    collegesCount: "150+ Colleges",
    image:
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?w=600&auto=format&fit=crop&q=60",
    slug: "Ahmedabad",
  },
  {
    name: "Jaipur",
    collegesCount: "210+ Colleges",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&auto=format&fit=crop&q=60",
    slug: "Jaipur",
  },
];

const topExams = [
  {
    name: "JEE Main",
    mode: "Online",
    level: "National Level",
    stream: "Engineering",
    courses: ["B.Tech", "B.Arch", "B.E", "Integrated M.Tech"],
    registrationDate: "Dec 2026 - Jan 2027",
    examDate: "April 2027",
    eligibility: "12th Pass with Physics, Chemistry & Mathematics (PCM)",
    pyqCount: "15 Years Solved Papers",
  },
  {
    name: "NEET UG",
    mode: "Offline (Pen & Paper)",
    level: "National Level",
    stream: "Medical",
    courses: ["MBBS", "BDS", "BAMS", "BHMS", "B.Sc Nursing"],
    registrationDate: "Feb 2027 - March 2027",
    examDate: "May 2027",
    eligibility: "12th Pass with Physics, Chemistry & Biology (PCB)",
    pyqCount: "12 Years Solved Papers",
  },
  {
    name: "CAT",
    mode: "Online",
    level: "National Level",
    stream: "Management",
    courses: ["MBA", "PGDM", "Executive MBA", "FPM"],
    registrationDate: "Aug 2026 - Sept 2026",
    examDate: "Nov 2026",
    eligibility: "Graduation with minimum 50% marks (45% for SC/ST)",
    pyqCount: "18 Years Solved Papers",
  },
  {
    name: "GATE",
    mode: "Online",
    level: "National Level",
    stream: "Engineering",
    courses: ["M.Tech", "M.E", "Ph.D", "Direct Fellowship"],
    registrationDate: "Sept 2026 - Oct 2026",
    examDate: "Feb 2027",
    eligibility:
      "Bachelor's Degree in Engineering/Technology or Master's in Science",
    pyqCount: "10 Years Solved Papers",
  },
  {
    name: "NEET PG",
    mode: "Online",
    level: "National Level",
    stream: "Medical",
    courses: ["MD", "MS", "MDS", "PG Diploma", "DNB"],
    registrationDate: "April 2027 - May 2027",
    examDate: "June 2027",
    eligibility:
      "MBBS Degree & completed 1 year of compulsory rotating internship",
    pyqCount: "8 Years Solved Papers",
  },
  {
    name: "CLAT",
    mode: "Offline",
    level: "National Level",
    stream: "Law",
    courses: ["BA LLB", "BBA LLB", "LLM", "Integrated Law"],
    registrationDate: "July 2026 - Nov 2026",
    examDate: "Dec 2026",
    eligibility: "12th Pass with 45% marks (40% for SC/ST)",
    pyqCount: "11 Years Solved Papers",
  },
];

const trendingUpdates = [
  {
    id: "1",
    tag: "Exam Update",
    title: "JEE Main 2027 Registration Portal Live - Apply before Deadline",
    details:
      "The registration portal for JEE Main 2027 Session 1 is officially open. Aspiring candidates can fill out the application form on the official website. Check eligible engineering colleges and cutoffs on College 19.",
    actionText: "Search Engineering Colleges",
    actionLink: "/colleges?stream=Engineering",
  },
  {
    id: "2",
    tag: "Admissions",
    title: "NEET UG 2026 Counselling Round 1 Seat Allotment Out",
    details:
      "The Medical Counselling Committee (MCC) has declared the Round 1 seat allocation results for NEET UG 2026 MBBS/BDS admissions. View cutoff ranks, fee structures, and download college brochures instantly.",
    actionText: "View Medical Colleges",
    actionLink: "/colleges?stream=Medical",
  },
  {
    id: "3",
    tag: "MBA News",
    title:
      "CAT 2026 Registration Dates Extended - Check Top Colleges accepting CAT",
    details:
      "The Indian Institutes of Management (IIMs) have extended the last date to apply for CAT 2026. Get access to CAT cutoff predictor and direct admission link for top MBA colleges.",
    actionText: "Explore MBA Colleges",
    actionLink: "/colleges?stream=Management",
  },
  {
    id: "4",
    tag: "Scholarship",
    title:
      "College 19 Scholarship Test (C19ST) 2026 - Win up to 100% tuition coverage",
    details:
      "C19ST 2026 registrations are now open for students seeking admissions in MBA, Engineering, and Medical courses. Participate and win financial aid up to ₹5 Lakhs.",
    actionText: "Register for Scholarship",
    actionLink: "/scholarship",
  },
  {
    id: "5",
    tag: "TYC Feature",
    title:
      "TYC College Predictor 2026 Launched: Predict your dream campus in seconds",
    details:
      "Get rank-based AI recommendations for IITs, NITs, AIIMS, and top private universities based on your JEE, NEET, or CAT exam scores.",
    actionText: "Open College Predictor",
    actionLink: "/predictor",
  },
  {
    id: "6",
    tag: "Student Cards",
    title: "Get Student-friendly Credit Cards via TYC - Zero Annual Charges",
    details:
      "Apply for custom credit cards designed for university students to cover tuition fees, books, and living expenses with interest-free semesters.",
    actionText: "Apply for Student Card",
    actionLink: "/credit-card",
  },
];

const heroSlides = [
  {
    name: "Amity University",
    location: "Noida, Uttar Pradesh",
    image: "/images/amity.png",
    slug: "amity-university",
  },
  {
    name: "Chandigarh University",
    location: "Gharuan, Punjab",
    image: "/images/chandigarh.png",
    slug: "chandigarh-university",
  },
  {
    name: "Galgotias University (Academic Block)",
    location: "Greater Noida, Uttar Pradesh",
    image: "/images/galgotias_lego_1.png",
    slug: "galgotias-university",
  },
  {
    name: "Galgotias University (Campus Entrance)",
    location: "Greater Noida, Uttar Pradesh",
    image: "/images/galgotias_lego_5.png",
    slug: "galgotias-university",
  },

  {
    name: "IIT Delhi Campus",
    location: "Hauz Khas, New Delhi",
    image: "/images/iitdelhi.png",
    slug: "iit-delhi",
  },
  {
    name: "AIIMS Rishikesh Campus",
    location: "Rishikesh, Uttarakhand",
    image: "/images/aiimsrishikesh.webp",
    slug: "aiims-rishikesh",
  },
];

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTrendingUpdate, setActiveTrendingUpdate] = useState<any>(null);
  const [activeExamModal, setActiveExamModal] = useState<any>(null);
  const [activeHubTab, setActiveHubTab] = useState<
    "cities" | "exams" | "courses"
  >("cities");

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStream, setSelectedStream] = useState("All");
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [modalType, setModalType] = useState<"general" | "credit-card">(
    "general",
  );
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    stream: "Engineering",
    email: "",
  });

  const [compareC1, setCompareC1] = useState("1");
  const [compareC2, setCompareC2] = useState("2");

  const streams = [
    {
      name: "Engineering",
      count: "120+ Colleges",
      icon: Building2,
      drawing: Cog,
      textColor: "text-blue-500",
      gradient: "from-blue-500 to-cyan-500",
      glow: "rgba(59,130,246,0.25)",
      bg: "from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/30",
      border: "hover:border-blue-400/60 dark:hover:border-blue-500/50",
      badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    },
    {
      name: "Medical",
      count: "80+ Colleges",
      icon: GraduationCap,
      drawing: Stethoscope,
      textColor: "text-emerald-500",
      gradient: "from-emerald-500 to-teal-500",
      glow: "rgba(16,185,129,0.25)",
      bg: "from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30",
      border: "hover:border-emerald-400/60 dark:hover:border-emerald-500/50",
      badge:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
    },
    {
      name: "Management",
      count: "95+ Colleges",
      icon: TrendingUp,
      drawing: BarChart3,
      textColor: "text-purple-500",
      gradient: "from-purple-500 to-violet-500",
      glow: "rgba(139,92,246,0.25)",
      bg: "from-purple-50 to-violet-50 dark:from-purple-950/40 dark:to-violet-950/30",
      border: "hover:border-purple-400/60 dark:hover:border-purple-500/50",
      badge:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
    },
    {
      name: "Law",
      count: "40+ Colleges",
      icon: BookOpen,
      drawing: Scale,
      textColor: "text-amber-500",
      gradient: "from-amber-500 to-orange-500",
      glow: "rgba(245,158,11,0.25)",
      bg: "from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30",
      border: "hover:border-amber-400/60 dark:hover:border-amber-500/50",
      badge:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
    },
    {
      name: "IT & Software",
      count: "65+ Colleges",
      icon: Code,
      drawing: Terminal,
      textColor: "text-indigo-500",
      gradient: "from-indigo-500 to-blue-600",
      glow: "rgba(99,102,241,0.25)",
      bg: "from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/30",
      border: "hover:border-indigo-400/60 dark:hover:border-indigo-500/50",
      badge:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300",
    },
    {
      name: "Design",
      count: "30+ Colleges",
      icon: Palette,
      drawing: Palette,
      textColor: "text-pink-500",
      gradient: "from-pink-500 to-rose-500",
      glow: "rgba(236,72,153,0.25)",
      bg: "from-pink-50 to-rose-50 dark:from-pink-950/40 dark:to-rose-950/30",
      border: "hover:border-pink-400/60 dark:hover:border-pink-500/50",
      badge: "bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300",
    },
    {
      name: "Science",
      count: "55+ Colleges",
      icon: FlaskConical,
      drawing: FlaskConical,
      textColor: "text-teal-500",
      gradient: "from-teal-500 to-cyan-600",
      glow: "rgba(20,184,166,0.25)",
      bg: "from-teal-50 to-cyan-50 dark:from-teal-950/40 dark:to-cyan-950/30",
      border: "hover:border-teal-400/60 dark:hover:border-teal-500/50",
      badge: "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300",
    },
    {
      name: "Arts",
      count: "45+ Colleges",
      icon: Users,
      drawing: Music,
      textColor: "text-orange-500",
      gradient: "from-orange-500 to-red-500",
      glow: "rgba(249,115,22,0.25)",
      bg: "from-orange-50 to-red-50 dark:from-orange-950/40 dark:to-red-950/30",
      border: "hover:border-orange-400/60 dark:hover:border-orange-500/50",
      badge:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
    },
  ];

  const trendingColleges: CollegeMock[] = [
    {
      id: "1",
      name: "IIM Ahmedabad - Indian Institute of Management",
      location: "Ahmedabad, Gujarat",
      rating: 4.9,
      highestPackage: "61.5 LPA",
      averagePackage: "32.8 LPA",
      averageFee: "₹12.5 Lakhs/Yr",
      type: "Government",
      slug: "iim-ahmedabad",
      stream: "Management",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      nirfRank: 1,
    },
    {
      id: "2",
      name: "IIM Bangalore - Indian Institute of Management",
      location: "Bangalore, Karnataka",
      rating: 4.8,
      highestPackage: "55.0 LPA",
      averagePackage: "30.5 LPA",
      averageFee: "₹11.8 Lakhs/Yr",
      type: "Government",
      slug: "iim-bangalore",
      stream: "Management",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      nirfRank: 2,
    },
    {
      id: "3",
      name: "IIT Delhi - Indian Institute of Technology",
      location: "New Delhi, Delhi",
      rating: 4.9,
      highestPackage: "1.2 Cr PA",
      averagePackage: "25.0 LPA",
      averageFee: "₹2.2 Lakhs/Yr",
      type: "Government",
      slug: "iit-delhi",
      stream: "Engineering",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      nirfRank: 2,
    },
    {
      id: "4",
      name: "IIT Bombay - Indian Institute of Technology",
      location: "Mumbai, Maharashtra",
      rating: 4.9,
      highestPackage: "1.4 Cr PA",
      averagePackage: "26.8 LPA",
      averageFee: "₹2.3 Lakhs/Yr",
      type: "Government",
      slug: "iit-bombay",
      stream: "Engineering",
      image:
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      nirfRank: 3,
    },
    {
      id: "5",
      name: "AIIMS Delhi - All India Institute of Medical Sciences",
      location: "New Delhi, Delhi",
      rating: 5.0,
      highestPackage: "45.0 LPA",
      averagePackage: "18.0 LPA",
      averageFee: "₹1,628/Yr",
      type: "Government",
      slug: "aiims-delhi",
      stream: "Medical",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      nirfRank: 1,
    },
    {
      id: "6",
      name: "NLSIU Bangalore - National Law School of India",
      location: "Bangalore, Karnataka",
      rating: 4.8,
      highestPackage: "25.0 LPA",
      averagePackage: "16.0 LPA",
      averageFee: "₹2.1 Lakhs/Yr",
      type: "Government",
      slug: "nlsiu-bangalore",
      stream: "Law",
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      nirfRank: 1,
    },
    {
      id: "7",
      name: "SIBM Pune - Symbiosis Institute of Business Management",
      location: "Pune, Maharashtra",
      rating: 4.6,
      highestPackage: "45.5 LPA",
      averagePackage: "23.0 LPA",
      averageFee: "₹10.2 Lakhs/Yr",
      type: "Private",
      slug: "sibm-pune",
      stream: "Management",
      image:
        "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      nirfRank: 17,
    },
    {
      id: "8",
      name: "CMC Vellore - Christian Medical College",
      location: "Vellore, Tamil Nadu",
      rating: 4.8,
      highestPackage: "20.0 LPA",
      averagePackage: "9.5 LPA",
      averageFee: "₹1.5 Lakhs/Yr",
      type: "Private",
      slug: "cmc-vellore",
      stream: "Medical",
      image:
        "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      nirfRank: 3,
    },
    {
      id: "9",
      name: "KMC Mangalore - Kasturba Medical College",
      location: "Mangalore, Karnataka",
      rating: 4.7,
      highestPackage: "22.0 LPA",
      averagePackage: "12.0 LPA",
      averageFee: "₹17.8 Lakhs/Yr",
      type: "Private",
      slug: "kmc-mangalore",
      stream: "Medical",
      image:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      nirfRank: 21,
    },
    {
      id: "10",
      name: "BIT Mesra Patna Campus",
      location: "Patna, Bihar",
      rating: 4.1,
      highestPackage: "18.5 LPA",
      averagePackage: "10.0 LPA",
      averageFee: "₹2.8 Lakhs/Yr",
      type: "Private",
      slug: "bit-mesra-patna",
      stream: "Engineering",
      image:
        "https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      nirfRank: 60,
    },
    {
      id: "11",
      name: "Galgotias University",
      location: "Greater Noida, Uttar Pradesh",
      rating: 4.2,
      highestPackage: "35.0 LPA",
      averagePackage: "8.5 LPA",
      averageFee: "₹1.6 Lakhs/Yr",
      type: "Private",
      slug: "galgotias-university",
      stream: "Engineering",
      image: "/images/galgotias_lego_1.png",
      nirfRank: 95,
    },
    {
      id: "12",
      name: "CNLU Patna - Chanakya National Law University",
      location: "Patna, Bihar",
      rating: 4.3,
      highestPackage: "16.0 LPA",
      averagePackage: "8.5 LPA",
      averageFee: "₹1.8 Lakhs/Yr",
      type: "Government",
      slug: "cnlu-patna",
      stream: "Law",
      image:
        "https://images.unsplash.com/photo-1505664194779-8bebcb95c539?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      nirfRank: 25,
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setShowInquiryModal(false);
      setFormSubmitted(false);
      setFormData({ name: "", phone: "", stream: "Engineering", email: "" });
    }, 2500);
  };

  const filteredColleges =
    selectedStream === "All"
      ? trendingColleges
      : trendingColleges.filter((col) => col.stream === selectedStream);

  return (
    <div className="space-y-12">
      {" "}
      {/* HERO SECTION */}
      <section className="relative overflow-hidden -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-12 h-[380px] md:h-[560px] text-white flex flex-col justify-end">
        {/* Slideshow background layer */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${heroSlides[activeSlide].image})`,
              }}
            />
          </AnimatePresence>
        </div>

        {/* Bottom left active slide label (Moved higher to sit above the glassmorphic panel) */}
        <div className="absolute bottom-20 left-4 sm:bottom-24 sm:left-8 z-10 block">
          <Link
            href={`/colleges/${heroSlides[activeSlide].slug}`}
            className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 hover:border-primary/50 text-[9px] sm:text-[10px] font-bold text-white tracking-wide transition-all hover:bg-slate-950 flex items-center gap-1 sm:gap-1.5 shadow-lg shadow-black/25 group/hero-lbl max-w-[90vw] sm:max-w-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
            <span className="font-extrabold text-slate-100 group-hover/hero-lbl:text-primary transition-colors truncate">
              {heroSlides[activeSlide].name},{" "}
              {heroSlides[activeSlide].location.split(",")[0]}
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-[9px] font-black uppercase text-primary tracking-wider flex items-center gap-0.5 flex-shrink-0">
              View
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary group-hover/hero-lbl:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Bottom Centered Glassmorphic Panel (Woxsen style overlay with Saffron highlights) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1080px] px-4 sm:px-6 z-20">
          <div className="grid grid-cols-3 bg-slate-900/40 backdrop-blur-md rounded-t-[32px] border-t border-x border-orange-500/25 overflow-hidden shadow-[0_-15px_35px_rgba(0,0,0,0.2)] select-none">
            {/* Tab 1: Top Cities */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setActiveHubTab("cities");
                document
                  .getElementById("explore-hub-section")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="flex flex-col items-center justify-center py-5 px-2 hover:bg-white/10 transition-all text-center border-b-[3px] border-transparent hover:border-orange-500 group border-r border-white/15 cursor-pointer"
            >
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="mt-2 font-outfit font-black text-[9px] md:text-[10.5px] text-white uppercase tracking-widest">
                Top Cities
              </span>
            </button>

            {/* Tab 2: Top Exams */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setActiveHubTab("exams");
                document
                  .getElementById("explore-hub-section")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="flex flex-col items-center justify-center py-5 px-2 hover:bg-white/10 transition-all text-center border-b-[3px] border-transparent hover:border-orange-500 group border-r border-white/15 cursor-pointer"
            >
              <Award className="w-5 h-5 md:w-6 md:h-6 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="mt-2 font-outfit font-black text-[9px] md:text-[10.5px] text-white uppercase tracking-widest">
                Top Exams
              </span>
            </button>

            {/* Tab 3: Top Courses */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setActiveHubTab("courses");
                document
                  .getElementById("explore-hub-section")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="flex flex-col items-center justify-center py-5 px-2 hover:bg-white/10 transition-all text-center border-b-[3px] border-transparent hover:border-orange-500 group cursor-pointer"
            >
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="mt-2 font-outfit font-black text-[9px] md:text-[10.5px] text-white uppercase tracking-widest">
                Top Courses
              </span>
            </button>
          </div>
        </div>
      </section>
      {/* CONSOLIDATED EXPLORE HUB SECTION (Dynamic Tabbed Switcher: Cities / Exams / Courses) */}
      <section
        id="explore-hub-section"
        className="space-y-8 select-none scroll-mt-28"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            {activeHubTab === "cities" && (
              <>
                <h2 className="font-outfit font-extrabold text-2xl md:text-3xl text-text_primary">
                  Explore Colleges by Cities
                </h2>
                <p className="text-sm text-text_secondary mt-1">
                  Discover top universities in India's leading educational hubs
                </p>
              </>
            )}
            {activeHubTab === "exams" && (
              <>
                <h2 className="font-outfit font-extrabold text-2xl md:text-3xl text-text_primary">
                  Top Entrance Exams
                </h2>
                <p className="text-sm text-text_secondary mt-1">
                  Explore India's leading entrance exams and download solved
                  question papers
                </p>
              </>
            )}
            {activeHubTab === "courses" && (
              <>
                <h2 className="font-outfit font-extrabold text-2xl md:text-3xl text-text_primary">
                  Explore Top Streams
                </h2>
                <p className="text-sm text-text_secondary mt-1">
                  Filter and discover the best educational categories in India
                </p>
              </>
            )}
          </div>
        </div>

        {/* Tab Content Renderers */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeHubTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {activeHubTab === "cities" && (
              <div className="relative group/carousel">
                {/* Scroll Controls */}
                <button
                  onClick={() =>
                    document
                      .getElementById("cities-carousel-container")
                      ?.scrollBy({ left: -300, behavior: "smooth" })
                  }
                  className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 active:bg-orange-600 active:text-white active:border-orange-600 active:shadow-[0_0_15px_rgba(249,115,22,0.7)] transition-all z-30 opacity-100 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("cities-carousel-container")
                      ?.scrollBy({ left: 300, behavior: "smooth" })
                  }
                  className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 active:bg-orange-600 active:text-white active:border-orange-600 active:shadow-[0_0_15px_rgba(249,115,22,0.7)] transition-all z-30 opacity-100 active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Scrollable Carousel Container */}
                <div
                  id="cities-carousel-container"
                  className="flex overflow-x-auto no-scrollbar gap-5 py-2 scroll-smooth"
                >
                  {topCities.map((city, idx) => (
                    <Link
                      key={city.name}
                      href={`/colleges?city=${city.slug}`}
                      className="flex-shrink-0 w-[210px] h-[140px] md:w-[240px] md:h-[160px] rounded-3xl overflow-hidden relative group/city shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_30px_rgba(249,115,22,0.18)] border border-slate-200/80 hover:border-orange-500/50 transition-all duration-350 hover:-translate-y-1.5 hover:scale-[1.03] select-none"
                    >
                      {/* Background image */}
                      <img
                        src={city.image}
                        alt={city.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover/city:scale-110 transition-transform duration-500"
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent group-hover/city:from-slate-950/90 transition-all duration-300" />

                      {/* Automatic Shimmer Sheen Reflection Overlay */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-[50%] h-[200%] pointer-events-none animate-shimmer-sheen z-10"
                        style={{ animationDelay: `${idx * 0.6}s` }}
                      />

                      {/* Content centered bottom */}
                      <div className="absolute bottom-4 left-4 right-4 text-left select-none pointer-events-none z-20">
                        <h4 className="font-outfit font-black text-sm md:text-base text-white tracking-wide">
                          {city.name}
                        </h4>
                        <p className="text-[9px] md:text-[10px] font-black text-orange-400 uppercase tracking-widest mt-0.5">
                          {city.collegesCount}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeHubTab === "exams" && (
              <div className="relative group/carousel">
                {/* Scroll Controls */}
                <button
                  onClick={() =>
                    document
                      .getElementById("exams-carousel-container")
                      ?.scrollBy({ left: -300, behavior: "smooth" })
                  }
                  className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 active:bg-orange-600 active:text-white active:border-orange-600 active:shadow-[0_0_15px_rgba(249,115,22,0.7)] transition-all z-30 opacity-100 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("exams-carousel-container")
                      ?.scrollBy({ left: 300, behavior: "smooth" })
                  }
                  className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 active:bg-orange-600 active:text-white active:border-orange-600 active:shadow-[0_0_15px_rgba(249,115,22,0.7)] transition-all z-30 opacity-100 active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Scrollable Carousel Container */}
                <div
                  id="exams-carousel-container"
                  className="flex overflow-x-auto no-scrollbar gap-5 py-2 scroll-smooth"
                >
                  {topExams.map((exam, idx) => (
                    <div
                      key={exam.name}
                      className="flex-shrink-0 w-[220px] h-[220px] md:w-[260px] md:h-[260px] bg-white border border-slate-200/80 hover:border-orange-500/50 rounded-[24px] p-4 md:p-5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_30px_rgba(249,115,22,0.18)] hover:-translate-y-1.5 transition-all duration-350 flex flex-col relative overflow-hidden group/exam select-none"
                    >
                      {/* Automatic Shimmer Sheen Reflection Overlay */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-[50%] h-[200%] pointer-events-none animate-shimmer-sheen z-10"
                        style={{ animationDelay: `${idx * 0.6}s` }}
                      />

                      {/* Online / Offline Status Badge */}
                      <span
                        className={`absolute top-4 right-4 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider z-20 ${
                          exam.mode.includes("Online")
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : "bg-orange-50 text-orange-600 border border-orange-100"
                        }`}
                      >
                        {exam.mode.includes("Online") ? "Online" : "Offline"}
                      </span>

                      {/* Exam Header */}
                      <div className="flex items-start gap-3 mb-3 z-20">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover/exam:bg-orange-500 group-hover/exam:text-white transition-all duration-300">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-outfit font-black text-sm md:text-[15px] text-text_primary tracking-wide leading-tight mt-0.5">
                            {exam.name}
                          </h3>
                          <span className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
                            {exam.level}
                          </span>
                        </div>
                      </div>

                      {/* Associated Streams Pills */}
                      <div className="flex flex-wrap gap-1 mb-3 z-20">
                        {exam.courses.slice(0, 3).map((course) => (
                          <Link
                            key={course}
                            href={`/colleges?stream=${exam.stream}`}
                            className="px-1.5 py-0.5 bg-slate-50 hover:bg-orange-50 border border-slate-100 hover:border-orange-200 text-slate-500 hover:text-orange-600 rounded text-[8px] font-extrabold tracking-wide transition-colors"
                          >
                            {course}
                          </Link>
                        ))}
                      </div>

                      {/* Details & Actions */}
                      <div className="mt-auto space-y-2 pt-2.5 border-t border-slate-100 z-20">
                        {/* Application Process Row */}
                        <button
                          onClick={() =>
                            setActiveExamModal({ exam, tab: "process" })
                          }
                          className="w-full flex items-center justify-between text-[9px] md:text-[10.5px] font-extrabold text-slate-600 hover:text-orange-600 transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <FileText className="w-3 md:w-3.5 h-3 md:h-3.5 text-slate-400" />
                            Application Process
                          </span>
                          <ChevronRight className="w-3 md:w-3.5 h-3 md:h-3.5 text-slate-400 group-hover/exam:translate-x-0.5 transition-transform" />
                        </button>

                        {/* Previous Year Questions Row */}
                        <button
                          onClick={() =>
                            setActiveExamModal({ exam, tab: "pyqs" })
                          }
                          className="w-full flex items-center justify-between text-[9px] md:text-[10.5px] font-extrabold text-slate-600 hover:text-orange-600 transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="w-3 md:w-3.5 h-3 md:h-3.5 text-slate-400" />
                            Previous Year Papers
                          </span>
                          <span className="text-[7.5px] bg-slate-100 text-slate-500 px-1 rounded font-black uppercase">
                            {exam.pyqCount.split(" ")[0]} Yrs
                          </span>
                        </button>

                        {/* Info Button */}
                        <button
                          onClick={() =>
                            setActiveExamModal({ exam, tab: "info" })
                          }
                          className="w-full mt-2 py-1.5 md:py-2 px-3 bg-slate-950 text-white hover:bg-orange-600 transition-all rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-wider text-center cursor-pointer shadow-md shadow-black/5 hover:shadow-orange-500/15"
                        >
                          Exam Info
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeHubTab === "courses" && (
              <div className="relative group/carousel">
                {/* Scroll Controls */}
                <button
                  onClick={() =>
                    document
                      .getElementById("streams-carousel-container")
                      ?.scrollBy({ left: -300, behavior: "smooth" })
                  }
                  className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 active:bg-orange-600 active:text-white active:border-orange-600 active:shadow-[0_0_15px_rgba(249,115,22,0.7)] transition-all z-30 opacity-100 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("streams-carousel-container")
                      ?.scrollBy({ left: 300, behavior: "smooth" })
                  }
                  className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 active:bg-orange-600 active:text-white active:border-orange-600 active:shadow-[0_0_15px_rgba(249,115,22,0.7)] transition-all z-30 opacity-100 active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Scrollable Carousel Container */}
                <div
                  id="streams-carousel-container"
                  className="flex overflow-x-auto no-scrollbar gap-5 py-2 scroll-smooth"
                >
                  {streams.map((stream, idx) => {
                    const Icon = stream.icon;
                    return (
                      <motion.div
                        key={stream.name}
                        initial={{ opacity: 0, y: 28, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          duration: 0.45,
                          delay: idx * 0.07,
                          type: "spring",
                          stiffness: 260,
                          damping: 22,
                        }}
                        whileHover={{
                          y: -8,
                          scale: 1.03,
                          boxShadow: `0 20px 50px ${stream.glow}, 0 4px 16px rgba(0,0,0,0.08)`,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 18,
                          },
                        }}
                        whileTap={{ scale: 0.97 }}
                        className={`group relative overflow-hidden rounded-[24px] border ${stream.border} bg-gradient-to-br ${stream.bg} transition-colors duration-300 cursor-pointer flex-shrink-0 w-[210px] h-[140px] md:w-[240px] md:h-[160px]`}
                      >
                        {/* Automatic Shimmer Sheen Reflection Overlay */}
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-[50%] h-[200%] pointer-events-none animate-shimmer-sheen z-10"
                          style={{ animationDelay: `${idx * 0.6}s` }}
                        />

                        {/* Shimmer sweep on hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/25 dark:via-white/10 to-transparent pointer-events-none z-10" />

                        {/* Glow orb */}
                        <div
                          className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle, ${stream.glow} 0%, transparent 70%)`,
                          }}
                        />

                        {/* Large Background drawing/icon related to course */}
                        {stream.drawing && (
                          <div
                            className={`absolute -right-4 -bottom-4 ${stream.textColor} opacity-[0.06] group-hover:opacity-[0.14] group-hover:scale-115 group-hover:-rotate-12 transition-all duration-500 pointer-events-none z-0`}
                          >
                            <stream.drawing className="w-24 h-24 md:w-28 md:h-28 stroke-[1.2]" />
                          </div>
                        )}

                        <div className="relative z-10 p-4 md:p-5">
                          {/* Icon */}
                          <motion.div
                            whileHover={{ rotate: [0, -8, 8, 0] }}
                            transition={{ duration: 0.5 }}
                            className={`w-11 h-11 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${stream.gradient} flex items-center justify-center shadow-md mb-3 group-hover:shadow-lg transition-shadow duration-300`}
                          >
                            <Icon className="w-5 h-5 md:w-7 md:h-7 text-white drop-shadow" />
                          </motion.div>

                          {/* Text */}
                          <h3 className="font-outfit font-extrabold text-sm md:text-[15px] text-text_primary group-hover:text-slate-900 dark:group-hover:text-white transition-colors leading-tight">
                            {stream.name}
                          </h3>

                          {/* Badge */}
                          <span
                            className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-black tracking-wide ${stream.badge}`}
                          >
                            {stream.count}
                          </span>

                          {/* Explore arrow */}
                          <div className="mt-3 flex items-center gap-1 text-[10px] font-black text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                            <span>Explore</span>
                            <motion.span
                              animate={{ x: [0, 3, 0] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: idx * 0.15,
                              }}
                            >
                              →
                            </motion.span>
                          </div>
                        </div>

                        <Link
                          href={`/colleges?stream=${stream.name}`}
                          className="absolute inset-0 z-20"
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
      {/* TRENDING NOW TICKER SECTION (Full length, Sharp edges, no blur, Mobile responsive) */}
      <section className="relative overflow-hidden bg-white border border-orange-500/20 rounded-2xl md:rounded-[24px] shadow-[0_6px_20px_rgba(0,0,0,0.035)] mt-6 mb-8 py-2.5 px-4 md:py-3.5 md:px-6 flex flex-col sm:flex-row items-center select-none gap-3 md:gap-4 w-full">
        {/* Left Skew Glowing Saffron Badge */}
        <div className="flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-black text-[9px] md:text-[10px] tracking-wider uppercase rounded-xl shadow-md shadow-orange-500/15 relative z-10 skew-x-[-8deg] origin-center">
          <span className="inline-block animate-pulse skew-x-[8deg]">🔥</span>
          <span className="skew-x-[8deg]">Trending Now</span>
        </div>

        {/* Scrollable Marquee Ticker */}
        <div className="flex-1 overflow-hidden relative w-full">
          <div className="animate-marquee-slow flex items-center gap-8 whitespace-nowrap">
            {/* Render twice for seamless infinite scrolling loops */}
            {[...trendingUpdates, ...trendingUpdates].map((update, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTrendingUpdate(update)}
                className="flex items-center gap-2 text-slate-700 hover:text-orange-600 font-extrabold text-[10px] md:text-[11px] tracking-wide transition-colors cursor-pointer outline-none focus:text-orange-600 group"
              >
                <span className="px-1.5 py-0.5 rounded bg-orange-50 text-orange-600 border border-orange-100 font-black text-[7.5px] md:text-[8px] uppercase tracking-wider group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-colors">
                  {update.tag}
                </span>
                <span>{update.title}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-orange-400 transition-colors ml-4" />
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* DUAL WIDGET SECTION: COMPARE COLLEGES & EXAM DEADLINES */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* WIDGET 1: COMPARE COLLEGES (INTERACTIVE WIDGET) */}
        <div className="lg:col-span-6 bg-card border border-border p-6 md:p-8 rounded-3xl space-y-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />

          <div className="space-y-2">
            <h2 className="font-outfit font-extrabold text-xl text-text_primary flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Compare Colleges Side-by-Side
            </h2>
            <p className="text-xs text-text_secondary leading-relaxed">
              Confused between two institutes? Select them below to compare
              side-by-side placements package, annual fees, ranks, and user
              ratings.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-text_secondary font-extrabold uppercase tracking-wider">
                  Select College 1
                </label>
                <select
                  value={compareC1}
                  onChange={(e) => setCompareC1(e.target.value)}
                  className="w-full mt-1.5 px-3.5 py-2.5 border border-border rounded-xl bg-background text-xs text-text_primary outline-none focus:border-primary font-bold"
                >
                  <option value="1">IIT Delhi (Engineering)</option>
                  <option value="2">IIM Ahmedabad (Management)</option>
                  <option value="3">Galgotias University (Engineering)</option>
                  <option value="4">SIBM Pune (Management)</option>
                  <option value="5">
                    RV College of Engineering (Engineering)
                  </option>
                  <option value="6">Kasturba Medical College (Medical)</option>
                  <option value="7">NLSIU Bangalore (Law)</option>
                  <option value="8">AIIMS Delhi (Medical)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-text_secondary font-extrabold uppercase tracking-wider">
                  Select College 2
                </label>
                <select
                  value={compareC2}
                  onChange={(e) => setCompareC2(e.target.value)}
                  className="w-full mt-1.5 px-3.5 py-2.5 border border-border rounded-xl bg-background text-xs text-text_primary outline-none focus:border-primary font-bold"
                >
                  <option value="2">IIM Ahmedabad (Management)</option>
                  <option value="1">IIT Delhi (Engineering)</option>
                  <option value="3">Galgotias University (Engineering)</option>
                  <option value="4">SIBM Pune (Management)</option>
                  <option value="5">
                    RV College of Engineering (Engineering)
                  </option>
                  <option value="6">Kasturba Medical College (Medical)</option>
                  <option value="7">NLSIU Bangalore (Law)</option>
                  <option value="8">AIIMS Delhi (Medical)</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              {compareC1 === compareC2 ? (
                <div className="text-rose-500 text-[10px] font-bold pb-2">
                  Please select two different colleges to compare!
                </div>
              ) : null}
              <Link
                href={`/compare?ids=${compareC1},${compareC2}`}
                className={`w-full py-3 bg-primary hover:bg-primary_hover text-white font-bold text-xs rounded-xl active:scale-95 transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-2 ${
                  compareC1 === compareC2
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
              >
                Compare Selected Colleges
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* WIDGET 2: EXAMS & COUNSELING CALENDAR */}
        <div className="lg:col-span-6 bg-card border border-border p-6 md:p-8 rounded-3xl space-y-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />

          <div className="space-y-2">
            <h2 className="font-outfit font-extrabold text-xl text-text_primary flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-500" />
              Entrance Exams & Counseling 2026
            </h2>
            <p className="text-xs text-text_secondary leading-relaxed">
              Track upcoming registration deadlines, national level cutoffs, and
              call predictions for top government counseling programs.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                name: "JEE Main 2026",
                date: "Registration open: Dec 2025",
                desc: "B.Tech/B.E Counseling",
                predictor: true,
              },
              {
                name: "CAT 2026",
                date: "Exam Date: 23 Nov 2026",
                desc: "IIM & Private MBA calls",
                predictor: true,
              },
              {
                name: "NEET UG 2026",
                date: "Registration starts: Feb 2026",
                desc: "AIIMS & MBBS Seats",
                predictor: true,
              },
              {
                name: "CLAT 2026",
                date: "Exam Date: 07 Dec 2025",
                desc: "National Law Universities",
                predictor: false,
              },
            ].map((exam, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-background border border-border rounded-xl"
              >
                <div>
                  <h4 className="font-outfit font-bold text-xs text-text_primary">
                    {exam.name}
                  </h4>
                  <p className="text-[10px] text-text_secondary font-semibold mt-0.5">
                    {exam.date} •{" "}
                    <span className="text-primary">{exam.desc}</span>
                  </p>
                </div>
                {exam.predictor ? (
                  <Link
                    href="/predictor"
                    className="px-3 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg text-[9px] font-black transition-colors animate-pulse"
                  >
                    Predictor
                  </Link>
                ) : (
                  <Link
                    href="/colleges"
                    className="px-3 py-1.5 border border-border hover:bg-border/30 rounded-lg text-[9px] font-bold text-text_secondary transition-colors"
                  >
                    View Details
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* BIHAR STUDENT CREDIT CARD SPOTLIGHT BANNER */}
      <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_35%)]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              Govt Scheme Admission Support
            </div>
            <h2 className="font-outfit font-extrabold text-3xl md:text-4xl leading-tight">
              Higher Studies Admission Under <br />
              <span className="underline decoration-emerald-300 underline-offset-8">
                Bihar Student Credit Card
              </span>
            </h2>
            <p className="text-slate-100 font-sans text-sm md:text-base max-w-xl">
              Get direct counseling for medical, B.Tech, MBA, pharmacy, and
              nursing courses fully covered under the Bihar Student Credit Card
              scheme. Zero upfront self-finance tuition fee options.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => {
                  setModalType("credit-card");
                  setShowInquiryModal(true);
                }}
                className="px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-700 hover:text-white font-bold text-sm rounded-xl active:scale-95 transition-all shadow-md"
              >
                Apply for Loan Guidance
              </button>
              <a
                href="#"
                className="flex items-center gap-2 px-5 py-3 border border-white/20 hover:bg-white/10 text-white font-bold text-sm rounded-xl transition-all"
              >
                <FileText className="w-4 h-4" />
                Download SCC Guidelines PDF
              </a>
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-48 h-48 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-950/20">
              <ShieldCheck className="w-24 h-24 text-emerald-200 animate-pulse" />
            </div>
          </div>
        </div>
      </section>
      {/* TRENDING COLLEGES */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-outfit font-extrabold text-2xl md:text-3xl text-text_primary">
              Trending Colleges in India
            </h2>
            <p className="text-sm text-text_secondary">
              Explore high-ranking institutes based on placements and
              infrastructure
            </p>
          </div>

          {/* TABS FILTER */}
          <div className="flex flex-wrap gap-2">
            {["All", "Engineering", "Management", "Medical", "Law"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedStream(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedStream === tab
                      ? "bg-primary text-white shadow-md shadow-primary/10"
                      : "bg-card border border-border text-text_secondary hover:bg-border/30 hover:text-text_primary"
                  }`}
                >
                  {tab}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="flex md:grid overflow-x-auto md:overflow-x-visible no-scrollbar gap-6 md:gap-8 pb-5 md:pb-0 snap-x md:snap-none snap-mandatory grid-cols-1 md:grid-cols-2">
          {filteredColleges.map((college) => (
            <motion.div
              layout
              key={college.id}
              className="group snap-start w-[85vw] sm:w-[350px] md:w-auto flex-shrink-0 md:flex-shrink bg-card border border-border/80 hover:border-orange-500/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(249,115,22,0.12)] hover:-translate-y-2 transition-all duration-350 ease-out"
            >
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                {/* College banner image with smooth zoom hover animation */}
                {college.image ? (
                  <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-teal-500/20" />
                )}

                {/* Dark gradient overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-75" />

                {/* NIRF Rank absolute badge */}
                {college.nirfRank && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-md shadow-orange-500/25 z-10">
                    NIRF Rank #{college.nirfRank}
                  </div>
                )}

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm text-xs font-bold text-slate-800 z-10">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {college.rating}
                </div>
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-white z-10">
                  {college.type}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-orange-600">
                    {college.stream}
                  </span>
                  <h3 className="font-outfit font-bold text-lg text-text_primary group-hover:text-orange-600 transition-colors line-clamp-1 mt-1">
                    {college.name}
                  </h3>
                  <p className="flex items-center gap-1.5 text-xs text-text_secondary mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    {college.location}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 px-4 bg-background border border-border rounded-xl text-center">
                  <div>
                    <p className="text-[8px] text-text_secondary font-extrabold uppercase tracking-wider">
                      Highest LPA
                    </p>
                    <p className="font-outfit font-bold text-xs text-emerald-500 mt-0.5">
                      {college.highestPackage}
                    </p>
                  </div>
                  <div>
                    <p className="text-[8px] text-text_secondary font-extrabold uppercase tracking-wider">
                      Average LPA
                    </p>
                    <p className="font-outfit font-bold text-xs text-orange-600 mt-0.5">
                      {college.averagePackage}
                    </p>
                  </div>
                  <div>
                    <p className="text-[8px] text-text_secondary font-extrabold uppercase tracking-wider">
                      Course Fees
                    </p>
                    <p className="font-outfit font-bold text-xs text-text_primary mt-0.5">
                      {college.averageFee}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Link
                    href={`/colleges/${college.slug}`}
                    className="flex-1 px-4 py-2.5 bg-background hover:bg-slate-50 border border-border hover:border-orange-500/30 text-text_primary hover:text-orange-600 font-bold text-xs rounded-xl text-center transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => {
                      setFormData({ ...formData, stream: college.stream });
                      setModalType("general");
                      setShowInquiryModal(true);
                    }}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-orange-500/20 active:scale-95"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* FOOTER CALL-TO-ACTION COUNSELING */}
      <section className="bg-card border border-border p-8 md:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-outfit font-extrabold text-2xl md:text-3xl text-text_primary">
            Still Confused About Your College?
          </h2>
          <p className="text-sm text-text_secondary max-w-lg leading-relaxed">
            Fill in your details and let our expert advisors call you back
            within 15 minutes. We help you choose the best college based on your
            exam scores, location, and fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm text-text_primary font-bold">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              100% Free Counseling
            </div>
            <div className="flex items-center gap-2 text-sm text-text_primary font-bold">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              Guaranteed Direct Admission Info
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-background border border-border p-6 rounded-2xl shadow-sm">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-text_secondary font-bold">
                Student Name
              </label>
              <input
                required
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full mt-1.5 px-3.5 py-2.5 border border-border rounded-xl bg-card text-sm text-text_primary outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-text_secondary font-bold">
                  Mobile Number
                </label>
                <input
                  required
                  type="tel"
                  placeholder="Enter 10-digit number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full mt-1.5 px-3.5 py-2.5 border border-border rounded-xl bg-card text-sm text-text_primary outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-text_secondary font-bold">
                  Target Course
                </label>
                <select
                  value={formData.stream}
                  onChange={(e) =>
                    setFormData({ ...formData, stream: e.target.value })
                  }
                  className="w-full mt-1.5 px-3.5 py-2.5 border border-border rounded-xl bg-card text-sm text-text_primary outline-none focus:border-primary transition-colors"
                >
                  <option>Engineering</option>
                  <option>Medical</option>
                  <option>Management</option>
                  <option>Law</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary_hover text-white font-bold text-sm rounded-xl active:scale-95 transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Request Free Call Back
            </button>
          </form>
        </div>
      </section>
      {/* POPUP COUNSELING FORM MODAL */}
      <AnimatePresence>
        {showInquiryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-6 bg-card border border-border rounded-2xl relative shadow-2xl"
            >
              <button
                onClick={() => setShowInquiryModal(false)}
                className="absolute top-4 right-4 text-text_secondary hover:text-text_primary p-1"
              >
                <X className="w-5 h-5" />
              </button>

              {formSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 animate-bounce" />
                  </div>
                  <h3 className="font-outfit font-extrabold text-xl text-text_primary">
                    Request Captured!
                  </h3>
                  <p className="text-sm text-text_secondary max-w-xs mx-auto">
                    Our educational counselor will call you shortly on **+91{" "}
                    {formData.phone}**.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-outfit font-extrabold text-xl text-text_primary">
                    {modalType === "credit-card"
                      ? "Bihar Student Credit Card Admission Guidance"
                      : "Apply for Admission & Free Counseling"}
                  </h3>
                  <p className="text-xs text-text_secondary leading-relaxed">
                    Provide your correct contact information. We will guide you
                    with fees, cutoffs, admission quota, and documentation
                    checklist.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
                    <div>
                      <label className="text-xs text-text_secondary font-bold">
                        Your Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full mt-1.5 px-3.5 py-2.5 border border-border rounded-xl bg-background text-sm text-text_primary outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-text_secondary font-bold">
                        Mobile Number
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="Enter 10 digit number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full mt-1.5 px-3.5 py-2.5 border border-border rounded-xl bg-background text-sm text-text_primary outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-text_secondary font-bold">
                        Desired Course/Stream
                      </label>
                      <select
                        value={formData.stream}
                        onChange={(e) =>
                          setFormData({ ...formData, stream: e.target.value })
                        }
                        className="w-full mt-1.5 px-3.5 py-2.5 border border-border rounded-xl bg-background text-sm text-text_primary outline-none focus:border-primary transition-colors"
                      >
                        <option>Engineering</option>
                        <option>Medical</option>
                        <option>Management</option>
                        <option>Law</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-premium hover:bg-primary text-white font-bold text-sm rounded-xl shadow-lg active:scale-95 transition-all mt-2"
                    >
                      {modalType === "credit-card"
                        ? "Request Credit Card Assistance"
                        : "Submit Admission Query"}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* TRENDING NOW NEWS DETAILS MODAL */}
      <AnimatePresence>
        {activeTrendingUpdate && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            {/* Backdrop trigger */}
            <div
              className="absolute inset-0"
              onClick={() => setActiveTrendingUpdate(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white rounded-3xl w-full max-w-[520px] shadow-2xl p-6 md:p-7 flex flex-col z-10 border border-slate-100 overflow-hidden"
            >
              {/* Glowing top line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-red-500" />

              {/* Header Row */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
                <span className="px-2.5 py-1 rounded-lg bg-orange-50 text-orange-600 border border-orange-100 font-black text-[9px] uppercase tracking-widest">
                  {activeTrendingUpdate.tag}
                </span>
                <button
                  onClick={() => setActiveTrendingUpdate(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title */}
              <h3 className="font-outfit font-black text-slate-800 text-base md:text-lg leading-snug mb-3">
                {activeTrendingUpdate.title}
              </h3>

              {/* Details News Description */}
              <p className="text-xs text-slate-500 font-semibold leading-relaxed mb-6">
                {activeTrendingUpdate.details}
              </p>

              {/* Action Button & Dismiss Row */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-50">
                <button
                  onClick={() => setActiveTrendingUpdate(null)}
                  className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Dismiss
                </button>
                <Link
                  href={activeTrendingUpdate.actionLink}
                  onClick={() => setActiveTrendingUpdate(null)}
                  className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-orange-500/15 active:scale-95 cursor-pointer text-center"
                >
                  {activeTrendingUpdate.actionText}
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* TOP ENTRANCE EXAM DETAILS MODAL */}
      <AnimatePresence>
        {activeExamModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            {/* Backdrop trigger */}
            <div
              className="absolute inset-0"
              onClick={() => setActiveExamModal(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white rounded-3xl w-full max-w-[540px] shadow-2xl p-6 md:p-7 flex flex-col z-10 border border-slate-100 overflow-hidden"
            >
              {/* Glowing top line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-red-500" />

              {/* Header Row */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
                <span className="px-2.5 py-1 rounded-lg bg-orange-50 text-orange-600 border border-orange-100 font-black text-[9px] uppercase tracking-widest">
                  {activeExamModal.exam.name} - {activeExamModal.exam.stream}
                </span>
                <button
                  onClick={() => setActiveExamModal(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Tabs Content based on clicked tab */}
              {activeExamModal.tab === "info" && (
                <div className="space-y-4">
                  <h3 className="font-outfit font-black text-slate-800 text-base md:text-lg tracking-wide">
                    About {activeExamModal.exam.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="block text-slate-400 font-bold uppercase text-[9px] tracking-wider mb-1">
                        Exam Mode
                      </span>
                      <span className="font-extrabold text-slate-700">
                        {activeExamModal.exam.mode}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="block text-slate-400 font-bold uppercase text-[9px] tracking-wider mb-1">
                        Exam Level
                      </span>
                      <span className="font-extrabold text-slate-700">
                        {activeExamModal.exam.level}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="block text-slate-400 font-bold uppercase text-[9px] tracking-wider mb-1">
                        Registration Date
                      </span>
                      <span className="font-extrabold text-slate-700">
                        {activeExamModal.exam.registrationDate}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="block text-slate-400 font-bold uppercase text-[9px] tracking-wider mb-1">
                        Expected Exam Date
                      </span>
                      <span className="font-extrabold text-slate-700 text-orange-600">
                        {activeExamModal.exam.examDate}
                      </span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs">
                    <span className="block text-slate-400 font-bold uppercase text-[9px] tracking-wider mb-1">
                      Eligibility Criteria
                    </span>
                    <p className="font-semibold text-slate-600 leading-relaxed">
                      {activeExamModal.exam.eligibility}
                    </p>
                  </div>
                </div>
              )}

              {activeExamModal.tab === "process" && (
                <div className="space-y-4 text-xs">
                  <h3 className="font-outfit font-black text-slate-800 text-base md:text-lg tracking-wide">
                    Application Process
                  </h3>
                  <div className="bg-orange-50/50 p-3 rounded-xl border border-orange-100 text-[11px] font-semibold text-orange-800 leading-relaxed">
                    💡 <strong>Quick Note:</strong> Ensure you have active
                    mobile number and email id ready before applying. Keep your
                    scanned academic documents, signature, and photograph handy.
                  </div>
                  <ol className="list-decimal list-inside space-y-2 text-slate-600 font-semibold pl-1">
                    <li>
                      Visit the official {activeExamModal.exam.name} online
                      portal during the registration window (
                      {activeExamModal.exam.registrationDate}).
                    </li>
                    <li>
                      Click on New Registration and fill your basic details to
                      create login credentials.
                    </li>
                    <li>
                      Log in using Application Number and password, and complete
                      the detailed form.
                    </li>
                    <li>
                      Upload scanned photograph, signature, and categories
                      certificate if required.
                    </li>
                    <li>
                      Pay the examination fee online via Net Banking,
                      Debit/Credit Card, or UPI.
                    </li>
                    <li>
                      Submit the application form and download the confirmation
                      page.
                    </li>
                  </ol>
                </div>
              )}

              {activeExamModal.tab === "pyqs" && (
                <div className="space-y-4 text-xs">
                  <h3 className="font-outfit font-black text-slate-800 text-base md:text-lg tracking-wide">
                    Previous Year Question Papers
                  </h3>
                  <p className="font-semibold text-slate-500 leading-relaxed">
                    Download {activeExamModal.exam.pyqCount} with detailed
                    solutions to boost your preparation.
                  </p>
                  <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                    {[2026, 2025, 2024, 2023, 2022].map((year) => (
                      <div
                        key={year}
                        className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl hover:border-orange-200 transition-colors"
                      >
                        <span className="font-bold text-slate-700">
                          {activeExamModal.exam.name} {year} Question Paper
                          (Solved)
                        </span>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(
                              `Download started for ${activeExamModal.exam.name} ${year} Solved Paper!`,
                            );
                          }}
                          className="px-2.5 py-1 bg-orange-50 hover:bg-orange-500 border border-orange-100 hover:border-orange-500 text-orange-600 hover:text-white font-black text-[9px] uppercase tracking-wider rounded-lg transition-all"
                        >
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100 mt-6">
                <button
                  onClick={() => setActiveExamModal(null)}
                  className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Dismiss
                </button>
                <Link
                  href={`/colleges?stream=${activeExamModal.exam.stream}`}
                  onClick={() => setActiveExamModal(null)}
                  className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-orange-500/15 active:scale-95 cursor-pointer text-center"
                >
                  Find Colleges accepting {activeExamModal.exam.name}
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
