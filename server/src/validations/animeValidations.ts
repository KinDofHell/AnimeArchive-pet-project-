import { body } from "express-validator";

export const animeValidation = [
  body("title", "Invalid title").isString().isLength({ min: 4 }),
  body("originTitle", "Invalid origin title").isString().isLength({ min: 4 }),
  body("description", "Invalid description").isString().isLength({ min: 10 }),
  body("categoriesArray", "Invalid categories").isArray(),
  body("seasons", "Invalid seasons").isNumeric(),
  body("series", "Invalid series").isNumeric(),
  body("years", "Invalid years").isString(),
  body("status", "Invalid status").isString(),
  body("author", "Invalid author").isString(),
  body("imgCover", "Invalid imgCover").optional().isString(),
  body("imgAdditional_1", "Invalid imgAdditional_1").optional().isString(),
  body("imgAdditional_2", "Invalid imgAdditional_2").optional().isString(),
  body("imgAdditional_3", "Invalid imgAdditional_3").optional().isString(),
];
