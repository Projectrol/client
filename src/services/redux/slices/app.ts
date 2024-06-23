import { createSlice } from "@reduxjs/toolkit";

enum LANGUAGES {
  VI,
  EN,
  ZH,
}

type State = {
  language: LANGUAGES;
};

const initialState: State = {
  language: LANGUAGES.EN,
};

const appSlice = createSlice({
  name: "APP",
  initialState,
  reducers: {},
});

export default appSlice.reducer;
