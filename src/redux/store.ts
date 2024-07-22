import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./slices/settings";
import gameReducer from "./slices/game";
import actionReducer from "./slices/action";

export const store = configureStore({
  reducer: {
    settingsState: settingsReducer,
    gameState: gameReducer,
    actionState: actionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
