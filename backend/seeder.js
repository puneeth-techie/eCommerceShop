import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./startup/db.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import products from "./data/products.js";
import users from "./data/users.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const userArr = await User.insertMany(users);
    const adminUser = userArr[0]._id;
    const sampleProduct = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProduct);
    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("Data Destroyed...");
    process.exit();
  } catch (err) {
    console.error(err.message);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
