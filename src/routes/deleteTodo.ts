import { Router, Request, Response } from "express";
import { verifyUser } from "./verifyUser";
import { UserModel } from "../models/todo";

export const deleteTodoRouter = Router();

deleteTodoRouter.delete("/:todoId", async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const { todoId } = req.params;
    // const { message, status, user } = await verifyUser({
    //   userId: headers["user-id"] as string,
    //   todoId
    // });
    const {user} = req.body

    // if (!status) {
    //   return res.status(400).send({ message });
    // }

    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    console.log({
        params: req.params
    });
    

    if (!todoId) {
      return res.status(400).send({
        message: "Todo ID is required",
      });
    }

    const updatedTodos = user.todos.filter((todo:any) => todo.todoId !== todoId);

    if (updatedTodos.length === user.todos.length) {
      return res.status(400).send({
        message: "Todo not found",
      });
    }

    const deleteId = user?.todos?.find((todo: any) => todo.todoId=== todoId)?._id;

    user.todos.pull(deleteId)
    await user.save();

    return res.status(200).send({
      message: "Todo deleted successfully",
      todos: user.todos,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
});
