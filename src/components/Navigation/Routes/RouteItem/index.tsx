import React, { ComponentType } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Icon,
  IconButton,
  lighten,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { Route } from "../../../../types";

interface RouteItemProps {
  route: Route;
  nested?: boolean;
  hasChildren?: boolean;
  handleMenuClick?: (route: Route) => void;
}

export const RouteItem = ({
  route,
  nested = false,
  hasChildren = false,
  handleMenuClick = () => {},
}: RouteItemProps) => {
  const location = useLocation();

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (hasChildren) e.preventDefault();
  };

  const isSelected =
    location.pathname === route.path ||
    (hasChildren && route.subRoutes?.some((e) => location.pathname === e.path));

  const item = (
    <ListItemButton
      sx={{ pl: nested ? 3 : 1 }}
      onClick={() => handleMenuClick(route)}
    >
      <ListItemIcon>
        <StyledIconButton
          size="small"
          isSelected={location.pathname === route.path}
        >
          {route.icon && (
            <img
              src={route.icon}
              alt="icon"
              style={{ width: 40, padding: 5 }}
            />
          )}
        </StyledIconButton>
      </ListItemIcon>
      <ListItemText primary={route.title} />
      {hasChildren && (route.expanded ? <ExpandLess /> : <ExpandMore />)}
    </ListItemButton>
  );

  return (
    <StyledNavLink
      to={`${route.path}`}
      key={route.path}
      onClick={handleNavigate}
    >
      {item}
    </StyledNavLink>
  );
};

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

const StyledIconButton = styled(IconButton)<{ isSelected: boolean }>(
  ({ isSelected, theme }) => ({
    boxShadow: isSelected
      ? `0 0 0 2px ${lighten(theme.palette.primary.main, 0.6)}`
      : "default",
    transition: "box-shadow 0.1s",
  })
);
