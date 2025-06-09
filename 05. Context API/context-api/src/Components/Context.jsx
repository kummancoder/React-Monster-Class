import React, { createContext, useState } from "react";

export const ItemContext = createContext();

const Context = (props) => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  return (
    <ItemContext.Provider value={{ items, setItems, cart, setCart }}>
      {props.children}
    </ItemContext.Provider>
  );
};

export default Context;
