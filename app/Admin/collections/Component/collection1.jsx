export default function Collection1({ collection }) {
    return (
      <div className="mt-6 border p-4 rounded shadow">
        <h2 className="text-xl font-bold">{collection.titre}</h2>
        <p className="mt-2">{collection.marque?.description}</p>
        <img
          src={`http://localhost:8080/uploads/${collection.marqueImage}`}

          alt={collection.marque?.nom}
          className="w-48 mt-2"
        />
      </div>
    );
  }
  