import { createReducer } from "@reduxjs/toolkit";
import { GameState } from "../interfaces/LevelState";
import { initialBoard, setNameLevel, updateClue, updateCluesLine, updateZone } from "./actions";

const initialState: GameState = {
  level: {
    name: "test",
    difficulty: 1,
    size: 10,
    nb_fill: 52,
    clues: {
      column: [[1], [3, 2], [5, 3], [2, 5], [1, 4], [1, 4], [2, 5], [5, 3], [3, 2], [1]],
      line: [[4], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [4], [6], [8], [10]],
    },
  },
  board: {
    currentBoard: [],
    currentClass: [],
    classCluesLines: [],
    classCluesColumns: [],
  },
};

export const gameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setNameLevel, (state, action) => {
      state.level.name = action.payload.new_name;
    })
    .addCase(initialBoard, (state, action) => {
      for (let nb_line = 0; nb_line < action.payload.level.size; nb_line++) {
        let lineBoard: number[] = [];
        let lineClass: string[] = [];

        for (let nb_column = 0; nb_column < action.payload.level.size; nb_column++) {
          lineBoard.push(0);
          lineClass.push("zone_empty");
        }
        state.board.currentBoard.push(lineBoard);
        state.board.currentClass.push(lineClass);

        let cluesColumnClass: string[] = [];
        for (let nb_clue = 0; nb_clue < action.payload.level.clues.column[nb_line].length; nb_clue++) {
          cluesColumnClass.push("clue_normal");
        }
        state.board.classCluesColumns.push({
          classGlobal: "clues_normal",
          classClues: cluesColumnClass,
        });

        let cluesLineClass: string[] = [];
        for (let nb_clue = 0; nb_clue < action.payload.level.clues.line[nb_line].length; nb_clue++) {
          cluesLineClass.push("clue_normal");
        }
        state.board.classCluesLines.push({
          classGlobal: "clues_normal",
          classClues: cluesLineClass,
        });
      }
    })
    .addCase(updateCluesLine, (state, action) => {
      state.board.classCluesLines[action.payload.nb_line] = action.payload.new_clues_line;
    })
    .addCase(updateClue, (state, action) => {
        state.board.classCluesLines[action.payload.nb_line].classClues[action.payload.index] = action.payload.new_clue;
    })
    .addCase(updateZone, (state, action) => {
      state.board.currentBoard[action.payload.line][action.payload.column] = action.payload.new_zone;
      switch (action.payload.new_zone) {
        case 0:
          state.board.currentClass[action.payload.line][action.payload.column] = "zone_empty";
          break;
        case 1:
          state.board.currentClass[action.payload.line][action.payload.column] = "zone_fill";
          break;
        case 2:
          state.board.currentClass[action.payload.line][action.payload.column] = "zone_cross";
          break;
        default:
          break;
      }
    });
});
