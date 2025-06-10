import React from "react";
import { Routes, Route } from "react-router-dom";
import Store from "../components/Store";
import Cart from "../components/Cart";

const Routing = () => {
  return (
    <Routes>
      <Route path="/store" element={<Store />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default Routing;
