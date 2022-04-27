import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
//import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import AccountMenu from "./AccountMenu";
import theme from "~/src/theme";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";

import { Link } from "@remix-run/react";

type Props = {
  children: React.ReactNode;
};

type pageProps = {
  name: string;
  location: string;
};

const pages: pageProps[] = [
  { name: "Dashboard", location: "/dashboard/" },
  { name: "Police", location: "/dashboard/police" },
];
const Dashboard: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar>
          <Toolbar>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",
                  //justifyContent: "flex-start",
                },
              }}
            >
              {pages.map((page, index) => (
                <Link
                  key={index}
                  prefetch="render"
                  to={page.location}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    sx={{
                      my: 2,
                      color: "white",
                      fontWeight: "bold",
                      display: "block",
                    }}
                    disableRipple
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
            </Box>
            <AccountMenu />
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            backgroundColor: theme.palette.grey[100],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
