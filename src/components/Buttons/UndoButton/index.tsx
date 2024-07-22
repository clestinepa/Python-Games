import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import "../../../styles/action.css";
import { selectGame, undoLastAction } from "../../../redux/slices/game";
import ConstraintManager from "../../../domain/constraintManager";


//PROBLEMES !
//Cross sur Fill ne réduit pas le count de fill
// vitesse a encore des problèmes avec undo dans quelques cas particuliers (a identifier)


const UndoButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectGame);
  const pastActions = game.pastActions;
  const level = game.level;
  const board = game.board;

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
      ConstraintManager.checkConstraints(false, undoState.nb_line, undoState.nb_column, board, level, dispatch);
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
    <button onClick={() => {console.log(pastActions)}}>
      check
    </button>
    </div>
  );
};

export default UndoButton;
