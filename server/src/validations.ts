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
