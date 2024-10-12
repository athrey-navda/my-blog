import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

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

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
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
const BlogList = () => {
  const { loading, error, data } = useQuery(GET_BLOGPOSTS);

  const isAuthenticated = !!localStorage.getItem("authToken");

  if (loading)
    return (
      <Container maxWidth="md" sx={{ mt: 24, mb: 4 }}>
        <div>
          Please wait, as it may take 50-60 seconds to retrieve data due to
          Render's delay after periods of inactivity.
        </div>
      </Container>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {isAuthenticated && (
        <Box>
          <Button variant="contained" component="a" href="/add" color="primary">
            Add Post
          </Button>
        </Box>
      )}
      <Grid container spacing={2} columns={12}>
        {data.getBlogPosts
          .slice()
          .reverse()
          .map((post, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={post.id}>
              <SyledCard variant="outlined" tabIndex={0} className={""}>
                <CardMedia
                  component="img"
                  alt={post.title}
                  image={`https://picsum.photos/800/450?random=${index + 1}`}
                  aspect-ratio="16 / 9"
                  sx={{
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                />
                <SyledCardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {post.title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {post.content.substring(0, 100)}...
                  </StyledTypography>
                </SyledCardContent>
                <Author author={post.author} date={post.date} />
                <Box sx={{ padding: 2 }}>
                  <Link to={`/post/${post.id}`}>
                    <Button variant="outlined" color="primary">
                      Read More
                    </Button>
                  </Link>
                </Box>
              </SyledCard>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default BlogList;
