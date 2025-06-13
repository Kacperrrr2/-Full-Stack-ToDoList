import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoutes from "./routes/todo.routes.js"
dotenv.config();
const PORT=5000
const app= express();
const MONGO_URL= process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
.then(()=>console.log("MongoDB connected suceessfully"))
.catch((err)=>console.log("MMongoDB connected failed",err));

app.use(express.json());

app.use("/api/todo",todoRoutes)

app.listen(PORT, (req,res)=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});