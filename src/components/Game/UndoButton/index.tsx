import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import "../../../styles/action.css";
import { selectApiBoard, selectApiLevel, selectApiPastAction, undoLastAction } from "../redux";
import ClickZoneManagement from "../service/ClickZoneManagement";
import ConstraintManagement from "../service/ConstraintManagement";
const UndoButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const pastActions = useAppSelector(selectApiPastAction);
  const board = useAppSelector(selectApiBoard);
  const level = useAppSelector(selectApiLevel);

  const [undoState, setUndoState] = React.useState({
    onUndo: false,
    nb_line: 0,
    nb_column: 0,
  });

  const handleClick = () => {
    if (pastActions.length !== 0) {
      setUndoState({
        onUndo: true,
        nb_line: pastActions[pastActions.length -1].nb_line ,
        nb_column: pastActions[pastActions.length -1].nb_column,
      });
      dispatch(undoLastAction());
    }
  };

  React.useEffect(() => {
    if (undoState.onUndo) {
      console.log("UNDO : process checkConstraint")
      ConstraintManagement.checkConstraints(false, undoState.nb_line, undoState.nb_column, level, board, dispatch);
      setUndoState({
        onUndo: false,
        nb_line: 0,
        nb_column: 0,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [undoState.onUndo]);

  return (
    <div>
    <button onClick={() => handleClick()} id="undoButton">
      UNDO
    </button>
    <button onClick={() => {ClickZoneManagement.displayQueue()}}>
      check
    </button>
    </div>
  );
};

export default UndoButton;
