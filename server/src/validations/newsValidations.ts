import { body } from "express-validator";

export const newsValidation = [
  body("title", "Invalid title").isString().isLength({ min: 4, max: 20 }),
  body("description", "Invalid description").isString().isLength({ min: 10 }),
  body("linkedAnime", "Invalid list of anime").optional().isArray(),
  body("linkedManga", "Invalid list of manga").optional().isArray(),
  body("linkedCharacters", "Invalid list of characters").optional().isArray(),
  body("linkedOuterThing", "Invalid link").optional().isString(),
  body("isImportant", "Invalid important status").isBoolean(),
  body("images", "Invalid images").optional().isArray(),
];
