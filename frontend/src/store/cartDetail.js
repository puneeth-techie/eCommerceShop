import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const cartItemsFromStorage = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];

const initialState = {
  cartItems: [],
};

const cartDetailSlice = createSlice({
  name: "cartDetail",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    },
  },
});

const { actions } = cartDetailSlice;

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = axios.get(`/api/products/${id}`);
  dispatch({
    type: actions.addItemToCart.toString(),
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartDetailSlice.name.cartItems)
  );
};
export default cartDetailSlice.reducer;
