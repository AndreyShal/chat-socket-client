import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
// import { messagesApi } from "./messagesApi";
import { usersApi } from "./usersApi";
// import posts from "./posts";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    // posts,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware),
  devTools: true,
});

export const useStoreDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;
