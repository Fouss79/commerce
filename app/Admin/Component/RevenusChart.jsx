"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function RevenusChart({ revenus }) {
  const data = {
  labels: revenus.map((r) => r[0]),

  datasets: [
    {
      label: "Revenus (FCFA)",
      data: revenus.map((r) => r[1]),
      tension: 0.4,
    },
  ],
};
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Revenus journaliers
      </h2>

      <Line data={data} options={options} />
    </div>
  );
}