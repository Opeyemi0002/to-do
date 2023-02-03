import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbconnect.js";
import router from "./routes/userroutes.js";

dotenv.config();
dbConnect();

const app = express();
const PORT = process.env.Port || 3000;

app.use(express.json());
app.use ('/users', router);
app.listen(PORT, ()=> console.log(`server runnning at ${PORT}`));