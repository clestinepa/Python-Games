import React from "react";
import Clue from "../Clue";
import { Level } from "../interfaces";
import "../../../styles/clues.css";

interface Props {
  level: Level;
}

const CluesColumn: React.FC<Props> = (props: Props) => {
  const allCluesColumns: Array<Array<JSX.Element>> = [];

  for (let nb_columns = 0; nb_columns < props.level.size; nb_columns++) {
    let cluesColumn: Array<JSX.Element> = [];
    for (let value of props.level.clues.column[nb_columns]) {
      cluesColumn.push(<Clue value={value} />);
    }
    allCluesColumns.push(cluesColumn);
  }

  return (
    <ul id="clues_columns">
      {allCluesColumns.map((cluesColumn, index) => {
        return (
          <li
            key={index}
            id={"container_clues_column_" + index}
            className={
              "container_clues_column" +
              ((index + 1) % 5 === 0
                ? index + 1 !== props.level.size
                  ? " border_right"
                  : ""
                : "")
            }
          >
            <div id={"column_" + index} className={"clues_column clues_normal"}>
              {cluesColumn.map((clue) => {
                return clue;
              })}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CluesColumn;
