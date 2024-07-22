import { PayloadAction,createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface ActionState {
  onAction: boolean;
  onFill: boolean;
  onCross: boolean;
  onEmpty: boolean;
}

const initialState: ActionState = {
  onAction: false,
  onFill: true,
  onCross: false,
  onEmpty: false,
};

const actionSlice = createSlice({
  name: "actionSlice",
  initialState,
  reducers: {
    updateAction(state, action: PayloadAction<ActionState>) {
      state = action.payload;
    },
  },
});

export const selectAction = (state: RootState) => state.actionState;

export const { updateAction } = actionSlice.actions;
export default actionSlice.reducer;
