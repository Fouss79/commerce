import React from 'react'


const Page = () => {

  
  return( <main className='p-10'>








    <h2 className="mt-2 px-10">TABLEAU DE BORD</h2>

    
    <div className="flex-1 p-8">
      <h2 className="text-3xl font-semibold mb-4">Bienvenue sur votre tableau de bord</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[red] p-6 rounded-lg shadow-lg text-white">
          <h2 className="text-xl  font-medium">Statistique 1</h2>
          <p>Contenu de la statistique 1</p>
        </div>
        <div className="bg-[blue] p-6 rounded-lg shadow-lg text-white">
          <h2 className="text-xl font-medium">Statistique 2</h2>
          <p>Contenu de la statistique 2</p>
        </div>
        <div className="bg-[green] p-6 rounded-lg shadow-lg text-white">
          <h2 className="text-xl font-medium">Statistique 3</h2>
          <p>Contenu de la statistique 3</p>
        </div>
      </div>
    </div>
  

  </main>)
}

export default Page