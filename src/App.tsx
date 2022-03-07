import { useMemo, useState } from "react";
import { CssBaseline, ThemeProvider, styled } from "@mui/material";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Layout } from "./components/Layout";
import { Guard } from "./components/Guard";
import { PageDefault } from "./components/PageDefault";

import { AppContext, ThemeModeContext } from "./contexts";
import { AppClient } from "./clients";
import { routes } from "./config";
import { Route as AppRoute } from "./types";
import { getAppTheme } from "./styles/theme";
import { DARK_MODE_THEME, LIGHT_MODE_THEME } from "./utils/constants";

import { grey } from "@mui/material/colors";

function App() {
  const [mode, setMode] = useState<
    typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME
  >(LIGHT_MODE_THEME);
  const appClient = new AppClient();

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

  const addRoute = (route: AppRoute) => {
    const ElementComponent = route.component || PageDefault;
    if (route.authentificated) {
      return (
        <Route
          key={route.path}
          path={route.path}
          exact
          render={(props) => (
            <Guard>
              <Layout>
                <ElementComponent />
              </Layout>
            </Guard>
          )}
        />
      );
    }
    return (
      <Route
        key={route.path}
        path={route.path}
        exact
        render={(props) => (
          <LayoutWrapper>
            <ElementComponent />
          </LayoutWrapper>
        )}
      />
    );
  };

  return (
    <AppContext.Provider value={appClient}>
      <ThemeModeContext.Provider value={themeMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Switch>
              {routes.map((route: AppRoute) =>
                route.subRoutes
                  ? route.subRoutes.map((item: AppRoute) => addRoute(item))
                  : addRoute(route)
              )}
            </Switch>
          </Router>
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </AppContext.Provider>
  );
}

const LayoutWrapper = styled("div")`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${grey[100]};
`;

export default App;
