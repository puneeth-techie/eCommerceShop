import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import productList from "../store/products";

const middlewares = [];

const reducer = combineReducers({
  productList,
});

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), ...middlewares],
});

export default store;
