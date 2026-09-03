import React from "react";
import { Sparkles, ShoppingBag, Flame, Star, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import { MENU_ITEMS } from "../data/menuData";

export default function SignatureDish() {
  const { addToCart } = useCart();
  const signatureItem =
    MENU_ITEMS.find((item) => item.id === "sahi-special-biryani") ||
    MENU_ITEMS[0];

  const highlights = [
    { label: "Basmati", val: "Aged 1121 Extra Long" },
    { label: "Zafran", val: "Kashmiri Mongra Saffron" },
    { label: "Aloo", val: "Slow-Braised Chandramukhi" },
    { label: "Dum Pukht", val: "Dough-Sealed Charcoal" },
  ];

  return (
    <section id="signature" className="relative py-24 sm:py-36 bg-[#070504] overflow-hidden border-t border-[#D49A3D]/20">
      {/* Cinematic Golden Amber Glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E88126]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Top Label */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18130E] border border-[#D49A3D]/40 text-[#FFE5A3] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            <Star className="w-3.5 h-3.5 text-[#D49A3D] fill-[#D49A3D]" />
            <span>The Crown of Sahi Biriyani</span>
          </div>
          <h2 className="font-royal text-4xl sm:text-6xl md:text-7xl font-black text-[#F5EFE6] tracking-tight uppercase leading-none">
            THE SAHI <span className="gold-gradient-text">SIGNATURE</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#CFC1AD] font-serif max-w-2xl italic">
            Where every iconic element of authentic Kolkata royal dum biryani comes together in harmonious proportion.
          </p>
        </div>

        {/* Magazine-Style Editorial Spread */}
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#D49A3D]/30 p-6 sm:p-12 shadow-2xl shadow-black/95">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-7 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D49A3D]/40 shadow-2xl aspect-[4/3] group">
                <img
                  src="/images/signature-dish.jpg"
                  alt="The Sahi Signature Kolkata Dum Biryani with Golden Potato and Egg"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

                {/* Floating Visual Feature Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#D49A3D]/50 text-[#FFE5A3] text-xs font-royal font-bold">
                    Signature Dum Platter
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#E88126]/90 backdrop-blur-md text-[#0A0806] text-xs font-bold uppercase tracking-wider">
                    2 Meat + 2 Aloo + 2 Eggs
                  </span>
                </div>

                {/* Bottom Callout Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-[#E6DCCE]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E88126] animate-ping" />
                    <span>Steaming Golden Saffron Grains & Velvet Potato</span>
                  </span>
                  <span className="font-mono text-[#D49A3D] font-semibold">
                    ₹{signatureItem.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Editorial Content Column */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#D49A3D] font-mono font-bold block mb-2">
                  Crowning Masterpiece • Royal Portion
                </span>
                <h3 className="font-royal text-2xl sm:text-3xl font-bold text-[#FFE5A3] uppercase">
                  SPECIAL SAHI ROYAL BIRYANI
                </h3>
                <p className="mt-4 text-sm sm:text-base text-[#E6DCCE] font-serif leading-relaxed">
                  Crafted for the true connoisseur. We slow-braise two tender cuts (juicy chicken drumstick and succulent farm mutton) alongside two whole golden Chandramukhi potatoes that have absorbed the marrow jus, two farm-fresh boiled eggs, and caramelized crispy beresta atop mountain-aged basmati.
                </p>

                {/* Specification Grid */}
                <div className="grid grid-cols-2 gap-3 my-6">
                  {highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#14100C] border border-[#D49A3D]/20"
                    >
                      <div className="text-[10px] uppercase tracking-wider text-[#D49A3D] font-mono">
                        {h.label}
                      </div>
                      <div className="text-xs font-semibold text-[#FFE5A3] mt-0.5">
                        {h.val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Flavor Accents list */}
                <ul className="space-y-2 text-xs text-[#CFC1AD]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#2ECC71]" />
                    <span>Includes 2 tender meat pieces, 2 golden aloo, 2 boiled eggs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#2ECC71]" />
                    <span>Accompanied by house Burani Garlic Raita & Gondhoraj lime</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#2ECC71]" />
                    <span>Zero artificial food coloring, 100% pure Kashmiri saffron</span>
                  </li>
                </ul>
              </div>

              {/* Price & CTA Action */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#CFC1AD]/70 font-mono block">
                    Royal Price
                  </span>
                  <div className="text-2xl sm:text-3xl font-royal font-bold text-[#FFE5A3]">
                    ₹{signatureItem.price}
                    <span className="text-xs text-[#CFC1AD]/60 font-sans font-normal ml-1.5">
                      (Taxes incl.)
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(signatureItem)}
                  className="px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D49A3D] via-[#E88126] to-[#C4620E] text-[#0A0806] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase shadow-xl shadow-[#D49A3D]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ORDER SIGNATURE</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
