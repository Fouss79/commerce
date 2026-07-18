"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaToolbox,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";

import {
  MdDashboard,
  MdCollections,
} from "react-icons/md";

import { BiCategory } from "react-icons/bi";

const menuList = [
  {
    nom: "Dashboard",
    link: "/Admin",
    icon: <MdDashboard size={20} />,
  },
  {
    nom: "Produits",
    link: "/Admin/produit",
    icon: <FaToolbox size={18} />,
  },
  {
    nom: "Catégories",
    link: "/Admin/categorie",
    icon: <BiCategory size={20} />,
  },
  {
    nom: "Collections",
    link: "/Admin/collections",
    icon: <MdCollections size={20} />,
  },
  {
    nom: "Commandes",
    link: "/Admin/commandes",
    icon: <FaShoppingCart size={18} />,
  },
  {
    nom: "Abonnements",
    link: "/Admin/abonnements",
    icon: <FaUser size={18} />,
  },
  {
    nom: "Accueil",
    link: "/",
    icon: <MdCollections size={20} />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[270px] h-screen bg-white border-r shadow-lg flex flex-col">

      {/* LOGO */}
      <div className="h-20 flex items-center justify-center border-b">
        <img
          src="/imm.png"
          alt="Logo"
          className="h-12 object-contain"
        />
      </div>

      {/* MENU */}
      <nav className="flex-1 overflow-y-auto p-4">

        <p className="text-xs uppercase text-gray-400 font-semibold px-3 mb-4">
          Administration
        </p>

        <ul className="space-y-2">
          {menuList.map((menu) => {
            const active =
              pathname === menu.link ||
              (menu.link !== "/Admin" &&
                pathname.startsWith(menu.link));

            return (
              <li key={menu.link}>
                <Link
                  href={menu.link}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  
                  ${
                    active
                      ? "bg-[#15878f] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                  
                  `}
                >
                  <span>{menu.icon}</span>

                  <span className="font-medium">
                    {menu.nom}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* FOOTER */}
      <div className="border-t p-4">
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-sm font-semibold text-gray-800">
            Admin Panel
          </p>
          <p className="text-xs text-gray-500">
            Gestion de la plateforme
          </p>
        </div>
      </div>

    </aside>
  );
}