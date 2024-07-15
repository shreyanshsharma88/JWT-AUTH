import { Router, Request, Response } from "express";
import { UserModel } from "../models/todo";

export const loginRouter = Router();
loginRouter.post("/", async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body
    if (!email || !password) {
      return res.status(400).send({
        message: "Email and password are required",
      });
    }
    const user = await UserModel.findOne({email: email})
    if(!user){
        return res.status(400).send({
            message: "User not found"
        });
    }
    if(user?.password === password){
        return res.status(200).send({
            message: "Login success",
            id: user?.userId
        });
    }
    return res.status(400).send({
        message:'Wrong Password'
    })
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});
