import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/store/storeSlice";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import LoadingSkeleton from "./LoadingSkeleton";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const dispatch = useDispatch();
  const { products, quantity, loading, error } = useSelector((state) => {
    console.log("Full Redux state:", state);
    console.log("Productus slice:", state.store);
    return state.store;
  });
  const cart = useSelector((state) => state.cart.products);
  const cartProducts = products.filter((item) => cart.includes(item.id));

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);
  const cartHandler = (id) => {
    if (cart.includes(id)) dispatch(removeFromCart(id));
    else {
      dispatch(addToCart(id));
    }
  };

  if (cart.length === 0) return <EmptyCart />;

  return loading ? (
    <LoadingSkeleton />
  ) : (
    <div className="flex flex-wrap justify-center items-center gap-6 p-6">
      {cartProducts.map((item) => (
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
            {cart.includes(item.id) ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
