import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogPostDetail from "./components/BlogPostDetail";
import AddBlog from "./components/AddBlog";
import Login from "./components/Login";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import AppAppBar from "./components/AppBar";

function App() {
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
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline enableColorScheme />
        <Router>
          <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post/:id" element={<BlogPostDetail />} />
            <Route path="/add" element={<AddBlog />} />
          </Routes>
        </Router>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
