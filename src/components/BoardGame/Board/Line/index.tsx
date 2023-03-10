import React from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { selectApiLevel } from "../../redux";
import GroupFiveZone from "./GroupFiveZone";

interface Props {
  nb_line: number;
  last?: boolean;
}

const Line: React.FC<Props> = (props: Props) => {
  const level = useAppSelector(selectApiLevel);
  const line: Array<JSX.Element> = [];

  for (let index = 0; index < level.size / 5; index++) {
    line.push(
      <GroupFiveZone
        nb_line={props.nb_line}
        index={index}
        last={index + 1 === level.size / 5 ? true : false}
      />
    );
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
          ? props.last
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
