import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/todo";
import jsonWebToken from "jsonwebtoken";

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
    const token = req.headers["token"] as string;
    if (!token) {
      return res.status(400).send({ message: "Token is required" });
    }
    jsonWebToken.verify(
      token,
      process.env.SECRET_KEY as string,
      async (err, user: any) => {
        if (err) {
          return res.status(400).send({ message: "Invalid Token" });
        }
        const userObject = await UserModel.findOne({ userId: user?.userid  });

        req.body.user = userObject;
        next();
        return user;
      }
    );
  } catch (err) {
    res.status(500).send({ message: "server error" });
  }
};
