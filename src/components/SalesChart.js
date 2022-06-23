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
import dayjs from "dayjs";

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
  const nowDay = parseInt(dayjs().format("D"))
  const nowMonth =dayjs().format("MMM")
  const labels = [
    `${dayjs().subtract(6, 'day').format("D")} ${nowMonth}`,
    `${dayjs().subtract(5, 'day').format("D")} ${nowMonth}`,
    `${dayjs().subtract(4, 'day').format("D")} ${nowMonth}`,
    `${dayjs().subtract(3, 'day').format("D")} ${nowMonth}`,
    `${dayjs().subtract(2, 'day').format("D")} ${nowMonth}`,
    `${dayjs().subtract(1, 'day').format("D")} ${nowMonth}`,
    `${nowDay} ${nowMonth}`,
  ]

  const data = {
    labels,
    datasets: [
      {
        label: "Penjualan",
        data: [30000, 36000, 24000, 42000, 38000, 62000, 36000],
        borderColor: "rgb(147, 51, 234)",
        backgroundColor: "rgba(147, 51, 234, 0.4)",
      },
    ],
  }
  return <Line options={options} data={data} className="text-pur" />;
}
