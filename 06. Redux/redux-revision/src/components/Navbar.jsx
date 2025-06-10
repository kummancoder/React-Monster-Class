import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const cartCount = useSelector((state) => state.cart.quantity);
  return (
    <nav className=" max-w-5xl mx-auto bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <NavLink to="/store">
        <div className="text-xl font-bold text-green-600">MyStore</div>
      </NavLink>
      {/* Center Menu */}

      <NavLink to="/store">
        <div className="text-gray-700 font-medium text-lg">Store</div>
      </NavLink>
      {/* Cart Button */}
      <NavLink to="/cart">
        <div className="relative">
          <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full">
            🛒 Cart
            {cartCount > 0 && (
              <span className="bg-white text-green-600 text-sm font-semibold px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </NavLink>
    </nav>
  );
};

export default Navbar;
