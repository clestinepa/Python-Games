import { configureStore } from "@reduxjs/toolkit";
import { actionReducer } from "../components/BoardGame/ActionButton/redux";
import { boardGameReducer } from "../components/BoardGame/redux";

export const store = configureStore({
  reducer: {
    actionAPI: actionReducer,
    boardGame: boardGameReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch