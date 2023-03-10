import "../../../styles/clues.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectApiLevel } from "../redux";
import CluesColumn from "./CluesColumn";
import { initialCluesColumns } from "./redux";

const CluesColumns: React.FC = () => {
  const dispatch = useAppDispatch();
  const level = useAppSelector(selectApiLevel);

  dispatch(initialCluesColumns(level));

  let cluesColumns: Array<JSX.Element> = [];
  for (let nb_column = 0; nb_column < level.size; nb_column++) {
    cluesColumns.push(<CluesColumn nb_column={nb_column}/>);
  }

  const renderCluesColumns = () => {
    return cluesColumns.map((cluesColumn) => {
      return cluesColumn;
    });
  };

  return <ul id="clues_columns">{renderCluesColumns()}</ul>;
};

export default CluesColumns;