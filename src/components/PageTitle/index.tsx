import { Typography } from "@mui/material";

export const PageTitle = ({ title }: { title: string }) => (
  <Typography variant="h4" component="h5" color="textSecondary">
    {title}
  </Typography>
);
