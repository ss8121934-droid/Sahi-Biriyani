import React from "react";
import { Sparkles, Flame, Clock, Heart, MapPin, Store } from "lucide-react";

export default function BrandStory() {
  const pillars = [
    {
      icon: Clock,
      title: "12-Hour Slow Steep",
      description: "Tender cuts steeped overnight in hung curd, hand-ground spices, and crushed garlic so flavor reaches the bone.",
    },
    {
      icon: Flame,
      title: "Sealed Dum Pukht",
      description: "Cooked inside a dough-sealed heavy brass handi over dying embers, trapping every wisp of fragrant steam.",
    },
    {
      icon: Sparkles,
      title: "Kashmiri Zafran",
      description: "Infused with pure saffron threads and meetha attar, creating the distinct royal golden hues without synthetic color.",
    },
    {
      icon: Heart,
      title: "The Kolkata Velvet Aloo",
      description: "Braised directly in the meat jus until buttery soft, carrying the true essence of Kolkata's royal Awadhi roots.",
    },
  ];

  return (
    <section id="story" className="relative py-24 sm:py-32 bg-[#0A0806] overflow-hidden border-t border-[#D49A3D]/10">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#D49A3D]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Real Sahi Biriyani Kitchen & Counter at Rakhiter More, Boral */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#D49A3D]/30 shadow-2xl shadow-black/80 aspect-[4/3] group">
              <img
                src="/images/sahi-outlet-real.jpg"
                alt="Sahi Biriyani authentic shop and takeaway counter at Rakhiter More, Boral, Kolkata"
                className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Floating Quote Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel border border-[#D49A3D]/30">
                <p className="font-serif italic text-xs sm:text-sm text-[#FFE5A3] leading-relaxed">
                  “The genuine dum pukht counter at Rakhiter More, Boral. Steaming authentic Kolkata biryani in traditional red-wrapped handis.”
                </p>
                <div className="mt-2 text-[11px] font-mono text-[#D49A3D] tracking-widest uppercase flex items-center justify-between">
                  <span>— Sahi Biriyani, Boral</span>
                  <span className="text-[#2ECC71] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC71] animate-ping" />
                    Live Dum Handi
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Corner Badge */}
            <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#1A140E] border border-[#D49A3D]/40 text-[#FFE5A3] shadow-xl">
              <Store className="w-4 h-4 text-[#E88126]" />
              <span className="text-xs font-bold font-royal tracking-widest uppercase">
                Rakhiter More • Boral
              </span>
            </div>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18130E] border border-[#D49A3D]/30 text-[#FFE5A3] text-xs font-semibold tracking-[0.25em] uppercase w-fit mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#E88126]" />
              <span>Our Culinary Philosophy</span>
            </div>

            <h2 className="font-royal text-3xl sm:text-5xl font-black text-[#F5EFE6] tracking-tight uppercase leading-tight">
              MORE THAN <span className="gold-gradient-text">A MEAL.</span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#E6DCCE] font-serif leading-relaxed">
              At <strong className="text-[#FFE5A3]">Sahi Biriyani</strong>, we believe true Kolkata dum biryani is an uncompromising art of patience. Long before the heavy brass handi is sealed with dough, our grains are curated from aged Himalayan basmati, our spices hand-toasted to unlock dormant natural oils, and our tender cuts marinated slowly.
            </p>

            <p className="mt-4 text-sm sm:text-base text-[#CFC1AD] font-serif leading-relaxed">
              Located at Rakhiter More, Boral, Sahi Biriyani remains unapologetically committed to the authentic dum pukht method: cooking in gentle confinement so that every grain of basmati absorbs the soul of saffron, the richness of yakhni broth, and the sweetness of caramelized onions.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#120E0A]/90 border border-white/5 hover:border-[#D49A3D]/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <Icon className="w-4 h-4 text-[#D49A3D]" />
                      <h3 className="text-xs font-bold font-royal text-[#FFE5A3] uppercase tracking-wider">
                        {p.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#CFC1AD] leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
