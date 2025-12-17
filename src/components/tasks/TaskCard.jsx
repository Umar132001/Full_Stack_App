import { useState } from "react";
import Button from "../ui/Button";
import ConfirmModal from "../ui/ConfirmModal"; // Modal for confirming task deletion

// components/tasks/TaskCard.jsx
export default function TaskCard({ task, onOpen }) {
  const statusBadge =
    task.status === "completed"
      ? "bg-green-100 text-green-800"
      : task.status === "in-progress"
      ? "bg-blue-100 text-blue-800"
      : "bg-slate-100 text-slate-700";

  const cardTint =
    task.status === "completed"
      ? "bg-green-100/70"
      : task.status === "in-progress"
      ? "bg-blue-100/70"
      : "bg-white";

  const due = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—";

  return (
    <button
      type="button"
      onClick={() => onOpen(task)}
      className={`group w-full text-left rounded-2xl border border-slate-200 ${cardTint} p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-200`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900 line-clamp-1">
          {task.title}
        </h3>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusBadge}`}
        >
          {task.status}
        </span>
      </div>

      {task.description && (
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="mt-4 text-xs text-slate-500">
        <span className="font-medium text-slate-600">Due:</span> {due}
      </div>

      <div className="mt-3 text-xs text-slate-400">Click to view details</div>
    </button>
  );
}
