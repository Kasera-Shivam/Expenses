import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const store = configureStore({
  reducer: {
    user: reducer.userReducer,
    category: reducer.categoryReducer,
    transaction: reducer.transactionReducer,
  },
});

export default store;
