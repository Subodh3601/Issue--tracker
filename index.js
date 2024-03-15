import dotenv from "dotenv";
import path from "path"
const envPath = path.resolve('config','key.env')
dotenv.config({path:envPath});
import express from "express";
// import expressLayouts from "express-ejs-layouts";
import router from "./src/routes/index.js";

const app = express();
// app.set("layout extractStyles", true);
// app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(),'src','views'));
app.use(express.static("public"));
// app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));


app.use("/", router);

export default app;



