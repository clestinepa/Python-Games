import React from "react";
import "../../../styles/zone.css";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { onAction, onEmpty, selectApiAction } from "../../ActionButton/redux";
import {
  crossZone,
  emptyZone,
  fillZone,
  selectApiBoard,
} from "../redux";

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


  // function displayCluesLineNormal(nb_line) {
  //   clues_lines.children[nb_line].className = clues_lines.children[nb_line].className.replace("clues_ERROR", "clues_normal").replace("clues_done", "clues_normal");
  //   for (let clue_line of clues_lines.children[nb_line].children) {
  //     clue_line.className = clue_line.className.replace("clue_ERROR", "clue_normal").replace("clue_done", "clue_normal");
  //   }
  // }
  
  // function displayCluesLineDone(nb_line) {
  //   clues_lines.children[nb_line].className = clues_lines.children[nb_line].className.replace("clues_normal", "clues_done")
  //   for (let clue_done of clues_lines.children[nb_line].children) {
  //     clue_done.className = clue_done.className.replace("clue_ERROR", "clue_done").replace("clue_normal", "clue_done");
  //   }
  
  //   autoCrossLine(nb_line);
  // }
  
  // function displayCluesLineError(nb_line) {
  //   clues_lines.children[nb_line].className = clues_lines.children[nb_line].className.replace("clues_normal", "clues_ERROR");
  //   for (let clue_ERROR of clues_lines.children[nb_line].children) {
  //     console.log(clue_ERROR.id)
  //     clue_ERROR.className = clue_ERROR.className.replace("clue_normal", "clue_ERROR");
  //   }
  // }
  
  // function autoCrossLine(nb_line) {
  //   currentBoard[nb_line] = currentBoard[nb_line].map(function (v) { return v == 0 ? 2 : v });
  //   for (let zone of zones) {
  //     if (parseInt(zone.classList[2].replace("line_", "")) == nb_line && zone.classList[1] == "zone_empty") {
  //       zone.className = zone.className.replace("zone_empty", "zone_cross");
  //     }
  //   }
  // }
  
  // /**TODO */
  // function autoCrossZone(nb_line) {
  //   console.log("to do")
  // }
  

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
