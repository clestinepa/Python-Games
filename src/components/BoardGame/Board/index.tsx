import React from "react";
import Zone from "../Zone";
import "../../../styles/board.css";
import { useAppSelector } from "../../../redux/hooks";



const Board: React.FC = () => {
  // const [currentBoardState,setCurrentBoardState] = useState([[0]]);
  const levelSize = useAppSelector((state) => state.boardGame.level.size)
  const allLines: Array<Array<Array<JSX.Element>>> = [];

  for (let nb_line = 0; nb_line < levelSize; nb_line++) {
    let line: Array<Array<JSX.Element>> = [];
    let group_five_zones: Array<JSX.Element> = [
      <p></p>,
      <p></p>,
      <p></p>,
      <p></p>,
      <p></p>,
    ]; //I don't know why but group_five_zones needs initialization
    for (let nb_column = 0; nb_column < levelSize; nb_column++) {
      if (group_five_zones.length === 5) {
        line.push(group_five_zones);
        group_five_zones.length = 0;
      }
      group_five_zones.push(<Zone nb_line={nb_line} nb_column={nb_column} clickZone={() => clickZone()}/>);
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
                ? index + 1 !== levelSize
                  ? " border_bottom"
                  : ""
                : "")
            }
          >
            {line.map((group_five_zones, index) => {
              return (
                <div
                key={index}
                  className={
                    "group_five_zones" +
                    (index + 1 !== levelSize / 5 ? " border_right" : "")
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

export function clickZone(setStateZone?:(value: string) => void) {
  console.log("test")
setStateZone!("c");
  // let new_className = classNameState;
  // if (window.globalData.REACT_APP_GAME_ON_FILL) {
  //   if (zoneState === 1) {
  //     //if already fill
  //     if (!window.globalData.REACT_APP_GAME_ON_ACTION) {
  //       //only the first zone define if its an empty action or not
  //       window.globalData.REACT_APP_GAME_ON_EMPTY = true;
  //     }
  //     if (window.globalData.REACT_APP_GAME_ON_EMPTY) {
  //       new_className = classNameState.replace("zone_fill", "zone_empty");
  //       setZoneState(0);
  //     }
  //   } else {
  //     if (!window.globalData.REACT_APP_GAME_ON_EMPTY) {
  //       new_className = classNameState.replace("zone_empty", "zone_fill");
  //       new_className = new_className.replace("zone_cross", "zone_fill");
  //       setZoneState(1);
  //     }
  //   }
  // } else if (window.globalData.REACT_APP_GAME_ON_CROSS) {
  //   if (zoneState === 2) {
  //     //if already cross
  //     if (!window.globalData.REACT_APP_GAME_ON_ACTION) {
  //       //only the first zone define if its an empty action or not
  //       window.globalData.REACT_APP_GAME_ON_EMPTY = true;
  //     }
  //     if (window.globalData.REACT_APP_GAME_ON_EMPTY) {
  //       new_className = classNameState.replace("zone_cross", "zone_empty");
  //       setZoneState(0);
  //     }
  //   } else {
  //     if (!window.globalData.REACT_APP_GAME_ON_EMPTY) {
  //       new_className = classNameState.replace("zone_empty", "zone_cross");
  //       new_className = new_className.replace("zone_fill", "zone_cross");
  //       setZoneState(2);
  //     }
  //   }
  // }
  // setClassNameState(new_className);
  checkConstraint(0, 0);
};

document.onmouseup = () => {
  if (window.globalData.REACT_APP_GAME_ON_ACTION) {
    window.globalData.REACT_APP_GAME_ON_ACTION = false;
    window.globalData.REACT_APP_GAME_ON_EMPTY = false;
  }
};

function checkConstraint(nb_line: number, nb_column: number) {
  // console.log("check constraints");
}
