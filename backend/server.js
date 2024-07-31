import express from "express";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import {fileURLToPath} from "url";
import {dirname, resolve} from "path";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import complaintRouter from "./routes/complaintRouter.js";

// configuring path to environment variables
const __filename = fileURLToPath(import.meta.url); // points to current file
const __dirname = dirname(__filename); // points to the current directory
dotenv.config({path: resolve(__dirname,"../.env")})

const app = express();
app.use(express.json());
app.use(cookieParser())

// Routers
app.use("/api/users", userRouter)
app.use("/api/complaints", complaintRouter)

const port = process.env.PORT || 3000;

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}.`)
    })
})
.catch(error => {
    console.log(error)
});

app.get("/", (req,res) => {
    // res.cookie("testcookie", "1", {expires: new Date(Date.now() + 60000)});
    res.cookie("testcookie", "1", {maxAge: 60000});
    res.send("Server running here.")
});

// app.get("/list", (req,res) => {
//     res.send("This is the page of list route.")
// });