import {
  WorkspaceDetails,
  WorkspaceRole,
} from "@/services/api/workspaces-service";
import { createSlice } from "@reduxjs/toolkit";

type State = {
  workspace: WorkspaceDetails | null;
  workspaceRoles: WorkspaceRole[];
};

const initialState: State = {
  workspace: null,
  workspaceRoles: [],
};

const workspaceSlice = createSlice({
  name: "WORKSPACE",
  initialState,
  reducers: {
    setWorkspace(state, action: { payload: WorkspaceDetails | null }) {
      state.workspace = action.payload;
    },
    setWorkspaceRoles(state, action: { payload: WorkspaceRole[] }) {
      state.workspaceRoles = action.payload;
    },
  },
});

export const { setWorkspace, setWorkspaceRoles } = workspaceSlice.actions;
export default workspaceSlice.reducer;
