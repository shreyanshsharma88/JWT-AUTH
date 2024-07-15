import { UserModel } from "../models/todo";

export const verifyUser = async ({
  userId,
  todoId,
}: {
  userId: string;
  todoId?: string;
}) => {
  const user = await UserModel.findOne({ userId: userId });
  if (!userId) {
    return {
      status: false,
      message: "User ID is required",
    };
  }
//   if (!todoId) {
//     return {
//       status: true,
//       message: "User Exists",
//       user,2
//     };
//   }
  if (!user) {
    return {
      status: false,
      message: "User not found",
      user: null,
    };
  }
  if ( todoId && !user.todos.some((todo) => todo.id === todoId)) {
    return {
      status: false,
      message: "You do not own this task",
      user: null,
    };
  }
  return {
    status: true,
    message: "Success",
    user,
  };
};
