import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export async function createUser(userData) {
  const exists = await User.findOne({ email: userData.email });
  if (exists) throw new ApiError(400, "Email already in use");
  return User.create(userData);
}

export function getUserById(id) {
  return User.findById(id);
}

export function getUserByEmail(email) {
  return User.findOne({ email });
}
