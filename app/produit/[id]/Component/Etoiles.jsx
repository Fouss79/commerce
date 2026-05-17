// components/Etoiles.jsx
import React from "react";
// components/Etoiles.jsx
export default function Etoiles({ note }) {
  const total = 5;
  const fullStars = Math.floor(note);
  const halfStar = note % 1 >= 0.5;
  const emptyStars = total - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`}>★</span>
      ))}
      {halfStar && <span>☆</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`}>☆</span>
      ))}
    </div>
  );
}
