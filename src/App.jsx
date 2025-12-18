import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/projects/Projects";
import ProjectDetails from "./pages/projects/ProjectDetails";
import WorkspaceDashboard from "./pages/workspace/WorkspaceDashboard";
import WorkspaceDetailsPage from "./pages/workspace/WorkspaceDetailsPage";
import WorkspaceSettingsPage from "./pages/workspace/WorkspaceSettingsPage";
import WorkspaceCreatePage from "./pages/workspace/WorkspaceCreatePage";

import AppLayout from "./layout/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import Tasks from "./pages/tasks/Tasks";
import TaskCreate from "./pages/tasks/TaskCreate";

import ReportDashboard from "./pages/reports/ReportDashboard";
import BurndownReport from "./pages/reports/BurndownReport";
import VelocityReport from "./pages/reports/VelocityReport";
// import WorkloadReport from "./pages/reports/WorkloadReport";
// import RecurringTasksReport from "./pages/reports/RecurringTasksReport";
import TimeTrackingReport from "./pages/reports/TimeTrackingReport";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Layout */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />

          {/* Task Routes */}
          <Route path="/tasks/create" element={<TaskCreate />} />
          <Route path="/tasks" element={<Tasks />} />

          {/* Workspace Routes */}
          <Route path="/workspace/create" element={<WorkspaceCreatePage />} />
          <Route path="/workspace" element={<WorkspaceDashboard />} />
          <Route
            path="/workspace/:workspaceId"
            element={<WorkspaceDetailsPage />}
          />
          <Route
            path="/workspace/settings/:workspaceId"
            element={<WorkspaceSettingsPage />}
          />

          {/* Placeholder Routes */}
          <Route path="/reports" element={<ReportDashboard />} />
          <Route path="/reports/burndown" element={<BurndownReport />} />
          <Route path="/reports/velocity" element={<VelocityReport />} />
          {/* <Route path="/reports/workload" element={<WorkloadReport />} />
          <Route path="/reports/recurring" element={<RecurringTasksReport />} /> */}
          <Route
            path="/reports/time-tracking"
            element={<TimeTrackingReport />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
