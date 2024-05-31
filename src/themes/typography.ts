import { TypographyVariants } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    title: {
      fontFamily: string;
      fontWeight: number;
      letterSpacing: string;
      color: string;
      textDecoration: string;
    };
  }
}

const typography = {
  fontFamily: "Roboto, sans-serif",
  fontSize: 16,
  h1: {
    fontSize: "2.5rem",
    fontWeight: 700,
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 700,
  },
  h3: {
    fontSize: "1.75rem",
    fontWeight: 700,
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 700,
  },
  h5: {
    fontSize: "1.25rem",
    fontWeight: 700,
  },
  h6: {
    fontSize: "1rem",
    fontWeight: 700,
  },
  title: {
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  },
  subtitle1: {
    fontSize: "1rem",
    fontWeight: 400,
  },
  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: 400,
  },
  body1: {
    fontSize: "1rem",
    fontWeight: 400,
  },
  body2: {
    fontSize: "0.875rem",
    fontWeight: 400,
  },
  button: {
    fontSize: "1rem",
    fontWeight: 700,
  },
  caption: {
    fontSize: "0.75rem",
    fontWeight: 400,
  },
};

export default typography;
