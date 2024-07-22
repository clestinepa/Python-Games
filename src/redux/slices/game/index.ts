import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Board, ClassClues, Level, PastAction } from "../../../models/game";

export interface GameState {
  level: Level;
  board: Board;
  pastActions: PastAction[];
}

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

const gameSlice = createSlice({
  name: "gameSlice",
  initialState,
  reducers: {
    setNameLevel(state, action: PayloadAction<string>) {
      state.level.name = action.payload;
    },
    initialBoard(state, action: PayloadAction<Level>) {
      for (let nb_line = 0; nb_line < action.payload.size; nb_line++) {
        let lineBoard: number[] = [];

        for (let nb_column = 0; nb_column < action.payload.size; nb_column++) {
          lineBoard.push(0);
        }
        state.board.currentBoard.push(lineBoard);

        let cluesColumnClass: string[] = [];
        for (let nb_clue = 0; nb_clue < action.payload.clues.column[nb_line].length; nb_clue++) {
          cluesColumnClass.push("clue_normal");
        }
        state.board.classCluesColumns.push({
          classGlobal: "clues_normal",
          classClues: cluesColumnClass,
        });

        let cluesLineClass: string[] = [];
        for (let nb_clue = 0; nb_clue < action.payload.clues.line[nb_line].length; nb_clue++) {
          cluesLineClass.push("clue_normal");
        }
        state.board.classCluesLines.push({
          classGlobal: "clues_normal",
          classClues: cluesLineClass,
        });
      }
    },
    updateZone(state, action: PayloadAction<{nb_line:number, nb_column:number,new_zone:number}>) {
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
    },
    updateCluesLine(state, action: PayloadAction<{nb_line:number, new_clues_line:ClassClues}>) {
      state.board.classCluesLines[action.payload.nb_line] = action.payload.new_clues_line;
    },
    updateCluesColumn(state, action: PayloadAction<{nb_column:number, new_clues_column:ClassClues}>) {
      state.board.classCluesColumns[action.payload.nb_column] = action.payload.new_clues_column;
    },
    updateZonesLine(state, action: PayloadAction<{nb_line:number, new_zones_line:number[]}>) {
      state.board.currentBoard[action.payload.nb_line] = action.payload.new_zones_line;
    },
    updateZonesColumn(state, action: PayloadAction<{nb_column:number, new_zones_column:number[]}>) {
      for (let nb_line = 0; nb_line < state.board.currentBoard.length; nb_line++) {
        state.board.currentBoard[nb_line][action.payload.nb_column] = action.payload.new_zones_column[nb_line];
      }
    },
    updateLastAction(state, action: PayloadAction<{pastZonesLine:number[], pastZonesColumn:number[]}>) {
      state.pastActions[state.pastActions.length - 1].pastZonesLine = action.payload.pastZonesLine;
      state.pastActions[state.pastActions.length - 1].pastZonesColumn = action.payload.pastZonesColumn;
    },
    undoLastAction(state) {
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
    },
  },
});

export const selectGame = (state: RootState) => state.gameState;

export const {
  setNameLevel,
  initialBoard,
  updateZone,
  updateCluesLine,
  updateCluesColumn,
  updateZonesLine,
  updateZonesColumn,
  updateLastAction,
  undoLastAction,
} = gameSlice.actions;
export default gameSlice.reducer;
