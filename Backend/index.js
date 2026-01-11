import express from 'express';
import dotenv from 'dotenv';

import connectToDatabase from './utils/database.js';

dotenv.config();

const app = express();

app.use("/", (req, res) => {
    res.send("Hello from Express Server");
})

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