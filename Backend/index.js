import express from 'express';

const app = express();

app.use("/", (req, res) => {
    res.send("Hello from Express Server");
})

app.listen(3000, () => {
    console.log('URL : https://localhost:3000');
})