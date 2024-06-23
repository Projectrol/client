import { Workspace } from "@/db/repositories/workspaces.repo";
import { createSlice } from "@reduxjs/toolkit";

type State = {
  workspace: Workspace | null;
};

const initialState: State = {
  workspace: null,
};

const workspaceSlice = createSlice({
  name: "WORKSPACE",
  initialState,
  reducers: {
    setWorkspace(state, action: { payload: Workspace }) {
      state.workspace = action.payload;
    },
  },
});

export const { setWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
