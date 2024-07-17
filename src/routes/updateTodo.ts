import { Router, Request, Response } from "express";
import { verifyUser } from "./verifyUser";

export const updateTodoRouter = Router();

updateTodoRouter.put("/:todoId", async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const { todoId } = req.params;
    // const { message, status, user } = await verifyUser({
    //   userId: headers["user-id"] as string,
    //   todoId
    // });
    const { user } = req.body;

    // if (!status) {
    //   return res.status(400).send({ message });
    // }

    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    const { label, priority } = req.body;

    if (!todoId) {
      return res.status(400).send({
        message: "Todo ID is required",
      });
    }

    const localId = user?.todos?.find((todo: any) => todo.todoId === todoId)?._id;
    const todo = user.todos.id(localId);
    if (!todo) {
      return res.status(400).send({
        message: "Todo not found",
      });
    }

    // Update the fields directly

    if (label) todo.label = label;
    if (priority) todo.priority = priority;

    await user.save();

    return res.status(200).send({
      message: "Todo updated successfully",
      todos: user.todos,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
});
