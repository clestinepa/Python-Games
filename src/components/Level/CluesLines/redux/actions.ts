import { createAction } from "@reduxjs/toolkit";
import { Level } from "../../interfaces/LevelSource";

export const initialCluesLines = createAction("cluesLines/initialCluesLines", function prepare(level: Level) {
    return {
        payload: { level },
    };
});

export const cluesLineNormal = createAction("cluesLines/cluesLineNormal", function prepare(nb_line: number) {
    return { payload: { nb_line } };
});

export const cluesLineDone = createAction("cluesLines/cluesLineDone", function prepare(nb_line: number) {
    return { payload: { nb_line } };
});

export const cluesLineError = createAction("cluesLines/cluesLineError", function prepare(nb_line: number) {
    return { payload: { nb_line } };
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
