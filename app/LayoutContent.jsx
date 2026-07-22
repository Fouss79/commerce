"use client";

import CategorieMenu from "./Component/CategorieMenu";
import Carousel from "./Component/Carousel";
import ScreenRecorder from "./Component/ScreenRecorder";
import Header from "./Admin/Component/Header";
import Footer from "./Admin/Component/Footer";
import { usePathname } from "next/navigation";

import { useCart } from "./context/CartContext";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ================= CONTENU INTERNE =================
export default function LayoutContent({ children }) {
  const { cartItems } = useCart();
  const pathname = usePathname();

  const hideLayout =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password";

  const hideFooter =
    pathname.startsWith("/Vendeur") ||
    pathname.startsWith("/Client");

  return (
    <>
      {/* Header avec panier */}
      {!hideLayout && <Header cartItems={cartItems} />}

      {/* Contenu principal */}
      {children}

      {/* Menu mobile */}
      <div className="fixed md:hidden ease-in-out transition-all duration-400 z-30">
        <Carousel />
        <CategorieMenu />
        <ScreenRecorder />
      </div>

      {!hideLayout && !hideFooter && (
      <Footer/>
        
      )}
    </>
  );
}