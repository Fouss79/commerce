"use client"

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Scrollpane from "../Component/Scrollpane";
import AvisUtilisateurs from "../Component/AvisUtilisateurs";
import AbonnementSection from "../Component/Abonnementsection";
import { useCart } from "../context/CartContext";

/* ─── Counter animé ──────────────────────────────────────── */
function Counter({ end, suffix = "+" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Pill badge ─────────────────────────────────────────── */
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

/* ─── Feature card ───────────────────────────────────────── */
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

/* ─── Stat card ──────────────────────────────────────────── */
function StatCard({ value, label, accent = "#f5c518" }) {
  return (
    <div style={{ textAlign: "center", padding: "0 24px" }}>
      <p style={{
        margin: 0, fontSize: "clamp(2.5rem,5vw,4rem)",
        fontWeight: 800, color: accent,
        fontFamily: "'Playfair Display',serif",
        lineHeight: 1,
      }}>
        <Counter end={value} />
      </p>
      <p style={{ margin: "8px 0 0", fontSize: 14, color: "#6b7280", letterSpacing: "0.04em" }}>{label}</p>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────── */
export default function Home() {
  const { Ajoute, cartItems, isModalOpen, removeFromCart, openModal, closeModal } = useCart();

  const features = [
    { icon: "✅", title: "Produits vérifiés", desc: "Chaque vendeur est contrôlé pour garantir la qualité.", delay: 0 },
    { icon: "🚀", title: "Livraison rapide", desc: "Recevez vos commandes directement chez vous.", delay: 0.1 },
    { icon: "💳", title: "Paiement sécurisé", desc: "Orange Money, Wave ou carte bancaire.", delay: 0.2 },
    { icon: "📦", title: "Vendez facilement", desc: "Ouvrez votre boutique en quelques minutes.", delay: 0.3 },
  ];

  /* Divider SVG ondulé */
  const WaveDivider = ({ flip, color = "#f4f8f5" }) => (
    <div style={{ lineHeight: 0, transform: flip ? "scaleY(-1)" : "none" }}>
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill={color} />
      </svg>
    </div>
  );

  return (
    <main style={{ width: "100%", overflowX: "hidden", background: "#fff", fontFamily: "'Inter',sans-serif" }}>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative flex flex-col md:flex-row items-center mt-20 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white via-green-50 to-yellow-50 shadow-2xl border border-green-100">
        
        {/* Décoration de fond */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-yellow-200/30 rounded-full blur-3xl"></div>
      
        {/* TEXTE */}
        <div className="relative z-10 w-full md:w-1/2 h-auto md:h-[500px] p-8 md:p-16 flex flex-col justify-center">
          
          {/* Badge */}
          <span className="inline-block w-fit px-4 py-2 mb-6 text-sm font-semibold text-green-800 bg-green-100 rounded-full shadow-sm">
            Marketplace 100% Malien
          </span>
      
          {/* Titre */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-[#063c28]">
            La satisfaction <span className="text-yellow-500">de nos clients </span>
            <span className="">est notre{" "}priorité</span>
          </h2>
      
          
      
          {/* Boutons */}
          <div className="flex gap-4 flex-wrap mt-20">
            <a href="/produits">
              <button className="px-8 py-4 rounded-2xl bg-[#063c28] hover:bg-[#0a5a3d] text-white font-semibold shadow-xl hover:scale-105 transition-all duration-300">
                Voir les produits
              </button>
            </a>
      
            <a href="/dashboard">
              <button className="px-8 py-4 rounded-2xl border-2 border-yellow-400 text-[#063c28] font-semibold bg-white hover:bg-yellow-50 shadow-md hover:scale-105 transition-all duration-300">
                Vendre maintenant
              </button>
            </a>
          </div>
        </div>
      
        {/* IMAGE */}
        <div className="relative z-10 w-full md:w-1/2 h-[320px] md:h-[500px] flex items-center justify-center p-6 md:p-10">
          
          {/* Halo décoratif */}
          <div className="absolute w-80 h-80 bg-gradient-to-br from-green-200/40 to-yellow-200/40 rounded-full blur-3xl"></div>
      
          {/* Image principale */}
          <img
            src="/fem2.png"
            alt="MaliSugu"
            className="relative z-10 w-[75%] md:w-[80%] max-h-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform duration-700"
          />
      
          {/* Overlay subtil */}
          <div className="absolute inset-0 bg-gradient-to-l from-green-500/10 to-transparent"></div>
        </div>
      </section>
      <section style={{
        position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg,#063c28 0%,#0a5c3a 60%,#0e7a50 100%)",
        minHeight: "100vh", display: "flex", alignItems: "center",
      }}>
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

            <h1 style={{
              margin: "24px 0 20px",
              fontSize: "clamp(2.8rem,5vw,4.2rem)",
              fontWeight: 800, lineHeight: 1.1,
              color: "#fff",
              fontFamily: "'Playfair Display',serif",
            }}>
              La satisfaction<br />
              <span style={{ color: "#f5c518" }}>de nos clients</span><br />
              est notre priorité
            </h1>

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
            <path d="M0,40 C480,80 960,0 1440,40 L1440,70 L0,70 Z" fill="#fff" />
          </svg>
        </div>
      </section>
      <section className="flex flex-col md:flex-row items-center bg-pink-50">
      
        {/* TEXTE */}
        <div className="w-full md:w-1/2 h-auto md:h-[600px] p-8 md:p-16 flex flex-col justify-center">
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-gray-800">
            Découvrez une nouvelle façon d’acheter et vendre
          </h2>
      
          <p className="text-gray-600 text-lg mb-6">
            Avec <span className="font-semibold text-pink-600">Maboutique</span>, accédez à des milliers de produits,
            comparez les prix et profitez d’une expérience simple, rapide et sécurisée.
          </p>
      
          <ul className="space-y-3 mb-8 text-gray-600">
            <li>✅ Produits de qualité vérifiés</li>
            <li>🚀 Livraison rapide</li>
            <li>💳 Paiement sécurisé</li>
            <li>📦 Vendez vos produits facilement</li>
          </ul>
      
          <div className="flex gap-4 flex-wrap">
            <a href="/home/produit">
              <button className="
                px-6 py-3 rounded-xl
                bg-pink-600 hover:bg-pink-700
                text-white font-semibold
                transition-all duration-300
                hover:scale-105 shadow-lg
              ">
                Voir les produits
              </button>
            </a>
      
            <a href="/dashboard">
              <button className="
                px-6 py-3 rounded-xl
                border border-pink-300
                text-pink-600
                hover:bg-pink-100
                transition-all duration-300
              ">
                Vendre maintenant
              </button>
            </a>
          </div>
      
        </div>
      
        {/* IMAGE */}
        <div
          className="w-full md:w-1/2 h-[300px] md:h-[600px] bg-cover bg-center relative"
          style={{ backgroundImage: "url('/cosme1.png')" }}
        >
          {/* Overlay stylé rose */}
          <div className="absolute inset-0 bg-gradient-to-l from-pink-500/40 to-transparent"></div>
        </div>
      
      </section>
      

      {/* ══════════════════════════════════════
          INTRO + FEATURES
      ══════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "80px 40px" }}>
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
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 20,
          }}>
            {features.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BANNER NIKE / COLLECTION
      ══════════════════════════════════════ */}
      <section style={{ background: "#f4f8f5", padding: "0 40px 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              position: "relative", borderRadius: 28, overflow: "hidden",
              minHeight: 420, background: "#0d1117",
              display: "flex", alignItems: "center",
            }}
          >
            {/* BG image */}
            <img
              src="/nike.jpg" alt="Collection Nike"
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", opacity: 0.4,
              }}
            />
            {/* Overlay gradient */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(90deg,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.2) 100%)",
            }} />
            {/* Content */}
            <div style={{ position: "relative", zIndex: 1, padding: "60px 60px", maxWidth: 580 }}>
              <span style={{
                display: "inline-block", padding: "5px 14px",
                background: "#f5c518", borderRadius: 999,
                fontSize: 11, fontWeight: 800, letterSpacing: "0.1em",
                color: "#0d1117", textTransform: "uppercase", marginBottom: 20,
              }}>Nouvelle collection</span>
              <h2 style={{
                margin: "0 0 16px",
                fontSize: "clamp(2rem,4vw,3.2rem)",
                fontWeight: 900, color: "#fff", lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}>COLLECTION<br />NIKE 2026</h2>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
                Style, confort et performance. Des survêtements conçus pour vous démarquer.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <button style={{
                  padding: "14px 28px", borderRadius: 12,
                  background: "#fff", border: "none",
                  color: "#0d1117", fontWeight: 700, fontSize: 14,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  Acheter maintenant
                </button>
                <button style={{
                  padding: "14px 28px", borderRadius: 12,
                  background: "transparent",
                  border: "1.5px solid rgba(255,255,255,0.4)",
                  color: "#fff", fontWeight: 600, fontSize: 14,
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  Voir plus
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS
      ══════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "80px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              display: "grid", gridTemplateColumns: "repeat(3,1fr)",
              gap: 0, textAlign: "center",
              borderRadius: 24, overflow: "hidden",
              border: "1px solid #e8f0ea",
            }}
          >
            {[
              { value: 20, label: "Pays couverts", accent: "#f5c518" },
              { value: 250, label: "Fonctionnalités", accent: "#063c28" },
              { value: 300, label: "Établissements", accent: "#f5c518" },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "48px 20px",
                  background: i === 1 ? "#063c28" : "#fff",
                  borderLeft: i > 0 ? "1px solid #e8f0ea" : "none",
                }}
              >
                <p style={{
                  margin: 0,
                  fontSize: "clamp(2.5rem,5vw,4rem)",
                  fontWeight: 800,
                  color: i === 1 ? "#f5c518" : "#063c28",
                  fontFamily: "'Playfair Display',serif",
                  lineHeight: 1,
                }}>
                  <Counter end={s.value} />
                </p>
                <p style={{
                  margin: "12px 0 0", fontSize: 14,
                  color: i === 1 ? "rgba(255,255,255,0.6)" : "#6b7280",
                  letterSpacing: "0.04em",
                }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SURVÊTEMENTS SPLIT
      ══════════════════════════════════════ */}
      <section style={{ background: "#f4f8f5", padding: "80px 40px" }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 40, alignItems: "center",
        }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Pill>Nouveautés</Pill>
            <h2 style={{
              margin: "20px 0 16px",
              fontSize: "clamp(1.8rem,3vw,2.8rem)",
              fontWeight: 800, color: "#063c28",
              fontFamily: "'Playfair Display',serif",
              lineHeight: 1.2,
            }}>
              Nouveaux<br />survêtements
            </h2>
            <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
              Découvrez notre collection hiver avec des designs modernes,
              confortables et élégants pour toutes les occasions.
            </p>
            <button style={{
              padding: "16px 36px", borderRadius: 14,
              background: "#063c28", border: "none",
              color: "#fff", fontWeight: 700, fontSize: 15,
              cursor: "pointer",
              transition: "background 0.2s,transform 0.2s",
              boxShadow: "0 8px 24px rgba(6,60,40,0.25)",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#0a5c3a"; e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#063c28"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              Découvrir la collection
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: 12, borderRadius: 24, overflow: "hidden",
            }}
          >
            <img src="/survetement.png" alt="Survêtement 1"
              style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 16 }} />
            <img src="/survet.png" alt="Survêtement 2"
              style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 16, marginTop: 24 }} />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MABOUTIQUE CTA
      ══════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "80px 40px" }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 60, alignItems: "center",
        }}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ position: "relative", borderRadius: 28, overflow: "hidden", height: 480 }}
          >
            <div
              style={{
                width: "100%", height: "100%",
                backgroundImage: "url('/cosme1.png')",
                backgroundSize: "cover", backgroundPosition: "center",
              }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg,rgba(252,231,243,0.6) 0%,transparent 60%)",
            }} />
          </motion.div>

          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Pill>Maboutique</Pill>
            <h2 style={{
              margin: "20px 0 16px",
              fontSize: "clamp(1.8rem,3vw,2.8rem)",
              fontWeight: 800, color: "#1a1a2e",
              fontFamily: "'Playfair Display',serif",
              lineHeight: 1.2,
            }}>
              Découvrez une nouvelle façon d'acheter et vendre
            </h2>
            <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
              Avec <strong style={{ color: "#db2777" }}>Maboutique</strong>, accédez à des milliers de produits,
              comparez les prix et profitez d'une expérience simple, rapide et sécurisée.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
              {[
                ["✅", "Produits de qualité vérifiés"],
                ["🚀", "Livraison rapide partout au Mali"],
                ["💳", "Paiement 100 % sécurisé"],
                ["📦", "Vendez vos produits facilement"],
              ].map(([ic, text]) => (
                <div key={text} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 16px", borderRadius: 12,
                  background: "#fdf2f8", border: "1px solid #fce7f3",
                }}>
                  <span style={{ fontSize: 18 }}>{ic}</span>
                  <span style={{ fontSize: 15, color: "#374151" }}>{text}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 14 }}>
              <a href="/home/produit" style={{ textDecoration: "none" }}>
                <button style={{
                  padding: "16px 32px", borderRadius: 14,
                  background: "#db2777", border: "none",
                  color: "#fff", fontWeight: 700, fontSize: 15,
                  cursor: "pointer", transition: "background 0.2s,transform 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#be185d"; e.currentTarget.style.transform = "scale(1.04)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#db2777"; e.currentTarget.style.transform = "scale(1)"; }}
                >Voir les produits</button>
              </a>
              <a href="/dashboard" style={{ textDecoration: "none" }}>
                <button style={{
                  padding: "16px 32px", borderRadius: 14,
                  background: "transparent", border: "1.5px solid #f9a8d4",
                  color: "#db2777", fontWeight: 600, fontSize: 15,
                  cursor: "pointer", transition: "background 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fdf2f8"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >Vendre maintenant</button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          COMPOSANTS EXISTANTS
      ══════════════════════════════════════ */}
      <AbonnementSection />
      <AvisUtilisateurs />

      <div style={{ background: "#fff" }}>
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
