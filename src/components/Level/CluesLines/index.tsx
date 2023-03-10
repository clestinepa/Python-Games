import "../../../styles/clues.css";
import { useAppSelector } from "../../../redux/hooks";
import { selectApiLevel } from "../redux";
import CluesLine from "./CluesLine/indes";

const CluesLines: React.FC = () => {
  const level = useAppSelector(selectApiLevel);

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
