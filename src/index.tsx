import React from "react";
import ReactDOM from "react-dom";
import "./styles/scss.scss";
import App from "./components/App/App";

export type resType = {
  text: string;
  value: number;
  isReady?: boolean;
  name?: string;
};

export const testProps: resType = {
  text: "Hello, my name is Vadimasdasd!!!!",
  value: 10,
  isReady: true,
  name: 'Alisa',
};

ReactDOM.render(
  <App { ...testProps } />,
  document.getElementById("root")
);
