import mongoose from "mongoose";

// Audit log schema
const auditLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: ["created", "updated", "deleted", "commented"],
    },
    entity: {
      type: String,
      enum: ["task", "project", "user", "comment"],
      required: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    details: String, // Optional field for additional info
    createdAt: { type: Date, default: Date.now }, // Timestamp of activity
  },
  { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);
