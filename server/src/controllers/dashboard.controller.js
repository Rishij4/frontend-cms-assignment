import Page from "../models/Page.js";
import Section from "../models/Section.js";

export const getDashboardStats = async (req, res) => {
  const totalPages = await Page.countDocuments();

  const publishedPages = await Page.countDocuments({
    isPublished: true,
  });

  const totalSections = await Section.countDocuments();

  res.json({
    success: true,
    data: {
      totalPages,
      publishedPages,
      totalSections,
    },
  });
};