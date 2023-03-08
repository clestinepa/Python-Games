import React from "react";
import Clue from "../Clue";
import { Level } from "../interfaces";
import "../../../styles/clues.css";

interface Props {
  level: Level;
}
const CluesLine: React.FC<Props> = (props: Props) => {
  const allCluesLines: Array<Array<JSX.Element>> = [];

  for (let nb_line = 0; nb_line < props.level.size; nb_line++) {
    let cluesLine: Array<JSX.Element> = [];
    for (let value of props.level.clues.line[nb_line]) {
      cluesLine.push(<Clue value={value} />);
    }
    allCluesLines.push(cluesLine);
  }

  return (
    <ul id="clues_lines">
      {allCluesLines.map((cluesLine, index) => {
        return (
          <li
            key={index}
            id={"container_clues_line_" + index}
            className={
              "container_clues_line" +
              ((index + 1) % 5 === 0
                ? index + 1 !== props.level.size
                  ? " border_bottom"
                  : ""
                : "")
            }
          >
            <div id={"line_" + index} className={"clues_line clues_normal"}>
              {cluesLine.map((clue) => {
                return clue;
              })}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CluesLine;
