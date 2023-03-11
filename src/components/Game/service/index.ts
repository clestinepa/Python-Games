import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Level, Board, ClassClues } from "../interfaces/LevelSource";
import { updateCluesLine } from "../redux";

const ConstraintManagement = {
  _updateLineNormal: (new_clues_line: ClassClues) => {
    let new_clues: string[] = [];
    for (let nb_clue = 0; nb_clue < new_clues_line.classClues.length; nb_clue++) {
      new_clues.push("clue_normal");
    }
    new_clues_line = { ...new_clues_line, classGlobal: "clues_normal", classClues: new_clues };
    return new_clues_line;
  },

  _updateLineDone: (new_clues_line: ClassClues) => {
    let new_clues: string[] = [];
    for (let nb_clue = 0; nb_clue < new_clues_line.classClues.length; nb_clue++) {
      new_clues.push("clue_all_done");
    }
    new_clues_line = { ...new_clues_line, classGlobal: "clues_done", classClues: new_clues };
    ConstraintManagement._autoCrossLine();
    return new_clues_line;
  },

  _updateLineError: (new_clues_line: ClassClues) => {
    let new_clues = new_clues_line.classClues;
    for (let nb_clue = 0; nb_clue < new_clues.length; nb_clue++) {
      if (new_clues[nb_clue] === "clue_normal") {
        new_clues[nb_clue] = "clue_ERROR";
      }
    }
    new_clues_line = { ...new_clues_line, classClues: new_clues };
    return new_clues_line;
  },

  _updateZoneDone: (new_clues_line: ClassClues, index: number) => {
    let new_clues = new_clues_line.classClues;
    new_clues[index] = "clue_done";
    new_clues_line = { ...new_clues_line, classClues: new_clues };
    return new_clues_line;
  },

  _updateZoneError: (new_clues_line: ClassClues, index: number) => {
    let new_clues = new_clues_line.classClues;
    new_clues[index] = "clue_ERROR";
    new_clues_line = { ...new_clues_line, classClues: new_clues };
    return new_clues_line;
  },

  _checkLineConstraint: (nb_line: number, level: Level, board: Board) => {
    let new_clues_line = board.classCluesLines[nb_line];
    new_clues_line = ConstraintManagement._updateLineNormal(new_clues_line);
    //build the areas
    let areas: number[] = [];
    let nb_cross = 0;
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
        if (zone === 2) {
          nb_cross++;
        }
      }
    }
    //check the validity of the areas
    let clues = level.clues.line[nb_line];
    if (areas.toString() === clues.toString()) {
      new_clues_line = ConstraintManagement._updateLineDone(new_clues_line);
    } else if (areas.length > clues.length) {
      new_clues_line = { ...new_clues_line, classGlobal: "clues_ERROR" };
    } else if (areas.length !== 0) {
      new_clues_line = ConstraintManagement._constraintLineStartLeft(new_clues_line, areas, nb_line, level, board);
    } else if (areas.length === 0) {
      //check if all the zone are crossed => fail
      if (nb_cross === level.size) {
        new_clues_line = { ...new_clues_line, classGlobal: "clues_ERROR" };
      }
    }

    return new_clues_line;
  },

  _constraintLineStartLeft: (new_clues_line: ClassClues, areas: number[], nb_line: number, level: Level, board: Board) => {
    let clues = level.clues.line[nb_line];
    let nb_check = 0;
    let onCheck = false;
    let index_zone = 0;
    for (let zone of board.currentBoard[nb_line]) {
      index_zone++;
      if (zone === 0) {
        //if we were checking an area => end the check
        if (onCheck && areas[nb_check] === clues[nb_check]) {
          new_clues_line = ConstraintManagement._updateZoneDone(new_clues_line, nb_check);
          ConstraintManagement._autoCrossZone();
        }
        //we can't continue here so we check on the other side
        // constraintLineStartRight(areas);
        break;
      } else if (zone === 1) {
        //we find a new area to check
        if (!onCheck) {
          onCheck = true;
        }
        //if we arrive at the end of the row
        if (index_zone === board.currentBoard[nb_line].length) {
          //we check if the area is correct but as it was the one on right
          if (areas[nb_check] === clues[clues.length - 1]) {
            new_clues_line = ConstraintManagement._updateZoneDone(new_clues_line, clues.length - 1);
          } else {
            new_clues_line = { ...new_clues_line, classGlobal: "clues_ERROR" };
            new_clues_line = ConstraintManagement._updateZoneError(new_clues_line, clues.length - 1);
          }
          //if we are here, that means at least one area is missing (clues still "normal") => fail
          new_clues_line = { ...new_clues_line, classGlobal: "clues_ERROR" };
          new_clues_line = ConstraintManagement._updateLineError(new_clues_line);
        }
      } else if (zone === 2) {
        //if we were checking an area => end the check
        if (onCheck) {
          if (areas[nb_check] === clues[nb_check]) {
            new_clues_line = ConstraintManagement._updateZoneDone(new_clues_line, nb_check);
          } else {
            new_clues_line = { ...new_clues_line, classGlobal: "clues_ERROR" };
            new_clues_line = ConstraintManagement._updateZoneError(new_clues_line, nb_check);
          }
          onCheck = false;
          nb_check++;
        }
      }
    }
    return new_clues_line;
  },

  _autoCrossZone: () => {
    //TODO
  },
  _autoCrossLine: () => {
    //TODO
  },

  // // const constraintLineStartRight = (areas: number[]) => {};

  // const checkColumnConstraint = () => {};

  checkConstraint: (nb_line: number, level: Level, board: Board, dispatch: ThunkDispatch<any, undefined, AnyAction>) => {
    let new_clues_line = ConstraintManagement._checkLineConstraint(nb_line, level, board);
    // checkColumnConstraint();

    dispatch(updateCluesLine(nb_line, new_clues_line));
  },
};

export default ConstraintManagement;
