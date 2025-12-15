import Task from "../models/task.model.js";

export const createTask = async (data, userId) => {
  console.log("🛠 Service: createTask()");
  console.log("🚀 Data:", data);
  console.log("👤 User:", userId);

  const task = await Task.create({
    ...data,
    createdBy: userId,
  });

  console.log("🔨 Task created in DB:", task._id);

  return task;
};

export const getTaskById = async (id) => {
  console.log("🔎 Service: getTaskById()", id);

  return await Task.findById(id)
    .populate("assignee", "name email")
    .populate("createdBy", "name email")
    .populate("blockedBy", "title status")
    .populate("blocks", "title status")
    .populate("subtasks", "title status")
    .populate("comments.user", "name");
};

export const updateTask = async (taskId, updates) => {
  console.log("🖊 Service: updateTask()", taskId, updates);

  return await Task.findByIdAndUpdate(taskId, updates, { new: true });
};

export const addComment = async (taskId, userId, text) => {
  console.log("💬 Service: addComment()", { taskId, userId, text });

  const task = await Task.findById(taskId);
  task.comments.push({ user: userId, text });

  await task.save();

  console.log("💬 Comment saved");

  return task;
};

export const addChecklistItem = async (taskId, item) => {
  console.log("🧾 Service: addChecklistItem()", taskId, item);

  const task = await Task.findById(taskId);
  task.checklist.push(item);

  await task.save();

  console.log("🧾 Checklist saved");

  return task;
};
