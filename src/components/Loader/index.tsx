import { FC } from "react";
import { styled } from "@mui/material";
import { CircularProgress } from "@mui/material";

export const Loader: FC = () => {
  return (
    <Root>
      <CircularProgress color="primary" />
    </Root>
  );
};

const Root = styled("div")`
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
`;
