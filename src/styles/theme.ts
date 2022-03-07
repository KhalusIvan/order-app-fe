import { createTheme, responsiveFontSizes } from "@mui/material";

import { DARK_MODE_THEME, LIGHT_MODE_THEME } from "../utils/constants";

export const getAppTheme = (
  mode: typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME
) => {
  let theme = createTheme({
    palette: {
      mode,
    },
    typography: {
      fontFamily: [
        "sans-serif",
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
      button: {
        textTransform: "none",
      },
    },
  });
  theme = responsiveFontSizes(theme);
  return theme;
};
