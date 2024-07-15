import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { UserModel } from "../models/todo";
import { uuid } from "uuidv4";

export const signUpRouter = Router();
// TODO: ADD THIS MOFO
// const userDataValidateSchema = [
//   body("email")
//     .exists({ checkFalsy: true })
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("Email is invalid"),
//   body("password")
//     .exists({ checkFalsy: true })
//     .withMessage("Password is required"),
// ];

signUpRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body as ILoginPayload;
    const userExists = await UserModel.findOne({ email: body.email });

    if (!!userExists) {
      return res.status(400).send({
        message: "User already exists",
      });
    }
    const id = uuid();

    await UserModel.create({ email: body.email, password: body.password, userId: id });

    return res.status(200).send({
      message: "User created successfully",
      id
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Something went wrong",
    });
  }
});

interface ILoginPayload {
  email: string;
  password: string;
}
