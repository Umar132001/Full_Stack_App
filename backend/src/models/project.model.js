import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    description: { type: String, trim: true },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["owner", "manager", "member"],
          default: "member",
        },
      },
    ],

    template: {
      type: String,
      enum: ["kanban", "scrum", "basic"],
      default: "basic",
    },

    tags: [{ type: String }],

    metadata: {
      deadline: { type: Date },
      budget: { type: Number },
      status: {
        type: String,
        enum: ["not-started", "in-progress", "completed"],
        default: "not-started",
      },
    },

    isPublic: { type: Boolean, default: false },

    integrations: {
      githubRepo: { type: String },
      slackChannel: { type: String },
    },

    notifications: {
      enabled: { type: Boolean, default: true },
      emailUpdates: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
