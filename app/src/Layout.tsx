import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container maxWidth="md" sx={{ mt: 15, px: 5 }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={7}>
          <img
            style={{ height: 500, width: isMobile ? 300 : 500 }}
            src="/logo.png"
            alt=""
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}
