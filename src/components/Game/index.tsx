import ActionButton from "../Buttons/ActionButton";
import "../../styles/board.css";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Count from "./Count";
import UndoButton from "../Buttons/UndoButton";
import { initialBoard, selectGame } from "../../redux/slices/game";
import CluesColumns from "../Clues/CluesColumns";
import CluesLines from "../Clues/CluesLines";
import Board from "../Board";

/** Detail des elements
 * ZONE : id=line_.._column_..
 *      * zone
 *      * zone_fill / zone_empty / zone_cross
 *      * line_..
 *      * column_..
 *      * [border_right]
 *
 * CLUES_LINE : id=line_..
 *      * clues_line
 *      * clues_ERROR / clues_done / clues_normal
 *
 * CLUES_COLUMNS : id=column_..
 *      * clues_column
 *      * clues_ERROR / clues_done / clues_normal
 *
 * CLUE : id=
 *      * clue
 *      * clue_ERROR / clue_done / clue_normal
 */

const Game: React.FC = () => {
  const dispatch = useAppDispatch();
  const level = useAppSelector(selectGame).level;
  dispatch(initialBoard(level));

  return (
    <div id="board_game">
      <Count />
      <div id="board_with_all_clues">
        <CluesColumns />
        <div id="board_with_clues_line">
          <CluesLines />
          <Board />
        </div>
      </div>
      <ActionButton />
      <UndoButton />
    </div>
  );
};

export default Game;
