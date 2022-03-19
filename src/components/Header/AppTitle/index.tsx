import { styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { DRAWER_WIDTH } from "../../../utils/constants";
import { getUserSelector } from "../../../redux/selector/userSelector";

export const AppTitle = () => {
  const title: string =
    useSelector(getUserSelector)?.currentWorkspace?.name || "";

  return (
    <StyledAppTitle variant="h6" noWrap>
      {title}
    </StyledAppTitle>
  );
};

const StyledAppTitle = styled(Typography)`
  display: {
    xs: none;
    sm: block;
  }
  text-align: center;
  width: ${DRAWER_WIDTH}px;
  cursor: default;
`;
