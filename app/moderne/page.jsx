"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Carousel from "../Component/Carousel";
import {
  ArrowRight,
  Send,
  Flame,
  Clock,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

import api from "../../lib/api";
import ProductItem from "../Admin/produit/component/ProductItems";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [produits, setProduits] = useState([]);
  const [marques, setMarques] = useState([]);
  const [produitsVendus, setProduitsVendus] = useState([]);
  const [produitsRecents, setProduitsRecents] = useState([]);
  const [loading, setLoading] = useState(true);

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;0,700;1,500&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500&display=swap');

     .ml-root{
  --plum:#3B1F3D;
  --plum-deep:#241226;
  --sand:#F1E7D4;
  --sand-light:#F8F2E6;
  --lime:#D4F53E;
  --rust:#C1440E;
  --ink:#1A1114;
  --sage:#063c28;      /* 👈 nouveau : vert marque */
  --sage-light:#0d6b47; /* 👈 nouveau : vert marque plus clair */
  --line: rgba(26,17,20,0.14);
}
    .ml-root *{box-sizing:border-box;}
    .ml-serif{font-family:'Fraunces', serif;}
    .ml-mono{font-family:'JetBrains Mono', monospace;}

    .ml-marquee-wrap{
      background:var(--plum); color:var(--sand);
      overflow:hidden; white-space:nowrap;
      border-bottom:1px solid rgba(241,231,212,0.15);
      position:relative; z-index:40;
    }
    .ml-marquee{ display:inline-flex; animation: ml-scroll 26s linear infinite; }
    .ml-marquee span{
      padding:9px 2.2rem; font-family:'JetBrains Mono', monospace; font-size:0.72rem;
      letter-spacing:0.14em; text-transform:uppercase; display:inline-flex; align-items:center; gap:0.6rem;
    }
    .ml-marquee span::after{content:"◆"; color:var(--lime); font-size:0.6rem; margin-left:0.6rem;}
    @keyframes ml-scroll{ from{transform:translateX(0);} to{transform:translateX(-50%);} }

    .ml-section{max-width:1360px; margin:0 auto; padding:0 2.5rem;}
    .ml-section-head{ display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:2.4rem; flex-wrap:wrap; gap:1rem; }
    .ml-section-head .ml-eyebrow{ font-family:'JetBrains Mono', monospace; font-size:0.7rem; letter-spacing:0.16em; text-transform:uppercase; margin-bottom:0.6rem; display:flex; align-items:center; gap:0.4rem; }
    .ml-section-head h2{ font-family:'Fraunces', serif; font-weight:600; font-size:2.3rem; letter-spacing:-0.01em; margin:0; color:var(--ink); }
    .ml-section-head a{ font-family:'JetBrains Mono', monospace; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--plum); display:flex; align-items:center; gap:0.4rem; }

    /* ===== PLUS VENDUS (éditorial, accent rouille) ===== */
    .ml-vendus-section{ background:var(--sand-light); padding:4rem 0; }
    .ml-vendus-section .ml-eyebrow{ color:var(--rust); }
    .ml-scroll-row{ display:flex; gap:1.2rem; overflow-x:auto; padding-bottom:1rem; scroll-snap-type:x mandatory; scrollbar-width:none; }
    .ml-scroll-row::-webkit-scrollbar{display:none;}
    .ml-scroll-row > *{ scroll-snap-align:start; flex-shrink:0; }

    .ml-prod-card{ background:#ffffff; border-radius:6px; overflow:hidden; transition:transform 0.3s ease; width:260px; }
    .ml-prod-card:hover{transform:translateY(-5px);}
    .ml-prod-thumb{ aspect-ratio:1; position:relative; overflow:hidden; background:#e8ddc9; }
    .ml-prod-thumb img{ width:100%; height:100%; object-fit:cover; }
    .ml-prod-badge{ position:absolute; top:0.9rem; left:0.9rem; color:var(--sand-light); font-family:'JetBrains Mono', monospace; font-size:0.62rem; letter-spacing:0.08em; padding:0.3rem 0.55rem; border-radius:2px; text-transform:uppercase; z-index:2; display:flex; align-items:center; gap:0.3rem; }
    .ml-prod-badge.rust{ background:var(--rust); }
    .ml-prod-badge.plum{ background:var(--plum); }
    .ml-prod-info{padding:1.1rem 1.2rem 1.4rem;}
    .ml-prod-info .ml-cat{ font-family:'JetBrains Mono', monospace; font-size:0.65rem; color:rgba(26,17,20,0.5); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:0.3rem; }
    .ml-prod-info h4{font-weight:600; font-size:0.98rem; margin:0 0 0.5rem; color:var(--ink); font-family:'Space Grotesk', sans-serif;}
    .ml-price-row{display:flex; align-items:baseline; gap:0.55rem;}
    .ml-price-row .ml-now{font-family:'Fraunces', serif; font-weight:600; font-size:1.15rem; color:var(--sage);}

    /* ===== NOUVEAUTÉS (éditorial, accent prune) ===== */
    .ml-recents-section{ background:var(--sand); padding:4rem 0; }
    .ml-recents-section .ml-eyebrow{ color:var(--plum); }

    /* ===== PRODUITS EN VEDETTE (ml-prod-grid) ===== */
    .ml-products-section{ background:var(--sand-light); padding:4.5rem 0; }
    .ml-products-section .ml-eyebrow{ color:var(--sage); }
    .ml-prod-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem; }
    @media (max-width:940px){.ml-prod-grid{grid-template-columns:repeat(2,1fr);}}

    /* ===== TUILES PROMO ===== */
    .ml-promo-section{ background:var(--sand-light); padding:4.5rem 0; }
    .ml-promo-strip{ max-width:1360px; margin:0 auto; padding:0 2.5rem; display:grid; grid-template-columns:repeat(3,1fr); gap:1.4rem; }
    .ml-promo-tile{ position:relative; background:var(--plum); color:var(--sand-light); border-radius:6px; padding:2.1rem 1.8rem; min-height:230px; display:flex; flex-direction:column; justify-content:flex-end; overflow:hidden; transition:transform 0.35s ease; }
    .ml-promo-tile:hover{transform:translateY(-6px);}
    .ml-promo-tile .ml-icon{ position:absolute; top:1.6rem; right:1.6rem; opacity:0.85; color:var(--lime); }
    .ml-promo-tile .ml-tag{ font-family:'JetBrains Mono', monospace; font-size:0.68rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--lime); margin-bottom:0.5rem; }
    .ml-promo-tile h3{ font-family:'Fraunces', serif; font-weight:600; font-size:1.5rem; line-height:1.1; margin:0; }
    .ml-promo-tile .ml-off{ font-family:'Fraunces', serif; font-style:italic; font-size:1.05rem; margin-top:0.5rem; color:rgba(248,242,230,0.75); }
   .ml-promo-tile{
  position:relative;
  color:var(--sand-light);
  border-radius:6px;
  padding:2.1rem 1.8rem;
  min-height:230px;
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
  overflow:hidden;
  transition:transform 0.35s ease;
  background-size:cover;
  background-position:center;
}
.ml-promo-tile:hover{transform:translateY(-6px);}

/* Overlay sombre pour garder le texte lisible sur n'importe quelle image */
.ml-promo-tile::before{
  content:"";
  position:absolute;
  inset:0;
  background:linear-gradient(180deg, rgba(26,17,20,0.15) 0%, rgba(26,17,20,0.75) 100%);
  z-index:0;
}

/* Tout le contenu passe au-dessus de l'overlay */
.ml-promo-tile > *{
  position:relative;
  z-index:1;
}

.ml-promo-tile .ml-icon{ position:absolute; top:1.6rem; right:1.6rem; opacity:0.9; color:var(--lime); z-index:1; }
.ml-promo-tile .ml-tag{ font-family:'JetBrains Mono', monospace; font-size:0.68rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--lime); margin-bottom:0.5rem; }
.ml-promo-tile h3{ font-family:'Fraunces', serif; font-weight:600; font-size:1.5rem; line-height:1.1; margin:0; }
.ml-promo-tile .ml-off{ font-family:'Fraunces', serif; font-style:italic; font-size:1.05rem; margin-top:0.5rem; color:rgba(248,242,230,0.85); }
    @media (max-width:940px){ .ml-promo-strip{grid-template-columns:1fr;} }

    /* ===== NEWSLETTER ===== */
    .ml-newsletter{ background:var(--plum); color:var(--sand-light); }
    .ml-nl-inner{ max-width:1360px; margin:0 auto; padding:5rem 2.5rem; display:grid; grid-template-columns:1.2fr 1fr; gap:3rem; align-items:center; }
    .ml-newsletter h2{ font-family:'Fraunces', serif; font-weight:600; font-size:2.6rem; line-height:1.05; letter-spacing:-0.01em; margin:0; }
    .ml-newsletter h2 em{font-style:italic; color:var(--lime);}
    .ml-newsletter p{margin-top:1.1rem; color:rgba(248,242,230,0.7); max-width:36ch;}
    .ml-nl-form{ display:flex; gap:0; border-bottom:1.5px solid rgba(248,242,230,0.35); padding-bottom:0.8rem; }
    .ml-nl-form input{ background:none; border:none; outline:none; color:var(--sand-light); font-family:'Space Grotesk', sans-serif; font-size:1rem; flex:1; }
    .ml-nl-form input::placeholder{color:rgba(248,242,230,0.45);}
    .ml-nl-form button{ font-family:'JetBrains Mono', monospace; font-size:0.75rem; letter-spacing:0.08em; text-transform:uppercase; color:var(--lime); white-space:nowrap; display:flex; align-items:center; gap:0.4rem; border:none; background:none; cursor:pointer; }
    @media (max-width:860px){.ml-nl-inner{grid-template-columns:1fr;}}
   
  `;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes, marqRes, vendusRes, recentsRes] = await Promise.all([
          api.get("/api/categorie").catch(() => ({ data: [] })),
          api.get("/api/produitss").catch(() => ({ data: [] })),
          api.get("/api/marque").catch(() => ({ data: [] })),
          api.get("/api/produitss/plus-vendus?limit=12").catch(() => ({ data: [] })),
          api.get("/api/produitss/recents?limit=12").catch(() => ({ data: [] })),
        ]);

        setCategories(catRes.data || []);
        setProduits(prodRes.data || []);
        setMarques(marqRes.data || []);
        setProduitsVendus(vendusRes.data || []);
        setProduitsRecents(recentsRes.data || []);
      } catch (error) {
        console.error("Erreur chargement accueil :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const produitsVedette = produits.slice(0, 8);

  return (
    <div className="ml-root pt-36 lg:pt-24 bg-white">
      <style>{styles}</style>

      {/* ================= HERO (Carousel existant) ================= */}
    

      {/* ================= BANDEAU DÉFILANT ================= */}
      <div className="ml-marquee-wrap">
        <div className="ml-marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>
              SOLDES D'ÉTÉ — JUSQU'À -50%
              <span> </span>
              LIVRAISON OFFERTE DÈS 90€
              <span> </span>
              NOUVELLE COLLECTION
              <span> </span>
              RETOURS GRATUITS SOUS 30 JOURS
            </span>
          ))}
        </div>
      </div>
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
    
    {/* ================= PROMO TILES ================= */}
<section className="bg-gray-50 py-14 md:py-20">
  <div className="ml-promo-strip">
    <div
      className="ml-promo-tile"
      style={{ backgroundImage: "url('/paiement.jpeg')" }}
    >
      <ShieldCheck size={30} className="ml-icon" />
      <span className="ml-tag">Sécurité</span>
      <h3>Paiement 100% sécurisé</h3>
      <p className="ml-off">Orange Money, Wave, carte bancaire</p>
    </div>

    <div
      className="ml-promo-tile t2"
      style={{ backgroundImage: "url('/livraison.jpeg')" }}
    >
      <Truck size={30} className="ml-icon" style={{ color: "var(--lime)" }} />
      <span className="ml-tag">Livraison</span>
      <h3>Rapide, partout au Mali</h3>
      <p className="ml-off">Suivi en temps réel</p>
    </div>

    <div
      className="ml-promo-tile t3"
      style={{ backgroundImage: "url('/immo.jpeg')" }}
    >
      <RotateCcw size={30} className="ml-icon" />
      <span className="ml-tag">Confiance</span>
      <h3>Retours faciles</h3>
      <p className="ml-off">Remboursement sous 7 jours</p>
    </div>
  </div>
</section>
      {/* ================= CATÉGORIES POPULAIRES — remis tel quel (Tailwind + Swiper) ================= */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-yellow-600 font-semibold text-sm mb-1">
                Explorer par catégorie
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#063c28]">
                Catégories populaires
              </h2>
            </div>

            <Link
              href="/categories"
              className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#063c28] hover:text-yellow-600 transition"
            >
              Tout voir <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="flex gap-4 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 w-28 md:w-32 shrink-0 bg-white rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <p className="text-gray-400 text-sm">Aucune catégorie disponible.</p>
          ) : (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={3}
              loop={categories.length > 6}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              breakpoints={{
                480: { slidesPerView: 4 },
                768: { slidesPerView: 5 },
                1024: { slidesPerView: 7 },
              }}
              className="!pb-2"
            >
              {categories.map((cat) => (
                <SwiperSlide key={cat.id}>
                  <Link
                    href={`/categorie/${cat.id}`}
                    className="
                      group relative flex flex-col items-center justify-center gap-3
                      p-5 rounded-3xl bg-white border border-amber-100
                      hover:border-yellow-400 hover:shadow-lg hover:-translate-y-1
                      transition-all duration-300
                    "
                  >
                    <div className="w-14 h-14 rounded-2xl bg-yellow-50 flex items-center justify-center overflow-hidden group-hover:bg-yellow-400/20 transition">
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.nom}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl">🛍️</span>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 text-center group-hover:text-[#063c28] line-clamp-1">
                      {cat.nom}
                    </span>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
      

      {/* ================= PLUS VENDUS (style éditorial ml-*) ================= */}
      {produitsVendus.length > 0 && (
        <section className="ml-vendus-section">
          <div className="ml-section">
            <div className="ml-section-head">
              <div>
                <span className="ml-eyebrow">
                  <Flame size={13} /> Tendance
                </span>
                <h2>Les plus vendus</h2>
              </div>
              <Link href="/produits?tri=populaire">
                Tout voir <ArrowRight size={14} />
              </Link>
            </div>

            <div className="ml-scroll-row">
              {produitsVendus.map((p) => (
                <Link key={p.id} href={`/produit/${p.id}`} className="ml-prod-card">
                  <div className="ml-prod-thumb">
                    <span className="ml-prod-badge rust">
                      <Flame size={11} /> Best
                    </span>
                    {p.image && <img src={p.image} alt={p.nom} />}
                  </div>
                  <div className="ml-prod-info">
                    <div className="ml-cat">{p.marqueNom || p.sousCategorieNom || "Boutique"}</div>
                    <h4>{p.nom}</h4>
                    <div className="ml-price-row">
                      <span className="ml-now">{p.prix?.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= NOUVEAUTÉS (style éditorial ml-*) ================= */}
      {produitsRecents.length > 0 && (
        <section className="ml-recents-section">
          <div className="ml-section">
            <div className="ml-section-head">
              <div>
                <span className="ml-eyebrow">
                  <Clock size={13} /> Fraîchement arrivés
                </span>
                <h2>Nouveautés</h2>
              </div>
              <Link href="/produits?tri=recent">
                Tout voir <ArrowRight size={14} />
              </Link>
            </div>

            <div className="ml-scroll-row">
              {produitsRecents.map((p) => (
                <Link key={p.id} href={`/produit/${p.id}`} className="ml-prod-card">
                  <div className="ml-prod-thumb">
                    <span className="ml-prod-badge plum">Nouveau</span>
                    {p.image && <img src={p.image} alt={p.nom} />}
                  </div>
                  <div className="ml-prod-info">
                    <div className="ml-cat">{p.marqueNom || p.sousCategorieNom || "Boutique"}</div>
                    <h4>{p.nom}</h4>
                    <div className="ml-price-row">
                      <span className="ml-now">{p.prix?.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= PRODUITS EN VEDETTE (ml-prod-grid) ================= */}
      <section className="ml-products-section">
        <div className="ml-section">
          <div className="ml-section-head">
            <div>
              <span className="ml-eyebrow">Sélection</span>
              <h2>Produits en vedette</h2>
            </div>
            <Link href="/produits">
              Tout voir <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="ml-prod-grid">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-100 animate-pulse rounded-md aspect-square" />
              ))}
            </div>
          ) : produitsVedette.length === 0 ? (
            <p className="text-gray-400 text-sm">Aucun produit disponible pour le moment.</p>
          ) : (
            <div className="ml-prod-grid">
              {produitsVedette.map((p) => (
                <Link key={p.id} href={`/produit/${p.id}`} className="ml-prod-card" style={{ width: "auto" }}>
                  <div className="ml-prod-thumb">
                    {p.image && <img src={p.image} alt={p.nom} />}
                  </div>
                  <div className="ml-prod-info">
                    <div className="ml-cat">{p.marqueNom || p.sousCategorieNom || "Boutique"}</div>
                    <h4>{p.nom}</h4>
                    <div className="ml-price-row">
                      <span className="ml-now">{p.prix?.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      
      {/* ================= MARQUES PARTENAIRES (Tailwind) ================= */}
      {marques.length > 0 && (
        <section className="bg-gray-50 py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-gray-500 font-semibold text-sm mb-1">Ils nous font confiance</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#063c28]">Marques partenaires</h2>
            </div>

            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={3}
              loop={marques.length > 6}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              breakpoints={{ 640: { slidesPerView: 4 }, 1024: { slidesPerView: 6 } }}
            >
              {marques.map((m) => (
                <SwiperSlide key={m.id}>
                  <div className="flex items-center justify-center h-20 bg-white rounded-2xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                    {m.image ? (
                      <img src={m.image} alt={m.nom} className="max-h-14 object-contain" />
                    ) : (
                      <span className="font-bold text-gray-400">{m.nom}</span>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* ================= NEWSLETTER (éditorial) ================= */}
      
    </div>
  );
}