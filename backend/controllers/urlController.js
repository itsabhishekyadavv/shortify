import shortid from "shortid";
import Url from "../models/Url.js";

export const shortenUrl =
  async (req, res) => {
    try {
      const { originalUrl } =
        req.body;

      const shortId =
        shortid.generate();

      const shortUrl = `https://shortify-backend-4wrf.onrender.com/${shortId}`;

      const url =
        await Url.create({
          originalUrl,
          shortId,
          shortUrl,
          user: req.user,
        });

      res.status(201).json({
        success: true,
        url,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const redirectUrl =
  async (req, res) => {
    try {
      const { shortId } =
        req.params;

      const url =
        await Url.findOne({
          shortId,
        });

      if (!url) {
        return res.status(404).json({
          message:
            "URL not found",
        });
      }

      url.clicks += 1;

      await url.save();

      res.redirect(
        url.originalUrl
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const getUserUrls =
  async (req, res) => {
    try {
      const urls =
        await Url.find({
          user: req.user,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        urls,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };