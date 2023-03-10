import { createReducer } from "@reduxjs/toolkit";
import { BoardGameState } from "../interfaces/BoardGameState";
import { crossZone, emptyZone, fillZone } from "./actions";

const initialState: BoardGameState = {
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
    .addCase(fillZone, (state, action) => {
      state.currentBoard[action.payload.line][action.payload.column] = 1;
    })
    .addCase(crossZone, (state, action) => {
      state.currentBoard[action.payload.line][action.payload.column] = 2;
    })
    .addCase(emptyZone, (state, action) => {
      state.currentBoard[action.payload.line][action.payload.column] = 0;
    })
});