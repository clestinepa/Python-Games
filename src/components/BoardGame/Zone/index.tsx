import React, { useState } from "react";
import "../../../styles/zone.css";

interface Props {
  nb_line: number;
  nb_column: number;
  border_right?: boolean;
}

const Zone: React.FC<Props> = (props: Props) => {
  const [classNameState, setClassNameState] = useState(
    "zone zone_empty line_" +
      props.nb_line +
      " column_" +
      props.nb_column +
      (props.border_right ? " border_right" : "")
  );
  const [currentState, setCurrentState] = useState(0);

  const clickZone = () => {
    let new_className = classNameState;
    if (window.globalData.REACT_APP_GAME_ON_FILL) {
      if (currentState === 1) {
        //if already fill
        if (!window.globalData.REACT_APP_GAME_ON_ACTION) {
          //only the first zone define if its an empty action or not
          window.globalData.REACT_APP_GAME_ON_EMPTY = true;
        }
        if (window.globalData.REACT_APP_GAME_ON_EMPTY) {
          new_className = classNameState.replace("zone_fill", "zone_empty");
          setCurrentState(0);
        }
      } else {
        if (!window.globalData.REACT_APP_GAME_ON_EMPTY) {
          new_className = classNameState.replace("zone_empty", "zone_fill");
          new_className = new_className.replace("zone_cross", "zone_fill");
          setCurrentState(1);
        }
      }
    } else if (window.globalData.REACT_APP_GAME_ON_CROSS) {
      if (currentState === 2) {
        //if already cross
        if (!window.globalData.REACT_APP_GAME_ON_ACTION) {
          //only the first zone define if its an empty action or not
          window.globalData.REACT_APP_GAME_ON_EMPTY = true;
        }
        if (window.globalData.REACT_APP_GAME_ON_EMPTY) {
          new_className = classNameState.replace("zone_cross", "zone_empty");
          setCurrentState(0);
        }
      } else {
        if (!window.globalData.REACT_APP_GAME_ON_EMPTY) {
          new_className = classNameState.replace("zone_empty", "zone_cross");
          new_className = new_className.replace("zone_fill", "zone_cross");
          setCurrentState(2);
        }
      }
    }
    setClassNameState(new_className);
    checkConstraint(props.nb_line, props.nb_column);
  };
  const handleMouseDown = () => {
    clickZone();
    window.globalData.REACT_APP_GAME_ON_ACTION = true; //after because like that clickZone+ON_ACTION=false => first zone clicked
  };
  const handleMouseEnter = () => {
    if (window.globalData.REACT_APP_GAME_ON_ACTION) {
      clickZone();
    }
  };

  return (
    <button
      onMouseDown={() => handleMouseDown()}
      onMouseEnter={() => handleMouseEnter()}
      id={"line_" + props.nb_line + "_column_" + props.nb_column}
      className={classNameState}
      draggable={false}
    ></button>
  );
};

export default Zone;

function checkConstraint(nb_line: number, nb_column: number) {
  // console.log("check constraints");
}

document.onmouseup = () => {
  if (window.globalData.REACT_APP_GAME_ON_ACTION) {
    window.globalData.REACT_APP_GAME_ON_ACTION = false;
    window.globalData.REACT_APP_GAME_ON_EMPTY = false;
  }
};
