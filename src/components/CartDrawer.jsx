import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, MapPin, Bike, Store } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    gst,
    total,
    orderType,
    setOrderType,
    setIsOrderModalOpen,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-[#0D0A08] border-l border-[#D49A3D]/30 shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1F1710] border border-[#D49A3D]/40 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#D49A3D]" />
              </div>
              <div>
                <h3 className="font-royal text-lg font-bold text-[#FFE5A3]">
                  Your Royal Order Bag
                </h3>
                <span className="text-[11px] text-[#CFC1AD]/70">
                  {items.length} unique {items.length === 1 ? "dish" : "dishes"}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery / Takeaway Switch */}
          <div className="px-6 pt-4 pb-2">
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[#16110D] border border-white/5">
              <button
                onClick={() => setOrderType("delivery")}
                className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  orderType === "delivery"
                    ? "bg-[#D49A3D] text-[#0A0806] shadow"
                    : "text-[#CFC1AD] hover:text-[#FFE5A3]"
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Home Delivery</span>
              </button>

              <button
                onClick={() => setOrderType("takeaway")}
                className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  orderType === "takeaway"
                    ? "bg-[#D49A3D] text-[#0A0806] shadow"
                    : "text-[#CFC1AD] hover:text-[#FFE5A3]"
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Boral Pickup</span>
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#CFC1AD]/60">
                <ShoppingBag className="w-12 h-12 text-[#D49A3D]/40 mb-3" />
                <p className="font-royal text-base text-[#FFE5A3]">
                  Your royal bag is empty
                </p>
                <p className="text-xs mt-1 text-[#CFC1AD]/70">
                  Select your favorite biryani from our menu.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartId}
                  className="p-4 rounded-2xl bg-[#14100C] border border-white/5 hover:border-[#D49A3D]/20 transition-colors flex gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs sm:text-sm font-bold font-royal text-[#FFE5A3] line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-white/40 hover:text-[#E88126] transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Addon details */}
                      <div className="text-[10px] text-[#CFC1AD] space-y-0.5 mt-0.5">
                        {item.extraAloo && (
                          <div className="text-[#F3BF59]">
                            + Extra Braised Aloo (₹35)
                          </div>
                        )}
                        {item.extraEgg && (
                          <div className="text-[#F3BF59]">
                            + Extra Farm Egg (₹25)
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <span className="text-xs font-mono font-bold text-[#FFE5A3]">
                        ₹{item.unitPrice * item.quantity}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-[#1F1710] rounded-lg p-1 border border-white/5">
                        <button
                          onClick={() => updateQuantity(item.cartId, -1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-white/60 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold px-1 text-[#FFE5A3]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId, 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-white/60 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Kitchen Location & WhatsApp Note */}
          <div className="px-6 py-2 bg-[#120E0A] border-t border-white/5 flex items-center justify-between text-[11px] text-[#CFC1AD]/70">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#D49A3D] shrink-0" />
              <span className="truncate">Rakhiter More, Boral, Kolkata – 700154</span>
            </div>
            <span className="font-mono text-[#2ECC71] shrink-0 ml-2">WA: 09163104857</span>
          </div>

          {/* Bill Summary & Proceed Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-[#110D09] border-t border-[#D49A3D]/20 space-y-3">
              <div className="space-y-1.5 text-xs text-[#CFC1AD]">
                <div className="flex justify-between">
                  <span>Item Subtotal</span>
                  <span className="font-mono text-[#FFE5A3]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-mono text-[#FFE5A3]">
                    {deliveryFee === 0 ? (
                      <span className="text-[#2ECC71]">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="font-mono text-[#FFE5A3]">₹{gst}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-sm sm:text-base font-bold text-[#FFE5A3] font-royal">
                  <span>Grand Total</span>
                  <span className="font-mono text-[#D49A3D] text-lg">
                    ₹{total}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsOrderModalOpen(true);
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D49A3D] via-[#E88126] to-[#C4620E] text-[#0A0806] font-bold text-xs tracking-[0.2em] uppercase shadow-xl shadow-[#D49A3D]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>PROCEED TO ORDER</span>
                <span>(₹{total})</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
