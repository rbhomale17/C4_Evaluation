const express = require("express");
const app = express();
app.use(express.json());
require('dotenv').config();
const {connection} = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { articleRouter } = require("./routes/article.route");
const { tracker } = require("./middlware/tracker.middlware");
const { limiter } = require("./middlware/rateLimiter.middleware");
app.use(tracker);
app.use(limiter)
app.get("/",(req,res)=>{
    res.send("Welcome, RESTFUL API FOR A BLOG APPLICATION")
});

app.use("/users",userRouter);
app.use("/articles",articleRouter);

app.listen(Number(process.env.port),async ()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
        console.log("Failed to connect DB");
    }
    console.log(`Server is running at port ${Number(process.env.port)} `);
})