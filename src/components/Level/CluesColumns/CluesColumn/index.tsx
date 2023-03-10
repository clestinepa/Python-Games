import { useAppSelector } from "../../../../redux/hooks";
import Clue from "../../Clue";
import { selectApiLevel } from "../../redux";

interface Props {
  nb_column: number;
}

const CluesColumn: React.FC<Props> = (props: Props) => {
  const level = useAppSelector(selectApiLevel);

  let cluesColumn: Array<JSX.Element> = [];
  for (let value of level.clues.column[props.nb_column]) {
    cluesColumn.push(<Clue value={value} />);
  }

  const renderCluesColumns = () => {
    return cluesColumn.map((clue) => {
      return clue;
    });
  };

  return (
    <li
      key={ props.nb_column}
      id={"container_clues_column_" +  props.nb_column}
      className={
        "container_clues_column" +
        (( props.nb_column + 1) % 5 === 0
          ?  props.nb_column + 1 !== level.size
            ? " border_right"
            : ""
          : "")
      }
    >
      <div
        id={"column_" + props.nb_column}
        className={"clues_column clues_normal"}
      >
        {renderCluesColumns()}
      </div>
    </li>
  );
};

export default CluesColumn;
