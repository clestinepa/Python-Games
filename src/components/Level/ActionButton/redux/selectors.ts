import { RootState } from "../../../../redux/store";

export const selectApiAction = (state: RootState) => state.actionAPI.action;
