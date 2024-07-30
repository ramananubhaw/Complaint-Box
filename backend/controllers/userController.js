import users from "../models/users.js";
import hashPassword from "../utils/hashPassword.js";
import verifyPassword from "../utils/verifyPassword.js";

const getUser = async (req,res) => {
    try {
        const reg_no = req.params.reg_no;
        const user = await users.findOne({reg_no: reg_no}).select({"_id":0, "hashedPassword":0, "__v":0});
        if (!user) {
            res.status(404).send("User not found.");
            return;
        }
        res.status(200).json(user);
    }
    catch(error) {
        console.log(error);
        throw error;
    }
};

const registerUser = async (req,res) => {
    try {
        // console.log(req.body);
        let {name, reg_no, email_id, phone_no, block, room_no, password} = req.body;
        const user = await users.findOne({reg_no: reg_no.toUpperCase()})
        if (user) {
            res.status(400).send("User already exists.");
            return;
        }
        const hashedPassword = await hashPassword(password);
        reg_no = reg_no.toUpperCase();
        await users.create({name, reg_no, email_id, phone_no, block, room_no, hashedPassword});
        res.status(201).send("User registered successfully.");
    }
    catch(error) {
        res.send(error);
        throw error;
    }
};

const loginUser = async (req,res) => {
    try {
        const {username, password} = req.body;
        const user = await users.findOne({reg_no: username});
        if (!user) {
            res.status(400).send("Invalid username.");
            return;
        }
        const verified = await verifyPassword(password, user.hashedPassword);
        if (!verified) {
            res.status(400).send("Incorrect password.");
            return;
        }
        res.status(200).send("Logged in successfully.");
    }
    catch(error) {
        console.log(error);
        throw error;
    }
};

const currentUser = (req,res) => {
    res.send("Current user details retrieved successfully.")
};

const deleteUser = async (req,res) => {
    try {
        const reg_no = req.params.reg_no;
        const user = await users.findOne({reg_no: reg_no});
        if (!user) {
            res.status(400).send("Invalid registration number.");
            return;
        }
        await users.deleteOne(user);
        res.status(200).send("User deleted successfully.");
    }
    catch(error) {
        console.log(error);
        throw error;
    }
};

const updateUser = async (req,res) => {
    try {
        const reg_no = req.params.reg_no;
        const user = await users.findOne({reg_no: reg_no});
        if (!user) {
            res.status(404).send("User not found.");
            return;
        }
        const updatedUser = await users.findOneAndUpdate({reg_no: reg_no}, req.body, {new: true});
        res.status(200).json({message: "User data updated successfully.", user: updatedUser});
    }
    catch(error) {
        console.log(error);
        throw error;
    }
};

export {getUser, registerUser, loginUser, currentUser, deleteUser, updateUser};