import React from "react";
import { AccountCircle } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import InfoIcon from "@mui/icons-material/Info";

import { ActionItem } from "./ActionItem";

interface ActionProps {
  total?: number;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disableTooltip?: boolean;
}

export const UserAccount = ({
  onClick,
  disableTooltip = false,
}: ActionProps) => (
  <ActionItem
    title="Мій профіль"
    icon={AccountCircle}
    onClick={onClick}
    disableTooltip={disableTooltip}
  />
);

export const Information = ({
  onClick,
  disableTooltip = false,
}: ActionProps) => (
  <ActionItem
    title="Інформація"
    icon={InfoIcon}
    onClick={onClick}
    disableTooltip={disableTooltip}
  />
);

export const Password = ({ onClick, disableTooltip = false }: ActionProps) => (
  <ActionItem
    title="Пароль"
    icon={KeyIcon}
    onClick={onClick}
    disableTooltip={disableTooltip}
  />
);
