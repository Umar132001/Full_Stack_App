import React, { useState, useEffect } from "react";
import { getUsersApi } from "../../api/user.api";
import { addMemberToWorkspaceApi } from "../../api/workspace.api";
import Button from "../ui/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddMemberModal({ workspaceId, onClose }) {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [role, setRole] = useState("member");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsersApi();
        setUsers(res.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUserId) {
      toast.error("Please select a user.");
      return;
    }

    try {
      await addMemberToWorkspaceApi(workspaceId, {
        userId: selectedUserId,
        role,
      });
      onClose();
      toast.success("Member added successfully!");
      navigate(0);
    } catch (error) {
      toast.error("Failed to add member.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          Add New Member
        </h2>
        <form onSubmit={handleSubmit}>
          {/* User Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700">
              Select User:
            </label>
            <select
              className="w-full p-3 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700">
              Role:
            </label>
            <select
              className="w-full p-3 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex gap-4">
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 py-2 rounded-md"
            >
              Add Member
            </Button>
            <Button
              onClick={onClose}
              className="mt-4 w-full text-blue-600 hover:text-blue-800 border border-blue-600 py-2 rounded-md"
            >
              Close
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
