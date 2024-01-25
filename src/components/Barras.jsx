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

    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();

      chartRef.current.height = 700;
    }
    const formatDate = (date) => {
      const dia = date.getDate().toString().padStart(2, "0");
      const mes = (date.getMonth() + 1).toString().padStart(2, "0");
      const anio = date.getFullYear();
      return `${dia}-${mes}-${anio}`;
    };

    const currentDate = new Date();
    const tenDaysLater = new Date();
    tenDaysLater.setDate(currentDate.getDate() + 7);

    const filteredLicit = licit.filter((item) => {
      const date = new Date(item.FechaCierre);
      return (
        item.FechaCierre !== null && date >= currentDate && date <= tenDaysLater
      );
    });

    const counts = {};
    filteredLicit.forEach((item) => {
      const date = new Date(item.FechaCierre);
      const formattedDate = formatDate(date);
      counts[formattedDate] = (counts[formattedDate] || 0) + 1;
    });

    const barData = {
      labels: Object.keys(counts),
      datasets: [
        {
          axis: "y",
          label: "Licitaciones",
          data: Object.values(counts),
          fill: false,
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const newChart = new Chart(ctx, {
      type: "bar",
      data: barData,
      options: {
        indexAxis: "y",
        scales: {
          y: {
            type: "category",
          },
          x: {
            type: "linear",
            position: "left",
          },
        },
      },
    });

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
