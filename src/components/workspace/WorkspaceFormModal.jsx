// components/workspace/WorkspaceFormModal.jsx
import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function WorkspaceFormModal({ workspace, onSubmit, onClose }) {
  const [form, setForm] = useState({
    name: workspace.name,
    description: workspace.description,
    tags: workspace.tags.join(", "), // Join tags for input
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...workspace,
      name: form.name,
      description: form.description,
      tags: form.tags.split(",").map((tag) => tag.trim()), // Split tags
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold text-slate-900">Edit Workspace</h3>
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
            label="Tags (comma separated)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
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
