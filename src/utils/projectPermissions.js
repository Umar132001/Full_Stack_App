export const isOwner = (project, userId) => project.owner?._id === userId;

export const isManagerOrOwner = (project, userId) =>
  project.members.some(
    (m) => m.user._id === userId && (m.role === "owner" || m.role === "manager")
  );
