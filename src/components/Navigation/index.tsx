import { Drawer as MuiDrawer, styled } from "@mui/material";

import { Routes } from "./Routes";

import { navClosedMixin, navOpenedMixin } from "../../styles/mixins";

import { DRAWER_WIDTH } from "../../utils/constants";

export const Navigation = () => {
  return (
    <Drawer variant="permanent" open={true} onClose={() => {}}>
      <DrawerHeader />
      <Routes />
    </Drawer>
  );
};

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...navOpenedMixin(theme),
    "& .MuiDrawer-paper": navOpenedMixin(theme),
  }),
  ...(!open && {
    ...navClosedMixin(theme),
    "& .MuiDrawer-paper": navClosedMixin(theme),
  }),
}));
