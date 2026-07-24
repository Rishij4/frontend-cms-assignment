import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    page: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "hero",
        "richtext",
        "gallery",
        "faq",
        "table",
        "list",
        "cards",
        "contact",
        "features",
        "custom"
      ],
      default: "richtext",
    },

    content: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    order: {
      type: Number,
      default: 1,
    },

    isVisible: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Section", sectionSchema);