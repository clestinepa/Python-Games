import { createAction } from "@reduxjs/toolkit";
import { ClassClues, Level } from "../interfaces/LevelSource";

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

export const updateCluesLine = createAction("cluesLines/updateCluesLine", function prepare(nb_line: number, new_clues_line: ClassClues) {
  return { payload: { nb_line, new_clues_line } };
});

export const updateCluesColumn = createAction("cluesColumns/updateCluesColumn", function prepare(nb_column: number, new_clues_column: ClassClues) {
  return { payload: { nb_column, new_clues_column } };
});

export const updateZone = createAction("board/updateZone", function prepare(nb_line: number, column: number, new_zone: number) {
  return {
    payload: { nb_line, column, new_zone },
  };
});

export const updateZonesLine = createAction("board/updateZonesLine", function prepare(nb_line: number, new_zones_line: number[]) {
  return {
    payload: { nb_line, new_zones_line },
  };
});

export const updateZonesColumn = createAction("board/updateZonesColumn", function prepare(nb_column: number, new_zones_column: number[]) {
  return {
    payload: { nb_column, new_zones_column },
  };
});
