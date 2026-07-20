import localFont from "next/font/local";
import "./globals.css";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import LayoutContent from "./LayoutContent";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata = {
  title: "MaliSugu - Marketplace malienne",

  description:
    "Achetez et vendez facilement au Mali avec MaliSugu.",

  keywords: [
    "MaliSugu",
    "Marketplace Mali",
    "achat en ligne Mali",
    "vente Mali",
  ],

  openGraph: {
    title: "MaliSugu - Marketplace malienne",

    description:
      "Achetez et vendez facilement au Mali avec MaliSugu.",

    url: "https://ton-projet.vercel.app",

    siteName: "MaliSugu",

    locale: "fr_FR",

    type: "website",

    images: [
      {
        url: "https://ton-projet.vercel.app/imm1.png",
        width: 1200,
        height: 630,
        alt: "MaliSugu Marketplace",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MaliSugu - Marketplace malienne",
    description:
      "Achetez et vendez facilement au Mali avec MaliSugu.",
    images: [
      "https://commerce-5xy4.vercel.app/imm1.png"
    ],
  },
};



export default function RootLayout({ children }) {

  return (
    <html lang="fr">

      <body className={geistSans.variable}>

        <AuthProvider>
          <CartProvider>

            <LayoutContent>
              {children}
            </LayoutContent>

          </CartProvider>
        </AuthProvider>

      </body>

    </html>
  );
}