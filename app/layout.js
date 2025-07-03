// app/layout.js

"use client";  // Ce fichier est côté client

import localFont from "next/font/local";
import "./globals.css";
import CategorieMenu from "./Component/CategorieMenu";
import { CartProvider } from "./context/CartContext"; // Import du contexte
import Carousel from "./Component/Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScreenRecorder from "./Component/ScreenRecorder";
// Importation des polices locales
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

// N'oublie pas d'exporter metadata dans un autre fichier
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider> {/* Fournisseur du contexte du panier */}
          {children}
          
          {/* Menu des catégories en bas sur mobile */}
          <div className="fixed md:hidden ease-in-out transition-all duration-400 z-30">
          <Carousel/>
            <CategorieMenu />
            <ScreenRecorder/>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
