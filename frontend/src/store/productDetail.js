import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: {
    reviews: [],
  },
  loading: false,
  error: false,
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    productDetailRequest: (state, action) => {
      state.loading = true;
      state.product = { ...state };
    },
    productDetailRequestSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    productDetailRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { actions } = productDetailSlice;

export const listProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.productDetailRequest.toString() });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: actions.productDetailRequestSuccess.toString(),
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actions.productDetailRequestFailure,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

export default productDetailSlice.reducer;
