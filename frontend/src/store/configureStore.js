import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import productList from "./productList";
import productDetail from "./productDetail";
import cartDetail from "./cartDetail";

const middlewares = [];

const reducer = combineReducers({
  productList,
  productDetail,
  cartDetail,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cartDetail: { cartItems: cartItemsFromStorage },
};

const store = configureStore({
  reducer,
  initialState,
  middleware: [...getDefaultMiddleware(), ...middlewares],
});

export default store;
