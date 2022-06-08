import { Menu, MenuItem } from "@mui/material";

import { Information, Password } from "../../Actions";

interface DefaultMenuProps {
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  openPassword: () => void;
  openInfo: () => void;
  anchorEl: HTMLElement | null;
}

export const DefaultMenu = ({
  isMenuOpen,
  handleMenuClose,
  anchorEl,
  openPassword,
  openInfo,
}: DefaultMenuProps) => (
  <Menu
    anchorEl={anchorEl}
    id="primary-search-account-menu"
    keepMounted
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    <MenuItem onClick={openInfo}>
      <Information disableTooltip />
      Інформація
    </MenuItem>
    <MenuItem onClick={openPassword}>
      <Password disableTooltip />
      Пароль
    </MenuItem>
  </Menu>
);
