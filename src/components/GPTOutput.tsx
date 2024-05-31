"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const RootStyle = styled(Box)(({ theme }) => ({
  width: "100%",
  marginX: "auto",
  background: "#0045",
  height: "fit-content !important",
  boxShadow: "0 0 1rem #fff6 !important",
}));

const AccordionStyle = styled(Accordion)(({ theme }) => ({
  backgroundColor: "transparent",
}));

const AccordionSummaryStyle = styled(AccordionSummary)(({ theme }) => ({
  "&.Mui-expanded	": {
    minHeight: "0px !important",
    margin: "0px !important",
  },
  ".MuiAccordionSummary-content.Mui-expanded": {
    margin: "0.4rem 0 !important",
  },
  ".MuiAccordionSummary-content": {
    margin: "0.5rem 0 !important",
  },

  backgroundColor: "#0E1D5288",
  minHeight: "0px !important",
}));

type GPTOutputProps = Readonly<{
  title: string;
  children: string | null;
}>;
export default function GPTOutput({ title, children }: GPTOutputProps) {
  return (
    <RootStyle>
      <AccordionStyle>
        <AccordionSummaryStyle>
          <Typography
            variant="body1"
            color="secondary.contrastText"
            fontWeight={400}
          >
            {title.slice(0, 30)}
          </Typography>
        </AccordionSummaryStyle>
        <Divider sx={{ borderColor: "secondary.contrastText" }} />
        <AccordionDetails>
          <Typography variant="body2" color="secondary.contrastText">
            {children}
          </Typography>
        </AccordionDetails>
      </AccordionStyle>
    </RootStyle>
  );
}
