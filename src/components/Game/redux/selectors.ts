import { RootState } from '../../../redux/store';

export const selectApiLevel = (state: RootState) => state.gameAPI.level;
export const selectApiBoard = (state: RootState) => state.gameAPI.board;