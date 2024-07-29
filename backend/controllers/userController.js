import users from "../models/users.js";
import hashPassword from "../utils/hashPassword.js";

const getUser = (req,res) => {
    res.send("User data retrieved successfully.")
};

const registerUser = async (req,res) => {
    try {
        console.log(req.body);
        const {name, reg_no, email_id, phone_no, block, room_no, password} = req.body;
        const hashedPassword = await hashPassword(password);
        await users.create({name, reg_no, email_id, phone_no, block, room_no, hashedPassword});
        res.send("User registered successfully.");
    }
    catch(error) {
        res.send(error); 
    }
};

const loginUser = (req,res) => {
    res.send("Logged in successfully.")
};

const currentUser = (req,res) => {
    res.send("Current user details retrieved successfully.")
};

const deleteUser = (req,res) => {
    res.send("User deleted successfully.")
};

const updateUser = (req,res) => {
    res.send("User data updated successfully.")
};

export {getUser, registerUser, loginUser, currentUser, deleteUser, updateUser};