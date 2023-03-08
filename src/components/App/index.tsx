import React from "react";
import BoardGame from "../BoardGame";
import "../../styles/global.css";
import { Level } from "../BoardGame/interfaces";

const level: Level = {
  name: "test",
  difficulty: 1,
  size: 10,
  clues: {
    column: [
      [1],
      [3, 2],
      [5, 3],
      [2, 5],
      [1, 4],
      [1, 4],
      [2, 5],
      [5, 3],
      [3, 2],
      [1],
    ],
    line: [[4], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [4], [6], [8], [10]],
  },
};

const App: React.FC = () => {
  return <BoardGame level={level} />;
};

export default App;
