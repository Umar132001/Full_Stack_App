// pages/tasks/Tasks.jsx
import { useEffect, useMemo, useState } from "react";
import {
  getProjectsApi,
  getTasksByProjectIdApi,
  updateTaskApi,
  deleteTaskApi,
} from "../../api/task.api";
import { useNavigate, useSearchParams } from "react-router-dom";
import TaskCard from "../../components/tasks/TaskCard";
import TaskDetailsModal from "../../components/tasks/TaskDetailsModal";
import { toast } from "react-toastify";

export default function Tasks() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);

  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const projectQuery = searchParams.get("projectId");

  // ------- Load projects -------
  useEffect(() => {
    const run = async () => {
      setLoadingProjects(true);
      try {
        const res = await getProjectsApi();
        const list = res.data.projects || [];
        setProjects(list);

        // prefer URL projectId, else first project
        const initialId = projectQuery || list[0]?._id || "";
        setSelectedProjectId(initialId);

        if (initialId) setSearchParams({ projectId: initialId });
      } catch (e) {
        toast.error("Failed to load projects");
      } finally {
        setLoadingProjects(false);
      }
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keep selection in sync if URL changes (optional but nice)
  useEffect(() => {
    if (projectQuery && projectQuery !== selectedProjectId) {
      setSelectedProjectId(projectQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectQuery]);

  // ------- Load tasks -------
  useEffect(() => {
    const run = async () => {
      if (!selectedProjectId) return;

      setLoadingTasks(true);
      setSelectedTaskId(null);

      try {
        const res = await getTasksByProjectIdApi(selectedProjectId);
        setTasks(res.data.tasks || []);
      } catch (e) {
        toast.error("Failed to load tasks");
        setTasks([]);
      } finally {
        setLoadingTasks(false);
      }
    };

    run();
  }, [selectedProjectId]);

  const selectedTask = useMemo(() => {
    if (!selectedTaskId) return null;
    return tasks.find((t) => t._id === selectedTaskId) || null;
  }, [selectedTaskId, tasks]);

  useEffect(() => {
    // if deleted from list, close modal automatically
    if (selectedTaskId && !selectedTask) {
      setSelectedTaskId(null);
    }
  }, [selectedTaskId, selectedTask]);

  const onProjectChange = (e) => {
    const id = e.target.value;
    setSelectedProjectId(id);
    setSearchParams(id ? { projectId: id } : {});
  };

  // ------- Update -------
  const handleSave = async (updatedTask) => {
    if (!updatedTask?._id) {
      toast.error("Task ID is missing!");
      return;
    }

    const { _id, ...payload } = updatedTask;

    try {
      await updateTaskApi(_id, payload);

      // update local list without re-fetch
      setTasks((prev) =>
        prev.map((t) => (t._id === _id ? { ...t, ...payload } : t))
      );

      toast.success("Task updated successfully!");
    } catch (e) {
      toast.error("Failed to update task");
      throw e; // so modal can stop loading correctly if needed
    }
  };

  // ------- Delete -------
  const handleDelete = async (taskId) => {
    if (!taskId) return;

    try {
      await deleteTaskApi(taskId);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (e) {
      toast.error("Failed to delete task");
      throw e;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>

        <button
          onClick={() => {
            if (!selectedProjectId)
              return toast.error("Select a project first");
            navigate(`/tasks/create?projectId=${selectedProjectId}`);
          }}
          className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
        >
          + Add Task
        </button>
      </div>

      {/* Project select */}
      <div className="mb-6">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700">
            Select a project
          </span>
          <select
            value={selectedProjectId}
            onChange={onProjectChange}
            disabled={loadingProjects}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:bg-slate-50"
          >
            <option value="">Select a project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Tasks */}
      {!selectedProjectId ? (
        <p className="text-slate-500">Select a project to view tasks.</p>
      ) : loadingTasks ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-slate-500">No tasks found for this project.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onOpen={() => setSelectedTaskId(task._id)}
            />
          ))}
        </div>
      )}

      {/* Details modal */}
      <TaskDetailsModal
        open={!!selectedTaskId}
        task={selectedTask}
        onClose={() => setSelectedTaskId(null)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
