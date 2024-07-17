import { NextFunction, Request, Response } from "express";
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
  if (todoId && !user.todos.some((todo) => todo.id === todoId)) {
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
export const authChecker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, status, user } = await verifyUser({
      userId: req.headers["user-id"] as string,
      todoId: (req as Request).params.todoId,
    });

    if (status) {
      req.body.user = user;
      next();
    } else {
      res.status(400).send({ message });
    }
  } catch (err) {
    res.status(500).send({ message: "server error" });
  }
};
