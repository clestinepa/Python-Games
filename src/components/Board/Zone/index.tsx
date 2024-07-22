import React from "react";
import "../../../styles/zone.css"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectAction, updateAction } from "../../../redux/slices/action";
import { selectGame } from "../../../redux/slices/game";
import ClickZoneManager from "../../../domain/clickZoneManager";
import ConstraintManager from "../../../domain/constraintManager";

interface Props {
  nb_line: number;
  nb_column: number;
}

const Zone: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const action = useAppSelector(selectAction);
  const game = useAppSelector(selectGame);
  const level = game.level;
  const board = game.board;

  // const [isModifiedInPurposeState, setIsModifiedInPurposeState] = React.useState(false);

  // const handleMouseDown = () => {
  //   let new_action = action;
  //   if (
  //     ClickZoneManager.handleClick({
  //       nb_line: props.nb_line,
  //       nb_column: props.nb_column,
  //       action,
  //       board,
  //       level,
  //       dispatch,
  //       setIsModifiedInPurposeState,
  //     })
  //   ) {
  //     //isEmptyAction
  //     new_action = { ...new_action, onEmpty: true };
  //   }
  //   new_action = { ...new_action, onAction: true };
  //   dispatch(updateAction(new_action));
  // };
  // const handleMouseEnter = () => {
  //   if (action.onAction) {
  //     ClickZoneManager.handleClick({
  //       nb_line: props.nb_line,
  //       nb_column: props.nb_column,
  //       action,
  //       board,
  //       level,
  //       dispatch,
  //       setIsModifiedInPurposeState,
  //     });
  //   }
  // };
  // document.onmouseup = () => {
  //   if (action.onAction) {
  //     let new_action = action;
  //     new_action = { ...new_action, onAction: false, onEmpty: false };
  //     dispatch(updateAction(new_action));
  //   }
  // };

  // React.useEffect(() => {
  //   if (isModifiedInPurposeState) {
  //     ConstraintManager.checkConstraints(true, props.nb_line, props.nb_column, board, level, dispatch);
  //     setIsModifiedInPurposeState(false);
  //   }
  // }, [board.currentBoard[props.nb_line][props.nb_column]]);

  return (
    <button
      // onMouseDown={() => handleMouseDown()}
      // onMouseEnter={() => handleMouseEnter()}
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
