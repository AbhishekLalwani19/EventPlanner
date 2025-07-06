import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import mongoose from 'mongoose';    
import connectDB from './src/config/db.js';
import AuthRouter from './src/routes/authRouter.js';
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", AuthRouter);

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
