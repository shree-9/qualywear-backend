import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
await connectDB();
await new Promise(res => setTimeout(res, 3000)); // wait 3s before queries


const importData = async () => {
  try {
    const data = JSON.parse(fs.readFileSync("./fashionStoreDataset.json", "utf-8"));

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    await User.insertMany(data.users);
    await Product.insertMany(data.products);
    console.log("✅ Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error importing data:", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("🗑️ Data Destroyed Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error destroying data:", error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
