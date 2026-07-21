"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Search, 
  MapPin, 
  Star, 
  Layers, 
  Check, 
  X, 
  Building2, 
  ArrowLeft,
  DollarSign,
  Briefcase,
  Award
} from "lucide-react";

interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  stream: string;
  type: string;
  fees: number;
  feesLabel: string;
  highestPackage: number;
  highestPackageLabel: string;
  rating: number;
  slug: string;
  logo: string;
}

const mockColleges: College[] = [
  { id: "1", name: "IIT Delhi - Indian Institute of Technology", location: "New Delhi", state: "Delhi", stream: "Engineering", type: "Government", fees: 2.2, feesLabel: "₹2.2 Lakhs/Yr", highestPackage: 120.0, highestPackageLabel: "1.2 Cr PA", rating: 4.9, slug: "iit-delhi", logo: "IITD" },
  { id: "2", name: "IIM Ahmedabad - Indian Institute of Management", location: "Ahmedabad", state: "Gujarat", stream: "Management", type: "Government", fees: 12.5, feesLabel: "₹12.5 Lakhs/Yr", highestPackage: 61.5, highestPackageLabel: "61.5 Lakhs PA", rating: 4.9, slug: "iim-ahmedabad", logo: "IIMA" },
  { id: "3", name: "Galgotias University", location: "Greater Noida", state: "Uttar Pradesh", stream: "Engineering", type: "Private", fees: 1.6, feesLabel: "₹1.6 Lakhs/Yr", highestPackage: 35.0, highestPackageLabel: "35.0 Lakhs PA", rating: 4.2, slug: "galgotias-university", logo: "GU" },
  { id: "4", name: "SIBM Pune - Symbiosis Institute of Business Management", location: "Pune", state: "Maharashtra", stream: "Management", type: "Private", fees: 10.2, feesLabel: "₹10.2 Lakhs/Yr", highestPackage: 45.5, highestPackageLabel: "45.5 Lakhs PA", rating: 4.6, slug: "sibm-pune", logo: "SIBM" },
  { id: "5", name: "RV College of Engineering", location: "Bangalore", state: "Karnataka", stream: "Engineering", type: "Private", fees: 2.5, feesLabel: "₹2.5 Lakhs/Yr", highestPackage: 48.5, highestPackageLabel: "48.5 Lakhs PA", rating: 4.4, slug: "rv-college-of-engineering", logo: "RVCE" },
  { id: "6", name: "KMC Mangalore - Kasturba Medical College", location: "Mangalore", state: "Karnataka", stream: "Medical", type: "Private", fees: 17.8, feesLabel: "₹17.8 Lakhs/Yr", highestPackage: 15.0, highestPackageLabel: "15.0 Lakhs PA", rating: 4.7, slug: "kmc-mangalore", logo: "KMC" },
  { id: "7", name: "NLSIU - National Law School of India University", location: "Bangalore", state: "Karnataka", stream: "Law", type: "Government", fees: 2.1, feesLabel: "₹2.1 Lakhs/Yr", highestPackage: 22.0, highestPackageLabel: "22.0 Lakhs PA", rating: 4.8, slug: "nlsiu-bangalore", logo: "NLSIU" },
  { id: "8", name: "AIIMS Delhi - All India Institute of Medical Sciences", location: "New Delhi", state: "Delhi", stream: "Medical", type: "Government", fees: 0.02, feesLabel: "₹1,628/Yr", highestPackage: 30.0, highestPackageLabel: "30.0 Lakhs PA", rating: 5.0, slug: "aiims-delhi", logo: "AIIMS" }
];

function CompareContent() {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get("ids") || "";

  const [comparedColleges, setComparedColleges] = useState<College[]>([]);

  useEffect(() => {
    if (idsParam) {
      const ids = idsParam.split(",");
      const colleges = mockColleges.filter(c => ids.includes(c.id));
      setComparedColleges(colleges);
    } else {
      setComparedColleges([]);
    }
  }, [idsParam]);

  const handleRemoveCollege = (id: string) => {
    const updated = comparedColleges.filter(c => c.id !== id);
    setComparedColleges(updated);
    // update URL
    const newIds = updated.map(c => c.id).join(",");
    window.history.replaceState(null, "", `/compare?ids=${newIds}`);
  };

  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <div className="space-y-4">
        <Link 
          href="/colleges" 
          className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Listings
        </Link>
        
        <div>
          <h1 className="font-outfit font-extrabold text-3xl text-text_primary">Compare Colleges</h1>
          <p className="text-sm text-text_secondary">Side-by-side comparison of fees, placements, ratings, and course details</p>
        </div>
      </div>

      {/* COMPARED COLLEGES COMPARISON TABLE */}
      {comparedColleges.length === 0 ? (
        <div className="py-20 bg-card border border-border rounded-3xl text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-border rounded-full flex items-center justify-center mx-auto text-text_secondary">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="font-outfit font-bold text-lg text-text_primary">No Colleges Selected</h3>
          <p className="text-sm text-text_secondary max-w-sm mx-auto">
            You need to select at least two colleges from our listings to compare them side-by-side.
          </p>
          <Link
            href="/colleges"
            className="inline-block px-6 py-3 bg-primary text-white text-xs font-bold rounded-xl shadow-md"
          >
            Find Colleges to Compare
          </Link>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-border bg-background">
                  {/* Parameter Column */}
                  <th className="py-5 px-6 font-outfit font-extrabold text-sm text-text_primary w-1/4 min-w-[200px]">
                    Parameters
                  </th>
                  {/* Colleges Columns */}
                  {comparedColleges.map(c => (
                    <th key={c.id} className="py-5 px-6 w-1/4 min-w-[250px] relative border-l border-border">
                      <button 
                        onClick={() => handleRemoveCollege(c.id)}
                        className="absolute top-4 right-4 text-text_secondary hover:text-red-500 p-1 bg-background border border-border rounded-lg"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="space-y-2 mt-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-premium text-white flex items-center justify-center font-bold text-xs">
                          {c.logo}
                        </div>
                        <h4 className="font-outfit font-bold text-sm text-text_primary line-clamp-2 leading-snug">
                          {c.name}
                        </h4>
                        <p className="flex items-center gap-1 text-[10px] text-text_secondary">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {c.location}
                        </p>
                      </div>
                    </th>
                  ))}
                  {/* Empty Slot placeholder if compared < 3 */}
                  {comparedColleges.length < 3 && (
                    <th className="py-5 px-6 w-1/4 min-w-[250px] border-l border-border bg-slate-500/5 text-center text-text_secondary align-middle">
                      <div className="space-y-2 py-8">
                        <Layers className="w-6 h-6 text-slate-400 mx-auto" />
                        <p className="text-[10px] font-bold">Slot Available</p>
                        <Link 
                          href="/colleges" 
                          className="inline-block text-[10px] text-primary font-bold hover:underline"
                        >
                          + Add College
                        </Link>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {/* 1. Rating */}
                <tr>
                  <td className="py-4 px-6 font-bold text-text_secondary uppercase tracking-wider text-[10px]">
                    Rating & Reviews
                  </td>
                  {comparedColleges.map(c => (
                    <td key={c.id} className="py-4 px-6 border-l border-border">
                      <div className="flex items-center gap-1.5 font-bold text-text_primary text-xs">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        {c.rating} / 5.0
                      </div>
                    </td>
                  ))}
                  {comparedColleges.length < 3 && <td className="border-l border-border bg-slate-500/5" />}
                </tr>

                {/* 2. Stream */}
                <tr>
                  <td className="py-4 px-6 font-bold text-text_secondary uppercase tracking-wider text-[10px]">
                    Stream
                  </td>
                  {comparedColleges.map(c => (
                    <td key={c.id} className="py-4 px-6 border-l border-border font-semibold text-text_primary">
                      {c.stream}
                    </td>
                  ))}
                  {comparedColleges.length < 3 && <td className="border-l border-border bg-slate-500/5" />}
                </tr>

                {/* 3. College Type */}
                <tr>
                  <td className="py-4 px-6 font-bold text-text_secondary uppercase tracking-wider text-[10px]">
                    College Type
                  </td>
                  {comparedColleges.map(c => (
                    <td key={c.id} className="py-4 px-6 border-l border-border font-semibold text-text_primary">
                      {c.type}
                    </td>
                  ))}
                  {comparedColleges.length < 3 && <td className="border-l border-border bg-slate-500/5" />}
                </tr>

                {/* 4. Tuition Fees */}
                <tr>
                  <td className="py-4 px-6 font-bold text-text_secondary uppercase tracking-wider text-[10px]">
                    Annual Fees
                  </td>
                  {comparedColleges.map(c => (
                    <td key={c.id} className="py-4 px-6 border-l border-border">
                      <p className="font-outfit font-extrabold text-sm text-text_primary">{c.feesLabel}</p>
                    </td>
                  ))}
                  {comparedColleges.length < 3 && <td className="border-l border-border bg-slate-500/5" />}
                </tr>

                {/* 5. Placements */}
                <tr>
                  <td className="py-4 px-6 font-bold text-text_secondary uppercase tracking-wider text-[10px]">
                    Highest Placement
                  </td>
                  {comparedColleges.map(c => (
                    <td key={c.id} className="py-4 px-6 border-l border-border">
                      <p className="font-outfit font-extrabold text-sm text-emerald-500">{c.highestPackageLabel}</p>
                    </td>
                  ))}
                  {comparedColleges.length < 3 && <td className="border-l border-border bg-slate-500/5" />}
                </tr>

                {/* 6. Location State */}
                <tr>
                  <td className="py-4 px-6 font-bold text-text_secondary uppercase tracking-wider text-[10px]">
                    State / Region
                  </td>
                  {comparedColleges.map(c => (
                    <td key={c.id} className="py-4 px-6 border-l border-border font-semibold text-text_primary">
                      {c.state}
                    </td>
                  ))}
                  {comparedColleges.length < 3 && <td className="border-l border-border bg-slate-500/5" />}
                </tr>

                {/* Actions Footer row */}
                <tr>
                  <td className="py-6 px-6 font-bold text-text_secondary uppercase tracking-wider text-[10px]">
                    Actions
                  </td>
                  {comparedColleges.map(c => (
                    <td key={c.id} className="py-6 px-6 border-l border-border">
                      <div className="flex gap-2">
                        <Link 
                          href={`/colleges/${c.slug}`}
                          className="flex-1 py-2 text-center border border-border hover:bg-border/30 rounded-xl font-bold text-[10px] text-text_primary transition-colors"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => alert(`Counseling request for ${c.name}`)}
                          className="flex-1 py-2 bg-gradient-premium hover:bg-primary text-white font-bold text-[10px] rounded-xl shadow-sm transition-all"
                        >
                          Apply Now
                        </button>
                      </div>
                    </td>
                  ))}
                  {comparedColleges.length < 3 && <td className="border-l border-border bg-slate-500/5" />}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <React.Suspense fallback={
      <div className="py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-bold text-text_primary">Loading college comparison...</p>
      </div>
    }>
      <CompareContent />
    </React.Suspense>
  );
}
