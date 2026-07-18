"use client";

export default function HeroLumiere() {
  return (
     <main className="w-full overflow-x-hidden bg-white"> 
    <section className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#f7f3ee] overflow-hidden">

      {/* LEFT TEXT */}
      <div className="flex flex-col justify-center px-6 md:px-20 py-16">
        
        <span className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">
          Collection 2026 — Luxe Moderne
        </span>

        <h1 className="text-4xl md:text-6xl font-light leading-tight font-serif text-[#0d6b49]">
          L’élégance <br />
          <span className="italic text-[#c9a96e]">intemporelle</span> <br />
          redéfinie
        </h1>

        <p className="mt-6 text-[#8a7d72] max-w-md leading-relaxed">
          Découvrez une nouvelle vision de la mode moderne, où chaque pièce est pensée
          pour sublimer votre style avec simplicité, luxe et authenticité.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-10 flex-wrap">
          <button className="px-6 py-3 bg-[#1a1410] text-white text-sm tracking-widest uppercase hover:bg-[#c9a96e] transition">
            Découvrir
          </button>

          <button className="px-6 py-3 border border-[#1a1410] text-[#1a1410] text-sm tracking-widest uppercase hover:bg-[#1a1410] hover:text-white transition">
            Notre histoire
          </button>
        </div>

        {/* small note */}
        <p className="mt-8 text-xs text-[#8a7d72]">
          +1000 clients satisfaits • Livraison rapide • Qualité premium
        </p>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative h-[400px] md:h-auto">
        
        <div className="absolute inset-0 bg-gradient-to-br from-[#c8b8a2] via-[#a89070] to-[#8a6f52]" />

        {/* decorative blur */}
        <div className="absolute w-80 h-80 bg-white/10 rounded-full blur-3xl top-10 right-10"></div>
        <div className="absolute w-80 h-80 bg-[#c9a96e]/20 rounded-full blur-3xl bottom-10 left-10"></div>

        {/* image */}
        <img
          src="/fem2.png"
          alt="Fashion"
          className="relative z-10 w-full h-full object-contain p-10 hover:scale-105 transition duration-700"
        />

        {/* price tag */}
        <div className="absolute bottom-10 left-10 bg-white/80 backdrop-blur px-6 py-3 border border-[#e8dfd4]">
          <p className="text-xs uppercase tracking-widest text-gray-500">
            Pièce signature
          </p>
          <p className="text-xl font-serif text-[#c9a96e]">€ 1 290</p>
        </div>
      </div>
    </section>
    
<section className="grid md:grid-cols-2 items-center gap-10 px-6 md:px-12 py-20 md:py-24 max-w-7xl mx-auto relative overflow-hidden bg-gradient-to-br from-white via-pink-50 to-yellow-50">

  {/* décor fond */}
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl"></div>
  <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-yellow-200/40 rounded-full blur-3xl"></div>

  {/* LEFT */}
  <div className="relative z-10">

    {/* badge */}
    <span className="inline-block text-xs tracking-[0.3em] uppercase text-pink-600 mb-6">
      Nouvelle collection 2026
    </span>

    {/* title */}
    <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
      Révélez votre style <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">
        avec élégance
      </span>
    </h2>

    {/* description */}
    <p className="mt-6 text-gray-600 text-lg max-w-md leading-relaxed">
      Découvrez une sélection exclusive de vêtements et accessoires pensés pour sublimer votre quotidien.
      Style, confort et qualité réunis dans une seule expérience.
    </p>

    {/* buttons */}
    <div className="flex gap-4 mt-10 flex-wrap">
      <button className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition">
        Acheter maintenant
      </button>

      <button className="px-6 py-3 border border-gray-300 text-gray-800 rounded-xl hover:bg-gray-100 transition">
        Voir la collection
      </button>
    </div>

    {/* small info */}
    <p className="text-sm text-gray-400 mt-6">
      Livraison rapide • Produits premium • Paiement sécurisé
    </p>

  </div>

  {/* RIGHT IMAGE */}
  <div className="relative flex justify-center items-center">

    {/* glow */}
    <div className="absolute w-80 h-80 bg-pink-200/30 rounded-full blur-3xl"></div>

    {/* image */}
    <div
      className="w-full h-[420px] md:h-[600px] bg-contain bg-no-repeat bg-center relative z-10 hover:scale-105 transition duration-700"
      style={{ backgroundImage: "url('/fn.png')" }}
    />

    {/* floating badge */}
    <div className="absolute bottom-10 right-10 bg-white/80 backdrop-blur px-5 py-3 shadow-lg border">
      <p className="text-xs uppercase tracking-widest text-gray-500">
        Best Seller
      </p>
      <p className="text-lg font-semibold text-black">
        Collection Premium
      </p>
    </div>

  </div>

</section>
           <section className="w-full max-w-7xl mx-auto  overflow-hidden shadow-2xl  relative group">

  {/* IMAGE BACKGROUND */}
  <div className="relative h-[400px] md:h-[500px] overflow-hidden">
   <img
  src="/nike.jpg"
  alt="Collection hiver"
  className="w-[95%] h-[95%] object-contain mx-auto transition-transform duration-700 group-hover:scale-110"
/>

    {/* OVERLAY DARK */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

    {/* CONTENU TEXTE */}
    <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 text-white">

      <h2 className="text-3xl md:text-6xl font-extrabold mb-4 animate-fadeIn">
        COLLECTION NIKE 2026
      </h2>

      <p className="text-lg md:text-xl max-w-xl mb-6 text-gray-200 animate-fadeIn delay-200">
        Style, confort et performance. Découvrez nos nouveaux survêtements
        conçus pour vous démarquer.
      </p>

      <div className="flex gap-4 flex-wrap animate-fadeIn delay-300">
        <button className="
          px-6 py-3 rounded-xl
          bg-white text-black font-semibold
          hover:bg-gray-200 transition duration-300
        ">
          Acheter maintenant
        </button>

        <button className="
          px-6 py-3 rounded-xl
          border border-white/50
          hover:bg-white/10 transition duration-300
        ">
          Voir plus
        </button>
      </div>

    </div>
   
   
  </div>

  {/* SECTION PRODUITS EN BAS */}
 

</section>

<section className="w-full max-w-6xl mx-auto 
 
shadow-xl flex flex-col md:flex-row items-center overflow-hidden">

  {/* IMAGE GAUCHE */}
  <div className="w-full md:w-1/3 h-[300px] md:h-[400px] overflow-hidden">
    <img
      src="/survetement.png"
      alt="Survêtement"
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
    />
  </div>

  {/* TEXTE */}
  <div className="w-full md:w-1/3  px-6 md:px-10 py-8 text-center md:text-left flex flex-col justify-center">
    
    <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 leading-snug mb-4">
      Nouveaux survêtements
    </h2>

    <p className="text-gray-600 mb-6">
      Découvrez notre collection hiver avec des designs modernes,
      confortables et élégants.
    </p>

    <button className="
      px-6 py-3 rounded-xl
      bg-gradient-to-r from-gray-700 to-white
      text-white font-semibold
      shadow-lg
      hover:scale-105 transition duration-300
    ">
      Découvrir la collection
    </button>

  </div>

  {/* IMAGE DROITE */}
  <div className="w-full md:w-1/3 h-[300px] md:h-[400px] overflow-hidden">
    <img
      src="/survet.png"
      alt="Survêtement 2"
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
    />
  </div>

</section>


    </main>

   

  );
}