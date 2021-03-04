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
    removeItemFromCart: (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    },
  },
});

const { actions } = cartDetailSlice;

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
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
    JSON.stringify(getState().cartDetail.cartItems)
  );
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actions.removeItemFromCart.toString(),
    payload: id,
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartDetail.cartItems)
  );
};
export default cartDetailSlice.reducer;
