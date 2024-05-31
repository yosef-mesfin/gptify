import { createTheme } from "@mui/material";
import { palettes } from "./palettes";
import typography from "./typography";

const theme = createTheme({
  palette: palettes,
  typography: typography,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
