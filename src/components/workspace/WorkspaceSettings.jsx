// components/workspace/WorkspaceSettings.jsx

import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
// import { updateWorkspaceApi } from "../../api/workspace.api"; // Assuming API file is in api folder
import { toast } from "react-toastify";

export default function WorkspaceSettings({ workspace, onClose }) {
  const [form, setForm] = useState({
    name: workspace.name,
    description: workspace.description,
    logoUrl: workspace.branding.logoUrl || "",
    colorScheme: workspace.branding.colorScheme || "#000000",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedWorkspace = await updateWorkspaceApi(workspace._id, form);
      toast.success("Workspace updated successfully!");
      onClose(updatedWorkspace); // Optional: Close modal and pass the updated workspace to parent
    } catch (error) {
      toast.error("Failed to update workspace");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold text-slate-900">
          Workspace Settings
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            label="Workspace Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <Input
            label="Logo URL"
            value={form.logoUrl}
            onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
          />
          <Input
            label="Color Scheme"
            value={form.colorScheme}
            onChange={(e) => setForm({ ...form, colorScheme: e.target.value })}
          />

          <div className="flex gap-3 mt-6">
            <Button type="submit">Save Changes</Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
