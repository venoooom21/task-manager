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

const todo = mongoose.model("Todo", todoSchema);
//test
//   const newTodo = new todo({
//   title: 'John Doe',
//   priority: 'high',
//   stage: 'in progress'
// });
// newTodo.save()
//   .then(() => console.log('User saved successfully!'))
//   .catch((error) => console.log('Error saving user:', error));

export default Todo;