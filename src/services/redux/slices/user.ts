import { User } from "@/services/api/users-service";
import { createSlice } from "@reduxjs/toolkit";

type State = {
  user: User | null;
};

const initialState: State = {
  user: null,
};

const userSlice = createSlice({
  name: "USER",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
