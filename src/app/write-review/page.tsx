"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Search,
  CheckCircle,
  FileText,
  AlertTriangle,
  Award,
  BookOpen,
  ArrowLeft,
  X,
  Send,
  Loader2,
  BookmarkCheck,
} from "lucide-react";

interface College {
  id: string;
  name: string;
  location: string;
  stream: string;
}

export default function WriteReviewPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoadingColleges, setIsLoadingColleges] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Form states
  const [showFormModal, setShowFormModal] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentCourse, setStudentCourse] = useState("");
  const [academicYear, setAcademicYear] = useState("2025");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [ratings, setRatings] = useState({
    placements: 5,
    infrastructure: 5,
    faculty: 5,
    campusLife: 5,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch colleges when searchQuery changes (with simple debounce-like behavior via useEffect)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchColleges(searchQuery);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const fetchColleges = async (query: string) => {
    setIsLoadingColleges(true);
    try {
      const res = await fetch(
        `/api/colleges?search=${encodeURIComponent(query)}&limit=15`,
      );
      if (res.ok) {
        const data = await res.json();
        setColleges(data.colleges || []);
      }
    } catch (err) {
      console.error("Error fetching colleges:", err);
    } finally {
      setIsLoadingColleges(false);
    }
  };

  const handleRatingChange = (key: keyof typeof ratings, val: number) => {
    setRatings((prev) => ({ ...prev, [key]: val }));
  };

  const handleStartWriting = () => {
    if (!selectedCollege) {
      setErrorMessage("Please select a college from the list first.");
      return;
    }
    setErrorMessage("");
    setShowFormModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentPhone || !reviewContent) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const payload = {
        name: studentName,
        email: studentEmail,
        phone: studentPhone,
        college_interest: selectedCollege?.name || "",
        course_interest: `${studentCourse} (Acad Year: ${academicYear})`,
        state_interest: `Review Ratings - Placements: ${ratings.placements}/5, Infra: ${ratings.infrastructure}/5, Faculty: ${ratings.faculty}/5, Life: ${ratings.campusLife}/5 | Title: ${reviewTitle} | Review: ${reviewContent}`,
        status: "Review Submitted",
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        // Reset form
        setStudentName("");
        setStudentEmail("");
        setStudentPhone("");
        setStudentCourse("");
        setReviewTitle("");
        setReviewContent("");
        setRatings({
          placements: 5,
          infrastructure: 5,
          faculty: 5,
          campusLife: 5,
        });
      } else {
        const data = await res.json();
        setErrorMessage(
          data.error || "Failed to submit review. Please try again.",
        );
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      setErrorMessage(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-36 pb-20 select-none px-4 md:px-8 max-w-[1280px] mx-auto space-y-12">
      {/* Back to Home Link */}
      <div className="flex items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-orange-500 uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* HERO SECTION / BANNER CARD */}
      <section className="relative overflow-hidden rounded-[32px] border border-orange-200/40 shadow-md flex flex-col md:flex-row items-stretch bg-[#032b53] text-white min-h-[220px] md:min-h-[280px] py-8 md:py-12">
        {/* Slanted Accent Panel (Solid Saffron matching Header exactly) */}
        <div className="absolute top-0 left-0 bottom-0 w-[35%] bg-[#f47920] [clip-path:polygon(0_0,100%_0,82%_100%,0_100%)] hidden md:block z-10" />

        {/* Mobile Brand Accent */}
        <div className="w-full h-24 bg-[#f47920] flex md:hidden items-center justify-center relative overflow-hidden z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_60%)]" />
          <img
            src="/logo.png"
            alt="College 19"
            className="h-14 w-auto object-contain"
          />
        </div>

        {/* Brand Logo Container on Left (Desktop) */}
        <div className="absolute top-0 left-0 bottom-0 w-[32%] hidden md:flex flex-col items-center justify-center z-20 pl-8">
          <img
            src="/logo.png"
            alt="College 19"
            className="h-20 w-auto object-contain"
          />
          <span className="text-[9px] uppercase tracking-[0.25em] font-black text-white/90 mt-2">
            Review & Reward
          </span>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-8 flex flex-col items-center justify-center gap-6 relative z-10 md:pl-[38%] text-center">
          <div className="absolute right-0 bottom-0 w-44 h-44 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-black uppercase tracking-wider text-orange-200">
              🏆 Earn Incentives For Your Voice
            </span>
            <h1 className="font-outfit font-black text-2xl md:text-4xl text-white leading-tight">
              Write a Review & Win Monthly Prizes Upto{" "}
              <span className="text-yellow-300">₹10,000*</span>
            </h1>
            <p className="text-xs md:text-sm text-white/80 leading-relaxed font-semibold">
              Earn Up to Rs. 500 Per Approved Review and Rs. 10,000 Monthly
              Through Referrals!
            </p>
          </div>

          {/* SEARCH & SELECT COLLEGE DROPDOWN */}
          <div className="w-full max-w-md relative z-30 mt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={
                    selectedCollege
                      ? selectedCollege.name
                      : "Search & select college..."
                  }
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedCollege(null);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  className="w-full pl-10 pr-4 py-3 bg-white text-slate-800 text-xs font-bold rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 transition-colors shadow-sm placeholder:text-slate-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

                {selectedCollege && (
                  <button
                    onClick={() => {
                      setSelectedCollege(null);
                      setSearchQuery("");
                    }}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Dropdown overlay */}
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50 text-left no-scrollbar"
                    >
                      {isLoadingColleges ? (
                        <div className="p-4 flex items-center justify-center gap-2 text-xs text-slate-500 font-bold">
                          <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                          Searching colleges...
                        </div>
                      ) : colleges.length > 0 ? (
                        colleges.map((college) => (
                          <button
                            key={college.id}
                            type="button"
                            onClick={() => {
                              setSelectedCollege(college);
                              setSearchQuery("");
                              setShowDropdown(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-orange-50 border-b border-slate-50 last:border-b-0 flex flex-col transition-colors cursor-pointer"
                          >
                            <span className="text-xs font-black text-slate-800">
                              {college.name}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 mt-0.5">
                              {college.location} | {college.stream}
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="p-4 text-xs text-slate-400 font-bold text-center">
                          No colleges found matching "{searchQuery}"
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={handleStartWriting}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-red-500/10 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                Start Writing
              </button>
            </div>
            {errorMessage && (
              <p className="text-[10.5px] text-red-300 font-bold mt-2 text-center flex items-center justify-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* HOW TO WIN REWARDS & GUIDELINES GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns: How to Win Rewards */}
        <section className="lg:col-span-7 bg-white border border-slate-200/50 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="font-outfit font-black text-xl md:text-2xl text-slate-800 flex items-center gap-2.5">
              <Award className="w-6 h-6 text-orange-500" />
              How to Win Rewards?
            </h2>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-black text-sm shrink-0">
                1
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black text-slate-800">
                  Submit Your College Review
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Earn Rs. 200 to Rs. 500 for every approved review. You can
                  also earn extra for reviews of selected premium colleges.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-black text-sm shrink-0">
                2
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black text-slate-800">
                  Collect Your Referral Code
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Earn Rs. 200 for successfully referring someone to submit an
                  approved college course review. Every approved review via
                  referral guarantees an additional Rs. 40 to Rs. 100.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-black text-sm shrink-0">
                3
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black text-slate-800">
                  Reach the Top 10 of the Leaderboard
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Top three referrers earn cash bonuses of Rs. 15,000, Rs.
                  12,000, and Rs. 7,000 respectively. The next seven referrers
                  earn Rs. 2,000 each.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right 5 Columns: Rules and Do's & Don'ts */}
        <section className="lg:col-span-5 bg-white border border-slate-200/50 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="font-outfit font-black text-xl text-slate-800 flex items-center gap-2">
              <BookOpen className="w-5.5 h-5.5 text-orange-500" />
              Do's & Don'ts To Remember
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2.5 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                <strong className="text-slate-800 font-black">
                  Be Factual
                </strong>{" "}
                - Mention facts truthfully based on real placements and
                infrastructure data.
              </p>
            </div>
            <div className="flex gap-2.5 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                <strong className="text-slate-800 font-black">Be Decent</strong>{" "}
                - Be respectful when criticizing; abusive words or generic texts
                will not be approved.
              </p>
            </div>
            <div className="flex gap-2.5 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                <strong className="text-slate-800 font-black">
                  Be Original
                </strong>{" "}
                - Your review must be completely original; copy-paste content
                will be auto-rejected.
              </p>
            </div>
            <div className="flex gap-2.5 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                <strong className="text-slate-800 font-black">
                  Be Patient
                </strong>{" "}
                - Each approved review carries points (1 point = Rs. 0.5)
                approved within 30 minutes!
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* POPUP REVIEW FORM MODAL */}
      <AnimatePresence>
        {showFormModal && selectedCollege && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden relative border border-slate-100 my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowFormModal(false);
                  setSubmitSuccess(false);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all text-slate-500 hover:text-slate-800 z-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Success Screen */}
              {submitSuccess ? (
                <div className="p-8 md:p-12 text-center space-y-5 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                    <BookmarkCheck className="w-8 h-8" />
                  </div>
                  <h3 className="font-outfit font-black text-2xl text-slate-800">
                    Review Submitted Successfully!
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 max-w-sm leading-relaxed font-bold">
                    Thank you for sharing your experience. Our verification team
                    will review your feedback and approve the rewards within 30
                    minutes!
                  </p>
                  <button
                    onClick={() => {
                      setShowFormModal(false);
                      setSubmitSuccess(false);
                      setSelectedCollege(null);
                      setSearchQuery("");
                    }}
                    className="px-6 py-2.5 bg-[#032b53] hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
                  >
                    Back to Listing
                  </button>
                </div>
              ) : (
                /* Form View */
                <form
                  onSubmit={handleFormSubmit}
                  className="p-6 md:p-8 space-y-6"
                >
                  <div>
                    <h3 className="font-outfit font-black text-xl text-slate-800">
                      Write Review for:
                    </h3>
                    <p className="text-xs font-black text-orange-600 mt-1 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      {selectedCollege.name} ({selectedCollege.location})
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                        Your Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Enter your name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full mt-1.5 px-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-xs font-bold text-slate-800 outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                        Phone Number *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="Enter 10-digit number"
                        value={studentPhone}
                        onChange={(e) => setStudentPhone(e.target.value)}
                        className="w-full mt-1.5 px-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-xs font-bold text-slate-800 outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                        Course Pursued *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. B.Tech CSE / MBA"
                        value={studentCourse}
                        onChange={(e) => setStudentCourse(e.target.value)}
                        className="w-full mt-1.5 px-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-xs font-bold text-slate-800 outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                        Academic Year *
                      </label>
                      <select
                        value={academicYear}
                        onChange={(e) => setAcademicYear(e.target.value)}
                        className="w-full mt-1.5 px-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-xs font-bold text-slate-800 outline-none focus:border-orange-500 transition-colors"
                      >
                        <option value="2026">2026 Batch</option>
                        <option value="2025">2025 Batch</option>
                        <option value="2024">2024 Batch</option>
                        <option value="2023">2023 Batch</option>
                      </select>
                    </div>
                  </div>

                  {/* Ratings Star Grid */}
                  <div className="p-4 bg-slate-50 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.keys(ratings).map((key) => {
                      const label = key.replace(/([A-Z])/g, " $1");
                      const currentVal = ratings[key as keyof typeof ratings];
                      return (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <span className="text-[10px] text-slate-600 font-extrabold uppercase tracking-wider">
                            {label} *
                          </span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() =>
                                  handleRatingChange(
                                    key as keyof typeof ratings,
                                    star,
                                  )
                                }
                                className="focus:outline-none"
                              >
                                <Star
                                  className={`w-4 h-4 ${
                                    star <= currentVal
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-slate-300"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                        Review Title *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Honest placement review of my college"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        className="w-full mt-1.5 px-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-xs font-bold text-slate-800 outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                        Descriptive Review Details * (Min 100 characters)
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Describe placements, faculty quality, infrastructure condition and college life in details..."
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        className="w-full mt-1.5 px-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-xs font-bold text-slate-800 outline-none focus:border-orange-500 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <p className="text-[10.5px] text-red-500 font-bold flex items-center gap-1 justify-center">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-orange-500/10 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting Review...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Review & Claim Rewards
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
