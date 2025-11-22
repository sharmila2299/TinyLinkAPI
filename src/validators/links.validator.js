import { body } from "express-validator";

export const createLinkValidator = [
  body("url")
    .notEmpty()
    .withMessage("URL is required")
    .matches(/^https?:\/\/.*/)
    .withMessage("URL must start with http:// or https://"),
];
