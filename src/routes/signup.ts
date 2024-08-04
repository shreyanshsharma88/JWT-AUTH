import { Request, Response, Router } from "express";
import { uuid } from "uuidv4";
import { UserModel } from "../models/todo";
import jsonWebToken from "jsonwebtoken";
import { SECRET_KEY } from "../constants";

export const signUpRouter = Router();
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

    await UserModel.create({
      email: body.email,
      password: body.password,
      userId: id,
    });
    const token = jsonWebToken.sign(
      {
        userId: id,
        email: body.email,
      },
      SECRET_KEY as string
    );

    return res.status(200).send({
      message: "User created successfully",
      id,
      token,
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
