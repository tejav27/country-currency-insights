import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Footer = () => {
  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/tejav27?tab=stars" target="blank">
          Tejaswi
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  return (
    <div>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  );
};

export default Footer;
