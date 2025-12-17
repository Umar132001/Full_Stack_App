import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import {
  createTask,
  getTaskById,
  updateTask,
  addComment,
  addChecklistItem,
  deleteTask as deleteTaskService,
} from "../services/task.service.js";
import Task from "../models/task.model.js";

// Create a task
export const create = catchAsync(async (req, res) => {
  console.log("🟢 Controller: create task called");
  console.log("➡ Request Body:", req.body);
  console.log("➡ User ID:", req.user.id);

  const task = await createTask(req.body, req.user.id);

  console.log("✅ Task created:", task._id);

  res.status(201).json({ success: true, task });
});

// Fetch all tasks for a project
export const getTasksForProject = catchAsync(async (req, res) => {
  const { projectId } = req.query;
  console.log("Received projectId:", projectId);

  if (!projectId) {
    throw new ApiError(400, "Project ID is required");
  }

  try {
    const tasks = await Task.find({ project: projectId })
      .populate("assignee", "name email")
      .populate("createdBy", "name email");

    if (tasks.length === 0) {
      return res.status(200).json({ success: true, tasks: [] }); // Return empty tasks array
    }

    res.json({ success: true, tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ success: false, message: "Error fetching tasks" });
  }
});

export const getTasksByProjectId = catchAsync(async (req, res) => {
  console.log(
    "🟡 Controller: getTasksByProjectId called ProjectID:",
    req.params.projectId
  );

  try {
    const tasks = await Task.find({ project: projectId })
      .populate("assignee", "name email")
      .populate("createdBy", "name email");

    if (!tasks || tasks.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No tasks found" });
    }

    res.json({ success: true, tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error); // Log the error
    res.status(500).json({ success: false, message: "Error fetching tasks" });
  }
});

// Get task details
export const getOne = catchAsync(async (req, res) => {
  console.log("🟡 Controller: getOne called TaskID:", req.params.taskId);

  const task = await getTaskById(req.params.taskId);
  if (!task) {
    console.log("❌ Task not found");
    throw new ApiError(404, "Task not found");
  }

  console.log("📄 Task found:", task._id);

  res.json({ success: true, task });
});

// Update task
export const update = catchAsync(async (req, res) => {
  console.log("🟠 Controller: update called TaskID:", req.params.taskId);
  console.log("➡ Update Body:", req.body);

  const task = await updateTask(req.params.taskId, req.body);

  console.log("📝 Task updated:", task._id);

  res.json({ success: true, task });
});

// Delete task
export const deleteTask = catchAsync(async (req, res) => {
  console.log("🛑 Controller: deleteTask() TaskID:", req.params.taskId); // Log taskId
  const task = await deleteTaskService(req.params.taskId); // Pass taskId to service

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  console.log("✅ Task deleted:", task._id);
  res.json({ success: true, message: "Task deleted successfully" });
});

// Add comment
export const comment = catchAsync(async (req, res) => {
  console.log("💬 Controller: comment called TaskID:", req.params.taskId);

  const task = await addComment(req.params.taskId, req.user.id, req.body.text);

  console.log("📨 Comment added");

  res.json({ success: true, task });
});

// Add checklist item
export const addChecklist = catchAsync(async (req, res) => {
  console.log("🧾 Controller: addChecklist TaskID:", req.params.taskId);

  const task = await addChecklistItem(req.params.taskId, req.body);

  console.log("🟢 Checklist item added");

  res.json({ success: true, task });
});
