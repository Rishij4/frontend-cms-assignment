import Page from "../models/Page.js";
import Section from "../models/Section.js";

export const getPublicPage = async (req, res) => {
  try {
    const page = await Page.findOne({
      slug: req.params.slug,
      isPublished: true,
    });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found",
      });
    }

    const sections = await Section.find({
      page: page._id,
      isVisible: true,
    }).sort({ order: 1 });

    res.json({
      success: true,
      data: {
        ...page.toObject(),
        sections,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};