import { useState } from "react";
import "../../../styles/zone.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { onAction, onEmpty, selectApiAction } from "../ActionButton/redux";
import {
  crossZone,
  emptyZone,
  fillZone,
  selectApiCurrentBoard,
} from "../redux";

interface Props {
  nb_line: number;
  nb_column: number;
}

//lié className et useSelector currentBoard[properZone]
const Zone: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const action = useAppSelector(selectApiAction);
  const currentBoard = useAppSelector(selectApiCurrentBoard);

  const [classNameState, setClassNameState] = useState(
    "zone zone_empty line_" +
      props.nb_line +
      " column_" +
      props.nb_column
  );

  const handleMouseDown = () => {
    clickZone();
    dispatch(onAction(true));
  };
  const handleMouseEnter = () => {
    if (action.onAction) {
      clickZone();
    }
  };
  document.onmouseup = () => {
    if (action.onAction) {
      dispatch(onAction(false));
      dispatch(onEmpty(false));
    }
  };

  const clickZone = () => {
    let new_class = classNameState;
    if (action.onFill) {
      if (currentBoard[props.nb_line][props.nb_column] === 1) {
        //if already fill
        if (!action.onAction) {
          //only the first zone define if its an empty action or not
          dispatch(onEmpty(true));
        }
        if (action.onEmpty) {
          new_class = classNameState.replace("zone_fill", "zone_empty");
          dispatch(emptyZone(props.nb_line, props.nb_column));
        }
      } else {
        if (!action.onEmpty) {
          new_class = classNameState.replace("zone_empty", "zone_fill");
          new_class = new_class.replace("zone_cross", "zone_fill");
          dispatch(fillZone(props.nb_line, props.nb_column));
        }
      }
    } else if (action.onCross) {
      if (currentBoard[props.nb_line][props.nb_column] === 2) {
        //if already cross
        if (!action.onAction) {
          //only the first zone define if its an empty action or not
          dispatch(onEmpty(true));
        }
        if (action.onEmpty) {
          new_class = classNameState.replace("zone_cross", "zone_empty");
          dispatch(emptyZone(props.nb_line, props.nb_column));
        }
      } else {
        if (!action.onEmpty) {
          new_class = classNameState.replace("zone_empty", "zone_cross");
          new_class = new_class.replace("zone_fill", "zone_cross");
          dispatch(crossZone(props.nb_line, props.nb_column));
        }
      }
    }
    setClassNameState(new_class);
    checkConstraint();

  };

  const checkConstraint = () => {
    // console.log("check constraints");
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