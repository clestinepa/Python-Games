import { createReducer } from "@reduxjs/toolkit";
import { ActionState } from "../../interfaces/LevelState";
import { updateAction } from "./actions";

const initialState: ActionState = {
  action: { onAction: false, onFill: true, onCross: false, onEmpty: false },
};

export const actionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateAction, (state, action) => {
      state.action = action.payload.new_action;
    })
});
