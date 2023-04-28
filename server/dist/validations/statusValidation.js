import { body } from "express-validator";
export const statusValidation = [
    body("title", "Invalid title").isString().isLength({ min: 3 }),
    body("description", "Invalid description").isString().isLength({ min: 5 }),
];
//# sourceMappingURL=statusValidation.js.map