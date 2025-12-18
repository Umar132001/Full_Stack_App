import React, { useState } from "react";
import Button from "../ui/Button";
import AddMemberModal from "./AddMemberModal";
import {
  removeMemberFromWorkspaceApi,
  deleteWorkspaceApi,
} from "../../api/workspace.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function WorkspaceDetails({ workspace }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddMemberClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveMember = async (userId) => {
    try {
      await removeMemberFromWorkspaceApi(workspace._id, { userId });
      toast.success("Member removed successfully!");
      navigate(0);
    } catch (error) {
      toast.error("Failed to remove member");
    }
  };

  const handleDeleteWorkspace = async () => {
    try {
      await deleteWorkspaceApi(workspace._id);
      toast.success("Workspace deleted successfully!");
      navigate("/workspace");
    } catch (error) {
      toast.error("Failed to delete workspace");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-slate-900 mb-4">
        {workspace.name}
      </h2>
      <p className="text-sm text-slate-600 mb-6">{workspace.description}</p>

      <div className="mb-4">
        <h3 className="text-xl font-medium text-slate-800">Members</h3>
        <div className="space-y-4 mt-4">
          {workspace.members.map((member) => (
            <div
              key={member.user._id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md"
            >
              <span className="font-medium text-slate-900">
                {member.user.name}
              </span>
              <span className="text-sm text-slate-500">{member.role}</span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveMember(member.user._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={handleAddMemberClick}
        >
          Add Member
        </Button>

        {/* <Button className="bg-gray-600 text-white hover:bg-gray-700">
          Edit Workspace
        </Button> */}

        <Button
          onClick={handleDeleteWorkspace}
          className="bg-red-600 text-white"
        >
          Delete Workspace
        </Button>
      </div>
      {isModalOpen && (
        <AddMemberModal workspaceId={workspace._id} onClose={closeModal} />
      )}
    </div>
  );
}
