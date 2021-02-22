import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  loading: false,
  error: false,
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    productListRequest: (state, action) => {
      state.loading = true;
      state.products = [];
    },
    productListRequestSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    productListRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { actions } = productListSlice;
//console.log(actions.productListRequest.toString());

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actions.productListRequest.toString() });
    const { data } = await axios.get("/api/products");
    dispatch({
      type: actions.productListRequestSuccess.toString(),
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actions.productListRequestFailure.toString(),
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

export default productListSlice.reducer;
