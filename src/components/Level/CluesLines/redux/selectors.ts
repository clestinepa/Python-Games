import { RootState } from "../../../../redux/store";

export const selectApiCluesLines = (state: RootState) => state.cluesLinesAPI.classCluesLines;