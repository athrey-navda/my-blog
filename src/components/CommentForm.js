import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { TextField, Button, FormControl, Typography, Box } from "@mui/material";

const SEND_OTP = gql`
  mutation SendOTP($email: String!) {
    sendOTP(email: $email) {
      message
    }
  }
`;

const VERIFY_OTP = gql`
  mutation VerifyOTP(
    $postId: ID!
    $email: String!
    $otp: String!
    $author: String!
    $content: String!
  ) {
    verifyOTP(
      postId: $postId
      email: $email
      otp: $otp
      author: $author
      content: $content
    ) {
      message
    }
  }
`;

const CommentForm = ({ postId }) => {
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [sendOTP] = useMutation(SEND_OTP);
  const [verifyOTP] = useMutation(VERIFY_OTP);

  const handleSendOTP = async () => {
    const response = await sendOTP({ variables: { email } });
    if (response.data.sendOTP.message === "OTP sent") {
      setOtpSent(true);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await verifyOTP({
        variables: { postId, email, otp, author, content },
      });

      if (response.data.verifyOTP.message === "Comment added") {
        alert("Comment successfully added!");
        setAuthor("");
        setEmail("");
        setContent("");
        setOtp("");
        setOtpSent(false);
        window.location.reload();
      }
    } catch (error) {
      alert(error.message || "Error occurred while verifying OTP");
      console.error("Error in OTP verification:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto" }}>
      <Typography variant="h5" gutterBottom>
        Add a Comment
      </Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Author"
          variant="outlined"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Comment"
          variant="outlined"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
        />
      </FormControl>

      {otpSent && (
        <FormControl fullWidth margin="normal">
          <TextField
            label="Enter OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            fullWidth
          />
        </FormControl>
      )}

      <Box mt={2}>
        {otpSent ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleVerifyOTP}
            fullWidth
          >
            Verify OTP & Post Comment
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendOTP}
            fullWidth
          >
            Authenticate
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CommentForm;
