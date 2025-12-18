import React, { useState, useEffect } from "react";
import WorkspaceSettings from "../../components/workspace/WorkspaceSettings";
import { getWorkspaceApi } from "../../api/workspace.api";
import { useParams } from "react-router-dom";

export default function WorkspaceSettingsPage() {
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

  const handleSave = (updatedWorkspace) => {
    // Call the API to save the updated workspace
  };

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading workspace settings...</p>
      ) : workspace ? (
        <WorkspaceSettings workspace={workspace} onSubmit={handleSave} />
      ) : (
        <p>Workspace not found</p>
      )}
    </div>
  );
}
