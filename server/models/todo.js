import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    deadline: { type: Date, default: new Date() },
    priority: {
      type: String,
      default: "normal",
      enum: ["high", "medium", "normal", "low"],
    },
    stage: {
      type: String,
      default: "todo",
      enum: ["todo", "in progress", "completed"],
      required : true,
    },
    },
    { timestamps: true }
)
const todo = mongoose.model("todo", taskSchema);

export default todo;