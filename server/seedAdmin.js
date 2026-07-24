import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./src/models/Admin.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminExists = await Admin.findOne({
      email: "admin@example.com",
    });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
      name: "Administrator",
      email: "admin@example.com",
      password: hashedPassword,
    });

    console.log("Admin Created Successfully");
    process.exit();

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedAdmin();