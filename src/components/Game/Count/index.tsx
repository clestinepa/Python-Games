import { useAppSelector } from "../../../redux/hooks";
import { selectApiBoard, selectApiLevel } from "../redux";

const Count: React.FC = () => {
    const board = useAppSelector(selectApiBoard);
    const level = useAppSelector(selectApiLevel);

    return (
      <p
        id="count_fill"
      >
        {board.currentFill + " / " + level.nb_fill}
      </p>
    );
  };
  
  export default Count;