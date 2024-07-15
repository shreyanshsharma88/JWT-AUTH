"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const signUpRouter = (0, express_1.Router)();
const userDataValidateSchema = [
    (0, express_validator_1.body)("email")
        .exists({ checkFalsy: true })
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),
    (0, express_validator_1.body)("password")
        .exists({ checkFalsy: true })
        .withMessage("Password is required"),
];
signUpRouter.post("/", (req, res) => {
    try {
        const body = req.body;
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({ errors: errors.array() });
        // }
        // TodoSchema.add({
        //   email: body.email,
        //   password: body.password,
        // });
        // console.log({
        //   db: TodoSchema,
        // });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = signUpRouter;
