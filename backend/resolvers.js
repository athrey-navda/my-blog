// resolvers.js
const BlogPost = require("./models/BlogPost");
const nodemailer = require("nodemailer");

const otps = {};
const otpExpiry = {}; // Store OTP expiry times

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "raycabackend@gmail.com",
    pass: "wtydiixrhnavusod", // Ensure you use environment variables for sensitive information
  },
});

const resolvers = {
  Query: {
    getBlogPosts: async () => {
      return await BlogPost.find();
    },
    getBlogPostById: async (parent, { id }) => {
      return await BlogPost.findById(id);
    },
  },
  Mutation: {
    sendOTP: async (parent, { email }) => {
      const otp = Math.floor(100000 + Math.random() * 900000);
      otps[email] = otp;
      otpExpiry[email] = Date.now() + 300000; // OTP valid for 5 minutes (300,000 milliseconds)

      const mailOptions = {
        from: "athreyblog@gmail.com",
        to: email,
        subject: "Your OTP for Comment Verification",
        text: `Your OTP is: ${otp}`,
      };

      await transporter.sendMail(mailOptions);
      return { message: "OTP sent" };
    },
    verifyOTP: async (parent, { postId, email, otp, author, content }) => {
      const currentTime = Date.now();

      // Check if OTP exists and is still valid
      if (otps[email] && otpExpiry[email] > currentTime) {
        if (otps[email] === otp) {
          const post = await BlogPost.findById(postId);
          if (!post) {
            throw new Error("Post not found");
          }

          const newComment = {
            content,
            author,
            email,
            date: new Date().toISOString(),
          };

          post.comments.push(newComment);
          await post.save();

          // Clear OTP after verification
          delete otps[email];
          delete otpExpiry[email];

          return { message: "Comment added" };
        } else {
          throw new Error("Invalid OTP");
        }
      } else {
        throw new Error("OTP has expired or does not exist");
      }
    },
    addBlogPost: async (parent, { title, content, author }) => {
      const newBlogPost = new BlogPost({
        title,
        content,
        author,
        date: new Date().toISOString(),
        comments: [],
      });

      await newBlogPost.save();
      return newBlogPost;
    },
  },
};

module.exports = resolvers;
