import { configureStore } from "@reduxjs/toolkit";
import { actionReducer } from "../components/Game/ActionButton/redux";
import { gameReducer } from "../components/Game/redux";
import { settingsReducer } from "./settings";

export const store = configureStore({
  reducer: {
    actionAPI: actionReducer,
    settingsAPI : settingsReducer,
    gameAPI: gameReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
