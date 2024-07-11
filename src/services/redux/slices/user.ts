import { User } from "@/services/api/users-service";
import { Permission } from "@/services/api/workspaces-service";
import { createSlice } from "@reduxjs/toolkit";

type State = {
  user: User | null;
  permissions: Permission[];
};

const initialState: State = {
  user: null,
  permissions: [],
};

const userSlice = createSlice({
  name: "USER",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setPermissions(state, action: { payload: Permission[] }) {
      state.permissions = action.payload;
    },
  },
});

export const { setUser, setPermissions } = userSlice.actions;
export default userSlice.reducer;
