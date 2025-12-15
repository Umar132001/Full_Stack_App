import Project from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";

export async function createProject(ownerId, projectData) {
  return Project.create({
    ...projectData,
    owner: ownerId,
    members: [{ user: ownerId, role: "owner" }],
  });
}

export async function getProjectsForUser(userId) {
  return Project.find({
    $or: [{ owner: userId }, { "members.user": userId }],
  }).populate("owner members.user");
}

export async function getProjectById(projectId) {
  return Project.findById(projectId).populate("owner members.user");
}

export async function updateProject(projectId, updates) {
  return Project.findByIdAndUpdate(projectId, updates, { new: true });
}

export async function deleteProject(projectId) {
  return Project.findByIdAndDelete(projectId);
}

export async function addMember(projectId, userId, role = "member") {
  const project = await Project.findById(projectId);
  if (!project) throw new ApiError(404, "Project not found");

  const exists = project.members.some((m) => m.user.toString() === userId);
  if (exists) throw new ApiError(400, "User already a member");

  project.members.push({ user: userId, role });
  await project.save();
  return project;
}

export async function removeMember(projectId, userId) {
  return Project.findByIdAndUpdate(
    projectId,
    { $pull: { members: { user: userId } } },
    { new: true }
  );
}
