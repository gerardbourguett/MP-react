/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box, Card, CardActions, CardContent } from "@mui/material";

const Barras = ({ licit }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Check if the chart instance already exists
    if (chartRef.current.chart) {
      // If it exists, destroy the previous chart
      chartRef.current.chart.destroy();
    }

    // Ordenar las fechas cronológicamente
    // Función para formatear la fecha a DD-MM-YYYY
    const formatDate = (date) => {
      const dia = date.getDate().toString().padStart(2, "0");
      const mes = (date.getMonth() + 1).toString().padStart(2, "0");
      const anio = date.getFullYear();
      return `${dia}-${mes}-${anio}`;
    };

    // Filtrar licitaciones con FechaCierre en los próximos 10 días
    const currentDate = new Date();
    const tenDaysLater = new Date();
    tenDaysLater.setDate(currentDate.getDate() + 7);

    const filteredLicit = licit.filter((item) => {
      const date = new Date(item.FechaCierre);
      return (
        item.FechaCierre !== null && date >= currentDate && date <= tenDaysLater
      );
    });

    // Count occurrences for each formatted date
    const counts = {};
    filteredLicit.forEach((item) => {
      const date = new Date(item.FechaCierre);
      const formattedDate = formatDate(date);
      counts[formattedDate] = (counts[formattedDate] || 0) + 1;
    });

    // Extracting the necessary information for the bar chart
    const barData = {
      labels: Object.keys(counts),
      datasets: [
        {
          label: "Cantidad",
          data: Object.values(counts),
          fill: true,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.3)",
        },
      ],
    };

    // Create the bar chart
    const newChart = new Chart(ctx, {
      type: "bar",
      data: barData,
      options: {
        scales: {
          x: {
            type: "category", // Set the x-axis type to "category"
          },
          y: {
            type: "linear", // Set the y-axis type to "linear"
            position: "left",
          },
        },
      },
    });

    // Save the chart instance to the ref
    chartRef.current.chart = newChart;
  }, [licit]);

  return (
    <>
      <Box>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
              Cierran en los próximos 7 días
            </Typography>
          </CardContent>
          <CardActions>
            <canvas ref={chartRef}></canvas>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default Barras;
