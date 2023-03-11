import {Board, Level} from "../LevelSource";

export interface LevelState {
  level: Level;
  board : Board;
}


export interface ActionState {
  action: {
    onAction: boolean;
    onFill: boolean;
    onCross: boolean;
    onEmpty: boolean;
  };
}
