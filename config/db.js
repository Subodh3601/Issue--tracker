import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


// Connect to the database
const connectDb = mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


export default connectDb;
