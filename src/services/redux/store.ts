import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/app";
import workspaceReducer from "./slices/workspace";

export const store = configureStore({
  reducer: {
    app: appReducer,
    workspace: workspaceReducer,
  },
  devTools: true,
});

export type State = ReturnType<typeof store.getState>;
