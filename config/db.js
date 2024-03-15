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

// // Acquire the connection (to check if it's successful)
// const db = mongoose.connection;

// // Error handling
// db.on("error", (err) => {
//   console.log(err.message);
// });

// // Once connected, print the success message
// db.once("open", () => {
//   console.log("Successfully connected to the database");
// });

export default connectDb;
