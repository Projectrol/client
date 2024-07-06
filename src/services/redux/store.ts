import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/app";
import workspaceReducer from "./slices/workspace";
import userReducer from "./slices/user";

export const store = configureStore({
  reducer: {
    app: appReducer,
    workspace: workspaceReducer,
    user: userReducer,
  },
  devTools: true,
});

export type State = ReturnType<typeof store.getState>;
