import { validationResult } from "express-validator";

export default (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors.array());
  next();
};
