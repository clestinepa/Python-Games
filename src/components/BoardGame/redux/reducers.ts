import { createReducer } from "@reduxjs/toolkit";
import { BoardGameState } from "../interfaces/BoardGameState";
import { onAction, onCross, onEmpty, onFill } from "./actions";

const initialState: BoardGameState = {
  action: { onAction: false, onFill: true, onCross: false, onEmpty: false },
  level: {
    name: "test",
    difficulty: 1,
    size: 10,
    nb_fill: 52,
    clues: {
      column: [
        [1],
        [3, 2],
        [5, 3],
        [2, 5],
        [1, 4],
        [1, 4],
        [2, 5],
        [5, 3],
        [3, 2],
        [1],
      ],
      line: [[4], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [4], [6], [8], [10]],
    },
  },
  currentBoard: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
};

export const boardGameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(onAction, (state, action) => {
      state.action.onAction = action.payload;
    })
    .addCase(onFill, (state, action) => {
      state.action.onFill = action.payload;
    })
    .addCase(onCross, (state, action) => {
      state.action.onCross = action.payload;
    })
    .addCase(onEmpty, (state, action) => {
      state.action.onEmpty = action.payload;
    });
});
