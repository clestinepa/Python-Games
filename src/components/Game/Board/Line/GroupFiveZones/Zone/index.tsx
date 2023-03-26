import React from "react";
import "../../../../../../styles/zone.css";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { selectApiAction, updateAction } from "../../../../ActionButton/redux";
import { selectApiBoard, selectApiLevel, updateZone } from "../../../../redux";
import ConstraintManagement from "../../../../service/ConstraintManagement";
import ClickZoneManagement from "../../../../service/ClickZoneManagement";

interface Props {
  nb_line: number;
  nb_column: number;
}

const Zone: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const action = useAppSelector(selectApiAction);
  const board = useAppSelector(selectApiBoard);
  const level = useAppSelector(selectApiLevel);

  const [isModifiedInPurposeState, setIsModifiedInPurposeState] = React.useState(false);

  const handleMouseDown = () => {
    let {new_action, new_zone, modifiedInPurpose} = ClickZoneManagement.handleClick({nb_line:props.nb_line, nb_column: props.nb_column, action, board, level});
    if (modifiedInPurpose) {
      setIsModifiedInPurposeState(true);
    }
    new_action = { ...new_action, onAction: true };
    dispatch(updateAction(new_action));
    dispatch(updateZone(props.nb_line, props.nb_column, new_zone));

  };
  const handleMouseEnter = () => {
    if (action.onAction) {
      let {new_action, new_zone, modifiedInPurpose} = ClickZoneManagement.handleClick({nb_line:props.nb_line, nb_column: props.nb_column, action, board, level});
      if (modifiedInPurpose) {
        setIsModifiedInPurposeState(true);
      }
      dispatch(updateZone(props.nb_line, props.nb_column, new_zone));
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

  React.useEffect(() => {
    console.log(isModifiedInPurposeState, props.nb_line, props.nb_column);
    if (isModifiedInPurposeState) {
      console.log("LA", props.nb_line, props.nb_column);
      ConstraintManagement.checkConstraints(true, props.nb_line, props.nb_column, level, board, dispatch);
      setIsModifiedInPurposeState(false);
    } else {
      console.log("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board.currentBoard[props.nb_line][props.nb_column], isModifiedInPurposeState]);

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
