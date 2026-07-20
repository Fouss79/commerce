"use client";

import localFont from "next/font/local";
import "./globals.css";

import CategorieMenu from "./Component/CategorieMenu";
import Carousel from "./Component/Carousel";
import ScreenRecorder from "./Component/ScreenRecorder";
import Header from "./Admin/Component/Header";
import { usePathname } from "next/navigation";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider, useCart } from "./context/CartContext";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// ================= CONTENU INTERNE =================
function LayoutContent({ children }) {
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
 {!hideLayout && !hideFooter &&<footer className="relative mt-16 overflow-hidden bg-gradient-to-br from-[#063c28] via-[#0a5a3d] to-[#0d6b49] text-white">
  {/* Décorations de fond */}
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"></div>
  <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-green-300/10 rounded-full blur-3xl"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* LOGO + DESCRIPTION */}
      <div>
        <h2 className="text-3xl font-extrabold mb-4 tracking-wide">
          Mali<span className="text-yellow-600">SUGU</span>
        </h2>

        <p className="text-green-100 leading-relaxed text-sm md:text-base">
          La marketplace 100% malienne pour acheter et vendre
          facilement, rapidement et en toute sécurité.
        </p>

        {/* Réseaux sociaux */}
        <div className="flex gap-3 mt-6">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-[#063c28] transition cursor-pointer">
            📘
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-[#063c28] transition cursor-pointer">
            📸
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-[#063c28] transition cursor-pointer">
            💼
          </div>
        </div>
      </div>

      {/* PRODUIT */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-yellow-600">
          Produit
        </h3>
        <ul className="space-y-3 text-green-100 text-sm">
          <li>
            <a href="#features" className="hover:text-yellow-600 transition">
              Fonctionnalités
            </a>
          </li>
          <li>
            <a href="#pricing" className="hover:text-yellow-600 transition">
              Tarifs
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-600 transition">
              Démo
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-600 transition">
              Nouveautés
            </a>
          </li>
        </ul>
      </div>

      {/* SUPPORT */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-yellow-600">
          Support
        </h3>
        <ul className="space-y-3 text-green-100 text-sm">
          <li>
            <a href="#" className="hover:text-yellow-400 transition">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-400 transition">
              FAQ
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-400 transition">
              Assistance
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-400 transition">
              Centre d’aide
            </a>
          </li>
        </ul>
      </div>

      {/* CALL TO ACTION */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-yellow-600">
          Commencer
        </h3>

        <p className="text-sm text-green-100 mb-5 leading-relaxed">
          Rejoignez MaliSugu et développez votre activité dès aujourd’hui.
        </p>

        <button
          className="
            w-full px-6 py-3 rounded-2xl
            bg-gradient-to-r from-yellow-400 to-orange-500
            text-[#063c28] font-bold
            shadow-xl
            hover:scale-105
            transition-all duration-300
          "
        >
          Créer un compte
        </button>
      </div>
    </div>

    {/* BAS DU FOOTER */}
    <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-green-100">
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-yellow-600">
          MaliSugu
        </span>{" "}
        — Tous droits réservés.
      </p>

      <div className="flex gap-6">
        <a href="#" className="hover:text-yellow-600 transition">
          Conditions d’utilisation
        </a>
        <a href="#" className="hover:text-yellow-600 transition">
          Confidentialité
        </a>
      </div>
    </div>
  </div>
</footer>}
    </>
  );
}

// ================= ROOT LAYOUT =================
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            <LayoutContent>{children}</LayoutContent>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}