"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Search, 
  Award, 
  HelpCircle, 
  Building2, 
  BookOpen, 
  ArrowRight, 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle,
  X
} from "lucide-react";

interface ScholarshipScheme {
  id: string;
  name: string;
  provider: string;
  type: "Government" | "Private" | "Loan";
  benefit: string;
  description: string;
  eligibility: string;
  actionText: string;
}

export default function ScholarshipPage() {
  // Form state variables
  const [domicile, setDomicile] = useState("Bihar");
  const [income, setIncome] = useState("under_2_5");
  const [category, setCategory] = useState("OBC");
  const [stream, setStream] = useState("Engineering");
  const [exam, setExam] = useState("JEE Main");
  const [score, setScore] = useState("");
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<ScholarshipScheme[]>([]);

  const handleEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    const scoreNum = parseFloat(score) || 0;
    const incomeNum = income === "under_1" ? 1.0 : income === "under_2_5" ? 2.5 : income === "under_8" ? 8.0 : 15.0;

    const matchedSchemes: ScholarshipScheme[] = [];

    // 1. BIHAR SPECIFIC SCHEMES
    if (domicile === "Bihar") {
      // Bihar Student Credit Card
      if (incomeNum <= 8.0 && (stream === "Engineering" || stream === "Medical" || stream === "Management")) {
        matchedSchemes.push({
          id: "bscc",
          name: "Bihar Student Credit Card Scheme (BSCCS)",
          provider: "Government of Bihar",
          type: "Loan",
          benefit: "Up to ₹4 Lakhs @ 1% (Girls/PwD) or 4% (Boys) Interest",
          description: "Zero collateral education loan for pursuing higher professional education. Interest starts only after course completion.",
          eligibility: "Bihar Domicile, Age under 28, enrolled in an approved institute.",
          actionText: "Apply via DRCC Portal"
        });
      }

      // Bihar Post-Matric Scholarship
      if (category !== "General" && incomeNum <= 2.5) {
        matchedSchemes.push({
          id: "bihar_pms",
          name: "Bihar Post-Matric Scholarship (BC-EBC/SC-ST)",
          provider: "Government of Bihar",
          type: "Government",
          benefit: "Full Tuition Fee Reimbursement",
          description: "Direct benefit transfer of academic tuition and compulsory fees to students from backward categories.",
          eligibility: "Family income under ₹2.5 Lakhs, Category: SC/ST/BC/EBC.",
          actionText: "Register on PMS Bihar Portal"
        });
      }
    }

    // 2. JHARKHAND SPECIFIC SCHEMES
    if (domicile === "Jharkhand") {
      // Guruji Student Credit Card
      if (incomeNum <= 8.0) {
        matchedSchemes.push({
          id: "jh_gscc",
          name: "Guruji Student Credit Card Scheme (GSCCS)",
          provider: "Government of Jharkhand",
          type: "Loan",
          benefit: "Up to ₹15 Lakhs @ 4% Simple Interest",
          description: "Higher education loan with simple interest rates. No security or guarantor required.",
          eligibility: "Jharkhand Domicile, Passed 10th & 12th from Jharkhand.",
          actionText: "Apply via GSCC Jharkhand Portal"
        });
      }

      // E-Kalyan Post-Matric Scholarship
      if (category !== "General" && incomeNum <= 2.5) {
        matchedSchemes.push({
          id: "ekalyan",
          name: "E-Kalyan Jharkhand Post-Matric Scholarship",
          provider: "Jharkhand Welfare Dept",
          type: "Government",
          benefit: "₹20,000 to ₹1.5 Lakhs per Year",
          description: "Financial assistance for SC, ST, and OBC candidates studying in recognized technical/medical degrees.",
          eligibility: "Family income under ₹2.5 Lakhs. OBC/SC/ST category.",
          actionText: "Apply on E-Kalyan Portal"
        });
      }
    }

    // 3. UTTAR PRADESH SPECIFIC SCHEMES
    if (domicile === "Uttar Pradesh") {
      // UP Post-Matric Scholarship
      const upIncomeLimit = category === "SC" || category === "ST" ? 2.5 : 2.0;
      if (incomeNum <= upIncomeLimit) {
        matchedSchemes.push({
          id: "up_pms",
          name: "UP Saksham Post-Matric Scholarship Scheme",
          provider: "Social Welfare Dept, UP",
          type: "Government",
          benefit: "100% Tuition Fee Reimbursement + Monthly Allowance",
          description: "Online scholarship application for fee reimbursement and scholarship amount matching government fee structures.",
          eligibility: `Family income under ₹${upIncomeLimit} Lakhs. Open to General/OBC/SC/ST.`,
          actionText: "Register on UP Scholarship Portal"
        });
      }
    }

    // 4. CENTRAL / MERIT SCHEMES
    // NSP Central Sector Scheme
    if (exam === "Class 12 Boards" && scoreNum >= 80) {
      matchedSchemes.push({
        id: "nsp_css",
        name: "Central Sector Scheme of Scholarship (CSSS)",
        provider: "Ministry of Education, Govt of India",
        type: "Government",
        benefit: "₹12,000 to ₹20,000 per Year",
        description: "Assistance to meritorious college students to meet day-to-day expenses while pursuing professional courses.",
        eligibility: "Above 80th percentile in Class 12 Boards. Family income under ₹4.5 Lakhs.",
        actionText: "Apply via NSP Portal"
      });
    }

    // Pragati Scholarship for Girls
    if (exam === "Class 12 Boards" && scoreNum >= 75) {
      matchedSchemes.push({
        id: "pragati",
        name: "PRAGATI Scholarship Scheme for Girls",
        provider: "AICTE, Govt of India",
        type: "Government",
        benefit: "₹50,000 per Year (Tuition Fee + Contingency)",
        description: "Awarded to meritorious girl students admitted to technical degree/diploma courses in AICTE institutions.",
        eligibility: "Maximum 2 girls per family. Income under ₹8 Lakhs. Admitted in technical streams.",
        actionText: "Apply via NSP Portal"
      });
    }

    // CSIS Loan Subsidy
    if (incomeNum <= 4.5) {
      matchedSchemes.push({
        id: "csis",
        name: "Central Sector Interest Subsidy Scheme (CSIS)",
        provider: "Ministry of Education, Govt of India",
        type: "Loan",
        benefit: "100% Interest Subsidy During Moratorium Period",
        description: "Interest subsidy on education loans from scheduled banks for professional degrees.",
        eligibility: "Family income under ₹4.5 Lakhs. Admitted in technical/professional degrees.",
        actionText: "Claim via Bank Branch"
      });
    }

    // 5. PRIVATE SCHEMES
    // Reliance Foundation Under-Graduate Scholarship
    if (scoreNum > 0 && incomeNum <= 15.0) {
      matchedSchemes.push({
        id: "reliance",
        name: "Reliance Foundation Undergraduate Scholarship",
        provider: "Reliance Foundation",
        type: "Private",
        benefit: "Up to ₹2 Lakhs (Cumulative)",
        description: "Support for undergraduate students in any stream based on aptitude test and financial eligibility.",
        eligibility: "Class 12 pass with min 60% marks. Family income under ₹15 Lakhs (preference < 2.5 Lakhs).",
        actionText: "Apply on Reliance Portal"
      });
    }

    // Tata Capital Pankh
    if (incomeNum <= 4.0) {
      matchedSchemes.push({
        id: "tata_pankh",
        name: "Tata Capital Pankh Scholarship Program",
        provider: "Tata Capital",
        type: "Private",
        benefit: "Up to 80% of Tuition Fees (Max ₹12,000)",
        description: "Scholarship support for students pursuing general graduation or professional courses.",
        eligibility: "Class 12 pass with min 60%. Family income under ₹4 Lakhs.",
        actionText: "Apply on Buddy4Study Portal"
      });
    }

    setResults(matchedSchemes);
    setIsCalculated(true);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-10 space-y-12">
      {/* HEADER HERO */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 text-orange-600 border border-orange-500/20 text-xs font-black uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          Financial Aid Estimator
        </div>
        <h1 className="font-outfit font-black text-3xl md:text-4xl text-slate-900 tracking-tight leading-none uppercase">
          Scholarship & Loan Estimator 🎓
        </h1>
        <p className="text-sm text-slate-500 font-semibold leading-relaxed">
          Find government credit card schemes, post-matric fee reimbursements, and private scholarships based on your category, income, and academic merit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* INPUT FORM PANEL */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-md shadow-slate-100 flex flex-col gap-5">
          <div>
            <h3 className="font-outfit font-black text-sm text-slate-800 uppercase tracking-wide">Enter Student Details</h3>
            <p className="text-[10px] text-slate-400 font-semibold">We match these parameters with eligibility rules</p>
          </div>

          <form onSubmit={handleEstimate} className="space-y-4">
            {/* Domicile State */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Domicile State</label>
              <select 
                value={domicile} 
                onChange={(e) => setDomicile(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-orange-400 focus:bg-white transition-all font-semibold"
              >
                <option value="Bihar">Bihar</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Delhi">Delhi</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Other">Other State</option>
              </select>
            </div>

            {/* Annual Family Income */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Annual Family Income</label>
              <select 
                value={income} 
                onChange={(e) => setIncome(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-orange-400 focus:bg-white transition-all font-semibold"
              >
                <option value="under_1">Below ₹1.0 Lakh</option>
                <option value="under_2_5">₹1.0 Lakh - ₹2.5 Lakhs</option>
                <option value="under_8">₹2.5 Lakhs - ₹8.0 Lakhs</option>
                <option value="above_8">Above ₹8.0 Lakhs</option>
              </select>
            </div>

            {/* Social Category */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Category</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-orange-400 focus:bg-white transition-all font-semibold"
              >
                <option value="General">General (Unreserved)</option>
                <option value="OBC">OBC (Backward Class)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
              </select>
            </div>

            {/* Course Stream */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Target Course Stream</label>
              <select 
                value={stream} 
                onChange={(e) => setStream(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-orange-400 focus:bg-white transition-all font-semibold"
              >
                <option value="Engineering">Engineering (B.Tech / B.E)</option>
                <option value="Medical">Medical (MBBS / BDS)</option>
                <option value="Management">Management (MBA / BBA)</option>
                <option value="Law">Law (LLB / BA-LLB)</option>
                <option value="Other">General graduation / Science / Arts</option>
              </select>
            </div>

            {/* Academic Merit Exam */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Exam Taken</label>
                <select 
                  value={exam} 
                  onChange={(e) => { setExam(e.target.value); setScore(""); }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-orange-400 focus:bg-white transition-all font-semibold"
                >
                  <option value="JEE Main">JEE Main</option>
                  <option value="NEET UG">NEET UG</option>
                  <option value="Class 12 Boards">Class 12 Boards</option>
                  <option value="Other">Other / General Merit</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Score / Rank</label>
                <input
                  type="number"
                  required
                  placeholder={exam === "Class 12 Boards" ? "E.g. 85%" : "E.g. Rank"}
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-orange-400 focus:bg-white transition-all font-semibold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md shadow-orange-500/20 active:scale-95 transition-all mt-4"
            >
              Calculate Eligible Schemes
            </button>
          </form>
        </div>

        {/* RESULTS PANEL */}
        <div className="lg:col-span-8 space-y-6">
          {!isCalculated ? (
            <div className="p-16 border-2 border-dashed border-slate-200 rounded-3xl text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400 shadow-sm">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="font-outfit font-black text-lg text-slate-800 uppercase tracking-wide">Awaiting Inputs</h3>
              <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto leading-relaxed">
                Fill out the student details form on the left to estimate eligible government credits, post-matric benefits, and corporate scholarships.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header result count */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-outfit font-black text-base text-slate-800 uppercase tracking-wide">
                    Matched ({results.length}) Schemes Found
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Based on category, state, and score filters</p>
                </div>
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-wider border border-emerald-100">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Schemes
                </div>
              </div>

              {results.length === 0 ? (
                <div className="p-16 bg-slate-50 border border-slate-200/60 rounded-3xl text-center space-y-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-slate-400 border border-slate-200 shadow-sm">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="font-outfit font-black text-base text-slate-800 uppercase tracking-wide">No Direct Match Found</h4>
                  <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto leading-relaxed">
                    Don't worry! You can book a free profile session with our counselor to check alternative college tuition waivers.
                  </p>
                  <button 
                    onClick={() => alert("Connecting with Counselor...")}
                    className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all"
                  >
                    Consult counselor
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.map((scheme) => (
                    <div 
                      key={scheme.id}
                      className="bg-white border border-slate-200/80 rounded-3xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all hover:border-orange-500/25 relative group overflow-hidden"
                    >
                      {/* Left border indicator by type */}
                      <div className={`absolute left-0 inset-y-0 w-1.5 ${
                        scheme.type === "Government" ? "bg-orange-500" : scheme.type === "Loan" ? "bg-emerald-500" : "bg-indigo-500"
                      }`} />

                      {/* Card Header */}
                      <div className="space-y-1.5 pl-2">
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                            scheme.type === "Government" 
                              ? "bg-orange-50 text-orange-600 border border-orange-100" 
                              : scheme.type === "Loan"
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                              : "bg-indigo-50 text-indigo-600 border border-indigo-100"
                          }`}>
                            {scheme.type}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold">{scheme.provider}</span>
                        </div>
                        <h4 className="font-outfit font-bold text-sm text-slate-800 leading-snug group-hover:text-primary transition-colors">
                          {scheme.name}
                        </h4>
                      </div>

                      {/* Benefit highlighting */}
                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between gap-3 pl-5">
                        <div className="space-y-0.5">
                          <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider leading-none">Estimate Aid</p>
                          <p className="font-outfit font-extrabold text-xs text-slate-800 mt-1">{scheme.benefit}</p>
                        </div>
                        <Award className="w-5.5 h-5.5 text-orange-500 shrink-0 opacity-80" />
                      </div>

                      {/* Description */}
                      <p className="text-[11px] text-slate-500 font-semibold leading-relaxed pl-2">
                        {scheme.description}
                      </p>

                      {/* Eligibility rule checklist */}
                      <div className="text-[10px] text-slate-600 font-semibold bg-slate-50/50 border border-slate-100 p-2.5 rounded-xl flex items-start gap-1.5 pl-3">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span><strong>Eligibility:</strong> {scheme.eligibility}</span>
                      </div>

                      {/* Action trigger button */}
                      <button 
                        onClick={() => alert(`Redirecting to registration portal for: ${scheme.name}`)}
                        className="w-full mt-auto py-2 bg-slate-950 hover:bg-orange-500 text-white font-black text-[10px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1 shadow-sm active:scale-95"
                      >
                        {scheme.actionText}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <div className="bg-slate-50 border border-slate-200/50 rounded-3xl p-8 space-y-6">
        <div>
          <h3 className="font-outfit font-black text-base text-slate-800 uppercase tracking-wide">Frequently Asked Questions</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Clear doubt updates about financial assistance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 p-5 bg-white border border-slate-100 rounded-2xl">
            <h5 className="font-outfit font-bold text-xs text-slate-800 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-orange-500 shrink-0" />
              What is the Bihar Student Credit Card Scheme (BSCCS)?
            </h5>
            <p className="text-[11px] leading-relaxed text-slate-500 font-semibold pl-5.5">
              BSCCS is a government initiative providing collateral-free loans up to ₹4 Lakhs at a simple interest rate of 1% for girls/transgender/disabled and 4% for boys to pursue higher professional education.
            </p>
          </div>

          <div className="space-y-2 p-5 bg-white border border-slate-100 rounded-2xl">
            <h5 className="font-outfit font-bold text-xs text-slate-800 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-orange-500 shrink-0" />
              How does the Central Sector Interest Subsidy (CSIS) work?
            </h5>
            <p className="text-[11px] leading-relaxed text-slate-500 font-semibold pl-5.5">
              Under CSIS, students with family incomes under ₹4.5 Lakhs who take educational loans receive a 100% interest waiver from the Government of India during their course duration plus one year.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
