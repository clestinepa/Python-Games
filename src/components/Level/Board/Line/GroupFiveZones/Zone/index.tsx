import React from "react";
import "../../../../../../styles/zone.css";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { onAction, onEmpty, selectApiAction } from "../../../../ActionButton/redux";
import { clueDone, clueError, cluesDone, cluesLineDone, cluesLineError, cluesLineNormal, cluesNormal, cluesNormalToError, crossZone, emptyZone, fillZone, selectApiBoard, selectApiLevel } from "../../../../redux";

interface Props {
  nb_line: number;
  nb_column: number;
}

const Zone: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const action = useAppSelector(selectApiAction);
  const board = useAppSelector(selectApiBoard);
  const level = useAppSelector(selectApiLevel);

  const handleMouseDown = () => {
    clickZone();
    dispatch(onAction(true));
  };
  const handleMouseEnter = () => {
    if (action.onAction) {
      clickZone();
    }
  };
  document.onmouseup = () => {
    if (action.onAction) {
      dispatch(onAction(false));
      dispatch(onEmpty(false));
    }
  };

  const clickZone = () => {
    if (action.onFill) {
      if (board.currentBoard[props.nb_line][props.nb_column] === 1) {
        //if already fill
        if (!action.onAction) {
          //only the first zone define if its an empty action or not
          dispatch(onEmpty(true));
        }
        if (action.onEmpty) {
          dispatch(emptyZone(props.nb_line, props.nb_column));
        }
      } else {
        if (!action.onEmpty) {
          dispatch(fillZone(props.nb_line, props.nb_column));
        }
      }
    } else if (action.onCross) {
      if (board.currentBoard[props.nb_line][props.nb_column] === 2) {
        //if already cross
        if (!action.onAction) {
          //only the first zone define if its an empty action or not
          dispatch(onEmpty(true));
        }
        if (action.onEmpty) {
          dispatch(emptyZone(props.nb_line, props.nb_column));
        }
      } else {
        if (!action.onEmpty) {
          dispatch(crossZone(props.nb_line, props.nb_column));
        }
      }
    }
    checkConstraint();
  };

  const checkConstraint = () => {
    console.log("check constraints");
    checkLineConstraint();
    checkColumnConstraint();
  };

  const checkLineConstraint = () => {
    let clues = level.clues.line[props.nb_line];
    dispatch(cluesLineNormal(props.nb_line));
    dispatch(cluesNormal(props.nb_line));
    //autoCrossLine

    //build the areas
    let areas: number[] = [];
    let onArea = false;
    for (let value of board.currentBoard[props.nb_line]) {
      if (value === 1) {
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
    //check the validity of the areas
    if (areas.toString() === clues.toString()) {
      dispatch(cluesLineDone(props.nb_line));
      dispatch(cluesDone(props.nb_line));
    } else if (areas.length > clues.length) {
      dispatch(cluesLineError(props.nb_line));
    } else if (areas.length !== 0) {
      constraintLineStartLeft(areas);
    }
  };

  const constraintLineStartLeft = (areas: number[]) => {
    // let clues = level.clues.line[props.nb_line];

    // let nb_check = 0;
    // let onCheck = false;
    // let index_zone = 0;
    // for (let zone of board.currentBoard[props.nb_line]) {
    //   index_zone++;
    //   if (zone === 0) {
    //     //if we were checking an area => end the check
    //     if (onCheck && areas[nb_check] === clues[nb_check]) {
    //       dispatch(clueDone(props.nb_line, nb_check));
    //       // autoCrossZone(props.nb_line, );
    //     }
    //     //we can't continue here so we check on the other side
    //     constraintLineStartRight(areas);
    //     break;
    //   } else if (zone === 1) {
    //     //we find a new area to check
    //     if (!onCheck) {
    //       onCheck = true;
    //     }
    //     //if we arrive at the end of the row
    //     if (index_zone === board.currentBoard[props.nb_line].length) {
    //       //we check if the area is correct but as it was the one on right
    //       if (areas[nb_check] === clues[clues.length - 1]) {
    //         dispatch(clueDone(props.nb_line, clues.length - 1));
    //       } else {
    //         dispatch(cluesLineError(props.nb_line));
    //         dispatch(clueError(props.nb_line, clues.length - 1));
    //       }
    //       //if we are here, that means at least one area is missing (clues still "normal") => fail
    //       dispatch(cluesNormalToError(props.nb_line));
    //     }
    //   } else if (zone === 2) {
    //     //if we were checking an area => end the check
    //     if (onCheck) {
    //       if (areas[nb_check] === clues[nb_check]) {
    //         dispatch(clueDone(props.nb_line, nb_check));
    //       } else {
    //         dispatch(cluesLineError(props.nb_line));
    //         dispatch(clueError(props.nb_line, nb_check));
    //       }
    //       onCheck = false;
    //       nb_check++;
    //     }
    //   }
    // }
  };

  const constraintLineStartRight = (areas: number[]) => {};

  const checkColumnConstraint = () => {};

  return (
    <button
      onMouseDown={() => handleMouseDown()}
      onMouseEnter={() => handleMouseEnter()}
      id={"line_" + props.nb_line + "_column_" + props.nb_column}
      className={"zone " + board.currentClass[props.nb_line][props.nb_column] + " line_" + props.nb_line + " column_" + props.nb_column}
      draggable={false}></button>
  );
};

export default Zone;
