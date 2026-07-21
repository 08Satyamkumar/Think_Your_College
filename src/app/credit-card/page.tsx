"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  CheckCircle, 
  HelpCircle, 
  ChevronDown, 
  FileText, 
  GraduationCap, 
  ChevronRight,
  PhoneCall
} from "lucide-react";

export default function CreditCardPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", district: "Patna", course: "B.Tech" });

  const districts = ["Patna", "Muzaffarpur", "Gaya", "Bhagalpur", "Darbhanga", "Purnea", "Ara", "Biharsharif", "Other"];
  const courses = ["B.Tech (Engineering)", "MBBS / Medical", "B.Pharma / Pharmacy", "B.Sc Nursing", "BBA / MBA", "BCA / MCA"];

  const steps = [
    { number: "01", title: "College Admission", desc: "Secure your admission in an approved college listed by the Bihar government and obtain your Bonafide Certificate and Fee Structure." },
    { number: "02", title: "Document Checklist", desc: "Gather all required documents including Aadhar card, domicile, mark sheets, and bank account passbook details." },
    { number: "03", title: "Online Application", desc: "Register on the official MNSSBY portal or visit the local District Registration and Counseling Center (DRCC)." },
    { number: "04", title: "DRCC Verification", desc: "Attend physical document verification at DRCC, get approval, and receive the loan agreement sanction letter." }
  ];

  const faqs = [
    { q: "What is the maximum loan amount under this scheme?", a: "The scheme provides a maximum education loan of up to ₹4 Lakhs for higher education studies." },
    { q: "What is the interest rate for the loan?", a: "The standard interest rate is 4% per annum. However, it is reduced to 1% per annum for female, transgender, and physically disabled students." },
    { q: "When does the loan repayment start?", a: "Repayment begins 1 year after the completion of the course, or immediately when the student secures employment, whichever is earlier." },
    { q: "Which courses are covered under the Student Credit Card?", a: "Over 40 courses are eligible, including B.Tech, MBBS, BDS, B.Sc Nursing, B.Pharma, BBA, BCA, MBA, MCA, and general B.Sc/B.A. programs." }
  ];

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", phone: "", district: "Patna", course: "B.Tech" });
    }, 2000);
  };

  return (
    <div className="space-y-12">
      {/* HERO HERO SECTION */}
      <section className="bg-gradient-to-r from-emerald-700 via-teal-800 to-emerald-800 p-8 md:p-16 rounded-3xl text-white relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_45%)]" />
        
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs font-bold text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            Official Bihar Scheme Helpdesk
          </div>
          
          <h1 className="font-outfit font-extrabold text-3xl md:text-5xl leading-tight">
            Bihar Student <br className="hidden md:block" />
            Credit Card Guidance
          </h1>
          
          <p className="text-slate-100 font-sans text-sm md:text-base leading-relaxed">
            Don't let financial constraints stop you from achieving your goals. Learn how to get admission in premium, DRCC-approved colleges across India with zero upfront tuition fees.
          </p>
        </div>
      </section>

      {/* THREE PILLAR SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="font-outfit font-bold text-base text-text_primary">DRCC Approved Colleges</h3>
          <p className="text-xs text-text_secondary leading-relaxed font-medium">
            We provide a verified list of UGC/AICTE approved colleges that accept BSCC loan disbursals directly from the government.
          </p>
        </div>

        <div className="bg-card border border-border p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-outfit font-bold text-base text-text_primary">Hassle-Free Documents</h3>
          <p className="text-xs text-text_secondary leading-relaxed font-medium">
            Get sample bonafide formats, fee structure certificate layouts, and application drafts required by DRCC verification.
          </p>
        </div>

        <div className="bg-card border border-border p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-outfit font-bold text-base text-text_primary">Repayment Moratorium</h3>
          <p className="text-xs text-text_secondary leading-relaxed font-medium">
            Zero repayment during your course duration. Pay back at simple interest rate (4% standard, 1% female/disabled) post course completion.
          </p>
        </div>
      </div>

      {/* CORE WORKFLOW STEPS */}
      <section className="space-y-6">
        <h2 className="font-outfit font-extrabold text-2xl text-text_primary text-center">Step-by-Step Application Process</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div key={st.number} className="bg-card border border-border p-5 rounded-2xl space-y-3 relative hover:border-emerald-500/20 transition-all duration-300">
              <span className="font-outfit font-black text-3xl text-emerald-500/20 block">{st.number}</span>
              <h3 className="font-outfit font-bold text-base text-text_primary">{st.title}</h3>
              <p className="text-xs text-text_secondary leading-relaxed font-medium">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GRID: ELIGIBILITY FORM & FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        
        {/* FAQ ACCORDION (60%) */}
        <section className="lg:col-span-6 space-y-4">
          <h2 className="font-outfit font-extrabold text-xl text-text_primary pb-3 border-b border-border">Frequently Asked Questions</h2>
          
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-card border border-border rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex items-center justify-between w-full p-4 font-bold text-xs text-text_primary text-left hover:bg-border/10"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-500" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-text_secondary transition-transform ${activeFaq === idx ? "rotate-180" : ""}`} />
                </button>

                {activeFaq === idx && (
                  <div className="p-4 bg-background border-t border-border text-xs text-text_secondary leading-relaxed font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* DRCC CHECK ELIGIBILITY FORM (40%) */}
        <section className="lg:col-span-4 bg-card border border-border p-6 rounded-3xl h-fit space-y-6">
          <div className="space-y-2">
            <h3 className="font-outfit font-bold text-base text-text_primary">Check Your Loan Eligibility</h3>
            <p className="text-xs text-text_secondary leading-relaxed">
              Verify if your target college and course is registered under the DRCC database. Get call back support from Patna advisors.
            </p>
          </div>

          {formSubmitted ? (
            <div className="py-8 text-center space-y-4 bg-background border border-border rounded-2xl">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
              <h4 className="font-outfit font-bold text-sm text-text_primary">Eligibility Request Sent!</h4>
              <p className="text-[11px] text-text_secondary max-w-xs mx-auto">
                Our counselor will connect with you on **+91 {formData.phone}** to guide you through DRCC document verification.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] text-text_secondary font-bold">Student Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="Enter full name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 px-3.5 py-2 border border-border rounded-xl bg-background text-xs outline-none focus:border-primary text-text_primary font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-text_secondary font-bold">District in Bihar</label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-xl bg-background text-xs outline-none focus:border-primary text-text_primary font-semibold"
                  >
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-text_secondary font-bold">Target Course</label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-xl bg-background text-xs outline-none focus:border-primary text-text_primary font-semibold"
                  >
                    {courses.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-text_secondary font-bold">Mobile Number</label>
                <input 
                  required
                  type="tel" 
                  placeholder="Enter mobile number" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full mt-1 px-3.5 py-2 border border-border rounded-xl bg-background text-xs outline-none focus:border-primary text-text_primary font-semibold"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                Check Eligibility Now
              </button>
            </form>
          )}
        </section>

      </div>
    </div>
  );
}
