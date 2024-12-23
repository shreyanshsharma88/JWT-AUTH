import express, { Router } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { signUpRouter } from "./routes/signup.ts";
import { loginRouter } from "./routes/login.ts";
import { updateTodoRouter } from "./routes/updateTodo.ts";
import { getTodoRouter } from "./routes/getTodos.ts";
import { deleteTodoRouter } from "./routes/deleteTodo.ts";
import { addTodoRouter } from "./routes/addTodo.ts";
import { authChecker } from "./routes/verifyUser.ts";

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

mongoose
  .connect("mongodb://localhost:27017/TODOS")
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Error", err);
  });
mongoose.connection.on("error", () => {
  console.log("Error");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/signup", signUpRouter);
app.use("/login", loginRouter);

const routersWithAuthChecker = Router();
routersWithAuthChecker.use(authChecker);
routersWithAuthChecker.use("/todos/", updateTodoRouter);
routersWithAuthChecker.use("/todos/", deleteTodoRouter);
routersWithAuthChecker.use("/todos", getTodoRouter);
routersWithAuthChecker.use("/todos", addTodoRouter);
app.use("/api", routersWithAuthChecker);

app.listen(PORT, () => console.log("server runnin"));

export default app;
