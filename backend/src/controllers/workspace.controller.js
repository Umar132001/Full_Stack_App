import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import Workspace from "../models/workspace.model.js";
import User from "../models/user.model.js";

// Create workspace
export const createWorkspace = catchAsync(async (req, res) => {
  const { name, description, tags } = req.body;

  const workspace = await Workspace.create({
    name,
    description,
    tags,
    owner: req.user.id, // Owner is the logged-in user
  });

  // Add the owner as the first member of the workspace
  workspace.members.push({ user: req.user.id, role: "admin" });
  await workspace.save();

  res.status(201).json({ success: true, workspace });
});

// Get workspace details
export const getWorkspace = catchAsync(async (req, res) => {
  const workspace = await Workspace.findById(req.params.workspaceId)
    .populate("owner", "name email")
    .populate("members.user", "name email");

  if (!workspace) {
    throw new ApiError(404, "Workspace not found");
  }

  res.json({ success: true, workspace });
});

// Add member to workspace
export const addMember = catchAsync(async (req, res) => {
  const { userId, role } = req.body;

  const workspace = await Workspace.findById(req.params.workspaceId);

  if (!workspace) {
    throw new ApiError(404, "Workspace not found");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Check if user is already a member
  if (workspace.members.some((member) => member.user.toString() === userId)) {
    throw new ApiError(400, "User is already a member of this workspace");
  }

  workspace.members.push({ user: userId, role });
  await workspace.save();

  res.json({ success: true, message: "User added to workspace" });
});
