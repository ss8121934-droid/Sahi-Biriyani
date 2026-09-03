import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShoppingBag, Plus, Check, Star, Flame, Search } from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS } from "../data/menuData";
import { useCart } from "../context/CartContext";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  // Customization modal state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [extraAloo, setExtraAloo] = useState(false);
  const [extraEgg, setExtraEgg] = useState(false);

  // Filter items
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === "all" ? true : item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenCustomize = (product) => {
    // If item is not a biryani, add directly
    if (!product.category.includes("biryani") && product.category !== "special" && product.category !== "chicken" && product.category !== "mutton" && product.category !== "egg") {
      addToCart(product);
      return;
    }
    setSelectedProduct(product);
    setExtraAloo(false);
    setExtraEgg(false);
  };

  const handleConfirmAdd = () => {
    if (!selectedProduct) return;
    addToCart(selectedProduct, { extraAloo, extraEgg });
    setSelectedProduct(null);
  };

  return (
    <section id="menu" className="relative py-24 sm:py-32 bg-[#080604] overflow-hidden border-t border-[#D49A3D]/15">
      {/* Background radial ambient lights */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#D49A3D]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-[#E88126]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18130E] border border-[#D49A3D]/30 text-[#FFE5A3] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E88126]" />
            <span>The Culinary Repertoire</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-5xl font-black text-[#F5EFE6] tracking-tight uppercase">
            ROYAL SAHI <span className="gold-gradient-text">MENU</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#CFC1AD] font-serif leading-relaxed">
            Prepared fresh in small batches throughout the day. Authentic Kolkata dum biryani with braised aloo, farm egg, and tender slow-cooked cuts.
          </p>
        </div>

        {/* Search & Category Filter Navigation */}
        <div className="flex flex-col gap-6 mb-12">
          {/* Search bar */}
          <div className="relative max-w-md mx-auto w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D49A3D]" />
            <input
              type="text"
              placeholder="Search chicken, mutton, aloo, chaap, phirni..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#14100C] border border-[#D49A3D]/30 text-[#FFE5A3] placeholder-[#CFC1AD]/40 text-xs sm:text-sm focus:outline-none focus:border-[#D49A3D] transition-colors"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#D49A3D] to-[#E88126] text-[#0A0806] shadow-lg shadow-[#D49A3D]/25 scale-105"
                      : "bg-[#14100C] text-[#CFC1AD] hover:text-[#FFE5A3] border border-white/5 hover:border-[#D49A3D]/30"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredItems.map((dish) => (
              <motion.div
                key={dish.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group relative rounded-3xl overflow-hidden glass-panel border border-[#D49A3D]/20 hover:border-[#D49A3D]/60 transition-all duration-500 flex flex-col justify-between shadow-xl shadow-black/70 hover:shadow-2xl hover:shadow-[#D49A3D]/10"
              >
                {/* Image & Badges */}
                <div className="relative w-full h-56 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120E0A] via-transparent to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#D49A3D]/40 text-[#FFE5A3] text-[10px] font-bold font-royal uppercase tracking-wider">
                      {dish.badge}
                    </span>

                    {dish.hasPotato && (
                      <span className="px-2.5 py-1 rounded-full bg-[#D49A3D]/90 text-[#0A0806] text-[10px] font-bold uppercase tracking-wider shadow">
                        Aloo Included
                      </span>
                    )}
                  </div>

                  {/* Servings Tag */}
                  <div className="absolute bottom-2 left-3 text-[11px] text-[#E6DCCE] font-mono">
                    {dish.servings}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-royal text-lg sm:text-xl font-bold text-[#FFE5A3] group-hover:text-white transition-colors">
                        {dish.name}
                      </h3>
                    </div>

                    <p className="mt-2.5 text-xs sm:text-sm text-[#CFC1AD] font-serif leading-relaxed line-clamp-3">
                      {dish.description}
                    </p>

                    {/* Features chips */}
                    <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-white/5">
                      {dish.hasEgg && (
                        <span className="text-[10px] font-medium text-[#FFE5A3] bg-[#221911] px-2 py-0.5 rounded-md border border-[#D49A3D]/20">
                          🥚 Boiled Egg
                        </span>
                      )}
                      <span className="text-[10px] font-medium text-[#CFC1AD] bg-[#1A140E] px-2 py-0.5 rounded-md">
                        🔥 {dish.spiceLevel}
                      </span>
                      {dish.pieces && (
                        <span className="text-[10px] font-mono text-[#E88126] bg-[#1A140E] px-2 py-0.5 rounded-md">
                          {dish.pieces}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price & Add Action */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-[#CFC1AD]/60 font-mono block">
                        Price (INR)
                      </span>
                      <div className="text-xl sm:text-2xl font-royal font-bold text-[#FFE5A3]">
                        ₹{dish.price}
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenCustomize(dish)}
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D49A3D] to-[#E88126] text-[#0A0806] font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#D49A3D]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Quick Customization Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-3xl bg-[#14100C] border border-[#D49A3D]/40 p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div>
                <h4 className="font-royal text-lg font-bold text-[#FFE5A3]">
                  Customize Your Dum
                </h4>
                <p className="text-xs text-[#CFC1AD]">{selectedProduct.name}</p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-white/60 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {/* Customization Options */}
            <div className="space-y-3 mb-6">
              <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#1C1611] border border-white/5 cursor-pointer hover:border-[#D49A3D]/30 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={extraAloo}
                    onChange={(e) => setExtraAloo(e.target.checked)}
                    className="w-4 h-4 accent-[#D49A3D]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#FFE5A3]">
                      Extra Kolkata Golden Aloo
                    </div>
                    <div className="text-[10px] text-[#CFC1AD]">
                      Braised slowly in rich mutton marrow broth
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#D49A3D] font-bold">
                  +₹35
                </span>
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#1C1611] border border-white/5 cursor-pointer hover:border-[#D49A3D]/30 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={extraEgg}
                    onChange={(e) => setExtraEgg(e.target.checked)}
                    className="w-4 h-4 accent-[#D49A3D]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#FFE5A3]">
                      Extra Farm Boiled Egg
                    </div>
                    <div className="text-[10px] text-[#CFC1AD]">
                      Seasoned farm-fresh egg with roasted spices
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#D49A3D] font-bold">
                  +₹25
                </span>
              </label>
            </div>

            {/* Total Calculation & Confirm */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#CFC1AD]">
                  Total Portion Price
                </span>
                <div className="text-xl font-royal font-bold text-[#FFE5A3]">
                  ₹
                  {selectedProduct.price +
                    (extraAloo ? 35 : 0) +
                    (extraEgg ? 25 : 0)}
                </div>
              </div>

              <button
                onClick={handleConfirmAdd}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D49A3D] to-[#E88126] text-[#0A0806] font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#D49A3D]/25"
              >
                Add to Royal Bag
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
