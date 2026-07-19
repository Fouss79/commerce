"use client";

import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Carousel from "../Component/Carousel";
import MegaMenu from "../Component/MegaMenu";
import ListProduits from "../Admin/produit/component/ListProduits";
import api from "../../lib/api";

function PageProduitsContent() {
  const searchParams = useSearchParams();

  const sousCategorieId = searchParams.get("sousCategorie");

  const [produits, setProduits] = useState([]);
  const [marques, setMarques] = useState([]);

  const [selectedMarque, setSelectedMarque] = useState("");
  const [prixMax, setPrixMax] = useState("");

  // ================= LOAD =================
  useEffect(() => {
    if (!sousCategorieId) return;

    api.get(`/api/produitss`).then((res) => {
      let data = res.data;

      // filtrer par sous-catégorie
      data = data.filter(
        (p) => p.sousCategorie?.id === Number(sousCategorieId)
      );

      setProduits(data);
    });

    api.get("/api/marque").then((res) => setMarques(res.data));
  }, [sousCategorieId]);

  // ================= FILTER =================
  const produitsFiltres = produits.filter((p) => {
    return (
      (!selectedMarque || p.marque?.id === Number(selectedMarque)) &&
      (!prixMax || p.prix <= Number(prixMax))
    );
  });

  return (
    <div className="pt-[150px] md:pt-[150px] lg:pt-[100px]">
      <Carousel />
      <MegaMenu />
      <ListProduits />
    </div>
  );
}

const PageProduits = () => {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PageProduitsContent />
    </Suspense>
  );
};

export default PageProduits;