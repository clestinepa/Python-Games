import React from "react";
import Clue from "../Clue";
import "../../../styles/clues.css";
import { useAppSelector } from "../../../redux/hooks";

const CluesLine: React.FC = () => {
  const levelSize = useAppSelector((state) => state.boardGame.level.size)
  const levelCuesLine = useAppSelector((state) => state.boardGame.level.clues.line)

  const allCluesLines: Array<Array<JSX.Element>> = [];

  for (let nb_line = 0; nb_line < levelSize; nb_line++) {
    let cluesLine: Array<JSX.Element> = [];
    for (let value of levelCuesLine[nb_line]) {
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
                ? index + 1 !== levelSize
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
