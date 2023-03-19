import React from "react";
import "../../../../../../styles/zone.css";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { selectApiAction, updateAction } from "../../../../ActionButton/redux";
import { selectApiBoard, selectApiLevel, updateZone } from "../../../../redux";
import ConstraintManagement from "../../../../service";

interface Props {
  nb_line: number;
  nb_column: number;
}

const Zone: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const action = useAppSelector(selectApiAction);
  const board = useAppSelector(selectApiBoard);
  const level = useAppSelector(selectApiLevel);

  const [zoneState, setZoneState] = React.useState(false);

  const handleMouseDown = () => {
    let new_action = clickZone();
    new_action = { ...new_action, onAction: true };
    dispatch(updateAction(new_action));
  };
  const handleMouseEnter = () => {
    if (action.onAction) {
      let new_action = clickZone();
      dispatch(updateAction(new_action));
    }
  };
  document.onmouseup = () => {
    if (action.onAction) {
      let new_action = action;
      new_action = { ...new_action, onAction: false, onEmpty: false };
      dispatch(updateAction(new_action));
    }
  };

  const clickZone = () => {
    setZoneState(true);
    let new_action = action;
    let new_zone = board.currentBoard[props.nb_line][props.nb_column];
    if (new_action.onFill) {
      if (new_zone === 1) {
        //if already fill
        if (!new_action.onAction) {
          //only the first zone define if its an empty action or not
          new_action = { ...new_action, onEmpty: true };
        }
        if (new_action.onEmpty) {
          new_zone = 0;
        }
      } else {
        if (!new_action.onEmpty) {
          new_zone = 1;
        }
      }
    } else if (new_action.onCross) {
      if (new_zone === 2) {
        //if already cross
        if (!new_action.onAction) {
          //only the first zone define if its an empty action or not
          new_action = { ...new_action, onEmpty: true };
        }
        if (new_action.onEmpty) {
          new_zone = 0;
        }
      } else {
        if (!new_action.onEmpty) {
          new_zone = 2;
        }
      }
    }
    dispatch(updateZone(props.nb_line, props.nb_column, new_zone));
    return new_action;
  };

  React.useEffect(() => {
    if (zoneState) {
      ConstraintManagement.checkConstraints(props.nb_line, props.nb_column, level, board, dispatch);
      setZoneState(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board.currentBoard[props.nb_line][props.nb_column]]);

  return (
    <button
      onMouseDown={() => handleMouseDown()}
      onMouseEnter={() => handleMouseEnter()}
      id={"line_" + props.nb_line + "_column_" + props.nb_column}
      className={
        "zone " +
        (board.currentBoard[props.nb_line][props.nb_column] === 0
          ? "zone_empty"
          : board.currentBoard[props.nb_line][props.nb_column] === 1
          ? "zone_fill"
          : board.currentBoard[props.nb_line][props.nb_column] === 2
          ? "zone_cross"
          : "") +
        " line_" +
        props.nb_line +
        " column_" +
        props.nb_column
      }
      draggable={false}></button>
  );
};

export default Zone;
