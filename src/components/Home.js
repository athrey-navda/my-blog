import * as React from "react";
import Container from "@mui/material/Container";
import BlogList from "./BlogList";

export default function Home() {
  return (
    <>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 4, gap: 4 }}
      >
        <BlogList />
      </Container>
    </>
  );
}
