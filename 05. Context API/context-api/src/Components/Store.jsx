import React, { useContext, useEffect } from "react";
import { ItemContext } from "./Context";
import axios from "./Axios";

const Store = () => {
  const { items, setItems, cart, setCart } = useContext(ItemContext);

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    axios
      .get("/products")
      .then((res) => {
        if (res.data) {
          setItems(res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  const cartHandler = (id) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-6 p-6">
      {items.map((item) => (
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
          <button
            onClick={() => cartHandler(item.id)}
            className={`px-4 py-2 rounded absolute bottom-[15px] right-[25%] text-white ${
              cart.includes(item.id)
                ? "bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {cart.includes(item.id) ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Store;
