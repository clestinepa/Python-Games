import { CluesType } from "../../../models/game";
import { useAppSelector } from "../../../redux/hooks";
import { selectGame } from "../../../redux/slices/game";
import Clue from "../Clue";

interface Props {
  nb_column: number;
}

const CluesColumn: React.FC<Props> = (props: Props) => {
  const game = useAppSelector(selectGame);
  const level = game.level;
  const board = game.board;

  let cluesColumn: Array<JSX.Element> = [];
  for (let index = 0; index < level.clues.column[props.nb_column].length; index++) {
    let value = level.clues.column[props.nb_column][index];
    cluesColumn.push(<Clue nb_column={props.nb_column} index={index} value={value} type={CluesType.Column} />);
  }

  const renderCluesColumns = () => {
    return cluesColumn.map((clue) => {
      return clue;
    });
  };

  return (
    <li
      key={props.nb_column}
      id={"container_clues_column_" + props.nb_column}
      className={"container_clues_column" + ((props.nb_column + 1) % 5 === 0 ? (props.nb_column + 1 !== level.size ? " border_right" : "") : "")}>
      <div id={"column_" + props.nb_column} className={"clues_column " + board.classCluesColumns[props.nb_column].classGlobal}>
        {renderCluesColumns()}
      </div>
    </li>
  );
};

export default CluesColumn;
