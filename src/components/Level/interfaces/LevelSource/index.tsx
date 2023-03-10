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

export interface classClues {
  classGlobal : string;
  classClues : string[];
}
