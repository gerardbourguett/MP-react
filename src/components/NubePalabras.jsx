/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

function NubePalabras({ topWords }) {
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
            Palabras más repetidas
          </Typography>
        </CardContent>
        <CardActions>
          <Box>
            {topWords.map(([palabra, frecuencia]) => (
              <Chip
                key={palabra}
                label={`${palabra}(${frecuencia})`}
                size="small"
                style={{
                  margin: "4px",
                  borderRadius: "5px",
                  backgroundColor: "#f0f0f0",
                }}
              />
            ))}
          </Box>
        </CardActions>
      </Card>
    </>
  );
}

export default NubePalabras;
