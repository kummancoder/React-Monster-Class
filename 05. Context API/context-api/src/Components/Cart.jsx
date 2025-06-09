import React, { useContext } from "react";
import { ItemContext } from "./Context";

const Cart = () => {
  const { items, cart } = useContext(ItemContext);
  const filteredItems = items.filter((item) => cart.includes(item.id));
  return (
    <div className="flex flex-wrap justify-center items-center gap-6 p-6">
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="border rounded-xl shadow-md p-4 w-60 h-96 text-center relative"
        >
          <img
            src={item.image}
            alt={item.title}
            className="h-32 w-full object-contain mb-3"
          />
          <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
          <p className="text-green-600 font-bold mb-3">${item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
