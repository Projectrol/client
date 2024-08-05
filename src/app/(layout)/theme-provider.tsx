"use client";

import useTheme from "@/hooks/useTheme";
import { useUserStore } from "@/services/zustand/user-store";
import { useEffect } from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { setTheme } = useTheme();
  const userStore = useUserStore();

  useEffect(() => {
    if (userStore?.user) {
      const theme = userStore.user.settings.theme;
      if (!theme) {
        setTheme("LIGHT");
        return;
      }
      setTheme(theme);
    } else {
      setTheme("LIGHT");
    }
  }, [userStore, setTheme]);

  return children;
};

export default ThemeProvider;
