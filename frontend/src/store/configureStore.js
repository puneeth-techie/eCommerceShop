import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import productList from "./productList";
import productDetail from "./productDetail";
import cartDetail from "./cartDetail";
import authDetail from "./authDetail";

const middlewares = [];

const reducer = combineReducers({
  productList,
  productDetail,
  cartDetail,
  authDetail,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cartDetail: { cartItems: cartItemsFromStorage },
  authDetail: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer,
  initialState,
  middleware: [...getDefaultMiddleware(), ...middlewares],
});

export default store;
