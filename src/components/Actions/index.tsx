import React from "react";
import {
  MoreVert as MoreIcon,
  AccountCircle,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  List as PreferencesIcon,
} from "@mui/icons-material";

import { ActionItem } from "./ActionItem";

interface ActionProps {
  total?: number;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disableTooltip?: boolean;
}

export const More = ({ onClick, disableTooltip = false }: ActionProps) => (
  <ActionItem
    title="More"
    icon={MoreIcon}
    onClick={onClick}
    disableTooltip={disableTooltip}
  />
);

export const UserAccount = ({
  onClick,
  disableTooltip = false,
}: ActionProps) => (
  <ActionItem
    title="My Account"
    icon={AccountCircle}
    onClick={onClick}
    disableTooltip={disableTooltip}
  />
);

export const SignOut = ({ onClick, disableTooltip = false }: ActionProps) => (
  <ActionItem
    title="Sign Out"
    icon={LogoutIcon}
    onClick={onClick}
    disableTooltip={disableTooltip}
  />
);

export const Settings = ({ onClick, disableTooltip = false }: ActionProps) => (
  <ActionItem
    title="Settings"
    icon={SettingsIcon}
    onClick={onClick}
    disableTooltip={disableTooltip}
  />
);

export const Preferences = ({
  onClick,
  disableTooltip = false,
}: ActionProps) => (
  <ActionItem
    title="Preferences"
    icon={PreferencesIcon}
    onClick={onClick}
    disableTooltip={disableTooltip}
  />
);
