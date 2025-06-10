import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  products: [],
  quantity: 0,
  loading: false,
  error: null,
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.products = action.payload;
      state.quantity = action.payload.length;
      state.loading = false;
    },
    fetchFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = storeSlice.actions;
export default storeSlice.reducer;

// ✅ Async thunk action
export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(fetchStart());
    const response = await axios.get("/products");
    dispatch(fetchSuccess(response.data));
  } catch (error) {
    dispatch(fetchFailure(error.message));
  }
};
