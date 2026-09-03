import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles, ArrowRight, Eye, Layers, Compass, Flame, Info } from "lucide-react";
import { LAYERS_DATA } from "../data/layersData";
import SteamCanvas from "./SteamCanvas";

export default function ExplodedHero() {
  const containerRef = useRef(null);
  const [activeLayer, setActiveLayer] = useState(null);
  const [manualScrub, setManualScrub] = useState(null); // null = scroll driven, number = manual override
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll tracking across the sticky section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring physics for fluid interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.001,
  });

  // Effective progress: manual override if user clicks toggle/slider, else smooth scroll
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    if (manualScrub !== null) {
      setCurrentProgress(manualScrub);
      return;
    }
    const unsubscribe = smoothProgress.on("change", (latest) => {
      setCurrentProgress(latest);
    });
    return () => unsubscribe();
  }, [smoothProgress, manualScrub]);

  // Subtle 3D mouse parallax on hero container
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleResetMouse = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Exploded multiplier: 1 when progress = 0 (fully exploded), 0 when progress >= 0.8 (assembled)
  const explodeFactor = Math.max(0, 1 - currentProgress * 1.3);
  const assembledOpacity = Math.min(1, Math.max(0, (currentProgress - 0.35) * 1.8));

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full h-[220vh] sm:h-[250vh] bg-[#0A0806] text-[#F5EFE6] overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleResetMouse}
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* Background Ambient Lighting & Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] rounded-full bg-gradient-to-b from-[#D49A3D]/15 via-[#E88126]/10 to-transparent blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-[350px] h-[350px] rounded-full bg-[#8E44AD]/5 blur-[100px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0806_85%)] opacity-80" />
        </div>

        {/* Ambient Steam and Warm Ember Canvas */}
        <SteamCanvas />

        {/* Top Header Information & Brand Headline */}
        <div className="relative z-20 pt-20 sm:pt-24 px-4 sm:px-8 text-center max-w-5xl mx-auto flex flex-col items-center">
          {/* Royal Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A140F]/80 border border-[#D49A3D]/30 backdrop-blur-md shadow-lg shadow-black/40 mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#E88126] animate-ping" />
            <span className="text-[10px] sm:text-xs tracking-[0.25em] text-[#FFE5A3] uppercase font-semibold">
              Rakhiter More, Boral • Kolkata 700154
            </span>
          </motion.div>

          {/* Main Brand Headline */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-royal text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.12em] uppercase leading-none gold-gradient-text drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
          >
            SAHI BIRIYANI
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-3 sm:mt-4 text-sm sm:text-lg md:text-xl font-serif italic tracking-wide text-[#E6DCCE] max-w-2xl"
          >
            “Slow-cooked. Fragrant. Unapologetically Sahi.”
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => scrollToSection("#menu")}
              className="px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#D49A3D] to-[#E88126] text-[#0A0806] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase shadow-xl shadow-[#D49A3D]/25 hover:shadow-[#D49A3D]/45 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 group"
            >
              <span>EXPLORE THE MENU</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection("#menu")}
              className="px-6 sm:px-8 py-3 rounded-full bg-[#18130E]/90 border border-[#D49A3D]/40 text-[#FFE5A3] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-[#251B12] hover:border-[#D49A3D] hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
            >
              ORDER NOW
            </button>
          </motion.div>
        </div>

        {/* Center: THE 3D EXPLODED / ASSEMBLED BIRYANI COMPOSITION */}
        <div className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center px-4 perspective-1500 my-2 sm:my-0">
          <div
            className="relative w-full max-w-[560px] sm:max-w-[700px] h-[340px] sm:h-[440px] flex items-center justify-center transform-style-3d transition-transform duration-200 ease-out"
            style={{
              transform: `rotateX(${mousePos.y * -14}deg) rotateY(${
                mousePos.x * 18
              }deg)`,
            }}
          >
            {/* LAYER 0 (Assembled Finished Sahi Biryani Handi - Crossfades into View) */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-700 ease-out"
              style={{
                opacity: assembledOpacity,
                transform: `scale(${1 + (1 - explodeFactor) * 0.08})`,
              }}
            >
              <div className="relative w-[320px] sm:w-[460px] md:w-[520px] aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] border border-[#D49A3D]/40">
                <img
                  src="/images/hero-biryani.jpg"
                  alt="Sahi Biryani Assembled Handi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                {/* Steaming Dum Tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-[#D49A3D]/30">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse" />
                    <span className="text-xs tracking-widest uppercase font-royal text-[#FFE5A3]">
                      Fresh Dum Sealed Handi
                    </span>
                  </div>
                  <span className="text-[11px] text-[#CFC1AD]">100% Assembled</span>
                </div>
              </div>
            </div>

            {/* DECONSTRUCTED / EXPLODED LAYERS (Shown when explodeFactor > 0) */}
            <div
              className="absolute inset-0 flex items-center justify-center transform-style-3d transition-opacity duration-500"
              style={{
                opacity: Math.max(0, 1 - assembledOpacity * 1.2),
                pointerEvents: assembledOpacity > 0.7 ? "none" : "auto",
              }}
            >
              {/* Base Brass Handi Platform Layer (Layer 01) */}
              <div
                className="absolute transition-transform duration-500 ease-out flex items-center justify-center pointer-events-none"
                style={{
                  transform: `translateY(${140 * explodeFactor}px) translateZ(${
                    -60 * explodeFactor
                  }px) rotateX(${10 * explodeFactor}deg) scale(${
                    0.85 + (1 - explodeFactor) * 0.15
                  })`,
                }}
              >
                <div className="relative w-[280px] sm:w-[420px] h-[160px] sm:h-[200px] rounded-full bg-gradient-to-b from-[#4A3215] to-[#1E1408] border-2 border-[#D49A3D]/60 shadow-[0_30px_60px_rgba(0,0,0,0.9)] flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/hero-biryani.jpg"
                    alt="Royal Brass Handi Base"
                    className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-[#D49A3D]/20" />
                  <span className="relative z-10 text-[11px] uppercase tracking-[0.3em] text-[#FFE5A3] font-royal font-bold">
                    Hammered Brass Handi Bedrock
                  </span>
                </div>
              </div>

              {/* Layer 02: Yakhni Gravy & Masala Layer */}
              <div
                className="absolute transition-transform duration-500 ease-out pointer-events-none"
                style={{
                  transform: `translateY(${85 * explodeFactor}px) translateZ(${
                    -30 * explodeFactor
                  }px) rotateX(${7 * explodeFactor}deg)`,
                }}
              >
                <div className="w-[260px] sm:w-[380px] h-[75px] sm:h-[95px] rounded-[50%] bg-gradient-to-r from-[#8C3A0A] via-[#B85311] to-[#783005] opacity-90 border border-[#D49A3D]/40 blur-[0.6px] shadow-lg shadow-black/80 flex items-center justify-center">
                  <div className="text-[10px] sm:text-xs tracking-[0.25em] text-[#FFE5A3]/90 font-semibold uppercase">
                    Yakhni Gravy & Masala Broth
                  </div>
                </div>
              </div>

              {/* Layer 03: Succulent Meat (Chicken Drumstick & Mutton Cuts) */}
              <div
                className="absolute transition-transform duration-500 ease-out"
                style={{
                  transform: `translateY(${25 * explodeFactor}px) translateZ(${
                    0 * explodeFactor
                  }px) rotateX(${3 * explodeFactor}deg) rotateZ(${
                    -2 * explodeFactor
                  }deg)`,
                }}
              >
                <div className="relative w-[280px] sm:w-[410px] h-[100px] sm:h-[130px] rounded-3xl overflow-hidden border border-[#E88126]/50 shadow-2xl shadow-black/90 group cursor-pointer">
                  <img
                    src="/images/mutton-biryani.jpg"
                    alt="Slow Braised Meat Cuts"
                    className="w-full h-full object-cover brightness-105 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-[#FFE5A3] font-semibold">
                    <span>03 • Succulent Braised Meat</span>
                    <span className="text-[9px] uppercase tracking-wider text-[#D49A3D] bg-black/60 px-2 py-0.5 rounded">
                      12-Hr Marination
                    </span>
                  </div>
                </div>
              </div>

              {/* Layer 04: Iconic Kolkata Aloo & Boiled Farm Egg */}
              <div
                className="absolute transition-transform duration-500 ease-out"
                style={{
                  transform: `translateY(${-45 * explodeFactor}px) translateZ(${
                    35 * explodeFactor
                  }px) rotateX(${-2 * explodeFactor}deg) rotateZ(${
                    2 * explodeFactor
                  }deg)`,
                }}
              >
                <div className="relative w-[270px] sm:w-[390px] h-[95px] sm:h-[120px] rounded-3xl overflow-hidden border-2 border-[#F3BF59]/60 shadow-[0_20px_40px_rgba(0,0,0,0.85)] group cursor-pointer">
                  <img
                    src="/images/signature-dish.jpg"
                    alt="Kolkata Golden Potato and Farm Egg"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-[#FFE5A3] font-semibold">
                    <span>04 • Kolkata Velvet Aloo & Egg</span>
                    <span className="text-[9px] uppercase tracking-wider text-[#F3BF59] bg-black/60 px-2 py-0.5 rounded">
                      The Kolkata Soul
                    </span>
                  </div>
                </div>
              </div>

              {/* Layer 05: Whole Spices (Star Anise, Mace, Cardamom) */}
              <div
                className="absolute transition-transform duration-500 ease-out pointer-events-none"
                style={{
                  transform: `translateY(${-115 * explodeFactor}px) translateZ(${
                    65 * explodeFactor
                  }px) rotateX(${-6 * explodeFactor}deg)`,
                }}
              >
                <div className="relative w-[250px] sm:w-[360px] h-[75px] sm:h-[90px] rounded-2xl overflow-hidden border border-[#D49A3D]/40 shadow-xl shadow-black/80">
                  <img
                    src="/images/spices-macro.jpg"
                    alt="Royal Whole Spices"
                    className="w-full h-full object-cover brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-1.5 left-3 text-[10px] tracking-widest uppercase font-semibold text-[#FFE5A3]">
                    05 • Royal Potli Spices
                  </div>
                </div>
              </div>

              {/* Layer 06: Kashmiri Saffron & Aged Basmati Rice */}
              <div
                className="absolute transition-transform duration-500 ease-out"
                style={{
                  transform: `translateY(${-180 * explodeFactor}px) translateZ(${
                    95 * explodeFactor
                  }px) rotateX(${-10 * explodeFactor}deg) rotateZ(${
                    -1.5 * explodeFactor
                  }deg)`,
                }}
              >
                <div className="relative w-[280px] sm:w-[410px] h-[85px] sm:h-[110px] rounded-3xl overflow-hidden border border-[#F3BF59]/60 shadow-[0_20px_50px_rgba(243,191,89,0.15)] group cursor-pointer">
                  <img
                    src="/images/signature-dish.jpg"
                    alt="Kashmiri Saffron Rice Layer"
                    className="w-full h-full object-cover object-top brightness-110 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-[#FFE5A3] font-semibold">
                    <span>06 • Kashmiri Zafran & Basmati</span>
                    <span className="text-[9px] uppercase tracking-wider text-[#FFE5A3] bg-black/60 px-2 py-0.5 rounded">
                      2-Yr Aged 1121
                    </span>
                  </div>
                </div>
              </div>

              {/* Layer 07 (Top): Crispy Golden Beresta & Mint */}
              <div
                className="absolute transition-transform duration-500 ease-out"
                style={{
                  transform: `translateY(${-245 * explodeFactor}px) translateZ(${
                    125 * explodeFactor
                  }px) rotateX(${-14 * explodeFactor}deg)`,
                }}
              >
                <div className="relative w-[260px] sm:w-[380px] h-[65px] sm:h-[80px] rounded-2xl bg-gradient-to-r from-[#3D250C] via-[#63390F] to-[#2E1B09] border border-[#E88126]/60 shadow-xl shadow-black/90 flex items-center justify-between px-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🧅</span>
                    <div>
                      <div className="text-xs font-bold text-[#FFE5A3] tracking-wider">
                        07 • Crispy Beresta & Fresh Mint
                      </div>
                      <div className="text-[10px] text-[#CFC1AD]/80">
                        Caramelized Ghee-Fried Onions & Rose Petals
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-[#E88126] font-mono font-bold">
                    Zenith
                  </span>
                </div>
              </div>

              {/* Interactive Callout Markers (Pins with annotations) */}
              {explodeFactor > 0.4 && (
                <div className="absolute inset-0 pointer-events-auto hidden md:block">
                  {LAYERS_DATA.filter((_, idx) => idx % 2 === 0).map((layer) => (
                    <div
                      key={layer.id}
                      className="absolute z-30 transition-all duration-300 group"
                      style={{
                        top: layer.calloutPosition.top,
                        left: layer.calloutPosition.left,
                      }}
                    >
                      <button
                        onClick={() =>
                          setActiveLayer(
                            activeLayer?.id === layer.id ? null : layer
                          )
                        }
                        className="relative flex items-center gap-2 p-1.5 rounded-full bg-[#18130E]/90 border border-[#D49A3D]/50 text-[#FFE5A3] hover:border-[#FFE5A3] hover:scale-110 transition-all shadow-xl shadow-black cursor-pointer"
                        aria-label={`Inspect ${layer.name}`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E88126] animate-pulse" />
                        <span className="text-[10px] font-bold tracking-widest px-1 font-royal">
                          {layer.layerNumber}
                        </span>
                      </button>

                      {/* Tooltip Card on Hover / Tap */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 p-3 rounded-xl bg-[#14100C]/95 border border-[#D49A3D]/40 backdrop-blur-xl shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-40">
                        <div className="text-xs font-bold font-royal text-[#FFE5A3]">
                          {layer.name}
                        </div>
                        <div className="text-[10px] text-[#D49A3D] font-medium mt-0.5">
                          {layer.subtitle}
                        </div>
                        <p className="text-[10px] text-[#CFC1AD] mt-1.5 leading-relaxed">
                          {layer.sensoryProfile}
                        </p>
                        <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px] text-[#E88126] font-mono">
                          <span>{layer.heatIndex}</span>
                          <span className="text-white/60">Dum Layer</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Interactive HUD Controls: Assemble vs Explode Scrub Controller */}
        <div className="relative z-30 pb-6 sm:pb-8 px-4 sm:px-8 max-w-4xl mx-auto w-full">
          <div className="glass-panel rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#D49A3D]/30 shadow-2xl">
            {/* Mode Switcher Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
              <button
                onClick={() => setManualScrub(0)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-2 ${
                  currentProgress < 0.4
                    ? "bg-gradient-to-r from-[#D49A3D] to-[#E88126] text-[#0A0806] shadow-lg shadow-[#D49A3D]/25"
                    : "bg-[#18130E] text-[#CFC1AD] hover:text-[#FFE5A3] border border-white/5"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Exploded View</span>
              </button>

              <button
                onClick={() => setManualScrub(0.95)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-2 ${
                  currentProgress >= 0.4
                    ? "bg-gradient-to-r from-[#D49A3D] to-[#E88126] text-[#0A0806] shadow-lg shadow-[#D49A3D]/25"
                    : "bg-[#18130E] text-[#CFC1AD] hover:text-[#FFE5A3] border border-white/5"
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Assembled Handi</span>
              </button>
            </div>

            {/* Interactive Tactile Scrub Slider */}
            <div className="flex items-center gap-3 w-full sm:w-72">
              <span className="text-[10px] tracking-widest text-[#CFC1AD]/70 uppercase font-mono hidden sm:inline">
                Deconstruct
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={currentProgress}
                onChange={(e) => setManualScrub(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#251B12] rounded-lg appearance-none cursor-pointer accent-[#D49A3D]"
                aria-label="Biryani layer assembly scrub slider"
              />
              <span className="text-[10px] tracking-widest text-[#FFE5A3] uppercase font-mono hidden sm:inline">
                Assemble
              </span>
            </div>

            {/* Scroll Indicator Prompt */}
            <div className="hidden lg:flex items-center gap-2 text-[11px] text-[#D49A3D] font-mono tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E88126] animate-ping" />
              <span>Scroll to assemble or scrub slider</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
