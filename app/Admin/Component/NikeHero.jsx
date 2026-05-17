"use client"
import { useState, useEffect } from "react";

const images = ["/nike2.png", "/nike3.png", "/nike4.png"];

export default function NikeHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl p-6 relative group">

      {/* SLIDER */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden flex items-center justify-center">

        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Collection Nike"
            className={`absolute max-h-[85%] max-w-[85%] object-contain transition-opacity duration-1000
              ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

        {/* TEXTE */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 text-white">

          <h2 className="text-3xl md:text-6xl font-extrabold mb-4">
            COLLECTION NIKE 2026
          </h2>

          <p className="text-lg md:text-xl max-w-xl mb-6 text-gray-200">
            Style, confort et performance. Découvrez nos nouveaux survêtements.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button className="px-6 py-3 rounded-xl bg-white text-black font-semibold">
              Acheter maintenant
            </button>

            <button className="px-6 py-3 rounded-xl border border-white/50">
              Voir plus
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}