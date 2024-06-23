import { BUTTON_TYPES, LAYOUT_COLORS, baseThemes } from "@/configs/themes";
import { getCookie, setCookie } from "cookies-next";

const useTheme = () => {
  const setTheme = (theme: "DARK" | "LIGHT") => {
    setCookie("COLOR_THEME", theme);

    Object.keys(baseThemes[theme].layoutColors).forEach((_) => {
      Object.entries(LAYOUT_COLORS).forEach(([_, type], i) => {
        const variableName = `--${type.toLowerCase()}`;
        document.body.style.setProperty(
          `${variableName}`,
          baseThemes[theme].layoutColors[type]
        );
      });
    });

    Object.keys(baseThemes[theme].buttonColors).forEach((_) => {
      Object.entries(BUTTON_TYPES).forEach(([_, type], i) => {
        const variableName = `--btn-${type.toLowerCase()}`;
        document.body.style.setProperty(
          `${variableName}-color`,
          baseThemes[theme].buttonColors[type].color
        );
        document.body.style.setProperty(
          `${variableName}-bg`,
          baseThemes[theme].buttonColors[type].bg
        );
      });
    });
  };

  const getTheme = (): "DARK" | "LIGHT" | undefined => {
    const themeValue = getCookie("COLOR_THEME");
    if (themeValue) {
      return themeValue as "DARK" | "LIGHT";
    }
    return undefined;
  };

  return {
    setTheme,
    getTheme,
  };
};

export default useTheme;
