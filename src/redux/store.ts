import { configureStore } from "@reduxjs/toolkit";
import { actionReducer } from "../components/Level/ActionButton/redux";
import { levelReducer } from "../components/Level/redux";

export const store = configureStore({
  reducer: {
    actionAPI: actionReducer,
    levelAPI: levelReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
