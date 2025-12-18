import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskByIdApi, updateTaskApi } from "../../api/task.api"; // APIs for fetching and updating tasks

export default function TaskEdit() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await getTaskByIdApi(taskId);
        setTask(res.data.task); // Store task details in state
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    try {
      await updateTaskApi(task._id, task);
      navigate(`/tasks`);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Edit Task</h1>
      <form onSubmit={handleUpdateTask}>
        <div>
          <label className="block">Title</label>
          <input
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 mt-2"
          />
        </div>
        <div className="mt-4">
          <label className="block">Description</label>
          <textarea
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 mt-2"
          />
        </div>
        <div className="mt-4">
          <label className="block">Due Date</label>
          <input
            type="date"
            value={task.dueDate.slice(0, 10)} // Slice to format date correctly
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 mt-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
