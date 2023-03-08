import React, { useState } from "react";
import "../../../styles/action.css";

const ActionButton: React.FC = () => {
  const [classNameState, setClassNameState] = useState("fill");
  const [valueState, setValueState] = useState("Fill");

  const handleClick = () => {
    if (window.globalData.REACT_APP_GAME_ON_FILL) {
      setValueState("Cross");
      setClassNameState("cross");
      window.globalData.REACT_APP_GAME_ON_FILL = false;
      window.globalData.REACT_APP_GAME_ON_CROSS = true;
    } else if (window.globalData.REACT_APP_GAME_ON_CROSS) {
      setValueState("Fill");
      setClassNameState("fill");
      window.globalData.REACT_APP_GAME_ON_FILL = true;
      window.globalData.REACT_APP_GAME_ON_CROSS = false;
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
