import Page from "../models/Page.js";

export const createPage = async (req, res) => {
  try {
    const page = await Page.create(req.body);

    res.status(201).json({
      success: true,
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPages = async (req, res) => {
  const pages = await Page.find().sort({ createdAt: -1 });


  res.json({
    success: true,
    data: pages,
  });
};

export const getPageBySlug = async (req, res) => {
  const page = await Page.findOne({
    slug: req.params.slug,
  });

  if (!page) {
    return res.status(404).json({
      success: false,
      message: "Page not found",
    });
  }

  res.json({
    success: true,
    data: page,
  });
};

export const updatePage = async (req, res) => {
  const page = await Page.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({
    success: true,
    data: page,
  });
};

export const deletePage = async (req, res) => {
  await Page.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Page deleted"
  });
};
export const getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found",
      });
    }

    res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};