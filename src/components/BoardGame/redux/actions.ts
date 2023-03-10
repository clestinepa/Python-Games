import { createAction } from "@reduxjs/toolkit";

export const setNameLevel = createAction(
  "level/setNameLevel",
  function prepare(new_name: string) {
    return {
      payload: { new_name },
    };
  }
);