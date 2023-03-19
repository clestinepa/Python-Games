import { useAppSelector } from "../../../../redux/hooks";
import Clue from "../../Clue";
import { CluesType } from "../../interfaces/LevelSource";
import { selectApiBoard, selectApiLevel } from "../../redux";

interface Props {
  nb_line: number;
}

const CluesLine: React.FC<Props> = (props: Props) => {
  const level = useAppSelector(selectApiLevel);
  const board = useAppSelector(selectApiBoard);


  let cluesLine: Array<JSX.Element> = [];
  for (let index = 0; index < level.clues.line[props.nb_line].length; index++) {
    let value = level.clues.line[props.nb_line][index];
    cluesLine.push(
      <Clue
        nb_line={props.nb_line}
        index={index}
        value={value}
        type={CluesType.Line}
      />
    );
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
      <div
        id={"line_" + props.nb_line}
        className={
          "clues_line " + board.classCluesLines[props.nb_line].classGlobal
        }
      >
        {renderCluesColumns()}
      </div>
    </li>
  );
};

export default CluesLine;
