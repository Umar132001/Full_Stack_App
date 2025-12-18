import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";

const TimeTrackingReport = () => {
  const [data, setData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Clean up chart when component unmounts or data changes
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Destroy the old chart
      }
    };
  }, [data]);

  // Example function to fetch the data for the chart
  const fetchData = async () => {
    try {
      const res = await fetch("your_api_endpoint");
      const json = await res.json();
      setData(json.data); // Set data for the chart
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const chartData = {
    labels: data ? data.labels : [],
    datasets: [
      {
        label: "Time Tracking",
        data: data ? data.timeTrackingValues : [],
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>Time Tracking Report</h2>
      <Line ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  );
};

export default TimeTrackingReport;
