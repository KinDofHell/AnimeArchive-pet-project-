import { body } from "express-validator";
export const categoryValidation = [
    body("title", "Invalid title").isString().isLength({ min: 3 }),
    body("description", "Invalid description").isString().isLength({ min: 10 }),
];
export const creatorValidation = [
    body("fullname", "Invalid fullname").isString().isLength({ min: 6 }),
    body("description", "Invalid description").isString().isLength({ min: 10 }),
    body("imgUrl", "Incorrect image link").optional().isString(),
];
export const animeValidation = [
    body("title", "Invalid title").isString().isLength({ min: 4 }),
    body("description", "Invalid description").isString().isLength({ min: 10 }),
    body("categories", "Invalid categories").isArray(),
    body("seasons", "Invalid seasons").isNumeric(),
    body("series", "Invalid series").isNumeric(),
    body("years", "Invalid years").isString(),
    body("status", "Invalid status").isString(),
    body("imgCover", "Invalid imgCover").optional().isString(),
    body("imgAdditional_1", "Invalid imgAdditional_1").optional().isString(),
    body("imgAdditional_2", "Invalid imgAdditional_2").optional().isString(),
    body("imgAdditional_3", "Invalid imgAdditional_3").optional().isString(),
];
export const userValidation = [
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
//# sourceMappingURL=validations.js.map