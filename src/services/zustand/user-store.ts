import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "../api/users-service";
import { Permission } from "../api/workspaces-service";

type UserStore = {
  user: User | null;
  permissions: Permission[];
  setUser: (newUser: User | null) => void;
  setPermissions: (newPermissions: Permission[]) => void;
};

export const useUserStore = create<UserStore>()(
  devtools((set) => ({
    user: null,
    permissions: [],
    setUser: (newUser: User | null) => set({ user: newUser }),
    setPermissions: (newPermissions) => set({ permissions: newPermissions }),
  }))
);
