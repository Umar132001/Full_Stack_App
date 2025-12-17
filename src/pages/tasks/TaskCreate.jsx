import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createTaskApi, getProjectsApi, getUsersApi } from "../../api/task.api"; // Updated API
import { toast } from "react-toastify";

export default function TaskCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("P3");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projectId, setProjectId] = useState(""); // To hold selected project ID

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectQuery = searchParams.get("projectId");

  useEffect(() => {
    // Fetch the list of projects and users
    const fetchData = async () => {
      try {
        const projectRes = await getProjectsApi();
        const userRes = await getUsersApi();
        setProjects(projectRes.data.projects);
        setUsers(userRes.data.users);
        setProjectId(projectQuery || projectRes.data.projects[0]?._id); // Select first project by default
      } catch (error) {
        toast.error("Failed to fetch projects or users.");
      }
    };
    fetchData();
  }, [projectQuery]);

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!title || !description || !assignee || !projectId || !dueDate) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      const taskData = {
        title,
        description,
        project: projectId,
        assignee,
        priority,
        dueDate,
      };
      await createTaskApi(taskData);
      toast.success("Task created successfully!");
      navigate(`/tasks?projectId=${projectId}`);
    } catch (error) {
      toast.error("Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Task</h1>

      <form onSubmit={handleCreateTask} className="space-y-4">
        {/* Task Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />

        {/* Project Dropdown */}
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>

        {/* Assignee Dropdown */}
        <select
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="">Select Assignee</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        {/* Priority */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="P0">P0</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
          <option value="P3">P3</option>
          <option value="P4">P4</option>
        </select>

        {/* Due Date */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-3 rounded-lg"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}
