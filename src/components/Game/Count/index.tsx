import { useAppSelector } from "../../../redux/hooks";
import { selectApiBoard, selectApiLevel } from "../redux";
import "../../../styles/count.css";

const Count: React.FC = () => {
  const board = useAppSelector(selectApiBoard);
  const level = useAppSelector(selectApiLevel);

  return (
    <div>
      <p id="count_fill">{board.currentFill + " / " + level.nb_fill}</p>
      <p id="alert_count" className="alert_hidden">To much filled zone</p>
    </div>
  );
};

export default Count;
