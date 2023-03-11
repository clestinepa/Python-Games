import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Level, Board } from "../interfaces/LevelSource";
import { updateCluesLine } from "../redux";

const ConstraintManagement = {
  _checkLineConstraint: (nb_line: number, level: Level, board: Board, dispatch: ThunkDispatch<any, undefined, AnyAction>) => {
    let new_clues_line = board.classCluesLines[nb_line];
    let new_clues: string[] = []
    for (let nb_clue = 0; nb_clue < board.classCluesLines[nb_line].classClues.length; nb_clue++) {
      new_clues.push("clue_normal");
    }
    new_clues_line = {...new_clues_line, classGlobal: "clues_normal", classClues: new_clues};

    //autoCrossLine

    //build the areas
    let areas: number[] = [];
    let onArea = false;
    for (let zone of board.currentBoard[nb_line]) {
      if (zone === 1) {
        if (!onArea) {
          onArea = true;
          areas.push(0);
        }
        areas[areas.length - 1]++;
      } else {
        if (onArea) {
          onArea = false;
        }
      }
    }
    // console.log("AREAS:", areas);
    //check the validity of the areas
    let clues = level.clues.line[nb_line];
    if (areas.toString() === clues.toString()) {
      new_clues.length = 0;
      for (let nb_clue = 0; nb_clue < board.classCluesLines[nb_line].classClues.length; nb_clue++) {
        new_clues.push("clue_all_done");
      }
      new_clues_line = {...new_clues_line, classGlobal: "clues_done", classClues: new_clues};
    } else if (areas.length > clues.length) {
      new_clues_line = {...new_clues_line, classGlobal: "clues_ERROR"};
      console.log(new_clues_line)
    } else if (areas.length !== 0) {
      //   constraintLineStartLeft(areas);
    }

    dispatch(updateCluesLine(nb_line,new_clues_line))
  },


  // const constraintLineStartLeft = (areas: number[]) => {
  //   // let clues = level.clues.line[props.nb_line];
  //   // let nb_check = 0;
  //   // let onCheck = false;
  //   // let index_zone = 0;
  //   // for (let zone of board.currentBoard[props.nb_line]) {
  //   //   index_zone++;
  //   //   if (zone === 0) {
  //   //     //if we were checking an area => end the check
  //   //     if (onCheck && areas[nb_check] === clues[nb_check]) {
  //   //       dispatch(clueDone(props.nb_line, nb_check));
  //   //       // autoCrossZone(props.nb_line, );
  //   //     }
  //   //     //we can't continue here so we check on the other side
  //   //     constraintLineStartRight(areas);
  //   //     break;
  //   //   } else if (zone === 1) {
  //   //     //we find a new area to check
  //   //     if (!onCheck) {
  //   //       onCheck = true;
  //   //     }
  //   //     //if we arrive at the end of the row
  //   //     if (index_zone === board.currentBoard[props.nb_line].length) {
  //   //       //we check if the area is correct but as it was the one on right
  //   //       if (areas[nb_check] === clues[clues.length - 1]) {
  //   //         dispatch(clueDone(props.nb_line, clues.length - 1));
  //   //       } else {
  //   //         dispatch(cluesLineError(props.nb_line));
  //   //         dispatch(clueError(props.nb_line, clues.length - 1));
  //   //       }
  //   //       //if we are here, that means at least one area is missing (clues still "normal") => fail
  //   //       dispatch(cluesNormalToError(props.nb_line));
  //   //     }
  //   //   } else if (zone === 2) {
  //   //     //if we were checking an area => end the check
  //   //     if (onCheck) {
  //   //       if (areas[nb_check] === clues[nb_check]) {
  //   //         dispatch(clueDone(props.nb_line, nb_check));
  //   //       } else {
  //   //         dispatch(cluesLineError(props.nb_line));
  //   //         dispatch(clueError(props.nb_line, nb_check));
  //   //       }
  //   //       onCheck = false;
  //   //       nb_check++;
  //   //     }
  //   //   }
  //   // }
  // };

  // // const constraintLineStartRight = (areas: number[]) => {};

  // const checkColumnConstraint = () => {};

  checkConstraint: (nb_line: number, level: Level, board: Board, dispatch: ThunkDispatch<any, undefined, AnyAction>) => {
    ConstraintManagement._checkLineConstraint(nb_line,level,board,dispatch);
    // checkColumnConstraint();
  },
};

export default ConstraintManagement;
