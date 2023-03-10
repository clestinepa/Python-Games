import { createReducer } from "@reduxjs/toolkit";
import { CluesLinesState } from "../../interfaces/LevelState";
import { cluesLineDone, cluesLineError, cluesLineNormal, initialCluesLines } from "./actions";

const initialState: CluesLinesState = {
    classCluesLines: [],
};

export const cluesLinesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(initialCluesLines, (state, action) => {
            for (let nb_line = 0; nb_line < action.payload.level.size; nb_line++) {
                let cluesLineClass: string[] = [];
                for (let nb_clue = 0; nb_clue < action.payload.level.clues.line.length; nb_clue++) {
                    cluesLineClass.push("clue_normal");
                }
                state.classCluesLines.push({
                    classGlobal: "clues_normal",
                    classClues: cluesLineClass,
                });
            }
        })
        .addCase(cluesLineNormal, (state, action) => {
            state.classCluesLines[action.payload.nb_line].classGlobal = "clues_normal";
            for (let nb_clue = 0; nb_clue < state.classCluesLines[action.payload.nb_line].classClues.length; nb_clue++) {
                state.classCluesLines[action.payload.nb_line].classClues[nb_clue] = "clue_normal";
            }
        })
        .addCase(cluesLineDone, (state, action) => {
            state.classCluesLines[action.payload.nb_line].classGlobal = "clues_done";
            for (let nb_clue = 0; nb_clue < state.classCluesLines[action.payload.nb_line].classClues.length; nb_clue++) {
                state.classCluesLines[action.payload.nb_line].classClues[nb_clue] = "clue_done";
            }
        })
        .addCase(cluesLineError, (state, action) => {
          if (state.classCluesLines[action.payload.nb_line].classGlobal === "clues_normal") {
            state.classCluesLines[action.payload.nb_line].classGlobal = "clues_ERROR";
          }
            for (let nb_clue = 0; nb_clue < state.classCluesLines[action.payload.nb_line].classClues.length; nb_clue++) {
              if (state.classCluesLines[action.payload.nb_line].classClues[nb_clue] === "clue_normal") {
                state.classCluesLines[action.payload.nb_line].classClues[nb_clue] = "clue_ERROR";
              }
            }
        });
});