import "./styles/global.css";
import App from "./components/App";
import { createRoot } from "react-dom/client";
import { store } from "./redux/store";
import { Provider } from "react-redux";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById("root")!);

// Declare the custom structure of window used for configuration (see env.js)
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globalData?: any;
  }
}

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
