import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2, Clock, MapPin, Sparkles, ChefHat, Phone, MessageCircle, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "../context/CartContext";

export default function OrderModal() {
  const {
    isOrderModalOpen,
    setIsOrderModalOpen,
    items,
    total,
    orderType,
    clearCart,
    lastOrderDetails,
    setLastOrderDetails,
  } = useCart();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "Near Rakhiter More, Boral",
    instructions: "",
    paymentMethod: "cod",
  });

  if (!isOrderModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderId = `SAHI-${Math.floor(1000 + Math.random() * 9000)}`;
    const destinationWhatsApp = "919163104857"; // Real Sahi Biriyani WhatsApp number: 09163104857

    const itemList = items
      .map(
        (i) =>
          `• ${i.quantity}x ${i.name}${i.extraAloo ? " (+ Extra Aloo)" : ""}${
            i.extraEgg ? " (+ Extra Egg)" : ""
          } (₹${i.unitPrice * i.quantity})`
      )
      .join("\n");

    const waMessage =
      `*NEW ORDER - SAHI BIRIYANI*\n\n` +
      `*Order ID:* ${orderId}\n` +
      `*Customer Name:* ${formData.name}\n` +
      `*Customer Phone:* ${formData.phone}\n` +
      `*Order Type:* ${
        orderType === "takeaway" ? "Takeaway Pickup" : "Doorstep Delivery"
      }\n` +
      (orderType === "delivery"
        ? `*Delivery Address:* ${formData.address}\n`
        : `*Pickup Counter:* Rakhiter More, Boral, Kolkata – 700154\n`) +
      (formData.instructions
        ? `*Special Instructions:* ${formData.instructions}\n`
        : "") +
      `*Payment:* ${
        formData.paymentMethod === "cod"
          ? "Cash on Delivery"
          : "UPI on Delivery"
      }\n\n` +
      `*Items Ordered:*\n${itemList}\n\n` +
      `*Total Bill:* ₹${total}\n\n` +
      `_Kitchen & Counter: Rakhiter More, Boral, Kolkata – 700154_`;

    const whatsappUrl = `https://wa.me/${destinationWhatsApp}?text=${encodeURIComponent(
      waMessage
    )}`;

    const orderData = {
      orderId,
      customerName: formData.name,
      phone: formData.phone,
      address:
        orderType === "takeaway"
          ? "Takeaway Counter: Rakhiter More, Boral, Kolkata – 700154"
          : formData.address,
      items: [...items],
      total,
      orderType,
      whatsappUrl,
      destinationPhone: "09163104857",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setLastOrderDetails(orderData);
    setIsSubmitted(true);
    clearCart();

    // Fire celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#D49A3D", "#E88126", "#FFE5A3", "#F3BF59"],
    });

    // Automatically trigger WhatsApp in new tab
    try {
      window.open(whatsappUrl, "_blank");
    } catch (err) {
      console.warn("Popup blocked, fallback button available", err);
    }
  };

  const handleClose = () => {
    setIsOrderModalOpen(false);
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="relative w-full max-w-lg rounded-3xl bg-[#110D09] border border-[#D49A3D]/40 p-6 sm:p-8 shadow-2xl shadow-black my-8"
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F1710] border border-[#D49A3D]/30 text-[#FFE5A3] text-[10px] font-semibold tracking-widest uppercase mb-2">
                <Sparkles className="w-3 h-3 text-[#E88126]" />
                <span>Confirm Royal Dispatch</span>
              </div>
              <h3 className="font-royal text-2xl font-bold text-[#FFE5A3]">
                Your Feast Awaits
              </h3>
              <p className="text-xs text-[#CFC1AD] font-serif mt-1">
                Total Amount:{" "}
                <strong className="text-[#FFE5A3] font-mono">₹{total}</strong>{" "}
                •{" "}
                {orderType === "takeaway"
                  ? "Takeaway Pickup"
                  : "Doorstep Delivery"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#CFC1AD] mb-1 font-mono">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sourav Santra"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18130E] border border-white/10 text-[#FFE5A3] placeholder-white/20 focus:outline-none focus:border-[#D49A3D]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#CFC1AD] mb-1 font-mono">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 09163104857"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18130E] border border-white/10 text-[#FFE5A3] placeholder-white/20 focus:outline-none focus:border-[#D49A3D]"
                />
              </div>

              {orderType === "delivery" && (
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#CFC1AD] mb-1 font-mono">
                    Delivery Address (Kolkata) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Flat, Street name, Landmark (near Boral / Rakhiter More / Garia)"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18130E] border border-white/10 text-[#FFE5A3] placeholder-white/20 focus:outline-none focus:border-[#D49A3D]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#CFC1AD] mb-1 font-mono">
                  Special Instructions
                </label>
                <input
                  type="text"
                  placeholder="e.g. Extra fried onion on top, mild spice"
                  value={formData.instructions}
                  onChange={(e) =>
                    setFormData({ ...formData, instructions: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18130E] border border-white/10 text-[#FFE5A3] placeholder-white/20 focus:outline-none focus:border-[#D49A3D]"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#CFC1AD] mb-1 font-mono">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, paymentMethod: "cod" })
                    }
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                      formData.paymentMethod === "cod"
                        ? "bg-[#251B12] border-[#D49A3D] text-[#FFE5A3]"
                        : "bg-[#18130E] border-white/5 text-white/50"
                    }`}
                  >
                    Cash on Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, paymentMethod: "upi" })
                    }
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                      formData.paymentMethod === "upi"
                        ? "bg-[#251B12] border-[#D49A3D] text-[#FFE5A3]"
                        : "bg-[#18130E] border-white/5 text-white/50"
                    }`}
                  >
                    UPI on Delivery
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-full bg-gradient-to-r from-[#D49A3D] via-[#E88126] to-[#C4620E] text-[#0A0806] font-bold text-xs tracking-[0.2em] uppercase shadow-xl shadow-[#D49A3D]/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CONFIRM & SEND VIA WHATSAPP</span>
              </button>
            </form>
          </div>
        ) : (
          /* Order Confirmation View */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#1F1710] border-2 border-[#2ECC71] mx-auto flex items-center justify-center text-[#2ECC71] shadow-xl mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-[10px] font-mono tracking-widest uppercase text-[#D49A3D] block">
              Dum Handi Cooking • Order Placed
            </span>
            <h3 className="font-royal text-2xl font-bold text-[#FFE5A3] mt-1">
              Order Confirmed!
            </h3>
            <p className="text-xs text-[#CFC1AD] font-serif mt-1">
              Order ID:{" "}
              <strong className="text-[#FFE5A3] font-mono">
                {lastOrderDetails?.orderId}
              </strong>
            </p>

            {/* Real Outlet Visual & Kitchen Details */}
            <div className="my-5 rounded-2xl overflow-hidden border border-[#D49A3D]/30 bg-[#18130E] text-left">
              <div className="relative h-28 w-full overflow-hidden">
                <img
                  src="/images/sahi-outlet-real.jpg"
                  alt="Sahi Biriyani real outlet at Rakhiter More, Boral"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18130E] via-transparent to-transparent" />
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-[9px] font-mono text-[#FFE5A3] border border-[#D49A3D]/40">
                  Real Sahi Biriyani Counter
                </div>
              </div>

              <div className="p-4 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#FFE5A3]">
                  <ChefHat className="w-4 h-4 text-[#D49A3D]" />
                  <span className="font-semibold">Kitchen Dispatch:</span>
                  <span className="text-[#CFC1AD]">Estimated 30–40 mins</span>
                </div>
                <div className="flex items-start gap-2 text-[#FFE5A3] pt-1.5 border-t border-white/5">
                  <MapPin className="w-4 h-4 text-[#D49A3D] mt-0.5 shrink-0" />
                  <span className="text-[#CFC1AD] text-[11px]">
                    Counter:{" "}
                    <strong>Rakhiter More, Boral, Kolkata – 700154</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#FFE5A3] pt-1.5 border-t border-white/5">
                  <Phone className="w-4 h-4 text-[#2ECC71]" />
                  <span className="text-[#CFC1AD] text-[11px]">
                    WhatsApp / Helpline:{" "}
                    <strong className="text-[#FFE5A3]">09163104857</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5">
              {lastOrderDetails?.whatsappUrl && (
                <a
                  href={lastOrderDetails.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-[#25D366] text-black font-bold text-xs tracking-widest uppercase hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send / Chat on WhatsApp</span>
                </a>
              )}

              <button
                onClick={handleClose}
                className="w-full py-3 rounded-full bg-[#18130E] border border-[#D49A3D]/40 text-[#FFE5A3] font-bold text-xs tracking-widest uppercase hover:bg-[#251B12] transition-colors cursor-pointer"
              >
                Return to Menu
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
