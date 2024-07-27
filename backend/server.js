import express from "express";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import {fileURLToPath} from "url";
import {dirname} from "path";

// configuring path to environment variables
const __filename = fileURLToPath(import.meta.url); // points to current file
const __dirname = dirname(__filename); // points to the current directory
dotenv.config({path: __dirname})

const app = express();

const port = process.env.PORT || 3000;

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}.`)
    })
});

app.get("/", (req,res) => {
    res.send("Server running here.")
});

app.get("/list", (req,res) => {
    res.send("This is the page of list route.")
});