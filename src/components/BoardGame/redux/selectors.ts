// import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../redux/store';

export const selectApiLevel = (state: RootState) => state.boardGame.level;
export const selectApiCurrentBoard = (state: RootState) => state.boardGame.currentBoard;

// export const countSelector = createSelector(selectApiAction, state => state);
