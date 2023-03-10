import { createReducer } from "@reduxjs/toolkit";
import { BoardState } from "../../interfaces/BoardGameState";

import { crossZone, emptyZone, fillZone } from "./actions";

// let currentBoard: number[][] = [];
// let currentClass: string[][] = [];
// let classCluesLines: string[] = [];
// for (let nb_line = 0 ; nb_line<10;nb_line++) {
//   let lineBoard: number[] = [];
//   let lineClass: string[] = [];
//   for (let nb_column = 0 ; nb_column<10;nb_column++) {
//     lineBoard.push(0);
//     lineClass.push("zone_empty")
//   }
//   currentBoard.push(lineBoard);
//   currentClass.push(lineClass);
// }

const initialState: BoardState = {
  currentBoard: [],
  currentClass: [],
  classCluesLines: [],
  classCluesColumns: [],
};

export const boardReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fillZone, (state, action) => {
      state.currentBoard[action.payload.line][action.payload.column] = 1;
      state.currentClass[action.payload.line][action.payload.column] = "zone_fill";
    })
    .addCase(crossZone, (state, action) => {
      state.currentBoard[action.payload.line][action.payload.column] = 2;
      state.currentClass[action.payload.line][action.payload.column] = "zone_cross";
    })
    .addCase(emptyZone, (state, action) => {
      state.currentBoard[action.payload.line][action.payload.column] = 0;
      state.currentClass[action.payload.line][action.payload.column] = "zone_empty";
    });
});
