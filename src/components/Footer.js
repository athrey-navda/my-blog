import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SitemarkIcon from "./SitemarkIcon";

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
      {"Copyright © "}
      <Link color="text.secondary" href="/">
        Blogs - Athrey
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <React.Fragment>
      <Divider />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: "center", md: "left" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Resources
            </Typography>
            <Link
              color="text.secondary"
              variant="body2"
              href="https://react.dev/"
            >
              React.js
            </Link>
            <Link
              color="text.secondary"
              variant="body2"
              href="https://graphql.org/"
            >
              GraphQL
            </Link>
            <Link
              color="text.secondary"
              variant="body2"
              href="https://www.mongodb.com/"
            >
              MongoDB
            </Link>
            <Link
              color="text.secondary"
              variant="body2"
              href="https://mui.com/material-ui/"
            >
              Material UI
            </Link>
            <Link
              color="text.secondary"
              variant="body2"
              href="https://github.com/mui/material-ui/tree/v6.1.0/docs/data/material/getting-started/templates/blog"
            >
              Material UI Blog Template
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Link color="text.secondary" variant="body2" href="/">
              Home
            </Link>
            <Link
              color="text.secondary"
              variant="body2"
              href="https://portfolio-rho-swart.vercel.app/fun"
            >
              Games
            </Link>
            <Link
              color="text.secondary"
              variant="body2"
              href="https://portfolio-rho-swart.vercel.app/"
            >
              Portfolio
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
              Address
            </Typography>
            <div color="text.secondary" variant="body2" href="#">
              Fairfax 22031
            </div>
            <Link
              color="text.secondary"
              variant="body2"
              href="https://github.com/athrey-navda"
            >
              GitHub
            </Link>
            <Link
              color="text.secondary"
              variant="body2"
              href="https://github.com/athrey-navda/my-blog"
            >
              Blog
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pt: { xs: 4, sm: 8 },
            width: "100%",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <div>
            <Copyright />
          </div>

          <div sx={{ width: { xs: "100%", sm: "80%" } }}>
            <SitemarkIcon />
          </div>

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ justifyContent: "left", color: "text.secondary" }}
          >
            {/* <IconButton
              color="inherit"
              size="small"
              href="https://github.com/mui"
              aria-label="GitHub"
              sx={{ alignSelf: "center" }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://x.com/MaterialUI"
              aria-label="X"
              sx={{ alignSelf: "center" }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://www.linkedin.com/company/mui/"
              aria-label="LinkedIn"
              sx={{ alignSelf: "center" }}
            >
              <LinkedInIcon />
            </IconButton> */}
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}
