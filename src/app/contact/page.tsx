"use client";

import React, { useState } from "react";
import { 
  PhoneCall, 
  MapPin, 
  Mail, 
  CheckCircle, 
  Clock, 
  ShieldCheck,
  MessageSquare
} from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", course: "Engineering", marks: "", msg: "" });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", phone: "", email: "", course: "Engineering", marks: "", msg: "" });
    }, 2000);
  };

  const offices = [
    {
      city: "Patna Head Office",
      address: "Boring Road Crossing, Near Bank of Baroda, Patna, Bihar - 800001",
      phone: "+91 9135800500"
    },
    {
      city: "Delhi-NCR Branch Office",
      address: "Alpha 1, Greater Noida, Near Metro Station, Uttar Pradesh - 201308",
      phone: "+91 9473332444"
    }
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="font-outfit font-extrabold text-3xl text-text_primary">Admissions Counseling Helpdesk</h1>
        <p className="text-sm text-text_secondary">Get in touch with certified advisors for direct seat allotment & credit card scholarship support</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        
        {/* INQUIRY FORM (60%) */}
        <div className="lg:col-span-6 bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
          <div className="space-y-2">
            <h2 className="font-outfit font-bold text-lg text-text_primary">Submit Counseling Query</h2>
            <p className="text-xs text-text_secondary leading-relaxed font-medium">
              Provide your academics details and entrance scores. Our senior counselor will evaluate your profile and prepare a list of best possible colleges.
            </p>
          </div>

          {formSubmitted ? (
            <div className="py-16 text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="font-outfit font-extrabold text-xl text-text_primary">Query Registered Successfully!</h3>
              <p className="text-sm text-text_secondary max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out. A counselor specializing in **{formData.course}** has been assigned and will call you on **+91 {formData.phone}** shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-text_secondary font-bold uppercase tracking-wider">Your Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full mt-1.5 px-3.5 py-2.5 border border-border bg-background rounded-xl text-xs outline-none focus:border-primary text-text_primary font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-text_secondary font-bold uppercase tracking-wider">Mobile Number</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="Enter 10-digit mobile" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full mt-1.5 px-3.5 py-2.5 border border-border bg-background rounded-xl text-xs outline-none focus:border-primary text-text_primary font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-text_secondary font-bold uppercase tracking-wider">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="Enter email address" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full mt-1.5 px-3.5 py-2.5 border border-border bg-background rounded-xl text-xs outline-none focus:border-primary text-text_primary font-semibold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-text_secondary font-bold uppercase tracking-wider">Target Stream</label>
                    <select 
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full mt-1.5 px-3.5 py-2.5 border border-border bg-background rounded-xl text-xs outline-none focus:border-primary text-text_primary font-semibold"
                    >
                      <option>Engineering</option>
                      <option>Medical</option>
                      <option>Management</option>
                      <option>Law</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-text_secondary font-bold uppercase tracking-wider">Score / 12th %</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 85%" 
                      value={formData.marks}
                      onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
                      className="w-full mt-1.5 px-3.5 py-2.5 border border-border bg-background rounded-xl text-xs outline-none focus:border-primary text-text_primary font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-text_secondary font-bold uppercase tracking-wider">Write Your Query</label>
                <textarea 
                  rows={4}
                  placeholder="Explain your queries about choice of colleges, eligibility or scholarship details..." 
                  value={formData.msg}
                  onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                  className="w-full mt-1.5 px-3.5 py-2.5 border border-border bg-background rounded-xl text-xs outline-none focus:border-primary text-text_primary font-semibold resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary_hover text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                Submit Query & Request Call
              </button>
            </form>
          )}
        </div>

        {/* SIDE CONTACT CARDS & DETAILS (40%) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Channels card */}
          <div className="bg-card border border-border p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-outfit font-bold text-base text-text_primary">Admissions Hotline</h3>
            
            <div className="space-y-4">
              <a 
                href="tel:+919135800500"
                className="flex items-center gap-4 p-3 bg-background border border-border hover:border-primary/20 rounded-2xl transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] text-text_secondary font-bold uppercase">Main Support Number</p>
                  <p className="font-outfit font-extrabold text-sm text-text_primary">+91 9135800500</p>
                </div>
              </a>

              <a 
                href="mailto:admission.providers@gmail.com"
                className="flex items-center gap-4 p-3 bg-background border border-border hover:border-primary/20 rounded-2xl transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] text-text_secondary font-bold uppercase">Official Mail Helpdesk</p>
                  <p className="font-outfit font-extrabold text-sm text-text_primary">admission.providers@gmail.com</p>
                </div>
              </a>

              <a 
                href="https://wa.me/919473335050"
                target="_blank"
                className="flex items-center gap-4 p-3 bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/30 rounded-2xl transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] text-text_secondary font-bold uppercase">WhatsApp Advisor Support</p>
                  <p className="font-outfit font-extrabold text-sm text-emerald-600 dark:text-emerald-400">Instant Chat Available</p>
                </div>
              </a>
            </div>
          </div>

          {/* OFFICE LOCATIONS */}
          <div className="bg-card border border-border p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-outfit font-bold text-base text-text_primary">Our Regional Desks</h3>
            
            <div className="space-y-4 divide-y divide-border/60">
              {offices.map((office, idx) => (
                <div key={idx} className={`space-y-2 ${idx > 0 ? "pt-4" : ""}`}>
                  <h4 className="font-outfit font-bold text-xs text-text_primary flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {office.city}
                  </h4>
                  <p className="text-[11px] text-text_secondary leading-relaxed font-semibold pl-6">
                    {office.address}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
