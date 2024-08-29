import { configureStore } from "@reduxjs/toolkit";
import IncrementDecrementReducer from "../Action/IncreDecreSlice";
import thunk from "redux-thunk"


const store = configureStore({
  reducer: {
    incrementDecrement: IncrementDecrementReducer,
  },
});

export default store;
