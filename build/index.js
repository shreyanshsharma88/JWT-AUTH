"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoSchema = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
// import signUpRouter  from "./routes/signUp.ts";
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 200,
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
const PORT = 8080;
mongoose_1.default
    .connect("mongodb://localhost:27017/TODOS")
    .then(() => {
    console.log("Connected to Database");
})
    .catch((err) => {
    console.log("Error", err);
});
mongoose_1.default.connection.on("error", () => {
    console.log("Error");
});
exports.TodoSchema = new mongoose_1.default.Schema({ name: String });
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello World");
});
// app.use("/signup", signUpRouter);
app.listen(PORT, () => console.log("server runnin"));
exports.default = app;
