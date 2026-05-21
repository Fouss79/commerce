"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Hero from "../component/Hero";



export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-[#063c28] to-emerald-600 text-white px-6 py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">

          {/* TEXTE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Achetez & Vendez facilement avec Malisugu
            </h1>

            <p className="mt-6 text-emerald-100 text-lg">
              La plateforme e-commerce moderne du Mali pour tous vos besoins.
            </p>

            <div className="mt-8 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#063c28] px-6 py-3 rounded-xl font-semibold"
              >
                Explorer
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white px-6 py-3 rounded-xl"
              >
                Vendre un produit
              </motion.button>
            </div>
          </motion.div>

          {/* IMAGE ANIMÉE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Image
                src="/image.png"
                alt="Malisugu"
                width={500}
                height={500}
                className="drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

        </div>
      </section>
      <Hero/>
      <div className="flex gap-3 overflow-x-auto py-4 px-2">
  {["Téléphones", "Mode", "Maison", "Beauté", "Informatique"].map((cat) => (
    <motion.div
      key={cat}
      whileTap={{ scale: 0.95 }}
      className="min-w-[120px] bg-white shadow-md rounded-full px-4 py-2 text-center font-semibold whitespace-nowrap"
    >
      {cat}
    </motion.div>
  ))}
</div>

      {/* ================= CATEGORIES ================= */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold text-center mb-10"
        >
          Nos Catégories
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Électronique", "Mode", "Maison", "Beauté"].map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-2xl shadow-md text-center font-semibold"
            >
              {cat}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PRODUITS ================= */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Produits populaires
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -10 }}
                className="bg-gray-50 rounded-2xl p-4 shadow-md"
              >
                <Image
                  src="/product.png"
                  alt="Produit"
                  width={300}
                  height={300}
                  className="rounded-xl"
                />

                <h3 className="mt-4 font-semibold">Produit {item}</h3>
                <p className="text-gray-500">Description rapide du produit</p>
                <p className="text-[#063c28] font-bold mt-2">25 000 FCFA</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 text-center gap-10">

          {[
            { label: "Utilisateurs", value: "10K+" },
            { label: "Produits", value: "5K+" },
            { label: "Ventes", value: "2K+" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
            >
              <h3 className="text-4xl font-bold">{s.value}</h3>
              <p className="mt-2 text-emerald-100">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 text-center px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold"
        >
          Rejoignez Malisugu dès maintenant
        </motion.h2>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 bg-[#063c28] text-white px-8 py-4 rounded-xl font-semibold"
        >
          Créer un compte
        </motion.button>
      </section>

    </main>
  );
}