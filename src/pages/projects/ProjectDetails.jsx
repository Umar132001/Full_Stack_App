import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getProjectApi,
  updateProjectApi,
  deleteProjectApi,
  removeMemberApi,
} from "../../api/project.api";
import ProjectForm from "../../components/projects/ProjectForm";
import InviteMember from "../../components/projects/InviteMember";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { toast } from "react-toastify";
import { isOwner } from "../../utils/projectPermissions";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [editing, setEditing] = useState(false);

  // delete project modal state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // remove member modal state
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [removing, setRemoving] = useState(false);

  const me = JSON.parse(localStorage.getItem("me") || "{}");

  // ---------------- FETCH PROJECT ----------------
  useEffect(() => {
    getProjectApi(projectId)
      .then((res) => setProject(res.data.project))
      .catch(() => toast.error("Failed to load project"));
  }, [projectId]);

  if (!project) return <p className="p-6">Loading...</p>;

  // ---------------- UPDATE PROJECT ----------------
  const handleUpdate = async (data) => {
    try {
      await updateProjectApi(project._id, data);
      toast.success("Project updated");
      setEditing(false);
      const res = await getProjectApi(project._id);
      setProject(res.data.project);
    } catch {
      toast.error("Failed to update project");
    }
  };

  // ---------------- DELETE PROJECT ----------------
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteProjectApi(project._id);
      toast.success("Project deleted");
      navigate("/projects");
    } catch {
      toast.error("Failed to delete project");
    } finally {
      setDeleting(false);
      setDeleteOpen(false);
    }
  };

  // ---------------- REMOVE MEMBER ----------------
  const confirmRemoveMember = async () => {
    try {
      setRemoving(true);
      await removeMemberApi(project._id, memberToRemove);
      toast.success("Member removed");
      const res = await getProjectApi(project._id);
      setProject(res.data.project);
    } catch {
      toast.error("Failed to remove member");
    } finally {
      setRemoving(false);
      setMemberToRemove(null);
    }
  };

  // =================================================
  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* HEADER */}
      <h1 className="text-2xl font-bold text-slate-900">{project.name}</h1>
      <p className="mt-2 text-slate-600">{project.description}</p>

      {/* MEMBERS */}
      <h3 className="mt-6 font-semibold">Members</h3>
      <ul className="mt-2 space-y-2">
        {project.members.map((m) => (
          <li
            key={m.user._id}
            className="flex items-center justify-between rounded-lg border px-3 py-2"
          >
            <div>
              <p className="font-medium">{m.user.email}</p>
              <p className="text-xs text-slate-500">{m.role}</p>
            </div>

            {isOwner(project, me.id) && m.role !== "owner" && (
              <button
                onClick={() => setMemberToRemove(m.user._id)}
                className="text-sm text-red-600 cursor-pointer hover:underline"
              >
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* OWNER ACTIONS */}
      {isOwner(project, me.id) && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setEditing(true)}
            className="rounded-lg bg-slate-900 px-4 py-2 text-white"
          >
            Edit Project
          </button>

          <button
            onClick={() => setDeleteOpen(true)}
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Delete Project
          </button>
        </div>
      )}

      {/* EDIT FORM */}
      {editing && (
        <div className="mt-6 rounded-2xl border p-4">
          <ProjectForm initial={project} onSubmit={handleUpdate} />
        </div>
      )}

      {/* INVITE MEMBER */}
      {isOwner(project, me.id) && (
        <div className="mt-6 rounded-2xl border p-4">
          <h3 className="mb-3 font-semibold">Invite Member</h3>
          <InviteMember
            projectId={project._id}
            project={project}
            onSuccess={async () => {
              const res = await getProjectApi(project._id);
              setProject(res.data.project);
            }}
          />
        </div>
      )}

      {/* DELETE PROJECT MODAL */}
      <ConfirmModal
        open={deleteOpen}
        title="Delete Project"
        description="This action cannot be undone. All project data will be permanently removed."
        confirmText="Delete"
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        loading={deleting}
      />

      {/* REMOVE MEMBER MODAL */}
      <ConfirmModal
        open={!!memberToRemove}
        title="Remove Member"
        description="The user will lose access to this project."
        confirmText="Remove"
        onClose={() => setMemberToRemove(null)}
        onConfirm={confirmRemoveMember}
        loading={removing}
      />
    </div>
  );
}
