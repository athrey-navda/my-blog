import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm"; // Import the CommentForm component

const GET_BLOGPOST_BY_ID = gql`
  query GetBlogPostById($id: ID!) {
    getBlogPostById(id: $id) {
      id
      title
      content
      author
      date
      comments {
        author
        content
        date
      }
    }
  }
`;

const BlogPost = () => {
  const { id } = useParams(); // Get the blog post ID from the URL
  const { loading, error, data } = useQuery(GET_BLOGPOST_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { title, content, author, date, comments } = data.getBlogPostById;

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      <p>
        By {author} on{" "}
        {date
          ? new Date(Number(date)).toLocaleDateString()
          : "Date not available"}
      </p>
      <div>
        <h3>Comments:</h3>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index}>
              <p>{comment.content}</p>
              <p>
                By {comment.author} on{" "}
                {comment.date
                  ? new Date(Number(comment.date)).toLocaleDateString()
                  : "Date not available"}
              </p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      {/* Add the Comment Form */}
      <CommentForm postId={id} />
    </div>
  );
};

export default BlogPost;
