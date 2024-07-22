type ButtonColor = {
  bg: string;
  color: string;
};

export enum LAYOUT_COLORS {
  BASE = "BASE",
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  "HOVER-BG" = "HOVER-BG",
  "SELECTED-OK-BG" = "SELECTED-OK-BG",
  "SELECTED-BG" = "SELECTED-BG",
  "BORDER-COLOR" = "BORDER-COLOR",
  "MODAL-BG" = "MODAL-BG",
}

export enum BUTTON_TYPES {
  OK = "OK",
  CANCEL = "CANCEL",
  DELETE = "DELETE",
}

export type ColorTheme = {
  layoutColors: { [key in LAYOUT_COLORS]: string };
  buttonColors: { [key in BUTTON_TYPES]: ButtonColor };
};

const defaultButtonColors: { [key in BUTTON_TYPES]: ButtonColor } = {
  OK: {
    color: "#FFFFFF",
    bg: "#077368",
  },
  CANCEL: {
    color: "#121212",
    bg: "#E0E0E0",
  },
  DELETE: {
    color: "#FFFFFF",
    bg: "#DF2029",
  },
};

export const baseThemes: { [key: string]: ColorTheme } = {
  DARK: {
    layoutColors: {
      BASE: "#fefefe",
      PRIMARY: "#18191a",
      SECONDARY: "#242526",
      "SELECTED-OK-BG": "rgba(7,115,104,0.3)",
      "HOVER-BG": "rgba(255,255,255,0.05)",
      "SELECTED-BG": "rgba(255,255,255,0.1)",
      "BORDER-COLOR": "rgba(255,255,255,0.05)",
      "MODAL-BG": "#282a2e",
    },
    buttonColors: defaultButtonColors,
  },
  LIGHT: {
    layoutColors: {
      BASE: "#4e515a",
      SECONDARY: "#ffffff",
      PRIMARY: "#f9f8f8",
      "SELECTED-OK-BG": "rgba(7,115,104,0.2)",
      "HOVER-BG": "rgba(0,0,0,0.05)",
      "SELECTED-BG": "#e4e5f1",
      "BORDER-COLOR": "rgba(0,0,0,0.1)",
      "MODAL-BG": "#ffffff",
    },
    buttonColors: defaultButtonColors,
  },
};
