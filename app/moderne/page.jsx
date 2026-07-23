"use client"
import { useState } from "react";

const styles = `
  .ml-root{
    --plum:#3B1F3D;
    --plum-deep:#241226;
    --sand:#F1E7D4;
    --sand-light:#F8F2E6;
    --lime:#D4F53E;
    --rust:#C1440E;
    --ink:#1A1114;
    --line: rgba(26,17,20,0.14);
    background:var(--sand-light);
    color:var(--ink);
    font-family:'Space Grotesk', sans-serif;
    overflow-x:hidden;
    width:100%;
  }
  .ml-root *{box-sizing:border-box;}
  .ml-root a{color:inherit;text-decoration:none;}
  .ml-root button{font-family:inherit;cursor:pointer;border:none;background:none;}
  .ml-serif{font-family:'Fraunces', serif;}
  .ml-mono{font-family:'JetBrains Mono', monospace;}

  @media (prefers-reduced-motion: reduce){
    .ml-root *{animation:none !important; transition:none !important;}
  }

  .ml-marquee-wrap{
    background:var(--plum); color:var(--sand);
    overflow:hidden; white-space:nowrap;
    border-bottom:1px solid rgba(241,231,212,0.15);
    position:relative; z-index:50;
  }
  .ml-marquee{ display:inline-flex; animation: ml-scroll 26s linear infinite; }
  .ml-marquee span{
    padding:9px 2.2rem; font-family:'JetBrains Mono', monospace; font-size:0.72rem;
    letter-spacing:0.14em; text-transform:uppercase; display:inline-flex; align-items:center; gap:0.6rem;
  }
  .ml-marquee span::after{content:"◆"; color:var(--lime); font-size:0.6rem; margin-left:0.6rem;}
  @keyframes ml-scroll{ from{transform:translateX(0);} to{transform:translateX(-50%);} }

  .ml-header{ position:sticky; top:0; z-index:40; background:var(--sand-light); border-bottom:1px solid var(--line); }
  .ml-nav{ max-width:1360px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; padding:1.15rem 2.5rem; }
  .ml-logo{ font-family:'Fraunces', serif; font-weight:600; font-size:1.5rem; letter-spacing:-0.01em; }
  .ml-logo em{font-style:italic; color:var(--rust);}
  .ml-nav-links{ display:flex; gap:2.4rem; font-size:0.85rem; letter-spacing:0.02em; font-weight:500; }
  .ml-nav-links a{position:relative; padding:0.2rem 0;}
  .ml-nav-links a::after{ content:""; position:absolute; left:0; bottom:0; width:0; height:1.5px; background:var(--rust); transition:width 0.25s ease; }
  .ml-nav-links a:hover::after{width:100%;}
  .ml-nav-icons{display:flex; gap:1.3rem; align-items:center;}
  .ml-nav-icons button{padding:0.4rem; display:flex;}
  @media (max-width:860px){ .ml-nav-links{display:none;} }

  .ml-hero{ max-width:1360px; margin:0 auto; padding:3.5rem 2.5rem 2rem; display:grid; grid-template-columns: 1.05fr 1fr; gap:2.5rem; align-items:center; }
  .ml-hero-eyebrow{ font-family:'JetBrains Mono', monospace; font-size:0.72rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--rust); display:flex; align-items:center; gap:0.6rem; margin-bottom:1.4rem; }
  .ml-hero-eyebrow::before{content:""; width:26px; height:1px; background:var(--rust);}
  .ml-hero h1{ font-family:'Fraunces', serif; font-weight:600; font-size:clamp(3rem, 6vw, 5.4rem); line-height:0.94; letter-spacing:-0.02em; margin:0; }
  .ml-hero h1 .it{font-style:italic; font-weight:500; color:var(--plum); display:block;}
  .ml-hero p.ml-lede{ margin-top:1.6rem; max-width:30ch; font-size:1.02rem; line-height:1.55; color:rgba(26,17,20,0.72); }
  .ml-hero-cta{ margin-top:2.3rem; display:flex; align-items:center; gap:1.6rem; }
  .ml-btn-primary{ background:var(--plum); color:var(--sand-light); padding:0.95rem 2.1rem; font-size:0.85rem; font-weight:600; letter-spacing:0.03em; border-radius:2px; display:inline-flex; align-items:center; gap:0.6rem; transition:background 0.25s ease, transform 0.25s ease; }
  .ml-btn-primary:hover{background:var(--rust); transform:translateY(-2px);}
  .ml-hero-meta{ font-size:0.8rem; color:rgba(26,17,20,0.55); font-family:'JetBrains Mono', monospace; }

  .ml-hero-visual{ position:relative; aspect-ratio: 4/5; display:flex; align-items:center; justify-content:center; }
  .ml-hero-panel{ position:absolute; inset:0; background: radial-gradient(120% 100% at 20% 15%, rgba(212,245,62,0.35), transparent 55%), linear-gradient(155deg, var(--plum) 0%, var(--plum-deep) 65%); border-radius:6px; overflow:hidden; }
  .ml-hero-panel svg{width:100%; height:100%;}

  .ml-stamp{ position:absolute; top:-1.4rem; left:-1.4rem; width:132px; height:132px; background:var(--lime); border-radius:50%; display:flex; align-items:center; justify-content:center; transform:rotate(-14deg); box-shadow:0 12px 30px rgba(0,0,0,0.18); z-index:5; animation: ml-spin 22s linear infinite; }
  .ml-stamp .ml-stamp-inner{ text-align:center; transform:rotate(14deg); }
  @keyframes ml-spin{ from{transform:rotate(-14deg);} to{transform:rotate(346deg);} }
  .ml-stamp span.ml-pct{ font-family:'Fraunces', serif; font-weight:700; font-size:2rem; display:block; line-height:1; color:var(--plum-deep); }
  .ml-stamp span.ml-txt{ font-family:'JetBrains Mono', monospace; font-size:0.6rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--plum-deep); }

  @media (max-width:940px){ .ml-hero{grid-template-columns:1fr; padding-top:2.2rem;} .ml-hero-visual{aspect-ratio:16/10; order:-1;} }

  .ml-promo-strip{ max-width:1360px; margin:0 auto; padding:0 2.5rem 4.5rem; display:grid; grid-template-columns:repeat(3,1fr); gap:1.4rem; }
  .ml-promo-tile{ position:relative; background:var(--ink); color:var(--sand-light); border-radius:6px; padding:2.1rem 1.8rem; min-height:230px; display:flex; flex-direction:column; justify-content:flex-end; overflow:hidden; transition:transform 0.35s ease; }
  .ml-promo-tile:hover{transform:translateY(-6px);}
  .ml-promo-tile .ml-icon{ position:absolute; top:1.6rem; right:1.6rem; width:46px; height:46px; opacity:0.85; }
  .ml-promo-tile .ml-tag{ font-family:'JetBrains Mono', monospace; font-size:0.68rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--lime); margin-bottom:0.5rem; }
  .ml-promo-tile h3{ font-family:'Fraunces', serif; font-weight:600; font-size:1.5rem; line-height:1.1; margin:0; }
  .ml-promo-tile .ml-off{ font-family:'Fraunces', serif; font-style:italic; font-size:1.05rem; margin-top:0.5rem; color:rgba(248,242,230,0.75); }
  .ml-promo-tile.t2{background:#2C231C;}
  .ml-promo-tile.t3{background:#241226;}

  .ml-section{max-width:1360px; margin:0 auto; padding:0 2.5rem;}
  .ml-section-head{ display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:2.4rem; flex-wrap:wrap; gap:1rem; }
  .ml-section-head .ml-eyebrow{ font-family:'JetBrains Mono', monospace; font-size:0.7rem; letter-spacing:0.16em; text-transform:uppercase; color:var(--rust); margin-bottom:0.6rem; display:block; }
  .ml-section-head h2{ font-family:'Fraunces', serif; font-weight:600; font-size:2.3rem; letter-spacing:-0.01em; margin:0; }
  .ml-section-head p{ max-width:38ch; font-size:0.9rem; color:rgba(26,17,20,0.6); line-height:1.5; margin:0; }

  .ml-cat-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:1.2rem; padding-bottom:5rem; }
  .ml-cat-card{ position:relative; border-radius:6px; aspect-ratio:3/4; overflow:hidden; display:flex; flex-direction:column; justify-content:flex-end; padding:1.4rem; }
  .ml-cat-card .ml-bg{position:absolute; inset:0; z-index:0;}
  .ml-cat-card .ml-bg svg{width:100%;height:100%;}
  .ml-cat-card .ml-label{ position:relative; z-index:2; background:var(--sand-light); padding:0.75rem 1rem; border-radius:3px; display:flex; align-items:center; justify-content:space-between; transform:translateY(0); transition:transform 0.3s ease; }
  .ml-cat-card:hover .ml-label{transform:translateY(-4px);}
  .ml-cat-card .ml-label .ml-name{font-weight:600; font-size:0.95rem;}
  .ml-cat-card .ml-label .ml-count{ font-family:'JetBrains Mono', monospace; font-size:0.7rem; color:rgba(26,17,20,0.5); }
  .ml-cat-card .ml-num{ position:absolute; top:1.1rem; left:1.2rem; z-index:2; font-family:'JetBrains Mono', monospace; font-size:0.7rem; color:rgba(248,242,230,0.85); }

  @media (max-width:940px){ .ml-promo-strip{grid-template-columns:1fr;} .ml-cat-grid{grid-template-columns:repeat(2,1fr);} }

  .ml-products{padding-bottom:5.5rem;}
  .ml-prod-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem; }
  .ml-prod-card{ background:var(--sand); border-radius:6px; overflow:hidden; transition:transform 0.3s ease; }
  .ml-prod-card:hover{transform:translateY(-5px);}
  .ml-prod-thumb{ aspect-ratio:1; position:relative; overflow:hidden; }
  .ml-prod-thumb svg{width:100%; height:100%;}
  .ml-prod-badge{ position:absolute; top:0.9rem; left:0.9rem; background:var(--rust); color:var(--sand-light); font-family:'JetBrains Mono', monospace; font-size:0.62rem; letter-spacing:0.08em; padding:0.3rem 0.55rem; border-radius:2px; text-transform:uppercase; }
  .ml-prod-info{padding:1.1rem 1.2rem 1.4rem;}
  .ml-prod-info .ml-cat{ font-family:'JetBrains Mono', monospace; font-size:0.65rem; color:rgba(26,17,20,0.5); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:0.3rem; }
  .ml-prod-info h4{font-weight:600; font-size:0.98rem; margin:0 0 0.5rem;}
  .ml-price-row{display:flex; align-items:baseline; gap:0.55rem;}
  .ml-price-row .ml-now{font-family:'Fraunces', serif; font-weight:600; font-size:1.15rem;}
  .ml-price-row .ml-was{ font-size:0.82rem; color:rgba(26,17,20,0.4); text-decoration:line-through; }
  @media (max-width:940px){.ml-prod-grid{grid-template-columns:repeat(2,1fr);}}

  .ml-newsletter{ background:var(--plum); color:var(--sand-light); margin-top:2rem; }
  .ml-nl-inner{ max-width:1360px; margin:0 auto; padding:5rem 2.5rem; display:grid; grid-template-columns:1.2fr 1fr; gap:3rem; align-items:center; }
  .ml-newsletter h2{ font-family:'Fraunces', serif; font-weight:600; font-size:2.6rem; line-height:1.05; letter-spacing:-0.01em; margin:0; }
  .ml-newsletter h2 em{font-style:italic; color:var(--lime);}
  .ml-newsletter p{margin-top:1.1rem; color:rgba(248,242,230,0.7); max-width:36ch;}
  .ml-nl-form{ display:flex; gap:0; border-bottom:1.5px solid rgba(248,242,230,0.35); padding-bottom:0.8rem; }
  .ml-nl-form input{ background:none; border:none; outline:none; color:var(--sand-light); font-family:'Space Grotesk', sans-serif; font-size:1rem; flex:1; }
  .ml-nl-form input::placeholder{color:rgba(248,242,230,0.45);}
  .ml-nl-form button{ font-family:'JetBrains Mono', monospace; font-size:0.75rem; letter-spacing:0.08em; text-transform:uppercase; color:var(--lime); white-space:nowrap; display:flex; align-items:center; gap:0.4rem; }
  @media (max-width:860px){.ml-nl-inner{grid-template-columns:1fr;}}

  .ml-footer{ background:var(--plum-deep); color:rgba(248,242,230,0.55); padding:3rem 2.5rem 2rem; }
  .ml-footer-inner{ max-width:1360px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; font-size:0.8rem; }
  .ml-footer-inner .ml-logo{ color:var(--sand-light); font-size:1.1rem; }
`;

export default function HomepageEcommerce() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  return (
    <div className="ml-root">
      <style>{styles}</style>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      />

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

      <header className="ml-header">
        <nav className="ml-nav">
          <div className="ml-logo">
            MAISON <em>LUXE</em>
          </div>
          <div className="ml-nav-links">
            <a href="#accueil">Accueil</a>
            <a href="#categories">Boutique</a>
            <a href="#produits">Nouveautés</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="ml-nav-icons">
            <button aria-label="Recherche">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.5" y2="16.5" />
              </svg>
            </button>
            <button aria-label="Compte">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
              </svg>
            </button>
            <button aria-label="Panier">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 7h15l-1.5 9.5a2 2 0 01-2 1.5H8.5a2 2 0 01-2-1.7L4.5 3H2" />
                <circle cx="9" cy="20" r="1.3" />
                <circle cx="17" cy="20" r="1.3" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <section className="ml-hero" id="accueil">
        <div>
          <div className="ml-hero-eyebrow">Collection Été 2026</div>
          <h1>
            Un style<span className="it">qui ne suit pas</span>les tendances.
          </h1>
          <p className="ml-lede">
            Pièces sélectionnées pour durer, portées par celles et ceux qui préfèrent leur propre allure à la dernière mode.
          </p>
          <div className="ml-hero-cta">
            <a href="#categories" className="ml-btn-primary">
              Découvrir la vente
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <span className="ml-hero-meta">01 / dès 45€</span>
          </div>
        </div>

        <div className="ml-hero-visual">
          <div className="ml-stamp">
            <div className="ml-stamp-inner">
              <span className="ml-pct">−50%</span>
              <span className="ml-txt">dès 90€</span>
            </div>
          </div>
          <div className="ml-hero-panel">
            <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#D4F53E" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#D4F53E" stopOpacity="0" />
                </linearGradient>
              </defs>
              <circle cx="300" cy="90" r="150" fill="url(#g1)" />
              <g fill="none" stroke="#F1E7D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
                <path d="M170 120c0-22 18-38 40-38s40 16 40 38-16 34-40 34-40-12-40-34z" />
                <path d="M150 175c10-14 30-22 60-22s50 8 60 22l14 150c2 18-10 30-26 30h-8l-6-110-6 110H198l-6-110-6 110h-8c-16 0-28-12-26-30z" />
                <path d="M150 175l-30 90M270 175l30 90" />
              </g>
              <g fill="none" stroke="#C1440E" strokeWidth="1.6" opacity="0.8">
                <line x1="60" y1="380" x2="340" y2="380" />
                <line x1="60" y1="380" x2="60" y2="420" />
                <line x1="340" y1="380" x2="340" y2="420" />
              </g>
              <text x="200" y="460" textAnchor="middle" fill="#F1E7D4" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="2" opacity="0.75">
                SILHOUETTE — 04
              </text>
            </svg>
          </div>
        </div>
      </section>

      <div className="ml-promo-strip">
        <div className="ml-promo-tile">
          <svg className="ml-icon" viewBox="0 0 24 24" fill="none" stroke="#D4F53E" strokeWidth="1.5">
            <path d="M2 9h6l1-2h6l1 2h6" />
            <circle cx="6.5" cy="13" r="3.2" />
            <circle cx="17.5" cy="13" r="3.2" />
            <path d="M9.7 13h4.6" />
          </svg>
          <div className="ml-tag">Lunettes femme</div>
          <h3>Édition solaire</h3>
          <div className="ml-off">jusqu'à −50%</div>
        </div>
        <div className="ml-promo-tile t2">
          <svg className="ml-icon" viewBox="0 0 24 24" fill="none" stroke="#D4F53E" strokeWidth="1.5">
            <path d="M4 18h16M6 18V9l3-3h2l1 3 6 2v7" />
            <path d="M6 12h3" />
          </svg>
          <div className="ml-tag">Chaussures</div>
          <h3>Grande vente</h3>
          <div className="ml-off">jusqu'à −50%</div>
        </div>
        <div className="ml-promo-tile t3">
          <svg className="ml-icon" viewBox="0 0 24 24" fill="none" stroke="#D4F53E" strokeWidth="1.5">
            <circle cx="12" cy="12" r="6.5" />
            <path d="M12 9v3l2 1.5" />
            <path d="M9.5 3.5h5M9.5 20.5h5" />
          </svg>
          <div className="ml-tag">Montres connectées</div>
          <h3>Sélection smart</h3>
          <div className="ml-off">jusqu'à −50%</div>
        </div>
      </div>

      <section className="ml-section" id="categories">
        <div className="ml-section-head">
          <div>
            <span className="ml-eyebrow">Boutique</span>
            <h2>Catégories en vedette</h2>
          </div>
          <p>Quatre univers, une seule exigence : des pièces qui traversent les saisons sans se démoder.</p>
        </div>
        <div className="ml-cat-grid">
          {[
            {
              num: "01",
              name: "Accessoires",
              count: "4 articles",
              bg: "#241226",
              content: (
                <>
                  <circle cx="230" cy="60" r="120" fill="#3B1F3D" />
                  <g stroke="#D4F53E" strokeWidth="2" fill="none" opacity="0.85">
                    <rect x="90" y="150" width="60" height="60" rx="4" />
                    <line x1="120" y1="150" x2="120" y2="130" />
                    <circle cx="120" cy="240" r="16" />
                  </g>
                </>
              ),
            },
            {
              num: "02",
              name: "Casual",
              count: "6 articles",
              bg: "#3B1F3D",
              content: (
                <>
                  <circle cx="50" cy="350" r="140" fill="#C1440E" opacity="0.5" />
                  <g stroke="#F1E7D4" strokeWidth="2" fill="none" opacity="0.9">
                    <path d="M130 120c0-14 10-24 22-24s22 10 22 24-10 20-22 20-22-6-22-20z" />
                    <path d="M115 155c8-8 20-12 37-12s29 4 37 12l8 130H107z" />
                  </g>
                </>
              ),
            },
            {
              num: "03",
              name: "Vêtements",
              count: "12 articles",
              bg: "#C1440E",
              content: (
                <>
                  <circle cx="260" cy="380" r="130" fill="#241226" opacity="0.6" />
                  <g stroke="#F1E7D4" strokeWidth="2" fill="none" opacity="0.9">
                    <path d="M100 100a40 22 0 0180 0" />
                    <path d="M100 100c0 20 80 20 80 0" />
                    <path d="M120 122c0 60-20 80-20 130h60c0-50-20-70-20-130" />
                  </g>
                </>
              ),
            },
            {
              num: "04",
              name: "Homme",
              count: "4 articles",
              bg: "#1A1114",
              content: (
                <>
                  <circle cx="60" cy="70" r="110" fill="#D4F53E" opacity="0.25" />
                  <g stroke="#F1E7D4" strokeWidth="2" fill="none" opacity="0.9">
                    <rect x="105" y="120" width="50" height="66" rx="6" />
                    <path d="M118 120v-14a12 12 0 0124 0v14" />
                    <line x1="105" y1="153" x2="155" y2="153" />
                  </g>
                </>
              ),
            },
          ].map((cat) => (
            <div className="ml-cat-card" key={cat.num}>
              <div className="ml-bg">
                <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
                  <rect width="300" height="400" fill={cat.bg} />
                  {cat.content}
                </svg>
              </div>
              <span className="ml-num ml-mono">{cat.num}</span>
              <div className="ml-label">
                <span className="ml-name">{cat.name}</span>
                <span className="ml-count">{cat.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ml-section ml-products" id="produits">
        <div className="ml-section-head">
          <div>
            <span className="ml-eyebrow">Nouveautés</span>
            <h2>Meilleures ventes</h2>
          </div>
          <p>Les pièces que l'on s'arrache cette semaine — en stock limité.</p>
        </div>
        <div className="ml-prod-grid">
          {[
            {
              badge: "−30%",
              bg: "#3B1F3D",
              cat: "Vêtements",
              name: "Robe portefeuille lin",
              now: "59€",
              was: "84€",
              content: (
                <>
                  <circle cx="220" cy="80" r="90" fill="#D4F53E" opacity="0.2" />
                  <g stroke="#F1E7D4" strokeWidth="2" fill="none">
                    <path d="M110 90c0-16 12-28 28-28s28 12 28 28-12 24-28 24-28-8-28-24z" />
                    <path d="M95 130c10-10 25-16 43-16s33 6 43 16l10 130H85z" />
                  </g>
                </>
              ),
            },
            {
              badge: "Nouveau",
              bg: "#C1440E",
              cat: "Accessoires",
              name: "Sac cabas cuir",
              now: "75€",
              was: null,
              content: (
                <>
                  <circle cx="70" cy="230" r="100" fill="#241226" opacity="0.35" />
                  <g stroke="#F1E7D4" strokeWidth="2" fill="none">
                    <rect x="115" y="110" width="70" height="70" rx="5" />
                    <line x1="150" y1="110" x2="150" y2="90" />
                  </g>
                </>
              ),
            },
            {
              badge: "−50%",
              bg: "#1A1114",
              cat: "Chaussures",
              name: "Bottines cuir marron",
              now: "62€",
              was: "124€",
              content: (
                <>
                  <circle cx="230" cy="60" r="100" fill="#D4F53E" opacity="0.18" />
                  <g stroke="#F1E7D4" strokeWidth="2" fill="none">
                    <path d="M85 150h130M85 150v-8l4-30h122l4 30v8" />
                    <path d="M100 150l6 14h88l6-14" />
                  </g>
                </>
              ),
            },
            {
              badge: null,
              bg: "#3B1F3D",
              cat: "Montres",
              name: "Montre connectée Aria",
              now: "98€",
              was: "196€",
              content: (
                <>
                  <circle cx="70" cy="70" r="110" fill="#C1440E" opacity="0.25" />
                  <g stroke="#F1E7D4" strokeWidth="2" fill="none">
                    <circle cx="150" cy="150" r="42" />
                    <path d="M150 128v22l16 12" />
                    <path d="M138 96h24M138 204h24" />
                  </g>
                </>
              ),
            },
          ].map((p) => (
            <div className="ml-prod-card" key={p.name}>
              <div className="ml-prod-thumb">
                {p.badge && <span className="ml-prod-badge">{p.badge}</span>}
                <svg viewBox="0 0 300 300" width="100%" height="100%">
                  <rect width="300" height="300" fill={p.bg} />
                  {p.content}
                </svg>
              </div>
              <div className="ml-prod-info">
                <div className="ml-cat">{p.cat}</div>
                <h4>{p.name}</h4>
                <div className="ml-price-row">
                  <span className="ml-now">{p.now}</span>
                  {p.was && <span className="ml-was">{p.was}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ml-newsletter">
        <div className="ml-nl-inner">
          <div>
            <h2>
              Ne manquez
              <br />
              <em>aucune vente</em>.
            </h2>
            <p>Recevez les nouvelles collections et les ventes privées avant tout le monde, une fois par semaine, sans spam.</p>
          </div>
          <div>
            <form className="ml-nl-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">{subscribed ? "Inscrit ✓" : "S'inscrire →"}</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="ml-footer" id="contact">
        <div className="ml-footer-inner">
          <div className="ml-logo ml-serif">MAISON LUXE</div>
          <span>© 2026 Maison Luxe. Tous droits réservés.</span>
          <span className="ml-mono">Paiement sécurisé · Retours gratuits 30j</span>
        </div>
      </footer>
    </div>
  );
}