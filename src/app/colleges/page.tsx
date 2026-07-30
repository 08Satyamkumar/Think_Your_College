"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Search, 
  MapPin, 
  Map,
  Star, 
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
  FileText,
  Layers,
  Compass,
  GraduationCap,
  Link as LinkIcon,
  CheckCircle
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
  fees: number; // numeric for sorting/filtering (in Lakhs per year)
  rating: number;
  nirfRank?: number;
  type: string; // Public / Private (Ownership)
  description: string;
  logoText: string;
  slug: string;
  accreditation: string;
  image?: string;
  programMode: string; // Offline / Distance / Online
  courseTypes: string[]; // Bachelors / Masters / Doctorate / Postgraduate Diploma
  affiliation: string; // University name
  approvals: string[]; // AICTE / UGC / PCI / MHRD
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
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=60",
    programMode: "Offline",
    courseTypes: ["Bachelors", "Masters"],
    affiliation: "Delhi University", // dummy DU match for filtering
    approvals: ["AICTE", "UGC"]
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
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=60",
    programMode: "Offline",
    courseTypes: ["Bachelors", "Masters"],
    affiliation: "Delhi University",
    approvals: ["AICTE", "UGC"]
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
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop&q=60",
    programMode: "Offline",
    courseTypes: ["Masters", "Postgraduate Diploma"],
    affiliation: "Mumbai University",
    approvals: ["UGC", "MHRD"]
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
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?w=600&auto=format&fit=crop&q=60",
    programMode: "Offline",
    courseTypes: ["Bachelors", "Masters"],
    affiliation: "Anna University, Chennai",
    approvals: ["AICTE", "UGC"]
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
    image: "https://images.unsplash.com/photo-1541829019-259276a7f013?w=600&auto=format&fit=crop&q=60",
    programMode: "Offline",
    courseTypes: ["Masters", "Postgraduate Diploma"],
    affiliation: "Mumbai University",
    approvals: ["UGC"]
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
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&auto=format&fit=crop&q=60",
    programMode: "Offline",
    courseTypes: ["Bachelors", "Masters"],
    affiliation: "JNTUH - Jawaharlal Nehru Technological University, Hyderabad",
    approvals: ["AICTE", "UGC"]
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
    fees: 0.02,
    rating: 4.9,
    nirfRank: 1,
    type: "Public",
    description: "AIIMS New Delhi is India's premier public medical sciences university, offering highly subsidized, world-class healthcare education, research facilities, and extensive clinical exposure.",
    logoText: "AIIMS",
    slug: "aiims-delhi",
    accreditation: "MCI Approved",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=60",
    programMode: "Offline",
    courseTypes: ["Bachelors", "Doctorate"],
    affiliation: "Delhi University",
    approvals: ["UGC", "MHRD"]
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
    image: "https://images.unsplash.com/photo-1551076805-e18690237571?w=600&auto=format&fit=crop&q=60",
    programMode: "Offline",
    courseTypes: ["Bachelors", "Masters"],
    affiliation: "Anna University, Chennai",
    approvals: ["UGC", "PCI"]
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
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=60",
    programMode: "Offline",
    courseTypes: ["Bachelors", "Masters"],
    affiliation: "Mumbai University",
    approvals: ["UGC", "MHRD"]
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
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60",
    programMode: "Offline",
    courseTypes: ["Bachelors", "Doctorate"],
    affiliation: "Delhi University",
    approvals: ["UGC", "MHRD"]
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

  // New filters states from GetMyUni screenshots
  const [selectedProgramModes, setSelectedProgramModes] = useState<string[]>([]);
  const [selectedOwnerships, setSelectedOwnerships] = useState<string[]>([]);
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [selectedCourseTypes, setSelectedCourseTypes] = useState<string[]>([]);
  const [selectedAffiliations, setSelectedAffiliations] = useState<string[]>([]);
  const [selectedApprovals, setSelectedApprovals] = useState<string[]>([]);
  const [selectedFeesRanges, setSelectedFeesRanges] = useState<string[]>([]);

  // Local filter search options states
  const [stateFilterSearch, setStateFilterSearch] = useState("");
  const [cityFilterSearch, setCityFilterSearch] = useState("");
  const [courseFilterSearch, setCourseFilterSearch] = useState("");
  const [specFilterSearch, setSpecFilterSearch] = useState("");
  const [progSearch, setProgSearch] = useState("");
  const [ownerSearch, setOwnerSearch] = useState("");
  const [examSearch, setExamSearch] = useState("");
  const [courseTypeSearch, setCourseTypeSearch] = useState("");
  const [affSearch, setAffSearch] = useState("");
  const [appSearch, setAppSearch] = useState("");
  const [feesSearch, setFeesSearch] = useState("");
  const [streamFilterSearch, setStreamFilterSearch] = useState("");

  // Static options lists for UI checkboxes (GetMyUni match)
  const programModeOptions = ["Offline", "Distance Education", "Online"];
  const ownershipOptions = ["Private", "Public"];
  const examOptions = ["JEE Main", "CAT", "NEET", "CMAT", "CLAT", "GATE"];
  const courseTypeOptions = ["Bachelors", "Masters", "Doctorate", "Postgraduate Diploma"];
  const affiliationOptions = [
    "Anna University, Chennai", 
    "JNTUH - Jawaharlal Nehru Technological University, Hyderabad",
    "Mumbai University",
    "Delhi University"
  ];
  const approvalOptions = ["AICTE", "UGC", "PCI", "MHRD"];
  const feesRangeOptions = ["Less than 1 Lakh", "1 Lakh - 3 Lakhs", "3 Lakhs - 5 Lakhs", "More than 5 Lakhs"];

  const stateOptions = [
    { name: "Maharashtra", count: 1698 },
    { name: "Tamil Nadu", count: 1299 },
    { name: "Uttar Pradesh", count: 1294 },
    { name: "Karnataka", count: 1214 },
    { name: "Kerala", count: 864 },
    { name: "West Bengal", count: 684 },
    { name: "Telangana", count: 655 },
    { name: "Gujarat", count: 629 },
    { name: "Haryana", count: 588 },
    { name: "Andhra Pradesh", count: 574 },
    { name: "Punjab", count: 574 },
    { name: "Madhya Pradesh", count: 553 },
    { name: "Rajasthan", count: 541 },
    { name: "Delhi NCR", count: 410 },
    { name: "Odisha", count: 329 },
    { name: "Uttarakhand", count: 217 },
    { name: "Bihar", count: 207 },
    { name: "Assam", count: 194 },
    { name: "Chhattisgarh", count: 163 },
    { name: "Jharkhand", count: 123 },
    { name: "Himachal Pradesh", count: 108 },
    { name: "Jammu and Kashmir", count: 108 },
    { name: "Puducherry", count: 74 },
    { name: "Goa", count: 39 },
    { name: "Meghalaya", count: 27 },
    { name: "Tripura", count: 22 },
    { name: "Sikkim", count: 21 },
    { name: "Manipur", count: 20 },
    { name: "Nagaland", count: 19 },
    { name: "Arunachal Pradesh", count: 18 },
    { name: "Mizoram", count: 9 },
    { name: "Andaman and Nicobar Islands", count: 3 }
  ];

  const cityOptions = [
    { name: "Pune", count: 473 },
    { name: "Delhi", count: 393 },
    { name: "Hyderabad", count: 390 },
    { name: "Mumbai", count: 381 },
    { name: "Chennai", count: 345 },
    { name: "Kolkata", count: 314 },
    { name: "Jaipur", count: 244 },
    { name: "Coimbatore", count: 191 },
    { name: "Bhopal", count: 177 },
    { name: "Ahmedabad", count: 175 },
    { name: "Lucknow", count: 157 },
    { name: "Bhubaneswar", count: 152 },
    { name: "Indore", count: 137 },
    { name: "Nagpur", count: 127 },
    { name: "Ghaziabad", count: 117 },
    { name: "Noida", count: 117 },
    { name: "Dehradun", count: 108 },
    { name: "Thiruvananthapuram", count: 108 },
    { name: "Meerut", count: 101 },
    { name: "Patna", count: 88 },
    { name: "Visakhapatnam", count: 86 },
    { name: "Guntur", count: 84 },
    { name: "Gurgaon", count: 84 },
    { name: "Mangalore", count: 83 },
    { name: "Greater Noida", count: 79 },
    { name: "Thrissur", count: 75 },
    { name: "Ernakulam", count: 74 },
    { name: "Mohali", count: 73 },
    { name: "Kanpur", count: 72 },
    { name: "Guwahati", count: 67 },
    { name: "Kottayam", count: 67 },
    { name: "Ludhiana", count: 67 },
    { name: "Ranga Reddy", count: 64 },
    { name: "Surat", count: 64 },
    { name: "Aurangabad", count: 62 },
    { name: "Nashik", count: 62 },
    { name: "Tiruchirappalli", count: 62 },
    { name: "Vadodara", count: 62 },
    { name: "Gwalior", count: 61 },
    { name: "Raipur", count: 59 },
    { name: "Faridabad", count: 58 },
    { name: "Namakkal", count: 58 },
    { name: "Udaipur", count: 58 },
    { name: "Jammu", count: 55 },
    { name: "Chandigarh", count: 54 },
    { name: "Mysore", count: 54 },
    { name: "Patiala", count: 54 },
    { name: "Malappuram", count: 53 },
    { name: "Allahabad", count: 52 },
    { name: "Kanyakumari", count: 52 }
  ];

  const streamOptions = [
    { name: "Arts", count: 4581 },
    { name: "Management", count: 5481 },
    { name: "Engineering", count: 4140 },
    { name: "Science", count: 4281 },
    { name: "Commerce", count: 3096 },
    { name: "Computer", count: 3151 },
    { name: "Education", count: 2485 },
    { name: "Medical", count: 865 },
    { name: "Pharmacy", count: 926 },
    { name: "Law", count: 755 },
    { name: "Architecture", count: 415 },
    { name: "Paramedical", count: 344 },
    { name: "Design", count: 331 },
    { name: "Dental", count: 285 },
    { name: "Hotel Management", count: 342 },
    { name: "Mass Communication", count: 308 },
    { name: "Vocational Courses", count: 226 },
    { name: "Veterinary", count: 50 },
    { name: "Animation", count: 12 },
    { name: "Agriculture", count: 3 },
    { name: "Aviation", count: 3 }
  ];

  const courseOptions = [
    { name: "MBA", count: 3635 },
    { name: "BSc", count: 3580 },
    { name: "BTech", count: 3170 },
    { name: "BA", count: 2906 },
    { name: "BCom", count: 2767 },
    { name: "MSc", count: 2663 },
    { name: "MTech", count: 2155 },
    { name: "BCA", count: 2094 },
    { name: "MA", count: 1934 },
    { name: "MCA", count: 1851 },
    { name: "B.Ed", count: 1804 },
    { name: "PhD", count: 1687 },
    { name: "BBA", count: 1617 },
    { name: "M.Com", count: 1526 },
    { name: "PGD", count: 1496 },
    { name: "Bachelor of Engineering", count: 1404 },
    { name: "B.Pharmacy", count: 883 },
    { name: "ME", count: 746 },
    { name: "BA Hons", count: 694 },
    { name: "BSc Hons", count: 676 },
    { name: "M.Pharm", count: 636 },
    { name: "LLB", count: 582 },
    { name: "M.Phil", count: 566 },
    { name: "M.Ed", count: 514 },
    { name: "LLM", count: 474 },
    { name: "MD", count: 411 },
    { name: "B.Arch", count: 402 },
    { name: "MBBS", count: 368 },
    { name: "MSW", count: 359 },
    { name: "BPT", count: 340 },
    { name: "BHM", count: 305 },
    { name: "M.S", count: 303 },
    { name: "B.Des", count: 289 },
    { name: "B.Lib.I.Sc", count: 281 },
    { name: "Advance Diploma", count: 266 },
    { name: "BDS", count: 253 },
    { name: "BBM", count: 247 },
    { name: "B.P.Ed", count: 234 },
    { name: "B.Voc", count: 221 },
    { name: "MDS", count: 219 },
    { name: "M.Lib.I.Sc", count: 207 },
    { name: "PGP", count: 207 },
    { name: "BCom Hons", count: 202 },
    { name: "MPT", count: 200 },
    { name: "Diploma", count: 189 },
    { name: "BFA", count: 161 },
    { name: "BBA Hons", count: 150 },
    { name: "BJMC", count: 150 },
    { name: "Executive MBA", count: 148 },
    { name: "M.Des", count: 144 },
    { name: "Pharm.D", count: 142 },
    { name: "BSW", count: 136 },
    { name: "MJMC", count: 131 },
    { name: "M.P.Ed", count: 129 },
    { name: "Post Basic Nursing", count: 129 },
    { name: "BMS", count: 128 },
    { name: "PGDM", count: 126 },
    { name: "Master of Chirurgiae [M.Ch]", count: 121 },
    { name: "M.Arch", count: 119 },
    { name: "BAMS", count: 107 },
    { name: "MFA", count: 101 },
    { name: "MMS", count: 93 },
    { name: "MPH", count: 88 },
    { name: "DM", count: 84 },
    { name: "GNM Nursing", count: 84 },
    { name: "BHMS", count: 83 },
    { name: "B.Optom", count: 83 },
    { name: "BMLT", count: 78 },
    { name: "MHA", count: 72 },
    { name: "Distance MBA", count: 66 },
    { name: "ANM Nursing", count: 64 },
    { name: "PGC", count: 63 },
    { name: "Certificate", count: 59 },
    { name: "BVA", count: 56 },
    { name: "MHM", count: 56 },
    { name: "Distance BCA", count: 54 },
    { name: "BMM", count: 52 },
    { name: "Distance MCA", count: 52 },
    { name: "Bachelor of Performing Arts", count: 49 },
    { name: "MTTM", count: 48 },
    { name: "B.V.Sc", count: 46 },
    { name: "M.Plan", count: 46 },
    { name: "BTech Hons", count: 42 },
    { name: "BNYS", count: 41 },
    { name: "MPA", count: 40 },
    { name: "M.V.Sc", count: 40 },
    { name: "Bachelor of Occupational Therapy [BOT]", count: 38 },
    { name: "Advance Certificate", count: 35 },
    { name: "M.Optom", count: 34 },
    { name: "Distance BBA", count: 33 },
    { name: "MAM", count: 33 },
    { name: "B.Planning", count: 31 },
    { name: "BASLP", count: 30 },
    { name: "Distance B.Com", count: 30 },
    { name: "M.Voc", count: 28 },
    { name: "BFSc", count: 27 },
    { name: "BHMCT", count: 27 },
    { name: "BMC", count: 27 },
    { name: "B.Th", count: 27 },
    { name: "MHRM", count: 26 },
    { name: "MCM", count: 26 },
    { name: "MTM", count: 26 },
    { name: "MIB", count: 25 },
    { name: "B.El.Ed", count: 24 },
    { name: "BPES", count: 24 },
    { name: "ETT", count: 24 },
    { name: "MFM", count: 24 },
    { name: "M.F.Sc", count: 24 },
    { name: "BID", count: 23 },
    { name: "BTM", count: 23 },
    { name: "BUMS", count: 22 },
    { name: "MFC", count: 22 },
    { name: "B.Des Hons", count: 21 },
    { name: "MOT", count: 21 },
    { name: "MSc Hons", count: 21 },
    { name: "BFTech", count: 20 },
    { name: "MMM", count: 19 },
    { name: "M.Th", count: 19 },
    { name: "MVA", count: 19 },
    { name: "BTTM", count: 18 },
    { name: "BCA Hons", count: 18 },
    { name: "Post Doctoral", count: 18 },
    { name: "DNB", count: 16 },
    { name: "MCJ", count: 16 },
    { name: "MPM", count: 16 },
    { name: "BHA", count: 15 },
    { name: "MLib", count: 15 },
    { name: "Executive Program", count: 14 },
    { name: "MFM", count: 14 },
    { name: "MLT", count: 13 },
    { name: "Bachelor of Music", count: 12 },
    { name: "BSMS", count: 12 },
    { name: "BCS", count: 12 },
    { name: "MHRD", count: 12 },
    { name: "BLit", count: 11 },
    { name: "Bachelor of Hospitality Management", count: 11 },
    { name: "D.Litt", count: 11 },
    { name: "MA Hons", count: 11 },
    { name: "MATA", count: 10 },
    { name: "BPO", count: 9 },
    { name: "BTS", count: 9 },
    { name: "MPP", count: 9 },
    { name: "BFAD", count: 8 },
    { name: "Bachelor of Fashion Design", count: 8 },
    { name: "BTTH", count: 8 },
    { name: "D.Pharma", count: 8 },
    { name: "MFTech", count: 8 },
    { name: "HMCT", count: 8 },
    { name: "AME", count: 7 },
    { name: "BMLS", count: 7 },
    { name: "MBM", count: 7 },
    { name: "MSM", count: 7 },
    { name: "MBE", count: 7 },
    { name: "BLib", count: 6 },
    { name: "BBS", count: 6 },
    { name: "CFA", count: 6 },
    { name: "D.Sc", count: 6 },
    { name: "LLD", count: 6 },
    { name: "Masters in Hospital Management", count: 6 },
    { name: "MSC", count: 6 },
    { name: "MMus", count: 6 },
    { name: "BPH", count: 5 },
    { name: "Bachelor of Animation", count: 5 },
    { name: "BCJ", count: 5 },
    { name: "BEIED", count: 5 },
    { name: "BFIA", count: 5 },
    { name: "Bachelor of Sports Management", count: 5 },
    { name: "BPP", count: 5 },
    { name: "MID", count: 5 },
    { name: "MBS", count: 5 },
    { name: "MFD", count: 5 },
    { name: "Bachelor in Culinary Arts & Bakery", count: 4 },
    { name: "BM", count: 4 },
    { name: "BRS", count: 4 },
    { name: "BRIT", count: 4 },
    { name: "BStat", count: 4 },
    { name: "BFD", count: 4 },
    { name: "BAF", count: 4 },
    { name: "BBE", count: 4 },
    { name: "MEM", count: 4 },
    { name: "MJ", count: 4 },
    { name: "MPH", count: 4 },
    { name: "MIM", count: 4 },
    { name: "MMLS", count: 4 },
    { name: "BSc CVT", count: 3 },
    { name: "BMS", count: 3 },
    { name: "Bachelor of Aviation Management", count: 3 },
    { name: "Bachelor of Cosmetic Technology", count: 3 },
    { name: "BRE", count: 3 },
    { name: "CA", count: 3 },
    { name: "D.Ed", count: 3 },
    { name: "GMP", count: 3 },
    { name: "MTHM", count: 3 },
    { name: "MURP", count: 3 },
    { name: "MUD", count: 3 },
    { name: "MABM", count: 3 },
    { name: "MBL", count: 3 },
    { name: "MCS", count: 3 },
    { name: "MHTM", count: 3 },
    { name: "LLM", count: 3 },
    { name: "MMin", count: 3 },
    { name: "MSPT", count: 3 },
    { name: "MRE", count: 3 },
    { name: "MText", count: 3 },
    { name: "MUP", count: 3 },
    { name: "MPlan", count: 3 },
    { name: "Masters in Sports Nutrition", count: 3 },
    { name: "MBA Hons", count: 3 },
    { name: "M.Com Hons", count: 3 },
    { name: "BText", count: 2 },
    { name: "BMGA", count: 2 },
    { name: "BFM", count: 2 },
    { name: "BLS", count: 2 },
    { name: "BMM", count: 2 },
    { name: "BMMC", count: 2 },
    { name: "BPD", count: 2 },
    { name: "BSL", count: 2 },
    { name: "Bachelors in Logistics Management", count: 2 },
    { name: "BETP", count: 2 },
    { name: "BMS Hons", count: 2 },
    { name: "BPH", count: 2 },
    { name: "BPT", count: 2 },
    { name: "Distance M.Sc Biochemistry", count: 2 },
    { name: "MLL & LW", count: 2 },
    { name: "MMC", count: 2 },
    { name: "Master of Bioprocessing Engineering", count: 2 },
    { name: "MEILC", count: 2 },
    { name: "MFT", count: 2 },
    { name: "MGB", count: 2 },
    { name: "MPS", count: 2 },
    { name: "MTA", count: 2 },
    { name: "Online MBA", count: 2 },
    { name: "BAA", count: 1 },
    { name: "Bachelor in Graphics & Multimedia", count: 1 },
    { name: "BJD&M", count: 1 },
    { name: "BPHBS", count: 1 },
    { name: "BPP", count: 1 },
    { name: "BAM", count: 1 },
    { name: "BAP", count: 1 },
    { name: "BPharm Ayurveda", count: 1 },
    { name: "BBC", count: 1 },
    { name: "BEC", count: 1 },
    { name: "BEM", count: 1 },
    { name: "BFS", count: 1 },
    { name: "BFA", count: 1 },
    { name: "BLW", count: 1 },
    { name: "BMRSC", count: 1 },
    { name: "BMin", count: 1 },
    { name: "BOL", count: 1 },
    { name: "BRTT", count: 1 },
    { name: "BUD", count: 1 },
    { name: "BUP", count: 1 },
    { name: "B.Des in Textile Design", count: 1 },
    { name: "B.Com LLB", count: 1 },
    { name: "D.El.Ed", count: 1 },
    { name: "Distance B.Ed", count: 1 },
    { name: "EPGP)", count: 1 },
    { name: "MASLP", count: 1 },
    { name: "MHM", count: 1 },
    { name: "MOT", count: 1 },
    { name: "MPM", count: 1 },
    { name: "MSDEM", count: 1 },
    { name: "MAEP", count: 1 },
    { name: "MCCA", count: 1 },
    { name: "MEM", count: 1 },
    { name: "MHPE", count: 1 },
    { name: "MHRM", count: 1 },
    { name: "MIRM", count: 1 },
    { name: "LLM IPR", count: 1 },
    { name: "Master of Musicology", count: 1 },
    { name: "MOL", count: 1 },
    { name: "MPO", count: 1 },
    { name: "MSpED", count: 1 },
    { name: "MUH", count: 1 },
    { name: "MUI", count: 1 },
    { name: "MUM", count: 1 },
    { name: "MUTS", count: 1 },
    { name: "MTP", count: 1 },
    { name: "MSc in GIS and Remote Sensing", count: 1 },
    { name: "MPharm", count: 1 },
    { name: "MPlan", count: 1 },
    { name: "MRS", count: 1 },
    { name: "MCA Hons", count: 1 },
    { name: "MQPM", count: 1 },
  ];

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

  // Filtered colleges list - 100% Dynamic Filtering Logic
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

    // Filter by Program Mode (Dynamic)
    if (selectedProgramModes.length > 0) {
      result = result.filter(c => selectedProgramModes.includes(c.programMode));
    }

    // Filter by Ownership (Dynamic)
    if (selectedOwnerships.length > 0) {
      result = result.filter(c => selectedOwnerships.includes(c.type));
    }

    // Filter by Exams Accepted (Dynamic)
    if (selectedExams.length > 0) {
      result = result.filter(c => c.exams.some(exam => selectedExams.includes(exam)));
    }

    // Filter by Course Type (Dynamic)
    if (selectedCourseTypes.length > 0) {
      result = result.filter(c => c.courseTypes.some(ct => selectedCourseTypes.includes(ct)));
    }

    // Filter by Affiliation (Dynamic)
    if (selectedAffiliations.length > 0) {
      result = result.filter(c => selectedAffiliations.includes(c.affiliation));
    }

    // Filter by Approvals (Dynamic)
    if (selectedApprovals.length > 0) {
      result = result.filter(c => c.approvals.some(app => selectedApprovals.includes(app)));
    }

    // Filter by Fees Range (Dynamic)
    if (selectedFeesRanges.length > 0) {
      result = result.filter(c => {
        const fee = c.fees; // numeric fees scale
        return selectedFeesRanges.some(range => {
          if (range === "Less than 1 Lakh") return fee < 1.0;
          if (range === "1 Lakh - 3 Lakhs") return fee >= 1.0 && fee <= 3.0;
          if (range === "3 Lakhs - 5 Lakhs") return fee > 3.0 && fee <= 5.0;
          if (range === "More than 5 Lakhs") return fee > 5.0;
          return false;
        });
      });
    }

    // Sorting logic
    if (sortBy === "popularity") {
      result.sort((a, b) => (a.nirfRank || 999) - (b.nirfRank || 999));
    } else if (sortBy === "fees_asc") {
      result.sort((a, b) => a.fees - b.fees);
    } else if (sortBy === "fees_desc") {
      result.sort((a, b) => b.fees - a.fees);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [
    searchTerm, 
    selectedStates, 
    selectedCities, 
    selectedStreams, 
    selectedCourses, 
    selectedSpecializations, 
    selectedProgramModes,
    selectedOwnerships,
    selectedExams,
    selectedCourseTypes,
    selectedAffiliations,
    selectedApprovals,
    selectedFeesRanges,
    sortBy
  ]);

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
    } else if (type === "programMode") {
      setSelectedProgramModes(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    } else if (type === "ownership") {
      setSelectedOwnerships(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    } else if (type === "exam") {
      setSelectedExams(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    } else if (type === "courseType") {
      setSelectedCourseTypes(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    } else if (type === "affiliation") {
      setSelectedAffiliations(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    } else if (type === "approval") {
      setSelectedApprovals(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    } else if (type === "feesRange") {
      setSelectedFeesRanges(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
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
    setSelectedProgramModes([]);
    setSelectedOwnerships([]);
    setSelectedExams([]);
    setSelectedCourseTypes([]);
    setSelectedAffiliations([]);
    setSelectedApprovals([]);
    setSelectedFeesRanges([]);
  };

  // Trigger admission modal on click of Apply Now/Brochure (opens globally handled modal)
  const openInquiryModal = (stream: string) => {
    if (typeof window !== "undefined") {
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
        {(selectedStates.length > 0 || selectedCities.length > 0 || selectedStreams.length > 0 || selectedCourses.length > 0 || selectedSpecializations.length > 0 || selectedProgramModes.length > 0 || selectedOwnerships.length > 0 || selectedExams.length > 0 || selectedCourseTypes.length > 0 || selectedAffiliations.length > 0 || selectedApprovals.length > 0 || selectedFeesRanges.length > 0 || searchTerm !== "") && (
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

            {selectedProgramModes.map(pm => (
              <span key={pm} className="flex items-center gap-1 bg-white text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                {pm}
                <X className="w-3 h-3 text-slate-400 hover:text-red-500 cursor-pointer" onClick={() => toggleFilter("programMode", pm)} />
              </span>
            ))}

            {selectedOwnerships.map(os => (
              <span key={os} className="flex items-center gap-1 bg-white text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                {os}
                <X className="w-3 h-3 text-slate-400 hover:text-red-500 cursor-pointer" onClick={() => toggleFilter("ownership", os)} />
              </span>
            ))}

            {selectedExams.map(ex => (
              <span key={ex} className="flex items-center gap-1 bg-white text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                {ex}
                <X className="w-3 h-3 text-slate-400 hover:text-red-500 cursor-pointer" onClick={() => toggleFilter("exam", ex)} />
              </span>
            ))}

            {selectedCourseTypes.map(ct => (
              <span key={ct} className="flex items-center gap-1 bg-white text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                {ct}
                <X className="w-3 h-3 text-slate-400 hover:text-red-500 cursor-pointer" onClick={() => toggleFilter("courseType", ct)} />
              </span>
            ))}

            {selectedAffiliations.map(af => (
              <span key={af} className="flex items-center gap-1 bg-white text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                {af}
                <X className="w-3 h-3 text-slate-400 hover:text-red-500 cursor-pointer" onClick={() => toggleFilter("affiliation", af)} />
              </span>
            ))}

            {selectedApprovals.map(ap => (
              <span key={ap} className="flex items-center gap-1 bg-white text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                {ap}
                <X className="w-3 h-3 text-slate-400 hover:text-red-500 cursor-pointer" onClick={() => toggleFilter("approval", ap)} />
              </span>
            ))}

            {selectedFeesRanges.map(fr => (
              <span key={fr} className="flex items-center gap-1 bg-white text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                {fr}
                <X className="w-3 h-3 text-slate-400 hover:text-red-500 cursor-pointer" onClick={() => toggleFilter("feesRange", fr)} />
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
          
          {/* LEFT SIDEBAR: FILTERS CARD (World-Class Real Design & Hover Glow Borders) */}
          <aside className="lg:col-span-4 bg-white border border-slate-200 hover:border-orange-500/20 rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.05)] transition-all duration-350 space-y-6 select-none">
            
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

            {/* FILTER SECTIONS (Non-collapsible, hamesha uge hue) */}
            <div className="space-y-6 pt-4 border-t border-slate-100">
              
              {/* STATE FILTER */}
              <div className="border-b border-slate-100 pb-5">
                <h5 className="font-outfit font-black text-slate-700 text-xs uppercase tracking-wider flex items-center gap-2 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  State
                </h5>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Search options..."
                    value={stateFilterSearch}
                    onChange={(e) => setStateFilterSearch(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:border-orange-400 focus:bg-white transition-all font-semibold"
                  />
                  <div className="max-h-40 overflow-y-auto space-y-1.5 custom-filter-scrollbar pr-1 pt-1">
                    {stateOptions
                      .filter(s => s.name.toLowerCase().includes(stateFilterSearch.toLowerCase()))
                      .map(state => (
                        <label key={state.name} className="group flex items-center gap-2 cursor-pointer select-none py-1 px-2 -mx-2 rounded-lg hover:bg-orange-50/30 transition-all duration-200">
                          <input
                            type="checkbox"
                            checked={selectedStates.includes(state.name)}
                            onChange={() => toggleFilter("state", state.name)}
                            className="accent-orange-500 rounded border-slate-300 w-3.5 h-3.5 group-hover:scale-108 transition-transform duration-200"
                          />
                          <span className="text-[11px] font-semibold text-slate-600 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all duration-200">
                            {state.name}
                            <span className="text-slate-400 font-medium ml-1">({state.count})</span>
                          </span>
                        </label>
                      ))}
                  </div>
                </div>
              </div>

              {/* CITY FILTER */}
              <div className="border-b border-slate-100 pb-5">
                <h5 className="font-outfit font-black text-slate-700 text-xs uppercase tracking-wider flex items-center gap-2 mb-3">
                  <Map className="w-3.5 h-3.5 text-orange-500" />
                  City
                </h5>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Search options..."
                    value={cityFilterSearch}
                    onChange={(e) => setCityFilterSearch(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:border-orange-400 focus:bg-white transition-all font-semibold"
                  />
                  <div className="max-h-40 overflow-y-auto space-y-1.5 custom-filter-scrollbar pr-1 pt-1">
                    {cityOptions
                      .filter(c => c.name.toLowerCase().includes(cityFilterSearch.toLowerCase()))
                      .map(city => (
                        <label key={city.name} className="group flex items-center gap-2 cursor-pointer select-none py-1 px-2 -mx-2 rounded-lg hover:bg-orange-50/30 transition-all duration-200">
                          <input
                            type="checkbox"
                            checked={selectedCities.includes(city.name)}
                            onChange={() => toggleFilter("city", city.name)}
                            className="accent-orange-500 rounded border-slate-300 w-3.5 h-3.5 group-hover:scale-108 transition-transform duration-200"
                          />
                          <span className="text-[11px] font-semibold text-slate-600 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all duration-200">
                            {city.name}
                            <span className="text-slate-400 font-medium ml-1">({city.count})</span>
                          </span>
                        </label>
                      ))}
                  </div>
                </div>
              </div>

              {/* STREAM FILTER */}
              <div className="border-b border-slate-100 pb-5">
                <h5 className="font-outfit font-black text-slate-700 text-xs uppercase tracking-wider flex items-center gap-2 mb-3">
                  <Layers className="w-3.5 h-3.5 text-orange-500" />
                  Stream / Category
                </h5>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Search options..."
                    value={streamFilterSearch}
                    onChange={(e) => setStreamFilterSearch(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:border-orange-400 focus:bg-white transition-all font-semibold"
                  />
                  <div className="max-h-40 overflow-y-auto space-y-1.5 custom-filter-scrollbar pr-1 pt-1">
                    {streamOptions
                      .filter(s => s.name.toLowerCase().includes(streamFilterSearch.toLowerCase()))
                      .map(stream => (
                        <label key={stream.name} className="group flex items-center gap-2 cursor-pointer select-none py-1 px-2 -mx-2 rounded-lg hover:bg-orange-50/30 transition-all duration-200">
                          <input
                            type="checkbox"
                            checked={selectedStreams.includes(stream.name)}
                            onChange={() => toggleFilter("stream", stream.name)}
                            className="accent-orange-500 rounded border-slate-300 w-3.5 h-3.5 group-hover:scale-108 transition-transform duration-200"
                          />
                          <span className="text-[11px] font-semibold text-slate-600 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all duration-200">
                            {stream.name}
                            <span className="text-slate-400 font-medium ml-1">({stream.count})</span>
                          </span>
                        </label>
                      ))}
                  </div>
                </div>
              </div>

              {/* COURSES FILTER */}
              <div className="border-b border-slate-100 pb-5">
                <h5 className="font-outfit font-black text-slate-700 text-xs uppercase tracking-wider flex items-center gap-2 mb-3">
                  <BookOpen className="w-3.5 h-3.5 text-orange-500" />
                  Courses Offered
                </h5>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Search options..."
                    value={courseFilterSearch}
                    onChange={(e) => setCourseFilterSearch(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:border-orange-400 focus:bg-white transition-all font-semibold"
                  />
                  <div className="max-h-40 overflow-y-auto space-y-1.5 custom-filter-scrollbar pr-1 pt-1">
                    {courseOptions
                      .filter(c => c.name.toLowerCase().includes(courseFilterSearch.toLowerCase()))
                      .map(course => (
                        <label key={course.name} className="group flex items-center gap-2 cursor-pointer select-none py-1 px-2 -mx-2 rounded-lg hover:bg-orange-50/30 transition-all duration-200">
                          <input
                            type="checkbox"
                            checked={selectedCourses.includes(course.name)}
                            onChange={() => toggleFilter("course", course.name)}
                            className="accent-orange-500 rounded border-slate-300 w-3.5 h-3.5 group-hover:scale-108 transition-transform duration-200"
                          />
                          <span className="text-[11px] font-semibold text-slate-600 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all duration-200">
                            {course.name}
                            <span className="text-slate-400 font-medium ml-1">({course.count})</span>
                          </span>
                        </label>
                      ))}
                  </div>
                </div>
              </div>

              {/* SPECIALIZATION FILTER */}
              <div className="border-b border-slate-100 pb-5">
                <h5 className="font-outfit font-black text-slate-700 text-xs uppercase tracking-wider flex items-center gap-2 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  Specialization
                </h5>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Search options..."
                    value={specFilterSearch}
                    onChange={(e) => setSpecFilterSearch(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:border-orange-400 focus:bg-white transition-all font-semibold"
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
                            className="accent-orange-500 rounded border-slate-300 w-3.5 h-3.5"
                          />
                          <span className="text-[11px] font-semibold text-slate-600 group-hover:text-orange-600 transition-colors">{spec}</span>
                        </label>
                      ))}
                  </div>
                </div>
              </div>

              {/* PROGRAM MODE FILTER */}
              <div className="border-b border-slate-100 pb-5">
                <h5 className="font-outfit font-black text-slate-700 text-xs uppercase tracking-wider flex items-center gap-2 mb-3">
                  <Compass className="w-3.5 h-3.5 text-orange-500" />
                  Program Mode
                </h5>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Search options..."
                    value={progSearch}
                    onChange={(e) => setProgSearch(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:border-orange-400 focus:bg-white transition-all font-semibold"
                  />
                  <div className="max-h-40 overflow-y-auto space-y-2 no-scrollbar pr-1 pt-1">
                    {programModeOptions
                      .filter(opt => opt.toLowerCase().includes(progSearch.toLowerCase()))
                      .map(opt => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedProgramModes.includes(opt)}
                            onChange={() => toggleFilter("programMode", opt)}
                            className="accent-orange-500 rounded border-slate-300 w-3.5 h-3.5"
                          />
                          <span className="text-[11px] font-semibold text-slate-600 group-hover:text-orange-600 transition-colors">{opt}</span>
                        </label>
                      ))}
                  </div>
                </div>
              </div>

              {/* OWNERSHIP FILTER */}
              <div className="border-b border-slate-100 pb-5">
                <h5 className="font-outfit font-black text-slate-700 text-xs uppercase tracking-wider flex items-center gap-2 mb-3">
                  <Award className="w-3.5 h-3.5 text-orange-500" />
                  Ownership
                </h5>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Search options..."
                    value={ownerSearch}
                    onChange={(e) => setOwnerSearch(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:border-orange-400 focus:bg-white transition-all font-semibold"
                  />
                  <div className="max-h-40 overflow-y-auto space-y-2 no-scrollbar pr-1 pt-1">
                    {ownershipOptions
                      .filter(opt => opt.toLowerCase().includes(ownerSearch.toLowerCase()))
                      .map(opt => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedOwnerships.includes(opt)}
                            onChange={() => toggleFilter("ownership", opt)}
                            className="accent-orange-500 rounded border-slate-300 w-3.5 h-3.5"
                          />
                          <span className="text-[11px] font-semibold text-slate-600 group-hover:text-orange-600 transition-colors">{opt}</span>
                        </label>
                      ))}
                  </div>
                </div>
              </div>

              {/* EXAMS ACCEPTED FILTER */}
              <div className="border-b border-slate-100 pb-5">
                <h5 className="font-outfit font-black text-slate-700 text-xs uppercase tracking-wider flex items-center gap-2 mb-3">
                  <FileText className="w-3.5 h-3.5 text-orange-500" />
                  Exams Accepted
                </h5>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Search options..."
                    value={examSearch}
                    onChange={(e) => setExamSearch(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:border-orange-400 focus:bg-white transition-all font-semibold"
                  />
                  <div className="max-h-40 overflow-y-auto space-y-2 no-scrollbar pr-1 pt-1">
                    {examOptions
                      .filter(opt => opt.toLowerCase().includes(examSearch.toLowerCase()))
                      .map(opt => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedExams.includes(opt)}
                            onChange={() => toggleFilter("exam", opt)}
                            className="accent-orange-500 rounded border-slate-300 w-3.5 h-3.5"
                          />
                          <span className="text-[11px] font-semibold text-slate-600 group-hover:text-orange-600 transition-colors">{opt}</span>
                        </label>
                      ))}
                  </div>
                </div>
              </div>

              {/* COURSE TYPE FILTER */}
              <div className="border-b border-slate-100 pb-5">
                <h5 className="font-outfit font-black text-slate-700 text-xs uppercase tracking-wider flex items-center gap-2 mb-3">
                  <GraduationCap className="w-3.5 h-3.5 text-orange-500" />
                  Course Type
                </h5>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Search options..."
                    value={courseTypeSearch}
                    onChange={(e) => setCourseTypeSearch(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:border-orange-400 focus:bg-white transition-all font-semibold"
                  />
                  <div className="max-h-40 overflow-y-auto space-y-2 no-scrollbar pr-1 pt-1">
                    {courseTypeOptions
                      .filter(opt => opt.toLowerCase().includes(courseTypeSearch.toLowerCase()))
                      .map(opt => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedCourseTypes.includes(opt)}
                            onChange={() => toggleFilter("courseType", opt)}
                            className="accent-orange-500 rounded border-slate-300 w-3.5 h-3.5"
                          />
                          <span className="text-[11px] font-semibold text-slate-600 group-hover:text-orange-600 transition-colors">{opt}</span>
                        </label>
                      ))}
                  </div>
                </div>
              </div>

              {/* AFFILIATED BY FILTER */}
              <div className="border-b border-slate-100 pb-5">
                <h5 className="font-outfit font-black text-slate-700 text-xs uppercase tracking-wider flex items-center gap-2 mb-3">
                  <LinkIcon className="w-3.5 h-3.5 text-orange-500" />
                  Affiliated By
                </h5>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Search options..."
                    value={affSearch}
                    onChange={(e) => setAffSearch(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:border-orange-400 focus:bg-white transition-all font-semibold"
                  />
                  <div className="max-h-40 overflow-y-auto space-y-2 no-scrollbar pr-1 pt-1">
                    {affiliationOptions
                      .filter(opt => opt.toLowerCase().includes(affSearch.toLowerCase()))
                      .map(opt => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedAffiliations.includes(opt)}
                            onChange={() => toggleFilter("affiliation", opt)}
                            className="accent-orange-500 rounded border-slate-300 w-3.5 h-3.5"
                          />
                          <span className="text-[11px] font-semibold text-slate-600 group-hover:text-orange-600 transition-colors">{opt}</span>
                        </label>
                      ))}
                  </div>
                </div>
              </div>

              {/* APPROVALS FILTER */}
              <div className="border-b border-slate-100 pb-5">
                <h5 className="font-outfit font-black text-slate-700 text-xs uppercase tracking-wider flex items-center gap-2 mb-3">
                  <CheckCircle className="w-3.5 h-3.5 text-orange-500" />
                  Approvals
                </h5>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Search options..."
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:border-orange-400 focus:bg-white transition-all font-semibold"
                  />
                  <div className="max-h-40 overflow-y-auto space-y-2 no-scrollbar pr-1 pt-1">
                    {approvalOptions
                      .filter(opt => opt.toLowerCase().includes(appSearch.toLowerCase()))
                      .map(opt => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedApprovals.includes(opt)}
                            onChange={() => toggleFilter("approval", opt)}
                            className="accent-orange-500 rounded border-slate-300 w-3.5 h-3.5"
                          />
                          <span className="text-[11px] font-semibold text-slate-600 group-hover:text-orange-600 transition-colors">{opt}</span>
                        </label>
                      ))}
                  </div>
                </div>
              </div>

              {/* TOTAL FEES FILTER */}
              <div className="pb-2">
                <h5 className="font-outfit font-black text-slate-700 text-xs uppercase tracking-wider flex items-center gap-2 mb-3">
                  <DollarSign className="w-3.5 h-3.5 text-orange-500" />
                  Total Fees
                </h5>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Search options..."
                    value={feesSearch}
                    onChange={(e) => setFeesSearch(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:border-orange-400 focus:bg-white transition-all font-semibold"
                  />
                  <div className="max-h-40 overflow-y-auto space-y-2 no-scrollbar pr-1 pt-1">
                    {feesRangeOptions
                      .filter(opt => opt.toLowerCase().includes(feesSearch.toLowerCase()))
                      .map(opt => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedFeesRanges.includes(opt)}
                            onChange={() => toggleFilter("feesRange", opt)}
                            className="accent-orange-500 rounded border-slate-300 w-3.5 h-3.5"
                          />
                          <span className="text-[11px] font-semibold text-slate-600 group-hover:text-orange-600 transition-colors">{opt}</span>
                        </label>
                      ))}
                  </div>
                </div>
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
                                  <MapPin className="w-3.5 h-3.5 text-slate-405" />
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
                              <BookOpen className="w-3.5 h-3.5 text-slate-400 animate-pulse" />
                              Courses
                            </p>
                            <p className="font-outfit font-black text-[11px] text-slate-700 uppercase">
                              {college.courses.join(", ")}
                            </p>
                          </div>
                          
                          <div className="space-y-1 border-r border-slate-100/60 last:border-0">
                            <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest flex items-center justify-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                              Exams Accepted
                            </p>
                            <p className="font-outfit font-black text-[11px] text-slate-700">
                              {college.exams.join(", ")}
                            </p>
                          </div>

                          <div className="space-y-1 border-r border-slate-100/60 last:border-0">
                            <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest flex items-center justify-center gap-1">
                              <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                              Tuition Fees
                            </p>
                            <p className="font-outfit font-black text-[11px] text-orange-600">
                              {college.feeRange}
                            </p>
                          </div>

                          <div className="space-y-1 last:border-0">
                            <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest flex items-center justify-center gap-1">
                              <Award className="w-3.5 h-3.5 text-slate-400" />
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
