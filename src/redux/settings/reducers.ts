import { createReducer } from "@reduxjs/toolkit";
import { SettingsState } from "../../components/Game/interfaces/LevelState";
import { boardIsInitialized } from "./actions";

const initialState: SettingsState = {
  onGame: true,
  boardLoad:false,

};

export const settingsReducer = createReducer(initialState, (builder) => {
  builder.addCase(boardIsInitialized, (state) => {
    state.boardLoad = true;
  });
});
