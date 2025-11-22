import { body } from "express-validator";

export const createLinkValidator = [
  body("url")
    .notEmpty()
    .withMessage("URL is required")
    .matches(/^https?:\/\/.*/)
    .withMessage("URL must start with http:// or https://"),

  body("code")
    .optional()
    .isLength({ min: 6, max: 10 })
    .withMessage("Code must be between 6–10 characters")
    .isAlphanumeric()
    .withMessage("Code must contain only letters and numbers"),
];
