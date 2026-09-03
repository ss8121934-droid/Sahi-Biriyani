import React, { useState } from "react";
import { MapPin, Navigation, Phone, MessageCircle, ExternalLink, Image as ImageIcon, Compass } from "lucide-react";

export default function LocationSection() {
  const [viewMode, setViewMode] = useState("storefront"); // "storefront" | "map"
  const phoneNumber = "09163104857";
  const whatsappUrl = "https://wa.me/919163104857?text=Hi%20Sahi%20Biriyani%2C%20I%20would%20like%20to%20place%20an%20order%20or%20inquire.";
  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Rakhiter+More,+Boral,+Kolkata+-+700154";

  return (
    <section
      id="location"
      className="relative py-24 sm:py-32 bg-[#0A0806] overflow-hidden border-t border-[#D49A3D]/15"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D49A3D]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Address & Direct Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18130E] border border-[#D49A3D]/30 text-[#FFE5A3] text-xs font-semibold tracking-[0.25em] uppercase w-fit mb-4">
              <MapPin className="w-3.5 h-3.5 text-[#E88126]" />
              <span>Kitchen & Takeaway Counter</span>
            </div>

            <h2 className="font-royal text-3xl sm:text-5xl font-black text-[#F5EFE6] tracking-tight uppercase">
              COME FIND <span className="gold-gradient-text">US</span>
            </h2>

            {/* Address Block */}
            <div className="mt-6 p-6 rounded-3xl bg-[#14100C] border border-[#D49A3D]/30 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#22170F] border border-[#D49A3D]/50 flex items-center justify-center shrink-0 shadow-lg">
                  <MapPin className="w-6 h-6 text-[#D49A3D]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#D49A3D]">
                    Official Location
                  </span>
                  <p className="font-royal text-xl sm:text-2xl font-bold text-[#FFE5A3] mt-1">
                    Rakhiter More,
                  </p>
                  <p className="font-royal text-lg sm:text-xl font-medium text-[#E6DCCE]">
                    Boral,
                  </p>
                  <p className="font-mono text-sm sm:text-base text-[#CFC1AD] mt-1 font-semibold">
                    Kolkata – 700154
                  </p>
                </div>
              </div>

              {/* Direct Contact & WhatsApp Info */}
              <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#FFE5A3]">
                  <Phone className="w-4 h-4 text-[#2ECC71]" />
                  <span className="font-mono font-bold text-sm sm:text-base">
                    {phoneNumber}
                  </span>
                </div>
                <div className="text-[11px] text-[#CFC1AD]/80 font-mono">
                  Takeaway & Direct WhatsApp Orders
                </div>
              </div>
            </div>

            {/* Order/Visit Note */}
            <p className="mt-6 text-sm sm:text-base text-[#CFC1AD] font-serif leading-relaxed">
              Step into our kitchen at Rakhiter More to take in the warm fragrance of slow-steaming dum deghs, or order directly via WhatsApp or online for delivery across Kolkata.
            </p>

            {/* Contact & Navigation Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#25D366] text-black font-bold text-xs tracking-[0.18em] uppercase shadow-xl shadow-[#25D366]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WHATSAPP US</span>
              </a>

              <a
                href={`tel:${phoneNumber}`}
                className="px-6 py-3.5 rounded-full bg-[#1F1710] border border-[#D49A3D]/40 text-[#FFE5A3] font-bold text-xs tracking-[0.18em] uppercase hover:bg-[#2A1E14] hover:border-[#D49A3D] transition-all flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#D49A3D]" />
                <span>CALL: {phoneNumber}</span>
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D49A3D] to-[#E88126] text-[#0A0806] font-bold text-xs tracking-[0.18em] uppercase shadow-xl shadow-[#D49A3D]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>DIRECTIONS</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Showcase (Toggle between Storefront Photo & GPS Map) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#D49A3D]/30 p-2 shadow-2xl aspect-[4/3] group">
              {/* Toggle Switcher at top of card */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-black/80 backdrop-blur-md border border-[#D49A3D]/30 shadow-lg">
                <button
                  onClick={() => setViewMode("storefront")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center gap-1.5 ${
                    viewMode === "storefront"
                      ? "bg-[#D49A3D] text-[#0A0806]"
                      : "text-[#CFC1AD] hover:text-[#FFE5A3]"
                  }`}
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>Shop Photo</span>
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center gap-1.5 ${
                    viewMode === "map"
                      ? "bg-[#D49A3D] text-[#0A0806]"
                      : "text-[#CFC1AD] hover:text-[#FFE5A3]"
                  }`}
                >
                  <Compass className="w-3 h-3" />
                  <span>GPS Map</span>
                </button>
              </div>

              {/* View 1: Real Sahi Biriyani Storefront Image */}
              {viewMode === "storefront" ? (
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <img
                    src="/images/sahi-outlet-real.jpg"
                    alt="Sahi Biriyani shop at Rakhiter More, Boral, Kolkata – 700154"
                    className="w-full h-full object-cover object-[center_35%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                  {/* Caption Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-[#E6DCCE]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse" />
                      <span className="font-royal font-bold text-[#FFE5A3]">
                        Real Sahi Biriyani Counter
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[#D49A3D]">
                      Rakhiter More, Boral
                    </span>
                  </div>
                </div>
              ) : (
                /* View 2: Styled GPS Radar Map */
                <div className="relative w-full h-full rounded-2xl bg-[#0F0C09] overflow-hidden flex items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(#D49A3D 1px, transparent 1px), radial-gradient(#D49A3D 1px, #0F0C09 1px)`,
                      backgroundSize: "32px 32px",
                      backgroundPosition: "0 0, 16px 16px",
                    }}
                  />

                  <svg
                    className="absolute inset-0 w-full h-full opacity-35"
                    preserveAspectRatio="none"
                    viewBox="0 0 400 300"
                  >
                    <path
                      d="M-20,120 Q120,90 200,150 T420,130"
                      stroke="#D49A3D"
                      strokeWidth="2.5"
                      fill="none"
                    />
                    <path
                      d="M60,-20 Q140,100 180,180 T260,320"
                      stroke="#E88126"
                      strokeWidth="3"
                      fill="none"
                    />
                    <path
                      d="M220,40 Q280,110 360,200"
                      stroke="#D49A3D"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      fill="none"
                    />
                    <path
                      d="M10,240 Q150,220 280,260"
                      stroke="#F3BF59"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>

                  <div className="absolute w-44 h-44 rounded-full border border-[#D49A3D]/30 animate-ping opacity-25" />
                  <div className="absolute w-28 h-28 rounded-full border border-[#E88126]/40 animate-pulse" />

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D49A3D] to-[#E88126] p-0.5 shadow-[0_0_35px_rgba(232,129,38,0.7)] flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-[#0A0806] flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-[#FFE5A3]" />
                      </div>
                    </div>

                    <div className="mt-3 px-4 py-1.5 rounded-full bg-black/90 border border-[#D49A3D]/60 backdrop-blur-md shadow-2xl text-center">
                      <span className="font-royal text-xs font-bold text-[#FFE5A3] block tracking-wider">
                        SAHI BIRIYANI
                      </span>
                      <span className="text-[9px] font-mono text-[#CFC1AD]">
                        Rakhiter More, Boral, Kolkata
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 font-mono text-[10px] text-[#D49A3D]/70 bg-black/60 px-3 py-1 rounded-md border border-white/5">
                    22°27'N • 88°21'E • BORAL
                  </div>

                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-[#18130E] border border-[#D49A3D]/40 text-[#FFE5A3] text-[11px] font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <span>Open Maps</span>
                    <ExternalLink className="w-3 h-3 text-[#D49A3D]" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
