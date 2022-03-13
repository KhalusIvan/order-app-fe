/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Switch, useHistory } from "react-router-dom";

import { Alerts } from "./components/Alerts";
import { AddRoute } from "./config/AddRoute";

import { ThemeModeContext } from "./contexts";
import { routes } from "./config";
import { Route as AppRoute } from "./types";
import { getAppTheme } from "./styles/theme";
import { DARK_MODE_THEME, LIGHT_MODE_THEME } from "./utils/constants";

import { checkUser } from "./redux/operation/userAuthOperation";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [mode, setMode] = useState<
    typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME
  >(LIGHT_MODE_THEME);

  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) =>
          prevMode === LIGHT_MODE_THEME ? DARK_MODE_THEME : LIGHT_MODE_THEME
        );
      },
    }),
    []
  );

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  useEffect(() => {
    dispatch(checkUser(history));
  }, []);

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Alerts />
        <Router>
          <Switch>
            {routes.map((route: AppRoute) =>
              route.subRoutes
                ? route.subRoutes.map((item: AppRoute) => AddRoute(item))
                : AddRoute(route)
            )}
          </Switch>
        </Router>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;
