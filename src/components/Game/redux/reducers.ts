import { createReducer } from "@reduxjs/toolkit";
import { PastAction } from "../interfaces/LevelSource";
import { GameState } from "../interfaces/LevelState";
import {
  initialBoard,
  setNameLevel,
  undoLastAction,
  updateCluesColumn,
  updateCluesLine,
  updateLastAction,
  updateZone,
  updateZonesColumn,
  updateZonesLine,
} from "./actions";

const initialState: GameState = {
  level: {
    name: "test",
    difficulty: 1,
    size: 10,
    // nb_fill: 52,
    nb_fill: 99,
    clues: {
      column: [[1], [3, 2], [5, 3], [2, 5], [1, 4], [1, 4], [2, 5], [5, 3], [3, 2], [1]],
      line: [[4], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [4], [6], [8], [10]],
    },
  },
  board: {
    currentFill: 0,
    currentBoard: [],
    classCluesLines: [],
    classCluesColumns: [],
  },
  pastActions: [],
};

export const gameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setNameLevel, (state, action) => {
      state.level.name = action.payload.new_name;
    })
    .addCase(initialBoard, (state, action) => {
      for (let nb_line = 0; nb_line < action.payload.level.size; nb_line++) {
        let lineBoard: number[] = [];

        for (let nb_column = 0; nb_column < action.payload.level.size; nb_column++) {
          lineBoard.push(0);
        }
        state.board.currentBoard.push(lineBoard);

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
    .addCase(updateZone, (state, action) => {
      document.getElementById("alert_count")!.className = document.getElementById("alert_count")!.className.replace("alert_shown", "alert_hidden");
      if (state.board.currentBoard[action.payload.nb_line][action.payload.nb_column] !== 1 && action.payload.new_zone === 1) {
        if (state.board.currentFill + 1 > state.level.nb_fill) {
          document.getElementById("alert_count")!.className = document
            .getElementById("alert_count")!
            .className.replace("alert_hidden", "alert_shown");
          return;
        } else {
          state.board.currentFill++;
        }
      } else if (state.board.currentBoard[action.payload.nb_line][action.payload.nb_column] === 1 && action.payload.new_zone !== 1) {
        state.board.currentFill--;
      }
      if (state.board.currentBoard[action.payload.nb_line][action.payload.nb_column] !== action.payload.new_zone) {
        let lastAction: PastAction = {
          nb_line: action.payload.nb_line,
          nb_column: action.payload.nb_column,
          pastZone: state.board.currentBoard[action.payload.nb_line][action.payload.nb_column],
          pastZonesLine: [],
          pastZonesColumn: [],
        };
        state.pastActions.push(lastAction);
        state.board.currentBoard[action.payload.nb_line][action.payload.nb_column] = action.payload.new_zone;
      }
    })
    .addCase(updateCluesLine, (state, action) => {
      state.board.classCluesLines[action.payload.nb_line] = action.payload.new_clues_line;
    })
    .addCase(updateCluesColumn, (state, action) => {
      state.board.classCluesColumns[action.payload.nb_column] = action.payload.new_clues_column;
    })
    .addCase(updateZonesLine, (state, action) => {
      state.board.currentBoard[action.payload.nb_line] = action.payload.new_zones_line;
    })
    .addCase(updateZonesColumn, (state, action) => {
      for (let nb_line = 0; nb_line < state.board.currentBoard.length; nb_line++) {
        state.board.currentBoard[nb_line][action.payload.nb_column] = action.payload.new_zones_column[nb_line];
      }
    })
    .addCase(updateLastAction, (state, action) => {
      state.pastActions[state.pastActions.length - 1].pastZonesLine = action.payload.pastZonesLine;
      state.pastActions[state.pastActions.length - 1].pastZonesColumn = action.payload.pastZonesColumn;
    })
    .addCase(undoLastAction, (state) => {
      if (state.pastActions.length !== 0) {
        let lastAction = state.pastActions[state.pastActions.length - 1];
        if (state.board.currentBoard[lastAction.nb_line][lastAction.nb_column] === 1 && lastAction.pastZone !== 1) {
          state.board.currentFill--;
        }
        state.board.currentBoard[lastAction.nb_line] = lastAction.pastZonesLine;
        for (let nb_line = 0; nb_line < state.board.currentBoard.length; nb_line++) {
          state.board.currentBoard[nb_line][lastAction.nb_column] = lastAction.pastZonesColumn[nb_line];
        }
        state.board.currentBoard[lastAction.nb_line][lastAction.nb_column] = lastAction.pastZone;
        state.pastActions.pop();
      }
    });
});
