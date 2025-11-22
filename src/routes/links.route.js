import {
  createLink,
  getLinks,
  getLinkStats,
  deleteLink,
} from "../controllers/links.controller.js";

import { createLinkValidator } from "../validators/links.validator.js";
import { Router } from "express";

const router = Router();

router.post("/", createLinkValidator, createLink);
router.get("/", getLinks);
router.get("/:code", getLinkStats);
router.delete("/:code", deleteLink);

export default router;
