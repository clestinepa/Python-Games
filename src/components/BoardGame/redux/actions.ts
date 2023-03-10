import { createAction } from "@reduxjs/toolkit";

export const fillZone = createAction(
  "boardGame/fillZone",
  function prepare(line: number, column: number) {
    return {
      payload: { line, column },
    };
  }
);

export const crossZone = createAction(
  "boardGame/crossZone",
  function prepare(line: number, column: number) {
    return {
      payload: { line, column },
    };
  }
);

export const emptyZone = createAction(
  "boardGame/emptyZone",
  function prepare(line: number, column: number) {
    return {
      payload: { line, column },
    };
  }
);
