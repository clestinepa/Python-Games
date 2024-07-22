import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { updateCluesColumn, updateCluesLine, updateLastAction, updateZonesColumn, updateZonesLine } from "../../redux/slices/game";
import { Board, ClassClues, CluesType, Level } from "../../models/game";

const ConstraintManager = {
  checkConstraints: (
    needUpdateLastAction: boolean,
    nb_line: number,
    nb_column: number,
    board: Board,
    level: Level,
    dispatch: ThunkDispatch<any, undefined, AnyAction>
  ) => {
    let past_value_line = {
      clues_line: Object.assign({}, board.classCluesLines[nb_line]),
      zones_line: [...board.currentBoard[nb_line]],
    };
    let new_value_line = past_value_line;
    new_value_line = ConstraintManager._checkLineConstraints(new_value_line.clues_line, new_value_line.zones_line, nb_line, level, board);
    dispatch(updateCluesLine({ nb_line, new_clues_line: new_value_line.clues_line }));
    dispatch(updateZonesLine({ nb_line, new_zones_line: new_value_line.zones_line }));

    let new_zones_column: number[] = [];
    for (let line of board.currentBoard) {
      new_zones_column.push(line[nb_column]);
    }
    let past_value_column = {
      clues_column: Object.assign({}, board.classCluesColumns[nb_column]),
      zones_column: new_zones_column,
    };
    let new_value_column = past_value_column;
    new_value_column = ConstraintManager._checkColumnConstraints(
      new_value_column.clues_column,
      new_value_column.zones_column,
      nb_column,
      level,
      board
    );
    dispatch(updateCluesColumn({ nb_column, new_clues_column: new_value_column.clues_column }));
    dispatch(updateZonesColumn({ nb_column, new_zones_column: new_value_column.zones_column }));

    if (needUpdateLastAction) {
      dispatch(updateLastAction({ pastZonesLine: past_value_line.zones_line, pastZonesColumn: past_value_column.zones_column }));
    }
  },

  _checkLineConstraints: (new_clues_line: ClassClues, new_zones_line: number[], nb_line: number, level: Level, board: Board) => {
    new_clues_line = ConstraintManager._updateCluesNormal(new_clues_line);

    //build the areas
    let { areas, nb_cross } = ConstraintManager._buildAreasLine(nb_line, board);

    //check the validity of the areas
    let clues = level.clues.line[nb_line];
    let sum_zone_fill = 0;
    for (let area of areas) {
      sum_zone_fill += area;
    }
    //areas === clues => all done
    if (areas.toString() === clues.toString()) {
      new_clues_line = ConstraintManager._updateCluesDone(new_clues_line);
      new_zones_line = ConstraintManager._autoCross(new_zones_line);
    }
    //too much "validate" areas => fail
    else if (areas.length > clues.length && nb_cross === level.size - sum_zone_fill) {
      new_clues_line.classGlobal = "clues_ERROR";
    }
    //not perfect areas => check Areas
    else if (areas.length !== 0) {
      new_clues_line = ConstraintManager._checkValidityAreasStartLeft(CluesType.Line, new_clues_line, areas, nb_line, level, board);
    }
    //all zones are crossed => fail
    else if (areas.length === 0 && nb_cross === level.size) {
      new_clues_line.classGlobal = "clues_ERROR";
    }
    return { clues_line: new_clues_line, zones_line: new_zones_line };
  },

  _checkValidityAreasStartLeft: (type: CluesType, new_clues: ClassClues, areas: number[], index: number, level: Level, board: Board) => {
    let clues = type === CluesType.Line ? [...level.clues.line[index]] : [...level.clues.column[index]];
    let line_to_check: number[] = [];
    if (type === CluesType.Line) {
      line_to_check = [...board.currentBoard[index]];
    } else {
      for (let line of board.currentBoard) {
        line_to_check.push(line[index]);
      }
    }

    let nb_check = 0;
    let onCheck = false;
    let index_zone = 0;
    for (let zone of line_to_check) {
      index_zone++;
      //check an empty zone
      if (zone === 0) {
        //if we were checking an area => end the check
        if (onCheck) {
          new_clues = ConstraintManager._checkAreaEndByEmpty(false, new_clues, areas, clues, nb_check);
        }
        //we can't continue here so we check on the other side
        new_clues = ConstraintManager._checkValidityAreasStartRight(type, new_clues, areas, index, level, board);
        break;
        //check a filled zone
      } else if (zone === 1) {
        //we find a new area to check
        if (!onCheck) {
          onCheck = true;
        }
        //if we arrive at the end of the row
        if (index_zone === line_to_check.length) {
          new_clues = ConstraintManager._checkAreaEndByEndBoard(new_clues, areas, clues, nb_check);
        }
        //check a crossed zone
      } else if (zone === 2) {
        //if we were checking an area => end the check
        if (onCheck) {
          new_clues = ConstraintManager._checkAreaEndByCross(false, new_clues, areas, clues, nb_check);
          onCheck = false;
          nb_check++;
        }
      }
    }
    return new_clues;
  },

  _checkValidityAreasStartRight: (type: CluesType, new_clues: ClassClues, areas: number[], index: number, level: Level, board: Board) => {
    let clues = type === CluesType.Line ? [...level.clues.line[index]].reverse() : [...level.clues.column[index]].reverse();
    let line_to_check: number[] = [];
    if (type === CluesType.Line) {
      line_to_check = [...board.currentBoard[index]].reverse();
    } else {
      for (let line of board.currentBoard) {
        line_to_check.push(line[index]);
      }
      line_to_check = line_to_check.reverse();
    }
    areas = areas.reverse();

    let nb_check = 0;
    let onCheck = false;
    for (let zone of line_to_check) {
      if (zone === 0) {
        //if we were checking an area => end the check
        if (onCheck) {
          new_clues = ConstraintManager._checkAreaEndByEmpty(true, new_clues, areas, clues, nb_check);
        }
        //if there is too much area but all the clues are already used => fail
        if (areas.length > clues.length && ConstraintManager._checkExtraArea(new_clues)) {
          new_clues.classGlobal = "clues_ERROR";
        }
        //we can't continue here so that means we finish !
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
          new_clues = ConstraintManager._checkAreaEndByCross(true, new_clues, areas, clues, nb_check);
          onCheck = false;
          nb_check++;
        }
      }
    }
    return new_clues;
  },

  _checkColumnConstraints: (new_clues_column: ClassClues, new_zones_column: number[], nb_column: number, level: Level, board: Board) => {
    new_clues_column = ConstraintManager._updateCluesNormal(new_clues_column);
    //build the areas
    let { areas, nb_cross } = ConstraintManager._buildAreasColumn(nb_column, board);

    //check the validity of the areas
    let clues = level.clues.column[nb_column];
    let sum_zone_fill = 0;
    for (let area of areas) {
      sum_zone_fill += area;
    }
    //areas === clues => all done
    if (areas.toString() === clues.toString()) {
      new_clues_column = ConstraintManager._updateCluesDone(new_clues_column);
      new_zones_column = ConstraintManager._autoCross(new_zones_column);
    }
    //too much "validate" areas => fail
    else if (areas.length > clues.length && nb_cross === level.size - sum_zone_fill) {
      new_clues_column.classGlobal = "clues_ERROR";
    }
    //not perfect areas => check Areas
    else if (areas.length !== 0) {
      new_clues_column = ConstraintManager._checkValidityAreasStartLeft(CluesType.Column, new_clues_column, areas, nb_column, level, board);
    }
    //all zones are crossed => fail
    else if (areas.length === 0 && nb_cross === level.size) {
      new_clues_column.classGlobal = "clues_ERROR";
    }
    return {
      clues_column: new_clues_column,
      zones_column: new_zones_column,
    };
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

  _buildAreasColumn: (nb_column: number, board: Board) => {
    let areas: number[] = [];
    let nb_cross = 0;
    let onArea = false;
    for (let line of board.currentBoard) {
      let zone = line[nb_column];
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

  _checkExtraArea: (new_clues: ClassClues) => {
    let clues_all_done = true;
    for (let clue of new_clues.classClues) {
      if (clue !== "clue_done") {
        clues_all_done = false;
        break;
      }
    }
    return clues_all_done;
  },

  _checkAreaEndByEmpty: (reverse: boolean, new_clues: ClassClues, areas: number[], clues: number[], nb_check: number) => {
    let index = reverse ? clues.length - 1 - nb_check : nb_check;
    if (areas[nb_check] === clues[nb_check]) {
      // new_clues = ConstraintManager._updateZoneDone(new_clues, index);
    } else if (areas[nb_check] > clues[nb_check]) {
      new_clues.classGlobal = "clues_ERROR";
      new_clues = ConstraintManager._updateZoneError(new_clues, index);
    }
    return new_clues;
  },

  _checkAreaEndByCross: (reverse: boolean, new_clues: ClassClues, areas: number[], clues: number[], nb_check: number) => {
    let index = reverse ? clues.length - 1 - nb_check : nb_check;
    if (areas[nb_check] === clues[nb_check]) {
      new_clues = ConstraintManager._updateZoneDone(new_clues, index);
    } else {
      new_clues.classGlobal = "clues_ERROR";
      new_clues = ConstraintManager._updateZoneError(new_clues, index);
    }
    return new_clues;
  },

  _checkAreaEndByEndBoard: (new_clues: ClassClues, areas: number[], clues: number[], nb_check: number) => {
    if (areas[nb_check] === clues[nb_check]) {
      new_clues = ConstraintManager._updateZoneDone(new_clues, clues.length - 1);
    } else {
      new_clues.classGlobal = "clues_ERROR";
      new_clues = ConstraintManager._updateZoneError(new_clues, clues.length - 1);
    }
    return new_clues;
  },

  _updateCluesNormal: (new_clues: ClassClues) => {
    let new_new_clues: string[] = [];
    for (let nb_clue = 0; nb_clue < new_clues.classClues.length; nb_clue++) {
      new_new_clues.push("clue_normal");
    }
    new_clues = { ...new_clues, classGlobal: "clues_normal", classClues: new_new_clues };
    return new_clues;
  },

  _updateCluesDone: (new_clues: ClassClues) => {
    let new_new_clues: string[] = [];
    for (let nb_clue = 0; nb_clue < new_clues.classClues.length; nb_clue++) {
      new_new_clues.push("clue_all_done");
    }
    new_clues = { ...new_clues, classGlobal: "clues_done", classClues: new_new_clues };
    return new_clues;
  },

  _updateCluesError: (new_clues: ClassClues) => {
    let new_new_clues = new_clues.classClues;
    for (let nb_clue = 0; nb_clue < new_clues.classClues.length; nb_clue++) {
      if (new_new_clues[nb_clue] === "clue_normal") {
        new_new_clues[nb_clue] = "clue_ERROR";
      }
    }
    new_clues = { ...new_clues, classClues: new_new_clues };
    return new_clues;
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

  _autoCross: (new_zones: number[]) => {
    let new_new_zones: number[] = Object.assign([], new_zones);
    for (let nb_zone = 0; nb_zone < new_zones.length; nb_zone++) {
      if (new_new_zones[nb_zone] === 0) {
        new_new_zones[nb_zone] = 2;
      }
    }
    new_zones = new_new_zones;
    return new_zones;
  },
};

export default ConstraintManager;
