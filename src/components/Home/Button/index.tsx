import React from "react";

interface Props {
  difficulty: number;
}

const Button: React.FC<Props> = (props: Props) => {
  let desc = "";
  switch (props.difficulty) {
    case 0:
      desc = "easy";
      break;
    case 1:
      desc = "medium";
      break;
    case 2:
      desc = "hard";
      break;
    case 3:
      desc = "expert";
      break;
    default:
      desc = "unknown";
      break;
  }
  const displayLevel = () => {
    if (props.difficulty === 1) {
      console.log("click");
      window.globalData.REACT_APP_ON_GAME = true;
      console.log(window.globalData);
    }
  };

  return (
    <button className="buttonChooseLevel" onClick={() => displayLevel()}>
      {desc}
    </button>
  );
};

export default Button;
