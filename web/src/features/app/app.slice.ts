import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  isAppLoaded: false,
  company: undefined,
};

const appSlice = createSlice({
  name: "APP_SLICE",
  initialState,
  reducers: {
    setAppLoaded(state) {
      state.isAppLoaded = true;
    },
    setRoute(state, { payload }: PayloadAction<any>) {
      state.route = payload;
    },
    clearRoute(state) {
      state.route = undefined;
    },
  },
});

export const { setAppLoaded, setRoute, clearRoute } = appSlice.actions;

export const appReducer = appSlice.reducer;
