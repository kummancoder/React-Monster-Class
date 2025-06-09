import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Store from "./Store";
import Cart from "./Cart";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/store" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default Routing;
