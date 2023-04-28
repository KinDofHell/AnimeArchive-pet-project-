import { body } from "express-validator";
export const categoryValidation = [
    body("title", "Invalid title").isString().isLength({ min: 3 }),
    body("description", "Invalid description").isString().isLength({ min: 10 }),
];
//# sourceMappingURL=categoryValidation.js.map