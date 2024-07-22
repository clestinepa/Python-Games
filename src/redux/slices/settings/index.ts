import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface SettingsState {
    onGame: Boolean,
    boardLoad:Boolean,
}

const initialState: SettingsState = { onGame: true, boardLoad: false };

const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState,
  reducers: {
    boardIsInitialized(state) {
        state.boardLoad = true;
    },
  },
});

export const selectSettings = (state: RootState) => state.settingsState;

export const { boardIsInitialized } = settingsSlice.actions;
export default settingsSlice.reducer;
