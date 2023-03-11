import React from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { selectApiLevel } from "../../redux";
import GroupFiveZone from "./GroupFiveZones";

interface Props {
  nb_line: number;
}

const Line: React.FC<Props> = (props: Props) => {
  const level = useAppSelector(selectApiLevel);

  let line: Array<JSX.Element> = [];
  for (let index = 0; index < level.size / 5; index++) {
    line.push(<GroupFiveZone nb_line={props.nb_line} index={index} />);
  }

  const renderLine = () => {
    return line.map((group_five_zones) => {
      return group_five_zones;
    });
  };

  return (
    <li
      key={props.nb_line}
      className={
        "line" +
        ((props.nb_line + 1) % 5 === 0
          ? props.nb_line + 1 === level.size
            ? ""
            : " border_bottom"
          : "")
      }
    >
      {renderLine()}
    </li>
  );
};

export default Line;
