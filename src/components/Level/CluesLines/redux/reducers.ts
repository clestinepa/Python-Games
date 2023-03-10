import { createReducer } from "@reduxjs/toolkit";
import { CluesLinesState } from "../../interfaces/LevelState";
import { initialCluesLines } from "./actions";


const initialState: CluesLinesState = {
    classCluesLines: []

};

export const cluesLinesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(initialCluesLines, (state, action) => {
      for (let nb_line = 0; nb_line < action.payload.level.size; nb_line++) {
        let cluesLineClass: string[] = [];
        for (let nb_clue = 0; nb_clue < action.payload.level.clues.line.length;nb_clue++) {
          cluesLineClass.push("clue_normal");
        }
        state.classCluesLines.push({
          classGlobal: "clues_normal",
          classClues: cluesLineClass,
        });
      }
    });
});
