import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import storeReducer from "../features/store/storeSlice";

const store = configureStore({
  reducer: { cart: cartReducer, store: storeReducer },
});

export default store;
