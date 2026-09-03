import React, { useState, useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import ExplodedHero from "./components/ExplodedHero";
import LayerExplorer from "./components/LayerExplorer";
import BrandStory from "./components/BrandStory";
import SignatureDish from "./components/SignatureDish";
import DumRitual from "./components/DumRitual";
import MenuSection from "./components/MenuSection";
import LocationSection from "./components/LocationSection";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import OrderModal from "./components/OrderModal";

const USER_STORAGE_KEY = "sahi_biriyani_user";

function MainSite() {
  return (
    <div className="min-h-screen bg-[#0A0806] text-[#F5EFE6] font-sans selection:bg-[#D49A3D]/30 selection:text-[#FFD885] relative">
      <Navbar />
      <ExplodedHero />
      <LayerExplorer />
      <BrandStory />
      <SignatureDish />
      <DumRitual />
      <MenuSection />
      <LocationSection />
      <Footer />
      <CartDrawer />
      <OrderModal />
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name && parsed.phone) {
          try {
            parsed.lastVisit = new Date().toISOString();
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(parsed));
          } catch (_) {}
          setUser(parsed);
        }
      }
    } catch (e) {
      console.warn("User storage check failed:", e);
    } finally {
      setIsChecking(false);
    }
  }, []);

  const handleEnter = (userRecord) => {
    setUser(userRecord);
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#0A0806] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#D49A3D]/40 border-t-[#D49A3D] animate-spin" />
          <span className="font-royal text-sm tracking-[0.3em] text-[#D49A3D]">SAHI BIRIYANI</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LandingPage onEnter={handleEnter} />;
  }

  return (
    <CartProvider>
      <MainSite />
    </CartProvider>
  );
}
