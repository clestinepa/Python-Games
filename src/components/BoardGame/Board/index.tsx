import React from "react";
import Zone from "../Zone";
import { Level } from "../interfaces";
import "../../../styles/board.css";

interface Props {
  level: Level;
}
const Board: React.FC<Props> = (props: Props) => {
  const allLines: Array<Array<Array<JSX.Element>>> = [];
  for (let nb_line = 0; nb_line < props.level.size; nb_line++) {
    let line: Array<Array<JSX.Element>> = [];
    let group_five_zones: Array<JSX.Element> = [
      <p></p>,
      <p></p>,
      <p></p>,
      <p></p>,
      <p></p>,
    ]; //I don't know why but group_five_zones needs initialization
    for (let nb_column = 0; nb_column < props.level.size; nb_column++) {
      if (group_five_zones.length === 5) {
        line.push(group_five_zones);
        group_five_zones.length = 0;
      }
      group_five_zones.push(<Zone nb_line={nb_line} nb_column={nb_column} />);
    }
    allLines.push(line);
  }

  return (
    <ul id="board">
      {allLines.map((line, index) => {
        return (
          <li
            key={index}
            className={
              "line" +
              ((index + 1) % 5 === 0
                ? index + 1 !== props.level.size
                  ? " border_bottom"
                  : ""
                : "")
            }
          >
            {line.map((group_five_zones, index) => {
              return (
                <div
                  className={
                    "group_five_zones" +
                    (index + 1 !== props.level.size / 5 ? " border_right" : "")
                  }
                >
                  {group_five_zones.map((zone) => {
                    return zone;
                  })}
                </div>
              );
            })}
          </li>
        );
      })}
    </ul>
  );
};

export default Board;
