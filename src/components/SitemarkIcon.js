import * as React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { useTheme } from "@mui/material/styles";

export default function SitemarkIcon() {
  const theme = useTheme();

  const logoSrc =
    theme.palette.mode === "dark"
      ? "https://portfolio-rho-swart.vercel.app/images/logo/athrey-high-resolution-logo-white-transparent.png"
      : "https://portfolio-rho-swart.vercel.app/images/logo/athrey-high-resolution-logo-black-transparent.png";

  return (
    <a href="/">
      <SvgIcon sx={{ height: 56, width: 142, mr: 2 }}>
        <image href={logoSrc} width="48" height="26" />
      </SvgIcon>
    </a>
  );
}
