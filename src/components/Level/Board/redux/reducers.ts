import { createReducer } from "@reduxjs/toolkit";
import { BoardState } from "../../interfaces/LevelState";

import { crossZone, emptyZone, fillZone, initialBoard } from "./actions";

const initialState: BoardState = {
  currentBoard: [],
  currentClass: [],
  classCluesLines: [],
  classCluesColumns: [],
};

export const boardReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(initialBoard, (state, action) => {
      for (let nb_line = 0; nb_line < 10; nb_line++) {
        let lineBoard: number[] = [];
        let lineClass: string[] = [];
        for (let nb_column = 0; nb_column < 10; nb_column++) {
          lineBoard.push(0);
          lineClass.push("zone_empty");
        }
        state.currentBoard.push(lineBoard);
        state.currentClass.push(lineClass);
        state.classCluesLines.push("clues_normal");
        state.classCluesColumns.push("clues_normal");
      }
    })
    .addCase(fillZone, (state, action) => {
      state.currentBoard[action.payload.line][action.payload.column] = 1;
      state.currentClass[action.payload.line][action.payload.column] =
        "zone_fill";
    })
    .addCase(crossZone, (state, action) => {
      state.currentBoard[action.payload.line][action.payload.column] = 2;
      state.currentClass[action.payload.line][action.payload.column] =
        "zone_cross";
    })
    .addCase(emptyZone, (state, action) => {
      state.currentBoard[action.payload.line][action.payload.column] = 0;
      state.currentClass[action.payload.line][action.payload.column] =
        "zone_empty";
    });
});
