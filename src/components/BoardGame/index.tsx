import React from "react";
import CluesColumn from "./CluesColumn";
import CluesLine from "./CluesLine";
import Board from "./Board";
import ActionButton from "./ActionButton";
import { Level } from "./interfaces";
import "../../styles/board.css";

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

interface Props {
  level: Level;
}

const BoardGame: React.FC<Props> = (props: Props) => {
  return (
    <div id="board_game">
      <div id="board_with_all_clues">
        <CluesColumn level={props.level} />
        <div id="board_with_clues_line">
          <CluesLine level={props.level} />
          <Board level={props.level} />
        </div>
      </div>
      <ActionButton />
    </div>
  );
};

export default BoardGame;