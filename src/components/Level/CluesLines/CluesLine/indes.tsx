import { useAppSelector } from "../../../../redux/hooks";
import Clue from "../../Clue";
import { selectApiLevel } from "../../redux";

interface Props {
  nb_line: number;
}

const CluesLine: React.FC<Props> = (props: Props) => {
  const level = useAppSelector(selectApiLevel);

  let cluesLine: Array<JSX.Element> = [];
  for (let value of level.clues.line[props.nb_line]) {
    cluesLine.push(<Clue value={value} />);
  }

  const renderCluesColumns = () => {
    return cluesLine.map((clue) => {
      return clue;
    });
  };

  return (
    <li
    key={props.nb_line}
    id={"container_clues_line_" + props.nb_line}
    className={
      "container_clues_line" +
      ((props.nb_line + 1) % 5 === 0
        ? props.nb_line + 1 !== level.size
          ? " border_bottom"
          : ""
        : "")
    }
    >
      <div id={"line_" + props.nb_line} className={"clues_line clues_normal"}>
        {renderCluesColumns()}
      </div>
    </li>
  );
};

export default CluesLine;
