import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_BLOG_POST = gql`
  mutation AddBlogPost($title: String!, $content: String!, $author: String!) {
    addBlogPost(title: $title, content: $content, author: $author) {
      id
      title
      content
      author
      date
    }
  }
`;

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const [addBlogPost] = useMutation(ADD_BLOG_POST);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addBlogPost({
        variables: { title, content, author },
      });

      console.log("Blog post added:", data.addBlogPost);
    } catch (error) {
      console.error("Error adding blog post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Blog Content"
        required
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author Name"
        required
      />
      <button type="submit">Add Blog Post</button>
    </form>
  );
};

export default AddBlog;
