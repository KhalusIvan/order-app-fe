import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

import App from "./App";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { APP_TITLE, APP_DESCRIPTION } from "./utils/constants";
import { store } from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet titleTemplate="%s | LedgerCoin" defaultTitle="LedgerCoin" />
      <Helmet>
        <meta name="description" content={APP_DESCRIPTION} />
        <link
          rel="stylesheet"
          //href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700&display=swap"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Helmet>
      <Provider store={store}>
        <App />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
