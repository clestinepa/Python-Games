import { useAppSelector } from "../../../redux/hooks";
import "../../../styles/count.css";
import { selectGame } from "../../../redux/slices/game";

const Count: React.FC = () => {
  const game = useAppSelector(selectGame);
  const level = game.level;
  const board = game.board;

  return (
    <div>
      <p id="count_fill">{board.currentFill + " / " + level.nb_fill}</p>
      <p id="alert_count" className="alert_hidden">
        To much filled zone
      </p>
    </div>
  );
};

export default Count;
