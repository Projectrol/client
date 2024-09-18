import { createSlice } from "@reduxjs/toolkit";

enum LANGUAGES {
  VI,
  EN,
  ZH,
}

export type AIModal = {
  isOpen: boolean;
  type: "translate" | "generate_project_des" | "generate_task_des";
  position: {
    x: number;
    y: number;
  }
  response?: string;
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
    position: {
      x: 0,
      y: 0
    }
  },
};

const appSlice = createSlice({
  name: "APP",
  initialState,
  reducers: {
    openAIModal: (state, action: { payload: AIModal }) => {
      state.aiModal = action.payload;
    },
    closeAIModal: (state) => {
      state.aiModal = {
        isOpen: false,
        type: "translate",
        position: {
          x: 0,
          y: 0
        }
      }
    },
    setOpenAIModalResponse: (state, action: { payload: string }) => {
      state.aiModal = { ...state.aiModal, response: action.payload };
    },
  },
});

export const { openAIModal, closeAIModal, setOpenAIModalResponse } = appSlice.actions;
export default appSlice.reducer;
