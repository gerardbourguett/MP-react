/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box>
      <Container>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 3 }}
        >
          {"Desarrollado por "}
          <a
            color="inherit"
            href="http://gerardabc.cloud"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gerard.ABC
          </a>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
