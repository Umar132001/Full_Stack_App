// components/tasks/TaskDetailsModal.jsx
import { useEffect, useMemo, useState } from "react";
import ConfirmModal from "../ui/ConfirmModal";

function toDateInputValue(dueDate) {
  if (!dueDate) return "";
  try {
    return new Date(dueDate).toISOString().slice(0, 10);
  } catch {
    return "";
  }
}

export default function TaskDetailsModal({
  task,
  open,
  onClose,
  onSave,
  onDelete,
}) {
  const initialForm = useMemo(() => {
    return {
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "todo",
      dueDate: toDateInputValue(task?.dueDate),
    };
  }, [task]);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(initialForm);

  const [saving, setSaving] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // when task changes/open changes, reset view mode
    if (open) {
      setEditing(false);
      setForm(initialForm);
    }
  }, [open, initialForm]);

  if (!open || !task) return null;

  const inputClass =
    "mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:bg-slate-50 disabled:text-slate-500";

  const labelClass = "block text-sm font-medium text-slate-700";

  const closeModal = () => {
    if (saving || deleting) return;
    setEditing(false);
    setForm(initialForm);
    onClose();
  };

  const startEdit = () => setEditing(true);

  const cancelEdit = () => {
    setEditing(false);
    setForm(initialForm);
  };

  const save = async () => {
    setSaving(true);
    try {
      // only send editable fields
      await onSave({
        _id: task._id,
        title: form.title,
        description: form.description,
        status: form.status,
        dueDate: form.dueDate || null,
      });

      // after save, back to view mode
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(task._id);
      setConfirmOpen(false);
      onClose();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4"
        onMouseDown={closeModal}
      >
        {/* Card */}
        <div
          className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Task Details
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {editing ? "Edit mode" : "View mode"}
              </p>
            </div>

            <button
              onClick={closeModal}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-100"
              disabled={saving || deleting}
            >
              Close
            </button>
          </div>

          {/* Form */}
          <div className="mt-6 space-y-4">
            <div>
              <label className={labelClass}>Title</label>
              <input
                className={inputClass}
                value={form.title}
                disabled={!editing}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
              />
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea
                className={inputClass}
                rows={4}
                value={form.description}
                disabled={!editing}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Status</label>
                <select
                  className={inputClass}
                  value={form.status}
                  disabled={!editing}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, status: e.target.value }))
                  }
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Due Date</label>
                <input
                  type="date"
                  className={inputClass}
                  value={form.dueDate}
                  disabled={!editing}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, dueDate: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            {/* Left side (Cancel edit) */}
            {editing ? (
              <button
                onClick={cancelEdit}
                disabled={saving || deleting}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-100 disabled:opacity-60"
              >
                Cancel
              </button>
            ) : null}

            {/* Delete */}
            <button
              onClick={() => setConfirmOpen(true)}
              disabled={saving || deleting}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
            >
              Delete
            </button>

            {/* Edit / Save */}
            {!editing ? (
              <button
                onClick={startEdit}
                disabled={saving || deleting}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={save}
                disabled={saving || deleting}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirm delete modal */}
      <ConfirmModal
        open={confirmOpen}
        title="Delete Task"
        description="This action cannot be undone."
        confirmText="Delete"
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </>
  );
}
