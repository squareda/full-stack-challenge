import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBar, Box, MenuItem, Select, Typography } from "@mui/material";
import useUser from "../components/useUser";

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
  const user = useUser();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        color="default"
        elevation={2}
        sx={{
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
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
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ mr: 2 }}>
          User Picker:
          {user && (
            <Select
              sx={{ ml: 1 }}
              value={user?.user?._id || "none"}
              onChange={(e) => {
                if (e.target.value === "none") {
                  document.cookie =
                    "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                } else {
                  document.cookie = `user=${e.target.value}`;
                }
                window.location.reload();
              }}
            >
              <MenuItem value="none">No User</MenuItem>
              {user?.allUsers.map((u) => (
                <MenuItem key={u._id} value={u._id}>
                  {u.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </Box>
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
