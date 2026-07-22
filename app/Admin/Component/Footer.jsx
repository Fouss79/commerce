
"use client";
import React from 'react'
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Truck,
  RotateCcw,
  Send,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#063c28] via-[#053420] to-[#042818] text-white mt-20">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10">
              <ShieldCheck size={22} className="text-yellow-400" />
            </div>
            <div>
              <p className="font-semibold text-sm">Paiement sécurisé</p>
              <p className="text-green-200 text-xs">100% protégé</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10">
              <Truck size={22} className="text-yellow-400" />
            </div>
            <div>
              <p className="font-semibold text-sm">Livraison rapide</p>
              <p className="text-green-200 text-xs">Partout au Mali</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10">
              <RotateCcw size={22} className="text-yellow-400" />
            </div>
            <div>
              <p className="font-semibold text-sm">Retour facile</p>
              <p className="text-green-200 text-xs">Sous 7 jours</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10">
              <ShieldCheck size={22} className="text-yellow-400" />
            </div>
            <div>
              <p className="font-semibold text-sm">Vendeurs vérifiés</p>
              <p className="text-green-200 text-xs">Qualité garantie</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
              <img
                src="/imm1.png"
                className="h-12 w-12 object-contain"
                alt="logo"
              />
            </div>
            <div>
              <span className="text-white font-bold text-xl tracking-wide">
                Mali
              </span>
              <span className="text-yellow-400 font-bold text-xl tracking-wide">
                Sugu
              </span>
            </div>
          </div>

          <p className="text-green-100 text-sm leading-relaxed max-w-sm">
            La marketplace 100% malienne qui connecte les vendeurs locaux
            aux clients partout dans le pays. Achetez et vendez en toute
            confiance.
          </p>

          <div className="flex items-center gap-3 pt-2">
  <a
    href="https://facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    className="p-2.5 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-[#063c28] transition-all duration-300"
  >
    <Facebook size={18} />
  </a>

  <a
    href="https://instagram.com"
    target="_blank"
    rel="noopener noreferrer"
    className="p-2.5 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-[#063c28] transition-all duration-300"
  >
    <Instagram size={18} />
  </a>

  <a
    href="https://x.com"
    target="_blank"
    rel="noopener noreferrer"
    className="p-2.5 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-[#063c28] transition-all duration-300"
  >
    <Twitter size={18} />
  </a>
</div>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4">Découvrir</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/produits" className="text-green-200 hover:text-yellow-400 transition">
                Tous les produits
              </Link>
            </li>
            <li>
              <Link href="/categories" className="text-green-200 hover:text-yellow-400 transition">
                Catégories
              </Link>
            </li>
            <li>
              <Link href="/marques" className="text-green-200 hover:text-yellow-400 transition">
                Marques
              </Link>
            </li>
            <li>
              <Link href="/vendeurs" className="text-green-200 hover:text-yellow-400 transition">
                Nos vendeurs
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4">Assistance</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/aide" className="text-green-200 hover:text-yellow-400 transition">
                Centre d'aide
              </Link>
            </li>
            <li>
              <Link href="/livraison" className="text-green-200 hover:text-yellow-400 transition">
                Livraison & retours
              </Link>
            </li>
            <li>
              <Link href="/conditions" className="text-green-200 hover:text-yellow-400 transition">
                Conditions d'utilisation
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="text-green-200 hover:text-yellow-400 transition">
                Confidentialité
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4">Restons en contact</h3>
          <ul className="space-y-3 text-sm mb-5">
            <li className="flex items-center gap-2 text-green-200">
              <Phone size={16} className="text-yellow-400 shrink-0" />
              +223 00 00 00 00
            </li>
            <li className="flex items-center gap-2 text-green-200">
              <Mail size={16} className="text-yellow-400 shrink-0" />
              contact@malisugu.com
            </li>
            <li className="flex items-center gap-2 text-green-200">
              <MapPin size={16} className="text-yellow-400 shrink-0" />
              Bamako, Mali
            </li>
          </ul>

          <form className="flex items-center bg-white/10 rounded-full overflow-hidden border border-white/10">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder-green-200 outline-none min-w-0"
            />
            <button
              type="submit"
              className="p-3 bg-yellow-400 text-[#063c28] hover:bg-yellow-300 transition shrink-0"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-green-200">
          <p>© {currentYear} MaliSugu. Tous droits réservés.</p>
          <p>Fièrement conçu et développé au Mali 🇲🇱</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;