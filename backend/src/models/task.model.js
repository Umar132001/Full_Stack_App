import mongoose from "mongoose";

const checklistItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["todo", "in-progress", "review", "done"],
      default: "todo",
    },

    priority: {
      type: String,
      enum: ["P0", "P1", "P2", "P3", "P4"],
      default: "P3",
    },

    dueDate: { type: Date },

    // Subtasks
    subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],

    // Checklist
    checklist: [checklistItemSchema],

    // Task dependencies
    blockedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    blocks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],

    // Attachments (store URLs)
    attachments: [{ type: String }],

    // Comments
    comments: [commentSchema],

    // Time tracking
    totalTrackedTime: { type: Number, default: 0 }, // in minutes

    recurring: {
      type: String,
      enum: ["none", "daily", "weekly", "monthly"],
      default: "none",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
