import { body } from "express-validator";
export const mangaValidation = [
    body("title", "Invalid title").isString().isLength({ min: 4, max: 20 }),
    body("originTitle", "Invalid origin title").isString().isLength({ min: 4 }),
    body("description", "Invalid description").isString().isLength({ min: 10 }),
    body("categoriesArray", "Invalid categories").isArray(),
    body("chapters", "Invalid chapters").isNumeric(),
    body("years", "Invalid years").isString(),
    body("status", "Invalid status").isString(),
    body("author", "Invalid author").isString(),
    body("images", "Invalid images").optional().isArray(),
];
//# sourceMappingURL=mangaValidation.js.map