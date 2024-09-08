import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const ADD_BLOGPOST = gql`
  mutation AddBlogPost($title: String!, $content: String!, $author: String!) {
    addBlogPost(title: $title, content: $content, author: $author) {
      id
      title
    }
  }
`;

const AddBlogPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [addBlogPost] = useMutation(ADD_BLOGPOST);

  const handleSubmit = (e) => {
    e.preventDefault();
    addBlogPost({ variables: { title, content, author } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
      />
      <button type="submit">Add Blog Post</button>
    </form>
  );
};

export default AddBlogPost;
