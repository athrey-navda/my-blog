// server.js
const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");

// Import schema and resolvers
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const app = express();
app.use(express.json());

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server and apply middleware
const startServer = async () => {
  await server.start(); // Start Apollo Server
  server.applyMiddleware({ app }); // Apply Apollo middleware

  mongoose
    .connect("mongodb://localhost:27017/blogposts")
    .then(() => {
      app.listen({ port: 4000 }, () => {
        console.log(
          `Server ready at http://localhost:4000${server.graphqlPath}`
        );
      });
    })
    .catch((err) => console.error(err));
};

// Start the server
startServer();
