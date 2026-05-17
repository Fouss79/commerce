"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Heart,
  MapPin,
  User,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    label: "Tableau de bord",
    href: "/User",
    icon: LayoutDashboard,
  },
  {
    label: "Mes commandes",
    href: "/User/commandes",
    icon: Package,
  },
  {
    label: "Mes favoris",
    href: "/User/favoris",
    icon: Heart,
  },
  {
    label: "Mes adresses",
    href: "/User/adresses",
    icon: MapPin,
  },
  {
    label: "Mon profil",
    href: "/User/profil",
    icon: User,
  },
];

export default function UserSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-72 bg-white rounded-3xl shadow-xl p-6 h-fit lg:sticky lg:top-24">
      <h2 className="text-2xl font-bold text-[#063c28] mb-6">
        Mon compte
      </h2>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href 

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                active
                  ? "bg-[#063c28] text-white shadow-lg"
                  : "text-gray-700 hover:bg-green-50 hover:text-[#063c28]"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        className="mt-8 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-red-200 text-red-600 hover:bg-red-50 transition"
      >
        <LogOut size={18} />
        Déconnexion
      </button>
    </aside>
  );
}