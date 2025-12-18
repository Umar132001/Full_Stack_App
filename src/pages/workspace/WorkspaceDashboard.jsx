// pages/workspace/WorkspaceDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceCard from "../../components/workspace/WorkspaceCard";
import Button from "../../components/ui/Button";
import { getWorkspacesApi } from "../../api/workspace.api";
import { toast } from "react-toastify";

export default function WorkspaceDashboard() {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkspaces = async () => {
      setLoading(true);
      try {
        const res = await getWorkspacesApi();
        setWorkspaces(res.workspaces);
      } catch (e) {
        toast.error("Failed to load workspaces");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkspaces();
  }, []);

  const handleWorkspaceClick = (workspace) => {
    navigate(`/workspace/${workspace._id}`);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Workspaces</h1>
        <div className="mt-6">
          <Button
            onClick={() => navigate("/workspace/create")}
            className="bg-slate-900 text-white"
          >
            + Create New Workspace
          </Button>
        </div>
      </div>
      <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading workspaces...</p>
        ) : workspaces.length === 0 ? (
          <p>No workspaces found.</p>
        ) : (
          workspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace._id}
              workspace={workspace}
              onClick={handleWorkspaceClick}
            />
          ))
        )}
      </div>
    </div>
  );
}
