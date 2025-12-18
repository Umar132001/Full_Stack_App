// components/workspace/WorkspaceCard.jsx
import React from "react";

export default function WorkspaceCard({ workspace, onClick }) {
  return (
    <div
      onClick={() => onClick(workspace)}
      className="cursor-pointer w-full max-w-md rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition-all"
    >
      <h3 className="text-xl font-bold text-slate-900">{workspace.name}</h3>
      <p className="text-sm text-slate-600">{workspace.description}</p>
      <div className="mt-3 text-xs text-slate-500">
        <span>Status: {workspace.status}</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        {workspace.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-slate-200 px-2 py-1 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
