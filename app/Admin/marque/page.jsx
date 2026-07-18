"use client";

import { useState } from "react";
import FormMarque from "./Component/FormMarque";

export default function MarquePage() {
  const [editData, setEditData] = useState(null);

  const handleSuccess = () => {
    // rafraîchir la liste des marques, fermer le formulaire d'édition, etc.
    setEditData(null);
  };

  return (
    <div>
      <FormMarque onSuccess={handleSuccess} editData={editData} />
      {/* Si vous avez une liste de marques ailleurs, vous pouvez l'afficher ici
          et appeler setEditData(marque) au clic sur "Modifier" */}
    </div>
  );
}