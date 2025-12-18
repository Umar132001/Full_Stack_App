import React, { useEffect, useState } from "react";
import { getWorkloadDataApi } from "../../api/reports.api"; // API call to fetch workload data
import { Pie } from "react-chartjs-2"; // Using pie chart for workload analysis

export default function WorkloadReport() {
  const [workloadData, setWorkloadData] = useState([]);

  useEffect(() => {
    const fetchWorkloadData = async () => {
      try {
        const res = await getWorkloadDataApi(); // API call to get workload data
        setWorkloadData(res.data.data); // Set the response data
      } catch (error) {
        console.error("Failed to fetch Workload data:", error);
      }
    };

    fetchWorkloadData();
  }, []);

  // Prepare chart data
  const chartData = {
    labels: workloadData.map((data) => data._id),
    datasets: [
      {
        data: workloadData.map((data) => data.taskCount),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Workload Analysis Report</h1>
      <div className="mt-6">
        <Pie data={chartData} />
      </div>
    </div>
  );
}
