"use client";

import CategorieMenu from "./Component/CategorieMenu";
import Carousel from "./Component/Carousel";
import ScreenRecorder from "./Component/ScreenRecorder";
import Header from "./Admin/Component/Header";
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
        <footer className="relative mt-16 overflow-hidden bg-gradient-to-br from-[#063c28] via-[#0a5a3d] to-[#0d6b49] text-white">
          {/* ... tout ton contenu de footer inchangé ... */}
        </footer>
      )}
    </>
  );
}