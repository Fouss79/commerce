"use client";

import { useState,useEffect } from "react";
import {
  CheckCircle,
  CreditCard,
  MapPin,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

import api from "../../lib/api";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import axios from "axios";
export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { cartItems, removeFromCart, emptyCart, addToCart } = useCart();
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
const [formData, setFormData] = useState({
  nom: "",
  telephone: "",
  adresse: "",
  ville: "",
  paiement: "livraison",
});
 useEffect(() => {
  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (savedUser) {
    setFormData((prev) => ({
      ...prev,
      nom: savedUser.prenom && savedUser.nom
        ? `${savedUser.prenom} ${savedUser.nom}`
        : savedUser.prenom || savedUser.nom || "",

      telephone: savedUser.numero || "",
      adresse: savedUser.adresse || "",
      ville: savedUser.ville || "",
    }));
  }
}, []);
 const total = cartItems?.reduce(
  (acc, item) => acc + item.quantite * item.prix,
  0
);
  
  // ================= HANDLE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= NEXT =================
  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  // ================= PREV =================
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // ================= CONFIRM =================
// ================= CONFIRM =================
const handleConfirm = async () => {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("TOKEN =", token);
    console.log("USER =", user);

    // Vérification utilisateur connecté
    if (!user || !token) {
      alert("Veuillez vous connecter.");
      router.push("/login");
      return;
    }

    // Vérification panier non vide
    if (!cartItems || cartItems.length === 0) {
      alert("Votre panier est vide.");
      return;
    }

    // Construction de la commande
   const order = {
  userId: user.id,

  details: cartItems.map((item) => ({
    produitId: item.produitId,
    varianteId: item.varianteId ?? null,
    quantite: item.quantite,
  })),

  nomClient: formData.nom,
  telephone: formData.telephone,
  adresse: formData.adresse,
  ville: formData.ville,
  modePaiement: formData.paiement,
};

console.log("PANIER =", cartItems);
console.log("COMMANDE =", order);
console.log(cartItems);
    // Total avec frais de livraison
    const montantFinal = (total || 0) + 2000;

    // ======================================================
    // 💳 PAIEMENT EN LIGNE
    // ======================================================
    if (formData.paiement === "carte") {
      // 1. Créer d'abord la commande en base avec statut EN_ATTENTE
      
      const commandeResponse = await api.post("/api/commandes", order);

      const commande = commandeResponse.data;

      // 2. Initialiser le paiement avec l'ID de la commande
     const paiementResponse = await api.post("/api/paiement/init", {
  commandeId: commandeResponse.data.id,
  montant: montantFinal,
  userId: user.id,
});

      // 3. Redirection vers la page de paiement simulée
      window.location.href = paiementResponse.data.paymentUrl;
      return;
    }

    // ======================================================
    // 🚚 PAIEMENT À LA LIVRAISON
      await api.post("/api/commandes", order); 

    // Vider le panier
    emptyCart();

    // Redirection succès
    router.push("/success");

  } catch (error) {
    console.error("Erreur lors de la commande :", error);
    alert("Erreur lors de la commande.");
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-12">
          <div
            className="
              inline-flex items-center gap-2
              px-4 py-2 rounded-full
              bg-green-100 text-[#063c28]
              font-semibold text-sm mb-5
            "
          >
            <ShieldCheck size={18} />
            Paiement sécurisé
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-[#063c28]">
            Finaliser votre commande
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Complétez les étapes ci-dessous pour recevoir
            vos produits rapidement et en toute sécurité.
          </p>
        </div>

        {/* ================= STEPS ================= */}
        <div className="flex items-center justify-center mb-14">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex items-center">
              {/* CERCLE */}
              <div
                className={`
                  w-14 h-14 rounded-full
                  flex items-center justify-center
                  font-bold text-lg
                  transition-all duration-300
                  ${
                    step >= s
                      ? "bg-[#063c28] text-white shadow-lg"
                      : "bg-gray-200 text-gray-500"
                  }
                `}
              >
                {step > s ? (
                  <CheckCircle size={24} />
                ) : (
                  s
                )}
              </div>

              {/* BARRE */}
              {i < 2 && (
                <div
                  className={`
                    w-24 md:w-40 h-2
                    transition-all duration-300
                    ${
                      step > s
                        ? "bg-[#063c28]"
                        : "bg-gray-200"
                    }
                  `}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* ================= CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= FORM ================= */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">

            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <MapPin className="text-[#063c28]" />
                  <h2 className="text-2xl font-bold text-[#063c28]">
                    Adresse de livraison
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Nom complet
                    </label>

                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      className="
                        w-full mt-2 px-4 py-3
                        rounded-2xl border border-gray-200
                        focus:outline-none focus:ring-2
                        focus:ring-green-200
                      "
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Téléphone
                    </label>

                    <input
                      type="text"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="+223 ..."
                      className="
                        w-full mt-2 px-4 py-3
                        rounded-2xl border border-gray-200
                        focus:outline-none focus:ring-2
                        focus:ring-green-200
                      "
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Adresse
                    </label>

                    <input
                      type="text"
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleChange}
                      placeholder="Votre adresse"
                      className="
                        w-full mt-2 px-4 py-3
                        rounded-2xl border border-gray-200
                        focus:outline-none focus:ring-2
                        focus:ring-green-200
                      "
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Ville
                    </label>

                    <select
                      name="ville"
                      value={formData.ville}
                      onChange={handleChange}
                      className="
                        w-full mt-2 px-4 py-3
                        rounded-2xl border border-gray-200
                        focus:outline-none focus:ring-2
                        focus:ring-green-200
                      "
                    >
                      <option value="">
                        Choisissez votre ville
                      </option>

                      <option value="Bamako">
                        Bamako
                      </option>

                      <option value="Sikasso">
                        Sikasso
                      </option>

                      <option value="Kayes">
                        Kayes
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <CreditCard className="text-[#063c28]" />
                  <h2 className="text-2xl font-bold text-[#063c28]">
                    Mode de paiement
                  </h2>
                </div>

                <div className="space-y-4">
                  {[
                   {
                    value: "carte",
                    label: "Paiement en ligne (Carte / Mobile Money)"
                     },
                    {
                      value: "livraison",
                      label: "Paiement à la livraison",
                    },
                  ].map((m) => (
                    <label
                      key={m.value}
                      className={`
                        flex items-center justify-between
                        border-2 rounded-2xl p-5 cursor-pointer
                        transition-all duration-300
                        ${
                          formData.paiement === m.value
                            ? "border-[#063c28] bg-green-50"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          {m.label}
                        </p>
                      </div>

                      <input
                        type="radio"
                        name="paiement"
                        value={m.value}
                        checked={
                          formData.paiement === m.value
                        }
                        onChange={handleChange}
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="text-center py-10">
                <div
                  className="
                    w-24 h-24 mx-auto rounded-full
                    bg-green-100 flex items-center justify-center
                    mb-6
                  "
                >
                  <Truck
                    size={40}
                    className="text-[#063c28]"
                  />
                </div>

                <h2 className="text-3xl font-bold text-[#063c28] mb-4">
                  Confirmation
                </h2>

                <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
                  Vérifiez vos informations puis confirmez
                  votre commande.
                </p>

                <div className="mt-8 bg-gray-50 rounded-3xl p-6 text-left">
                  <p>
                    <strong>Nom :</strong> {formData.nom}
                  </p>

                  <p className="mt-2">
                    <strong>Téléphone :</strong>{" "}
                    {formData.telephone}
                  </p>

                  <p className="mt-2">
                    <strong>Adresse :</strong>{" "}
                    {formData.adresse}
                  </p>

                  <p className="mt-2">
                    <strong>Ville :</strong>{" "}
                    {formData.ville}
                  </p>

                  <p className="mt-2">
                    <strong>Paiement :</strong>{" "}
                    {formData.paiement}
                  </p>
                </div>
              </div>
            )}

            {/* ================= BUTTONS ================= */}
            <div className="flex justify-between mt-10">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="
                    px-6 py-3 rounded-2xl
                    border border-gray-300
                    hover:bg-gray-100
                    transition
                  "
                >
                  Retour
                </button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <button
                  onClick={nextStep}
                  className="
                    px-8 py-3 rounded-2xl
                    bg-[#063c28] text-white
                    hover:scale-105
                    transition-all duration-300
                    shadow-lg
                  "
                >
                  Continuer
                </button>
              ) : (
                <button
                  onClick={handleConfirm}
                  className="
                    px-8 py-3 rounded-2xl
                    bg-gradient-to-r from-[#063c28] to-green-700
                    text-white font-semibold
                    hover:scale-105
                    transition-all duration-300
                    shadow-xl
                  "
                >
                  Confirmer la commande
                </button>
              )}
            </div>
          </div>

          {/* ================= SUMMARY ================= */}
          {/* ================= SUMMARY ================= */}
{/* ================= SUMMARY ================= */}
<div className="bg-white rounded-3xl shadow-xl p-6 h-fit sticky top-24">
  <h3 className="text-2xl font-bold text-[#063c28] mb-6">
    Résumé
  </h3>

  {/* Liste des produits */}
  <div className="space-y-4 mb-6 max-h-72 overflow-y-auto pr-2">
    {cartItems.length === 0 ? (
      <p className="text-gray-500 text-sm">
        Aucun produit dans le panier.
      </p>
    ) : (
      cartItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 border-b pb-3"
        >
          {/* Image */}
          <img
            src={item.image}
            alt={item.nom}
            className="w-14 h-14 rounded-xl object-cover border"
          />

          {/* Informations */}
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-gray-800 line-clamp-2">
              {item.nom}
            </h4>

            <p className="text-xs text-gray-500">
              Qté : {item.quantite}
              {item.taille && ` • ${item.taille}`}
              {item.couleur && ` • ${item.couleur}`}
            </p>

            <p className="text-sm font-bold text-[#063c28]">
              {(item.prix * item.quantite).toLocaleString()} FCFA
            </p>
          </div>
        </div>
      ))
    )}
  </div>

  {/* Totaux */}
  <div className="space-y-4">
    {/* Nombre total d'articles */}
    <div className="flex justify-between text-gray-600">
      <span>Articles</span>
      <span>
        {cartItems.reduce(
          (acc, item) => acc + item.quantite,
          0
        )}
      </span>
    </div>

    {/* Sous-total */}
    <div className="flex justify-between text-gray-600">
      <span>Sous-total</span>
      <span>{(total || 0).toLocaleString()} FCFA</span>
    </div>

    {/* Livraison */}
    <div className="flex justify-between text-gray-600">
      <span>Livraison</span>
      <span>2 000 FCFA</span>
    </div>

    {/* Total final */}
    <div className="border-t pt-4 flex justify-between text-lg font-bold text-[#063c28]">
      <span>Total</span>
      <span>
        {((total || 0) + 2000).toLocaleString()} FCFA
      </span>
    </div>
  </div>

  {/* Message de sécurité */}
  <div className="mt-8 bg-green-50 rounded-2xl p-4">
    <p className="text-sm text-green-700 leading-relaxed">
      🔒 Toutes les transactions sont sécurisées et protégées.
    </p>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}