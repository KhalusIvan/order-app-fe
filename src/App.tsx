/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Loader } from "./components/Loader";
import { Alerts } from "./components/Alerts";
import { AddRoute } from "./config/AddRoute";

import { routes } from "./config";
import { Route as AppRoute } from "./types";
import { getAppTheme } from "./styles/theme";
import { LIGHT_MODE_THEME } from "./utils/constants";

import { checkUser } from "./redux/operation/userOperation";
import { useDispatch, useSelector } from "react-redux";

import { getLoaderSelector } from "./redux/selector/loaderSelector";

import { Error404 } from "./pages/Error404";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoaderSelector("check"));

  const theme = useMemo(
    () => getAppTheme(LIGHT_MODE_THEME),
    [LIGHT_MODE_THEME]
  );

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Alerts />
      <Router>
        {isLoading ? (
          <div style={{ height: "100vh" }}>
            <Loader />
          </div>
        ) : (
          <Switch>
            {routes.map((route: AppRoute) =>
              route.subRoutes
                ? route.subRoutes.map((item: AppRoute) => AddRoute(item))
                : AddRoute(route)
            )}
            <Route render={() => <Error404 />} />
          </Switch>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
