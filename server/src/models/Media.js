import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    filename: String,

    url: String,

    size: Number,

    mimetype: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Media", mediaSchema);