import React from "react";
import "../../../styles/zone.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { onAction, onEmpty, selectApiAction } from "../ActionButton/redux";
import {
  crossZone,
  emptyZone,
  fillZone,
  selectApiCurrentBoard,
  selectApiLevel,
} from "../redux";

interface Props {
  nb_line: number;
  nb_column: number;
}

//lié className et useSelector currentBoard[properZone]
const Zone: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const action = useAppSelector(selectApiAction);
  const currentBoard = useAppSelector(selectApiCurrentBoard);
  const level = useAppSelector(selectApiLevel);

  const [zoneState, setZoneState] = React.useState({
    class:
      "zone zone_empty line_" + props.nb_line + " column_" + props.nb_column,
    state: 0,
  });

  // const [classNameState, setClassNameState] = useState();

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
    let new_state = zoneState;
    if (action.onFill) {
      if (currentBoard[props.nb_line][props.nb_column] === 1) {
        //if already fill
        if (!action.onAction) {
          //only the first zone define if its an empty action or not
          dispatch(onEmpty(true));
        }
        if (action.onEmpty) {
          new_state.class = zoneState.class.replace("zone_fill", "zone_empty");
          dispatch(emptyZone(props.nb_line, props.nb_column));
        }
      } else {
        if (!action.onEmpty) {
          new_state.class = zoneState.class.replace("zone_empty", "zone_fill");
          new_state.class = new_state.class.replace("zone_cross", "zone_fill");
          dispatch(fillZone(props.nb_line, props.nb_column));
        }
      }
    } else if (action.onCross) {
      if (currentBoard[props.nb_line][props.nb_column] === 2) {
        //if already cross
        if (!action.onAction) {
          //only the first zone define if its an empty action or not
          dispatch(onEmpty(true));
        }
        if (action.onEmpty) {
          new_state.class = zoneState.class.replace("zone_cross", "zone_empty");
          dispatch(emptyZone(props.nb_line, props.nb_column));
        }
      } else {
        if (!action.onEmpty) {
          new_state.class = zoneState.class.replace("zone_empty", "zone_cross");
          new_state.class = new_state.class.replace("zone_fill", "zone_cross");
          dispatch(crossZone(props.nb_line, props.nb_column));
        }
      }
    }
    setZoneState(new_state);
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
      className={zoneState.class}
      draggable={false}
    ></button>
  );
};

export default Zone;
