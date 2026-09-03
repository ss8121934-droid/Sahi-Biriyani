import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Thermometer, Wind, CheckCircle2, ChevronRight } from "lucide-react";
import { LAYERS_DATA } from "../data/layersData";

export default function LayerExplorer() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentLayer = LAYERS_DATA[selectedIndex];

  return (
    <section id="exploded" className="relative py-24 sm:py-32 bg-[#080605] overflow-hidden border-t border-[#D49A3D]/15">
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-[#D49A3D]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#E88126]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18130E] border border-[#D49A3D]/30 text-[#FFE5A3] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E88126]" />
            <span>The Anatomy of Sahi Dum</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-5xl font-extrabold text-[#F5EFE6] tracking-tight uppercase">
            DECONSTRUCTING THE <span className="gold-gradient-text">MASTERPIECE</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#CFC1AD] font-serif leading-relaxed">
            Every layer inside the sealed handi plays an unyielding culinary role. Select a layer to explore the craftsmanship behind its temperature, moisture, and aroma.
          </p>
        </div>

        {/* Interactive Layer Explorer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Layer Selection Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {LAYERS_DATA.map((layer, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={layer.id}
                  onClick={() => setSelectedIndex(idx)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`relative text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-[#22170F] to-[#16100B] border-2 border-[#D49A3D] shadow-xl shadow-black/60 translate-x-2"
                      : "bg-[#110E0B]/80 hover:bg-[#1A140F] border border-white/5 hover:border-[#D49A3D]/30 text-white/70"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Layer Number Badge */}
                    <div
                      className={`w-9 h-9 rounded-xl font-royal font-bold text-xs flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#D49A3D] text-[#0A0806] shadow-md shadow-[#D49A3D]/30"
                          : "bg-[#1C1611] text-[#FFE5A3]/60 group-hover:text-[#FFE5A3]"
                      }`}
                    >
                      {layer.layerNumber}
                    </div>

                    <div>
                      <div
                        className={`text-sm sm:text-base font-bold font-royal transition-colors ${
                          isSelected
                            ? "text-[#FFE5A3]"
                            : "text-[#E6DCCE] group-hover:text-[#FFE5A3]"
                        }`}
                      >
                        {layer.name}
                      </div>
                      <div className="text-xs text-[#CFC1AD]/70 font-medium">
                        {layer.subtitle}
                      </div>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected
                        ? "text-[#D49A3D] translate-x-1"
                        : "text-white/20 group-hover:text-white/60"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Layer Cinematic Spotlight Showcase */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLayer.id}
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-3xl overflow-hidden glass-panel border border-[#D49A3D]/30 p-6 sm:p-8 shadow-2xl shadow-black/90"
              >
                {/* Visual Image Header with Gradient Backdrop */}
                <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                  <img
                    src={currentLayer.image}
                    alt={currentLayer.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0806] via-black/30 to-transparent" />

                  {/* Top Layer Tags */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-[#D49A3D]/40 text-[#FFE5A3] font-royal font-bold text-xs tracking-wider">
                      LAYER {currentLayer.layerNumber} / 07
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#E88126]/80 backdrop-blur-md text-[#0A0806] font-bold text-xs tracking-wider uppercase">
                      {currentLayer.category}
                    </span>
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-royal text-2xl sm:text-3xl font-extrabold text-[#FFE5A3] drop-shadow-md">
                      {currentLayer.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#E6DCCE] font-serif italic mt-0.5">
                      {currentLayer.subtitle}
                    </p>
                  </div>
                </div>

                {/* Layer Culinary Deep-Dive Details */}
                <div className="mt-6 space-y-5">
                  <p className="text-sm sm:text-base text-[#E6DCCE] font-serif leading-relaxed">
                    {currentLayer.description}
                  </p>

                  {/* Sensory Profile Card */}
                  <div className="p-4 rounded-xl bg-[#14100C] border border-[#D49A3D]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <Wind className="w-4 h-4 text-[#D49A3D] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[11px] uppercase tracking-widest text-[#D49A3D] font-mono block">
                          Sensory Profile
                        </span>
                        <span className="text-xs text-[#CFC1AD]">
                          {currentLayer.sensoryProfile}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-4">
                      <Thermometer className="w-4 h-4 text-[#E88126]" />
                      <div className="text-[11px] font-mono text-[#FFE5A3]">
                        {currentLayer.heatIndex}
                      </div>
                    </div>
                  </div>

                  {/* Aroma Notes Badges */}
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#CFC1AD]/80 font-mono block mb-2">
                      Key Flavor Compounds & Aromatics
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentLayer.aromaNotes.map((note, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-[#1F1710] border border-[#D49A3D]/30 text-[#FFE5A3] text-xs font-medium flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E88126]" />
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Craft Technique */}
                  <div className="pt-2 text-xs text-[#CFC1AD]/90 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2ECC71] mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-[#FFE5A3]">The Craft Secret:</strong>{" "}
                      {currentLayer.technique}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
