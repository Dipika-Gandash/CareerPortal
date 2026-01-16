import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectToDatabase from './utils/database.js';
import userRouter from './routes/userRoute.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());


app.use("/api/user", userRouter);

const startServer = async () => {
    try {
        await connectToDatabase();
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        })

    } catch (error){
        console.log(error.message);
    }
}

startServer();