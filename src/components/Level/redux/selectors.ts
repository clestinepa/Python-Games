import { RootState } from '../../../redux/store';

export const selectApiLevel = (state: RootState) => state.levelAPI.level;