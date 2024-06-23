"use client";

import useTheme from "@/hooks/useTheme";
import { useEffect } from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { getTheme, setTheme } = useTheme();

  useEffect(() => {
    const theme = getTheme();
    if (!theme) {
      setTheme("LIGHT");
      return;
    }
    setTheme(theme);
  }, [getTheme, setTheme]);

  return children;
};

export default ThemeProvider;
