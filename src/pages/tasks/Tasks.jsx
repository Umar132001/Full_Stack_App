import { useState, useEffect } from "react";
import {
  getProjectsApi,
  getTasksByProjectIdApi,
  updateTaskApi,
  deleteTaskApi,
} from "../../api/task.api";
import { useNavigate } from "react-router-dom";
import TaskCard from "../../components/tasks/TaskCard";
import TaskFormModal from "../../components/tasks/TaskFormModal";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { toast } from "react-toastify";

export default function Tasks() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(""); // Selected project ID
  const [tasks, setTasks] = useState([]); // List of tasks
  const [loading, setLoading] = useState(false); // Loading state
  const [editingTask, setEditingTask] = useState(null); // Task being edited
  const [deleteOpen, setDeleteOpen] = useState(false); // State to open delete confirmation modal

  const navigate = useNavigate();

  // Fetch the list of projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjectsApi();
        setProjects(res.data.projects);
      } catch (error) {
        toast.error("Failed to load projects");
      }
    };

    fetchProjects();
  }, []);

  // Fetch the tasks for the selected project
  useEffect(() => {
    const fetchTasks = async () => {
      if (!selectedProjectId) return; // Do nothing if no project is selected

      setLoading(true);

      try {
        const res = await getTasksByProjectIdApi(selectedProjectId);
        setTasks(res.data.tasks);
      } catch (error) {
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [selectedProjectId]);

  const handleProjectSelect = (e) => {
    setSelectedProjectId(e.target.value); // Set selected project
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Handle task update
  const handleUpdateTask = async (updatedTask) => {
    if (!updatedTask._id) {
      toast.error("Task ID is missing!");
      return;
    }

    try {
      await updateTaskApi(updatedTask._id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
      setEditingTask(null);
      toast.success("Task updated successfully!");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  // Handle task deletion

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTaskApi(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button
          onClick={() =>
            navigate(`/tasks/create?projectId=${selectedProjectId}`)
          }
        >
          + Add Task
        </Button>
      </div>

      {/* Project selection dropdown */}
      <div className="mb-6">
        <Input
          as="select"
          value={selectedProjectId}
          onChange={handleProjectSelect}
          label="Select a project"
        >
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </Input>
      </div>

      {/* Task listing */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found for this project.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <TaskFormModal
          task={editingTask}
          onSubmit={handleUpdateTask}
          onClose={() => setEditingTask(null)} // Close the modal on cancel
        />
      )}

      {/* Delete Task Confirmation Modal */}
      <ConfirmModal
        open={deleteOpen}
        title="Delete Task"
        description="Are you sure you want to delete this task?"
        onConfirm={handleDeleteTask}
        onClose={() => setDeleteOpen(false)}
      />
    </div>
  );
}
