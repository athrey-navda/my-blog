import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_BLOGPOSTS = gql`
  query GetBlogPosts {
    getBlogPosts {
      id
      title
      content
      author
      date
    }
  }
`;

const BlogList = () => {
  const { loading, error, data } = useQuery(GET_BLOGPOSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.getBlogPosts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>
            By {post.author} on{" "}
            {post.date
              ? new Date(Number(post.date)).toLocaleDateString()
              : "Date not available"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
