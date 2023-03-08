import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

declare global {
  interface Window {
    globalData?: any;
  }
}

ReactDOM.render(<App/>, document.getElementById("root"));
