import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import "../../../styles/action.css";
import { onCross, onFill, selectApiAction } from "./redux";

const ActionButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const action = useAppSelector(selectApiAction);

  const [classNameState, setClassNameState] = useState("fill");
  const [valueState, setValueState] = useState("Fill");

  const handleClick = () => {

    if (action.onFill) {
      setValueState("Cross");
      setClassNameState("cross");
      dispatch(onFill(false))
      dispatch(onCross(true))
    } else if (action.onCross) {
      setValueState("Fill");
      setClassNameState("fill");
      dispatch(onFill(true))
      dispatch(onCross(false))
    }
  };

  return (
    <button
      onClick={() => handleClick()}
      id="action"
      className={classNameState}
    >
      {valueState}
    </button>
  );
};

export default ActionButton;
