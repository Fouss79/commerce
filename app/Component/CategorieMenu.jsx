import React from 'react';
import Link from 'next/link';

 const CategorieMenu = () => {
    const categorieList = [
        {
            nom: 'Vetements',
            Link: '/',
        },
        {
            nom: 'Chaussure',
            Link: '/Chaussure',
        },
        {
            nom: 'Telephone',
            Link: '/Telephone',
        },
    ];

    return (
        <div className="bg-green-500 text-white py-6 ">
            <h2 className="text-white font-bold mb-4 flex justify-center text-4xl">
    OFFRE SPECIALE -50%</h2>
           <div className="flex h-20 gap-5 px-6 font-bold items-end">Decouvrir:
                {categorieList.map((cat) => (
                    <Link key={cat.Link} href={cat.Link}>
                        <button className="text-white hover:underline">{cat.nom}</button>
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default CategorieMenu