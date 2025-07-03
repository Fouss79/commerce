/** @type {import('next').NextConfig} */
const nextConfig = {
    // Désactiver complètement les Dev Tools UI de Next.js
    devtools: false,
  
    // Désactiver les indicateurs de build (facultatif)
    devIndicators: false,
  
    // Autres options si tu veux les garder ici
    experimental: {
      serverActions: true, // facultatif selon ton usage
    },
  };
  
  export default nextConfig;
  