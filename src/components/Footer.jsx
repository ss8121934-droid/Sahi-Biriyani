import React from "react";
import { ArrowUp, MapPin, Sparkles, Phone, MessageCircle } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const phoneNumber = "09163104857";
  const whatsappUrl = "https://wa.me/919163104857?text=Hi%20Sahi%20Biriyani%2C%20I%20would%20like%20to%20place%20an%20order.";

  return (
    <footer className="relative bg-[#060403] text-[#F5EFE6] border-t border-[#D49A3D]/20 pt-16 pb-12 overflow-hidden">
      {/* Subtle bottom radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[#D49A3D]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-start">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#18130E] border border-[#D49A3D]/40 flex items-center justify-center text-[#D49A3D] font-royal font-bold text-lg">
                S
              </div>
              <span className="font-royal text-2xl sm:text-3xl font-bold tracking-[0.18em] text-[#FFE5A3] uppercase">
                SAHI BIRIYANI
              </span>
            </div>

            <p className="text-sm sm:text-base font-serif italic text-[#E6DCCE] max-w-md">
              “Slow-cooked. Fragrant. Unapologetically Sahi.”
            </p>

            <div className="space-y-2 pt-2 text-xs text-[#CFC1AD]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D49A3D] shrink-0" />
                <span>Rakhiter More, Boral, Kolkata – 700154</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center gap-1.5 text-[#FFE5A3] hover:text-[#D49A3D] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#2ECC71]" />
                  <span>Call: {phoneNumber}</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#2ECC71] hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Orders</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] uppercase font-mono tracking-widest text-[#D49A3D] block font-bold">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs font-semibold tracking-wider text-[#CFC1AD]">
              <li>
                <a
                  href="#menu"
                  className="hover:text-[#FFE5A3] transition-colors"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="#story"
                  className="hover:text-[#FFE5A3] transition-colors"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  className="hover:text-[#FFE5A3] transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className="text-[#D49A3D] hover:text-[#FFE5A3] transition-colors"
                >
                  Order Now
                </a>
              </li>
            </ul>
          </div>

          {/* Back to Top */}
          <div className="md:col-span-3 flex md:justify-end">
            <button
              onClick={scrollToTop}
              className="px-5 py-3 rounded-full bg-[#14100C] border border-[#D49A3D]/30 text-xs font-mono text-[#FFE5A3] hover:border-[#D49A3D] hover:bg-[#1F1710] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#D49A3D]" />
            </button>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#CFC1AD]/60 font-mono">
          <div>
            © {new Date().getFullYear()} Sahi Biriyani. Handcrafted with reverence in Kolkata.
          </div>
          <div>
            Rakhiter More, Boral, Kolkata – 700154
          </div>
        </div>
      </div>
    </footer>
  );
}
