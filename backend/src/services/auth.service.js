import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";

export async function loginWithEmailPassword(email, password) {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ApiError(401, "Invalid login");

  const match = await user.isPasswordMatch(password);
  if (!match) throw new ApiError(401, "Invalid login");

  return user;
}
