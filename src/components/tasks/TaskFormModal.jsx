import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

const TaskFormModal = ({ task, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate.slice(0, 10), // Format for date input
  });

  // Include the task ID in the form data when submitting
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task._id) {
      toast.error("Task ID is missing!");
      return;
    }

    const updatedTask = { ...formData, _id: task._id };

    onSubmit(updatedTask);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold">Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <Input
            as="textarea"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Input
            as="select"
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </Input>
          <Input
            label="Due Date"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
          />
          <div className="flex justify-between">
            <Button onClick={onClose}>Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
