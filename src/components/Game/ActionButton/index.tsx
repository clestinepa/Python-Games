import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import "../../../styles/action.css";
import { selectApiAction, updateAction } from "./redux";

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
      let new_action = action;
      new_action = { ...new_action, onFill: false, onCross:true };
      dispatch(updateAction(new_action));

    } else if (action.onCross) {
      setActionButtonState({class:"fill", text:"Fill"});
      let new_action = action;
      new_action = { ...new_action, onFill: true, onCross:false };
      dispatch(updateAction(new_action));

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
