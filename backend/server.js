import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
import Url from "./models/Url.js";

import {
  redirectUrl,
} from "./controllers/urlController.js";

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin:
      "https://shortify.vercel.app",
  })
);
app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/url",
  urlRoutes
);

app.get("/:shortId", async (req, res) => {
  try {
    const { shortId } =
      req.params;

    const url =
      await Url.findOne({
        shortId,
      });

    if (!url) {
      return res
        .status(404)
        .send(
          "URL Not Found"
        );
    }

    url.clicks += 1;

    await url.save();

    return res.redirect(
      url.originalUrl
    );
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send(
        "Server Error"
      );
  }
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running ${PORT}`
  );
});