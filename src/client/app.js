import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import {Provider}from "mobx-react";
import App from "./views/App";
import appState from "../client/store/appStore"

const root = document.getElementById("root");
const render = Component => {
  const renderMethod = module.hot?ReactDOM.render : ReactDOM.hydrate;
  renderMethod(
    <AppContainer>
      <Provider appState={new appState()}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root
  );
};
render(App);
if (module.hot) {
  module.hot.accept("./views/App", () => {
    const NextApp = require("./views/App").default;
    render(NextApp);
  });
}
