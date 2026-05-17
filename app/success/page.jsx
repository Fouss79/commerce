"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 text-center max-w-md w-full">

        <CheckCircle size={70} className="text-green-600 mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-[#063c28]">
          Commande confirmée
        </h1>

        <p className="text-gray-600 mt-3">
          Merci pour votre achat. Votre commande est en cours de traitement.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block bg-[#063c28] text-white px-6 py-3 rounded-2xl hover:scale-105 transition"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}