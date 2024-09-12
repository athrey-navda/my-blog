import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

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

  const isAuthenticated = !!localStorage.getItem("authToken");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {isAuthenticated && (
        <div>
          <a href="/add">
            <button className="btn-primary">Add</button>
          </a>
        </div>
      )}
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
          <Link to={`/post/${post.id}`}>
            <button className="btn-secondary">Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
