import { body } from "express-validator";

export const roleValidation = [
  body("name", "Invalid name").isString().isLength({ min: 3 }),
  body("description", "Invalid description").isString().isLength({ min: 10 }),
];
