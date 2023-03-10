import React from "react";
import Zone from "../../../Zone";

interface Props {
  nb_line: number;
  index: number;
  last: boolean;
}

const GroupFiveZone: React.FC<Props> = (props: Props) => {
  const group_five_zones: Array<JSX.Element> = [];

  for (let nb_column = 0; nb_column < 5; nb_column++) {
    group_five_zones.push(
      <Zone
        nb_line={props.nb_line}
        nb_column={nb_column + props.index * 5}
      />
    );
  }

  const renderGroupFiveZones = () => {
    return group_five_zones.map((zone) => {
      return zone;
    });
  };

  return (
    <div className={"group_five_zones" + (props.last ? "" : " border_right")}>
      {renderGroupFiveZones()}
    </div>
  );
};

export default GroupFiveZone;
