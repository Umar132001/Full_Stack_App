// pages/workspace/WorkspaceDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WorkspaceDetails from "../../components/workspace/WorkspaceDetails"; // Workspace details component
import { getWorkspaceApi } from "../../api/workspace.api"; // Fetch workspace details API

export default function WorkspaceDetailsPage() {
  const { workspaceId } = useParams();
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWorkspace = async () => {
      setLoading(true);
      try {
        const res = await getWorkspaceApi(workspaceId);
        setWorkspace(res.workspace);
      } catch (error) {
        console.error("Failed to load workspace", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspace();
  }, [workspaceId]);

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading workspace details...</p>
      ) : workspace ? (
        <WorkspaceDetails workspace={workspace} />
      ) : (
        <p>Workspace not found</p>
      )}
    </div>
  );
}
