import { createAction } from "@reduxjs/toolkit";
import { Level } from "../../interfaces/LevelSource";

export const initialCluesLines = createAction(
  "cluesLines/initialCluesLines",
  function prepare(level: Level) {
    return {
      payload: { level },
    };
  }
);