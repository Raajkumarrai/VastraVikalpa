// store.js

import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import subcategoryReducer from "./slices/subCategorySlice";
import carouselReducer from "./slices/carouselSlice";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import messageReducer from "./slices/messageSlice";
import orderReducer from "./slices/orderSlice";
import userDetailReducer from "./slices/userDetailSlice";
import statisticsReducer from "./slices/statisticsSlice";
import targetReducer from "./slices/targetSlice";

export default function makeStore() {
  return configureStore({
    reducer: {
      authReducer,
      categoryReducer,
      subcategoryReducer,
      carouselReducer,
      productReducer,
      messageReducer,
      orderReducer,
      userDetailReducer,
      statisticsReducer,
      targetReducer,
    },
  });
}

export const store = makeStore();
