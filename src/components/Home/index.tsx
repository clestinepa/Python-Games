import React from "react";
import Button from "./Button";
import "../../styles/home.css";

const Home: React.FC = () => {
  return (
    <div className="chooseLevel">
      <p>Choose your difficulties</p>
      <ul>
        <li>
          <Button difficulty={0} />
          <Button difficulty={1} />
          <Button difficulty={2} />
          <Button difficulty={3} />
        </li>
      </ul>
    </div>
  );
};

export default Home;
