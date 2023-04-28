import { body } from "express-validator";
export const creatorValidation = [
    body("fullname", "Invalid fullname").isString().isLength({ min: 6 }),
    body("description", "Invalid description").isString().isLength({ min: 10 }),
    body("imgUrl", "Incorrect image link").optional().isString(),
];
//# sourceMappingURL=creatorValidation.js.map