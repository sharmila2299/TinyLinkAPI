import {
  createLink,
  getLinks,
  getLinkStats,
  deleteLink,
  redirectLink,
} from "../controllers/links.controller.js";

import { createLinkValidator } from "../validators/links.validator.js";
import { Router } from "express";

const router = Router();

router.route("/create").post(createLinkValidator, createLink);
router.route("/all").get(getLinks);
router.route("/stats/:code").get(getLinkStats);
router.route("/delete/:code").delete(deleteLink);
router.route("/:code").get(redirectLink);

export default router;
