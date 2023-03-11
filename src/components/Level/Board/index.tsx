import Line from "./Line";
import "../../../styles/board.css";
import { useAppSelector } from "../../../redux/hooks";
import { selectApiLevel } from "../redux";

const Board: React.FC = () => {
  const level = useAppSelector(selectApiLevel);

 
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
