import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ItemContext } from "./Context";

const Navbar = () => {
  const { cart } = useContext(ItemContext);
  return (
    <div className="mx-auto max-w-3xl flex bg-slate-400 justify-around items-center p-[8px] m-3">
      <h1 className="font-bold text-2xl text-white">Nukkad</h1>
      <NavLink to={"/store"} className="text-white text-lg">
        Store
      </NavLink>
      <NavLink to={"/cart"}>
        <button className="bg-blue-600 p-2 rounded-lg">Cart</button>{" "}
        <h2 className="inline">{cart.length}</h2>{" "}
      </NavLink>
    </div>
  );
};

export default Navbar;
