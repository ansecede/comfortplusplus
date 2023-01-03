import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.font.size = 20;

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const labels = ["Cold", "Neutral", "Warm"];

function VotesChart({ votes }) {
  const data = {
    labels,
    datasets: [
      {
        data: votes,
        backgroundColor: [
          "rgb(53, 154, 251,0.35)",
          "rgb(164, 176, 190, 0.35)",
          "rgb(234, 133, 53, 0.35)",
        ],
        borderColor: [
          "rgb(53, 154, 251, 1)",
          "rgb(164, 176, 190, 1)",
          "rgb(234, 133, 53, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="grid">
      <Bar options={options} data={data} />
    </div>
  );
}

export default VotesChart;
