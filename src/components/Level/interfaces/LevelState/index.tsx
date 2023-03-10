import {classClues, Level} from "../LevelSource";

export interface LevelState {
  level: Level;
}

export interface BoardState {
  currentBoard: number[][];
  currentClass: string[][];  
}

export interface CluesLinesState {
  classCluesLines: classClues[];
}
export interface CluesColumnsState {
  classCluesColumns: classClues[];
}


export interface ActionState {
  action: {
    onAction: boolean;
    onFill: boolean;
    onCross: boolean;
    onEmpty: boolean;
  };
}
