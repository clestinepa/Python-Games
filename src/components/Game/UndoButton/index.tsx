import { useAppSelector } from "../../../redux/hooks";
import "../../../styles/action.css";
import { selectApiPastAction } from "../redux";
const UndoButton: React.FC = () => {
  const pastActions = useAppSelector(selectApiPastAction);


  const handleClick = () => {
    console.log(pastActions)
  };

  return (
    <button
      onClick={() => handleClick()}
      id="undoButton"
    >
        UNDO
    </button>
  );
};

export default UndoButton;