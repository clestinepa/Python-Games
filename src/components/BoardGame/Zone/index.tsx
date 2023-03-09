import React, { useState } from "react";
// import {clickZone} from "../Board"
import "../../../styles/zone.css";

interface Props {
  nb_line: number;
  nb_column: number;
  clickZone: (setStateZone?:(value: string) => void) => void;
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

  const changeState = (value:string) => {
    setClassNameState(value);
  }

  const handleMouseDown = () => {
    props.clickZone(changeState);
    window.globalData.REACT_APP_GAME_ON_ACTION = true; //after because like that clickZone+ON_ACTION=false => first zone clicked
  };
  const handleMouseEnter = () => {
    if (window.globalData.REACT_APP_GAME_ON_ACTION) {
      props.clickZone(changeState);
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
