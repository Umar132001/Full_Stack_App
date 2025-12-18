import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWorkspaceApi } from "../../api/workspace.api";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";

export default function WorkspaceCreatePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workspaceData = {
      name,
      description,
      tags,
    };

    try {
      const response = await createWorkspaceApi(workspaceData);
      if (response.success) {
        toast.success("Workspace created successfully!");
        navigate("/workspace");
      }
    } catch (error) {
      toast.error("Failed to create workspace.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Workspace</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-lg font-medium">
            Tags:
          </label>
          <Select
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            options={["frontend", "backend", "full-stack"]}
            required
          />
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            className="bg-blue-600 text-white w-full py-3 rounded-lg"
          >
            Create Workspace
          </Button>
        </div>
      </form>
    </div>
  );
}
