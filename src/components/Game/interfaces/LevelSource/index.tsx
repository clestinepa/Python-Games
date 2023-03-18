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

export interface ClassClues {
  classGlobal: string;
  classClues: string[];
}

export interface Board {
  currentFill: number;
  currentBoard: number[][];
  classCluesLines: ClassClues[];
  classCluesColumns: ClassClues[];
}
