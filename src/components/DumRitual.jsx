import React from "react";
import { Sparkles, Flame, Clock, Key, ShieldCheck } from "lucide-react";

export default function DumRitual() {
  const steps = [
    {
      num: "01",
      title: "The 12-Hour Marination",
      stage: "Preparation",
      duration: "Overnight Rest",
      description:
        "Bone-in cuts are massaged with hung curd, cold-pressed oils, ginger-garlic paste, and crushed stone-ground spices. Left overnight so enzymes naturally tenderize the meat to the bone.",
      highlight: "Enzymatic Slow Tenderization",
    },
    {
      num: "02",
      title: "The Zafran & Attar Steep",
      stage: "Aromatics",
      duration: "45 Minutes",
      description:
        "Pure Kashmiri saffron threads are steeped in warm cow's milk until radiant golden. Blended with a single whisper of meetha attar and kewra water—the hallmark of royal Kolkata heritage.",
      highlight: "Kashmiri Zafran & Royal Essence",
    },
    {
      num: "03",
      title: "The Dough-Sealed Dum",
      stage: "Enclosure",
      duration: "65 Minutes on Embers",
      description:
        "The brass degh is sealed hermetically with a ribbon of unleavened flour dough. Cooked on a thick iron tawa over dying charcoal embers, trapping internal steam in pressurized convection.",
      highlight: "Zero Flavor Vapor Loss",
    },
    {
      num: "04",
      title: "The Royal Unveiling",
      stage: "Culmination",
      duration: "Served to Order",
      description:
        "The hardened dough seal is cut open tableside. A warm rush of saffron, roasted cardamom, and caramelized beresta vapors escapes, revealing glistening separated grains and golden aloo.",
      highlight: "Unbroken Fragrance Release",
    },
  ];

  return (
    <section id="ritual" className="relative py-24 sm:py-32 bg-[#090705] overflow-hidden border-t border-[#D49A3D]/10">
      {/* Background Ambience */}
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D49A3D]/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18130E] border border-[#D49A3D]/30 text-[#FFE5A3] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E88126]" />
            <span>Dum Pukht Craftsmanship</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-5xl font-black text-[#F5EFE6] tracking-tight uppercase">
            THE SAHI <span className="gold-gradient-text">WAY</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#CFC1AD] font-serif leading-relaxed">
            Four disciplined movements. No shortcuts, no pre-cooked shortcuts, no electric warming ovens. Just ancient royal physics.
          </p>
        </div>

        {/* 4 Step Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="relative p-6 sm:p-7 rounded-3xl bg-[#120E0A]/90 border border-[#D49A3D]/25 hover:border-[#D49A3D] transition-all duration-300 shadow-xl shadow-black/80 flex flex-col justify-between group"
            >
              <div>
                {/* Step Top Bar */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-royal text-3xl font-black text-[#D49A3D] group-hover:text-[#FFE5A3] transition-colors">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#1F1710] text-[#E88126] border border-[#E88126]/20">
                    {step.stage}
                  </span>
                </div>

                <h3 className="font-royal text-lg sm:text-xl font-bold text-[#FFE5A3] uppercase mb-3 leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#CFC1AD] leading-relaxed font-serif">
                  {step.description}
                </p>
              </div>

              {/* Bottom Feature Tag */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#D49A3D]">
                <span>{step.duration}</span>
                <span className="text-[10px] text-white/50">{step.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
