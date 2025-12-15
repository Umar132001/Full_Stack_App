import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["admin", "member"],
          default: "member",
        },
      },
    ],
    tags: [{ type: String }],
    branding: {
      logoUrl: { type: String },
      colorScheme: { type: String, default: "#000000" },
    },
    billingInfo: {
      subscriptionPlan: {
        type: String,
        enum: ["basic", "premium", "enterprise"],
        default: "basic",
      },
      lastPaidDate: { type: Date },
      nextBillingDate: { type: Date },
    },
    status: {
      type: String,
      enum: ["active", "suspended", "archived"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Workspace", workspaceSchema);
