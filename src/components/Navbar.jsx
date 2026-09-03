import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu as MenuIcon, X, MapPin, Sparkles, MessageCircle, Phone } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount, setIsCartOpen } = useCart();
  const phoneNumber = "09163104857";
  const whatsappUrl = "https://wa.me/919163104857?text=Hi%20Sahi%20Biriyani%2C%20I%20would%20like%20to%20place%20an%20order.";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "#hero" },
    { name: "MENU", href: "#menu" },
    { name: "OUR STORY", href: "#story" },
    { name: "THE SAHI WAY", href: "#ritual" },
    { name: "CONTACT", href: "#location" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#0A0806]/90 backdrop-blur-xl border-b border-[#D49A3D]/20 shadow-2xl shadow-black/50"
            : "py-5 sm:py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="group flex items-center gap-3 cursor-pointer"
          >
            {/* Original Sahi Biriyani Royal Crest */}
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#201812] to-[#0D0A08] border border-[#D49A3D]/40 flex items-center justify-center shadow-lg group-hover:border-[#D49A3D] transition-colors">
              <span className="text-[#D49A3D] text-lg font-bold font-royal leading-none">
                S
              </span>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E88126] blur-[2px] animate-pulse" />
            </div>

            <div className="flex flex-col">
              <span className="font-royal text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#F5EFE6] group-hover:text-[#FFE5A3] transition-colors leading-none">
                SAHI BIRIYANI
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#D49A3D] mt-1 font-medium flex items-center gap-1">
                <span>Kolkata</span>
                <span className="inline-block w-1 h-1 rounded-full bg-[#D49A3D]"></span>
                <span>Boral</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-semibold tracking-[0.2em] text-[#CFC1AD] hover:text-[#FFE5A3] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#D49A3D] to-[#E88126] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Direct WhatsApp Callout */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18130E] border border-[#2ECC71]/40 text-[#2ECC71] hover:bg-[#201812] hover:border-[#2ECC71] transition-all text-[11px] font-mono font-semibold"
              title="Order on WhatsApp: 09163104857"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>09163104857</span>
            </a>

            {/* Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#18130E]/80 border border-[#D49A3D]/30 text-[#FFE5A3] hover:border-[#D49A3D] hover:bg-[#251B12] transition-all cursor-pointer"
              title="View Royal Bag"
              aria-label="View Order Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#D49A3D]" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#E88126] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* ORDER NOW CTA Button */}
            <a
              href="#menu"
              onClick={(e) => handleNavClick(e, "#menu")}
              className="relative hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold tracking-[0.18em] uppercase overflow-hidden group cursor-pointer transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#B37A22] via-[#D49A3D] to-[#E88126] group-hover:opacity-90 transition-opacity"></span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              <span className="relative text-[#0A0806] font-semibold flex items-center gap-2">
                <span>ORDER NOW</span>
              </span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#F5EFE6] hover:text-[#D49A3D] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0D0A08]/98 border-b border-[#D49A3D]/30 backdrop-blur-2xl px-6 py-6 shadow-2xl transition-all">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-semibold tracking-[0.18em] text-[#E6DCCE] hover:text-[#FFE5A3] py-2 border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1F1710] border border-[#2ECC71]/40 text-[#2ECC71] font-bold text-xs tracking-wider uppercase"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: 09163104857</span>
                </a>

                <a
                  href="#menu"
                  onClick={(e) => handleNavClick(e, "#menu")}
                  className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#D49A3D] to-[#E88126] text-[#0A0806] font-bold text-xs tracking-[0.2em] uppercase shadow-lg shadow-[#D49A3D]/20"
                >
                  ORDER NOW
                </a>
              </div>

              <div className="mt-2 text-[11px] text-[#CFC1AD]/60 flex items-center gap-1 justify-center">
                <MapPin className="w-3 h-3 text-[#D49A3D]" />
                <span>Rakhiter More, Boral, Kolkata – 700154</span>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
