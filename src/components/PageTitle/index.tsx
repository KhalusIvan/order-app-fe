import { Typography } from "@mui/material";

export const PageTitle = ({ title }: { title: string }) => (
  <Typography variant="h3" component="h4" color="textSecondary">
    {title}
  </Typography>
);
