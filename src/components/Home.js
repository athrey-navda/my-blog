import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import BlogList from "./BlogList";
import Footer from "./Footer";
import AppAppBar from "./AppBar";

export default function Home() {
  const [mode, setMode] = React.useState("light");
  const defaultTheme = createTheme({ palette: { mode } });

  React.useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline enableColorScheme />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <BlogList />
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
