import { useAppSelector } from "../../../redux/hooks";
import "../../../styles/clue.css";
import { selectApiCluesColumns } from "../CluesColumns/redux";
import { selectApiCluesLines } from "../CluesLines/redux";

export enum ClueType {
  Line,
  Column,
}

interface Props {
  nb_line?: number;
  nb_column?: number;
  index: number;
  type: ClueType;
  value: number;
}

const Clue: React.FC<Props> = (props: Props) => {
  const classCluesColumns = useAppSelector(selectApiCluesColumns);
  const classCluesLines = useAppSelector(selectApiCluesLines);
  let classList = ( props.type === ClueType.Column ? classCluesColumns[props.nb_column!] : classCluesLines[props.nb_line!]).classClues

  return (
    <p
      id={
        "clue_" +
        props.index +
        "_of_" +
        (props.type === ClueType.Line ? "line_" : "column_") +
        (props.nb_line ? props.nb_line : "") +
        (props.nb_column ? props.nb_column : "")
      }
      className={"clue " + classList[props.index]}
    >
      {props.value}
    </p>
  );
};

export default Clue;
