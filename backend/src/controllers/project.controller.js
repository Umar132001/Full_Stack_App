import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import {
  createProject,
  getProjectsForUser,
  getProjectById,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
} from "../services/project.service.js";

export const create = catchAsync(async (req, res) => {
  const project = await createProject(req.user.id, req.body);
  res.status(201).json({ success: true, project });
});

export const getMyProjects = catchAsync(async (req, res) => {
  const projects = await getProjectsForUser(req.user.id);
  res.json({ success: true, projects });
});

export const getOne = catchAsync(async (req, res) => {
  const project = await getProjectById(req.params.projectId);
  if (!project) throw new ApiError(404, "Project not found");

  res.json({ success: true, project });
});

export const update = catchAsync(async (req, res) => {
  const project = await updateProject(req.params.projectId, req.body);
  res.json({ success: true, project });
});

export const remove = catchAsync(async (req, res) => {
  await deleteProject(req.params.projectId);
  res.json({ success: true });
});

export const inviteMember = catchAsync(async (req, res) => {
  const { userId, role } = req.body;
  const project = await addMember(req.params.projectId, userId, role);
  res.json({ success: true, project });
});

export const removeMemberController = catchAsync(async (req, res) => {
  const project = await removeMember(req.params.projectId, req.params.userId);
  res.json({ success: true, project });
});
