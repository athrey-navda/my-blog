const BlogPost = require("./models/BlogPost");

const resolvers = {
  Query: {
    getBlogPosts: async () => await BlogPost.find(),
    getBlogPost: async (_, { id }) => await BlogPost.findById(id),
  },
  Mutation: {
    addBlogPost: async (_, { title, content, author }) => {
      const newPost = new BlogPost({ title, content, author });
      return await newPost.save();
    },
  },
};

module.exports = resolvers;
