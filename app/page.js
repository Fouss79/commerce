"use client"

import { useEffect, useRef, useState } from "react";

import ListProduits from "./Admin/produit/component/ListProduits";
import Link from 'next/link';
import './App.css';
import './Produits.css';
import Scrollpane from "./Component/Scrollpane";
import MegaMenu from "./Component/MegaMenu";

import AvisUtilisateurs from "./Component/AvisUtilisateurs";
import AbonnementSection from "./Component/Abonnementsection"
import { useCart } from "./context/CartContext";
import ListCategorie from "./Admin/categorie/component/ListCategorie";
import Carousel from "./Component/Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CollectionList from "./Admin/collections/Component/CollectionList";
import CategorieMenu from "./Component/CategorieMenu";
import { motion } from "framer-motion";







  export default function Home() {
        
  const {Ajoute, addToCart, cartItems, isModalOpen, removeFromCart, openModal, closeModal } = useCart();


  
const sliderRef = useRef(null);
const [currentIndex, setCurrentIndex] = useState(0);

const images = ["/chaussure.webp", "/imagess.jpg", "/trigo.jpeg"];

const stats = [
  { label: "Pays", value: 20 },
  { label: "Fonctionnalités", value: 250 },
  { label: "Établissements", value: 300 },
];



function Counter({ end }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 30);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count}+</span>;
}

const [open, setOpen] = useState(false);
const features = [
    { icon: "✅", title: "Produits vérifiés", desc: "Chaque vendeur est contrôlé pour garantir la qualité.", delay: 0 },
    { icon: "🚀", title: "Livraison rapide", desc: "Recevez vos commandes directement chez vous.", delay: 0.1 },
    { icon: "💳", title: "Paiement sécurisé", desc: "Orange Money, Wave ou carte bancaire.", delay: 0.2 },
    //{ icon: "📦", title: "Vendez facilement", desc: "Ouvrez votre boutique en quelques minutes.", delay: 0.3 },
  ];
function FeatureCard({ icon, title, desc, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      style={{
        background: "#fff", border: "1px solid #e8f0ea",
        borderRadius: 20, padding: "28px 24px",
        display: "flex", flexDirection: "column", gap: 12,
        boxShadow: "0 2px 20px rgba(6,60,40,0.05)",
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: "linear-gradient(135deg,#063c28,#0f6b47)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, color: "#fff",
      }}>{icon}</div>
      <p style={{ margin: 0, fontWeight: 700, fontSize: 16, color: "#0d2b1e" }}>{title}</p>
      <p style={{ margin: 0, fontSize: 14, color: "#5a7a69", lineHeight: 1.6 }}>{desc}</p>
    </motion.div>
  );
}



function Pill({ children }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "6px 14px", borderRadius: 999,
      background: "rgba(6,60,40,0.08)", border: "1px solid rgba(6,60,40,0.15)",
      fontSize: 12, fontWeight: 600, letterSpacing: "0.06em",
      color: "#063c28", textTransform: "uppercase",
    }}>
      {children}
    </span>
  );
}

// 🔁 Auto slide
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, 4000);

  return () => clearInterval(interval);
}, []);
const categorieList = [
        {
            nom: 'Vetements',
            Link: '/',
        },
        {
            nom: 'Chaussure',
            Link: '/Chaussure',
        },
        {
            nom: 'Telephone',
            Link: '/Telephone',
        },
    ];

// 🔁 Mise à jour du slider
useEffect(() => {
  if (sliderRef.current) {
    const slideWidth = sliderRef.current.children[0].offsetWidth;
    sliderRef.current.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
}, [currentIndex]);

// 👉 Boutons
const nextSlide = () => {
  setCurrentIndex((prev) => (prev + 1) % images.length);
};

const prevSlide = () => {
  setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
};


  const updateSlider = () => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.children[0].offsetWidth;
      sliderRef.current.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      console.log(slideWidth);
    }
  };
  
     
    useEffect(() => {
      const handleClickOutside = (event) => {
            if (sliderRef.current && !sliderRef.current.contains(event.target)) {
              
              const totalSlides = sliderRef.current.children.length;
              setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
              
              updateSlider();
              
            }
          };
      
          document.addEventListener('mousedown', handleClickOutside);
      
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
        }, []);
      
  return (
    <main className="w-full overflow-x-hidden bg-[#f7f3ee]"> 
      
  
<section
  style={{
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(135deg,#063c28 0%,#0a5c3a 60%,#0e7a50 100%)",
    minHeight: "75vh", // au lieu de 100vh
    display: "flex",
    alignItems: "center",
  }}
>
        {/* Cercles décoratifs */}
        <div style={{
          position: "absolute", width: 600, height: 600,
          borderRadius: "50%", background: "rgba(255,255,255,0.04)",
          top: -200, right: -200, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", width: 400, height: 400,
          borderRadius: "50%", background: "rgba(245,197,24,0.08)",
          bottom: -100, left: -100, pointerEvents: "none",
        }} />
        {/* Grain texture overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
          pointerEvents: "none", opacity: 0.5,
        }} />

        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "120px 40px 80px",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60,
          alignItems: "center", width: "100%",
        }}>
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Pill>Marketplace 100 % Malien</Pill>

            <p style={{
              margin: "24px 0 20px",
              fontSize: "clamp(2.8rem,5vw,4.2rem)",
              fontWeight: 800, lineHeight: 1.1,
              color: "#fff",
              fontFamily: "'Playfair Display',serif",
            }}>
              La satisfaction<br />
              <span style={{ color: "#f5c518" }}>de nos clients</span><br />
              est notre priorité
            </p>

            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, lineHeight: 1.7, maxWidth: 440, margin: "0 0 40px" }}>
              MaliSugu connecte vendeurs et acheteurs sur une plateforme sécurisée,
              rapide et 100 % dédiée au commerce local malien.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="/produits" style={{ textDecoration: "none" }}>
                <button style={{
                  padding: "16px 36px", borderRadius: 14,
                  background: "#f5c518", border: "none",
                  color: "#063c28", fontWeight: 800, fontSize: 15,
                  cursor: "pointer", letterSpacing: "0.02em",
                  transition: "transform 0.2s,box-shadow 0.2s",
                  boxShadow: "0 8px 32px rgba(245,197,24,0.35)",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(245,197,24,0.5)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(245,197,24,0.35)"; }}
                >
                  Voir les produits
                </button>
              </a>
              <a href="/dashboard" style={{ textDecoration: "none" }}>
                <button style={{
                  padding: "16px 36px", borderRadius: 14,
                  background: "transparent",
                  border: "2px solid rgba(255,255,255,0.3)",
                  color: "#fff", fontWeight: 600, fontSize: 15,
                  cursor: "pointer",
                  transition: "background 0.2s,border-color 0.2s",
                  backdropFilter: "blur(8px)",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
                >
                  Vendre maintenant
                </button>
              </a>
            </div>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: 24, marginTop: 48, flexWrap: "wrap" }}>
              {[["🛡️", "Paiement sécurisé"], ["⚡", "Livraison rapide"], ["⭐", "Vendeurs vérifiés"]].map(([ic, lb]) => (
                <div key={lb} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.65)", fontSize: 13 }}>
                  <span>{ic}</span><span>{lb}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            style={{ position: "relative", display: "flex", justifyContent: "center" }}
          >
            {/* Halo */}
            <div style={{
              position: "absolute", width: 420, height: 420,
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(245,197,24,0.2) 0%,transparent 70%)",
              top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            }} />
            <img
              src="/fem3.png" alt="MaliSugu"
              style={{
                position: "relative", zIndex: 1,
                width: "85%", maxHeight: 520,
                objectFit: "contain",
                filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.4))",
              }}
            />
            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              style={{
                position: "absolute", bottom: 30, left: 20,
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 16, padding: "14px 20px",
                color: "#fff", zIndex: 2,
              }}
            >
              <p style={{ margin: 0, fontSize: 11, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.06em" }}>Livraisons aujourd'hui</p>
              <p style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 800, color: "#f5c518" }}>+1 240</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
            <path d="M0,40 C480,80 960,0 1440,40 L1440,70 L0,70 Z" fill="#f7f3ee" />
          </svg>
        </div>
      </section>

    {/* ================= INTRO TEXT BLOCK ================= */}

 <section style={{ background: "#f7f3ee", padding: "80px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 60px" }}
          >
            <Pill>Notre mission</Pill>
            <h2 style={{
              margin: "20px 0 16px",
              fontSize: "clamp(1.8rem,3vw,2.8rem)",
              fontWeight: 800, color: "#063c28",
              fontFamily: "'Playfair Display',serif",
            }}>
              Une marketplace moderne au service du commerce local
            </h2>
            <p style={{ color: "#6b7280", fontSize: 17, lineHeight: 1.8 }}>
              MaliSugu connecte vendeurs et acheteurs sur une plateforme sécurisée et accessible.
              Découvrez des produits de qualité, profitez d'un paiement sécurisé et d'une livraison fiable.
            </p>
          </motion.div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))",
            gap: 20,
          }}>
            {features.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

 <section className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#f7f3ee] overflow-hidden">

      {/* LEFT TEXT */}
      <div className="flex flex-col justify-center px-6 md:px-20 py-16">
        
        <span className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">
          Collection 2026 — Luxe Moderne
        </span>

        <p className="text-4xl md:text-6xl font-light leading-tight font-serif text-[#0d6b49]">
          L’élégance <br />
          <span className="italic text-[#c9a96e]">intemporelle</span> <br />
          redéfinie
        </p>

        <p className="mt-6 text-[#8a7d72] max-w-md leading-relaxed">
          Découvrez une nouvelle vision de la mode moderne, où chaque pièce est pensée
          pour sublimer votre style avec simplicité, luxe et authenticité.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-10 flex-wrap">
          <button className="px-6 py-3 bg-[#1a1410] text-white text-sm tracking-widest uppercase hover:bg-[#c9a96e] transition">
            Découvrir
          </button>

          <button className="px-6 py-3 border border-[#1a1410] text-[#1a1410] text-sm tracking-widest uppercase hover:bg-[#1a1410] hover:text-white transition">
            Notre histoire
          </button>
        </div>

        {/* small note */}
        <p className="mt-8 text-xs text-[#8a7d72]">
          +1000 clients satisfaits • Livraison rapide • Qualité premium
        </p>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative h-[400px] md:h-auto">
        
        <div className="absolute inset-0 bg-gradient-to-br from-[#c8b8a2] via-[#a89070] to-[#8a6f52]" />

        {/* decorative blur */}
        <div className="absolute w-80 h-80 bg-white/10 rounded-full blur-3xl top-10 right-10"></div>
        <div className="absolute w-80 h-80 bg-[#c9a96e]/20 rounded-full blur-3xl bottom-10 left-10"></div>

        {/* image */}
        <img
          src="/fem2.png"
          alt="Fashion"
          className="relative z-10 w-full h-full object-contain p-10 hover:scale-105 transition duration-700"
        />

        {/* price tag */}
        <div className="absolute bottom-10 left-10 bg-white/80 backdrop-blur px-6 py-3 border border-[#e8dfd4]">
          <p className="text-xs uppercase tracking-widest text-gray-500">
            Pièce signature
          </p>
          <p className="text-xl font-serif text-[#c9a96e]">€ 1 290</p>
        </div>
      </div>
      
    </section>

 

     {/* STATS */}
<section className="py-16 md:py-24 px-4 md:px-6 bg-[#f7f3ee]">
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 text-center gap-8">

    {stats.map((stat, i) => (
      <div key={i} className="relative flex flex-col items-center">

        <motion.h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-yellow-600">
          <Counter end={stat.value} />
        </motion.h2>

        <p className="text-gray-500 mt-2">{stat.label}</p>

        {/* Séparateur vertical (desktop uniquement) */}
        {i !== stats.length - 1 && (
          <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-[1px] bg-gray-300"></div>
        )}
      </div>
    ))}

  </div>
</section>
     
      
  


  

   <AbonnementSection/>
<AvisUtilisateurs/>

  
 
     
      <div className="bg-white]">
      
    
      
      <Scrollpane
  cartItems={cartItems}
  isModalOpen={isModalOpen}
  openModal={openModal}
  closeModal={closeModal}
  removeItemFromCart={removeFromCart}
  Ajoute={Ajoute}
/>
</div>
    
      
     
     
    
    
    
  
   
       </main>
  );
}
