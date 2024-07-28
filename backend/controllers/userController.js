import mongoose from "mongoose";

const getUser = (req,res) => {
    res.send("User data retrieved successfully.")
};

const registerUser = (req,res) => {
    res.send("User registered successfully.")
};

const deleteUser = (req,res) => {
    res.send("User deleted successfully.")
};

const updateUser = (req,res) => {
    res.send("User data updated successfully.")
};

export {getUser, registerUser, deleteUser, updateUser};