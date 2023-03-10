import { createReducer } from "@reduxjs/toolkit";
import { CluesColumnsState } from "../../interfaces/LevelState";
import { initialCluesColumns } from "./actions";


const initialState: CluesColumnsState = {
    classCluesColumns: []

};

export const cluesColumnsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(initialCluesColumns, (state, action) => {
      for (let nb_line = 0; nb_line < action.payload.level.size; nb_line++) {
        let cluesColumnClass: string[] = [];
        for (let nb_clue = 0; nb_clue < action.payload.level.clues.column.length;nb_clue++) {
          cluesColumnClass.push("clue_normal");
        }
        state.classCluesColumns.push({
          classGlobal: "clues_normal",
          classClues: cluesColumnClass,
        });
      }
    });
});
