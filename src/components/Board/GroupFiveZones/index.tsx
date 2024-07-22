import { useAppSelector } from "../../../redux/hooks";
import { selectGame } from "../../../redux/slices/game";

import Zone from "../Zone";

interface Props {
  nb_line: number;
  index: number;
}

const GroupFiveZones: React.FC<Props> = (props: Props) => {
  const level = useAppSelector(selectGame).level;

  let group_five_zones: Array<JSX.Element> = [];
  for (let nb_column = 0; nb_column < 5; nb_column++) {
    group_five_zones.push(<Zone nb_line={props.nb_line} nb_column={nb_column + props.index * 5} />);
  }

  const renderGroupFiveZones = () => {
    return group_five_zones.map((zone) => {
      return zone;
    });
  };

  return <div className={"group_five_zones" + (props.index + 1 === level.size / 5 ? "" : " border_right")}>{renderGroupFiveZones()}</div>;
};

export default GroupFiveZones;
