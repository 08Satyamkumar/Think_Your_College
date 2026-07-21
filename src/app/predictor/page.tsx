"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  Search, 
  MapPin, 
  Star,
  Users,
  TrendingUp,
  FileText
} from "lucide-react";
import Link from "next/link";

interface PredictedCollege {
  name: string;
  location: string;
  cutoffRank: number;
  highestPackage: string;
  fees: string;
  chance: "High" | "Medium" | "Low"; // safe, moderate, ambitious
  slug: string;
}

export default function PredictorPage() {
  const [step, setStep] = useState(1);
  const [exam, setExam] = useState("JEE Main");
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("General");
  const [prefState, setPrefState] = useState("All");
  const [isPredicting, setIsPredicting] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const exams = ["JEE Main", "NEET UG", "CAT", "CLAT"];
  const categories = ["General", "OBC", "SC", "ST", "EWS"];
  const states = ["All", "Delhi", "Karnataka", "Maharashtra", "Gujarat", "Uttar Pradesh"];

  // Mock Prediction Database matching the inputs
  const mockPredictions: PredictedCollege[] = [
    { name: "IIT Delhi - Indian Institute of Technology", location: "New Delhi, Delhi", cutoffRank: 120, highestPackage: "1.2 Cr PA", fees: "₹2.2 Lakhs/Yr", chance: "Low", slug: "iit-delhi" },
    { name: "RV College of Engineering", location: "Bangalore, Karnataka", cutoffRank: 2500, highestPackage: "48.5 Lakhs PA", fees: "₹2.5 Lakhs/Yr", chance: "High", slug: "rv-college-of-engineering" },
    { name: "Galgotias University", location: "Greater Noida, Uttar Pradesh", cutoffRank: 15000, highestPackage: "35.0 Lakhs PA", fees: "₹1.6 Lakhs/Yr", chance: "High", slug: "galgotias-university" },
    { name: "SIBM Pune - Symbiosis Institute of Business Management", location: "Pune, Maharashtra", cutoffRank: 98.2, highestPackage: "45.5 Lakhs PA", fees: "₹10.2 Lakhs/Yr", chance: "Medium", slug: "sibm-pune" }
  ];

  const handlePredict = () => {
    if (!rank || isNaN(Number(rank))) {
      alert("Please enter a valid rank/percentile score.");
      return;
    }
    setIsPredicting(true);
    setTimeout(() => {
      setIsPredicting(false);
      setShowResults(true);
    }, 1500); // simulated calculation loader
  };

  const handleReset = () => {
    setStep(1);
    setRank("");
    setCategory("General");
    setPrefState("All");
    setShowResults(false);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="font-outfit font-extrabold text-3xl text-text_primary flex items-center justify-center gap-3">
          <Award className="w-8 h-8 text-primary" />
          Rank & College Predictor
        </h1>
        <p className="text-sm text-text_secondary max-w-md mx-auto">
          Get real-time admission probability based on past closing cutoffs of major Indian counseling bodies.
        </p>
      </div>

      {/* WIZARD CONTAINER */}
      {!showResults ? (
        <div className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm space-y-8 relative overflow-hidden">
          
          {/* STEP INDICATOR */}
          <div className="flex items-center justify-between pb-6 border-b border-border text-xs font-bold text-text_secondary">
            <span className={step >= 1 ? "text-primary" : ""}>1. Select Exam</span>
            <span className="w-12 h-px bg-border" />
            <span className={step >= 2 ? "text-primary" : ""}>2. Score Details</span>
            <span className="w-12 h-px bg-border" />
            <span className={step >= 3 ? "text-primary" : ""}>3. Preferences</span>
          </div>

          {/* STEP CONTENT WITH MOTION */}
          <div className="min-h-[180px] flex flex-col justify-center">
            {isPredicting ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-bold text-text_primary">Analyzing cutoff databases...</p>
                <p className="text-xs text-text_secondary">Checking seat matrices & reservation criteria</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <label className="text-xs text-text_secondary font-bold uppercase tracking-wider">Select Counseling Exam</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {exams.map(ex => (
                        <button
                          key={ex}
                          onClick={() => setExam(ex)}
                          className={`p-4 rounded-xl border text-center font-bold text-xs transition-all ${
                            exam === ex 
                              ? "bg-primary border-primary text-white shadow-md shadow-primary/10" 
                              : "bg-background border-border text-text_secondary hover:bg-border/30 hover:text-text_primary"
                          }`}
                        >
                          {ex}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-text_secondary font-bold uppercase tracking-wider">
                          Enter {exam === "CAT" ? "Percentile" : "CRL Rank"}
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder={exam === "CAT" ? "e.g. 98.5" : "e.g. 2500"}
                          value={rank}
                          onChange={(e) => setRank(e.target.value)}
                          className="w-full px-3.5 py-2.5 border border-border bg-background rounded-xl text-sm outline-none focus:border-primary text-text_primary font-bold"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-text_secondary font-bold uppercase tracking-wider">Quota Category</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-3.5 py-2.5 border border-border bg-background rounded-xl text-sm outline-none focus:border-primary text-text_primary font-bold"
                        >
                          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <label className="text-xs text-text_secondary font-bold uppercase tracking-wider">Preferred State Preference</label>
                    <select
                      value={prefState}
                      onChange={(e) => setPrefState(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-border bg-background rounded-xl text-sm outline-none focus:border-primary text-text_primary font-bold"
                    >
                      {states.map(st => <option key={st} value={st}>{st === "All" ? "Any State (All India)" : st}</option>)}
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* WIZARD ACTIONS */}
          {!isPredicting && (
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <button
                disabled={step === 1}
                onClick={() => setStep(step - 1)}
                className={`flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-xs font-bold text-text_secondary hover:bg-border/30 disabled:opacity-0 transition-opacity`}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary_hover text-white text-xs font-bold rounded-xl active:scale-95 transition-all shadow-sm"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handlePredict}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-premium hover:bg-primary text-white text-xs font-bold rounded-xl active:scale-95 transition-all shadow-md shadow-primary/20"
                >
                  Predict My College
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        /* RESULTS INTERFACE */
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* USER DATA SUMMARY BAR */}
          <div className="flex flex-wrap items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-2xl text-xs font-semibold text-primary gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
              <span>Exam: <strong>{exam}</strong></span>
              <span>Score/Rank: <strong>{rank}</strong></span>
              <span>Category: <strong>{category}</strong></span>
              <span>Location Pref: <strong>{prefState === "All" ? "All India" : prefState}</strong></span>
            </div>
            <button 
              onClick={handleReset}
              className="px-3.5 py-1.5 bg-primary text-white rounded-lg font-bold"
            >
              Recalculate
            </button>
          </div>

          {/* DYNAMIC RESULTS LIST */}
          <div className="space-y-4">
            <h3 className="font-outfit font-extrabold text-lg text-text_primary">Predicted Colleges for You</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockPredictions.map((college, idx) => (
                <div 
                  key={idx}
                  className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:border-primary/20 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className={`px-2 py-0.5 rounded-lg text-[9px] font-extrabold uppercase ${
                        college.chance === "High" 
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : college.chance === "Medium"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "bg-red-500/10 text-red-600 dark:text-red-400"
                      }`}>
                        {college.chance} Chance of Admission
                      </span>
                    </div>

                    <div>
                      <h4 className="font-outfit font-bold text-sm text-text_primary leading-snug">{college.name}</h4>
                      <p className="flex items-center gap-1.5 text-[10px] text-text_secondary mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {college.location}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-2 px-3 bg-background border border-border rounded-xl text-[10px]">
                      <div>
                        <p className="text-[8px] text-text_secondary font-semibold">Highest Package</p>
                        <p className="font-outfit font-extrabold text-text_primary mt-0.5">{college.highestPackage}</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-text_secondary font-semibold">Annual Fee</p>
                        <p className="font-outfit font-extrabold text-text_primary mt-0.5">{college.fees}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 mt-2 border-t border-border/40">
                    <Link 
                      href={`/colleges/${college.slug}`}
                      className="flex-1 py-1.5 text-center border border-border hover:bg-border/30 rounded-lg text-[10px] font-bold text-text_primary transition-colors"
                    >
                      College Info
                    </Link>
                    <button
                      onClick={() => alert(`Counseling callback booked for ${college.name}`)}
                      className="flex-1 py-1.5 bg-gradient-premium hover:bg-primary text-white font-bold text-[10px] rounded-lg shadow-sm transition-all"
                    >
                      Secure Seat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DOWLOAD REPORT CARD */}
          <div className="bg-card border border-border p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2">
              <h4 className="font-outfit font-bold text-base text-text_primary">Download Counselling Predictor PDF</h4>
              <p className="text-xs text-text_secondary max-w-md">
                Get a comprehensive guide sent to your email, featuring opening/closing ranks of the last 3 years and detailed counseling steps.
              </p>
            </div>
            <button 
              onClick={() => alert("Downloading PDF guide...")}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
            >
              <FileText className="w-4 h-4" />
              Download Report PDF
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
