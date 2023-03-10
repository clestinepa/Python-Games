import React, { useState } from "react";
import {clickZone} from "../Board"
import "../../../styles/zone.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { onAction, selectApiAction } from "../ActionButton/redux";

interface Props {
  nb_line: number;
  nb_column: number;
  border_right?: boolean;
}

//lié className et useSelector currentBoard[properZone]
const Zone: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const action = useAppSelector(selectApiAction);
  
  const [classNameState, setClassNameState] = useState(
    "zone zone_empty line_" +
      props.nb_line +
      " column_" +
      props.nb_column +
      (props.border_right ? " border_right" : "")
  );

  const handleMouseDown = () => {
    clickZone();
    dispatch(onAction(true))
  };
  const handleMouseEnter = () => {
    if (action.onAction) {
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
