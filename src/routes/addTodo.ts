import { Router, Request, Response } from "express";
import { verifyUser } from "./verifyUser";
import { uuid } from "uuidv4";

export const addTodoRouter = Router();

addTodoRouter.post("/", async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const { message, status, user } = await verifyUser({
      userId: headers["user-id"] as string,
    });
    if (!status) {
      return res.status(400).send({
        message,
      });
    }
    const { label, priority } = req.body;
    const todoId = uuid();
    user?.todos.push({ label, priority,  todoId });
    await user?.save();
    return res.status(201).send({
      message: "Todo added successfully to your list",
      todos: user?.todos,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});
