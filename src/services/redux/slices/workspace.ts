import {
  WorkspaceDetails,
  WorkspaceMember,
  WorkspaceRole,
} from "@/services/api/workspaces-service";
import { createSlice } from "@reduxjs/toolkit";

type State = {
  workspace: WorkspaceDetails | null;
  workspaceRoles: WorkspaceRole[];
  workspaceMembers: WorkspaceMember[];
};

const initialState: State = {
  workspace: null,
  workspaceRoles: [],
  workspaceMembers: [],
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
    setWorkspaceMembers(state, action: { payload: WorkspaceMember[] }) {
      state.workspaceMembers = action.payload;
    },
  },
});

export const { setWorkspace, setWorkspaceRoles, setWorkspaceMembers } =
  workspaceSlice.actions;
export default workspaceSlice.reducer;
