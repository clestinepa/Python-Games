export interface LevelState {
  level: {
    name: string;
    difficulty: number;
    size: number;
    nb_fill: number;
    clues: {
      column: Array<Array<number>>;
      line: Array<Array<number>>;
    };
  };
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
