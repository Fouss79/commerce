"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ produit }) {
  if (!produit) return null;

  return (
    <nav
      aria-label="Fil d'Ariane"
      className="flex items-center flex-wrap gap-1 text-sm text-gray-500 mb-6"
    >
      {/* Accueil */}
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-blue-600 transition"
      >
        <Home size={16} />
        <span>Accueil</span>
      </Link>

      {/* Sous-catégorie */}
      {produit?.sousCategorie && (
        <>
          <ChevronRight size={16} />
          <Link
            href={`/souscategorie/${produit.sousCategorie.id}`}
            className="hover:text-blue-600 transition"
          >
            {produit.sousCategorie.nom}
          </Link>
        </>
      )}

      {/* Marque */}
      {produit?.marque && (
        <>
          <ChevronRight size={16} />
          <Link
            href={`/marque/${produit.marque.id}`}
            className="hover:text-blue-600 transition"
          >
            {produit.marque.nom}
          </Link>
        </>
      )}

      {/* Produit actuel */}
      <ChevronRight size={16} />
      <span className="font-semibold text-gray-900">
        {produit.nom}
      </span>
    </nav>
  );
}