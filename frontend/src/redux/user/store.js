import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./UserSlice";
import { createLogger } from "redux-logger";
import { thunk } from "redux-thunk";

const logger = createLogger();

const thunkMiddleware = thunk;

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (generalDefaultMiddleware) =>
    generalDefaultMiddleware().concat(logger).concat(thunkMiddleware),
});

store.subscribe(() =>
  sessionStorage.setItem("state", JSON.stringify(store.getState()))
);

export default store;
