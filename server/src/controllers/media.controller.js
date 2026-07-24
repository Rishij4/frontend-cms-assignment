import fs from "fs";
import path from "path";
import Media from "../models/Media.js";

// Upload Image
export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const media = await Media.create({
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });

    res.status(201).json({
      success: true,
      data: media,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Images
export const getMedia = async (req, res) => {
  try {
    const media = await Media.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: media,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Image
export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    const filePath = path.join(
      process.cwd(),
      "uploads",
      media.filename
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await media.deleteOne();

    res.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};