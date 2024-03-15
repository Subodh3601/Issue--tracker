import app from "./index.js"
import connectDb from "./config/db.js";



app.listen(process.env.PORT, (err) => {
    if (err) {
      console.log(`Error in running the server: ${err}`);
    }
    connectDb;
    console.log(`Server is Running at: ${process.env.PORT}`);
  });