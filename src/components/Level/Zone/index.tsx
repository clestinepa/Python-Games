import React from "react";
import "../../../styles/zone.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { onAction, onEmpty, selectApiAction } from "../ActionButton/redux";
import {
  crossZone,
  emptyZone,
  fillZone,
  selectApiBoard,
} from "../Board/redux";

interface Props {
  nb_line: number;
  nb_column: number;
}

const Zone: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const action = useAppSelector(selectApiAction);
  const board = useAppSelector(selectApiBoard);

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
    checkConstraint(props.nb_line, props.nb_column);
  };

  const checkConstraint = (nb_line: number, nb_column: number) => {
    console.log("check constraints");
    checkLineConstraint(nb_line);
    checkColumnConstraint(nb_column);
  };

  const checkLineConstraint = (nb_line: number) => {
    // let clues = level.clues.line[nb_line];
    // displayCluesLineNormal(nb_line);
    // //build the areas
    // let areas:number[] = [];
    // let onArea = false;
    // for (let value of currentBoard[nb_line]) {
    //   if (value === 1) {
    //     if (!onArea) {
    //       onArea = true;
    //       areas.push(0);
    //     }
    //     areas[areas.length - 1]++;
    //   } else {
    //     if (onArea) {
    //       onArea = false;
    //     }
    //   }
    // }
    // //check the validity of the areas
    // if (areas.toString() === clues.toString()) {
    //   displayCluesLineDone(nb_line);
    // } else if (areas.length > clues.length) {
    //   clues_lines.children[nb_line].className = clues_lines.children[
    //     nb_line
    //   ].className.replace("clues_normal", "clues_ERROR");
    // } else if (areas.length != 0) {
    //   constraintLineStartLeft(areas, nb_line, currentBoard[nb_line]);
    // }
  };

  const checkColumnConstraint = (nb_column: number) => {};

  return (
    <button
      onMouseDown={() => handleMouseDown()}
      onMouseEnter={() => handleMouseEnter()}
      id={"line_" + props.nb_line + "_column_" + props.nb_column}
      className={"zone " + board.currentClass[props.nb_line][props.nb_column] + " line_" + props.nb_line + " column_" + props.nb_column}
      draggable={false}
    ></button>
  );
};

export default Zone;
