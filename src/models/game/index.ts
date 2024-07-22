export enum CluesType {
    Line,
    Column,
  }
  
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
  
  export interface PastAction {
    nb_line : number,
    nb_column : number,
    pastZone : number,
    pastZonesLine : number[],
    pastZonesColumn : number[],
  }