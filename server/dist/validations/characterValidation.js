import { body } from "express-validator";
export const characterValidation = [
    body("fullName", "Invalid fullname").isString().isLength({ min: 6, max: 30 }),
    body("age", "Invalid age").optional().isString().isLength({ max: 5 }),
    body("sex", "Invalid sex")
        .optional()
        .isString()
        .isLength({ min: 4, max: 10 }),
    body("race", "Invalid race").isString().isLength({ min: 3, max: 15 }),
    body("status", "Invalid status").isString().isLength({ min: 4, max: 12 }),
    body("partnersArray", "Invalid partners").optional().isArray(),
    body("appearance", "Invalid appearance").isString(),
    body("personality", "Invalid personality").isString(),
    body("images", "Invalid images").optional().isArray(),
];
//# sourceMappingURL=characterValidation.js.map