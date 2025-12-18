import React, { useEffect, useState } from "react";
import { getRecurringTasksDataApi } from "../../api/reports.api"; // API call to fetch recurring tasks data
import { Doughnut } from "react-chartjs-2"; // Doughnut chart for recurring tasks analysis

export default function RecurringTasksReport() {
  const [recurringData, setRecurringData] = useState([]);

  useEffect(() => {
    const fetchRecurringData = async () => {
      try {
        const res = await getRecurringTasksDataApi(); // API call to get recurring tasks data
        setRecurringData(res.data.data); // Set the response data
      } catch (error) {
        console.error("Failed to fetch Recurring Tasks data:", error);
      }
    };

    fetchRecurringData();
  }, []);

  // Prepare chart data
  const chartData = {
    labels: recurringData.map((data) => data._id),
    datasets: [
      {
        data: recurringData.map((data) => data.count),
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Recurring Tasks Report</h1>
      <div className="mt-6">
        <Doughnut data={chartData} />
      </div>
    </div>
  );
}
