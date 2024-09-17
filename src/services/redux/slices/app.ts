import { createSlice } from "@reduxjs/toolkit";

enum LANGUAGES {
  VI,
  EN,
  ZH,
}

type AIModal = {
  isOpen: boolean;
  type: "translate" | "generate_content";
};

type State = {
  language: LANGUAGES;
  aiModal: AIModal;
};

const initialState: State = {
  language: LANGUAGES.EN,
  aiModal: {
    isOpen: false,
    type: "translate",
  },
};

const appSlice = createSlice({
  name: "APP",
  initialState,
  reducers: {
    openAIModal: (state, action) => {
      state.aiModal = action.payload;
    },
  },
});

export const { openAIModal } = appSlice.actions;
export default appSlice.reducer;
