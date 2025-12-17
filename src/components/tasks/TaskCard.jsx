import { useState } from "react";
import Button from "../ui/Button";
import ConfirmModal from "../ui/ConfirmModal"; // Modal for confirming task deletion

export default function TaskCard({ task, onEdit, onDelete }) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div
      className={`rounded-lg border p-4 shadow-sm transition ${
        task.status === "completed"
          ? "bg-green-200"
          : task.status === "in-progress"
          ? "bg-blue-200"
          : ""
      }`}
    >
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{task.status}</p>
      <p className="mt-2 text-sm text-slate-500">
        Due Date: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <p className="mt-2 text-sm text-slate-600">
        Task Details: {task.description}
      </p>

      <div className="flex justify-between mt-4">
        <Button onClick={() => onEdit(task)} className="bg-slate-900">
          Edit Task
        </Button>
        <Button onClick={() => setDeleteOpen(true)} className="bg-red-600">
          Delete Task
        </Button>
      </div>

      <ConfirmModal
        open={deleteOpen}
        title="Delete Task"
        description="Are you sure you want to delete this task?"
        onConfirm={() => onDelete(task._id)} // Call onDelete with task._id
        onClose={() => setDeleteOpen(false)} // Close modal on cancel
      />
    </div>
  );
}
