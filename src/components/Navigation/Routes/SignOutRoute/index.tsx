import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  styled,
} from "@mui/material";
import ExitToApp from "@mui/icons-material/ExitToApp";
import { useHistory } from "react-router-dom";

export const SignOutRoute = () => {
  const history = useHistory();
  const handleSignOutClick = () => {
    localStorage.removeItem("token");
    history.push("/auth/sign-in");
  };

  return (
    <StyledListItemButton onClick={handleSignOutClick}>
      <ListItemIcon>
        <IconButton size="small">
          <ExitToApp fontSize={"large"} />
        </IconButton>
      </ListItemIcon>
      <ListItemText primary="Вийти" />
    </StyledListItemButton>
  );
};

const StyledListItemButton = styled(ListItemButton)`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
