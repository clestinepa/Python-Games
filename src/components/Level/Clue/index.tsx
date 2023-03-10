import "../../../styles/clue.css";

interface Props {
  value: number;
}

const Clue: React.FC<Props> = (props: Props) => {
  return <p className="clue clue_normal">{props.value}</p>;
};

export default Clue;
