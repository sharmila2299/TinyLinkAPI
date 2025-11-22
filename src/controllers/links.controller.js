import asyncHandler from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import parseValidations from "../utils/parseValidations.js";
import { handleError, handleSuccess } from "../utils/responseHandler.js";
import {
  insertLink,
  getAllLinks,
  getLinkByCode,
  deleteLinkByCode,
  updateClickStats,
} from "../models/links.model.js";

// ================= CREATE LINK =================
const createLink = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      "Validation Failed",
      400,
      parseValidations(errors.array())
    );
  }

  const { url, code } = req.body;

  const shortCode = code || Math.random().toString(36).substring(2, 8);
  const exists = await getLinkByCode(shortCode);
  if (exists.rows.length > 0) {
    return handleError(res, "This short code already exists", 409);
  }
  const result = await insertLink(shortCode, url);
  return handleSuccess(res, "Link created successfully", 201, result.rows[0]);
});

// ================= GET ALL LINKS =================
const getLinks = asyncHandler(async (req, res) => {
  const result = await getAllLinks();
  return handleSuccess(res, "Links fetched successfully", 200, result.rows);
});

// ================= GET LINK STATS =================
const getLinkStats = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const result = await getLinkByCode(code);
  if (result.rows.length === 0) {
    return handleError(res, "Link not found", 404);
  }
  return handleSuccess(res, "Stats fetched successfully", 200, result.rows[0]);
});

// ================= DELETE LINK =================
const deleteLink = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const result = await deleteLinkByCode(code);
  if (result.rows.length === 0) {
    return handleError(res, "Link not found", 404);
  }
  return handleSuccess(res, "Link deleted successfully", 200, result.rows[0]);
});

// ================= HANDLE REDIRECT =================
const redirectLink = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const result = await updateClickStats(code);
  if (result.rows.length === 0) {
    return handleError(res, "Link not found", 404);
  }
  return res.redirect(result.rows[0].target_url);
});

export { createLink, getLinks, getLinkStats, deleteLink, redirectLink };
