import { createAction } from "@reduxjs/toolkit";
import { Level } from "../../interfaces/LevelSource";

export const initialBoard = createAction(
  "board/initialBoard",
  function prepare(level: Level) {
    return {
      payload: { level },
    };
  }
);

// export const cluesLineNormal = createAction(
//   "board/cluesLineNormal",
//   function prepare() {
//     return { payload: {} };
//   }
// );

// function displayCluesLineNormal(nb_line) {
//   clues_lines.children[nb_line].className = clues_lines.children[nb_line].className.replace("clues_ERROR", "clues_normal").replace("clues_done", "clues_normal");
//   for (let clue_line of clues_lines.children[nb_line].children) {
//     clue_line.className = clue_line.className.replace("clue_ERROR", "clue_normal").replace("clue_done", "clue_normal");
//   }
// }

// function displayCluesLineDone(nb_line) {
//   clues_lines.children[nb_line].className = clues_lines.children[nb_line].className.replace("clues_normal", "clues_done")
//   for (let clue_done of clues_lines.children[nb_line].children) {
//     clue_done.className = clue_done.className.replace("clue_ERROR", "clue_done").replace("clue_normal", "clue_done");
//   }

//   autoCrossLine(nb_line);
// }

// function displayCluesLineError(nb_line) {
//   clues_lines.children[nb_line].className = clues_lines.children[nb_line].className.replace("clues_normal", "clues_ERROR");
//   for (let clue_ERROR of clues_lines.children[nb_line].children) {
//     console.log(clue_ERROR.id)
//     clue_ERROR.className = clue_ERROR.className.replace("clue_normal", "clue_ERROR");
//   }
// }

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

export const fillZone = createAction(
  "board/fillZone",
  function prepare(line: number, column: number) {
    return {
      payload: { line, column },
    };
  }
);

export const crossZone = createAction(
  "board/crossZone",
  function prepare(line: number, column: number) {
    return {
      payload: { line, column },
    };
  }
);

export const emptyZone = createAction(
  "board/emptyZone",
  function prepare(line: number, column: number) {
    return {
      payload: { line, column },
    };
  }
);
