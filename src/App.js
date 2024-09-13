import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogPostDetail from "./components/BlogPostDetail";
import AddBlog from "./components/AddBlog";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<BlogPostDetail />} />
        <Route path="/add" element={<AddBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
