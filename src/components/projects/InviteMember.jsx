import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { inviteMemberApi } from "../../api/project.api";
import { getUsersApi } from "../../api/user.api";
import Button from "../ui/Button";

export default function InviteMember({ projectId, onSuccess, project }) {
  const me = JSON.parse(localStorage.getItem("me") || "{}");

  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("");
  const [role, setRole] = useState("member");
  const [loading, setLoading] = useState(false);

  // ---------------- FETCH USERS ----------------
  useEffect(() => {
    getUsersApi()
      .then((res) => {
        const existingIds = project.members.map((m) => m.user._id);

        // ❌ remove current user & existing members
        const filtered = res.data.users.filter(
          (u) => u._id !== me.id && !existingIds.includes(u._id)
        );

        setUsers(filtered);
      })
      .catch(() => toast.error("Failed to load users"));
  }, [project, me.id]);

  // ---------------- INVITE ----------------
  const submit = async (e) => {
    e.preventDefault();
    if (!selected) return toast.error("Select a user");

    try {
      setLoading(true);
      await inviteMemberApi(projectId, {
        userId: selected,
        role,
      });
      toast.success("Member added");
      onSuccess();
      setSelected("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      {/* USER SELECT */}
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Select User
        </label>

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
        >
          <option value="">Choose a user</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>
      </div>

      {/* ROLE */}
      <div>
        <label className="block text-sm font-medium text-slate-700">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
        >
          <option value="member">Member</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      <Button loading={loading}>Invite Member</Button>

      {users.length === 0 && (
        <p className="text-sm text-slate-500">No users available to add</p>
      )}
    </form>
  );
}
