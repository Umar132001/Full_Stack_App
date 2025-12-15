import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project._id}`}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
          {project.template}
        </span>
      </div>

      {project.description && (
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">
          {project.description}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>{project.members.length} members</span>
        <span className="capitalize">{project.metadata?.status}</span>
      </div>
    </Link>
  );
}
