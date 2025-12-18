import React, { useEffect, useState } from "react";
import { getBurndownDataApi } from "../../api/reports.api"; // API call to fetch burndown data
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function BurndownReport() {
  const [burndownData, setBurndownData] = useState([]);

  useEffect(() => {
    const fetchBurndownData = async () => {
      try {
        const res = await getBurndownDataApi(); // API call to get data
        setBurndownData(res.data.data); // Set the response data
      } catch (error) {
        console.error("Failed to fetch Burndown data:", error);
      }
    };

    fetchBurndownData();
  }, []);

  // Prepare chart data
  const chartData = {
    labels: burndownData.map((data) => data._id), // Dates from burndown data
    datasets: [
      {
        label: "Completed Tasks",
        data: burndownData.map((data) => data.count),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Burndown Report</h1>
      <div className="mt-6">
        <Line data={chartData} />
      </div>
    </div>
  );
}
