import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function ReportDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Reports Dashboard</h1>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Available Reports</h2>
        <div className="flex gap-4 mt-4 flex-col max-w-2xs">
          {" "}
          <Button
            onClick={() => navigate("/reports/burndown")}
            className="w-full"
          >
            Burndown Report
          </Button>
          <Button
            onClick={() => navigate("/reports/velocity")}
            className="w-full"
          >
            Team Velocity Report
          </Button>
          {/* <Button
            onClick={() => navigate("/reports/workload")}
            className="w-full"
          >
            Workload Analysis Report
          </Button>
          <Button
            onClick={() => navigate("/reports/recurring")}
            className="w-full"
          >
            Recurring Tasks Report
          </Button> */}
          <Button
            onClick={() => navigate("/reports/time-tracking")}
            className="w-full"
          >
            Time Tracking Report
          </Button>
        </div>
      </div>
    </div>
  );
}
