import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Sparkles, MapPin, Phone, MessageCircle, ChevronRight, UtensilsCrossed, Flame, Leaf } from "lucide-react";

export default function LandingPage({ onEnter }) {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 10;
  };

  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateName(formData.name)) {
      newErrors.name = "Please enter your full name (min 2 characters)";
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    const userRecord = {
      name: formData.name.trim(),
      phone: formData.phone.replace(/\D/g, ""),
      firstVisit: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
    };

    try {
      localStorage.setItem("sahi_biriyani_user", JSON.stringify(userRecord));
    } catch (err) {
      console.warn("Could not write user to localStorage", err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onEnter(userRecord);
    }, 650);
  };

  const phoneNumber = "09163104857";
  const whatsappUrl = "https://wa.me/919163104857?text=Hi%20Sahi%20Biriyani%2C%20I%20would%20like%20to%20know%20more%20about%20your%20menu.";

  return (
    <div className="relative min-h-screen w-full bg-[#0A0806] text-[#F5EFE6] overflow-hidden flex items-center justify-center">
      {/* Ambient Background Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-gradient-to-b from-[#D49A3D]/20 via-[#E88126]/10 to-transparent blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#8E44AD]/5 blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-[#D49A3D]/8 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#070504_80%)] opacity-80" />
      </div>

      {/* Decorative grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#D49A3D 1px, transparent 1px), linear-gradient(90deg, #D49A3D 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <AnimatePresence mode="wait">
        {mounted && (
          <motion.div
            key="landing-card"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* LEFT COLUMN: Cinematic Visual & Brand Narrative */}
              <div className="lg:col-span-7 relative order-2 lg:order-1">
                {/* Hero Image Frame */}
                <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-[#D49A3D]/35 shadow-[0_40px_120px_rgba(0,0,0,0.95)] aspect-[5/4] group">
                  <img
                    src="/images/sahi_signature_dish_1788372815533.jpg"
                    alt="Sahi Biryani - Authentic Kolkata Dum Biryani with Golden Potato and Saffron"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-[1500ms] ease-out"
                    onError={(e) => {
                      e.currentTarget.src = "/images/hero-biryani.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070504] via-[#0A0806]/40 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#070504]/50 via-transparent to-transparent pointer-events-none" />

                  {/* Top-left Royal Crest */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="absolute top-5 sm:top-7 left-5 sm:left-7 flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/65 backdrop-blur-xl border border-[#D49A3D]/45 shadow-xl"
                  >
                    <Crown className="w-4 h-4 text-[#F3BF59]" />
                    <span className="font-royal text-[10px] sm:text-xs font-black tracking-[0.25em] text-[#FFE5A3] uppercase">
                      Royal Since • Kolkata
                    </span>
                  </motion.div>

                  {/* Top-right Live badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="absolute top-5 sm:top-7 right-5 sm:right-7 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-xl border border-[#2ECC71]/40"
                  >
                    <span className="relative flex w-2 h-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ECC71] opacity-75" />
                      <span className="relative inline-flex rounded-full w-2 h-2 bg-[#2ECC71]" />
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#A7F3D0] tracking-widest uppercase">
                      Live Kitchen • Boral
                    </span>
                  </motion.div>

                  {/* Bottom Signature Showcase */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="absolute bottom-5 sm:bottom-7 left-5 sm:left-7 right-5 sm:right-7"
                  >
                    <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-[#D49A3D]/35">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="font-serif italic text-sm sm:text-base text-[#FFE5A3] leading-snug">
                            “Slow-cooked. Fragrant. Unapologetically <span className="text-[#F3BF59] font-bold">Sahi.</span>”
                          </p>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-[10px] sm:text-[11px] text-[#CFC1AD] font-mono">
                            <div className="flex items-center gap-1.5">
                              <Flame className="w-3 h-3 text-[#E88126]" />
                              <span>Dum Pukht • 65 min sealed</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Leaf className="w-3 h-3 text-[#D49A3D]" />
                              <span>Kashmiri Zafran</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <UtensilsCrossed className="w-3 h-3 text-[#FFE5A3]" />
                              <span>Aged 1121 Basmati</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Location pill floating below card */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.7 }}
                  className="mt-5 flex items-center justify-center lg:justify-start"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#120E0A]/80 border border-white/5 backdrop-blur-md">
                    <MapPin className="w-3.5 h-3.5 text-[#E88126] shrink-0" />
                    <span className="text-[11px] sm:text-xs font-mono text-[#E6DCCE] tracking-wide">
                      Rakhiter More, Boral, Kolkata – 700154
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT COLUMN: Entry Form */}
              <div className="lg:col-span-5 relative order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.7 }}
                  className="relative"
                >
                  {/* Welcome Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18130E] border border-[#D49A3D]/35 text-[#FFE5A3] text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E88126]" />
                    <span>Welcome to the Royal Court</span>
                  </div>

                  {/* Headline */}
                  <h1 className="font-royal text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.08em] uppercase leading-[0.95] gold-gradient-text drop-shadow-[0_8px_30px_rgba(212,154,61,0.25)]">
                    SAHI
                    <br />
                    BIRIYANI
                  </h1>

                  <p className="mt-4 text-sm sm:text-base text-[#E6DCCE] font-serif leading-relaxed max-w-md">
                    Authentic Kolkata <em className="text-[#FFE5A3]">dum pukht</em> artistry, served from the heart of Boral. Step into a royal feast handcrafted with aged basmati, Kashmiri saffron, tender slow-marinated cuts, and the iconic golden Kolkata aloo.
                  </p>

                  {/* Form Card */}
                  <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.7 }}
                    className="mt-7 sm:mt-8 glass-panel rounded-3xl p-5 sm:p-7 border border-[#D49A3D]/30 shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
                  >
                    <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/10">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#22170F] to-[#0D0A08] border border-[#D49A3D]/45 flex items-center justify-center shrink-0">
                        <span className="font-royal text-[#D49A3D] text-sm font-black leading-none">S</span>
                      </div>
                      <div>
                        <div className="font-royal text-[13px] sm:text-sm font-bold tracking-[0.2em] text-[#FFE5A3] uppercase">
                          Enter Your Details
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-[#CFC1AD]/80 font-mono">
                          Saved locally • No account required
                        </div>
                      </div>
                    </div>

                    {/* Name Input */}
                    <div className="space-y-1.5 mb-4">
                      <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#D49A3D] font-mono font-semibold">
                        Your Royal Name *
                      </label>
                      <input
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. Sourav Santra"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        className={`w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl bg-[#0F0C09] border text-[#FFE5A3] placeholder-white/20 text-sm focus:outline-none transition-all ${
                          errors.name
                            ? "border-red-500/60 focus:border-red-500"
                            : "border-white/10 focus:border-[#D49A3D] focus:bg-[#14100C]"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-red-400/90 pl-1 font-mono">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-1.5 mb-6">
                      <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#D49A3D] font-mono font-semibold">
                        Contact Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel"
                          placeholder="e.g. 09163 104857"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: "" });
                          }}
                          className={`w-full px-4 sm:px-5 py-3.5 sm:py-4 pl-14 sm:pl-16 rounded-2xl bg-[#0F0C09] border text-[#FFE5A3] placeholder-white/20 text-sm focus:outline-none transition-all tracking-wider ${
                            errors.phone
                              ? "border-red-500/60 focus:border-red-500"
                              : "border-white/10 focus:border-[#D49A3D] focus:bg-[#14100C]"
                          }`}
                        />
                        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#1A140E] border border-white/5">
                          <span className="text-[11px] sm:text-xs font-bold text-[#FFE5A3]">+91</span>
                        </div>
                      </div>
                      {errors.phone && (
                        <p className="text-[11px] text-red-400/90 pl-1 font-mono">
                          {errors.phone}
                        </p>
                      )}
                      <p className="text-[10px] sm:text-[11px] text-[#CFC1AD]/60 pl-1 font-mono mt-1">
                        Used only for order confirmation & WhatsApp updates
                      </p>
                    </div>

                    {/* Enter Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-full py-3.5 sm:py-4.5 rounded-2xl text-[#0A0806] font-black text-xs sm:text-sm tracking-[0.25em] uppercase shadow-xl shadow-[#D49A3D]/30 hover:shadow-[#D49A3D]/50 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2.5 group overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#B37A22] via-[#D49A3D] to-[#E88126]" />
                      <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <span className="relative flex items-center gap-2.5">
                        {isSubmitting ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="#0A0806" strokeOpacity="0.3" strokeWidth="3" />
                              <path d="M22 12a10 10 0 0 1-10 10" stroke="#0A0806" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                            <span>Welcoming you...</span>
                          </>
                        ) : (
                          <>
                            <span>Enter the Royal Feast</span>
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </button>

                    {/* Direct contact shortcuts */}
                    <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                      <a
                        href={`tel:${phoneNumber}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#14100C] border border-white/10 text-[#CFC1AD] hover:text-[#FFE5A3] hover:border-[#D49A3D]/40 transition-colors text-[11px] font-mono font-semibold"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#2ECC71]" />
                        <span>Call: {phoneNumber}</span>
                      </a>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#0C3B23]/40 border border-[#25D366]/35 text-[#86EFAC] hover:text-white hover:bg-[#25D366]/15 transition-colors text-[11px] font-mono font-semibold"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>WhatsApp Inquiries</span>
                      </a>
                    </div>
                  </motion.form>

                  {/* Fine print */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="mt-5 text-[10px] sm:text-[11px] text-[#CFC1AD]/55 text-center lg:text-left font-mono leading-relaxed"
                  >
                    <span className="text-[#D49A3D]">No OTP.</span>{" "}
                    <span className="text-[#D49A3D]">No Password.</span>{" "}
                    <span className="text-[#D49A3D]">No Signup.</span>
                    <br className="hidden sm:inline" />
                    Your details stay in your browser. Pure biryani. Pure simplicity.
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
