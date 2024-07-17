import { Router, Request, Response } from "express";
import { verifyUser } from "./verifyUser";

export const getTodoRouter = Router();
getTodoRouter.get("/", async (req, res) => {
  try {
    const { headers } = req;
    // const { message, status, user } = await verifyUser({
    //   userId: headers["user-id"] as string,
    // });
    const { user } = req.body;
    console.log({id: headers["user-id"]})
    // if (!status)
    //   return res.status(400).send({
    //     message,
    //   });
    return res.status(200).send({
      message: "Success",
      todos: user?.todos ?? [],
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});
