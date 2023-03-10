import { useAppSelector } from "../../../../../redux/hooks";
import { selectApiLevel } from "../../../redux";
import Zone from "../../Zone";

interface Props {
  nb_line: number;
  index: number;
}

const GroupFiveZone: React.FC<Props> = (props: Props) => {
  const level = useAppSelector(selectApiLevel);

  let group_five_zones: Array<JSX.Element> = [];
  for (let nb_column = 0; nb_column < 5; nb_column++) {
    group_five_zones.push(
      <Zone nb_line={props.nb_line} nb_column={nb_column + props.index * 5} />
    );
  }

  const renderGroupFiveZones = () => {
    return group_five_zones.map((zone) => {
      return zone;
    });
  };

  return (
    <div
      className={
        "group_five_zones" +
        (props.index + 1 === level.size / 5 ? "" : " border_right")
      }
    >
      {renderGroupFiveZones()}
    </div>
  );
};

export default GroupFiveZone;
