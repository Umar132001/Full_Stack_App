import React, { useState } from "react";
import Button from "../ui/Button";
import AddMemberModal from "./AddMemberModal";
import ConfirmModal from "../ui/ConfirmModal";
import {
  removeMemberFromWorkspaceApi,
  deleteWorkspaceApi,
} from "../../api/workspace.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function WorkspaceDetails({ workspace }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmRemoveOpen, setConfirmRemoveOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
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

  // when user clicks "Remove" on a member
  const openRemoveConfirm = (userId) => {
    setSelectedMemberId(userId);
    setConfirmRemoveOpen(true);
  };

  // when user confirms remove in modal
  const confirmRemoveMember = async () => {
    if (!selectedMemberId) return;
    try {
      await removeMemberFromWorkspaceApi(workspace._id, {
        userId: selectedMemberId,
      });
      toast.success("Member removed successfully!");
      setConfirmRemoveOpen(false);
      setSelectedMemberId(null);
      navigate(0);
    } catch (error) {
      toast.error("Failed to remove member");
    }
  };

  // when user clicks "Delete Workspace" button
  const openDeleteWorkspaceConfirm = () => {
    setConfirmOpen(true);
  };

  const confirmDeleteWorkspace = async () => {
    try {
      await deleteWorkspaceApi(workspace._id);
      toast.success("Workspace deleted successfully!");
      setConfirmOpen(false);
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
                onClick={() => openRemoveConfirm(member.user._id)}
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

        <button
          onClick={openDeleteWorkspaceConfirm}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
        >
          Delete Workspace
        </button>
      </div>
      {isModalOpen && (
        <AddMemberModal workspaceId={workspace._id} onClose={closeModal} />
      )}

      {/* Confirm remove member */}
      <ConfirmModal
        open={confirmRemoveOpen}
        title="Remove Member"
        description="Are you sure you want to remove this member from the workspace?"
        confirmText="Remove"
        onClose={() => {
          setConfirmRemoveOpen(false);
          setSelectedMemberId(null);
        }}
        onConfirm={confirmRemoveMember}
      />

      {/* Confirm delete workspace */}
      <ConfirmModal
        open={confirmOpen}
        title="Delete Workspace"
        description="This will delete the workspace and cannot be undone."
        confirmText="Delete"
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDeleteWorkspace}
      />
    </div>
  );
}
