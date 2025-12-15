import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import {
  createTask,
  getTaskById,
  updateTask,
  addComment,
  addChecklistItem,
} from "../services/task.service.js";

// Create a task
export const create = catchAsync(async (req, res) => {
  console.log("🟢 Controller: create task called");
  console.log("➡ Request Body:", req.body);
  console.log("➡ User ID:", req.user.id);

  const task = await createTask(req.body, req.user.id);

  console.log("✅ Task created:", task._id);

  res.status(201).json({ success: true, task });
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
