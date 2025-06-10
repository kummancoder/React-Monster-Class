import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  products: [],
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter((id) => id != action.payload);
      state.quantity -= 1;
    },

    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
