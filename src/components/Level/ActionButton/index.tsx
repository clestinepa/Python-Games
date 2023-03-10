import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import "../../../styles/action.css";
import { onCross, onFill, selectApiAction } from "./redux";

const ActionButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const action = useAppSelector(selectApiAction);

  const [actionButtonState, setActionButtonState] = React.useState({
    class:
    "fill",
    text: "Fill",
  });


  const handleClick = () => {

    if (action.onFill) {
      setActionButtonState({class:"cross", text:"Cross"});
      dispatch(onFill(false))
      dispatch(onCross(true))
    } else if (action.onCross) {
      setActionButtonState({class:"fill", text:"Fill"});
      dispatch(onFill(true))
      dispatch(onCross(false))
    }
  };

  return (
    <button
      onClick={() => handleClick()}
      id="action"
      className={actionButtonState.class}
    >
      {actionButtonState.text}
    </button>
  );
};

export default ActionButton;
