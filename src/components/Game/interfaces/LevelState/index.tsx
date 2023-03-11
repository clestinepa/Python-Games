import { Action, Board, Level } from "../LevelSource";

export interface GameState {
  level: Level;
  board: Board;
}

export interface ActionState {
  action: Action
}

export interface SettingsState {
  onGame: boolean;
  boardLoad:boolean;
}
