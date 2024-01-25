/* eslint-disable no-unused-vars */
import React from "react";
import { Typography, Toolbar, Icon, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";

function Navbar() {
  return (
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Consulta de Licitaciones de Mercado Público
      </Typography>
      <Toolbar>
        <Link
          href="https://github.com/gerardbourguett/MP-react"
          color="inherit"
          underline="none"
          rel="noopener"
          target="_blank"
        >
          <Icon component={GitHubIcon} />
        </Link>
        <Link
          href="https://x.com/vanderfondi"
          color="inherit"
          underline="none"
          rel="noopener"
          target="_blank"
        >
          <Icon component={XIcon} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/gerard-bourguett/"
          color="inherit"
          underline="none"
          rel="noopener"
          target="_blank"
        >
          <Icon component={LinkedInIcon} />
        </Link>
        <Link
          href="https://www.mercadopublico.cl/Home"
          color="inherit"
          underline="none"
          rel="noopener"
          target="_blank"
          title="Web Mercado Múplico"
        >
          <Icon component={LanguageIcon} />
        </Link>
      </Toolbar>
    </Toolbar>
  );
}

export default Navbar;
