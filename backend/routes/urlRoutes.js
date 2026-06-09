import express from "express";

import {
  shortenUrl,
  redirectUrl,
  getUserUrls,
} from "../controllers/urlController.js";

import protect from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/shorten",
  protect,
  shortenUrl
);

router.get(
  "/my-urls",
  protect,
  getUserUrls
);

router.get(
  "/:shortId",
  redirectUrl
);

export default router;