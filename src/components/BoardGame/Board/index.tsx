import React from "react";
import Zone from "../Zone";
import "../../../styles/board.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {selectApiLevel } from "../redux";
import { onAction, onEmpty, selectApiAction } from "../ActionButton/redux";

const Board: React.FC = () => {
  const dispatch = useAppDispatch();
  const action = useAppSelector(selectApiAction);
  const level = useAppSelector(selectApiLevel);
  const allLines: Array<Array<Array<JSX.Element>>> = [];
  // const [currentBoardState,setCurrentBoardState] = useState([[0]]);

  document.onmouseup = () => {
    if (action.onAction) {
      dispatch(onAction(false));
      dispatch(onEmpty(false));
    }
  };

  for (let nb_line = 0; nb_line < level.size; nb_line++) {
    let line: Array<Array<JSX.Element>> = [];
    //I don't know why but group_five_zones needs initialization
    let p = <p></p>;
    let group_five_zones: Array<JSX.Element> = [p, p, p, p, p];
    for (let nb_column = 0; nb_column < level.size; nb_column++) {
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
                ? index + 1 !== level.size
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
                    (index + 1 !== level.size / 5 ? " border_right" : "")
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

export function clickZone() {
  console.log("test");
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
}

function checkConstraint(nb_line: number, nb_column: number) {
  // console.log("check constraints");
}
