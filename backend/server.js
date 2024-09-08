const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  // You must `await server.start()` before calling `applyMiddleware`
  await server.start();

  server.applyMiddleware({ app });

  // Connect to MongoDB
  await mongoose.connect("mongodb://localhost:27017/blog");

  // Start the Express server
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
