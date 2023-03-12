import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Level, Board, ClassClues } from "../interfaces/LevelSource";
import { updateCluesLine, updateZonesLine } from "../redux";

const ConstraintManagement = {
  checkConstraints: (nb_line: number, level: Level, board: Board, dispatch: ThunkDispatch<any, undefined, AnyAction>) => {
    let new_value = { new_clues_line: Object.assign({}, board.classCluesLines[nb_line]), new_zones_line: [...board.currentBoard[nb_line]] };
    new_value = ConstraintManagement._checkLineConstraints(new_value.new_clues_line, new_value.new_zones_line, nb_line, level, board);
    new_value = ConstraintManagement._checkColumnConstraints(new_value.new_clues_line, new_value.new_zones_line, nb_line, level, board);
    dispatch(updateCluesLine(nb_line, new_value.new_clues_line));
    dispatch(updateZonesLine(nb_line, new_value.new_zones_line));
  },

  _checkLineConstraints: (new_clues_line: ClassClues, new_zones_line: number[], nb_line: number, level: Level, board: Board) => {
    new_clues_line = ConstraintManagement._updateLineNormal(new_clues_line);

    //build the areas
    let { areas, nb_cross } = ConstraintManagement._buildAreasLine(nb_line, board);

    //check the validity of the areas
    let clues = level.clues.line[nb_line];
    let sum_zone_fill = 0 ;
    for (let area of areas) {
      sum_zone_fill += area;
    }
    //areas === clues => all done
    if (areas.toString() === clues.toString()) {
      new_clues_line = ConstraintManagement._updateLineDone(new_clues_line);
      ConstraintManagement._updateLineDone(new_clues_line);
      new_zones_line = ConstraintManagement._autoCrossLine(new_zones_line, nb_line, board);
    }
    //too much "validate" areas => fail
    else if (areas.length > clues.length && nb_cross ===(level.size - sum_zone_fill)) {
      new_clues_line.classGlobal = "clues_ERROR";
    }
    //not perfect areas => check Areas
    else if (areas.length !== 0) {
      new_clues_line = ConstraintManagement._checkValidityAreasStartLeft(new_clues_line, areas, nb_line, level, board);
    }
    //all zones are crossed => fail
    else if (areas.length === 0 && nb_cross === level.size) {
      new_clues_line.classGlobal = "clues_ERROR";
    }
    return { new_clues_line, new_zones_line };
  },

  _checkValidityAreasStartLeft: (new_clues_line: ClassClues, areas: number[], nb_line: number, level: Level, board: Board) => {
    let clues = [...level.clues.line[nb_line]];
    let line_to_check = [...board.currentBoard[nb_line]];

    let nb_check = 0;
    let onCheck = false;
    let index_zone = 0;
    for (let zone of line_to_check) {
      index_zone++;
      //check an empty zone
      if (zone === 0) {
        //if we were checking an area => end the check
        if (onCheck) {
          new_clues_line = ConstraintManagement._checkAreaEndByEmpty(new_clues_line, areas, clues, nb_check, false);
        }
        //we can't continue here so we check on the other side
        new_clues_line = ConstraintManagement._checkValidityAreasStartRight(new_clues_line, areas, nb_line, level, board);
        break;
        //check a filled zone
      } else if (zone === 1) {
        //we find a new area to check
        if (!onCheck) {
          onCheck = true;
        }
        //if we arrive at the end of the row
        if (index_zone === line_to_check.length) {
          new_clues_line = ConstraintManagement._checkAreaEndByEndBoard(new_clues_line, areas, clues, nb_check);
        }
        //check a crossed zone
      } else if (zone === 2) {
        //if we were checking an area => end the check
        if (onCheck) {
          new_clues_line = ConstraintManagement._checkAreaEndByCross(new_clues_line, areas, clues, nb_check, false);
          onCheck = false;
          nb_check++;
        }
      }
    }
    return new_clues_line;
  },

  _checkValidityAreasStartRight: (new_clues_line: ClassClues, areas: number[], nb_line: number, level: Level, board: Board) => {
    let clues = [...level.clues.line[nb_line]].reverse();
    let line_to_check = [...board.currentBoard[nb_line]].reverse();
    areas = areas.reverse();

    let nb_check = 0;
    let onCheck = false;
    for (let zone of line_to_check) {
      if (zone === 0) {
        //if we were checking an area => end the check
        if (onCheck) {
          new_clues_line = ConstraintManagement._checkAreaEndByEmpty(new_clues_line, areas, clues, nb_check, true);
        }
        //if there is too much area but all the clues are already used => fail
        if (areas.length > clues.length && ConstraintManagement._checkExtraArea(new_clues_line)) {
          new_clues_line.classGlobal = "clues_ERROR";
        }
        //we can't continue here so that means we finish !
        console.log("end Check");
        break;
      } else if (zone === 1) {
        //we find a new area to check
        if (!onCheck) {
          onCheck = true;
        }
        //we can't arrive at the end of the row because we know there is at least one empty zone
      } else if (zone === 2) {
        //if we were checking an area => end the check
        if (onCheck) {
          new_clues_line = ConstraintManagement._checkAreaEndByCross(new_clues_line, areas, clues, nb_check, true);
          onCheck = false;
          nb_check++;
        }
      }
    }
    return new_clues_line;
  },

  _buildAreasLine: (nb_line: number, board: Board) => {
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
    return { areas, nb_cross };
  },

  _checkExtraArea: (new_clues_line: ClassClues) => {
    let clues_all_done = true;
    for (let clue of new_clues_line.classClues) {
      if (clue !== "clue_done") {
        clues_all_done = false;
        break;
      }
    }
    return clues_all_done;
  },

  _checkAreaEndByEmpty: (new_clues_line: ClassClues, areas: number[], clues: number[], nb_check: number, reverse: boolean) => {
    let index = reverse ? clues.length - 1 - nb_check : nb_check;
    if (areas[nb_check] === clues[nb_check]) {
      // new_clues_line = ConstraintManagement._updateZoneDone(new_clues_line, index);
    } else if (areas[nb_check] > clues[nb_check]) {
      new_clues_line.classGlobal = "clues_ERROR";
      new_clues_line = ConstraintManagement._updateZoneError(new_clues_line, index);
    }
    return new_clues_line;
  },

  _checkAreaEndByCross: (new_clues_line: ClassClues, areas: number[], clues: number[], nb_check: number, reverse: boolean) => {
    let index = reverse ? clues.length - 1 - nb_check : nb_check;
    if (areas[nb_check] === clues[nb_check]) {
      new_clues_line = ConstraintManagement._updateZoneDone(new_clues_line, index);
    } else {
      new_clues_line.classGlobal = "clues_ERROR";
      new_clues_line = ConstraintManagement._updateZoneError(new_clues_line, index);
    }
    return new_clues_line;
  },

  _checkAreaEndByEndBoard: (new_clues_line: ClassClues, areas: number[], clues: number[], nb_check: number) => {
    if (areas[nb_check] === clues[nb_check]) {
      new_clues_line = ConstraintManagement._updateZoneDone(new_clues_line, nb_check);
    } else {
      new_clues_line.classGlobal = "clues_ERROR";
      new_clues_line = ConstraintManagement._updateZoneError(new_clues_line, nb_check);
    }
    return new_clues_line;
  },

  _checkColumnConstraints: (new_clues_line: ClassClues, new_zones_line: number[], nb_line: number, level: Level, board: Board) => {
    return { new_clues_line, new_zones_line };
  },

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

  _autoCrossLine: (new_zones_line: number[], nb_line: number, board: Board) => {
    let new_zones: number[] = Object.assign([], new_zones_line);
    for (let nb_zone = 0; nb_zone < new_zones.length; nb_zone++) {
      if (new_zones[nb_zone] === 0) {
        new_zones[nb_zone] = 2;
      }
    }
    new_zones_line = new_zones;
    return new_zones_line;
  },
};

export default ConstraintManagement;
