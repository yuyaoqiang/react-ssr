import React from "react";
import App from "./views/App";
import { StaticRouter } from "react-router-dom";
import { Provider, useStaticRendering } from "mobx-react";
import {createStoreMap} from "./store/store"

useStaticRendering(true);
export default (stores, routerContent, url) => (
    <Provider {...stores}>
      <StaticRouter context={routerContent} location={url}>
        <App />
      </StaticRouter>
    </Provider>
  )

export { createStoreMap }
