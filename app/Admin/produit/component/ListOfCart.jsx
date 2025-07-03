import React from "react";


const ListOfCart = ({ cartItems }) => {
  return (
    <div className="cart">
      <h2>🛒 Cart ({cartItems.length})</h2>

      <div >
        {cartItems.map((item) => (
          <div  key={item.id}>
            <div ><img src={item.image} alt={item.nom} /></div>
            <div >ID: {item.id}</div>
            <div>Name: {item.nom}</div>
            <div >Price: {item.prix}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfCart;
