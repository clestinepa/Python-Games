import { createAction } from "@reduxjs/toolkit";
import { Action } from "../../interfaces/LevelSource";

export const updateAction = createAction("action/updateAction", function prepare(new_action: Action) {
  return {
    payload: { new_action },
  };
});
