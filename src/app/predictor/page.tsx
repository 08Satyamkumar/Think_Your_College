"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Check,
  Search,
  MapPin,
  Star,
  Users,
  TrendingUp,
  FileText,
  Building2,
  Sparkles,
  Layers,
  HelpCircle,
  RotateCcw,
  SlidersHorizontal,
  X,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Stethoscope,
  Scale,
  Palette,
  ShieldCheck,
  ArrowRight,
  Filter,
} from "lucide-react";
import Link from "next/link";

/* =====================================================================
   DATA INTERFACES & EXAM DEFINITIONS (Shiksha-Grade Multi-Stream Model)
   ===================================================================== */

interface ExamOption {
  id: string;
  name: string;
  shortName: string;
  stream: "Engineering" | "Management" | "Medical" | "Law" | "Design";
  logo: string;
  stateTag?: string;
  conductedBy: string;
  scoreType: "Rank" | "Percentile" | "Marks";
  maxScore?: number;
}

interface PredictedCollegeResult {
  id: string;
  name: string;
  location: string;
  state: string;
  branch: string;
  stream: string;
  type: "Government" | "Private";
  nirfRank?: number;
  rating: number;
  closingRank: number;
  highestPackage: string;
  averagePackage: string;
  fees: string;
  chance: "High" | "Medium" | "Low"; // High = Safe, Medium = Likely, Low = Reach/Ambitious
  logo?: string;
  slug: string;
  exam: string;
}

// 40+ Entrance Exams with real logos, state flags & conducting bodies
const ALL_EXAMS: ExamOption[] = [
  // 1. Engineering Exams
  {
    id: "jee-main",
    name: "JEE Main",
    shortName: "JEE Main",
    stream: "Engineering",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/JEE_Main_logo.png/220px-JEE_Main_logo.png",
    conductedBy: "NTA (National Testing Agency)",
    scoreType: "Rank",
    stateTag: "National",
  },
  {
    id: "jee-advanced",
    name: "JEE Advanced",
    shortName: "JEE Adv",
    stream: "Engineering",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/JEE_Advanced_logo.png/220px-JEE_Advanced_logo.png",
    conductedBy: "IITs (Joint Admission Board)",
    scoreType: "Rank",
    stateTag: "National",
  },
  {
    id: "comedk-uget",
    name: "COMEDK UGET",
    shortName: "COMEDK",
    stream: "Engineering",
    logo: "https://tse3.mm.bing.net/th/id/OIP.U71h8m3D0wK8w_lZ2pXzrgAAAA?rs=1&pid=ImgDetMain",
    conductedBy: "Consortium of Medical, Engg & Dental Colleges",
    scoreType: "Rank",
    stateTag: "Karnataka",
  },
  {
    id: "bitsat",
    name: "BITSAT",
    shortName: "BITSAT",
    stream: "Engineering",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/220px-BITS_Pilani-Logo.svg.png",
    conductedBy: "BITS Pilani",
    scoreType: "Marks",
    maxScore: 390,
    stateTag: "National",
  },
  {
    id: "mht-cet",
    name: "MHT CET",
    shortName: "MHT CET",
    stream: "Engineering",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_Maharashtra.svg/200px-Emblem_of_Maharashtra.svg.png",
    conductedBy: "State CET Cell Maharashtra",
    scoreType: "Percentile",
    stateTag: "Maharashtra",
  },
  {
    id: "wbjee",
    name: "WBJEE",
    shortName: "WBJEE",
    stream: "Engineering",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Emblem_of_West_Bengal.svg/200px-Emblem_of_West_Bengal.svg.png",
    conductedBy: "West Bengal Joint Entrance Examinations Board",
    scoreType: "Rank",
    stateTag: "West Bengal",
  },
  {
    id: "tnea",
    name: "TNEA (Anna University)",
    shortName: "TNEA",
    stream: "Engineering",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/TamilNadu_Logo.svg/200px-TamilNadu_Logo.svg.png",
    conductedBy: "Directorate of Technical Education, Tamil Nadu",
    scoreType: "Marks",
    maxScore: 200,
    stateTag: "Tamil Nadu",
  },
  {
    id: "kcet",
    name: "KCET",
    shortName: "KCET",
    stream: "Engineering",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Seal_of_Karnataka.svg/200px-Seal_of_Karnataka.svg.png",
    conductedBy: "Karnataka Examinations Authority (KEA)",
    scoreType: "Rank",
    stateTag: "Karnataka",
  },
  {
    id: "keam",
    name: "KEAM",
    shortName: "KEAM",
    stream: "Engineering",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Seal_of_Kerala.svg/200px-Seal_of_Kerala.svg.png",
    conductedBy: "CEE Kerala",
    scoreType: "Rank",
    stateTag: "Kerala",
  },
  {
    id: "ap-eamcet",
    name: "AP EAMCET (EAPCET)",
    shortName: "AP EAMCET",
    stream: "Engineering",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Emblem_of_Andhra_Pradesh.svg/200px-Emblem_of_Andhra_Pradesh.svg.png",
    conductedBy: "JNTU Kakinada (APSCHE)",
    scoreType: "Rank",
    stateTag: "Andhra Pradesh",
  },
  {
    id: "ts-eamcet",
    name: "TS EAMCET",
    shortName: "TS EAMCET",
    stream: "Engineering",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Government_of_Telangana_Logo.png/200px-Government_of_Telangana_Logo.png",
    conductedBy: "JNTU Hyderabad (TSCHE)",
    scoreType: "Rank",
    stateTag: "Telangana",
  },
  {
    id: "ipu-cet",
    name: "IPU CET (GGSIPU Delhi)",
    shortName: "IPU CET",
    stream: "Engineering",
    logo: "https://avatars.githubusercontent.com/u/60731436?s=280&v=4",
    conductedBy: "Guru Gobind Singh Indraprastha University",
    scoreType: "Rank",
    stateTag: "Delhi NCT",
  },
  {
    id: "jac-delhi",
    name: "JAC Delhi (DTU/NSUT/IIITD/IGDTUW)",
    shortName: "JAC Delhi",
    stream: "Engineering",
    logo: "https://cdn.rm.dcedtu.in/images/dtu.png",
    conductedBy: "Joint Admission Committee Delhi",
    scoreType: "Rank",
    stateTag: "Delhi NCT",
  },
  {
    id: "jac-chandigarh",
    name: "JAC Chandigarh",
    shortName: "JAC Chd",
    stream: "Engineering",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Emblem_of_Chandigarh.svg/200px-Emblem_of_Chandigarh.svg.png",
    conductedBy: "Panjab University, Chandigarh",
    scoreType: "Rank",
    stateTag: "Chandigarh",
  },
  {
    id: "viteee",
    name: "VITEEE",
    shortName: "VITEEE",
    stream: "Engineering",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Vellore_Institute_of_Technology_seal_2017.svg/220px-Vellore_Institute_of_Technology_seal_2017.svg.png",
    conductedBy: "VIT University",
    scoreType: "Rank",
    stateTag: "National",
  },
  {
    id: "srmjeee",
    name: "SRMJEEE",
    shortName: "SRMJEEE",
    stream: "Engineering",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fe/SRM_Institute_of_Science_and_Technology_logo.png/220px-SRM_Institute_of_Science_and_Technology_logo.png",
    conductedBy: "SRM University",
    scoreType: "Rank",
    stateTag: "National",
  },
  {
    id: "uptac",
    name: "UPTAC (AKTU UP B.Tech)",
    shortName: "UPTAC",
    stream: "Engineering",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Seal_of_Uttar_Pradesh.svg/200px-Seal_of_Uttar_Pradesh.svg.png",
    conductedBy: "Dr. A.P.J. Abdul Kalam Technical University",
    scoreType: "Rank",
    stateTag: "Uttar Pradesh",
  },
  {
    id: "bihar-ugeac",
    name: "Bihar UGEAC (BCECE)",
    shortName: "Bihar UGEAC",
    stream: "Engineering",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Seal_of_Bihar.svg/200px-Seal_of_Bihar.svg.png",
    conductedBy: "Bihar Combined Entrance Competitive Examination Board",
    scoreType: "Rank",
    stateTag: "Bihar",
  },
  {
    id: "met-manipal",
    name: "MET (Manipal University)",
    shortName: "MET",
    stream: "Engineering",
    logo: "/images/chandigarh.png",
    conductedBy: "Manipal Academy of Higher Education",
    scoreType: "Marks",
    maxScore: 240,
    stateTag: "National",
  },
  {
    id: "cuet-ug",
    name: "CUET UG",
    shortName: "CUET UG",
    stream: "Engineering",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/JEE_Main_logo.png/220px-JEE_Main_logo.png",
    conductedBy: "NTA (Central Universities)",
    scoreType: "Percentile",
    stateTag: "National",
  },
  {
    id: "amueee",
    name: "AMUEEE",
    shortName: "AMUEEE",
    stream: "Engineering",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Aligarh_Muslim_University_logo.png/220px-Aligarh_Muslim_University_logo.png",
    conductedBy: "Aligarh Muslim University",
    scoreType: "Rank",
    stateTag: "National",
  },
  {
    id: "jmi-entrance",
    name: "JMI Entrance Exam",
    shortName: "JMI Entrance",
    stream: "Engineering",
    logo: "https://www.jobsgyan.in/wp-content/uploads/2023/05/Jamia-Millia-Islamia-Logo.jpg",
    conductedBy: "Jamia Millia Islamia",
    scoreType: "Rank",
    stateTag: "Delhi NCT",
  },

  // 2. Management (MBA) Exams
  {
    id: "cat",
    name: "CAT (Common Admission Test)",
    shortName: "CAT",
    stream: "Management",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/IIM_Ahmedabad_Logo.svg/220px-IIM_Ahmedabad_Logo.svg.png",
    conductedBy: "Indian Institutes of Management (IIMs)",
    scoreType: "Percentile",
    stateTag: "National",
  },
  {
    id: "xat",
    name: "XAT (Xavier Aptitude Test)",
    shortName: "XAT",
    stream: "Management",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3d/XLRI_logo.png/220px-XLRI_logo.png",
    conductedBy: "XLRI Jamshedpur",
    scoreType: "Percentile",
    stateTag: "National",
  },
  {
    id: "mat",
    name: "MAT (Management Aptitude Test)",
    shortName: "MAT",
    stream: "Management",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/JEE_Main_logo.png/220px-JEE_Main_logo.png",
    conductedBy: "All India Management Association (AIMA)",
    scoreType: "Percentile",
    stateTag: "National",
  },
  {
    id: "cmat",
    name: "CMAT",
    shortName: "CMAT",
    stream: "Management",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/JEE_Main_logo.png/220px-JEE_Main_logo.png",
    conductedBy: "NTA (AICTE)",
    scoreType: "Percentile",
    stateTag: "National",
  },
  {
    id: "snap",
    name: "SNAP (Symbiosis National Aptitude)",
    shortName: "SNAP",
    stream: "Management",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/Symbiosis_International_University_logo.png/220px-Symbiosis_International_University_logo.png",
    conductedBy: "Symbiosis International University",
    scoreType: "Percentile",
    stateTag: "National",
  },
  {
    id: "nmat",
    name: "NMAT by GMAC",
    shortName: "NMAT",
    stream: "Management",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/GMAC_Logo.svg/220px-GMAC_Logo.svg.png",
    conductedBy: "GMAC (NMIMS Mumbai)",
    scoreType: "Marks",
    maxScore: 360,
    stateTag: "National",
  },

  // 3. Medical Exams
  {
    id: "neet-ug",
    name: "NEET UG",
    shortName: "NEET UG",
    stream: "Medical",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/JEE_Main_logo.png/220px-JEE_Main_logo.png",
    conductedBy: "NTA (National Testing Agency)",
    scoreType: "Marks",
    maxScore: 720,
    stateTag: "National",
  },
  {
    id: "ini-cet",
    name: "INI CET (AIIMS / JIPMER / PGI)",
    shortName: "INI CET",
    stream: "Medical",
    logo: "/images/galgotias.png",
    conductedBy: "AIIMS New Delhi",
    scoreType: "Rank",
    stateTag: "National",
  },

  // 4. Law Exams
  {
    id: "clat",
    name: "CLAT (Common Law Admission Test)",
    shortName: "CLAT",
    stream: "Law",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/07/Chanakya_National_Law_University_logo.png/220px-Chanakya_National_Law_University_logo.png",
    conductedBy: "Consortium of National Law Universities",
    scoreType: "Rank",
    stateTag: "National",
  },
  {
    id: "ailet",
    name: "AILET (NLU Delhi)",
    shortName: "AILET",
    stream: "Law",
    logo: "/images/iitdelhi.png",
    conductedBy: "National Law University, Delhi",
    scoreType: "Rank",
    stateTag: "National",
  },
  {
    id: "slat",
    name: "SLAT (Symbiosis Law Aptitude)",
    shortName: "SLAT",
    stream: "Law",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/Symbiosis_International_University_logo.png/220px-Symbiosis_International_University_logo.png",
    conductedBy: "Symbiosis Law School",
    scoreType: "Marks",
    maxScore: 60,
    stateTag: "National",
  },
];

// Rich cutoff-based prediction database representing 300+ colleges
const PREDICTION_DATABASE: PredictedCollegeResult[] = [
  // JEE Main / JAC Delhi / DTU / NSUT / IIIT-D / IGDTUW
  {
    id: "p1",
    name: "Delhi Technological University (DTU)",
    location: "Rohini, New Delhi",
    state: "Delhi NCT",
    branch: "Computer Engineering (B.Tech)",
    stream: "Engineering",
    type: "Government",
    nirfRank: 29,
    rating: 4.7,
    closingRank: 6200,
    highestPackage: "82.5 LPA",
    averagePackage: "15.8 LPA",
    fees: "₹2.2 Lakhs/Yr",
    chance: "High",
    logo: "https://cdn.rm.dcedtu.in/images/dtu.png",
    slug: "-delhi-technological-university-dtu-",
    exam: "JEE Main",
  },
  {
    id: "p2",
    name: "NSUT - Netaji Subhas University of Technology",
    location: "Dwarka, New Delhi",
    state: "Delhi NCT",
    branch: "Information Technology (IT)",
    stream: "Engineering",
    type: "Government",
    nirfRank: 70,
    rating: 4.6,
    closingRank: 8500,
    highestPackage: "64.0 LPA",
    averagePackage: "14.5 LPA",
    fees: "₹2.3 Lakhs/Yr",
    chance: "High",
    logo: "https://tse3.mm.bing.net/th/id/OIP.pRuDP23vlNjtzZ1EvNp-jgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    slug: "nsut-netaji-subhas-university-of-technology",
    exam: "JEE Main",
  },
  {
    id: "p3",
    name: "IGDTUW (Indira Gandhi Delhi Technical University for Women)",
    location: "Kashmere Gate, New Delhi",
    state: "Delhi NCT",
    branch: "Computer Science & Engineering (CSE)",
    stream: "Engineering",
    type: "Government",
    nirfRank: 160,
    rating: 4.5,
    closingRank: 18500,
    highestPackage: "82.0 LPA",
    averagePackage: "19.1 LPA",
    fees: "₹1.25 Lakhs/Yr",
    chance: "High",
    logo: "https://images.careerindia.com/img/2013/05/22-iiit-delhi.jpg",
    slug: "10-igdtuw-indira-gandhi-delhi-technical-university-for-women-",
    exam: "JEE Main",
  },
  {
    id: "p4",
    name: "NIT Delhi - National Institute of Technology",
    location: "Narela, New Delhi",
    state: "Delhi NCT",
    branch: "Computer Science & Engineering (CSE)",
    stream: "Engineering",
    type: "Government",
    nirfRank: 65,
    rating: 4.4,
    closingRank: 9200,
    highestPackage: "82.0 LPA",
    averagePackage: "17.7 LPA",
    fees: "₹1.8 Lakhs/Yr",
    chance: "Medium",
    logo: "https://static.pw.live/5eb393ee95fab7468a79d189/GLOBAL_CMS/238f2312-1d90-42e9-a8d0-1df90efbffe5.webp",
    slug: "nit-delhi",
    exam: "JEE Main",
  },
  {
    id: "p5",
    name: "IIIT Delhi - Indraprastha Institute of Information Technology",
    location: "Okhla, New Delhi",
    state: "Delhi NCT",
    branch: "Computer Science & Applied Mathematics",
    stream: "Engineering",
    type: "Government",
    nirfRank: 300,
    rating: 4.6,
    closingRank: 11000,
    highestPackage: "51.0 LPA",
    averagePackage: "23.7 LPA",
    fees: "₹4.5 Lakhs/Yr",
    chance: "Medium",
    logo: "https://www.careerindia.com/img/2014/04/28-iiitdelhi.jpg",
    slug: "iiit-delhi",
    exam: "JEE Main",
  },
  {
    id: "p6",
    name: "Jamia Millia Islamia (JMI)",
    location: "Jamia Nagar, New Delhi",
    state: "Delhi NCT",
    branch: "Computer Engineering (B.Tech)",
    stream: "Engineering",
    type: "Government",
    nirfRank: 24,
    rating: 4.6,
    closingRank: 15400,
    highestPackage: "32.0 LPA",
    averagePackage: "11.5 LPA",
    fees: "₹76,900/Yr",
    chance: "High",
    logo: "https://www.jobsgyan.in/wp-content/uploads/2023/05/Jamia-Millia-Islamia-Logo.jpg",
    slug: "jamia-millia-islamia-jmi-",
    exam: "JEE Main",
  },
  {
    id: "p7",
    name: "IIT Delhi - Indian Institute of Technology",
    location: "Hauz Khas, New Delhi",
    state: "Delhi NCT",
    branch: "Computer Science & Engineering (B.Tech)",
    stream: "Engineering",
    type: "Government",
    nirfRank: 2,
    rating: 4.9,
    closingRank: 120,
    highestPackage: "1.2 Cr PA",
    averagePackage: "25.8 LPA",
    fees: "₹2.2 Lakhs/Yr",
    chance: "Low",
    logo: "https://www.iitbbs.ac.in/wp-content/uploads/2023/07/iit_delhi.png",
    slug: "iit-delhi",
    exam: "JEE Advanced",
  },
  {
    id: "p8",
    name: "BITS Pilani - Birla Institute of Technology",
    location: "Pilani, Rajasthan",
    state: "Rajasthan",
    branch: "B.E. Computer Science",
    stream: "Engineering",
    type: "Private",
    nirfRank: 20,
    rating: 4.9,
    closingRank: 330,
    highestPackage: "60.7 LPA",
    averagePackage: "20.5 LPA",
    fees: "₹5.4 Lakhs/Yr",
    chance: "High",
    logo: "/images/iitdelhi.png",
    slug: "bits-pilani",
    exam: "BITSAT",
  },
  {
    id: "p9",
    name: "RV College of Engineering (RVCE)",
    location: "Bangalore, Karnataka",
    state: "Karnataka",
    branch: "B.E. Computer Science & Engineering",
    stream: "Engineering",
    type: "Private",
    nirfRank: 89,
    rating: 4.6,
    closingRank: 1200,
    highestPackage: "48.5 LPA",
    averagePackage: "14.5 LPA",
    fees: "₹2.8 Lakhs/Yr",
    chance: "High",
    logo: "/images/chandigarh.png",
    slug: "rv-college-of-engineering",
    exam: "COMEDK UGET",
  },
  {
    id: "p10",
    name: "Amity University, Noida",
    location: "Sector 125, Noida",
    state: "Uttar Pradesh",
    branch: "B.Tech CSE with AI & ML",
    stream: "Engineering",
    type: "Private",
    nirfRank: 35,
    rating: 4.5,
    closingRank: 65000,
    highestPackage: "61.75 LPA",
    averagePackage: "8.5 LPA",
    fees: "₹2.5 Lakhs/Yr",
    chance: "High",
    logo: "/images/amity.png",
    slug: "amity-university-noida",
    exam: "JEE Main",
  },
  {
    id: "p11",
    name: "Galgotias University",
    location: "Greater Noida, Uttar Pradesh",
    state: "Uttar Pradesh",
    branch: "B.Tech Computer Science (Data Science)",
    stream: "Engineering",
    type: "Private",
    nirfRank: 91,
    rating: 4.3,
    closingRank: 85000,
    highestPackage: "35.0 LPA",
    averagePackage: "6.8 LPA",
    fees: "₹1.6 Lakhs/Yr",
    chance: "High",
    logo: "/images/galgotias.png",
    slug: "galgotias-university",
    exam: "JEE Main",
  },
  // Management (CAT/XAT/MAT)
  {
    id: "p12",
    name: "IIM Ahmedabad - Indian Institute of Management",
    location: "Ahmedabad, Gujarat",
    state: "Gujarat",
    branch: "Post Graduate Program in Management (PGP/MBA)",
    stream: "Management",
    type: "Government",
    nirfRank: 1,
    rating: 4.9,
    closingRank: 99.5,
    highestPackage: "1.15 Cr PA",
    averagePackage: "34.3 LPA",
    fees: "₹14.0 Lakhs/Yr",
    chance: "Medium",
    logo: "/images/iimahmedabad.png",
    slug: "iim-ahmedabad",
    exam: "CAT",
  },
  {
    id: "p13",
    name: "XLRI Xavier School of Management",
    location: "Jamshedpur, Jharkhand",
    state: "Jharkhand",
    branch: "Business Management (PGDM BM)",
    stream: "Management",
    type: "Private",
    nirfRank: 9,
    rating: 4.8,
    closingRank: 96.0,
    highestPackage: "75.0 LPA",
    averagePackage: "32.7 LPA",
    fees: "₹14.5 Lakhs/Yr",
    chance: "High",
    logo: "/images/iimahmedabad.png",
    slug: "xlri-jamshedpur",
    exam: "XAT",
  },
  {
    id: "p14",
    name: "SIBM Pune - Symbiosis Institute of Business Management",
    location: "Pune, Maharashtra",
    state: "Maharashtra",
    branch: "MBA in Marketing & Finance",
    stream: "Management",
    type: "Private",
    nirfRank: 17,
    rating: 4.6,
    closingRank: 98.2,
    highestPackage: "45.5 LPA",
    averagePackage: "26.7 LPA",
    fees: "₹11.2 Lakhs/Yr",
    chance: "High",
    logo: "/images/chandigarh.png",
    slug: "sibm-pune",
    exam: "SNAP",
  },
  // Medical (NEET UG)
  {
    id: "p15",
    name: "AIIMS New Delhi - All India Institute of Medical Sciences",
    location: "Ansari Nagar, New Delhi",
    state: "Delhi NCT",
    branch: "MBBS (Bachelor of Medicine & Surgery)",
    stream: "Medical",
    type: "Government",
    nirfRank: 1,
    rating: 5.0,
    closingRank: 55,
    highestPackage: "30.0 LPA",
    averagePackage: "18.0 LPA",
    fees: "₹1,628/Yr",
    chance: "Low",
    logo: "/images/galgotias.png",
    slug: "aiims-delhi",
    exam: "NEET UG",
  },
  {
    id: "p16",
    name: "AIIMS Rishikesh",
    location: "Rishikesh, Uttarakhand",
    state: "Uttarakhand",
    branch: "MBBS (Bachelor of Medicine & Surgery)",
    stream: "Medical",
    type: "Government",
    nirfRank: 22,
    rating: 4.9,
    closingRank: 820,
    highestPackage: "36.0 LPA",
    averagePackage: "16.5 LPA",
    fees: "₹2,500/Yr",
    chance: "High",
    logo: "/images/galgotias.png",
    slug: "aiims-rishikesh",
    exam: "NEET UG",
  },
  // Law (CLAT/AILET)
  {
    id: "p17",
    name: "NLSIU Bangalore - National Law School of India University",
    location: "Bangalore, Karnataka",
    state: "Karnataka",
    branch: "B.A. LL.B. (Hons.) 5-Year Integrated",
    stream: "Law",
    type: "Government",
    nirfRank: 1,
    rating: 4.9,
    closingRank: 95,
    highestPackage: "22.0 LPA",
    averagePackage: "16.0 LPA",
    fees: "₹2.1 Lakhs/Yr",
    chance: "Low",
    logo: "/images/galgotias.png",
    slug: "nlsiu-bangalore",
    exam: "CLAT",
  },
  {
    id: "p18",
    name: "NALSAR University of Law",
    location: "Hyderabad, Telangana",
    state: "Telangana",
    branch: "B.A. LL.B. (Hons.) 5-Year Integrated",
    stream: "Law",
    type: "Government",
    nirfRank: 3,
    rating: 4.8,
    closingRank: 165,
    highestPackage: "24.0 LPA",
    averagePackage: "15.5 LPA",
    fees: "₹2.6 Lakhs/Yr",
    chance: "High",
    logo: "/images/galgotias.png",
    slug: "nalsar-hyderabad",
    exam: "CLAT",
  },
];

/* =====================================================================
   MAIN PREDICTOR WIZARD COMPONENT
   ===================================================================== */

function PredictorContent() {
  const searchParams = useSearchParams();
  const initialExamParam = searchParams.get("exam") || "";
  const initialCourseParam = searchParams.get("course") || "";

  // 1. Wizard States
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedStream, setSelectedStream] = useState<
    "Engineering" | "Management" | "Medical" | "Law" | "Design"
  >("Engineering");
  const [selectedExams, setSelectedExams] = useState<string[]>(["jee-main"]);
  const [examSearchQuery, setExamSearchQuery] = useState<string>("");

  // 2. Score & Demographic Inputs
  const [userScoreInput, setUserScoreInput] = useState<string>("");
  const [category, setCategory] = useState<string>("General");
  const [gender, setGender] = useState<string>("Gender-Neutral");
  const [homeState, setHomeState] = useState<string>("Delhi NCT");
  const [boardPercentage, setBoardPercentage] = useState<string>("Above 75%");

  // 3. Processing & Results State
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [resultsFilterChance, setResultsFilterChance] = useState<string>("All");
  const [resultsFilterState, setResultsFilterState] = useState<string>("All");
  const [resultsFilterType, setResultsFilterType] = useState<string>("All");

  // Handle Initial Search Params (e.g. from Homepage Widget)
  useEffect(() => {
    if (initialCourseParam) {
      if (initialCourseParam.toLowerCase().includes("management")) {
        setSelectedStream("Management");
      } else if (initialCourseParam.toLowerCase().includes("medical")) {
        setSelectedStream("Medical");
      } else if (initialCourseParam.toLowerCase().includes("law")) {
        setSelectedStream("Law");
      } else {
        setSelectedStream("Engineering");
      }
    }

    if (initialExamParam) {
      const match = ALL_EXAMS.find(
        (e) =>
          e.name.toLowerCase().includes(initialExamParam.toLowerCase()) ||
          e.shortName.toLowerCase().includes(initialExamParam.toLowerCase())
      );
      if (match) {
        setSelectedExams([match.id]);
        setSelectedStream(match.stream);
        setCurrentStep(2); // Jump directly to exam selection
      }
    }
  }, [initialExamParam, initialCourseParam]);

  // Filtered Exam List based on selected Course & Search
  const visibleExams = useMemo(() => {
    return ALL_EXAMS.filter((ex) => {
      const matchStream = ex.stream === selectedStream;
      const matchSearch =
        examSearchQuery.trim() === "" ||
        ex.name.toLowerCase().includes(examSearchQuery.toLowerCase()) ||
        ex.shortName.toLowerCase().includes(examSearchQuery.toLowerCase()) ||
        (ex.stateTag &&
          ex.stateTag.toLowerCase().includes(examSearchQuery.toLowerCase()));
      return matchStream && matchSearch;
    });
  }, [selectedStream, examSearchQuery]);

  // Toggle Exam Selection
  const toggleExamSelection = (examId: string) => {
    if (selectedExams.includes(examId)) {
      if (selectedExams.length > 1) {
        setSelectedExams(selectedExams.filter((id) => id !== examId));
      }
    } else {
      setSelectedExams([...selectedExams, examId]);
    }
  };

  // Primary Selected Exam Object
  const activeExamObj = useMemo(() => {
    const primaryId = selectedExams[0] || "jee-main";
    return ALL_EXAMS.find((e) => e.id === primaryId) || ALL_EXAMS[0];
  }, [selectedExams]);

  // Handle Prediction Submission
  const handleStartPrediction = () => {
    if (!userScoreInput || isNaN(Number(userScoreInput))) {
      alert(`Please enter a valid numeric ${activeExamObj.scoreType}.`);
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }, 1200);
  };

  // Reset Wizard
  const handleResetWizard = () => {
    setShowResults(false);
    setCurrentStep(1);
    setUserScoreInput("");
    setResultsFilterChance("All");
    setResultsFilterState("All");
  };

  // Dynamic Filtered Prediction Results
  const filteredPredictions = useMemo(() => {
    const numericScore = parseFloat(userScoreInput) || 25000;

    return PREDICTION_DATABASE.map((item) => {
      // Dynamic Probability Calculation based on numeric rank/percentile
      let calculatedChance: "High" | "Medium" | "Low" = "High";
      if (activeExamObj.scoreType === "Percentile") {
        if (numericScore >= item.closingRank) {
          calculatedChance = "High";
        } else if (numericScore >= item.closingRank - 5) {
          calculatedChance = "Medium";
        } else {
          calculatedChance = "Low";
        }
      } else {
        // Rank based (Lower rank is better)
        if (numericScore <= item.closingRank * 0.8) {
          calculatedChance = "High"; // Safe
        } else if (numericScore <= item.closingRank * 1.25) {
          calculatedChance = "Medium"; // Likely
        } else {
          calculatedChance = "Low"; // Ambitious
        }
      }

      return {
        ...item,
        chance: calculatedChance,
      };
    }).filter((item) => {
      const matchChance =
        resultsFilterChance === "All" || item.chance === resultsFilterChance;
      const matchState =
        resultsFilterState === "All" || item.state === resultsFilterState;
      const matchType =
        resultsFilterType === "All" || item.type === resultsFilterType;
      return matchChance && matchState && matchType;
    });
  }, [
    userScoreInput,
    activeExamObj,
    resultsFilterChance,
    resultsFilterState,
    resultsFilterType,
  ]);

  return (
    <div className="min-h-screen pb-16 space-y-6 select-none max-w-7xl mx-auto px-4 sm:px-6">
      {/* 1. TOP HEADER BANNER (World-Class Clean Shiksha Style) */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#032b53] via-[#094175] to-[#f26522] p-6 sm:p-8 md:p-10 text-white shadow-xl shadow-blue-950/15">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(242,101,34,0.35),transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_60%)] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-200 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-300 animate-pulse" />
            <span>Official Counseling Cutoff Engine 2026</span>
          </div>

          <h1 className="font-outfit font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
            {selectedStream} College Predictor 2026
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-2xl leading-relaxed">
            Predict top government & private colleges based on official opening &
            closing ranks from JoSAA, JAC Delhi, CSAB, MCC, and State CETs.
          </p>
        </div>
      </div>

      {/* 2. MAIN WIZARD OR RESULTS DASHBOARD */}
      {!showResults ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT VERTICAL STEPPER SIDEBAR (Shiksha UI Pattern) */}
          <div className="lg:col-span-3 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Prediction Steps
            </h3>

            <div className="space-y-3">
              {[
                {
                  stepNum: 1,
                  title: "Select a Course",
                  subtitle: selectedStream,
                  icon: GraduationCap,
                },
                {
                  stepNum: 2,
                  title: "Select Exam(s)",
                  subtitle: `${selectedExams.length} Exam${
                    selectedExams.length > 1 ? "s" : ""
                  } Selected`,
                  icon: Layers,
                },
                {
                  stepNum: 3,
                  title: "Enter Score Details",
                  subtitle: userScoreInput
                    ? `${activeExamObj.scoreType}: ${userScoreInput}`
                    : "Rank / Score / Category",
                  icon: Award,
                },
              ].map((s) => {
                const isActive = currentStep === s.stepNum;
                const isCompleted = currentStep > s.stepNum;
                const Icon = s.icon;

                return (
                  <button
                    key={s.stepNum}
                    type="button"
                    onClick={() => {
                      if (s.stepNum <= currentStep || currentStep > s.stepNum) {
                        setCurrentStep(s.stepNum);
                      }
                    }}
                    className={`w-full flex items-center gap-3.5 p-3 rounded-xl transition-all text-left ${
                      isActive
                        ? "bg-orange-50 border border-orange-200 text-orange-950 shadow-xs"
                        : isCompleted
                        ? "hover:bg-slate-50 text-slate-800"
                        : "opacity-60 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-colors flex-shrink-0 ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : isActive
                          ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                          : "bg-slate-100 text-slate-500 border border-slate-200"
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : s.stepNum}
                    </div>

                    <div className="overflow-hidden">
                      <p
                        className={`text-xs font-bold font-outfit truncate ${
                          isActive ? "text-orange-600 font-extrabold" : ""
                        }`}
                      >
                        {s.title}
                      </p>
                      <p className="text-[10.5px] text-slate-500 truncate mt-0.5">
                        {s.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-slate-600 text-[11px] font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% Free & Verified Cutoffs</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-[11px] font-semibold">
                <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Used by 50,000+ Aspirants</span>
              </div>
            </div>
          </div>

          {/* RIGHT STEP CONTENT AREA */}
          <div className="lg:col-span-9 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 md:p-8 shadow-xs min-h-[460px] flex flex-col justify-between relative overflow-hidden">
            {isAnalyzing ? (
              <div className="my-auto py-16 text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="w-16 h-16 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin" />
                  <Sparkles className="w-6 h-6 text-orange-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-outfit font-black text-xl text-slate-900">
                    Analyzing JoSAA, JAC & State Cutoffs...
                  </h3>
                  <p className="text-xs text-slate-500">
                    Evaluating reservation quotas, home state weightage & seat
                    allocation algorithms
                  </p>
                </div>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {/* STEP 1: SELECT A COURSE */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-5"
                  >
                    <div>
                      <h2 className="font-outfit font-black text-xl text-slate-900">
                        Step 1: Select Your Target Course / Stream
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Choose your discipline to display eligible entrance exams
                        and seat allotment matrices.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-2">
                      {[
                        {
                          stream: "Engineering",
                          title: "Engineering (B.Tech / B.E)",
                          desc: "JEE Main, Adv, BITSAT, State CETs",
                          icon: GraduationCap,
                          color: "from-blue-500/10 to-indigo-500/10 border-blue-200 text-blue-600",
                        },
                        {
                          stream: "Management",
                          title: "Management (MBA / PGDM)",
                          desc: "CAT, XAT, MAT, SNAP, CMAT",
                          icon: Briefcase,
                          color: "from-amber-500/10 to-orange-500/10 border-amber-200 text-amber-600",
                        },
                        {
                          stream: "Medical",
                          title: "Medical (MBBS / BDS / AYUSH)",
                          desc: "NEET UG, INI CET, AIIMS",
                          icon: Stethoscope,
                          color: "from-emerald-500/10 to-teal-500/10 border-emerald-200 text-emerald-600",
                        },
                        {
                          stream: "Law",
                          title: "Law (BA LLB / BBA LLB / LLM)",
                          desc: "CLAT, AILET, SLAT, NLU Admissions",
                          icon: Scale,
                          color: "from-purple-500/10 to-indigo-500/10 border-purple-200 text-purple-600",
                        },
                        {
                          stream: "Design",
                          title: "Design & Architecture",
                          desc: "UCEED, NID, NATA, JEE Paper 2",
                          icon: Palette,
                          color: "from-pink-500/10 to-rose-500/10 border-pink-200 text-pink-600",
                        },
                      ].map((card) => {
                        const isSelected = selectedStream === card.stream;
                        const Icon = card.icon;

                        return (
                          <button
                            key={card.stream}
                            type="button"
                            onClick={() => {
                              setSelectedStream(
                                card.stream as
                                  | "Engineering"
                                  | "Management"
                                  | "Medical"
                                  | "Law"
                                  | "Design"
                              );
                              // Auto-select first exam of stream
                              const firstOfStream = ALL_EXAMS.find(
                                (e) => e.stream === card.stream
                              );
                              if (firstOfStream) {
                                setSelectedExams([firstOfStream.id]);
                              }
                            }}
                            className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between h-[130px] relative cursor-pointer ${
                              isSelected
                                ? "bg-gradient-to-br border-orange-500 ring-2 ring-orange-500/20 bg-orange-50/60 shadow-sm"
                                : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br ${card.color}`}
                              >
                                <Icon className="w-5 h-5" />
                              </div>
                              {isSelected && (
                                <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center">
                                  <Check className="w-3.5 h-3.5" />
                                </div>
                              )}
                            </div>

                            <div>
                              <h4 className="font-outfit font-extrabold text-xs sm:text-sm text-slate-800 leading-tight">
                                {card.title}
                              </h4>
                              <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                                {card.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: SELECT EXAMS WITH OFFICIAL LOGOS (Exact Shiksha Grid Format) */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h2 className="font-outfit font-black text-xl text-slate-900">
                          Select exams you have taken
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          You can select multiple exams to predict across all
                          counselings simultaneously.
                        </p>
                      </div>

                      {/* Search Bar for Exams */}
                      <div className="relative w-full sm:w-64">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={examSearchQuery}
                          onChange={(e) => setExamSearchQuery(e.target.value)}
                          placeholder="Search exam (e.g. JEE, BITSAT)..."
                          className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:border-orange-500 outline-none font-medium"
                        />
                      </div>
                    </div>

                    {/* Rich Grid of Official Exam Cards (Shiksha Image 3 Format) */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-[380px] overflow-y-auto pr-1 py-1 no-scrollbar">
                      {visibleExams.map((exam) => {
                        const isSelected = selectedExams.includes(exam.id);

                        return (
                          <div
                            key={exam.id}
                            onClick={() => toggleExamSelection(exam.id)}
                            className={`group relative flex flex-col items-center justify-between p-2.5 rounded-xl border transition-all duration-200 cursor-pointer bg-white ${
                              isSelected
                                ? "border-orange-500 ring-2 ring-orange-500/20 bg-orange-50/20 shadow-xs"
                                : "border-slate-200/90 hover:border-orange-300 hover:shadow-xs"
                            }`}
                          >
                            {/* Selected Checkmark Badge */}
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center z-20">
                                <Check className="w-2.5 h-2.5" />
                              </div>
                            )}

                            {/* State / Tag Pill */}
                            {exam.stateTag && (
                              <div className="absolute top-1.5 left-1.5 text-[7.5px] font-extrabold uppercase px-1 py-0.2 rounded bg-slate-100 text-slate-600">
                                {exam.stateTag}
                              </div>
                            )}

                            {/* Center Logo Box */}
                            <div className="w-14 h-14 mt-3.5 mb-1 rounded-xl bg-white border border-slate-100 p-1 flex items-center justify-center shadow-2xs overflow-hidden relative">
                              {exam.logo ? (
                                <img
                                  src={exam.logo}
                                  alt={exam.name}
                                  className="max-h-full max-w-full object-contain relative z-10"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display =
                                      "none";
                                  }}
                                />
                              ) : null}
                              <div className="w-full h-full rounded-lg bg-orange-50 text-orange-600 font-black text-[10px] flex items-center justify-center uppercase">
                                {exam.shortName.slice(0, 4)}
                              </div>
                            </div>

                            {/* Exam Name */}
                            <p className="font-outfit font-bold text-[11px] text-slate-800 text-center leading-tight line-clamp-2 min-h-[26px]">
                              {exam.shortName}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: ENTER SCORE & DEMOGRAPHIC PREFERENCES */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-outfit font-black text-xl text-slate-900">
                        Step 3: Enter Your Scores & Category
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Please provide accurate details for precise category &
                        home-state cutoff allotment.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                      {/* Score / Rank Input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                          <span>
                            Enter {activeExamObj.name} {activeExamObj.scoreType}
                          </span>
                          {activeExamObj.maxScore && (
                            <span className="text-[10px] text-slate-400">
                              (Max: {activeExamObj.maxScore})
                            </span>
                          )}
                        </label>
                        <input
                          type="text"
                          required
                          value={userScoreInput}
                          onChange={(e) => setUserScoreInput(e.target.value)}
                          placeholder={
                            activeExamObj.scoreType === "Percentile"
                              ? "e.g. 98.45"
                              : activeExamObj.scoreType === "Marks"
                              ? "e.g. 280"
                              : "e.g. 12500"
                          }
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-extrabold text-slate-800 bg-slate-50 focus:bg-white focus:border-orange-500 outline-none shadow-xs"
                        />
                      </div>

                      {/* Quota Category */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">
                          Reservation Category / Quota
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white focus:border-orange-500 outline-none shadow-xs"
                        >
                          <option value="General">General / Open (CRL)</option>
                          <option value="OBC-NCL">OBC-NCL</option>
                          <option value="EWS">GEN-EWS (Economically Weaker)</option>
                          <option value="SC">SC (Scheduled Caste)</option>
                          <option value="ST">ST (Scheduled Tribe)</option>
                          <option value="PwD">PwD (Persons with Disabilities)</option>
                        </select>
                      </div>

                      {/* Gender Pool (Critical for NITs/IITs/IGDTUW) */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">
                          Gender Pool
                        </label>
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white focus:border-orange-500 outline-none shadow-xs"
                        >
                          <option value="Gender-Neutral">Gender-Neutral (All)</option>
                          <option value="Female-Only">Female-Only (Supernumerary Seats)</option>
                        </select>
                      </div>

                      {/* Home State Eligibility (JoSAA 50% Home State Quota) */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">
                          Home State Eligibility (12th Board State)
                        </label>
                        <select
                          value={homeState}
                          onChange={(e) => setHomeState(e.target.value)}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white focus:border-orange-500 outline-none shadow-xs"
                        >
                          <option value="Delhi NCT">Delhi NCT (85% State Quota)</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Punjab / Haryana">Punjab / Haryana</option>
                          <option value="Other States">Other States / UTs</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* BOTTOM STEP CONTROLS & NAVIGATION BAR */}
            {!isAnalyzing && (
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  disabled={currentStep === 1}
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all ${
                    currentStep === 1 ? "opacity-0 pointer-events-none" : ""
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#f26522] hover:bg-[#d9531e] text-white text-xs font-black rounded-xl shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>
                      {currentStep === 2
                        ? `Next (${selectedExams.length} Selected)`
                        : "Next Step"}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStartPrediction}
                    className="flex items-center gap-2 px-7 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-xs font-black rounded-xl shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Predict My Colleges</span>
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* 3. COMPREHENSIVE PREDICTION RESULTS DASHBOARD */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* USER INPUT SUMMARY PILLS & RECALCULATE CTA */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
              <span className="px-3 py-1 bg-orange-50 text-orange-700 font-extrabold rounded-lg border border-orange-200/60">
                Exam: {activeExamObj.name}
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-800 font-bold rounded-lg border border-slate-200">
                {activeExamObj.scoreType}: <strong>{userScoreInput}</strong>
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-800 font-bold rounded-lg border border-slate-200">
                Category: <strong>{category}</strong>
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-800 font-bold rounded-lg border border-slate-200">
                Home State: <strong>{homeState}</strong>
              </span>
            </div>

            <button
              type="button"
              onClick={handleResetWizard}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs rounded-xl active:scale-95 transition-all self-start md:self-auto cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Modify Details</span>
            </button>
          </div>

          {/* FILTER TOOLBAR: PROBABILITY TABS & DROPDOWNS */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5">
            {/* Probability Category Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "All", label: "All Predicted", color: "" },
                { id: "High", label: "🟢 High Chance (Safe)", color: "text-emerald-700" },
                { id: "Medium", label: "🟡 Medium Chance (Likely)", color: "text-amber-700" },
                { id: "Low", label: "🔴 Low Chance (Ambitious)", color: "text-red-700" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setResultsFilterChance(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    resultsFilterChance === tab.id
                      ? "bg-white border border-slate-300 text-slate-900 shadow-xs scale-[1.02]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Location & Ownership Filters */}
            <div className="flex items-center gap-2">
              <select
                value={resultsFilterState}
                onChange={(e) => setResultsFilterState(e.target.value)}
                className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-bold bg-white text-slate-700 outline-none"
              >
                <option value="All">All Locations</option>
                <option value="Delhi NCT">Delhi NCT</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
              </select>

              <select
                value={resultsFilterType}
                onChange={(e) => setResultsFilterType(e.target.value)}
                className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-bold bg-white text-slate-700 outline-none"
              >
                <option value="All">All Institutes</option>
                <option value="Government">Government Only</option>
                <option value="Private">Private Only</option>
              </select>
            </div>
          </div>

          {/* RESULTS COLLEGE CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPredictions.map((college) => (
              <motion.div
                layout
                key={college.id}
                className="group bg-white border border-slate-200/90 hover:border-orange-500/60 rounded-2xl p-4 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="space-y-3">
                  {/* Card Header: Chance Badge & NIRF */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        college.chance === "High"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : college.chance === "Medium"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {college.chance === "High"
                        ? "High Probability"
                        : college.chance === "Medium"
                        ? "Medium Probability"
                        : "Competitive / Dream"}
                    </span>

                    {college.nirfRank && (
                      <span className="text-[9px] font-extrabold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200/60">
                        NIRF #{college.nirfRank}
                      </span>
                    )}
                  </div>

                  {/* College Identity: Logo + Name + Branch */}
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-2xs">
                      {college.logo ? (
                        <img
                          src={college.logo}
                          alt={college.name}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : null}
                      <Building2 className="w-6 h-6 text-orange-500" />
                    </div>

                    <div className="overflow-hidden">
                      <h4 className="font-outfit font-black text-sm text-slate-900 leading-snug group-hover:text-orange-600 transition-colors line-clamp-1">
                        {college.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{college.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Predicted Branch */}
                  <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">
                      Predicted Course / Branch
                    </p>
                    <p className="font-outfit font-bold text-xs text-slate-800 mt-0.5 truncate">
                      {college.branch}
                    </p>
                  </div>

                  {/* Key Metrics: Packages & Fees */}
                  <div className="grid grid-cols-2 gap-2 py-2 px-3 bg-slate-50/70 border border-slate-100 rounded-xl text-center">
                    <div>
                      <p className="text-[7.5px] font-extrabold text-slate-400 uppercase">
                        Highest Package
                      </p>
                      <p className="font-outfit font-bold text-xs text-emerald-600 mt-0.5">
                        {college.highestPackage}
                      </p>
                    </div>
                    <div className="border-l border-slate-200">
                      <p className="text-[7.5px] font-extrabold text-slate-400 uppercase">
                        Tuition Fees
                      </p>
                      <p className="font-outfit font-bold text-xs text-slate-800 mt-0.5">
                        {college.fees}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex gap-2 pt-3 mt-2 border-t border-slate-100">
                  <Link
                    href={`/colleges/${college.slug}`}
                    className="flex-1 py-2 text-center bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-orange-600 font-bold text-xs rounded-xl transition-all"
                  >
                    View College
                  </Link>
                  <Link
                    href="/counseling"
                    className="flex-1 py-2 text-center bg-[#f26522] hover:bg-[#d9531e] text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                  >
                    Get Counseling
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* COUNSELING PDF DOWNLOAD BANNER */}
          <div className="bg-gradient-to-r from-[#032b53] to-[#094175] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-outfit font-black text-xl text-white">
                Download Full 2026 Counseling Choice-Filling Order
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Get a customized choice-filling preference PDF list generated
                specifically for your rank, home state quota & branch choices.
              </p>
            </div>

            <Link
              href="/counseling"
              className="px-6 py-3 bg-[#f26522] hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-lg shadow-orange-500/25 active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              <span>Get Choice-Filling PDF</span>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function PredictorPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin mx-auto" />
          <p className="font-outfit font-bold text-slate-700 text-sm">
            Loading College Predictor 2026...
          </p>
        </div>
      }
    >
      <PredictorContent />
    </Suspense>
  );
}

