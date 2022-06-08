import React, { useState } from "react";
import { AppBar, Box, Toolbar } from "@mui/material";

import { AppTitle } from "./AppTitle";
import { UserAccount } from "../Actions";
import { DefaultMenu } from "./Menu";
import { ChangePassword } from "../ChangePassword";
import { ChangeInfo } from "../ChangeInfo";

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogPassword, setDialogPassword] = useState<{ open: boolean }>({
    open: false,
  });
  const [dialogInfo, setDialogInfo] = useState<{ open: boolean }>({
    open: false,
  });
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar disableGutters variant="dense">
          <AppTitle />
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex", alignItems: "center" } }}
          >
            <UserAccount onClick={handleProfileMenuOpen} />
          </Box>
        </Toolbar>
      </AppBar>
      <ChangePassword
        dialog={dialogPassword}
        handleCloseDialog={() => {
          setDialogPassword({ open: false });
        }}
      />
      <ChangeInfo
        dialog={dialogInfo}
        handleCloseDialog={() => {
          setDialogInfo({ open: false });
        }}
      />
      <DefaultMenu
        isMenuOpen={Boolean(anchorEl)}
        handleMenuClose={handleMenuClose}
        anchorEl={anchorEl}
        openPassword={() => {
          handleMenuClose();
          setDialogPassword({ open: true });
        }}
        openInfo={() => {
          handleMenuClose();
          setDialogInfo({ open: true });
        }}
      />
    </>
  );
};
