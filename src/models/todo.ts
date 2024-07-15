import mongoose from "mongoose";
const TodoItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  todoId: { type: String, required: true },
  priority: { type: String, required: true },
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: String, required: true },
  todos: [TodoItemSchema],
});

export const UserModel = mongoose.model("CRUD-TEST-TODO", UserSchema);
