"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  GraduationCap,
  Mail,
  Phone,
  User,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Shield,
  BookOpen,
  Star,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "login" | "signup";
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

// ── Google Button ──────────────────────────────────────────────────────────
function GoogleBtn({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(99,102,241,0.25)" }}
      whileTap={{ scale: 0.97 }}
      className="w-full flex items-center justify-center gap-3 py-3 px-5 rounded-xl border-2 border-indigo-200 bg-white hover:border-indigo-400 transition-all duration-300 group relative overflow-hidden"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-50/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
      <svg width="20" height="20" viewBox="0 0 48 48" className="flex-shrink-0">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
      <span className="text-sm font-bold text-slate-700 ">{label}</span>
    </motion.button>
  );
}

// ── Floating-label Input ───────────────────────────────────────────────────
function FloatingInput({
  id, label, type = "text", icon: Icon, value, onChange,
}: {
  id: string; label: string; type?: string;
  icon: React.ElementType; value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative group">
      <div className={`flex items-center w-full rounded-xl border-2 transition-all duration-300 overflow-visible ${
        focused
          ? "border-indigo-500 bg-indigo-50/40 shadow-[0_0_0_3px_rgba(99,102,241,0.18)]"
          : "border-slate-200 bg-white hover:border-indigo-300"
      }`}>
        <div className="relative flex-1 h-12">
          <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 pointer-events-none z-10 ${
            focused ? "text-indigo-500" : "text-slate-400"
          }`} />
          <motion.label
            htmlFor={id}
            animate={{
              top: lifted ? "6px" : "50%",
              y: lifted ? "0%" : "-50%",
              fontSize: lifted ? "10px" : "13px",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute left-9 pointer-events-none font-semibold text-slate-400 origin-left z-10 whitespace-nowrap"
          >
            {label}
          </motion.label>
          <input
            id={id}
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="absolute inset-0 pt-5 pb-1 pl-9 pr-4 bg-transparent text-sm font-semibold text-slate-800 outline-none w-full"
          />
        </div>
      </div>
    </div>
  );
}

// ── Phone Input ────────────────────────────────────────────────────────────
function PhoneInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={`flex items-center w-full rounded-xl border-2 h-12 transition-all duration-300 overflow-hidden ${
      focused
        ? "border-indigo-500 bg-indigo-50/40 shadow-[0_0_0_3px_rgba(99,102,241,0.18)]"
        : "border-slate-200 bg-white hover:border-indigo-300"
    }`}>
      <div className="flex items-center gap-1.5 pl-3 pr-3 h-full border-r border-slate-200 text-[11px] font-black text-slate-600 flex-shrink-0 select-none">
        <span className="text-base leading-none">🇮🇳</span>
        <span>IND +91</span>
        <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </div>
      <div className="relative flex-1 h-full flex items-center">
        <Phone className={`absolute left-3 w-4 h-4 pointer-events-none transition-colors ${focused ? "text-indigo-500" : "text-slate-400"}`} />
        <input
          type="tel"
          value={value}
          onChange={e => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Mobile number"
          className="w-full h-full pl-9 pr-4 bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400 placeholder:font-normal"
        />
      </div>
    </div>
  );
}

// ── OR Divider ─────────────────────────────────────────────────────────────
function OrDivider() {
  return (
    <div className="flex items-center gap-3 my-0.5">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <span className="text-[10px] font-black text-slate-400 tracking-widest">OR</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  );
}

// ── Main AuthModal ─────────────────────────────────────────────────────────
export default function AuthModal({ isOpen, onClose, defaultMode = "login", onLoginSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(defaultMode);
  const [loginType, setLoginType] = useState<"email" | "mobile">("mobile");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  // Google Sign In Simulator States
  const [googleSimStep, setGoogleSimStep] = useState<"idle" | "select_account" | "loading">("idle");

  const handleSelectAccount = (name: string, emailStr: string) => {
    setGoogleSimStep("loading");
    setTimeout(() => {
      onLoginSuccess({ name, email: emailStr });
      setGoogleSimStep("idle");
    }, 1500);
  };

  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode);
      setOtpSent(false);
      setOtp(["", "", "", "", "", ""]);
      setPhone(""); setEmail(""); setFullName(""); setSignupEmail(""); setSignupPhone("");
      setAgreed(false); setOtpTimer(0);
      setGoogleSimStep("idle");
    }
  }, [isOpen, defaultMode]);

  useEffect(() => {
    if (typeof window !== "undefined" && !document.getElementById("google-gsi-client")) {
      const script = document.createElement("script");
      script.id = "google-gsi-client";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  // Google GSI Real Login states
  const [customClientId, setCustomClientId] = useState("");
  const [googleError, setGoogleError] = useState("");
  const [gsiTab, setGsiTab] = useState<"demo" | "real">("demo");

  const handleGoogleLogin = () => {
    const envClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const sessionClientId = typeof window !== "undefined" ? sessionStorage.getItem("tyc-google-client-id") : null;
    const activeClientId = envClientId || sessionClientId || customClientId;

    if (!activeClientId) {
      // Show assistant overlay if no client ID is found
      setGoogleSimStep("select_account");
      setGsiTab("real"); // Default to setup tab so they know they need a client ID
      return;
    }

    if (typeof window === "undefined" || !(window as any).google?.accounts?.oauth2) {
      setGoogleError("Google Sign-In is initializing. Please try again in a moment.");
      setGoogleSimStep("select_account");
      return;
    }

    setGoogleError("");
    setGoogleSimStep("loading");

    try {
      const client = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: activeClientId,
        scope: "openid email profile",
        callback: (tokenResponse: any) => {
          if (tokenResponse && tokenResponse.access_token) {
            // Save client ID for subsequent sessions if verified
            if (customClientId) {
              sessionStorage.setItem("tyc-google-client-id", customClientId);
            }
            fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`)
              .then(res => {
                if (!res.ok) throw new Error("Profile fetch failed");
                return res.json();
              })
              .then(data => {
                if (data.email) {
                  onLoginSuccess({
                    name: data.name || data.email.split("@")[0],
                    email: data.email
                  });
                  setGoogleSimStep("idle");
                }
              })
              .catch(err => {
                setGoogleError("Failed to fetch Google profile. Try again.");
                setGoogleSimStep("select_account");
              });
          } else {
            setGoogleSimStep("select_account");
          }
        },
        error_callback: (err: any) => {
          setGoogleError("Google authentication failed. Verify console client configuration.");
          setGoogleSimStep("select_account");
        }
      });
      client.requestAccessToken();
    } catch (e) {
      setGoogleError("Google Sign-In failed to initialize. Check Client ID origins.");
      setGoogleSimStep("select_account");
    }
  };

  useEffect(() => {
    if (otpTimer <= 0) return;
    const t = setTimeout(() => setOtpTimer(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [otpTimer]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSendOtp = () => {
    const valid = loginType === "mobile" ? phone.length === 10 : email.includes("@");
    if (valid) { setOtpSent(true); setOtpTimer(30); }
  };

  const handleOtpChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp]; next[idx] = val; setOtp(next);
    if (val && idx < 5) (document.getElementById(`otp-${idx + 1}`) as HTMLInputElement)?.focus();
  };

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0)
      (document.getElementById(`otp-${idx - 1}`) as HTMLInputElement)?.focus();
  };

  const switchMode = (m: "login" | "signup") => {
    setMode(m); setOtpSent(false); setOtp(["", "", "", "", "", ""]);
  };

  const features = [
    { icon: BookOpen, text: "Compare 5000+ Colleges" },
    { icon: Star, text: "Student Reviews" },
    { icon: Shield, text: "Expert Counseling" },
  ];

  const canSendOtp = loginType === "mobile" ? phone.length === 10 : email.includes("@");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-[6px]"
          />

          {/* Modal container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.85, y: 48 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 32 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative w-full max-w-[420px] pointer-events-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Outer glow */}
              <motion.div
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-1.5 bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-orange-400/20 rounded-3xl blur-xl pointer-events-none"
              />

              <div className="relative bg-white rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.4)] border border-slate-100 overflow-hidden">

                {/* Top gradient bar */}
                <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-500 z-10" />

                {/* Subtle bg shimmer */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.04),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(249,115,22,0.04),transparent_60%)] pointer-events-none" />

                {/* Close */}
                <motion.button
                  whileHover={{ scale: 1.12, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </motion.button>

                {/* ── HEADER ── */}
                <div className="pt-7 pb-4 px-7 text-center relative z-10">
                  {/* Logo + Brand */}
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/35"
                    >
                      <GraduationCap className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="text-left">
                      <p className="font-black text-[13px] tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent uppercase leading-tight">
                        Think Your College
                      </p>
                      <p className="text-[9px] text-slate-400 font-semibold tracking-widest uppercase">India's #1 College Discovery</p>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mode}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                    >
                      <p className="text-[18px] font-black text-slate-800 leading-tight">
                        {mode === "login" ? "Welcome back! 👋" : "Create Free Account 🎓"}
                      </p>
                      <p className="text-[11px] font-medium text-slate-400 mt-1">
                        {mode === "login"
                          ? "Access personalized college recommendations"
                          : "India's best college discovery platform"}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Feature chips — signup only */}
                  <AnimatePresence>
                    {mode === "signup" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 10 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="flex items-center justify-center gap-3 overflow-hidden"
                      >
                        {features.map((f, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.07 }}
                            className="flex flex-col items-center gap-1"
                          >
                            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100 ">
                              <f.icon className="w-4 h-4 text-indigo-500" />
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 text-center leading-tight max-w-[58px]">{f.text}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── BODY ── */}
                <div className="px-7 pb-7 relative z-10">
                  <AnimatePresence mode="wait">

                    {/* ════ LOGIN ════ */}
                    {mode === "login" && (
                      <motion.div
                        key="login-form"
                        initial={{ opacity: 0, x: -28 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 28 }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="space-y-3"
                      >
                        <GoogleBtn label="Log in with Google" onClick={handleGoogleLogin} />
                        <OrDivider />

                        {/* Email / Mobile tabs */}
                        <div className="flex gap-6 border-b border-slate-100 pb-2">
                          {(["email", "mobile"] as const).map(t => (
                            <button
                              key={t}
                              onClick={() => { setLoginType(t); setOtpSent(false); }}
                              className={`flex items-center gap-1.5 text-[11px] font-black pb-1.5 border-b-2 -mb-[calc(0.5rem+1px)] transition-all ${
                                loginType === t
                                  ? "border-indigo-500 text-indigo-600"
                                  : "border-transparent text-slate-400 hover:text-slate-600"
                              } uppercase tracking-wider`}
                            >
                              {t === "email" ? <Mail className="w-3.5 h-3.5" /> : <Phone className="w-3.5 h-3.5" />}
                              {t}
                            </button>
                          ))}
                        </div>

                        {/* OTP Flow */}
                        <AnimatePresence mode="wait">
                          {!otpSent ? (
                            <motion.div
                              key="pre-otp"
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                              className="space-y-3"
                            >
                              {loginType === "mobile"
                                ? <PhoneInput value={phone} onChange={setPhone} />
                                : <FloatingInput id="login-email" label="Email address" icon={Mail} value={email} onChange={setEmail} type="email" />
                              }
                              <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0 10px 28px rgba(249,115,22,0.4)" }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleSendOtp}
                                disabled={!canSendOtp}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-200 disabled:to-slate-200 disabled:cursor-not-allowed text-white disabled:text-slate-400 font-black text-sm shadow-md shadow-orange-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                              >
                                <Sparkles className="w-4 h-4" />
                                Get OTP
                              </motion.button>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="otp-verify"
                              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                              className="space-y-3"
                            >
                              <p className="text-[11px] font-semibold text-slate-500 text-center">
                                OTP sent to{" "}
                                <span className="font-black text-indigo-600 ">
                                  {loginType === "mobile" ? `+91 ${phone}` : email}
                                </span>
                              </p>
                              {/* OTP boxes */}
                              <div className="flex gap-2 justify-center">
                                {otp.map((d, i) => (
                                  <motion.input
                                    key={i}
                                    id={`otp-${i}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={d}
                                    onChange={e => handleOtpChange(i, e.target.value)}
                                    onKeyDown={e => handleOtpKeyDown(i, e)}
                                    whileFocus={{ scale: 1.15, boxShadow: "0 0 0 3px rgba(99,102,241,0.3)" }}
                                    className="w-11 h-12 rounded-xl border-2 border-slate-200 text-center text-xl font-black text-indigo-600 bg-white outline-none focus:border-indigo-500 transition-all cursor-text"
                                  />
                                ))}
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0 10px 28px rgba(99,102,241,0.4)" }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-black text-sm shadow-md shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                Verify & Login
                              </motion.button>
                              <div className="text-center">
                                {otpTimer > 0 ? (
                                  <p className="text-[11px] text-slate-400">
                                    Resend in <span className="font-black text-indigo-500">{otpTimer}s</span>
                                  </p>
                                ) : (
                                  <button
                                    onClick={() => { setOtpSent(false); setOtp(["","","","","",""]); }}
                                    className="text-[11px] font-bold text-indigo-500 hover:text-indigo-700 underline transition-colors"
                                  >
                                    Resend OTP
                                  </button>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <p className="text-center text-[11px] text-slate-500 pt-1">
                          New to Think Your College?{" "}
                          <button
                            onClick={() => switchMode("signup")}
                            className="font-black text-orange-500 hover:text-orange-600 underline underline-offset-2 transition-colors"
                          >
                            Sign Up Free
                          </button>
                        </p>
                      </motion.div>
                    )}

                    {/* ════ SIGNUP ════ */}
                    {mode === "signup" && (
                      <motion.div
                        key="signup-form"
                        initial={{ opacity: 0, x: 28 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -28 }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="space-y-2.5"
                      >
                        <GoogleBtn label="Sign up with Google" onClick={handleGoogleLogin} />
                        <OrDivider />

                        <PhoneInput value={signupPhone} onChange={setSignupPhone} />
                        <FloatingInput id="signup-name" label="Full name" icon={User} value={fullName} onChange={setFullName} />
                        <FloatingInput id="signup-email" label="Email address" icon={Mail} value={signupEmail} onChange={setSignupEmail} type="email" />

                        {/* Location chip */}
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-indigo-50/70 rounded-xl px-3 py-2 border border-indigo-100 ">
                          <MapPin className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                          <span className="flex-1">Greater Noida is your current location.</span>
                          <button className="font-black text-indigo-500 hover:text-indigo-700 transition-colors">Change</button>
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-2.5 cursor-pointer group">
                          <div
                            className="relative flex-shrink-0 mt-0.5"
                            onClick={() => setAgreed(a => !a)}
                          >
                            <div className={`w-[18px] h-[18px] rounded-[5px] border-2 flex items-center justify-center transition-all duration-200 ${
                              agreed
                                ? "bg-indigo-500 border-indigo-500"
                                : "border-slate-300 group-hover:border-indigo-400"
                            }`}>
                              <AnimatePresence>
                                {agreed && (
                                  <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-500 leading-snug">
                            I agree to Think Your College{" "}
                            <span className="text-indigo-500 font-bold hover:underline cursor-pointer">Terms & Conditions</span>
                            {" "}and{" "}
                            <span className="text-indigo-500 font-bold hover:underline cursor-pointer">Privacy Policy</span>
                            , and consent to be contacted via WhatsApp, SMS & email.
                          </span>
                        </label>

                        <motion.button
                          whileHover={{ scale: 1.02, boxShadow: "0 10px 28px rgba(249,115,22,0.4)" }}
                          whileTap={{ scale: 0.97 }}
                          disabled={!agreed || signupPhone.length < 10}
                          onClick={() => onLoginSuccess({ name: fullName || "Student", email: signupEmail || `${signupPhone}@tyc.com` })}
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-200 disabled:to-slate-200 disabled:cursor-not-allowed text-white disabled:text-slate-400 font-black text-sm shadow-md shadow-orange-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <ArrowRight className="w-4 h-4" />
                          Sign up
                        </motion.button>

                        <p className="text-center text-[11px] text-slate-500 ">
                          Already have an account?{" "}
                          <button
                            onClick={() => switchMode("login")}
                            className="font-black text-indigo-500 hover:text-indigo-700 underline underline-offset-2 transition-colors"
                          >
                            Log in
                          </button>
                        </p>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

                {/* ── GOOGLE ACCOUNTS SIMULATOR OVERLAY ── */}
                <AnimatePresence>
                  {googleSimStep !== "idle" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-30 bg-white flex flex-col p-7 gap-6 font-sans"
                    >
                      {/* Google Logo */}
                      <div className="flex justify-center mt-2 flex-shrink-0">
                        <div className="flex gap-0.5 text-lg font-bold tracking-tight select-none">
                          <span className="text-[#4285F4]">G</span>
                          <span className="text-[#EA4335]">o</span>
                          <span className="text-[#FBBC05]">o</span>
                          <span className="text-[#4285F4]">g</span>
                          <span className="text-[#34A853]">l</span>
                          <span className="text-[#EA4335]">e</span>
                        </div>
                      </div>

                      {googleSimStep === "select_account" ? (
                        <div className="flex-grow flex flex-col justify-between overflow-y-auto">
                          <div className="space-y-4">
                            {/* Tabs for Real vs Demo */}
                            <div className="flex border-b border-slate-100 p-0.5 bg-slate-50 rounded-xl">
                              <button
                                type="button"
                                onClick={() => setGsiTab("demo")}
                                className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
                                  gsiTab === "demo"
                                    ? "bg-white text-indigo-600 shadow-sm"
                                    : "text-slate-500 hover:text-slate-800"
                                }`}
                              >
                                🎯 Demo Login
                              </button>
                              <button
                                type="button"
                                onClick={() => setGsiTab("real")}
                                className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
                                  gsiTab === "real"
                                    ? "bg-white text-indigo-600 shadow-sm"
                                    : "text-slate-500 hover:text-slate-800"
                                }`}
                              >
                                🔑 Real Google Login
                              </button>
                            </div>

                            {googleError && (
                              <div className="p-2.5 rounded-xl bg-red-50 text-[10px] font-semibold text-red-600 border border-red-100 text-center animate-pulse">
                                ⚠️ {googleError}
                              </div>
                            )}

                            {gsiTab === "demo" ? (
                              <div className="space-y-4">
                                <div className="text-center space-y-1">
                                  <h3 className="font-outfit font-bold text-xs text-slate-800">Select an email to test immediately</h3>
                                </div>

                                {/* Accounts List */}
                                <div className="space-y-1.5 border border-slate-100 rounded-2xl overflow-hidden shadow-sm bg-white">
                                  <button
                                    onClick={() => handleSelectAccount("Satyam Kumar", "satyam.kumar08@gmail.com")}
                                    className="w-full flex items-center justify-between p-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-100"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-xs">
                                        S
                                      </div>
                                      <div>
                                        <p className="text-xs font-bold text-slate-800">Satyam Kumar</p>
                                        <p className="text-[10px] text-slate-500 font-semibold">satyam.kumar08@gmail.com</p>
                                      </div>
                                    </div>
                                  </button>

                                  <button
                                    onClick={() => handleSelectAccount("TYC Demo Student", "thinkyourcollege.demo@gmail.com")}
                                    className="w-full flex items-center justify-between p-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-100"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-black text-xs">
                                        T
                                      </div>
                                      <div>
                                        <p className="text-xs font-bold text-slate-800">TYC Demo Student</p>
                                        <p className="text-[10px] text-slate-500 font-semibold">thinkyourcollege.demo@gmail.com</p>
                                      </div>
                                    </div>
                                  </button>

                                  <button
                                    onClick={() => handleSelectAccount("Guest User", "guest.user@gmail.com")}
                                    className="w-full flex items-center justify-between p-3 hover:bg-slate-50 transition-colors text-left"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-black text-xs">
                                        G
                                      </div>
                                      <div>
                                        <p className="text-xs font-bold text-slate-800">Use guest account</p>
                                        <p className="text-[10px] text-slate-500 font-semibold">guest.user@gmail.com</p>
                                      </div>
                                    </div>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-3.5">
                                <div className="text-center space-y-1">
                                  <h3 className="font-outfit font-bold text-xs text-slate-800">Set up Google Client ID</h3>
                                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                                    To use Google's real authentication popup, enter your Google Client ID below. We will save it temporarily to run OAuth live!
                                  </p>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Google Client ID</label>
                                  <input
                                    type="text"
                                    value={customClientId}
                                    onChange={(e) => setCustomClientId(e.target.value)}
                                    placeholder="your-client-id.apps.googleusercontent.com"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-500 font-semibold bg-white"
                                  />
                                </div>

                                <button
                                  type="button"
                                  onClick={handleGoogleLogin}
                                  disabled={!customClientId.includes("googleusercontent.com")}
                                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-indigo-600/10"
                                >
                                  🔑 Login with Google Live
                                </button>

                                {/* Steps helper */}
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[9px] text-slate-500 space-y-1.5 leading-relaxed">
                                  <p className="font-black text-slate-700 uppercase tracking-wider">Quick Setup Instructions:</p>
                                  <ol className="list-decimal pl-3.5 space-y-1 font-medium">
                                    <li>Go to <b>Google Cloud Console</b> &rarr; APIs & Services &rarr; Credentials.</li>
                                    <li>Create OAuth Client ID (Web Application).</li>
                                    <li>Add <b>{typeof window !== "undefined" ? window.location.origin : "Your domain"}</b> to Authorized JavaScript origins.</li>
                                    <li>Copy the Client ID, paste it here, and tap Login!</li>
                                  </ol>
                                </div>
                              </div>
                            )}

                            <p className="text-[9px] text-slate-400 font-semibold leading-relaxed text-center px-4 select-none">
                              To continue, Google will share your verified name, email address, language preference, and profile picture with Think Your College.
                            </p>
                          </div>

                          <button
                            type="button" 
                            onClick={() => { setGoogleSimStep("idle"); setGoogleError(""); }}
                            className="w-full mt-4 py-2 text-center text-xs font-black text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all uppercase tracking-wider"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex-grow flex flex-col items-center justify-center space-y-4">
                          <div className="w-10 h-10 border-4 border-[#4285F4] border-t-transparent rounded-full animate-spin" />
                          <div className="space-y-1 text-center">
                            <p className="text-xs font-bold text-slate-800 ">Signing in with Google...</p>
                            <p className="text-[10px] text-slate-400 font-semibold">Connecting securely to Think Your College</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
