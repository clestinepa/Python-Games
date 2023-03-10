import { createReducer } from "@reduxjs/toolkit";
import { ActionState } from "../../interfaces/BoardGameState";
import { onAction, onCross, onEmpty, onFill } from "./actions";

const initialState: ActionState = {
  action: { onAction: false, onFill: true, onCross: false, onEmpty: false },
};

export const actionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(onAction, (state, action) => {
      state.action.onAction = action.payload.value;
    })
    .addCase(onFill, (state, action) => {
      state.action.onFill = action.payload.value;
    })
    .addCase(onCross, (state, action) => {
      state.action.onCross = action.payload.value;
    })
    .addCase(onEmpty, (state, action) => {
      state.action.onEmpty = action.payload.value;
    });
});
