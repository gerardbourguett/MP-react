/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import the Chart.js library

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

    // Count occurrences for each formatted date
    const counts = {};
    licit.forEach((item) => {
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

  return <canvas ref={chartRef} width={500} height={300}></canvas>;
};

export default Barras;
