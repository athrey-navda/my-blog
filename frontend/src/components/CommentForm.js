import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

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
      }
    } catch (error) {
      alert(error.message || "Error occurred while verifying OTP");
      console.error("Error in OTP verification:", error);
    }
  };

  return (
    <div>
      <h3>Add a Comment</h3>
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {otpSent ? (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOTP}>Verify OTP & Post Comment</button>
        </>
      ) : (
        <button onClick={handleSendOTP}>Send OTP</button>
      )}
    </div>
  );
};

export default CommentForm;
