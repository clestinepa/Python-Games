import { createAction } from "@reduxjs/toolkit";
import {Level} from "../interfaces/LevelSource";

export const setNameLevel = createAction("level/setNameLevel", function prepare(new_name: string) {
  return {
    payload: { new_name },
  };
});

export const initialBoard = createAction("board/initialBoard", function prepare(level: Level) {
  return {
    payload: { level },
  };
});

export const cluesLineNormal = createAction("cluesLines/cluesLineNormal", function prepare(nb_line: number) {
  return { payload: { nb_line } };
});

export const cluesNormal = createAction("cluesLines/cluesNormal", function prepare(nb_line: number) {
  return { payload: { nb_line } };
});

export const cluesLineDone = createAction("cluesLines/cluesLineDone", function prepare(nb_line: number) {
  return { payload: { nb_line } };
});

export const cluesDone = createAction("cluesLines/cluesDone", function prepare(nb_line: number) {
  return { payload: { nb_line } };
});

export const clueDone = createAction("cluesLines/clueDone", function prepare(nb_line: number, index: number) {
  return { payload: { nb_line, index } };
});

export const cluesLineError = createAction("cluesLines/cluesLineError", function prepare(nb_line: number) {
  return { payload: { nb_line } };
});

export const cluesError = createAction("cluesLines/cluesError", function prepare(nb_line: number) {
  return { payload: { nb_line } };
});

export const cluesNormalToError = createAction("cluesLines/cluesNormalToError", function prepare(nb_line: number) {
  return { payload: { nb_line } };
});

export const clueError = createAction("cluesLines/clueError", function prepare(nb_line: number, index: number) {
  return { payload: { nb_line, index } };
});

export const fillZone = createAction("board/fillZone", function prepare(line: number, column: number) {
  return {
    payload: { line, column },
  };
});

export const crossZone = createAction("board/crossZone", function prepare(line: number, column: number) {
  return {
    payload: { line, column },
  };
});

export const emptyZone = createAction("board/emptyZone", function prepare(line: number, column: number) {
  return {
    payload: { line, column },
  };
});

// function autoCrossLine(nb_line) {
//   currentBoard[nb_line] = currentBoard[nb_line].map(function (v) { return v == 0 ? 2 : v });
//   for (let zone of zones) {
//     if (parseInt(zone.classList[2].replace("line_", "")) == nb_line && zone.classList[1] == "zone_empty") {
//       zone.className = zone.className.replace("zone_empty", "zone_cross");
//     }
//   }
// }

// /**TODO */
// function autoCrossZone(nb_line) {
//   console.log("to do")
// }
