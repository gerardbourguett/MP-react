/* eslint-disable react/prop-types */
import React from "react";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

function NubePalabras({ topWords }) {
  return (
    <div>
      <Typography variant="h5">Top Palabras</Typography>
      {topWords.map(([palabra, frecuencia]) => (
        <Chip
          key={palabra}
          label={`${palabra} (${frecuencia})`}
          size="small"
          style={{
            margin: "4px",
            borderRadius: "5px",
            backgroundColor: "#f0f0f0",
          }}
        />
      ))}
    </div>
  );
}

export default NubePalabras;
