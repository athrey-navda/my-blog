import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogList from "./components/BlogList";
import BlogPostDetail from "./components/BlogPostDetail";
import AddBlog from "./components/AddBlog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/post/:id" element={<BlogPostDetail />} />
        <Route path="/add" element={<AddBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
