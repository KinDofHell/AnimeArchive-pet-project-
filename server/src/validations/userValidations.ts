import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid email").isEmail(),
  body("password", "Password must be more than 5 characters").isLength({
    min: 5,
  }),
  body("fullName", "Enter the fullname").isLength({ min: 5 }),
  body("role", "Enter the role").optional().isLength({ min: 5 }),
  body("avatarUrl", "Incorrect avatar link").optional().isURL(),
];

export const loginValidation = [
  body("email", "Invalid email").isEmail(),
  body("password", "Password must be more than 5 characters").isLength({
    min: 5,
  }),
];
