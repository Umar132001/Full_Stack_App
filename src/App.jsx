import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/projects/Projects";
import ProjectDetails from "./pages/projects/ProjectDetails";

import AppLayout from "./layout/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import Tasks from "./pages/tasks/Tasks";
import TaskCreate from "./pages/tasks/TaskCreate";

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

          {/* route for tasks list */}
          <Route path="/tasks/create" element={<TaskCreate />} />

          <Route path="/tasks" element={<Tasks />} />

          {/* Placeholder Routes */}
          <Route
            path="/workspace"
            element={<div className="p-6">Workspace coming soon</div>}
          />
          <Route
            path="/reports"
            element={<div className="p-6">Reports coming soon</div>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
