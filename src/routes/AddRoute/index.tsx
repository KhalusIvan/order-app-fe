import { styled } from "@mui/material";
import { grey } from "@mui/material/colors";

import { Route } from "react-router-dom";
import { Route as AppRoute } from "../../types";

import { PageDefault } from "../../components/PageDefault";
import { Guard } from "../../components/Guard";
import { Layout } from "../../components/Layout";

export const AddRoute = (route: AppRoute) => {
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

const LayoutWrapper = styled("div")`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${grey[100]};
`;
