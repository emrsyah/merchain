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

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    // title: {
    //   display: true,
    //   text: "Chart.js Line Chart",
    // },
  },
};

export function SalesChart() {
  const labels = [
    "3 Juni",
    "2 Juni",
    "4 Juni",
    "5 Juni",
    "6 Juni",
    "7 Juni",
    "8 Juni",
  ]

  const data = {
    labels,
    datasets: [
      {
        label: "Penjualan",
        data: [0, 0, 0, 0, 12000, 42000, 8000],
        borderColor: "rgb(147, 51, 234)",
        backgroundColor: "rgba(147, 51, 234, 0.4)",
      },
    ],
  }
  return <Line options={options} data={data} className="text-pur" />;
}
