import { Action, Board, Level, PastAction } from "../LevelSource";

export interface GameState {
  level: Level;
  board: Board;
  pastActions: PastAction[]
}

export interface ActionState {
  action: Action
}

export interface SettingsState {
  onGame: boolean;
  boardLoad:boolean;
}
