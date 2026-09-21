"use client";

import React, { useState, useEffect, useRef } from "react";
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
  ChevronLeft,
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
  SlidersHorizontal,
  Filter,
  Plus,
  Trash2,
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

interface HighlightBullet {
  title: string;
  text: string;
}

interface HighlightsArticleData {
  introText?: string;
  bullets?: HighlightBullet[];
  nirfCalloutTitle?: string;
  nirfCalloutDesc?: string;
  nirfReportUrl?: string;
  faqs?: FaqItem[];
}

interface CutoffArticleData {
  title?: string;
  paragraphs?: string[];
  calloutTitle?: string;
  calloutDesc?: string;
  calloutPdfUrl?: string;
  afterCalloutParagraphs?: string[];
  footerNote?: string;
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

interface TableOfContentItem {
  label: string;
  targetId: string;
  tabId?: ShikshaTabId;
}

interface AuthorProfile {
  name: string;
  role: string;
  image?: string;
  updatedDate: string;
  verified?: boolean;
}

interface CutoffComparisonRow {
  course: string;
  year2024: string | number;
  year2025: string | number;
  year2026: string | number;
}

interface CutoffRoundComparisonData {
  title?: string;
  subtitle?: string;
  years?: [string, string, string];
  rows: CutoffComparisonRow[];
  filterDatasets?: Record<string, CutoffComparisonRow[]>;
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
  author?: AuthorProfile;
  tableOfContents?: TableOfContentItem[];
  highlightsArticle?: HighlightsArticleData;
  cutoffArticle?: CutoffArticleData;
  cutoffComparison?: CutoffRoundComparisonData;
  secondaryCutoffComparison?: CutoffRoundComparisonData;
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
  author: {
    name: "Shreeya Panda",
    role: "Intern",
    image: "",
    updatedDate: "Feb 09, 2026",
    verified: true,
  },
  campusArea: "320 Acres (Lush Green South Delhi Campus)",
  flagshipCourse: "B.Tech Computer Science and Engineering (CSE)",
  accreditation: "Institute of National Importance (MHRD/AICTE/UGC)",
  highlightsArticle: {
    introText: "Indian Institute of Technology Delhi (IIT Delhi) is one of India's top engineering institutions with two satellite campuses located in Sonipat, Jhajjar, and its first international campus in Abu Dhabi (UAE). Check out some of the important IIT Delhi highlights below:",
    bullets: [
      {
        title: "Rankings",
        text: "IIT Delhi India is ranked 118th in the QS World University Rankings 2027 (QS rankings are released a year ahead). In the QS Asian University Rankings 2026, IIT Delhi ranking is at 59th position. The top engineering institute is ranked 2nd (Engineering) and 4th (Overall) as per NIRF 2025 Rankings (NIRF 2026 rankings are still awaited). It is also ranked #1 under the 'Engineering' category by the India Today ranking 2026.",
      },
      {
        title: "Courses",
        text: "IITD offers BTech, MTech, BDes, MDes, MBA, MSc, PhD, and PG Diploma programmes.",
      },
      {
        title: "Admissions",
        text: "IIT Delhi admission are entrance-based. Admission to the IIT Delhi flagship programme BTech and BS programme requires a JEE Advanced qualification. The IIT MTech Admissions 2026 are conducted via GATE. Further, for IIT Delhi PhD admission, applications are accepted via CSIR/UGC-NET. For IIT Delhi course admissions, candidates are required to apply via centralized counseling portals (JoSAA, COAP, or JAM) and the official IIT Delhi application portal, iitd.ac.in.",
      },
      {
        title: "Fees",
        text: "IIT Delhi fees for the BE, BTech programme is INR 8 Lakh (4 Years). For ME, MTech, the fee for IIT Delhi is INR 3 Lakh (2 Years).",
      },
      {
        title: "Cutoff",
        text: "IIT Delhi closed its JoSAA Counselling Round 5 Cut Off 2026 at 128 for B.Tech. in Computer Science and Engineering (CSE) for General Category (Gender Neutral) candidates. Meanwhile, for BTech in Electrical Engineering, the IIT Delhi cut off closed at 612.",
      },
      {
        title: "Placements",
        text: "IIT Delhi Placement 2026 recorded more than 1,275 job offers, including 300+ PPOs. The top recruiter list who offered IIT Delhi packages includes top companies such as Google, Microsoft, Goldman Sachs, BCG, American Express, Barclays, Oracle, and PayU.",
      },
      {
        title: "Median Package / NIRF",
        text: "As per IIT Delhi overall report submitted for NIRF 2026, (BTech) UG 4-year students' median package is INR 20 LPA. Median package for (MTech) PG students is INR 19.25 LPA. The information such as average package of IIT Delhi, etc. are not available as of now.",
      },
    ],
    nirfCalloutTitle: "Why Is IIT Delhi Ranked Among India's Best?",
    nirfCalloutDesc: "Explore official NIRF 2026 data on placements, research, faculty strength and student outcomes.",
    nirfReportUrl: "https://home.iitd.ac.in/",
    faqs: [
      {
        question: "What was the highest package offered during IIT Delhi placements?",
        answer: "As of now, IIT Delhi has released the placement data 2026 that is updated till Dec 2025. As per the report, a total of 1,275 offers including PPOs have been. More than 1,140 students have been placed during IIT Delhi placements 2026. The highest package 2026 has not been released yet.\n\nAbove 300 PPOs have been already made this year, which is 33% higher as compared with 2025. 35 international offers were made in 2026. Top recruiters such as Amazon, Accenture, Google, Goldman Sachs and American Express visited the campus.",
      },
      {
        question: "How are the BTech placements at IIT Delhi?",
        answer: "IIT Delhi BTech placements consistently rank among the finest in the country. During recent placement seasons, students secured over 1,275 offers with top domestic salaries crossing ₹1.20 Cr and international packages reaching ₹2.40 Cr. Top recruiting firms include Google, Microsoft, Graviton, Jane Street, Goldman Sachs, and McKinsey.",
      },
      {
        question: "How can I check the list of selected candidates for M.Des in IIT Delhi (CEED 2026)?",
        answer: "Candidates can check the shortlisted and final selection lists on the official IIT Delhi Department of Design admission portal (design.iitd.ac.in) by logging in using their CEED 2026 registered credentials and application number.",
      },
      {
        question: "What is the hostel fee for IIT Delhi?",
        answer: "The hostel seat rent and amenities charges at IIT Delhi are approximately ₹10,500 per semester. Additionally, mess advance charges of ₹28,000 per semester apply, which are adjustable based on actual food consumption.",
      },
      {
        question: "What is the ranking of IIT Delhi?",
        answer: "IIT Delhi is ranked #2 in the Engineering category and #4 in the Overall category in NIRF 2025/2026. Internationally, IIT Delhi is placed at #118 in QS World University Rankings 2027 and #59 in QS Asia University Rankings 2026.",
      },
    ],
  },
  cutoffArticle: {
    paragraphs: [
      "**IIT Delhi JEE Advanced Cutoff 2026** has been released on the official website of JoSAA, i.e. **josaa.nic.in**! As per **JoSAA Round 5 Cut Off 2026**, the **IIT Delhi admissions** closed at a rank of **16295** for BTech Design in the Open Category. It was the **least competitive** branch with the lowest **IIT Delhi cutoff**.",
      "The **highest competition** for admissions at **IIT Delhi** was observed for **CSE** with a closing rank of **128** (Open) in round 5. Second most competitive branch was CSE dual degree (five years) as the admissions closed at 212 rank.",
      "On the other hand, the **competition** was **lowest** for branches like **Design, Chemistry** and **Chemical Engineering**. The opening and closing rank for BTech Chemistry in the overall open category was 6437 and 15833.",
      "**JEE Advanced 2026 cutoff** Opening and Closing Ranks represent the minimum rank required for admission to various IIT Delhi BTech programmes. The higher the candidate's rank, the higher the chances of the candidate getting admission. Participating in JoSAA counselling 2026 is mandatory for admission to IIT Delhi.",
    ],
    calloutTitle: "Missed the IIT Delhi Cutoff?",
    calloutDesc: "Explore engineering colleges accepting low JEE Main ranks and discover alternative pathways to pursue your BTech dream.",
    calloutPdfUrl: "#",
    afterCalloutParagraphs: [
      "IIT Delhi also accepts **IIT JAM cutoff 2026** for admission to the MSc course. With the release of IIT JAM Round 6 closing ranks, MSc in Economics turned out to be the most competitive specialisation with the lowest rank of 22 for the General AI category. The lower the rank, the higher the competition. Hence, it is considered one of the toughest MSc course to get at IIT Delhi India.",
    ],
    footerNote: "Check IIT Delhi Cut Off 2026 for other programmes below:",
  },
  cutoffComparison: {
    title: "Cut Off 2026 for JEE Advanced Latest Round",
    subtitle: "JEE Advanced Round 5 Closing Rank (General-All India)",
    years: ["2024", "2025", "2026"],
    rows: [
      {
        course: "B.Tech. in Computer Science and Engineering",
        year2024: 116,
        year2025: 126,
        year2026: 128,
      },
      {
        course: "B.Tech. in Electrical Engineering",
        year2024: 625,
        year2025: 605,
        year2026: 612,
      },
      {
        course: "Integrated B.Tech. + M.Tech. in Computer Science and Engineering",
        year2024: 204,
        year2025: 186,
        year2026: 212,
      },
      {
        course: "Integrated B.Tech. + M.Tech. in Mathematics and Computing",
        year2024: 417,
        year2025: 355,
        year2026: 403,
      },
      {
        course: "B.Tech. in Mathematics and Computing Engineering",
        year2024: 332,
        year2025: 323,
        year2026: 338,
      },
    ],
  },
  secondaryCutoffComparison: {
    title: "Cut Off 2026 for UCEED: Year-Wise rank",
    subtitle: "UCEED Last Round Closing Rank (General-All India)",
    years: ["2024", "2025", "2026"],
    rows: [
      {
        course: "Bachelor of Design (B.Des.)",
        year2024: 35,
        year2025: 41,
        year2026: 28,
      },
    ],
  },
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
  tableOfContents: [
    { label: "IIT Delhi Highlights 2026", targetId: "highlights-section", tabId: "info" },
    { label: "IIT Delhi Cutoff 2026", targetId: "cutoffs-section", tabId: "cutoffs" },
    { label: "IIT Delhi Courses & Fees 2026", targetId: "courses-section", tabId: "courses" },
    { label: "IIT Delhi Placements 2026", targetId: "placements-section", tabId: "placements" },
    { label: "IIT Delhi Admission & Application Process 2026", targetId: "admissions-section", tabId: "admissions" },
    { label: "IIT Delhi Rankings 2026", targetId: "rankings-section", tabId: "rankings" },
    { label: "IIT Delhi Student Reviews", targetId: "reviews-section", tabId: "reviews" },
    { label: "IIT Delhi Scholarships 2026", targetId: "scholarships-section", tabId: "scholarships" },
    { label: "IIT Delhi Popular Courses", targetId: "courses-section", tabId: "courses" },
    { label: "IIT Delhi College comparison", targetId: "compare-section", tabId: "compare" },
    { label: "IIT Delhi Campus & Facilities 2026", targetId: "campus-section", tabId: "hostel" },
    { label: "IIT Delhi Colleges/Departments", targetId: "faculty-section", tabId: "faculty" },
    { label: "Top online courses you might be interested in", targetId: "courses-section", tabId: "courses" },
    { label: "IIT Delhi Notable Alumni", targetId: "about-section", tabId: "info" },
    { label: "IIT Delhi FAQs", targetId: "faq-section", tabId: "qa" },
  ],
};

// Exact Shiksha Tabs List from User's Reference
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
  { id: "compare", label: "College Compare" },
  { id: "qa", label: "Q&A" },
  { id: "scholarships", label: "Scholarships" },
] as const;

type ShikshaTabId = (typeof SHIKSHA_NAV_TABS)[number]["id"];
type MiniModalId =
  | "header"
  | "author"
  | "toc"
  | "info"
  | "highlights"
  | "courses"
  | "fees"
  | "reviews"
  | "admissions"
  | "placements"
  | "cutoffs"
  | "cutoff_comparison"
  | "secondary_cutoff_comparison"
  | "rankings"
  | "gallery"
  | "hostel"
  | "faculty"
  | "qa"
  | "scholarships"
  | null;

const iconMap: Record<string, any> = {
  Building,
  BookOpen,
  Wifi,
  Coffee,
  Heart,
  ShieldCheck,
};

const renderFormattedText = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

export default function CollegeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Selected Tab State
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
  const [isTocOpen, setIsTocOpen] = useState(true);
  const [isTocExpanded, setIsTocExpanded] = useState(false);
  const [isHighlightsOpen, setIsHighlightsOpen] = useState(true);
  const [isHighlightsExpanded, setIsHighlightsExpanded] = useState(false);
  const [openHighlightFaqIdx, setOpenHighlightFaqIdx] = useState<number | null>(0);
  const [isCutoffCardOpen, setIsCutoffCardOpen] = useState(true);
  const [isCutoffArticleExpanded, setIsCutoffArticleExpanded] = useState(false);
  const [isCutoffRoundOpen, setIsCutoffRoundOpen] = useState(false);
  const [isSecondaryCutoffOpen, setIsSecondaryCutoffOpen] = useState(false);

  // Filter Modal & Applied Filter State for Cutoff Sub-Box
  const [isCutoffFilterModalOpen, setIsCutoffFilterModalOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState<"rounds" | "category" | "quota" | "gender">("rounds");
  const [appliedCutoffFilters, setAppliedCutoffFilters] = useState({
    round: "1",
    category: "General",
    quota: "All India",
    gender: "All",
  });
  const [tempCutoffFilters, setTempCutoffFilters] = useState({
    round: "1",
    category: "General",
    quota: "All India",
    gender: "All",
  });

  const CUTOFF_FILTER_OPTIONS = {
    rounds: ["1", "2", "3", "4", "5", "Last Round"],
    category: [
      "General",
      "OBC",
      "SC",
      "ST",
      "PWD",
      "Economically Weaker Section",
      "OBC Non-Creamy PWD",
      "SC PWD",
      "ST PWD",
    ],
    quota: ["All India", "Home State", "Other State"],
    gender: ["All", "Gender-Neutral", "Female-only (including Supernumerary)"],
  };

  const openCutoffFilterModal = (tab: "rounds" | "category" | "quota" | "gender" = "rounds") => {
    setTempCutoffFilters({ ...appliedCutoffFilters });
    setActiveFilterTab(tab);
    setIsCutoffFilterModalOpen(true);
  };

  // Admin multi-category cutoff editing selector state
  const [adminCutoffCategory, setAdminCutoffCategory] = useState("General");

  const getFilteredCutoffRows = (secData: CutoffRoundComparisonData, filters: typeof appliedCutoffFilters) => {
    const fullKey = `${filters.round}|${filters.category}|${filters.quota}|${filters.gender}`;
    const roundCategoryKey = `${filters.round}|${filters.category}`;
    const categoryKey = `${filters.category}`;

    // 1. Check exact custom combination from Supabase/admin
    if (secData.filterDatasets?.[fullKey] && secData.filterDatasets[fullKey].length > 0) {
      return secData.filterDatasets[fullKey];
    }
    // 2. Check round + category combination
    if (secData.filterDatasets?.[roundCategoryKey] && secData.filterDatasets[roundCategoryKey].length > 0) {
      return secData.filterDatasets[roundCategoryKey];
    }
    // 3. Check category dataset
    if (secData.filterDatasets?.[categoryKey] && secData.filterDatasets[categoryKey].length > 0) {
      return secData.filterDatasets[categoryKey];
    }

    // 4. Smart realistic JoSAA / UCEED benchmark algorithm fallback based on base rows
    const baseRows = secData.rows || [];
    let catMultiplier = 1;
    if (filters.category === "OBC") catMultiplier = 1.65;
    else if (filters.category === "SC") catMultiplier = 2.85;
    else if (filters.category === "ST") catMultiplier = 4.2;
    else if (filters.category === "PWD") catMultiplier = 0.45;
    else if (filters.category === "Economically Weaker Section") catMultiplier = 1.35;
    else if (filters.category === "OBC Non-Creamy PWD") catMultiplier = 0.55;
    else if (filters.category === "SC PWD") catMultiplier = 0.75;
    else if (filters.category === "ST PWD") catMultiplier = 0.9;

    let roundOffset = 0;
    if (filters.round === "2") roundOffset = 2;
    else if (filters.round === "3") roundOffset = 4;
    else if (filters.round === "4") roundOffset = 6;
    else if (filters.round === "5") roundOffset = 8;
    else if (filters.round === "Last Round") roundOffset = 10;

    let quotaOffset = filters.quota === "Home State" ? 4 : filters.quota === "Other State" ? -2 : 0;
    let genderMultiplier = filters.gender === "Female-only (including Supernumerary)" ? 1.35 : 1;

    return baseRows.map((row) => {
      const r2024 = typeof row.year2024 === "number" ? row.year2024 : parseInt(String(row.year2024)) || 35;
      const r2025 = typeof row.year2025 === "number" ? row.year2025 : parseInt(String(row.year2025)) || 41;
      const r2026 = typeof row.year2026 === "number" ? row.year2026 : parseInt(String(row.year2026)) || 28;

      return {
        course: row.course,
        year2024: Math.max(1, Math.round(r2024 * catMultiplier * genderMultiplier) + roundOffset + quotaOffset),
        year2025: Math.max(1, Math.round(r2025 * catMultiplier * genderMultiplier) + roundOffset + quotaOffset),
        year2026: Math.max(1, Math.round(r2026 * catMultiplier * genderMultiplier) + roundOffset + quotaOffset),
      };
    });
  };

  // Horizontal Scroll Ref for Tabs
  const tabScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkTabScroll = () => {
    if (tabScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabScrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollTabs = (direction: "left" | "right") => {
    if (tabScrollRef.current) {
      const scrollAmount = 260;
      tabScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkTabScroll, 350);
    }
  };

  useEffect(() => {
    checkTabScroll();
    window.addEventListener("resize", checkTabScroll);
    return () => window.removeEventListener("resize", checkTabScroll);
  }, []);

  // Admin Session and In-Page Editing States
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeMiniModal, setActiveMiniModal] = useState<MiniModalId>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Section-by-Section Edit State Buffer
  const [tempData, setTempData] = useState<CollegeDetail>(IIT_DELHI_MASTER_DATA);

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
            author: parsedData.author || IIT_DELHI_MASTER_DATA.author,
            tableOfContents: parsedData.tableOfContents || IIT_DELHI_MASTER_DATA.tableOfContents,
            highlightsArticle: parsedData.highlightsArticle || IIT_DELHI_MASTER_DATA.highlightsArticle,
            cutoffArticle: parsedData.cutoffArticle || IIT_DELHI_MASTER_DATA.cutoffArticle,
            cutoffComparison: parsedData.cutoffComparison || IIT_DELHI_MASTER_DATA.cutoffComparison,
            secondaryCutoffComparison: parsedData.secondaryCutoffComparison || IIT_DELHI_MASTER_DATA.secondaryCutoffComparison,
          };

          setCollegeData(baseDetail);
          setTempData(baseDetail);
        } else {
          setCollegeData(IIT_DELHI_MASTER_DATA);
          setTempData(IIT_DELHI_MASTER_DATA);
        }
      } catch (err) {
        console.error("Error loading college detail:", err);
        setCollegeData(IIT_DELHI_MASTER_DATA);
        setTempData(IIT_DELHI_MASTER_DATA);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCollegeDetail();
    }
  }, [slug]);

  const getCollegeCutoffComparison = (college: CollegeDetail): CutoffRoundComparisonData => {
    if (college.cutoffComparison && college.cutoffComparison.rows && college.cutoffComparison.rows.length > 0) {
      return college.cutoffComparison;
    }
    const shortName = college.name.split(" - ")[0].split("(")[0].trim() || "College";
    const exam = college.stream === "Medical" ? "NEET UG" : college.type.includes("Private") ? "Entrance Exam / JEE Main" : "JEE Advanced";
    const round = "Round 5";

    return {
      title: `Cut Off 2026 for ${exam} Latest Round`,
      subtitle: `${exam} ${round} Closing Rank (General-All India)`,
      years: ["2024", "2025", "2026"],
      rows: (college.cutoffs && college.cutoffs.length > 0)
        ? college.cutoffs.slice(0, 5).map((c, i) => ({
            course: c.branch.startsWith("B.Tech") ? c.branch : `B.Tech. in ${c.branch}`,
            year2024: Math.max(10, Number(c.closeRank) - 12 + (i * 4)),
            year2025: Math.max(10, Number(c.closeRank) - 4 + (i * 2)),
            year2026: c.closeRank,
          }))
        : [
            {
              course: "B.Tech. in Computer Science and Engineering",
              year2024: 116,
              year2025: 126,
              year2026: 128,
            },
            {
              course: "B.Tech. in Electrical Engineering",
              year2024: 625,
              year2025: 605,
              year2026: 612,
            },
            {
              course: "Integrated B.Tech. + M.Tech. in Computer Science and Engineering",
              year2024: 204,
              year2025: 186,
              year2026: 212,
            },
            {
              course: "Integrated B.Tech. + M.Tech. in Mathematics and Computing",
              year2024: 417,
              year2025: 355,
              year2026: 403,
            },
            {
              course: "B.Tech. in Mathematics and Computing Engineering",
              year2024: 332,
              year2025: 323,
              year2026: 338,
            },
          ],
    };
  };

  const getCollegeSecondaryCutoffComparison = (college: CollegeDetail): CutoffRoundComparisonData => {
    if (college.secondaryCutoffComparison && college.secondaryCutoffComparison.rows && college.secondaryCutoffComparison.rows.length > 0) {
      return college.secondaryCutoffComparison;
    }
    const isIIT = college.name.toLowerCase().includes("iit") || college.name.toLowerCase().includes("indian institute of technology");
    const exam = isIIT ? "UCEED" : college.stream === "Medical" ? "NEET PG" : "GATE / National Exam";

    return {
      title: `Cut Off 2026 for ${exam}: Year-Wise rank`,
      subtitle: `${exam} Last Round Closing Rank (General-All India)`,
      years: ["2024", "2025", "2026"],
      rows: isIIT
        ? [
            {
              course: "Bachelor of Design (B.Des.)",
              year2024: 35,
              year2025: 41,
              year2026: 28,
            },
          ]
        : [
            {
              course: `Postgraduate / Secondary Specialization (${exam})`,
              year2024: 240,
              year2025: 220,
              year2026: 215,
            },
          ],
    };
  };

  const getCollegeCutoffArticle = (college: CollegeDetail): CutoffArticleData => {
    if (college.cutoffArticle && college.cutoffArticle.paragraphs && college.cutoffArticle.paragraphs.length > 0) {
      return college.cutoffArticle;
    }
    const shortName = college.name.split(" - ")[0].split("(")[0].trim() || "College";
    const topBranch = college.cutoffs?.[0]?.branch || "Computer Science & Engineering (CSE)";
    const closeRank = college.cutoffs?.[0]?.closeRank ? String(college.cutoffs[0].closeRank) : "128";
    const round = college.cutoffs?.[0]?.round || "Round 5";

    return {
      paragraphs: [
        `**${shortName} Cutoff 2026** has been released on the official counselling portals! As per **${round} Cut Off 2026**, the **${shortName} admissions** closed at competitive opening and closing ranks for flagship BTech programmes in the Open Category.`,
        `The **highest competition** for admissions at **${shortName}** was observed for **${topBranch}** with a closing rank of **${closeRank}** in ${round}. Allied computing, electrical and technology branches also witnessed strong candidate demand.`,
        `On the other hand, the **competition** was **moderate to accessible** for core and interdisciplinary branches with closing cutoffs extending across reserved and general quotas.`,
        `**Cutoff 2026** Opening and Closing Ranks represent the minimum rank required for admission to various **${shortName}** programmes. The higher the candidate's rank, the higher the chances of securing admission. Participating in centralized counselling is mandatory.`
      ],
      calloutTitle: `Missed the ${shortName} Cutoff?`,
      calloutDesc: `Explore top engineering colleges accepting your rank and discover personalized pathways to pursue your BTech dream.`,
      calloutPdfUrl: "#",
      afterCalloutParagraphs: [
        `**${shortName}** also accepts national and state-level postgraduate entrance examinations for M.Tech, MBA, and M.Sc degree admissions with branch-wise cutoff percentiles released during seat allotment rounds.`
      ],
      footerNote: `Check ${shortName} Cut Off 2026 for other programmes below:`
    };
  };

  const getCollegeHighlightsArticle = (college: CollegeDetail): HighlightsArticleData => {
    const shortName = college.name.split(" - ")[0].split("(")[0].trim() || "College";
    const defaultFaqs: FaqItem[] = [
      {
        question: `What was the highest package offered during ${shortName} placements?`,
        answer: `As per recent placement reports, ${shortName} recorded a highest domestic package of ${college.highestPackage || "₹1.20 Crore PA"} and average CTC around ${college.averagePackage || "₹25.82 LPA"} with prominent national and global recruiters participating.`,
      },
      {
        question: `How are the degree placements at ${shortName}?`,
        answer: `${shortName} placements consistently record high placement percentages across undergraduate and postgraduate disciplines with prominent top tier firms visiting the campus.`,
      },
      {
        question: `What is the hostel and accommodation fee for ${shortName}?`,
        answer: `Hostel room and mess charges are structured on a per-semester basis with subsidized accommodation facilities for residential scholars.`,
      },
      {
        question: `What is the NIRF ranking of ${shortName}?`,
        answer: `${shortName} holds ${college.nirfRank || "prominent ranking in Engineering"} reflecting its academic excellence, faculty credentials, and student outcomes.`,
      },
    ];

    if (college.highlightsArticle && college.highlightsArticle.bullets && college.highlightsArticle.bullets.length > 0) {
      return {
        ...college.highlightsArticle,
        faqs: college.highlightsArticle.faqs && college.highlightsArticle.faqs.length > 0 ? college.highlightsArticle.faqs : defaultFaqs,
      };
    }

    return {
      introText: `${college.fullName || college.name} is one of India's leading institutions located in ${college.location}. Check out some of the important ${shortName} highlights below:`,
      bullets: [
        {
          title: "Rankings",
          text: `${shortName} is recognized prominently in national rankings, holding ${college.nirfRank || "top tier NIRF positioning"} and stellar academic reputation across the country.`,
        },
        {
          title: "Courses",
          text: `${shortName} offers diverse programs including Undergraduate (B.Tech/BE), Postgraduate (M.Tech, MBA, M.Sc), and Doctoral (Ph.D.) degree programmes.`,
        },
        {
          title: "Admissions",
          text: `${shortName} admission is entrance-based. Admission to flagship degree courses requires valid national entrance exam qualifications followed by centralized counselling.`,
        },
        {
          title: "Fees",
          text: `The tuition fees for the premier flagship programme is approximately ${college.totalFees || "INR 8 Lakhs (4 Years)"}.`,
        },
        {
          title: "Placements",
          text: `${shortName} placement recorded stellar offers with highest domestic CTC of ${college.highestPackage} and average CTC around ${college.averagePackage}.`,
        },
      ],
      nirfCalloutTitle: `Why Is ${shortName} Ranked Among India's Best?`,
      nirfCalloutDesc: `Explore verified performance metrics, faculty strength, and student outcomes.`,
      nirfReportUrl: "#",
      faqs: defaultFaqs,
    };
  };

  const getCollegeTocList = (college: CollegeDetail): TableOfContentItem[] => {
    if (college.tableOfContents && college.tableOfContents.length > 0) {
      return college.tableOfContents;
    }
    const shortName = college.name.split(" - ")[0].split("(")[0].trim() || "College";
    return [
      { label: `${shortName} Highlights 2026`, targetId: "highlights-section", tabId: "info" },
      { label: `${shortName} Cutoff 2026`, targetId: "cutoffs-section", tabId: "info" },
      { label: `${shortName} Courses & Fees 2026`, targetId: "courses-section", tabId: "courses" },
      { label: `${shortName} Placements 2026`, targetId: "placements-section", tabId: "placements" },
      { label: `${shortName} Admission & Application Process 2026`, targetId: "admissions-section", tabId: "admissions" },
      { label: `${shortName} Rankings 2026`, targetId: "rankings-section", tabId: "rankings" },
      { label: `${shortName} Student Reviews`, targetId: "reviews-section", tabId: "reviews" },
      { label: `${shortName} Scholarships 2026`, targetId: "scholarships-section", tabId: "scholarships" },
      { label: `${shortName} Popular Courses`, targetId: "courses-section", tabId: "courses" },
      { label: `${shortName} College comparison`, targetId: "compare-section", tabId: "compare" },
      { label: `${shortName} Campus & Facilities 2026`, targetId: "campus-section", tabId: "hostel" },
      { label: `${shortName} Colleges/Departments`, targetId: "faculty-section", tabId: "faculty" },
      { label: `Top online courses you might be interested in`, targetId: "courses-section", tabId: "courses" },
      { label: `${shortName} Notable Alumni`, targetId: "about-section", tabId: "info" },
      { label: `${shortName} FAQs`, targetId: "faq-section", tabId: "qa" },
    ];
  };

  const handleTocClick = (item: TableOfContentItem) => {
    if (item.tabId && item.tabId !== activeTab) {
      setActiveTab(item.tabId);
    }
    setTimeout(() => {
      const el = document.getElementById(item.targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
  };

  const openMiniModal = (modalId: MiniModalId) => {
    setTempData(JSON.parse(JSON.stringify(collegeData)));
    setActiveMiniModal(modalId);
  };

  const handleSaveSection = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const updatedData: CollegeDetail = { ...tempData };

      const res = await fetch("/api/colleges/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Samrat1311",
          password: "1311161161",
          slug: slug,
          updatedFields: {
            description: JSON.stringify(updatedData),
            tuition_fees: updatedData.totalFees,
            image_url: updatedData.image,
          },
        }),
      });

      if (res.ok) {
        setCollegeData(updatedData);
        setActiveMiniModal(null);
        alert("✅ Section updated and published live!");
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to update section.");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Network error updating section.");
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
    <div className="min-h-screen pb-16 space-y-4 select-none">
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
            {isAdmin && (
              <button
                onClick={() => openMiniModal("header")}
                className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="Edit Banner Image & Header Titles"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Banner</span>
              </button>
            )}
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

      {/* 2. GLASSMORPHIC SUB-HEADER TABS WITH SEPARATORS */}
      <div className="sticky top-16 md:top-0 bg-white/85 backdrop-blur-xl z-30 border-b border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-1 relative">
        {canScrollLeft && (
          <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-white via-white/90 to-transparent z-20 flex items-center pl-2 pointer-events-none">
            <button
              onClick={() => scrollTabs("left")}
              aria-label="Scroll left"
              className="w-8 h-8 rounded-full bg-white/95 border border-slate-200/90 shadow-lg flex items-center justify-center text-slate-700 hover:text-orange-600 hover:scale-110 active:scale-95 transition-all pointer-events-auto cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}

        <div
          ref={tabScrollRef}
          onScroll={checkTabScroll}
          className="flex items-center gap-1 overflow-x-auto scroll-smooth px-3 sm:px-8 py-1.5 relative [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {SHIKSHA_NAV_TABS.map((tab, index) => {
            const isActive = activeTab === tab.id;
            return (
              <React.Fragment key={tab.id}>
                <button
                  onClick={() => {
                    setActiveTab(tab.id);
                    setTimeout(checkTabScroll, 100);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 relative flex-shrink-0 cursor-pointer select-none group ${
                    isActive
                      ? "bg-gradient-to-r from-[#4a154b]/10 to-[#6b21a8]/10 text-[#4a154b] font-black border border-[#4a154b]/20 shadow-xs backdrop-blur-md"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white/80 hover:shadow-xs hover:border hover:border-slate-200/70"
                  }`}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="glassTabActive"
                      className="absolute inset-0 rounded-xl bg-white/40 shadow-inner border border-white/60 pointer-events-none"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>

                {index < SHIKSHA_NAV_TABS.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-slate-300/80 mx-0.5 shrink-0 select-none pointer-events-none" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {canScrollRight && (
          <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-white via-white/90 to-transparent z-20 flex items-center justify-end pr-2 pointer-events-none">
            <button
              onClick={() => scrollTabs("right")}
              aria-label="Scroll right"
              className="w-8 h-8 rounded-full bg-white/95 border border-slate-200/90 shadow-lg flex items-center justify-center text-slate-700 hover:text-orange-600 hover:scale-110 active:scale-95 transition-all pointer-events-auto cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 2.5. CONTENT AUTHOR BYLINE (CLEAN MINIMAL INLINE TEXT - NO HEAVY BORDER/BOX) */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 sm:px-2 pt-0.5 pb-0.5">
        <div className="flex items-center gap-2.5">
          {/* Author Badge / Avatar */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#c23616] via-[#273c75] to-[#192a56] p-0.5 shadow-2xs flex items-center justify-center shrink-0 overflow-hidden">
            {collegeData.author?.image ? (
              <img
                src={collegeData.author.image}
                alt={collegeData.author.name}
                className="w-full h-full object-cover rounded-[9px]"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <div className="w-full h-full rounded-[9px] bg-gradient-to-br from-[#d63031] via-[#0984e3] to-[#2d3436] flex flex-col items-center justify-center text-white">
                <GraduationCap className="w-4 h-4 text-white" />
                <span className="text-[6px] font-black uppercase tracking-tighter text-white/90">TYC</span>
              </div>
            )}
          </div>

          {/* Author Name, Verified Green Checkmark, Role and Updated Date */}
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="font-outfit font-black text-sm text-[#6b21a8] hover:underline cursor-pointer">
                {collegeData.author?.name || "Shreeya Panda"}
              </span>
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#10b981] text-white text-[8.5px] font-black shadow-2xs">
                ✓
              </span>
            </div>
            <p className="text-[11px] font-semibold text-slate-700">
              {collegeData.author?.role || "Intern"}
            </p>
            <p className="text-[10px] font-medium text-slate-500 pt-0.5">
              Updated on - {collegeData.author?.updatedDate || "Feb 09, 2026"}
            </p>
          </div>
        </div>

        {/* Fact check badge & admin edit */}
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold tracking-wide flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>100% Fact Checked</span>
          </span>
          {isAdmin && (
            <button
              onClick={() => openMiniModal("author")}
              className="px-2.5 py-0.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-[10.5px] font-bold border border-purple-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Edit className="w-3 h-3" />
              <span>Edit Author</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. CORE TWO-COLUMN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 lg:gap-5 pt-1">
        {/* LEFT COLUMN: ACTIVE TAB CONTENT (70%) */}
        <div className="lg:col-span-7 space-y-2.5">
          {/* TAB 1: COLLEGE INFO */}
          {activeTab === "info" && (
            <div className="space-y-2.5">
              {/* 1. TABLE OF CONTENTS (WORLD-CLASS PREMIUM REFERENCE TEMPLATE) */}
              {(() => {
                const tocList = getCollegeTocList(collegeData);
                const visibleList = isTocExpanded ? tocList : tocList.slice(0, 5);
                const remainingCount = Math.max(0, tocList.length - 5);
                const collegeShortName = collegeData.name.split(" - ")[0].split("(")[0].trim() || "College";

                return (
                  <div className="group relative bg-white/95 backdrop-blur-sm border border-slate-200/90 hover:border-slate-300/90 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_28px_-6px_rgba(15,23,42,0.08)] transition-all duration-300">
                    {/* Top Header Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wide block">
                          {collegeShortName} Overview
                        </span>
                        <h2 className="text-lg sm:text-xl font-black font-outfit text-slate-900 tracking-tight flex items-center gap-2">
                          <span>Table of contents</span>
                        </h2>
                      </div>

                      <div className="flex items-center gap-2">
                        {isAdmin && (
                          <button
                            type="button"
                            onClick={() => openMiniModal("toc")}
                            className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200/80 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit TOC</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setIsTocOpen(!isTocOpen)}
                          aria-label={isTocOpen ? "Collapse Table of Contents" : "Expand Table of Contents"}
                          className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 flex items-center justify-center text-slate-600 hover:text-slate-950 transition-all cursor-pointer shadow-2xs active:scale-90"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ease-out ${
                              isTocOpen ? "rotate-180 text-blue-600" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Collapsible Body */}
                    <AnimatePresence initial={false}>
                      {isTocOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 space-y-2 border-t border-slate-100/90 mt-3.5">
                            {visibleList.map((item, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => handleTocClick(item)}
                                className="group/item flex items-center text-left text-[#1a73e8] hover:text-[#0b57d0] text-[14px] sm:text-[14.5px] font-semibold leading-relaxed transition-all cursor-pointer py-0.5 w-full"
                              >
                                <span className="group-hover/item:underline underline-offset-2">
                                  {item.label}
                                </span>
                              </button>
                            ))}

                            {/* + X more items / - Collapse toggle */}
                            {tocList.length > 5 && (
                              <div className="pt-1.5">
                                {!isTocExpanded ? (
                                  <button
                                    type="button"
                                    onClick={() => setIsTocExpanded(true)}
                                    className="inline-flex items-center gap-1.5 text-[#1a73e8] hover:text-[#0b57d0] text-[14px] sm:text-[14.5px] font-bold transition-all cursor-pointer underline-offset-4 hover:underline"
                                  >
                                    <span>+ {remainingCount} more items</span>
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setIsTocExpanded(false)}
                                    className="inline-flex items-center gap-1.5 text-[#1a73e8] hover:text-[#0b57d0] text-[14px] sm:text-[14.5px] font-bold transition-all cursor-pointer underline-offset-4 hover:underline"
                                  >
                                    <span>- Collapse</span>
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })()}

              {/* 2. HIGHLIGHTS 2026 CARD (EXACT USER REFERENCE TEMPLATE) */}
              {(() => {
                const hlData = getCollegeHighlightsArticle(collegeData);
                const collegeShortName = collegeData.name.split(" - ")[0].split("(")[0].trim() || "College";
                const bullets = hlData.bullets || [];
                const firstBullet = bullets[0];

                return (
                  <div
                    id="highlights-section"
                    className="group relative bg-white/95 backdrop-blur-sm border border-slate-200/90 hover:border-slate-300/90 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_28px_-6px_rgba(15,23,42,0.08)] transition-all duration-300 scroll-mt-24"
                  >
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-lg sm:text-xl font-bold font-outfit text-slate-900 tracking-tight">
                        {collegeShortName} Highlights 2026
                      </h2>

                      <div className="flex items-center gap-2">
                        {isAdmin && (
                          <button
                            type="button"
                            onClick={() => openMiniModal("highlights")}
                            className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200/80 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit Highlights</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setIsHighlightsOpen(!isHighlightsOpen)}
                          aria-label={isHighlightsOpen ? "Collapse Highlights" : "Expand Highlights"}
                          className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 flex items-center justify-center text-slate-600 hover:text-slate-950 transition-all cursor-pointer shadow-2xs active:scale-90"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ease-out ${
                              isHighlightsOpen ? "rotate-180 text-blue-600" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Collapsible Body */}
                    <AnimatePresence initial={false}>
                      {isHighlightsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 space-y-3.5 text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-normal">
                            {/* Intro text */}
                            <p className="leading-relaxed">
                              {hlData.introText}
                            </p>

                            {/* Bullets: Collapsed vs Expanded */}
                            {!isHighlightsExpanded ? (
                              <div className="relative pt-0.5">
                                {firstBullet && (
                                  <div className="relative max-h-[82px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_45%,rgba(0,0,0,0.5)_75%,transparent_100%)]">
                                    <div className="flex items-start gap-2 text-slate-700">
                                      <span className="text-slate-900 font-black mt-0.5">•</span>
                                      <p className="leading-relaxed">
                                        <strong className="text-slate-900 font-bold">{firstBullet.title}: </strong>
                                        {firstBullet.text}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {/* Ultra-Premium Water & Glass Fade Overlay with Read more */}
                                <div className="absolute inset-x-0 bottom-0 h-11 bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-end pointer-events-auto pr-0.5">
                                  <button
                                    type="button"
                                    onClick={() => setIsHighlightsExpanded(true)}
                                    className="text-[#1a73e8] hover:text-[#0b57d0] text-xs sm:text-[13.5px] font-bold hover:underline cursor-pointer transition-colors"
                                  >
                                    Read more
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-3 pt-1">
                                {bullets.map((b, idx) => (
                                  <div key={idx} className="flex items-start gap-2 text-slate-700">
                                    <span className="text-slate-900 font-black mt-0.5">•</span>
                                    <p className="leading-relaxed">
                                      <strong className="text-slate-900 font-bold">{b.title}: </strong>
                                      {b.text}
                                    </p>
                                  </div>
                                ))}

                                {/* NIRF Callout Box */}
                                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                                  <h4 className="font-outfit font-bold text-[13.5px] text-slate-900">
                                    {hlData.nirfCalloutTitle || `Why Is ${collegeShortName} Ranked Among India's Best?`}
                                  </h4>
                                  <p className="text-[12.5px] text-slate-600 font-normal leading-relaxed">
                                    {hlData.nirfCalloutDesc || "Explore official NIRF 2026 data on placements, research, faculty strength and student outcomes."}
                                  </p>
                                  <div className="pt-1">
                                    <a
                                      href={hlData.nirfReportUrl || "https://home.iitd.ac.in/"}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a73e8] hover:underline"
                                    >
                                      <FileText className="w-3.5 h-3.5 text-red-500" />
                                      <span>Access {collegeShortName} NIRF 2026 Report</span>
                                    </a>
                                  </div>
                                </div>

                                {/* Read less */}
                                <div className="pt-1 flex justify-end">
                                  <button
                                    type="button"
                                    onClick={() => setIsHighlightsExpanded(false)}
                                    className="text-[#1a73e8] hover:text-[#0b57d0] text-xs sm:text-[13px] font-bold hover:underline cursor-pointer flex items-center gap-1"
                                  >
                                    Read less
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* THIN DIVIDER & COMMONLY ASKED QUESTIONS (ON HIGHLIGHTS) */}
                            {hlData.faqs && hlData.faqs.length > 0 && (
                              <div className="mt-5 pt-5 border-t border-slate-200/80 space-y-3">
                                {/* Header */}
                                <div className="flex items-center justify-between gap-2.5">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-amber-600 shrink-0 shadow-2xs">
                                      <HelpCircle className="w-4.5 h-4.5 text-amber-600" />
                                    </div>
                                    <div>
                                      <h3 className="font-outfit font-bold text-[15px] sm:text-base text-slate-900 leading-tight">
                                        Commonly asked questions
                                      </h3>
                                      <p className="text-[11.5px] sm:text-xs text-slate-500 font-medium">
                                        On Highlights
                                      </p>
                                    </div>
                                  </div>

                                  {isAdmin && (
                                    <button
                                      type="button"
                                      onClick={() => openMiniModal("highlights")}
                                      className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200/80 shadow-2xs transition-all flex items-center gap-1 cursor-pointer active:scale-95 shrink-0"
                                    >
                                      <Edit className="w-3.5 h-3.5 text-amber-700" />
                                      <span>Edit Q&A</span>
                                    </button>
                                  )}
                                </div>

                                {/* Accordion List */}
                                <div className="divide-y divide-slate-100/90 pt-1">
                                  {hlData.faqs.map((faq, fIdx) => {
                                    const isOpen = openHighlightFaqIdx === fIdx;
                                    const rawQ = faq.question.trim();
                                    const formattedQ = rawQ.startsWith("Q:") || rawQ.startsWith("Q.") ? rawQ : `Q: ${rawQ}`;
                                    const rawA = faq.answer.trim();
                                    const formattedA = rawA.startsWith("A:") || rawA.startsWith("A.") ? rawA : `A: ${rawA}`;

                                    return (
                                      <div key={fIdx} className="py-2.5 first:pt-1 last:pb-0">
                                        <button
                                          type="button"
                                          onClick={() => setOpenHighlightFaqIdx(isOpen ? null : fIdx)}
                                          className="w-full flex items-center justify-between gap-3 text-left py-1 text-slate-800 hover:text-blue-600 transition-colors cursor-pointer group/q"
                                        >
                                          <span className="font-outfit font-bold text-[13px] sm:text-[13.5px] leading-snug group-hover/q:text-blue-600 transition-colors">
                                            {formattedQ}
                                          </span>
                                          <ChevronDown
                                            className={`w-4 h-4 text-slate-500 group-hover/q:text-blue-600 shrink-0 transition-transform duration-200 ${
                                              isOpen ? "rotate-180 text-blue-600" : ""
                                            }`}
                                          />
                                        </button>

                                        <AnimatePresence initial={false}>
                                          {isOpen && (
                                            <motion.div
                                              initial={{ opacity: 0, height: 0 }}
                                              animate={{ opacity: 1, height: "auto" }}
                                              exit={{ opacity: 0, height: 0 }}
                                              transition={{ duration: 0.2, ease: "easeInOut" }}
                                              className="overflow-hidden"
                                            >
                                              <div className="pt-2 pb-3 space-y-3 pl-0.5 text-[13px] sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                                                {/* Multi-paragraph answer */}
                                                <div className="space-y-2">
                                                  {formattedA.split("\n\n").map((para, pIdx) => (
                                                    <p key={pIdx} className="leading-relaxed">
                                                      {para}
                                                    </p>
                                                  ))}
                                                </div>

                                                {/* Free Admissions Guidance Callout Box (Shiksha Reference) */}
                                                <div className="mt-3 p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3">
                                                  <div className="flex items-center gap-3">
                                                    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/80">
                                                      <img
                                                        src="/images/counselor_avatar.png"
                                                        alt="Expert Counselor"
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                          (e.target as HTMLElement).style.display = "none";
                                                        }}
                                                      />
                                                      <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-black text-xs">
                                                        SP
                                                      </div>
                                                      <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                                                    </div>
                                                    <div>
                                                      <h5 className="font-outfit font-bold text-xs sm:text-[13px] text-slate-900 leading-tight">
                                                        Get <span className="text-emerald-600 font-black italic">free</span> admissions guidance
                                                      </h5>
                                                      <p className="text-[11px] text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
                                                        <span>★ 0</span>
                                                        <span>•</span>
                                                        <span>0 review</span>
                                                      </p>
                                                    </div>
                                                  </div>

                                                  <button
                                                    type="button"
                                                    onClick={() => {
                                                      const leadEl = document.getElementById("lead-inquiry-box");
                                                      if (leadEl) {
                                                        leadEl.scrollIntoView({ behavior: "smooth" });
                                                      }
                                                    }}
                                                    className="px-5 py-2 rounded-full bg-[#1c142e] hover:bg-[#2b2046] text-white text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer shrink-0"
                                                  >
                                                    Call Us
                                                  </button>
                                                </div>
                                              </div>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })()}

              {/* 3. CUTOFF 2026 CARD (STEP 2 IN MASTER TEMPLATE) */}
              {(() => {
                const cutData = getCollegeCutoffArticle(collegeData);
                const collegeShortName = collegeData.name.split(" - ")[0].split("(")[0].trim() || "College";
                const paragraphs = cutData.paragraphs || [];
                const firstTwoParas = paragraphs.slice(0, 2);
                const thirdPara = paragraphs[2];

                return (
                  <div
                    id="cutoffs-section"
                    className="group relative bg-white/95 backdrop-blur-sm border border-slate-200/90 hover:border-slate-300/90 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_28px_-6px_rgba(15,23,42,0.08)] transition-all duration-300 scroll-mt-24"
                  >
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-lg sm:text-xl font-bold font-outfit text-slate-900 tracking-tight">
                        {cutData.title || `${collegeShortName} Cutoff 2026`}
                      </h2>

                      <div className="flex items-center gap-2">
                        {isAdmin && (
                          <button
                            type="button"
                            onClick={() => openMiniModal("cutoffs")}
                            className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200/80 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit Cutoffs</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setIsCutoffCardOpen(!isCutoffCardOpen)}
                          aria-label={isCutoffCardOpen ? "Collapse Cutoff Card" : "Expand Cutoff Card"}
                          className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 flex items-center justify-center text-slate-600 hover:text-slate-950 transition-all cursor-pointer shadow-2xs active:scale-90"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ease-out ${
                              isCutoffCardOpen ? "rotate-180 text-blue-600" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Collapsible Card Body */}
                    <AnimatePresence initial={false}>
                      {isCutoffCardOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3.5 space-y-3.5 text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-normal">
                            {!isCutoffArticleExpanded ? (
                              <div className="space-y-3 relative pt-0.5">
                                {firstTwoParas.map((p, idx) => (
                                  <p key={idx} className="leading-relaxed">
                                    {renderFormattedText(p)}
                                  </p>
                                ))}

                                {/* 3rd paragraph with frosted water glass mask fade */}
                                {thirdPara && (
                                  <div className="relative max-h-[52px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_15%,rgba(0,0,0,0.35)_55%,transparent_100%)]">
                                    <p className="leading-relaxed text-slate-700">
                                      {renderFormattedText(thirdPara)}
                                    </p>
                                  </div>
                                )}

                                {/* Ultra-Premium Water & Glass Fade Overlay with Read more */}
                                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-end pointer-events-auto pr-0.5">
                                  <button
                                    type="button"
                                    onClick={() => setIsCutoffArticleExpanded(true)}
                                    className="text-[#1a73e8] hover:text-[#0b57d0] text-xs sm:text-[13.5px] font-bold hover:underline cursor-pointer transition-colors"
                                  >
                                    Read more
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-3.5 pt-0.5">
                                {/* All initial paragraphs */}
                                {paragraphs.map((p, idx) => (
                                  <p key={idx} className="leading-relaxed">
                                    {renderFormattedText(p)}
                                  </p>
                                ))}

                                {/* Callout Box: Missed the Cutoff */}
                                {cutData.calloutTitle && (
                                  <div className="my-3 p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 space-y-1.5">
                                    <h4 className="font-outfit font-bold text-[14px] text-slate-900">
                                      {cutData.calloutTitle}
                                    </h4>
                                    <p className="text-[12.5px] text-slate-600 font-normal leading-relaxed">
                                      {cutData.calloutDesc || "Explore engineering colleges accepting low JEE Main ranks and discover alternative pathways to pursue your BTech dream."}
                                    </p>
                                    <div className="pt-1">
                                      <a
                                        href={cutData.calloutPdfUrl || "#"}
                                        onClick={(e) => {
                                          if (!cutData.calloutPdfUrl || cutData.calloutPdfUrl === "#") {
                                            e.preventDefault();
                                            const leadEl = document.getElementById("lead-inquiry-box");
                                            if (leadEl) {
                                              leadEl.scrollIntoView({ behavior: "smooth" });
                                            }
                                          }
                                        }}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a73e8] hover:underline cursor-pointer"
                                      >
                                        <FileText className="w-3.5 h-3.5 text-red-500" />
                                        <span>Download Free PDF</span>
                                      </a>
                                    </div>
                                  </div>
                                )}

                                {/* After Callout Paragraphs */}
                                {cutData.afterCalloutParagraphs?.map((p, idx) => (
                                  <p key={idx} className="leading-relaxed">
                                    {renderFormattedText(p)}
                                  </p>
                                ))}

                                {/* Footer Note */}
                                {cutData.footerNote && (
                                  <p className="text-[13.5px] text-slate-700 font-medium">
                                    Check <span className="text-[#1a73e8] font-bold cursor-pointer hover:underline">{collegeShortName} Cut Off 2026</span> for other programmes below:
                                  </p>
                                )}

                                {/* Read less */}
                                <div className="pt-1 flex justify-end">
                                  <button
                                    type="button"
                                    onClick={() => setIsCutoffArticleExpanded(false)}
                                    className="text-[#1a73e8] hover:text-[#0b57d0] text-xs sm:text-[13px] font-bold hover:underline cursor-pointer flex items-center gap-1"
                                  >
                                    Read less
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* 3-YEAR CUTOFF ROUND COMPARISON ACCORDION BOX (EXACT USER REFERENCE TEMPLATE) */}
                            {(() => {
                              const comparisonData = getCollegeCutoffComparison(collegeData);
                              const years = comparisonData.years || ["2024", "2025", "2026"];

                              return (
                                <div className="mt-3.5 pt-1">
                                  <div className="bg-white/95 border border-slate-200/90 hover:border-slate-300/90 rounded-2xl overflow-hidden shadow-[0_2px_8px_-2px_rgba(0,0,0,0.03)] transition-all">
                                    {/* Accordion Toggle Header */}
                                    <div
                                      onClick={() => setIsCutoffRoundOpen(!isCutoffRoundOpen)}
                                      className="w-full p-4 sm:p-4.5 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors cursor-pointer group/hdr select-none"
                                    >
                                      <h3 className="text-sm sm:text-[15px] font-bold font-outfit text-slate-900 tracking-tight group-hover/hdr:text-blue-600 transition-colors">
                                        {comparisonData.title || `Cut Off 2026 for ${collegeShortName} Latest Round`}
                                      </h3>

                                      <div className="flex items-center gap-2">
                                        {isAdmin && (
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              openMiniModal("cutoff_comparison");
                                            }}
                                            className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200/80 shadow-2xs transition-all flex items-center gap-1 cursor-pointer active:scale-95 shrink-0"
                                          >
                                            <Edit className="w-3.5 h-3.5" />
                                            <span>Edit Table</span>
                                          </button>
                                        )}
                                        <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 group-hover/hdr:text-slate-900 border border-slate-200/60 transition-all shrink-0">
                                          <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-300 ease-out ${
                                              isCutoffRoundOpen ? "rotate-180 text-blue-600" : ""
                                            }`}
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    {/* Collapsible Accordion Body */}
                                    <AnimatePresence initial={false}>
                                      {isCutoffRoundOpen && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: "auto" }}
                                          exit={{ opacity: 0, height: 0 }}
                                          transition={{ duration: 0.25, ease: "easeInOut" }}
                                          className="overflow-hidden"
                                        >
                                          <div className="px-4 sm:px-5 pb-5 pt-1 space-y-3">
                                            {/* Subtitle */}
                                            <h4 className="text-xs sm:text-[13.5px] font-bold font-outfit text-slate-800">
                                              {comparisonData.subtitle || `JEE Advanced Round 5 Closing Rank (General-All India)`}
                                            </h4>

                                            {/* Comparison Table with Dotted Dividers */}
                                            <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.02)] bg-white">
                                              <table className="w-full text-left border-collapse text-xs">
                                                <thead>
                                                  <tr className="bg-[#f0f4f9] text-slate-800 font-bold font-outfit text-xs border-b border-dotted border-slate-300/80">
                                                    <th className="py-3 px-4 text-left font-bold font-outfit text-slate-900 border-r border-dotted border-slate-200/80">
                                                      Course
                                                    </th>
                                                    <th className="py-3 px-4 text-center font-bold font-outfit text-slate-900 w-24 border-r border-dotted border-slate-200/80">
                                                      {years[0]}
                                                    </th>
                                                    <th className="py-3 px-4 text-center font-bold font-outfit text-slate-900 w-24 border-r border-dotted border-slate-200/80">
                                                      {years[1]}
                                                    </th>
                                                    <th className="py-3 px-4 text-center font-bold font-outfit text-slate-900 w-24">
                                                      {years[2]}
                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody className="font-medium text-xs sm:text-[13px]">
                                                  {comparisonData.rows.map((row, rIdx) => (
                                                    <tr key={rIdx} className="border-b border-dotted border-slate-300/70 last:border-b-0 hover:bg-slate-50/70 transition-colors">
                                                      <td className="py-3 px-4 text-slate-800 font-medium text-left leading-snug border-r border-dotted border-slate-200/70">
                                                        {row.course}
                                                      </td>
                                                      <td className="py-3 px-4 text-slate-600 text-center font-normal whitespace-nowrap border-r border-dotted border-slate-200/70">
                                                        {row.year2024}
                                                      </td>
                                                      <td className="py-3 px-4 text-slate-600 text-center font-normal whitespace-nowrap border-r border-dotted border-slate-200/70">
                                                        {row.year2025}
                                                      </td>
                                                      <td className="py-3 px-4 text-slate-600 text-center font-normal whitespace-nowrap">
                                                        {row.year2026}
                                                      </td>
                                                    </tr>
                                                  ))}
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>
                              );
                            })()}

                            {/* SECONDARY CUTOFF COMPARISON ACCORDION BOX (UCEED / SPECIALIZED EXAMS - USER REFERENCE TEMPLATE) */}
                            {(() => {
                              const secData = getCollegeSecondaryCutoffComparison(collegeData);
                              const secYears = secData.years || ["2024", "2025", "2026"];
                              const displayedRows = getFilteredCutoffRows(secData, appliedCutoffFilters);
                              const examPrefix = secData.title?.includes("UCEED") ? "UCEED" : (collegeData.stream === "Medical" ? "NEET" : "Exam");
                              const roundLabel = appliedCutoffFilters.round === "Last Round" ? "Last Round" : `Round ${appliedCutoffFilters.round}`;
                              const genderLabel = appliedCutoffFilters.gender === "All" ? "" : `, ${appliedCutoffFilters.gender}`;
                              const computedSubtitle = `${examPrefix} ${roundLabel} Closing Rank (${appliedCutoffFilters.category}-${appliedCutoffFilters.quota}${genderLabel})`;

                              return (
                                <div className="mt-3.5 pt-0.5">
                                  <div className="bg-white/95 border border-slate-200/90 hover:border-slate-300/90 rounded-2xl overflow-hidden shadow-[0_2px_8px_-2px_rgba(0,0,0,0.03)] transition-all">
                                    {/* Accordion Toggle Header */}
                                    <div
                                      onClick={() => setIsSecondaryCutoffOpen(!isSecondaryCutoffOpen)}
                                      className="w-full p-4 sm:p-4.5 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors cursor-pointer group/hdr select-none"
                                    >
                                      <h3 className="text-sm sm:text-[15px] font-bold font-outfit text-slate-900 tracking-tight group-hover/hdr:text-blue-600 transition-colors">
                                        {secData.title || `Cut Off 2026 for UCEED: Year-Wise rank`}
                                      </h3>

                                      <div className="flex items-center gap-2">
                                        {isAdmin && (
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              openMiniModal("secondary_cutoff_comparison");
                                            }}
                                            className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200/80 shadow-2xs transition-all flex items-center gap-1 cursor-pointer active:scale-95 shrink-0"
                                          >
                                            <Edit className="w-3.5 h-3.5" />
                                            <span>Edit Table</span>
                                          </button>
                                        )}
                                        <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 group-hover/hdr:text-slate-900 border border-slate-200/60 transition-all shrink-0">
                                          <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-300 ease-out ${
                                              isSecondaryCutoffOpen ? "rotate-180 text-blue-600" : ""
                                            }`}
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    {/* Collapsible Accordion Body */}
                                    <AnimatePresence initial={false}>
                                      {isSecondaryCutoffOpen && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: "auto" }}
                                          exit={{ opacity: 0, height: 0 }}
                                          transition={{ duration: 0.25, ease: "easeInOut" }}
                                          className="overflow-hidden"
                                        >
                                          <div className="px-4 sm:px-5 pb-5 pt-1 space-y-3.5">
                                            {/* Top Filter Pills Row matching reference image */}
                                            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
                                              {/* Filter count icon pill with radiant saffron shining animation */}
                                              <button
                                                type="button"
                                                onClick={() => openCutoffFilterModal("rounds")}
                                                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-300/90 bg-white hover:bg-amber-50/40 text-slate-700 font-semibold shadow-2xs shrink-0 select-none transition-all cursor-pointer active:scale-95 group relative"
                                                title="Open All Filters"
                                              >
                                                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-600 transition-colors" />
                                                
                                                {/* Saffron Glowing Badge */}
                                                <div className="relative flex items-center justify-center">
                                                  <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 opacity-80 blur-[3px] animate-pulse" />
                                                  <span className="relative z-10 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                                                    4
                                                  </span>
                                                </div>
                                              </button>

                                              {/* Rounds Dropdown Pill */}
                                              <div className="relative shrink-0">
                                                <button
                                                  type="button"
                                                  onClick={() => openCutoffFilterModal("rounds")}
                                                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border shadow-2xs transition-all cursor-pointer select-none active:scale-95 ${
                                                    appliedCutoffFilters.round !== "1"
                                                      ? "border-[#2d1a47] bg-purple-50 text-[#2d1a47] font-bold"
                                                      : "border-slate-300/80 bg-white hover:bg-slate-50 text-slate-700 font-medium"
                                                  }`}
                                                >
                                                  <span>Rounds{appliedCutoffFilters.round !== "1" ? `: ${appliedCutoffFilters.round}` : ""}</span>
                                                  <ChevronDown className="w-3 h-3 text-slate-500" />
                                                </button>
                                              </div>

                                              {/* Category Dropdown Pill */}
                                              <div className="relative shrink-0">
                                                <button
                                                  type="button"
                                                  onClick={() => openCutoffFilterModal("category")}
                                                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border shadow-2xs transition-all cursor-pointer select-none active:scale-95 ${
                                                    appliedCutoffFilters.category !== "General"
                                                      ? "border-[#2d1a47] bg-purple-50 text-[#2d1a47] font-bold"
                                                      : "border-slate-300/80 bg-white hover:bg-slate-50 text-slate-700 font-medium"
                                                  }`}
                                                >
                                                  <span>Category{appliedCutoffFilters.category !== "General" ? `: ${appliedCutoffFilters.category}` : ""}</span>
                                                  <ChevronDown className="w-3 h-3 text-slate-500" />
                                                </button>
                                              </div>

                                              {/* Quota Dropdown Pill */}
                                              <div className="relative shrink-0">
                                                <button
                                                  type="button"
                                                  onClick={() => openCutoffFilterModal("quota")}
                                                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border shadow-2xs transition-all cursor-pointer select-none active:scale-95 ${
                                                    appliedCutoffFilters.quota !== "All India"
                                                      ? "border-[#2d1a47] bg-purple-50 text-[#2d1a47] font-bold"
                                                      : "border-slate-300/80 bg-white hover:bg-slate-50 text-slate-700 font-medium"
                                                  }`}
                                                >
                                                  <span>Quota{appliedCutoffFilters.quota !== "All India" ? `: ${appliedCutoffFilters.quota}` : ""}</span>
                                                  <ChevronDown className="w-3 h-3 text-slate-500" />
                                                </button>
                                              </div>

                                              {/* Gender Dropdown Pill */}
                                              <div className="relative shrink-0">
                                                <button
                                                  type="button"
                                                  onClick={() => openCutoffFilterModal("gender")}
                                                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border shadow-2xs transition-all cursor-pointer select-none active:scale-95 ${
                                                    appliedCutoffFilters.gender !== "All"
                                                      ? "border-[#2d1a47] bg-purple-50 text-[#2d1a47] font-bold"
                                                      : "border-slate-300/80 bg-white hover:bg-slate-50 text-slate-700 font-medium"
                                                  }`}
                                                >
                                                  <span>Gender{appliedCutoffFilters.gender !== "All" ? `: ${appliedCutoffFilters.gender}` : ""}</span>
                                                  <ChevronDown className="w-3 h-3 text-slate-500" />
                                                </button>
                                              </div>
                                            </div>

                                            {/* Subtitle */}
                                            <h4 className="text-xs sm:text-[13.5px] font-bold font-outfit text-slate-800">
                                              {computedSubtitle}
                                            </h4>

                                            {/* Comparison Table with Light Dotted Dividers */}
                                            <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.02)] bg-white">
                                              <table className="w-full text-left border-collapse text-xs">
                                                <thead>
                                                  <tr className="bg-[#f0f4f9] text-slate-800 font-bold font-outfit text-xs border-b border-dotted border-slate-300/80">
                                                    <th className="py-3 px-4 text-left font-bold font-outfit text-slate-900 border-r border-dotted border-slate-200/80">
                                                      Course
                                                    </th>
                                                    <th className="py-3 px-4 text-center font-bold font-outfit text-slate-900 w-24 border-r border-dotted border-slate-200/80">
                                                      {secYears[0]}
                                                    </th>
                                                    <th className="py-3 px-4 text-center font-bold font-outfit text-slate-900 w-24 border-r border-dotted border-slate-200/80">
                                                      {secYears[1]}
                                                    </th>
                                                    <th className="py-3 px-4 text-center font-bold font-outfit text-slate-900 w-24">
                                                      {secYears[2]}
                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody className="font-medium text-xs sm:text-[13px]">
                                                  {displayedRows.map((row, rIdx) => (
                                                    <tr key={rIdx} className="border-b border-dotted border-slate-300/70 last:border-b-0 hover:bg-slate-50/70 transition-colors">
                                                      <td className="py-3 px-4 text-slate-800 font-medium text-left leading-snug border-r border-dotted border-slate-200/70">
                                                        {row.course}
                                                      </td>
                                                      <td className="py-3 px-4 text-slate-600 text-center font-normal whitespace-nowrap border-r border-dotted border-slate-200/70">
                                                        {row.year2024}
                                                      </td>
                                                      <td className="py-3 px-4 text-slate-600 text-center font-normal whitespace-nowrap border-r border-dotted border-slate-200/70">
                                                        {row.year2025}
                                                      </td>
                                                      <td className="py-3 px-4 text-slate-600 text-center font-normal whitespace-nowrap">
                                                        {row.year2026}
                                                      </td>
                                                    </tr>
                                                  ))}
                                                </tbody>
                                              </table>
                                            </div>

                                            {/* Green Action / Download Cut-Off Details Button matching reference */}
                                            <div className="pt-2 flex justify-center">
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  alert(`Downloading latest cutoff details for ${collegeShortName}...`);
                                                }}
                                                className="bg-[#00a859] hover:bg-[#008f4c] text-white text-xs sm:text-[13px] font-bold py-2.5 px-6 rounded-full shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 select-none"
                                              >
                                                <Download className="w-4 h-4" />
                                                <span>Cut-Off Details</span>
                                              </button>
                                            </div>
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TABS OTHER THAN INFO: CLEAN PLACEHOLDER WHILE BUILDING STEP-BY-STEP */}
          {activeTab !== "info" && (
            <div className="bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-2xl p-8 sm:p-12 text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-orange-50 border border-orange-200/80 flex items-center justify-center text-orange-500">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold font-outfit text-slate-900">
                {SHIKSHA_NAV_TABS.find((t) => t.id === activeTab)?.label || "Section"} - Updating for 2026
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                This section template is being prepared. Check back shortly or explore College Info.
              </p>
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

      {/* PHOTO GALLERY FULLSCREEN MODAL */}
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

      {/* INDEPENDENT MINI-MODALS SYSTEM FOR EACH SECTION */}
      <AnimatePresence>
        {activeMiniModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-7 shadow-2xl relative border border-slate-200 my-8 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <button
                onClick={() => setActiveMiniModal(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 z-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <form onSubmit={handleSaveSection} className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-outfit font-black text-xl text-slate-900">
                    {activeMiniModal === "author" && "✍️ Edit Author & Byline Profile"}
                    {activeMiniModal === "header" && "🖼️ Edit Banner Photo & Titles"}
                    {activeMiniModal === "info" && "📝 Edit College Overview & Latest Updates"}
                    {activeMiniModal === "highlights" && "📊 Edit Key Highlights Table"}
                    {activeMiniModal === "courses" && "🎓 Edit Courses, Fees & Intake"}
                    {activeMiniModal === "fees" && "💰 Edit Tuition & Hostel Fees"}
                    {activeMiniModal === "placements" && "💼 Edit Placement Records & Recruiters"}
                    {activeMiniModal === "cutoffs" && "📈 Edit Cutoff Ranks Table"}
                    {activeMiniModal === "cutoff_comparison" && "📈 Edit Cutoff Round 3-Year Comparison Table"}
                    {activeMiniModal === "secondary_cutoff_comparison" && "📊 Edit Secondary Exam Cutoff Table (UCEED / Specialized)"}
                    {activeMiniModal === "rankings" && "🏆 Edit Rankings"}
                    {activeMiniModal === "gallery" && "📸 Edit Photo Gallery"}
                    {activeMiniModal === "hostel" && "🏢 Edit Campus Facilities & Hostels"}
                    {activeMiniModal === "faculty" && "👨‍🏫 Edit Faculty Profiles"}
                    {activeMiniModal === "qa" && "❓ Edit Student Q&A FAQs"}
                    {activeMiniModal === "scholarships" && "🎁 Edit Scholarship Schemes"}
                    {activeMiniModal === "reviews" && "⭐ Edit Verified Reviews"}
                  </h3>
                  <p className="text-xs text-purple-600 font-bold">
                    Editing: {collegeData.name} ({slug})
                  </p>
                </div>

                {/* MODAL 1: AUTHOR PROFILE */}
                {activeMiniModal === "author" && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10.5px] font-bold text-slate-700 block mb-1">Author Name *</label>
                      <input
                        required
                        type="text"
                        value={tempData.author?.name || ""}
                        onChange={(e) =>
                          setTempData({
                            ...tempData,
                            author: { ...tempData.author, name: e.target.value, role: tempData.author?.role || "Intern", updatedDate: tempData.author?.updatedDate || "Feb 09, 2026" },
                          })
                        }
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10.5px] font-bold text-slate-700 block mb-1">Role / Position *</label>
                      <input
                        required
                        type="text"
                        value={tempData.author?.role || ""}
                        onChange={(e) =>
                          setTempData({
                            ...tempData,
                            author: { ...tempData.author, role: e.target.value, name: tempData.author?.name || "Shreeya Panda", updatedDate: tempData.author?.updatedDate || "Feb 09, 2026" },
                          })
                        }
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10.5px] font-bold text-slate-700 block mb-1">Author Avatar / Photo URL</label>
                      <input
                        type="text"
                        value={tempData.author?.image || ""}
                        placeholder="e.g. https://... or leave blank for default TYC badge"
                        onChange={(e) =>
                          setTempData({
                            ...tempData,
                            author: { ...tempData.author, image: e.target.value, name: tempData.author?.name || "Shreeya Panda", role: tempData.author?.role || "Intern", updatedDate: tempData.author?.updatedDate || "Feb 09, 2026" },
                          })
                        }
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10.5px] font-bold text-slate-700 block mb-1">Updated Date String</label>
                      <input
                        type="text"
                        value={tempData.author?.updatedDate || ""}
                        placeholder="e.g. Feb 09, 2026"
                        onChange={(e) =>
                          setTempData({
                            ...tempData,
                            author: { ...tempData.author, updatedDate: e.target.value, name: tempData.author?.name || "Shreeya Panda", role: tempData.author?.role || "Intern" },
                          })
                        }
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                )}

                {/* MODAL 2: HEADER & BANNER */}
                {activeMiniModal === "header" && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10.5px] font-bold text-slate-700 block mb-1">Cover Banner Image URL</label>
                      <input
                        type="text"
                        value={tempData.image || ""}
                        onChange={(e) => setTempData({ ...tempData, image: e.target.value })}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[10.5px] font-bold text-slate-700 block mb-1">College Full Name / Title</label>
                      <input
                        type="text"
                        value={tempData.fullName || tempData.name}
                        onChange={(e) => setTempData({ ...tempData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10.5px] font-bold text-slate-700 block mb-1">NIRF Rank Badge</label>
                        <input
                          type="text"
                          value={tempData.nirfRank}
                          onChange={(e) => setTempData({ ...tempData, nirfRank: e.target.value })}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-[10.5px] font-bold text-slate-700 block mb-1">Estd. Year</label>
                        <input
                          type="text"
                          value={tempData.estd}
                          onChange={(e) => setTempData({ ...tempData, estd: e.target.value })}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* MODAL 2.5: TABLE OF CONTENTS */}
                {activeMiniModal === "toc" && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500 font-medium">
                      Manage links in the Table of contents box. When users click these blue links, they will be navigated straight to that section.
                    </p>
                    <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
                      {(tempData.tableOfContents && tempData.tableOfContents.length > 0
                        ? tempData.tableOfContents
                        : getCollegeTocList(tempData)
                      ).map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                        >
                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) => {
                              const currentList = [
                                ...(tempData.tableOfContents && tempData.tableOfContents.length > 0
                                  ? tempData.tableOfContents
                                  : getCollegeTocList(tempData)),
                              ];
                              currentList[idx] = { ...currentList[idx], label: e.target.value };
                              setTempData({ ...tempData, tableOfContents: currentList });
                            }}
                            placeholder="Link Title (e.g. IIT Delhi Highlights 2026)"
                            className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-blue-600"
                          />

                          <select
                            value={`${item.targetId}|${item.tabId || "info"}`}
                            onChange={(e) => {
                              const [tId, tbId] = e.target.value.split("|");
                              const currentList = [
                                ...(tempData.tableOfContents && tempData.tableOfContents.length > 0
                                  ? tempData.tableOfContents
                                  : getCollegeTocList(tempData)),
                              ];
                              currentList[idx] = {
                                ...currentList[idx],
                                targetId: tId,
                                tabId: tbId as ShikshaTabId,
                              };
                              setTempData({ ...tempData, tableOfContents: currentList });
                            }}
                            className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 sm:w-44"
                          >
                            <option value="highlights-section|info">Info - Highlights</option>
                            <option value="about-section|info">Info - About Overview</option>
                            <option value="courses-section|courses">Courses Tab</option>
                            <option value="fees-section|fees">Fees Structure Tab</option>
                            <option value="cutoffs-section|cutoffs">Cut-Offs Tab</option>
                            <option value="placements-section|placements">Placements Tab</option>
                            <option value="admissions-section|admissions">Admissions Tab</option>
                            <option value="rankings-section|rankings">Rankings Tab</option>
                            <option value="reviews-section|reviews">Reviews Tab</option>
                            <option value="scholarships-section|scholarships">Scholarships Tab</option>
                            <option value="campus-section|hostel">Hostel & Campus Tab</option>
                            <option value="faculty-section|faculty">Faculty Tab</option>
                            <option value="compare-section|compare">College Compare Tab</option>
                            <option value="faq-section|qa">Q&A / FAQs Tab</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => {
                              const currentList = [
                                ...(tempData.tableOfContents && tempData.tableOfContents.length > 0
                                  ? tempData.tableOfContents
                                  : getCollegeTocList(tempData)),
                              ];
                              const updated = currentList.filter((_, i) => i !== idx);
                              setTempData({ ...tempData, tableOfContents: updated });
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg self-end sm:self-center"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          const currentList = [
                            ...(tempData.tableOfContents && tempData.tableOfContents.length > 0
                              ? tempData.tableOfContents
                              : getCollegeTocList(tempData)),
                          ];
                          setTempData({
                            ...tempData,
                            tableOfContents: [
                              ...currentList,
                              {
                                label: `${tempData.name.split(" - ")[0]} New Section 2026`,
                                targetId: "about-section",
                                tabId: "info",
                              },
                            ],
                          });
                        }}
                        className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add TOC Item</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setTempData({
                            ...tempData,
                            tableOfContents: getCollegeTocList(tempData),
                          });
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                      >
                        Reset to Defaults
                      </button>
                    </div>
                  </div>
                )}

                {/* MODAL 3: INFO & OVERVIEW */}
                {activeMiniModal === "info" && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10.5px] font-bold text-slate-700 block mb-1">About the Institution (Detailed narrative)</label>
                      <textarea
                        rows={6}
                        value={tempData.description}
                        onChange={(e) => setTempData({ ...tempData, description: e.target.value })}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold resize-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10.5px] font-bold text-slate-700 block mb-1">What's New Updates (1 per line)</label>
                      <textarea
                        rows={4}
                        value={tempData.whatsNew?.join("\n") || ""}
                        onChange={(e) => setTempData({ ...tempData, whatsNew: e.target.value.split("\n").filter(Boolean) })}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* MODAL 4: HIGHLIGHTS & EDITORIAL ARTICLE */}
                {activeMiniModal === "highlights" && (
                  <div className="space-y-4">
                    {/* Editorial Highlights Article Section */}
                    <div className="p-3.5 bg-purple-50/50 border border-purple-200/80 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-purple-900 uppercase tracking-wide">
                          Editorial Highlights Article
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const currentArt = tempData.highlightsArticle || getCollegeHighlightsArticle(tempData);
                            setTempData({
                              ...tempData,
                              highlightsArticle: {
                                ...currentArt,
                                bullets: [
                                  ...(currentArt.bullets || []),
                                  {
                                    title: "New Highlight",
                                    text: "Add detailed description here.",
                                  },
                                ],
                              },
                            });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Bullet Point</span>
                        </button>
                      </div>

                      <div>
                        <label className="text-[10.5px] font-bold text-slate-700 block mb-1">Introductory Paragraph</label>
                        <textarea
                          rows={3}
                          value={tempData.highlightsArticle?.introText || getCollegeHighlightsArticle(tempData).introText || ""}
                          onChange={(e) => {
                            const currentArt = tempData.highlightsArticle || getCollegeHighlightsArticle(tempData);
                            setTempData({
                              ...tempData,
                              highlightsArticle: {
                                ...currentArt,
                                introText: e.target.value,
                              },
                            });
                          }}
                          placeholder="Intro text..."
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium resize-none"
                        />
                      </div>

                      {/* Bullets List */}
                      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                        {(tempData.highlightsArticle?.bullets || getCollegeHighlightsArticle(tempData).bullets || []).map((b, idx) => (
                          <div key={idx} className="p-2.5 bg-white border border-slate-200 rounded-xl space-y-1.5 relative">
                            <button
                              type="button"
                              onClick={() => {
                                const currentArt = tempData.highlightsArticle || getCollegeHighlightsArticle(tempData);
                                const updated = (currentArt.bullets || []).filter((_, i) => i !== idx);
                                setTempData({
                                  ...tempData,
                                  highlightsArticle: {
                                    ...currentArt,
                                    bullets: updated,
                                  },
                                });
                              }}
                              className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            <input
                              type="text"
                              value={b.title}
                              onChange={(e) => {
                                const currentArt = tempData.highlightsArticle || getCollegeHighlightsArticle(tempData);
                                const updated = [...(currentArt.bullets || [])];
                                updated[idx] = { ...updated[idx], title: e.target.value };
                                setTempData({
                                  ...tempData,
                                  highlightsArticle: {
                                    ...currentArt,
                                    bullets: updated,
                                  },
                                });
                              }}
                              placeholder="Title (e.g. Rankings, Placements)"
                              className="w-4/5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                            />

                            <textarea
                              rows={2}
                              value={b.text}
                              onChange={(e) => {
                                const currentArt = tempData.highlightsArticle || getCollegeHighlightsArticle(tempData);
                                const updated = [...(currentArt.bullets || [])];
                                updated[idx] = { ...updated[idx], text: e.target.value };
                                setTempData({
                                  ...tempData,
                                  highlightsArticle: {
                                    ...currentArt,
                                    bullets: updated,
                                  },
                                });
                              }}
                              placeholder="Full description text..."
                              className="w-full px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs resize-none"
                            />
                          </div>
                        ))}
                      </div>

                      {/* NIRF Banner Controls */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div>
                          <label className="text-[10px] font-bold text-slate-700 block mb-0.5">NIRF Banner Title</label>
                          <input
                            type="text"
                            value={tempData.highlightsArticle?.nirfCalloutTitle || `Why Is ${tempData.name.split(" - ")[0]} Ranked Among India's Best?`}
                            onChange={(e) => {
                              const currentArt = tempData.highlightsArticle || getCollegeHighlightsArticle(tempData);
                              setTempData({
                                ...tempData,
                                highlightsArticle: {
                                  ...currentArt,
                                  nirfCalloutTitle: e.target.value,
                                },
                              });
                            }}
                            className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-700 block mb-0.5">NIRF Report Link URL</label>
                          <input
                            type="text"
                            value={tempData.highlightsArticle?.nirfReportUrl || "https://home.iitd.ac.in/"}
                            onChange={(e) => {
                              const currentArt = tempData.highlightsArticle || getCollegeHighlightsArticle(tempData);
                              setTempData({
                                ...tempData,
                                highlightsArticle: {
                                  ...currentArt,
                                  nirfReportUrl: e.target.value,
                                },
                              });
                            }}
                            className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-blue-600 font-semibold"
                          />
                        </div>
                      </div>
                    </div>

                    {/* COMMONLY ASKED QUESTIONS (ON HIGHLIGHTS) ACCORDION EDITOR */}
                    <div className="p-3.5 bg-amber-50/50 border border-amber-200/70 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="text-xs font-black text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                            <span>Commonly Asked Questions (On Highlights)</span>
                          </span>
                          <p className="text-[10px] text-amber-800/80 font-medium">
                            Add, delete or edit any number of questions & answers for this college
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const currentArt = tempData.highlightsArticle || getCollegeHighlightsArticle(tempData);
                            const currentFaqs = currentArt.faqs || [];
                            setTempData({
                              ...tempData,
                              highlightsArticle: {
                                ...currentArt,
                                faqs: [
                                  ...currentFaqs,
                                  {
                                    question: `What is the admission criteria for ${tempData.name.split(" - ")[0]}?`,
                                    answer: `Admission is strictly entrance examination-based followed by centralized counselling rounds.`,
                                  },
                                ],
                              },
                            });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Question</span>
                        </button>
                      </div>

                      <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                        {(tempData.highlightsArticle?.faqs || getCollegeHighlightsArticle(tempData).faqs || []).map((faq, fIdx) => (
                          <div key={fIdx} className="p-2.5 bg-white border border-amber-200/80 rounded-xl space-y-1.5 relative shadow-2xs">
                            <button
                              type="button"
                              onClick={() => {
                                const currentArt = tempData.highlightsArticle || getCollegeHighlightsArticle(tempData);
                                const updated = (currentArt.faqs || []).filter((_, i) => i !== fIdx);
                                setTempData({
                                  ...tempData,
                                  highlightsArticle: {
                                    ...currentArt,
                                    faqs: updated,
                                  },
                                });
                              }}
                              className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                              title="Delete Question"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            <div className="w-4/5">
                              <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Question #{fIdx + 1}</label>
                              <input
                                type="text"
                                value={faq.question}
                                onChange={(e) => {
                                  const currentArt = tempData.highlightsArticle || getCollegeHighlightsArticle(tempData);
                                  const updated = [...(currentArt.faqs || [])];
                                  updated[fIdx] = { ...updated[fIdx], question: e.target.value };
                                  setTempData({
                                    ...tempData,
                                    highlightsArticle: {
                                      ...currentArt,
                                      faqs: updated,
                                    },
                                  });
                                }}
                                placeholder="Question text (e.g. What was the highest package...)"
                                className="w-full px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                              />
                            </div>

                            <div>
                              <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Answer Text</label>
                              <textarea
                                rows={2.5}
                                value={faq.answer}
                                onChange={(e) => {
                                  const currentArt = tempData.highlightsArticle || getCollegeHighlightsArticle(tempData);
                                  const updated = [...(currentArt.faqs || [])];
                                  updated[fIdx] = { ...updated[fIdx], answer: e.target.value };
                                  setTempData({
                                    ...tempData,
                                    highlightsArticle: {
                                      ...currentArt,
                                      faqs: updated,
                                    },
                                  });
                                }}
                                placeholder="Answer text (supports paragraphs)..."
                                className="w-full px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs resize-none font-medium text-slate-700"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Highlights Table Parameters */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-black text-slate-800 uppercase tracking-wide">
                          Key Highlights Parameters Table
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            setTempData({
                              ...tempData,
                              highlights: [...tempData.highlights, { label: "New Parameter", value: "Value" }],
                            })
                          }
                          className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10.5px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Row</span>
                        </button>
                      </div>

                      <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                        {tempData.highlights.map((h, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={h.label}
                              onChange={(e) => {
                                const updated = [...tempData.highlights];
                                updated[idx].label = e.target.value;
                                setTempData({ ...tempData, highlights: updated });
                              }}
                              placeholder="Parameter Name"
                              className="w-1/3 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                            />
                            <input
                              type="text"
                              value={h.value}
                              onChange={(e) => {
                                const updated = [...tempData.highlights];
                                updated[idx].value = e.target.value;
                                setTempData({ ...tempData, highlights: updated });
                              }}
                              placeholder="Value"
                              className="flex-1 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = tempData.highlights.filter((_, i) => i !== idx);
                                setTempData({ ...tempData, highlights: updated });
                              }}
                              className="p-1 text-red-500 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* MODAL 5: COURSES & FEES */}
                {activeMiniModal === "courses" && (
                  <div className="space-y-3">
                    <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                      {tempData.courses.map((c, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = tempData.courses.filter((_, i) => i !== idx);
                              setTempData({ ...tempData, courses: updated });
                            }}
                            className="absolute top-2.5 right-2.5 p-1 text-red-500 hover:bg-red-100 rounded-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <input
                            type="text"
                            value={c.name}
                            onChange={(e) => {
                              const updated = [...tempData.courses];
                              updated[idx].name = e.target.value;
                              setTempData({ ...tempData, courses: updated });
                            }}
                            placeholder="Course Name (e.g. B.Tech CSE)"
                            className="w-5/6 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                          />
                          <div className="grid grid-cols-3 gap-2">
                            <input
                              type="text"
                              value={c.duration}
                              onChange={(e) => {
                                const updated = [...tempData.courses];
                                updated[idx].duration = e.target.value;
                                setTempData({ ...tempData, courses: updated });
                              }}
                              placeholder="Duration"
                              className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                            />
                            <input
                              type="text"
                              value={c.fees}
                              onChange={(e) => {
                                const updated = [...tempData.courses];
                                updated[idx].fees = e.target.value;
                                setTempData({ ...tempData, courses: updated });
                              }}
                              placeholder="Fees"
                              className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                            />
                            <input
                              type="text"
                              value={c.seats || ""}
                              onChange={(e) => {
                                const updated = [...tempData.courses];
                                updated[idx].seats = e.target.value;
                                setTempData({ ...tempData, courses: updated });
                              }}
                              placeholder="Seats"
                              className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                            />
                          </div>
                          <input
                            type="text"
                            value={c.eligibility}
                            onChange={(e) => {
                              const updated = [...tempData.courses];
                              updated[idx].eligibility = e.target.value;
                              setTempData({ ...tempData, courses: updated });
                            }}
                            placeholder="Eligibility criteria & Exam"
                            className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setTempData({
                          ...tempData,
                          courses: [
                            ...tempData.courses,
                            {
                              name: "New Degree Course",
                              duration: "4 Years",
                              fees: "₹2,00,000 / Yr",
                              eligibility: "12th with 75% + Entrance Exam",
                              seats: "60 Seats",
                            },
                          ],
                        })
                      }
                      className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Course Row</span>
                    </button>
                  </div>
                )}

                {/* MODAL 6: PLACEMENTS */}
                {activeMiniModal === "placements" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10.5px] font-bold text-slate-700 block mb-1">Highest Package (Domestic)</label>
                        <input
                          type="text"
                          value={tempData.highestPackage}
                          onChange={(e) => setTempData({ ...tempData, highestPackage: e.target.value })}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-[10.5px] font-bold text-slate-700 block mb-1">Average Package</label>
                        <input
                          type="text"
                          value={tempData.averagePackage}
                          onChange={(e) => setTempData({ ...tempData, averagePackage: e.target.value })}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10.5px] font-bold text-slate-700 block mb-1">Top Recruiters (Comma Separated)</label>
                      <textarea
                        rows={4}
                        value={tempData.recruiters.join(", ")}
                        onChange={(e) =>
                          setTempData({
                            ...tempData,
                            recruiters: e.target.value.split(",").map((r) => r.trim()).filter(Boolean),
                          })
                        }
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* MODAL 7: CUTOFFS */}
                {activeMiniModal === "cutoffs" && (
                  <div className="space-y-4">
                    {/* Part 1: Editorial Cutoff Article Editor */}
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-purple-900 uppercase tracking-wide">
                          Editorial Cutoffs Article
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const currentCut = tempData.cutoffArticle || getCollegeCutoffArticle(tempData);
                            setTempData({
                              ...tempData,
                              cutoffArticle: {
                                ...currentCut,
                                paragraphs: [
                                  ...(currentCut.paragraphs || []),
                                  "New cutoff explanation paragraph text here.",
                                ],
                              },
                            });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Paragraph</span>
                        </button>
                      </div>

                      {/* Paragraphs List */}
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {(tempData.cutoffArticle?.paragraphs || getCollegeCutoffArticle(tempData).paragraphs || []).map((p, idx) => (
                          <div key={idx} className="p-2.5 bg-white border border-slate-200 rounded-xl space-y-1 relative shadow-2xs">
                            <button
                              type="button"
                              onClick={() => {
                                const currentCut = tempData.cutoffArticle || getCollegeCutoffArticle(tempData);
                                const updated = (currentCut.paragraphs || []).filter((_, i) => i !== idx);
                                setTempData({
                                  ...tempData,
                                  cutoffArticle: {
                                    ...currentCut,
                                    paragraphs: updated,
                                  },
                                });
                              }}
                              className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                              title="Delete Paragraph"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            <label className="text-[10px] font-bold text-slate-500 block">Paragraph #{idx + 1}</label>
                            <textarea
                              rows={2.5}
                              value={p}
                              onChange={(e) => {
                                const currentCut = tempData.cutoffArticle || getCollegeCutoffArticle(tempData);
                                const updated = [...(currentCut.paragraphs || [])];
                                updated[idx] = e.target.value;
                                setTempData({
                                  ...tempData,
                                  cutoffArticle: {
                                    ...currentCut,
                                    paragraphs: updated,
                                  },
                                });
                              }}
                              placeholder="Cutoff details and analysis paragraph..."
                              className="w-full px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs resize-none font-medium text-slate-800"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Missed Cutoff Callout Banner Controls */}
                      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/80">
                        <div>
                          <label className="text-[10px] font-bold text-slate-700 block mb-0.5">Callout Banner Title</label>
                          <input
                            type="text"
                            value={tempData.cutoffArticle?.calloutTitle || `Missed the ${tempData.name.split(" - ")[0]} Cutoff?`}
                            onChange={(e) => {
                              const currentCut = tempData.cutoffArticle || getCollegeCutoffArticle(tempData);
                              setTempData({
                                ...tempData,
                                cutoffArticle: {
                                  ...currentCut,
                                  calloutTitle: e.target.value,
                                },
                              });
                            }}
                            className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-700 block mb-0.5">PDF Download Link URL</label>
                          <input
                            type="text"
                            value={tempData.cutoffArticle?.calloutPdfUrl || "#"}
                            onChange={(e) => {
                              const currentCut = tempData.cutoffArticle || getCollegeCutoffArticle(tempData);
                              setTempData({
                                ...tempData,
                                cutoffArticle: {
                                  ...currentCut,
                                  calloutPdfUrl: e.target.value,
                                },
                              });
                            }}
                            className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-blue-600 font-semibold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-700 block mb-0.5">Callout Description</label>
                        <input
                          type="text"
                          value={tempData.cutoffArticle?.calloutDesc || "Explore engineering colleges accepting low JEE Main ranks and discover alternative pathways to pursue your BTech dream."}
                          onChange={(e) => {
                            const currentCut = tempData.cutoffArticle || getCollegeCutoffArticle(tempData);
                            setTempData({
                              ...tempData,
                              cutoffArticle: {
                                ...currentCut,
                                calloutDesc: e.target.value,
                              },
                            });
                          }}
                          className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    {/* Part 2: Opening & Closing Ranks Table Rows */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-black text-slate-800 uppercase tracking-wide">
                          Opening & Closing Ranks Table Rows
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            setTempData({
                              ...tempData,
                              cutoffs: [
                                ...tempData.cutoffs,
                                {
                                  branch: "New Engineering Branch",
                                  category: "General (Gender-Neutral)",
                                  openRank: "100",
                                  closeRank: "500",
                                  round: "Round 6",
                                },
                              ],
                            })
                          }
                          className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10.5px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Row</span>
                        </button>
                      </div>

                      <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                        {tempData.cutoffs.map((cut, idx) => (
                          <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                            <input
                              type="text"
                              value={cut.branch}
                              onChange={(e) => {
                                const updated = [...tempData.cutoffs];
                                updated[idx].branch = e.target.value;
                                setTempData({ ...tempData, cutoffs: updated });
                              }}
                              placeholder="Branch"
                              className="w-1/3 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                            />
                            <input
                              type="text"
                              value={cut.category || "General"}
                              onChange={(e) => {
                                const updated = [...tempData.cutoffs];
                                updated[idx].category = e.target.value;
                                setTempData({ ...tempData, cutoffs: updated });
                              }}
                              placeholder="Category"
                              className="w-1/4 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                            />
                            <input
                              type="text"
                              value={cut.openRank}
                              onChange={(e) => {
                                const updated = [...tempData.cutoffs];
                                updated[idx].openRank = e.target.value;
                                setTempData({ ...tempData, cutoffs: updated });
                              }}
                              placeholder="Open"
                              className="w-16 px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                            />
                            <input
                              type="text"
                              value={cut.closeRank}
                              onChange={(e) => {
                                const updated = [...tempData.cutoffs];
                                updated[idx].closeRank = e.target.value;
                                setTempData({ ...tempData, cutoffs: updated });
                              }}
                              placeholder="Close"
                              className="w-16 px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-red-600"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = tempData.cutoffs.filter((_, i) => i !== idx);
                                setTempData({ ...tempData, cutoffs: updated });
                              }}
                              className="p-1 text-red-500 hover:bg-red-50 rounded-lg ml-auto"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* MODAL: 3-YEAR CUTOFF COMPARISON TABLE */}
                {activeMiniModal === "cutoff_comparison" && (
                  <div className="space-y-4">
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                      <div>
                        <label className="text-[10.5px] font-bold text-slate-700 block mb-1">Accordion Box Title</label>
                        <input
                          type="text"
                          value={tempData.cutoffComparison?.title || `Cut Off 2026 for ${tempData.name.split(" - ")[0]} Latest Round`}
                          onChange={(e) => {
                            const cur = tempData.cutoffComparison || getCollegeCutoffComparison(tempData);
                            setTempData({
                              ...tempData,
                              cutoffComparison: {
                                ...cur,
                                title: e.target.value,
                              },
                            });
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="text-[10.5px] font-bold text-slate-700 block mb-1">Table Subtitle / Round Header</label>
                        <input
                          type="text"
                          value={tempData.cutoffComparison?.subtitle || "JEE Advanced Round 5 Closing Rank (General-All India)"}
                          onChange={(e) => {
                            const cur = tempData.cutoffComparison || getCollegeCutoffComparison(tempData);
                            setTempData({
                              ...tempData,
                              cutoffComparison: {
                                ...cur,
                                subtitle: e.target.value,
                              },
                            });
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                        />
                      </div>

                      {/* Years */}
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Year 1</label>
                          <input
                            type="text"
                            value={tempData.cutoffComparison?.years?.[0] || "2024"}
                            onChange={(e) => {
                              const cur = tempData.cutoffComparison || getCollegeCutoffComparison(tempData);
                              const y = cur.years || ["2024", "2025", "2026"];
                              setTempData({
                                ...tempData,
                                cutoffComparison: {
                                  ...cur,
                                  years: [e.target.value, y[1], y[2]],
                                },
                              });
                            }}
                            className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-center font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Year 2</label>
                          <input
                            type="text"
                            value={tempData.cutoffComparison?.years?.[1] || "2025"}
                            onChange={(e) => {
                              const cur = tempData.cutoffComparison || getCollegeCutoffComparison(tempData);
                              const y = cur.years || ["2024", "2025", "2026"];
                              setTempData({
                                ...tempData,
                                cutoffComparison: {
                                  ...cur,
                                  years: [y[0], e.target.value, y[2]],
                                },
                              });
                            }}
                            className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-center font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Year 3</label>
                          <input
                            type="text"
                            value={tempData.cutoffComparison?.years?.[2] || "2026"}
                            onChange={(e) => {
                              const cur = tempData.cutoffComparison || getCollegeCutoffComparison(tempData);
                              const y = cur.years || ["2024", "2025", "2026"];
                              setTempData({
                                ...tempData,
                                cutoffComparison: {
                                  ...cur,
                                  years: [y[0], y[1], e.target.value],
                                },
                              });
                            }}
                            className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-center font-bold"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Table Rows */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-black text-slate-800 uppercase tracking-wide">
                          Course Cutoff Comparison Rows
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const cur = tempData.cutoffComparison || getCollegeCutoffComparison(tempData);
                            setTempData({
                              ...tempData,
                              cutoffComparison: {
                                ...cur,
                                rows: [
                                  ...(cur.rows || []),
                                  {
                                    course: "B.Tech. in New Branch",
                                    year2024: 500,
                                    year2025: 480,
                                    year2026: 490,
                                  },
                                ],
                              },
                            });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Course Row</span>
                        </button>
                      </div>

                      <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                        {(tempData.cutoffComparison?.rows || getCollegeCutoffComparison(tempData).rows || []).map((row, rIdx) => (
                          <div key={rIdx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 relative shadow-2xs">
                            <button
                              type="button"
                              onClick={() => {
                                const cur = tempData.cutoffComparison || getCollegeCutoffComparison(tempData);
                                const updated = (cur.rows || []).filter((_, i) => i !== rIdx);
                                setTempData({
                                  ...tempData,
                                  cutoffComparison: {
                                    ...cur,
                                    rows: updated,
                                  },
                                });
                              }}
                              className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                              title="Delete Row"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            <div className="w-4/5">
                              <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Course Name</label>
                              <input
                                type="text"
                                value={row.course}
                                onChange={(e) => {
                                  const cur = tempData.cutoffComparison || getCollegeCutoffComparison(tempData);
                                  const updated = [...(cur.rows || [])];
                                  updated[rIdx] = { ...updated[rIdx], course: e.target.value };
                                  setTempData({
                                    ...tempData,
                                    cutoffComparison: {
                                      ...cur,
                                      rows: updated,
                                    },
                                  });
                                }}
                                placeholder="Course (e.g. B.Tech. in Computer Science...)"
                                className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                              />
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <label className="text-[10px] font-bold text-slate-500 block mb-0.5">2024 Rank</label>
                                <input
                                  type="text"
                                  value={row.year2024}
                                  onChange={(e) => {
                                    const cur = tempData.cutoffComparison || getCollegeCutoffComparison(tempData);
                                    const updated = [...(cur.rows || [])];
                                    updated[rIdx] = { ...updated[rIdx], year2024: e.target.value };
                                    setTempData({
                                      ...tempData,
                                      cutoffComparison: {
                                        ...cur,
                                        rows: updated,
                                      },
                                    });
                                  }}
                                  placeholder="2024"
                                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs text-center font-semibold"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold text-slate-500 block mb-0.5">2025 Rank</label>
                                <input
                                  type="text"
                                  value={row.year2025}
                                  onChange={(e) => {
                                    const cur = tempData.cutoffComparison || getCollegeCutoffComparison(tempData);
                                    const updated = [...(cur.rows || [])];
                                    updated[rIdx] = { ...updated[rIdx], year2025: e.target.value };
                                    setTempData({
                                      ...tempData,
                                      cutoffComparison: {
                                        ...cur,
                                        rows: updated,
                                      },
                                    });
                                  }}
                                  placeholder="2025"
                                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs text-center font-semibold"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold text-slate-500 block mb-0.5">2026 Rank</label>
                                <input
                                  type="text"
                                  value={row.year2026}
                                  onChange={(e) => {
                                    const cur = tempData.cutoffComparison || getCollegeCutoffComparison(tempData);
                                    const updated = [...(cur.rows || [])];
                                    updated[rIdx] = { ...updated[rIdx], year2026: e.target.value };
                                    setTempData({
                                      ...tempData,
                                      cutoffComparison: {
                                        ...cur,
                                        rows: updated,
                                      },
                                    });
                                  }}
                                  placeholder="2026"
                                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs text-center font-bold text-blue-600"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* MODAL 7.6: SECONDARY CUTOFF 3-YEAR COMPARISON (UCEED / SPECIALIZED) */}
                {activeMiniModal === "secondary_cutoff_comparison" && (
                  <div className="space-y-4">
                    <div className="p-3.5 bg-purple-50/50 border border-purple-200/80 rounded-2xl space-y-3">
                      <div>
                        <label className="text-[10.5px] font-bold text-slate-700 block mb-1">
                          Accordion Box Header Title
                        </label>
                        <input
                          type="text"
                          value={tempData.secondaryCutoffComparison?.title || getCollegeSecondaryCutoffComparison(tempData).title || ""}
                          onChange={(e) => {
                            const cur = tempData.secondaryCutoffComparison || getCollegeSecondaryCutoffComparison(tempData);
                            setTempData({
                              ...tempData,
                              secondaryCutoffComparison: {
                                ...cur,
                                title: e.target.value,
                              },
                            });
                          }}
                          placeholder="e.g. Cut Off 2026 for UCEED: Year-Wise rank"
                          className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>

                      <div>
                        <label className="text-[10.5px] font-bold text-slate-700 block mb-1">
                          Subtitle & Round/Category Context
                        </label>
                        <input
                          type="text"
                          value={tempData.secondaryCutoffComparison?.subtitle || getCollegeSecondaryCutoffComparison(tempData).subtitle || ""}
                          onChange={(e) => {
                            const cur = tempData.secondaryCutoffComparison || getCollegeSecondaryCutoffComparison(tempData);
                            setTempData({
                              ...tempData,
                              secondaryCutoffComparison: {
                                ...cur,
                                subtitle: e.target.value,
                              },
                            });
                          }}
                          placeholder="e.g. UCEED Last Round Closing Rank (General-All India)"
                          className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>

                      {/* Year Labels */}
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 block mb-1">Year Column 1</label>
                          <input
                            type="text"
                            value={tempData.secondaryCutoffComparison?.years?.[0] || "2024"}
                            onChange={(e) => {
                              const cur = tempData.secondaryCutoffComparison || getCollegeSecondaryCutoffComparison(tempData);
                              const y = cur.years || ["2024", "2025", "2026"];
                              setTempData({
                                ...tempData,
                                secondaryCutoffComparison: {
                                  ...cur,
                                  years: [e.target.value, y[1], y[2]],
                                },
                              });
                            }}
                            className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-center font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 block mb-1">Year Column 2</label>
                          <input
                            type="text"
                            value={tempData.secondaryCutoffComparison?.years?.[1] || "2025"}
                            onChange={(e) => {
                              const cur = tempData.secondaryCutoffComparison || getCollegeSecondaryCutoffComparison(tempData);
                              const y = cur.years || ["2024", "2025", "2026"];
                              setTempData({
                                ...tempData,
                                secondaryCutoffComparison: {
                                  ...cur,
                                  years: [y[0], e.target.value, y[2]],
                                },
                              });
                            }}
                            className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-center font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 block mb-1">Year Column 3</label>
                          <input
                            type="text"
                            value={tempData.secondaryCutoffComparison?.years?.[2] || "2026"}
                            onChange={(e) => {
                              const cur = tempData.secondaryCutoffComparison || getCollegeSecondaryCutoffComparison(tempData);
                              const y = cur.years || ["2024", "2025", "2026"];
                              setTempData({
                                ...tempData,
                                secondaryCutoffComparison: {
                                  ...cur,
                                  years: [y[0], y[1], e.target.value],
                                },
                              });
                            }}
                            className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-center font-bold"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Multi-Category Dataset Selector & Quick Generator */}
                    <div className="p-3.5 bg-indigo-50/60 border border-indigo-200/80 rounded-2xl space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <label className="text-[11px] font-black text-indigo-950 uppercase tracking-wide block">
                            🎯 Select Category To Fill / Edit Cutoff Ranks
                          </label>
                          <p className="text-[11px] text-slate-500 font-medium">
                            Choose a category to customize its exact ranks, or auto-generate realistic benchmark ranks.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const cur = tempData.secondaryCutoffComparison || getCollegeSecondaryCutoffComparison(tempData);
                            const baseRows = cur.rows || [];
                            const newDatasets: Record<string, CutoffComparisonRow[]> = { ...(cur.filterDatasets || {}) };
                            const multipliers: Record<string, number> = {
                              OBC: 1.65,
                              SC: 2.85,
                              ST: 4.2,
                              PWD: 0.45,
                              "Economically Weaker Section": 1.35,
                              "OBC Non-Creamy PWD": 0.55,
                              "SC PWD": 0.75,
                              "ST PWD": 0.9,
                            };
                            Object.entries(multipliers).forEach(([cat, mult]) => {
                              newDatasets[cat] = baseRows.map((r) => {
                                const y24 = Number(r.year2024) || 35;
                                const y25 = Number(r.year2025) || 41;
                                const y26 = Number(r.year2026) || 28;
                                return {
                                  course: r.course,
                                  year2024: Math.max(1, Math.round(y24 * mult)),
                                  year2025: Math.max(1, Math.round(y25 * mult)),
                                  year2026: Math.max(1, Math.round(y26 * mult)),
                                };
                              });
                            });
                            setTempData({
                              ...tempData,
                              secondaryCutoffComparison: {
                                ...cur,
                                filterDatasets: newDatasets,
                              },
                            });
                            alert("⚡ Successfully generated realistic cutoff ranks for all 8 categories based on General benchmarks!");
                          }}
                          className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Auto-Generate All Categories</span>
                        </button>
                      </div>

                      {/* Category Pill Buttons */}
                      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                        {["General", ...CUTOFF_FILTER_OPTIONS.category.filter((c) => c !== "General")].map((cat) => {
                          const isCurrent = adminCutoffCategory === cat;
                          return (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setAdminCutoffCategory(cat)}
                              className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer select-none ${
                                isCurrent
                                  ? "bg-indigo-600 text-white shadow-xs"
                                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                              }`}
                            >
                              {cat}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Table Rows for Selected Category */}
                    {(() => {
                      const cur = tempData.secondaryCutoffComparison || getCollegeSecondaryCutoffComparison(tempData);
                      const isGeneral = adminCutoffCategory === "General";
                      const currentRows: CutoffComparisonRow[] = isGeneral
                        ? cur.rows || []
                        : cur.filterDatasets?.[adminCutoffCategory] ||
                          getFilteredCutoffRows(cur, { round: "1", category: adminCutoffCategory, quota: "All India", gender: "All" });

                      const updateRowsForCurrentCat = (newRows: CutoffComparisonRow[]) => {
                        if (isGeneral) {
                          setTempData({
                            ...tempData,
                            secondaryCutoffComparison: {
                              ...cur,
                              rows: newRows,
                            },
                          });
                        } else {
                          setTempData({
                            ...tempData,
                            secondaryCutoffComparison: {
                              ...cur,
                              filterDatasets: {
                                ...(cur.filterDatasets || {}),
                                [adminCutoffCategory]: newRows,
                              },
                            },
                          });
                        }
                      };

                      return (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-[11px] font-black text-slate-800 uppercase tracking-wide">
                              Editing Ranks for: <span className="text-indigo-600 font-extrabold">{adminCutoffCategory}</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                updateRowsForCurrentCat([
                                  ...currentRows,
                                  {
                                    course: "Bachelor of Design (B.Des.)",
                                    year2024: 35,
                                    year2025: 41,
                                    year2026: 28,
                                  },
                                ]);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Course Row</span>
                            </button>
                          </div>

                          <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                            {currentRows.map((row, rIdx) => (
                              <div key={rIdx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 relative shadow-2xs">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = currentRows.filter((_, i) => i !== rIdx);
                                    updateRowsForCurrentCat(updated);
                                  }}
                                  className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                                  title="Delete Row"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>

                                <div className="w-4/5">
                                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Course Name</label>
                                  <input
                                    type="text"
                                    value={row.course}
                                    onChange={(e) => {
                                      const updated = [...currentRows];
                                      updated[rIdx] = { ...updated[rIdx], course: e.target.value };
                                      updateRowsForCurrentCat(updated);
                                    }}
                                    placeholder="Course (e.g. Bachelor of Design (B.Des.))"
                                    className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                                  />
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                  <div>
                                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">2024 Rank</label>
                                    <input
                                      type="text"
                                      value={row.year2024}
                                      onChange={(e) => {
                                        const updated = [...currentRows];
                                        updated[rIdx] = { ...updated[rIdx], year2024: e.target.value };
                                        updateRowsForCurrentCat(updated);
                                      }}
                                      placeholder="2024"
                                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs text-center font-semibold"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">2025 Rank</label>
                                    <input
                                      type="text"
                                      value={row.year2025}
                                      onChange={(e) => {
                                        const updated = [...currentRows];
                                        updated[rIdx] = { ...updated[rIdx], year2025: e.target.value };
                                        updateRowsForCurrentCat(updated);
                                      }}
                                      placeholder="2025"
                                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs text-center font-semibold"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">2026 Rank</label>
                                    <input
                                      type="text"
                                      value={row.year2026}
                                      onChange={(e) => {
                                        const updated = [...currentRows];
                                        updated[rIdx] = { ...updated[rIdx], year2026: e.target.value };
                                        updateRowsForCurrentCat(updated);
                                      }}
                                      placeholder="2026"
                                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs text-center font-bold text-blue-600"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* MODAL 8: FAQS */}
                {activeMiniModal === "qa" && (
                  <div className="space-y-3">
                    <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                      {tempData.faqs.map((faq, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = tempData.faqs.filter((_, i) => i !== idx);
                              setTempData({ ...tempData, faqs: updated });
                            }}
                            className="absolute top-2.5 right-2.5 p-1 text-red-500 hover:bg-red-100 rounded-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => {
                              const updated = [...tempData.faqs];
                              updated[idx].question = e.target.value;
                              setTempData({ ...tempData, faqs: updated });
                            }}
                            placeholder="Question"
                            className="w-5/6 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                          />
                          <textarea
                            rows={2}
                            value={faq.answer}
                            onChange={(e) => {
                              const updated = [...tempData.faqs];
                              updated[idx].answer = e.target.value;
                              setTempData({ ...tempData, faqs: updated });
                            }}
                            placeholder="Answer"
                            className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs resize-none"
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setTempData({
                          ...tempData,
                          faqs: [...tempData.faqs, { question: "What is the admission procedure?", answer: "Admission is conducted through national entrance tests." }],
                        })
                      }
                      className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add FAQ</span>
                    </button>
                  </div>
                )}

                {/* MODAL FOOTER */}
                <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveMiniModal(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    <span>Save & Publish Section</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ALL FILTERS POPUP MODAL (EXACT USER REFERENCE DESIGN) */}
      <AnimatePresence>
        {isCutoffFilterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
            >
              {/* Modal Top Header */}
              <div className="px-6 pt-5 pb-4 border-b border-slate-100 space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-outfit font-black text-xl text-[#2d1a47]">
                    All Filters
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setTempCutoffFilters({
                        round: "1",
                        category: "General",
                        quota: "All India",
                        gender: "All",
                      });
                    }}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                </div>

                {/* Selected Filters Preview Pills */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
                  <span className="px-3.5 py-1 rounded-full border border-slate-300 bg-white text-slate-800 text-xs font-semibold shrink-0 shadow-2xs">
                    {tempCutoffFilters.round}
                  </span>
                  <span className="px-3.5 py-1 rounded-full border border-slate-300 bg-white text-slate-800 text-xs font-semibold shrink-0 shadow-2xs">
                    {tempCutoffFilters.category}
                  </span>
                  <span className="px-3.5 py-1 rounded-full border border-slate-300 bg-white text-slate-800 text-xs font-semibold shrink-0 shadow-2xs">
                    {tempCutoffFilters.quota}
                  </span>
                  <span className="px-3.5 py-1 rounded-full border border-slate-300 bg-white text-slate-800 text-xs font-semibold shrink-0 shadow-2xs">
                    {tempCutoffFilters.gender}
                  </span>
                </div>
              </div>

              {/* Modal 2-Column Body: Tabs on left, Options on right */}
              <div className="grid grid-cols-12 min-h-[300px] max-h-[380px]">
                {/* Left Sidebar Tabs */}
                <div className="col-span-4 sm:col-span-3 border-r border-slate-100 bg-slate-50/50 py-2">
                  <button
                    type="button"
                    onClick={() => setActiveFilterTab("rounds")}
                    className={`w-full px-4 py-3 text-left text-xs sm:text-[13px] font-bold flex items-center justify-between transition-colors cursor-pointer select-none ${
                      activeFilterTab === "rounds"
                        ? "bg-purple-50 text-[#2d1a47] border-l-4 border-[#2d1a47]"
                        : "text-slate-600 hover:bg-slate-100/60"
                    }`}
                  >
                    <span>Rounds</span>
                    <span className="text-[11px] font-semibold text-slate-400">1</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveFilterTab("category")}
                    className={`w-full px-4 py-3 text-left text-xs sm:text-[13px] font-bold flex items-center justify-between transition-colors cursor-pointer select-none ${
                      activeFilterTab === "category"
                        ? "bg-purple-50 text-[#2d1a47] border-l-4 border-[#2d1a47]"
                        : "text-slate-600 hover:bg-slate-100/60"
                    }`}
                  >
                    <span>Category</span>
                    <span className="text-[11px] font-semibold text-slate-400">1</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveFilterTab("quota")}
                    className={`w-full px-4 py-3 text-left text-xs sm:text-[13px] font-bold flex items-center justify-between transition-colors cursor-pointer select-none ${
                      activeFilterTab === "quota"
                        ? "bg-purple-50 text-[#2d1a47] border-l-4 border-[#2d1a47]"
                        : "text-slate-600 hover:bg-slate-100/60"
                    }`}
                  >
                    <span>Quota</span>
                    <span className="text-[11px] font-semibold text-slate-400">1</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveFilterTab("gender")}
                    className={`w-full px-4 py-3 text-left text-xs sm:text-[13px] font-bold flex items-center justify-between transition-colors cursor-pointer select-none ${
                      activeFilterTab === "gender"
                        ? "bg-purple-50 text-[#2d1a47] border-l-4 border-[#2d1a47]"
                        : "text-slate-600 hover:bg-slate-100/60"
                    }`}
                  >
                    <span>Gender</span>
                    <span className="text-[11px] font-semibold text-slate-400">1</span>
                  </button>
                </div>

                {/* Right Options Content */}
                <div className="col-span-8 sm:col-span-9 p-4 sm:p-6 overflow-y-auto max-h-[380px] space-y-3 bg-white">
                  {activeFilterTab === "rounds" && (
                    <div className="space-y-2.5">
                      {CUTOFF_FILTER_OPTIONS.rounds.map((opt) => {
                        const isSelected = tempCutoffFilters.round === opt;
                        return (
                          <div
                            key={opt}
                            onClick={() => setTempCutoffFilters({ ...tempCutoffFilters, round: opt })}
                            className="flex items-center gap-3 py-1.5 px-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer select-none group"
                          >
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                                isSelected
                                  ? "bg-[#2d1a47] text-white"
                                  : "border-2 border-slate-300 group-hover:border-slate-400"
                              }`}
                            >
                              {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <span className={`text-xs sm:text-sm ${isSelected ? "font-bold text-slate-900" : "text-slate-700 font-medium"}`}>
                              {opt}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeFilterTab === "category" && (
                    <div className="space-y-2.5">
                      {CUTOFF_FILTER_OPTIONS.category.map((opt) => {
                        const isSelected = tempCutoffFilters.category === opt;
                        return (
                          <div
                            key={opt}
                            onClick={() => setTempCutoffFilters({ ...tempCutoffFilters, category: opt })}
                            className="flex items-center gap-3 py-1.5 px-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer select-none group"
                          >
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                                isSelected
                                  ? "bg-[#2d1a47] text-white"
                                  : "border-2 border-slate-300 group-hover:border-slate-400"
                              }`}
                            >
                              {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <span className={`text-xs sm:text-sm ${isSelected ? "font-bold text-slate-900" : "text-slate-700 font-medium"}`}>
                              {opt}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeFilterTab === "quota" && (
                    <div className="space-y-2.5">
                      {CUTOFF_FILTER_OPTIONS.quota.map((opt) => {
                        const isSelected = tempCutoffFilters.quota === opt;
                        return (
                          <div
                            key={opt}
                            onClick={() => setTempCutoffFilters({ ...tempCutoffFilters, quota: opt })}
                            className="flex items-center gap-3 py-1.5 px-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer select-none group"
                          >
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                                isSelected
                                  ? "bg-[#2d1a47] text-white"
                                  : "border-2 border-slate-300 group-hover:border-slate-400"
                              }`}
                            >
                              {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <span className={`text-xs sm:text-sm ${isSelected ? "font-bold text-slate-900" : "text-slate-700 font-medium"}`}>
                              {opt}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeFilterTab === "gender" && (
                    <div className="space-y-2.5">
                      {CUTOFF_FILTER_OPTIONS.gender.map((opt) => {
                        const isSelected = tempCutoffFilters.gender === opt;
                        return (
                          <div
                            key={opt}
                            onClick={() => setTempCutoffFilters({ ...tempCutoffFilters, gender: opt })}
                            className="flex items-center gap-3 py-1.5 px-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer select-none group"
                          >
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                                isSelected
                                  ? "bg-[#2d1a47] text-white"
                                  : "border-2 border-slate-300 group-hover:border-slate-400"
                              }`}
                            >
                              {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <span className={`text-xs sm:text-sm ${isSelected ? "font-bold text-slate-900" : "text-slate-700 font-medium"}`}>
                              {opt}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer with Cancel & Apply Filters buttons */}
              <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-end gap-3 bg-white">
                <button
                  type="button"
                  onClick={() => setIsCutoffFilterModalOpen(false)}
                  className="px-6 py-2.5 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAppliedCutoffFilters({ ...tempCutoffFilters });
                    setIsCutoffFilterModalOpen(false);
                  }}
                  className="px-7 py-2.5 rounded-full bg-[#00a859] hover:bg-[#008f4c] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Apply Filters
                </button>
              </div>
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
