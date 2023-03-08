export interface Level {
  name: string;
  difficulty: number;
  size: number;
  clues: {
    column: Array<Array<number>>;
    line: Array<Array<number>>;
  };
}


