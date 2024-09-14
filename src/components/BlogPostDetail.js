import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
// import CommentForm from "./CommentForm";
import { Card, CardContent, Container } from "@mui/material";

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

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 100,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});
function Author({ author, date }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <AvatarGroup max={2}>
          <Avatar
            alt={author}
            src="https://portfolio-rho-swart.vercel.app/images/homepage/herosectionImage.jpg"
            sx={{ width: 24, height: 24 }}
          />
        </AvatarGroup>
        <Typography variant="caption">{author}</Typography>
      </Box>
      <Typography variant="caption">
        {date
          ? new Date(Number(date)).toLocaleDateString()
          : "Date not available"}
      </Typography>
    </Box>
  );
}

const BlogPost = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_BLOGPOST_BY_ID, {
    variables: { id },
  });

  if (loading)
    return (
      <Container maxWidth="md" sx={{ mt: 24, mb: 4 }}>
        <p>
          Please wait, as it may take 50-60 seconds to retrieve data due to
          Render's delay after periods of inactivity.
        </p>
      </Container>
    );
  if (error) return <p>Error: {error.message}</p>;

  const { title, content, author, date, comments } = data.getBlogPostById;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <SyledCard variant="outlined" tabIndex={0} className={""}>
        <CardMedia
          component="img"
          alt={title}
          image={`https://picsum.photos/800/450?random=${id}`}
          aspect-ratio="16 / 9"
          sx={{ borderBottom: "1px solid", borderColor: "divider" }}
        />
        <SyledCardContent>
          <Typography gutterBottom variant="h4" component="div">
            {title}
          </Typography>
          <StyledTypography variant="body1" color="text.secondary" gutterBottom>
            {content}
          </StyledTypography>
        </SyledCardContent>
        <Author author={author} date={date} />
      </SyledCard>

      {/* <Box sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Comments:
        </Typography>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Box
              key={index}
              sx={{
                mb: 2,
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <Typography variant="body2">{comment.content}</Typography>
              <Typography variant="caption">
                By {comment.author} on{" "}
                {comment.date
                  ? new Date(Number(comment.date)).toLocaleDateString()
                  : "Date not available"}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2">No comments yet.</Typography>
        )}
        <CommentForm postId={id} />
      </Box> */}
    </Container>
  );
};

export default BlogPost;
