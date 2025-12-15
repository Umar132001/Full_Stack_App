import { useState } from "react";
import useProjects from "../../hooks/useProjects";
import ProjectCard from "../../components/projects/ProjectCard";
import ProjectForm from "../../components/projects/ProjectForm";
import { createProjectApi } from "../../api/project.api";
import { toast } from "react-toastify";

export default function Projects() {
  const { projects, loading, refresh } = useProjects();
  const [creating, setCreating] = useState(false);

  const createProject = async (data) => {
    try {
      await createProjectApi(data);
      toast.success("Project created");
      setCreating(false);
      refresh();
    } catch {
      toast.error("Failed to create project");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={() => setCreating(true)}
          className="rounded-xl bg-slate-900 px-4 py-2 text-white"
        >
          + New Project
        </button>
      </div>

      {creating && (
        <div className="mb-6 rounded-2xl border p-4">
          <ProjectForm onSubmit={createProject} />
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-slate-500">No projects yet</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
