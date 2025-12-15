import catchAsync from "../utils/catchAsync.js";
import User from "../models/user.model.js";

export const getMe = catchAsync(async (req, res) => {
  const user = req.user;

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const getUsers = catchAsync(async (req, res) => {
  const users = await User.find().select("name email").sort({ name: 1 });

  res.json({
    success: true,
    users,
  });
});
