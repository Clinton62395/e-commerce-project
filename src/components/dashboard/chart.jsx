import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Chart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Revenue This Week",
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `$${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    elements: {
      point: {
        radius: (ctx) => (ctx.dataIndex === 3 ? 6 : 3), // Highlight October
        backgroundColor: (ctx) => (ctx.dataIndex === 3 ? "#3b82f6" : "#1e40af"), // Blue for October
      },
    },
  };

  const data = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [85000, 92000, 110000, 126390, 118000, 130000],
        borderColor: "#1e40af",
        backgroundColor: "rgba(30, 64, 175, 0.1)",
        tension: 0.4,
        pointHoverRadius: 8,
      },
    ],
  };
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};
