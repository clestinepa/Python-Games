import { createAction } from "@reduxjs/toolkit";
import {classClues, Level} from "../interfaces/LevelSource";

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

export const updateCluesLine = createAction("cluesLines/updateCluesLine", function prepare(nb_line: number, new_clues_line:classClues) {
  return { payload: { nb_line, new_clues_line} };
});

export const updateClue = createAction("cluesLines/updateClue", function prepare(nb_line: number, index: number, new_clue:string) {
  return { payload: { nb_line, index, new_clue} };
});


export const updateZone = createAction("board/updateZone", function prepare(line: number, column: number, new_zone: number) {
  return {
    payload: { line, column, new_zone },
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
