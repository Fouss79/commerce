"use client";

import { useState } from "react";
import FormMarque from "./Component/FormMarque";

import ListeMarques from "./Component/ListeMarques";

export default function PageMarques() {

  const [editData, setEditData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="grid lg:grid-cols-3 gap-6">

      <FormMarque
        editData={editData}
        onSuccess={() => {
          setEditData(null);
          setRefresh(!refresh);
        }}
      />

      <div className="lg:col-span-2">

        <ListeMarques
          refresh={refresh}
          onEdit={(marque) => setEditData(marque)}
        />

      </div>

    </div>
  );
}