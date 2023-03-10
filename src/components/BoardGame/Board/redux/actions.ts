import { createAction } from "@reduxjs/toolkit";

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