import {Level} from "../LevelSource";

export interface LevelState {
  level: Level;
}

export interface BoardState {
  currentBoard: Array<Array<number>>;
  currentClass: Array<Array<string>>;
  classCluesLines: Array<string>;
  classCluesColumns: Array<string>;
}

export interface ActionState {
  action: {
    onAction: boolean;
    onFill: boolean;
    onCross: boolean;
    onEmpty: boolean;
  };
}
