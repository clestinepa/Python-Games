import { CluesType } from "../../../models/game";
import { useAppSelector } from "../../../redux/hooks";
import { selectGame } from "../../../redux/slices/game";
import "../../../styles/clue.css";

interface Props {
  nb_line?: number;
  nb_column?: number;
  index: number;
  type: CluesType;
  value: number;
}

const Clue: React.FC<Props> = (props: Props) => {
  const board = useAppSelector(selectGame).board;

  let classList = (props.type === CluesType.Column ? board.classCluesColumns[props.nb_column!] : board.classCluesLines[props.nb_line!]).classClues;

  return (
    <p
      id={
        "clue_" +
        props.index +
        "_of_" +
        (props.type === CluesType.Line ? "line_" : "column_") +
        (props.nb_line ? props.nb_line : "") +
        (props.nb_column ? props.nb_column : "")
      }
      className={"clue " + classList[props.index]}>
      {props.value}
    </p>
  );
};

export default Clue;
