'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import { useAuth } from '../../../../context/AuthContext';
import AvisSection from './AvisSection';
import Etoiles from "./Etoiles"; 
import ProductItem from './productItems';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import styles from "./produit.module.css"; 

export default function ProduitDetail() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const [images, setImages] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [quantite, setQuantite] = useState(1);
  const { ajouterAuPanier, user } = useAuth();
  const [prodcat, setProdcat] = useState([]);
  const [tri, setTri] = useState('default');

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleClick = () => {
    ajouterAuPanier({ ...produit, quantite });
    setMessage('Produit ajouté au panier avec succès !');
    setTimeout(() => setMessage(''), 3000);
  };

  const produitsTries = [...prodcat].sort((a, b) => {
    switch (tri) {
      case 'prixAsc': return a.prix - b.prix;
      case 'prixDesc': return b.prix - a.prix;
      case 'nomAsc': return a.nom.localeCompare(b.nom);
      case 'nomDesc': return b.nom.localeCompare(a.nom);
      default: return 0;
    }
  });

  const augmenterQuantite = () => setQuantite(q => q + 1);
  const diminuerQuantite = () => setQuantite(q => (q > 1 ? q - 1 : 1));

  useEffect(() => {
    const fetchProduit = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/produits/${id}`);
        setProduit(res.data);

        const imagesRes = await axios.get(`${API_URL}/api/produits/${res.data.id}/images`);
        setImages(imagesRes.data);

        const cat = await axios.get(`${API_URL}/api/produits/categorie/${res.data.categorieId}`);
        setProdcat(cat.data);
      } catch (err) {
        setError("Erreur lors de la récupération du produit.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduit();
  }, [id, API_URL]);

  if (loading) return <div className="text-center mt-10">Chargement...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!produit) return <div className="text-center mt-10">Produit introuvable.</div>;

  return (
    <div className="max-w-7xl px-8">
      <h1 className='text-3xl font-bold mb-4 text-[#036c94]'>Détails du produit</h1>

      <div className="flex flex-col md:flex-row gap-2 mt-4">

        {/* Miniatures à gauche */}
        <div className="w-full md:w-[90px]">
          <Swiper
            onSwiper={setThumbsSwiper}
            direction="vertical"
            slidesPerView={4}
            spaceBetween={10}
            watchSlidesProgress
            className="h-[420px]"
          >
            <SwiperSlide key="thumb-main">
              <Image
                src={`${API_URL}/${produit.image}`}
                alt="Mini principale"
                width={80}
                height={80}
                className="object-cover border rounded hover:ring-2 ring-yellow-600"
                unoptimized
              />
            </SwiperSlide>

            {images.map(img => (
              <SwiperSlide key={img.id}>
                <Image
                  src={`${API_URL}/${img.filename}`}
                  alt={img.description || 'Mini'}
                  width={80}
                  height={80}
                  className="object-cover border rounded hover:ring-2 ring-yellow-600"
                  unoptimized
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Image principale */}
        <div className="w-full md:w-[400px]">
          <Swiper
            modules={[Navigation, Pagination, Thumbs]}
            navigation
            pagination={{ clickable: true }}
            thumbs={{ swiper: thumbsSwiper }}
            className="rounded overflow-hidden"
          >
            <SwiperSlide key="principale">
              <div className="relative w-full h-[400px] rounded overflow-hidden">
                <Image
                  src={`${API_URL}/${produit.image}`}
                  alt={produit.nom}
                  layout="fill"
                  className="object-cover"
                  unoptimized
                  priority
                />
              </div>
            </SwiperSlide>

            {images.map(img => (
              <SwiperSlide key={img.id}>
                <Image
                  src={`${API_URL}/${img.filename}`}
                  alt={img.description || produit.nom}
                  width={420}
                  height={400}
                  className="object-cover rounded h-100 w-full"
                  unoptimized
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Détails du produit */}
        <div className="flex-1 px-6">
          <h1 className="text-3xl text-[#036c94] font-bold mb-2">{produit.nom}</h1>

          {produit.moyenne !== undefined && (
            <div className="flex items-center gap-2 mb-2">
              <Etoiles note={produit.moyenne} />
              <span className="text-sm text-gray-500">({produit.moyenne.toFixed(1)} / 5)</span>
            </div>
          )}

          <p className="text-lg text-gray-500 mb-2">
            Catégorie : <span className="text-[#036c94] font-semibold">{produit.categorieNom}</span>
          </p>
          <p className="text-lg text-gray-500 mb-2">
            Marque : <span className="text-[#036c94] font-semibold">{produit.marqueNom}</span>
          </p>
          <p className="text-lg text-gray-500 mb-2">
            Prix : <span className="text-[#036c94] font-semibold">{produit.prix} FCFA</span>
          </p>
          <p className="text-lg text-gray-500 mb-4">
            Stock : <span className="text-[#036c94] font-semibold">{produit.stock}</span>
          </p>

          <div className="flex items-center mb-10 gap-3">
            <Image
              src={`${API_URL}/${produit.vendeurImage}`}
              alt="vendeur"
              width={50}
              height={50}
              className="rounded-full object-cover border"
              unoptimized
            />
            <div>
              <p className="text-gray-700">
                Vendu par : <span className="font-semibold">{produit.vendeurPrenom} {produit.vendeurNom}</span>
              </p>
              <Link href={`/home/boutique/${produit.boutiqueId}`} className="text-[#036c94] text-2xl">
                Chez {produit.boutiqueNom}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="font-semibold">Quantité :</span>
            <button onClick={diminuerQuantite} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
            <span className="font-bold">{quantite}</span>
            <button onClick={augmenterQuantite} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
          </div>

          <button
            onClick={handleClick}
            className="bg-[#036c94] text-white px-6 py-2 rounded hover:bg-[#036c94] transition"
          >
            Ajouter au panier
          </button>

          {message && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded shadow">
              {message}
            </div>
          )}
        </div>
      </div>

      {/* Produits similaires */}
      <section className="mt-8">
        <h2 className="text-2xl text-white font-bold bg-[#036c94] px-4 py-2 rounded-t">
          PRODUITS SIMILAIRES
        </h2>

        <div className="flex justify-end items-center gap-4 px-4 py-2">
          <label className="text-sm font-medium">Trier par :</label>
          <select
            onChange={(e) => setTri(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="default">Pertinence</option>
            <option value="prixAsc">Prix croissant</option>
            <option value="prixDesc">Prix décroissant</option>
            <option value="nomAsc">Nom A-Z</option>
            <option value="nomDesc">Nom Z-A</option>
          </select>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true }}
          className="py-4"
        >
          {produitsTries.slice(0, 8).map((product) => (
            <SwiperSlide key={product.id}>
              <ProductItem
                product={product}
                handleClick={() => ajouterAuPanier({ ...product, quantite: 1 })}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <AvisSection produitId={produit.id} utilisateurId={user?.id} />
    </div>
  );
}
