import Line from "./Line";
import "../../../styles/board.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectApiLevel } from "../redux";
import { initialBoard } from "./redux";

const Board: React.FC = () => {
  const dispatch = useAppDispatch();
  const level = useAppSelector(selectApiLevel);

  dispatch(initialBoard(level));
 
  let lines: Array<JSX.Element> = [];
  for (let nb_line = 0; nb_line < level.size; nb_line++) {
    lines.push(<Line nb_line={nb_line} />);
  }

  const renderLines = () => {
    return lines.map((line) => {
      return line;
    });
  };

  return <ul id="board">{renderLines()}</ul>;
};

export default Board;
