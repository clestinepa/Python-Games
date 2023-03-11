export interface Level {
  name: string;
  difficulty: number;
  size: number;
  nb_fill: number;
  clues: {
    column: Array<Array<number>>;
    line: Array<Array<number>>;
  };
}

export interface Action {
  onAction: boolean;
  onFill: boolean;
  onCross: boolean;
  onEmpty: boolean;
}

export interface classClues {
  classGlobal: string;
  classClues: string[];
}

export interface Board {
  currentBoard: number[][];
  currentClass: string[][];
  classCluesLines: classClues[];
  classCluesColumns: classClues[];
}
