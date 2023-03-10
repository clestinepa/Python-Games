import { createAction } from "@reduxjs/toolkit";
import { Level } from "../../interfaces/LevelSource";

export const initialCluesColumns = createAction(
  "cluesColumns/initialCluesColumns",
  function prepare(level: Level) {
    return {
      payload: { level },
    };
  }
);