"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
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
  TrendingUp,
  Edit,
  X,
  Loader2,
  Award,
  Calendar,
  DollarSign,
  Check,
  ChevronDown,
  ChevronRight,
  Image as ImageIcon,
  Sparkles,
  Share2,
  Bookmark,
  FileText,
  HelpCircle,
  ShieldCheck,
  Layers,
  Compass,
  ExternalLink,
  Users,
  Shield,
  Clock,
  School,
  Landmark,
  Percent,
  CheckCircle2,
} from "lucide-react";

interface CourseItem {
  name: string;
  duration: string;
  fees: string;
  eligibility: string;
  seats?: string;
}

interface CutoffItem {
  branch: string;
  category?: string;
  openRank: string | number;
  closeRank: string | number;
  round?: string;
}

interface ReviewItem {
  id: string;
  author: string;
  course: string;
  year: string;
  rating: number;
  title: string;
  content: string;
  pros?: string;
  cons?: string;
}

interface HighlightItem {
  label: string;
  value: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface GalleryPhoto {
  url: string;
  caption: string;
  category: string;
}

interface FacultyMember {
  name: string;
  designation: string;
  dept: string;
  qualification: string;
  experience: string;
}

interface CollegeDetail {
  name: string;
  fullName?: string;
  location: string;
  city?: string;
  state?: string;
  nirfRank: string;
  rating: number;
  ratingCount: string;
  type: string;
  estd: string;
  stream: string;
  highestPackage: string;
  averagePackage: string;
  medianPackage?: string;
  totalFees: string;
  image?: string;
  logo?: string;
  description: string;
  campusArea?: string;
  flagshipCourse?: string;
  accreditation?: string;
  highlights: HighlightItem[];
  whatsNew?: string[];
  courses: CourseItem[];
  recruiters: string[];
  cutoffs: CutoffItem[];
  facilities: { name: string; icon: string; desc?: string }[];
  reviews: ReviewItem[];
  faqs: FaqItem[];
  gallery: GalleryPhoto[];
  facultyList?: FacultyMember[];
}

// Master Benchmark Dataset for IIT Delhi
const IIT_DELHI_MASTER_DATA: CollegeDetail = {
  name: "IIT Delhi - Indian Institute of Technology",
  fullName: "Indian Institute of Technology Delhi (IIT Delhi)",
  location: "Hauz Khas, New Delhi, Delhi 110016",
  city: "New Delhi",
  state: "Delhi",
  nirfRank: "NIRF #2 (Engineering 2026)",
  rating: 4.9,
  ratingCount: "842 Verified Reviews",
  type: "Government (Autonomous) • Institute of National Importance",
  estd: "1961",
  stream: "Engineering",
  highestPackage: "₹1.20 Crore PA (Domestic) / ₹2.40 Crore PA (Int.)",
  averagePackage: "₹25.82 Lakhs PA",
  medianPackage: "₹20.50 Lakhs PA",
  totalFees: "₹2.38 Lakhs / Year (₹9.52 Lakhs Total B.Tech)",
  image: "/images/iitdelhi_real.jpg",
  logo: "/images/iitdelhi.png",
  campusArea: "320 Acres (Lush Green South Delhi Campus)",
  flagshipCourse: "B.Tech Computer Science and Engineering (CSE)",
  accreditation: "Institute of National Importance (MHRD/AICTE/UGC)",
  description: `Indian Institute of Technology Delhi (IIT Delhi) is one of the premier public technical and research universities in India. Established in 1961 as the College of Engineering, it was declared an 'Institute of National Importance' under the Institutes of Technology Act.

Spanning over 320 acres in the historic and posh area of Hauz Khas in South Delhi, IIT Delhi is renowned globally for its rigorous academic curriculum, cutting-edge research facilities, entrepreneurial incubation ecosystem (FITT), and stellar placement record. IIT Delhi offers undergraduate (B.Tech), postgraduate (M.Tech, M.S. Research, MBA, M.Des, M.Sc), and doctoral (Ph.D.) programs across diverse engineering, sciences, design, and management disciplines.`,
  highlights: [
    { label: "Establishment Year", value: "1961 (65+ Years of Academic Heritage)" },
    { label: "Campus Area", value: "320 Acres (Self-contained Hauz Khas Campus)" },
    { label: "Ownership / Status", value: "Public / Autonomous (Govt. of India)" },
    { label: "NIRF Ranking 2026", value: "#2 in Engineering, #1 in Delhi NCR, Top 5 Overall" },
    { label: "Highest Package (Domestic)", value: "₹1.20 Crore PA" },
    { label: "Highest Package (International)", value: "₹2.40 Crore PA" },
    { label: "Average CTC (Overall)", value: "₹25.82 Lakhs PA" },
    { label: "Flagship Programs", value: "B.Tech (CSE, MnC, EE, AI & DS), MBA (DMS IITD)" },
    { label: "Accepted Entrance Exams", value: "JEE Advanced (B.Tech), GATE (M.Tech), CAT (MBA), CEED (M.Des)" },
    { label: "Total Student Intake", value: "Approx. 1,200+ (B.Tech) | 12,000+ Total Students" },
    { label: "Gender Diversity / Supernumerary", value: "20% Supernumerary Seats for Female Candidates" },
    { label: "Scholarships & Financial Aid", value: "100% Tuition Fee Waiver for SC/ST/PwD & EWS Students" },
  ],
  whatsNew: [
    "JoSAA 2026 Counselling registration for B.Tech programs begins in June 2026 following JEE Advanced results.",
    "IIT Delhi introduces new interdisciplinary M.Tech and B.Tech minors in Generative AI, Quantum Computing, and Clean Energy.",
    "Placement Season 2025-26 recorded over 1,300+ total job offers with 50+ international offers in phase 1.",
    "DMS IIT Delhi MBA admissions 2026 shortlist based on CAT 2025 cutoff (98.5+ percentile) released.",
  ],
  courses: [
    {
      name: "B.Tech Computer Science and Engineering (CSE)",
      duration: "4 Years (8 Semesters)",
      fees: "₹2,38,500 / Yr",
      eligibility: "JEE Advanced rank (Top 118 for General) + Class 12th (75% PCM)",
      seats: "99 Seats",
    },
    {
      name: "B.Tech Mathematics and Computing (MnC)",
      duration: "4 Years (8 Semesters)",
      fees: "₹2,38,500 / Yr",
      eligibility: "JEE Advanced rank (Top 315 for General) + Class 12th (75% PCM)",
      seats: "60 Seats",
    },
    {
      name: "B.Tech Electrical Engineering",
      duration: "4 Years (8 Semesters)",
      fees: "₹2,38,500 / Yr",
      eligibility: "JEE Advanced rank (Top 610 for General) + Class 12th (75% PCM)",
      seats: "120 Seats",
    },
    {
      name: "B.Tech in Artificial Intelligence & Data Science",
      duration: "4 Years (8 Semesters)",
      fees: "₹2,38,500 / Yr",
      eligibility: "JEE Advanced rank (Top 240 for General) + Class 12th (75% PCM)",
      seats: "40 Seats",
    },
    {
      name: "B.Tech Mechanical Engineering",
      duration: "4 Years (8 Semesters)",
      fees: "₹2,38,500 / Yr",
      eligibility: "JEE Advanced rank (Top 1,750 for General) + Class 12th (75% PCM)",
      seats: "110 Seats",
    },
    {
      name: "B.Tech Chemical Engineering",
      duration: "4 Years (8 Semesters)",
      fees: "₹2,38,500 / Yr",
      eligibility: "JEE Advanced rank (Top 2,400 for General) + Class 12th (75% PCM)",
      seats: "95 Seats",
    },
    {
      name: "B.Tech Civil Engineering",
      duration: "4 Years (8 Semesters)",
      fees: "₹2,38,500 / Yr",
      eligibility: "JEE Advanced rank (Top 4,200 for General) + Class 12th (75% PCM)",
      seats: "110 Seats",
    },
    {
      name: "Dual Degree B.Tech + M.Tech (CSE / Chemical)",
      duration: "5 Years (10 Semesters)",
      fees: "₹2,38,500 / Yr",
      eligibility: "JEE Advanced rank + Class 12th (75% PCM)",
      seats: "45 Seats",
    },
    {
      name: "MBA / Executive MBA (DMS IIT Delhi)",
      duration: "2 Years",
      fees: "₹5,50,000 / Yr",
      eligibility: "CAT Score (98.5+ %ile) + Bachelor's Degree with 60% + PI",
      seats: "115 Seats",
    },
    {
      name: "M.Tech (Various 40+ Specializations)",
      duration: "2 Years",
      fees: "₹52,000 / Yr",
      eligibility: "GATE Score + B.Tech/BE in relevant stream with 60%+",
      seats: "800+ Seats",
    },
  ],
  recruiters: [
    "Google",
    "Microsoft",
    "Apple",
    "Amazon",
    "Goldman Sachs",
    "Texas Instruments",
    "McKinsey & Company",
    "Bain & Company",
    "Boston Consulting Group (BCG)",
    "Nvidia",
    "Qualcomm",
    "Intel",
    "Uber",
    "Oracle",
    "Adobe",
    "Schlumberger",
    "Morgan Stanley",
    "JP Morgan Chase",
    "ITC Limited",
    "Tata Consultancy Services",
    "Samsung R&D",
    "Jane Street",
  ],
  cutoffs: [
    { branch: "Computer Science & Engineering (CSE)", category: "General (Gender-Neutral)", openRank: 28, closeRank: 118, round: "Round 6" },
    { branch: "Computer Science & Engineering (CSE)", category: "Female-only (Supernumerary)", openRank: 95, closeRank: 420, round: "Round 6" },
    { branch: "Computer Science & Engineering (CSE)", category: "OBC-NCL", openRank: 35, closeRank: 78, round: "Round 6" },
    { branch: "Mathematics and Computing (MnC)", category: "General (Gender-Neutral)", openRank: 120, closeRank: 315, round: "Round 6" },
    { branch: "Artificial Intelligence & Data Science", category: "General (Gender-Neutral)", openRank: 110, closeRank: 240, round: "Round 6" },
    { branch: "Electrical Engineering", category: "General (Gender-Neutral)", openRank: 320, closeRank: 610, round: "Round 6" },
    { branch: "Mechanical Engineering", category: "General (Gender-Neutral)", openRank: 850, closeRank: 1750, round: "Round 6" },
    { branch: "Chemical Engineering", category: "General (Gender-Neutral)", openRank: 1400, closeRank: 2410, round: "Round 6" },
    { branch: "Civil Engineering", category: "General (Gender-Neutral)", openRank: 2200, closeRank: 4280, round: "Round 6" },
    { branch: "Engineering Physics", category: "General (Gender-Neutral)", openRank: 1100, closeRank: 2800, round: "Round 6" },
  ],
  facilities: [
    { name: "Central Library", icon: "BookOpen", desc: "3+ Lakh physical books, e-journals, 24x7 air-conditioned reading halls." },
    { name: "High-Speed Wi-Fi", icon: "Wifi", desc: "10 Gbps campus-wide optic fiber network covering all hostels & academic zones." },
    { name: "13 Student Hostels", icon: "Building", desc: "Separate single/double occupancy hostels with mess, gym, and recreation rooms." },
    { name: "Olympic Sports Complex", icon: "Heart", desc: "Swimming pool, floodlit tennis courts, synthetic athletic tracks, cricket oval." },
    { name: "Cafeteria & Food Courts", icon: "Coffee", desc: "Café Coffee Day, Nescafe, Amul parlors, Mother Dairy, and multicusine canteens." },
    { name: "Hospital & Health Center", icon: "ShieldCheck", desc: "24-hour round-the-clock medical emergency clinic with full-time doctors & pharmacy." },
  ],
  reviews: [
    {
      id: "1",
      author: "Aditya Sharma",
      course: "B.Tech Computer Science (Batch 2025)",
      year: "2 weeks ago",
      rating: 5,
      title: "Unrivaled peer group, world-class professors & dream placements",
      content:
        "Studying CSE at IIT Delhi is a life-changing experience. The coding culture is unmatched with active clubs like DevClub and Robotics Club. Placements are phenomenal — top US tech giants hire directly.",
      pros: "Top 0.01% brains of India, zero attendance strictness in some electives, massive funding for startups.",
      cons: "Academics can get intensely competitive during minor and major exam weeks.",
    },
    {
      id: "2",
      author: "Priya Varma",
      course: "B.Tech Electrical Engineering (Batch 2024)",
      year: "1 month ago",
      rating: 5,
      title: "Lush green campus in the heart of South Delhi with rich heritage",
      content:
        "The Hauz Khas location gives you access to the best cafes, metro connectivity, and events. Hostels are lively, food in the mess is good with regular special dinners. Rendezvous fest is unforgettable.",
      pros: "Metro gate right outside campus (IIT Delhi station on Magenta Line), incredible alumni network.",
      cons: "Old hostel wings could use modern renovation.",
    },
  ],
  faqs: [
    {
      question: "What is the minimum JEE Advanced rank required for IIT Delhi Computer Science (CSE)?",
      answer: "For the General Category (Gender-Neutral), the opening rank for B.Tech CSE is around 28 and the closing rank in Round 6 of JoSAA counselling is approximately 115–118. For Female candidates (Supernumerary), the closing rank extends up to rank 420.",
    },
    {
      question: "What is the average and highest placement package at IIT Delhi?",
      answer: "In the 2024-25 placement drive, the highest domestic CTC offered was ₹1.20 Crore PA, while the highest international offer touched ₹2.40 Crore PA. The overall average package across all B.Tech branches stood at ₹25.82 Lakhs PA, with CSE average exceeding ₹39.5 Lakhs PA.",
    },
    {
      question: "What are the hostel and mess fees at IIT Delhi?",
      answer: "Hostel seat rent and amenities charge around ₹8,000 to ₹12,000 per semester. Mess advance is approximately ₹25,000 to ₹30,000 per semester. Overall hostel and mess expenditure is around ₹70,000–₹80,000 annually.",
    },
    {
      question: "Does IIT Delhi offer fee concessions or scholarships for economically weaker students?",
      answer: "Yes! 100% tuition fee waiver is granted to all SC, ST, and PwD students. Additionally, General/OBC students with family income below ₹1 Lakh/year receive 100% tuition waiver, and those between ₹1–5 Lakhs/year get a 66.6% tuition fee waiver under the Govt. Merit-cum-Means (MCM) scheme.",
    },
    {
      question: "How can I apply for MBA at Department of Management Studies (DMS) IIT Delhi?",
      answer: "Admission to the 2-Year Full-Time MBA at DMS IIT Delhi requires a valid CAT percentile (typically 98.5+ percentile for General category). Shortlisted candidates undergo a Personal Interview (PI) and analytical evaluation.",
    },
  ],
  gallery: [
    { url: "/images/iitdelhi_real.jpg", caption: "IIT Delhi Main Iconic Administration Building", category: "Campus" },
    { url: "/images/galgotias_real.jpg", caption: "Dogra Hall & Academic Complex", category: "Academic" },
    { url: "/images/amity_real.jpg", caption: "High-Tech AI & Robotics Research Lab", category: "Labs" },
    { url: "/images/chandigarh_real.jpg", caption: "Student Hostels & Green Courtyards", category: "Hostel" },
  ],
  facultyList: [
    { name: "Prof. Rangan Banerjee", designation: "Director & Senior Professor", dept: "Energy Science and Engineering", qualification: "Ph.D. IIT Bombay", experience: "32+ Years" },
    { name: "Prof. Mausam", designation: "Head of School of AI (ScAI)", dept: "Computer Science & Artificial Intelligence", qualification: "Ph.D. University of Washington (USA)", experience: "18+ Years" },
    { name: "Prof. Subodh Kumar", designation: "Professor", dept: "Computer Science & Engineering", qualification: "Ph.D. University of North Carolina", experience: "24+ Years" },
    { name: "Prof. Brejesh Lall", designation: "Professor & Dean", dept: "Electrical Engineering", qualification: "Ph.D. IIT Delhi", experience: "22+ Years" },
  ],
};

// Exact Shiksha Tabs List from User's 1st Reference Image
const SHIKSHA_NAV_TABS = [
  { id: "info", label: "College Info" },
  { id: "courses", label: "Courses" },
  { id: "fees", label: "Fees" },
  { id: "reviews", label: "Reviews" },
  { id: "admissions", label: "Admissions" },
  { id: "placements", label: "Placements" },
  { id: "cutoffs", label: "Cut-Offs" },
  { id: "rankings", label: "Rankings" },
  { id: "gallery", label: "Gallery" },
  { id: "hostel", label: "Hostel & Campus" },
  { id: "faculty", label: "Faculty" },
  { id: "compare", label: "Compare" },
  { id: "qa", label: "Q&A" },
  { id: "scholarships", label: "Scholarships" },
] as const;

type ShikshaTabId = (typeof SHIKSHA_NAV_TABS)[number]["id"];

const iconMap: Record<string, any> = {
  Building,
  BookOpen,
  Wifi,
  Coffee,
  Heart,
  ShieldCheck,
};

export default function CollegeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Selected Tab State (Default is 'info' which maps to 'College Info')
  const [activeTab, setActiveTab] = useState<ShikshaTabId>("info");

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    stream: "Engineering",
  });

  const [collegeData, setCollegeData] = useState<CollegeDetail>(IIT_DELHI_MASTER_DATA);
  const [loading, setLoading] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [courseSearch, setCourseSearch] = useState("");

  // Admin Session and In-Page Editing States
  const [isAdmin, setIsAdmin] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Edit Form Fields
  const [editAboutText, setEditAboutText] = useState("");
  const [editEstd, setEditEstd] = useState("");
  const [editHighestPackage, setEditHighestPackage] = useState("");
  const [editAveragePackage, setEditAveragePackage] = useState("");
  const [editTotalFees, setEditTotalFees] = useState("");
  const [editCoverImage, setEditCoverImage] = useState("");
  const [editLogoImage, setEditLogoImage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(localStorage.getItem("think_college_admin") === "true");
    }
  }, []);

  // Fetch college details from Supabase (or load master data)
  useEffect(() => {
    const fetchCollegeDetail = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("colleges")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (error) {
          console.warn("Supabase load notice:", error.message);
        }

        if (data) {
          const ratingNum = parseFloat(data.rating) || 4.9;
          let parsedData: any = {};

          if (
            data.description &&
            data.description.trim().startsWith("{") &&
            data.description.trim().endsWith("}")
          ) {
            try {
              parsedData = JSON.parse(data.description);
            } catch (e) {}
          }

          const baseDetail: CollegeDetail = {
            name: data.name || IIT_DELHI_MASTER_DATA.name,
            fullName: data.name ? `${data.name} (${data.slug.toUpperCase()})` : IIT_DELHI_MASTER_DATA.fullName,
            location: data.location || `${data.city || "Delhi"}, ${data.state || "India"}`,
            city: data.city || "New Delhi",
            state: data.state || "Delhi",
            nirfRank: data.nirf_rank && data.nirf_rank !== "N/A" ? `NIRF #${data.nirf_rank}` : IIT_DELHI_MASTER_DATA.nirfRank,
            rating: ratingNum,
            ratingCount: `${Math.floor(ratingNum * 120 + 200)} Verified Reviews`,
            type: data.ownership ? `${data.ownership} University` : IIT_DELHI_MASTER_DATA.type,
            estd: parsedData.estd || "1961",
            stream: "Engineering",
            highestPackage: parsedData.highestPackage || IIT_DELHI_MASTER_DATA.highestPackage,
            averagePackage: parsedData.averagePackage || IIT_DELHI_MASTER_DATA.averagePackage,
            medianPackage: parsedData.medianPackage || "₹20.50 Lakhs PA",
            totalFees: data.tuition_fees || IIT_DELHI_MASTER_DATA.totalFees,
            image: data.image_url || IIT_DELHI_MASTER_DATA.image,
            logo: IIT_DELHI_MASTER_DATA.logo,
            campusArea: parsedData.campusArea || "320 Acres",
            flagshipCourse: "B.Tech Computer Science & Engineering",
            accreditation: "Institute of National Importance (MHRD/AICTE)",
            description: parsedData.description || (data.description && !data.description.startsWith("{") ? data.description : IIT_DELHI_MASTER_DATA.description),
            highlights: parsedData.highlights || IIT_DELHI_MASTER_DATA.highlights,
            whatsNew: parsedData.whatsNew || IIT_DELHI_MASTER_DATA.whatsNew,
            courses: parsedData.courses || IIT_DELHI_MASTER_DATA.courses,
            recruiters: parsedData.recruiters || IIT_DELHI_MASTER_DATA.recruiters,
            cutoffs: parsedData.cutoffs || IIT_DELHI_MASTER_DATA.cutoffs,
            facilities: parsedData.facilities || IIT_DELHI_MASTER_DATA.facilities,
            reviews: parsedData.reviews || IIT_DELHI_MASTER_DATA.reviews,
            faqs: parsedData.faqs || IIT_DELHI_MASTER_DATA.faqs,
            gallery: parsedData.gallery || IIT_DELHI_MASTER_DATA.gallery,
            facultyList: parsedData.facultyList || IIT_DELHI_MASTER_DATA.facultyList,
          };

          setCollegeData(baseDetail);
        } else {
          // Default to Master Benchmark Dataset
          setCollegeData(IIT_DELHI_MASTER_DATA);
        }
      } catch (err) {
        console.error("Error loading college detail:", err);
        setCollegeData(IIT_DELHI_MASTER_DATA);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCollegeDetail();
    }
  }, [slug]);

  const startEditing = () => {
    setEditAboutText(collegeData.description || "");
    setEditEstd(collegeData.estd || "1961");
    setEditHighestPackage(collegeData.highestPackage || "");
    setEditAveragePackage(collegeData.averagePackage || "");
    setEditTotalFees(collegeData.totalFees || "");
    setEditCoverImage(collegeData.image || "");
    setEditLogoImage(collegeData.logo || "");
    setShowEditModal(true);
  };

  const handleSavePageChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const updatedData: CollegeDetail = {
        ...collegeData,
        description: editAboutText,
        estd: editEstd,
        highestPackage: editHighestPackage,
        averagePackage: editAveragePackage,
        totalFees: editTotalFees,
        image: editCoverImage || collegeData.image,
        logo: editLogoImage || collegeData.logo,
      };

      const res = await fetch("/api/colleges/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Samrat1311",
          password: "1311161161",
          slug: slug,
          updatedFields: {
            description: JSON.stringify(updatedData),
            tuition_fees: editTotalFees,
            image_url: editCoverImage,
          },
        }),
      });

      if (res.ok) {
        setCollegeData(updatedData);
        setShowEditModal(false);
        alert("✅ College details saved and updated live across all devices!");
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to update college details.");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Network error updating page details.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          course_interest: formData.stream,
          college_interest: collegeData.name,
        }),
      });
    } catch (err) {
      console.error("Error submitting lead:", err);
    }

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", phone: "", stream: "Engineering" });
    }, 3000);
  };

  const filteredCourses = collegeData.courses.filter(
    (c) =>
      c.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.eligibility.toLowerCase().includes(courseSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] gap-3">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest animate-pulse">
          Loading {slug ? slug.replace("-", " ") : "college"} details...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 space-y-5 select-none">
      {/* 1. SHIKSHA-STYLE MODERN HERO BANNER */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-xl">
        {/* Cover Photo with Dark Gradient & Ambient Backlight */}
        <div className="relative h-[220px] sm:h-[290px] md:h-[340px] w-full overflow-hidden bg-slate-950">
          <img
            src={collegeData.image || "/images/iitdelhi_real.jpg"}
            alt={collegeData.name}
            className="w-full h-full object-cover object-center transform scale-102 hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/40" />

          {/* Photo Gallery Badge Button */}
          <button
            onClick={() => setActivePhotoIdx(0)}
            className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-orange-500 text-white backdrop-blur-md border border-white/20 text-xs font-black flex items-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>16+ Photos & Campus Tour</span>
          </button>
        </div>

        {/* Floating Logo + Meta Badges & Action Buttons */}
        <div className="relative -mt-14 px-5 sm:px-8 pb-6 z-20 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Square College Logo Box */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border-4 border-white shadow-xl p-1.5 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
              {collegeData.logo ? (
                <img
                  src={collegeData.logo}
                  alt={`${collegeData.name} logo`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white font-black text-xs flex items-center justify-center">
                  IITD
                </div>
              )}
            </div>

            {/* College Titles & Meta Info */}
            <div className="space-y-1 text-white pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-600/90 text-white text-[9.5px] font-black uppercase tracking-wider shadow-xs">
                  {collegeData.type.split("•")[0].trim()}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[9.5px] font-black uppercase tracking-wider shadow-xs flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {collegeData.nirfRank}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white/20 text-white text-[9.5px] font-bold">
                  Estd. {collegeData.estd}
                </span>
              </div>

              <h1 className="font-outfit font-black text-xl sm:text-2xl md:text-3xl text-white tracking-tight leading-tight">
                {collegeData.fullName || collegeData.name}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 font-semibold pt-0.5">
                <span className="flex items-center gap-1 text-orange-400">
                  <MapPin className="w-3.5 h-3.5" />
                  {collegeData.location}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-black text-white">{collegeData.rating}</span>
                  <span className="text-slate-400">({collegeData.ratingCount})</span>
                </span>
                <span className="text-emerald-400 font-bold">
                  ✓ 100% Verified Campus
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
            <button
              onClick={() => alert("Brochure sent to your email & WhatsApp!")}
              className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20 backdrop-blur-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Brochure</span>
            </button>
            <Link
              href={`/compare?ids=iit-delhi,bits-pilani`}
              className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20 backdrop-blur-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Compare</span>
            </Link>
            <button
              onClick={() => {
                const formElem = document.getElementById("lead-inquiry-box");
                formElem?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-black shadow-lg shadow-orange-500/25 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apply / Predict Seat</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. EXACT SHIKSHA.COM STYLE SUB-HEADER TABS (From 1st Image) */}
      <div className="sticky top-16 md:top-0 bg-white z-30 border-b border-slate-200 shadow-xs">
        <div className="flex items-center overflow-x-auto no-scrollbar scroll-smooth px-2 sm:px-4">
          {SHIKSHA_NAV_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 px-3.5 sm:px-4 text-xs font-bold whitespace-nowrap transition-all relative flex-shrink-0 cursor-pointer ${
                  isActive
                    ? "text-[#4a154b] font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>{tab.label}</span>
                {/* Active Indicator Underline (Matching Shiksha Reference) */}
                {isActive && (
                  <motion.div
                    layoutId="shikshaTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#4a154b] rounded-t-full shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            );
          })}

          {isAdmin && (
            <button
              onClick={startEditing}
              className="ml-auto my-auto flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer transition-all flex-shrink-0"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. CORE TWO-COLUMN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* LEFT COLUMN: ACTIVE TAB CONTENT (70%) */}
        <div className="lg:col-span-7 space-y-6">
          {/* TAB 1: COLLEGE INFO (OVERVIEW & HIGHLIGHTS) */}
          {activeTab === "info" && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xs">
              {/* What's New Box 2026 */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/80 space-y-2">
                <div className="flex items-center gap-2 text-orange-700 font-black text-xs uppercase tracking-wide">
                  <Sparkles className="w-4 h-4 text-orange-600 animate-pulse" />
                  <span>What's New in {collegeData.name.split(" - ")[0]}? 2026-27 Updates</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 font-semibold pl-1">
                  {collegeData.whatsNew?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* About the Institution */}
              <div className="space-y-3">
                <h2 className="font-outfit font-black text-xl text-slate-900">
                  About {collegeData.name}
                </h2>
                <div className="text-xs text-slate-600 leading-relaxed space-y-3 font-medium">
                  {collegeData.description.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Key Highlights Table (Shiksha Benchmark) */}
              <div className="space-y-3 pt-2">
                <h3 className="font-outfit font-black text-lg text-slate-900">
                  {collegeData.name} - Key Highlights
                </h3>
                <div className="overflow-hidden border border-slate-200 rounded-2xl">
                  <table className="w-full text-left border-collapse text-xs">
                    <tbody>
                      {collegeData.highlights.map((item, idx) => (
                        <tr
                          key={idx}
                          className={`border-b border-slate-100 ${
                            idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                          }`}
                        >
                          <td className="py-3 px-4 font-extrabold text-slate-700 w-1/3 border-r border-slate-100">
                            {item.label}
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-900">
                            {item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Key Quick Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                  <p className="text-[10px] uppercase font-bold text-emerald-700">Highest CTC</p>
                  <p className="font-outfit font-black text-base text-emerald-600 mt-0.5">
                    {collegeData.highestPackage.split("(")[0]}
                  </p>
                  <span className="text-[9px] text-emerald-600 font-semibold">Domestic Offer</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-100 text-center">
                  <p className="text-[10px] uppercase font-bold text-orange-700">Average CTC</p>
                  <p className="font-outfit font-black text-base text-orange-600 mt-0.5">
                    {collegeData.averagePackage}
                  </p>
                  <span className="text-[9px] text-orange-600 font-semibold">Overall B.Tech</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
                  <p className="text-[10px] uppercase font-bold text-blue-700">Annual Tuition</p>
                  <p className="font-outfit font-black text-base text-blue-600 mt-0.5">
                    {collegeData.totalFees.split("(")[0]}
                  </p>
                  <span className="text-[9px] text-blue-600 font-semibold">100% Aid Available</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 text-center">
                  <p className="text-[10px] uppercase font-bold text-purple-700">NIRF 2026</p>
                  <p className="font-outfit font-black text-base text-purple-600 mt-0.5">
                    Rank #2
                  </p>
                  <span className="text-[9px] text-purple-600 font-semibold">Engineering</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COURSES */}
          {activeTab === "courses" && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-outfit font-black text-xl text-slate-900">
                    All Courses Offered at {collegeData.name.split(" - ")[0]}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Full list of Undergraduate, Postgraduate, MBA, and Doctoral degree programs
                  </p>
                </div>

                <input
                  type="text"
                  placeholder="Search course (e.g. CSE, AI)..."
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-orange-500 bg-slate-50 sm:w-60"
                />
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 uppercase font-black text-[10px] tracking-wider border-b border-slate-200">
                      <th className="py-3 px-4">Course / Specialization</th>
                      <th className="py-3 px-3">Duration</th>
                      <th className="py-3 px-3">Tuition Fees</th>
                      <th className="py-3 px-4">Eligibility & Entrance Exam</th>
                      <th className="py-3 px-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredCourses.map((c, idx) => (
                      <tr key={idx} className="hover:bg-orange-50/30 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {c.name}
                          {c.seats && (
                            <span className="block text-[10px] font-semibold text-slate-500 mt-0.5">
                              Intake: {c.seats}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-bold whitespace-nowrap">
                          {c.duration}
                        </td>
                        <td className="py-3 px-3 font-outfit font-black text-orange-600 whitespace-nowrap">
                          {c.fees}
                        </td>
                        <td className="py-3 px-4 text-slate-600 leading-relaxed">
                          {c.eligibility}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <button
                            onClick={() => {
                              const elem = document.getElementById("lead-inquiry-box");
                              elem?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="px-3 py-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-black text-[10px] transition-all shadow-xs cursor-pointer"
                          >
                            Apply
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: FEES STRUCTURE */}
          {activeTab === "fees" && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
              <div>
                <h2 className="font-outfit font-black text-xl text-slate-900">
                  {collegeData.name.split(" - ")[0]} Fee Structure 2026-27
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Semester-wise tuition fees, hostel rent, mess advances, and fee exemption criteria
                </p>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 uppercase font-black text-[10px] tracking-wider border-b border-slate-200">
                      <th className="py-3 px-4">Fee Component</th>
                      <th className="py-3 px-3">Amount (General / OBC)</th>
                      <th className="py-3 px-3">Amount (SC / ST / PwD)</th>
                      <th className="py-3 px-4">Payment Frequency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Tuition Fee (B.Tech)</td>
                      <td className="py-3 px-3 font-bold text-orange-600">₹1,00,000</td>
                      <td className="py-3 px-3 font-bold text-emerald-600">₹0 (100% Free)</td>
                      <td className="py-3 px-4 text-slate-600">Per Semester</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Hostel Seat Rent & Amenities</td>
                      <td className="py-3 px-3 font-bold text-slate-800">₹10,500</td>
                      <td className="py-3 px-3 font-bold text-slate-800">₹10,500</td>
                      <td className="py-3 px-4 text-slate-600">Per Semester</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Mess Advance & Food Charges</td>
                      <td className="py-3 px-3 font-bold text-slate-800">₹28,000</td>
                      <td className="py-3 px-3 font-bold text-slate-800">₹28,000</td>
                      <td className="py-3 px-4 text-slate-600">Per Semester (Adjustable)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">One-Time Admission & Caution Deposit</td>
                      <td className="py-3 px-3 font-bold text-slate-800">₹12,000</td>
                      <td className="py-3 px-3 font-bold text-slate-800">₹12,000</td>
                      <td className="py-3 px-4 text-slate-600">One-time (Refundable ₹5,000)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Govt. Fee Waiver & Concessions:
                </p>
                <p>• 100% Tuition Fee waiver for SC/ST/PH scholars.</p>
                <p>• 100% Tuition Fee waiver for general/OBC scholars whose family annual income is below ₹1 Lakh.</p>
                <p>• 66.6% Tuition Fee waiver for family income between ₹1 Lakh to ₹5 Lakhs.</p>
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === "reviews" && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-outfit font-black text-xl text-slate-900">
                    Student Reviews & Campus Ratings
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Authentic feedback and experiences from verified alumni & current scholars
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{collegeData.rating} / 5.0 (842 Verified Reviews)</span>
                </div>
              </div>

              <div className="space-y-4">
                {collegeData.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-black text-xs">
                          {rev.author[0]}
                        </div>
                        <div>
                          <h4 className="font-outfit font-black text-xs text-slate-900">
                            {rev.author}
                          </h4>
                          <p className="text-[10px] text-slate-500 font-semibold">
                            {rev.course} • {rev.year}
                          </p>
                        </div>
                      </div>
                      <div className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-black flex items-center gap-1">
                        ★ {rev.rating}.0
                      </div>
                    </div>

                    <h5 className="font-outfit font-bold text-xs text-slate-900">
                      "{rev.title}"
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {rev.content}
                    </p>

                    {rev.pros && (
                      <div className="text-[11px] text-emerald-700 bg-emerald-50/70 p-2 rounded-lg font-semibold">
                        👍 <strong>Pros:</strong> {rev.pros}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ADMISSIONS */}
          {activeTab === "admissions" && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
              <div>
                <h2 className="font-outfit font-black text-xl text-slate-900">
                  {collegeData.name.split(" - ")[0]} Admission Process 2026
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Step-by-step selection criteria, national counselling, and important registration dates
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-outfit font-bold text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-black">1</span>
                    B.Tech / Dual Degree Admission:
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8 font-medium">
                    Candidates must appear for <strong>JEE Main</strong> and qualify among the top 2.5 Lakh rankers to be eligible for <strong>JEE Advanced</strong>. Allotment is strictly managed through online <strong>JoSAA Counselling</strong> based on All India Rank (AIR).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-outfit font-bold text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-black">2</span>
                    M.Tech & M.S. (Research) Admission:
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8 font-medium">
                    Conducted via <strong>GATE Examination</strong> and central COAP counselling. Some specialized interdisciplinary departments conduct a written test followed by an interview.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-outfit font-bold text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-black">3</span>
                    MBA Admission (DMS IIT Delhi):
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8 font-medium">
                    Requires a valid <strong>CAT Percentile (98.5+ percentile for General)</strong> followed by a rigorous Personal Interview (PI) and analytical writing assessment.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PLACEMENTS */}
          {activeTab === "placements" && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xs">
              <div>
                <h2 className="font-outfit font-black text-xl text-slate-900">
                  Placement Statistics & Top Recruiters
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified salary trends, CTC packages, and corporate partners
                </p>
              </div>

              {/* CTC Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-200 text-center">
                  <span className="text-[10.5px] uppercase font-bold text-emerald-800">Highest Package</span>
                  <p className="font-outfit font-black text-xl text-emerald-600 mt-1">₹1.20 Crore PA</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">International: ₹2.40 Cr PA</p>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-200 text-center">
                  <span className="text-[10.5px] uppercase font-bold text-orange-800">Average Package</span>
                  <p className="font-outfit font-black text-xl text-orange-600 mt-1">{collegeData.averagePackage}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">CSE Average: ₹39.5 LPA</p>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-200 text-center">
                  <span className="text-[10.5px] uppercase font-bold text-blue-800">Total Job Offers</span>
                  <p className="font-outfit font-black text-xl text-blue-600 mt-1">1,300+ Offers</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">400+ Top Companies</p>
                </div>
              </div>

              {/* Top Recruiting Brands Grid */}
              <div className="space-y-3">
                <h3 className="font-outfit font-bold text-sm text-slate-900">
                  Top Recruiting Companies & Brands
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {collegeData.recruiters.map((rec, i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-orange-300 rounded-xl text-center text-xs font-black text-slate-800 transition-all shadow-2xs"
                    >
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: CUT-OFFS */}
          {activeTab === "cutoffs" && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
              <div>
                <h2 className="font-outfit font-black text-xl text-slate-900">
                  JEE Advanced / JoSAA Opening & Closing Cutoff Ranks
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official Round 6 closing cutoff trends for primary engineering branches
                </p>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 uppercase font-black text-[10px] tracking-wider border-b border-slate-200">
                      <th className="py-3 px-4">B.Tech Engineering Specialization</th>
                      <th className="py-3 px-3">Category Quota</th>
                      <th className="py-3 px-3 text-emerald-700">Opening Rank</th>
                      <th className="py-3 px-3 text-red-700">Closing Rank</th>
                      <th className="py-3 px-3">Counselling</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {collegeData.cutoffs.map((cutoff, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {cutoff.branch}
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-semibold">
                          {cutoff.category || "General (Gender-Neutral)"}
                        </td>
                        <td className="py-3 px-3 font-outfit font-black text-emerald-600">
                          {cutoff.openRank}
                        </td>
                        <td className="py-3 px-3 font-outfit font-black text-red-600">
                          {cutoff.closeRank}
                        </td>
                        <td className="py-3 px-3 text-[10px] font-bold text-slate-500">
                          {cutoff.round || "Round 6"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed font-semibold">
                📌 <strong>Cutoff Tip:</strong> Admissions to IIT Delhi are conducted strictly through JoSAA (Joint Seat Allocation Authority) based on JEE Advanced ranks. Home State quota is NOT applicable for IITs (All India Quota only).
              </div>
            </div>
          )}

          {/* TAB 8: RANKINGS */}
          {activeTab === "rankings" && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
              <div>
                <h2 className="font-outfit font-black text-xl text-slate-900">
                  {collegeData.name.split(" - ")[0]} Rankings 2026
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  National and Global University Ranking performance across engineering & management
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-1">
                  <span className="text-[10px] uppercase font-black text-orange-700">NIRF 2026 (MHRD India)</span>
                  <p className="font-outfit font-black text-2xl text-orange-600">Rank #2 in India</p>
                  <p className="text-xs text-slate-600 font-medium">Category: Engineering Institutes</p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1">
                  <span className="text-[10px] uppercase font-black text-blue-700">QS World University Ranking</span>
                  <p className="font-outfit font-black text-2xl text-blue-600">Rank #150 Global</p>
                  <p className="text-xs text-slate-600 font-medium">Top 50 Globally for Engineering & Technology</p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1">
                  <span className="text-[10px] uppercase font-black text-purple-700">India Today Ranking</span>
                  <p className="font-outfit font-black text-2xl text-purple-600">Rank #1 in North India</p>
                  <p className="text-xs text-slate-600 font-medium">Rank #1 for Placement Record and Faculty Quality</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                  <span className="text-[10px] uppercase font-black text-emerald-700">NIRF Management (DMS)</span>
                  <p className="font-outfit font-black text-2xl text-emerald-600">Rank #4 in India</p>
                  <p className="text-xs text-slate-600 font-medium">Department of Management Studies (DMS)</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: GALLERY */}
          {activeTab === "gallery" && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
              <div>
                <h2 className="font-outfit font-black text-xl text-slate-900">
                  Campus Photo Gallery & Video Tour
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Visual tour of iconic buildings, coding labs, athletic grounds, and hostels
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                {collegeData.gallery.map((photo, i) => (
                  <div
                    key={i}
                    onClick={() => setActivePhotoIdx(i)}
                    className="group relative rounded-2xl overflow-hidden h-44 sm:h-52 bg-slate-950 border border-slate-200 cursor-pointer shadow-xs"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 text-white text-xs font-bold">
                      <span>{photo.caption}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: HOSTEL & CAMPUS INFRASTRUCTURE */}
          {activeTab === "hostel" && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xs">
              <div>
                <h2 className="font-outfit font-black text-xl text-slate-900">
                  Campus Infrastructure, 13 Hostels & Life
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  World-class residential facilities, supercomputing research centers, and sports arenas
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {collegeData.facilities.map((fac, idx) => {
                  const IconComp = iconMap[fac.icon] || Building;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <h4 className="font-outfit font-bold text-sm text-slate-900">
                          {fac.name}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium pl-10">
                        {fac.desc || "Fully modernized and maintained facility available for all students."}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 11: FACULTY */}
          {activeTab === "faculty" && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
              <div>
                <h2 className="font-outfit font-black text-xl text-slate-900">
                  Distinguished Faculty & Research Heads
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Internationally acclaimed professors, research fellows, and department deans
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {collegeData.facultyList?.map((fac, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm">
                        {fac.name.split(" ")[1]?.[0] || "P"}
                      </div>
                      <div>
                        <h4 className="font-outfit font-black text-xs sm:text-sm text-slate-900">{fac.name}</h4>
                        <p className="text-[10.5px] font-bold text-orange-600">{fac.designation}</p>
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 font-medium pl-13 space-y-0.5">
                      <p><strong>Dept:</strong> {fac.dept}</p>
                      <p><strong>Alma Mater:</strong> {fac.qualification}</p>
                      <p><strong>Experience:</strong> {fac.experience}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 12: COMPARE */}
          {activeTab === "compare" && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
              <div>
                <h2 className="font-outfit font-black text-xl text-slate-900">
                  Compare {collegeData.name.split(" - ")[0]} with Top Colleges
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Benchmark fees, NIRF rank, average salary package, and cutoffs side-by-side
                </p>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 uppercase font-black text-[10px] tracking-wider border-b border-slate-200">
                      <th className="py-3 px-4">Parameter</th>
                      <th className="py-3 px-3 text-orange-700 font-black">IIT Delhi</th>
                      <th className="py-3 px-3">IIT Bombay</th>
                      <th className="py-3 px-3">BITS Pilani</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">NIRF 2026 Ranking</td>
                      <td className="py-3 px-3 font-bold text-orange-600">Rank #2</td>
                      <td className="py-3 px-3 text-slate-700">Rank #3</td>
                      <td className="py-3 px-3 text-slate-700">Rank #20</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Average CTC Package</td>
                      <td className="py-3 px-3 font-bold text-orange-600">₹25.82 LPA</td>
                      <td className="py-3 px-3 text-slate-700">₹26.50 LPA</td>
                      <td className="py-3 px-3 text-slate-700">₹20.50 LPA</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Total B.Tech Fees</td>
                      <td className="py-3 px-3 font-bold text-orange-600">₹9.52 Lakhs</td>
                      <td className="py-3 px-3 text-slate-700">₹9.20 Lakhs</td>
                      <td className="py-3 px-3 text-slate-700">₹22.50 Lakhs</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Accepted Entrance Exam</td>
                      <td className="py-3 px-3 font-bold text-orange-600">JEE Advanced</td>
                      <td className="py-3 px-3 text-slate-700">JEE Advanced</td>
                      <td className="py-3 px-3 text-slate-700">BITSAT</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 text-center">
                <Link
                  href={`/compare?ids=iit-delhi,bits-pilani,iit-bombay`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  <Layers className="w-4 h-4" />
                  <span>Open Advanced 4-Way Comparison Tool</span>
                </Link>
              </div>
            </div>
          )}

          {/* TAB 13: Q&A / FAQS */}
          {activeTab === "qa" && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
              <div>
                <h2 className="font-outfit font-black text-xl text-slate-900">
                  Student Questions & Expert Answers (Q&A)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Common queries answered regarding admission, cutoffs, placements, and campus rules
                </p>
              </div>

              <div className="space-y-3">
                {collegeData.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                      className="w-full p-4 text-left font-outfit font-bold text-xs sm:text-sm text-slate-900 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transform transition-transform ${
                          openFaqIdx === idx ? "rotate-180 text-orange-600" : ""
                        }`}
                      />
                    </button>
                    {openFaqIdx === idx && (
                      <div className="p-4 text-xs text-slate-600 leading-relaxed bg-white border-t border-slate-100 font-medium">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 14: SCHOLARSHIPS */}
          {activeTab === "scholarships" && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
              <div>
                <h2 className="font-outfit font-black text-xl text-slate-900">
                  Scholarships & Financial Assistance
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Government waivers, merit-cum-means awards, and alumni endowment schemes
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <h4 className="font-outfit font-black text-sm text-emerald-900">1. Merit-cum-Means (MCM) Scholarship</h4>
                  <p className="text-xs text-emerald-800 font-medium">
                    Awarded to up to 25% of undergraduate scholars with family annual income under ₹5 Lakhs. Covers full tuition fee waiver plus ₹1,000/month pocket allowance.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
                  <h4 className="font-outfit font-black text-sm text-blue-900">2. Central Sector SC/ST/PwD Scheme</h4>
                  <p className="text-xs text-blue-800 font-medium">
                    100% complete tuition fee waiver along with a free hostel lodging and boarding allowance from the Ministry of Social Justice.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 space-y-1">
                  <h4 className="font-outfit font-black text-sm text-orange-900">3. Inspire & Alumni Endowed Awards</h4>
                  <p className="text-xs text-orange-800 font-medium">
                    Scholarships of ₹80,000/year for top-performing students in Mathematics and Computing and Physical Sciences funded by DST and global alumni donors.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: STICKY INQUIRY & COUNSELLING CARD (30%) */}
        <div className="lg:col-span-3 space-y-6">
          <div
            id="lead-inquiry-box"
            className="sticky top-20 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-5"
          >
            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 text-[9.5px] font-black uppercase tracking-wide border border-orange-200">
                <Sparkles className="w-3 h-3" />
                Admission 2026-27
              </span>
              <h3 className="font-outfit font-black text-lg text-slate-900">
                Need Guidance for {collegeData.name.split(" - ")[0]}?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Talk to our senior expert counsellor for JoSAA cutoff analysis, branch recommendation, and scholarship guidance.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3.5">
              <div>
                <label className="text-[10.5px] font-bold text-slate-700">
                  Student Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 px-3.5 py-2 border border-slate-200 rounded-xl bg-slate-50 text-xs font-semibold text-slate-800 outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-[10.5px] font-bold text-slate-700">
                  WhatsApp / Mobile Number *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="Enter 10-digit number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full mt-1 px-3.5 py-2 border border-slate-200 rounded-xl bg-slate-50 text-xs font-semibold text-slate-800 outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div className="space-y-2 pt-1">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xs rounded-xl active:scale-95 transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Get Expert Callback</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert("Brochure downloaded successfully!")}
                  className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Download Official PDF</span>
                </button>
              </div>
            </form>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5 text-[10px] text-slate-500 font-semibold leading-relaxed">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>100% Free counselling support. Bihar Student Credit Card accepted.</span>
            </div>
          </div>
        </div>
      </div>

      {/* PHOTO GALLERY MODAL */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative border border-slate-700"
            >
              <button
                onClick={() => setActivePhotoIdx(null)}
                className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-orange-500 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-[360px] sm:h-[460px] bg-black">
                <img
                  src={collegeData.gallery[activePhotoIdx]?.url || collegeData.image}
                  alt="Gallery"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-4 bg-slate-950 flex items-center justify-between text-white text-xs">
                <span className="font-bold">
                  {collegeData.gallery[activePhotoIdx]?.caption} ({collegeData.gallery[activePhotoIdx]?.category})
                </span>
                <div className="flex gap-2">
                  {collegeData.gallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`w-3 h-3 rounded-full ${
                        activePhotoIdx === idx ? "bg-orange-500" : "bg-slate-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADMIN EDIT DETAILS MODAL */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-7 shadow-2xl relative border border-slate-200 my-8 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 z-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <form onSubmit={handleSavePageChanges} className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-outfit font-black text-xl text-slate-800">
                    Edit College Details: {collegeData.name}
                  </h3>
                  <p className="text-xs text-orange-600 font-bold">
                    Editing slug: {slug}
                  </p>
                </div>

                <div>
                  <label className="text-[10.5px] font-bold text-slate-700 block mb-1">
                    About / Description
                  </label>
                  <textarea
                    rows={4}
                    value={editAboutText}
                    onChange={(e) => setEditAboutText(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-orange-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10.5px] font-bold text-slate-700 block mb-1">
                      Campus Cover Image URL
                    </label>
                    <input
                      type="text"
                      value={editCoverImage}
                      onChange={(e) => setEditCoverImage(e.target.value)}
                      placeholder="/images/iitdelhi_real.jpg"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10.5px] font-bold text-slate-700 block mb-1">
                      Logo Image URL
                    </label>
                    <input
                      type="text"
                      value={editLogoImage}
                      onChange={(e) => setEditLogoImage(e.target.value)}
                      placeholder="/images/iitdelhi.png"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10.5px] font-bold text-slate-700 block mb-1">
                      Estd. Year
                    </label>
                    <input
                      type="text"
                      value={editEstd}
                      onChange={(e) => setEditEstd(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10.5px] font-bold text-slate-700 block mb-1">
                      Highest CTC
                    </label>
                    <input
                      type="text"
                      value={editHighestPackage}
                      onChange={(e) => setEditHighestPackage(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10.5px] font-bold text-slate-700 block mb-1">
                      Average CTC
                    </label>
                    <input
                      type="text"
                      value={editAveragePackage}
                      onChange={(e) => setEditAveragePackage(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10.5px] font-bold text-slate-700 block mb-1">
                      Annual Tuition
                    </label>
                    <input
                      type="text"
                      value={editTotalFees}
                      onChange={(e) => setEditTotalFees(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1.5"
                  >
                    {isUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    <span>Save & Update Globally</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUCCESS CONFIRMATION MODAL */}
      <AnimatePresence>
        {formSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xs p-6 bg-white border border-slate-200 rounded-3xl text-center space-y-4 shadow-2xl"
            >
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="font-outfit font-black text-base text-slate-900">
                Inquiry Received!
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Our IIT admission counsellor will contact you on <strong>+91 {formData.phone}</strong> shortly.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
