import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBar, Box, Typography } from "@mui/material";

const theme = createTheme({
  // Customize your theme here
  palette: {
    primary: {
      main: "#061178",
    },
    secondary: {
      main: "#d32248",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        color="default"
        elevation={2}
        sx={{
          height: 60,
          justifyContent: "center",
          mb: 2,
        }}
        position="relative"
      >
        <Typography
          sx={{
            fontWeight: "bold",
            ml: 2,
          }}
          color="primary.main"
        >
          Group Cards
        </Typography>
      </AppBar>
      <Component {...pageProps} />
      <Box
        component="footer"
        sx={{
          backgroundColor: "primary.dark",
          color: "primary.contrastText",
          minHeight: 100,
          textAlign: "center",
          p: 2,
          mt: 4,
        }}
      >
        Copyright 2024
      </Box>
    </ThemeProvider>
  );
}

export default MyApp;
