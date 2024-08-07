import express from "express";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import {fileURLToPath} from "url"; // dirname
import {dirname, resolve} from "path"; // dirname
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import complaintRouter from "./routes/complaintRouter.js";

// configuring path to environment variables
const __filename = fileURLToPath(import.meta.url); // points to current file
const __dirname = dirname(__filename); // points to the current directory
dotenv.config({path: resolve(__dirname,"../.env")})

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(session({
//     saveUninitialized: false,
//     resave: false,
//     secret: process.env.SECRET,
//     cookie: {
//         maxAge: 30000 
//     }
// }))

// Setting up the routers
app.use("/api/users", userRouter)
app.use("/api/complaints", complaintRouter)

const port = process.env.PORT || 3000;

app.get("/", (req,res) => {
    res.send("Server running here.")
});

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}.`)
    })
})
.catch(error => {
    console.log(error)
});