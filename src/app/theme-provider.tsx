"use client";

import useTheme from "@/hooks/useTheme";
import { State } from "@/services/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { setTheme } = useTheme();
  const userSlice = useSelector((state: State) => state.user);

  useEffect(() => {
    if (userSlice?.user) {
      const theme = userSlice.user.settings.theme;
      if (!theme) {
        setTheme("LIGHT");
        return;
      }
      setTheme(theme);
    } else {
      setTheme("LIGHT");
    }
  }, [userSlice, setTheme]);

  return children;
};

export default ThemeProvider;
