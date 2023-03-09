export interface BoardGameState {
  action: {
    onAction: boolean;
    onFill: boolean;
    onCross: boolean;
    onEmpty: boolean;
  };
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
  currentBoard: Array<Array<number>>
}
