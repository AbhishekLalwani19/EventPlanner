import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import mongoose from 'mongoose';    
import connectDB from './src/config/db.js';
import AuthRouter from './src/routes/authRouter.js';
import UserRouter from './src/routes/userRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())
app.use(morgan("dev"));
app.use("/api/auth", AuthRouter);
app.use("/api/user",UserRouter)

app.get("/", (req, res) => {
    res.json({message:"Hello World!"});
    });
// let port;
//     if(process.env.PORT){
//         port = process.env.PORT;
//     }else
//     {
//         port = 5000;
//     }
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({message, statusCode});
});
    const port = process.env.PORT || 5000; 

    connectDB()
app.listen(port, () => {
    console.log("Server is running on port ", port);
});
