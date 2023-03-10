import { createReducer } from "@reduxjs/toolkit";
import { LevelState } from "../interfaces/LevelState";
import { setNameLevel } from "./actions";

const initialState: LevelState = {
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
};


export const levelReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setNameLevel, (state, action) => {
      state.level.name = action.payload.new_name;
    })
});