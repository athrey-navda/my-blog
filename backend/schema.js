const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type BlogPost {
    id: ID!
    title: String!
    content: String!
    author: String!
    date: String!
  }

  type Query {
    getBlogPosts: [BlogPost]
    getBlogPost(id: ID!): BlogPost
  }

  type Mutation {
    addBlogPost(title: String!, content: String!, author: String!): BlogPost
  }
`;

module.exports = typeDefs;
