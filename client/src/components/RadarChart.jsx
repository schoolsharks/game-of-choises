import React, { useRef, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import { Card, CardContent } from "@mui/material";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ dataValues }) => {
  const chartRef = useRef(null);

  // Create the chart data
  const data = {
    labels: ["A", "B", "C", "D", "E"], 
    datasets: [
      {
        label: "Data Values",
        data: dataValues, 
        // backgroundColor: null, 
        backgroundColor: "linear-gradient(160deg, rgba(160, 6, 18, 1), rgba(255, 125, 135, 1))",
        borderColor: "#ffffff", 
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
      gradient.addColorStop(0, "rgba(160, 6, 18, 1)"); // Start color
      gradient.addColorStop(1, "rgba(255, 125, 135, 1)"); // End color

      data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, [dataValues]);

  // Chart options
  const options = {
    scales: {
      r: {
        angleLines: { color: "rgba(255, 255, 255, 0.6)" }, 
        backgroundColor:"rgba(160, 6, 18, 0.26)",
        grid: {
          color: "rgba(255, 255, 255, 0.6)", 
        },
        pointLabels: {
          color: "#ffffff", 
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 2,
        backgroundColor: "transparent", 
        boxShadow: "none", 
      }}
    >
      <CardContent>
        <Radar ref={chartRef} data={data} options={options} />
      </CardContent>
    </Card>
  );
};

export default RadarChart;
