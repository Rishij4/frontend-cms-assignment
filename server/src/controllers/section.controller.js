import Section from "../models/Section.js";

// Create Section
export const createSection = async (req, res) => {
  try {
    const section = await Section.create(req.body);

    res.status(201).json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Sections
export const getSections = async (req, res) => {
  try {
    const sections = await Section.find()
      .populate("page", "title slug")
      .sort({ order: 1 });

    res.status(200).json({
      success: true,
      data: sections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Section By ID
export const getSectionById = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id)
      .populate("page", "title slug");

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    res.status(200).json({
      success: true,
      data: section,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Section
export const updateSection = async (req, res) => {
  try {
    const section = await Section.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("page", "title slug");

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    res.status(200).json({
      success: true,
      data: section,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Section
export const deleteSection = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    await section.deleteOne();

    res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};