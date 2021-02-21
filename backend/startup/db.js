import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`Connected to the DB: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Failed to connect: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
