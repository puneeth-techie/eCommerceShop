import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import productList from "./productList";
import productDetail from "./productDetail";

const middlewares = [];

const reducer = combineReducers({
  productList,
  productDetail,
});

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), ...middlewares],
});

export default store;
