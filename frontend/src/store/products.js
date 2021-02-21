import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  loading: false,
  error: false,
};

const productSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    productFetchRequest: (state, action) => {
      state.loading = true;
      state.products = [];
    },
    productFetchRequestSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    productFetchRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { actions } = productSlice;
//console.log(actions.productFetchRequest.toString());

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actions.productFetchRequest.toString() });
    const { data } = await axios.get("/api/products");
    dispatch({
      type: actions.productFetchRequestSuccess.toString(),
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actions.productFetchRequestFailure.toString(),
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

export default productSlice.reducer;
