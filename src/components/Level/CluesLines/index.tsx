import "../../../styles/clues.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectApiLevel } from "../redux";
import CluesLine from "./CluesLine";
import { initialCluesLines } from "./redux";

const CluesLines: React.FC = () => {
  const dispatch = useAppDispatch();
  const level = useAppSelector(selectApiLevel);

  dispatch(initialCluesLines(level));

  let cluesLines: Array<JSX.Element> = [];
  for (let nb_line = 0; nb_line < level.size; nb_line++) {
    cluesLines.push(<CluesLine nb_line={nb_line}/>);
  }

  const renderCluesLines = () => {
    return cluesLines.map((cluesLine) => {
      return cluesLine;
    });
  };

  return <ul id="clues_lines">{renderCluesLines()}</ul>;
};

export default CluesLines;
