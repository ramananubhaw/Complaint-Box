import users from "../models/users.js";
import hashPassword from "../middlewares/hashPassword.js";
import verifyPassword from "../middlewares/verifyPassword.js";
import jwt from "jsonwebtoken";
import validateToken from "../middlewares/validateToken.js";

// @method GET
// @route /api/users/details/:reg_no
// @access PRIVATE (admin)
const getUser = async (req,res) => {
    try {
        console.log(req.cookies);
        const reg_no = req.params.reg_no;
        const user = await users.findOne({reg_no: reg_no}).select({"_id":0, "hashedPassword":0, "__v":0});
        if (!user) {
            res.status(404).json({message: "User not found."});
            return;
        }
        res.status(200).json(user);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error."});
        throw error;
    }
};

// @method POST
// @route /api/users/register
// @access PUBLIC (user)
const registerUser = async (req,res) => {
    try {
        let {name, reg_no, email_id, phone_no, block, room_no, password} = req.body;
        const user = await users.findOne({reg_no: reg_no.toUpperCase()})
        if (user) {
            res.status(400).json({message: "User already exists."});
            return;
        }
        const hashedPassword = await hashPassword(password);
        reg_no = reg_no.toUpperCase();
        await users.create({name, reg_no, email_id, phone_no, block, room_no, hashedPassword});
        res.status(201).json({message: "User registered successfully."});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error."});
        throw error;
    }
};

// @method POST
// @route /api/users/login
// @access PUBLIC (user)
const loginUser = async (req,res) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) {
            res.status(400).json({message: "All fields are mandatory"});
            return;
        }
        const user = await users.findOne({reg_no: username});
        if (!user) {
            res.status(400).json({message: "Invalid username."});
            return;
        }
        const verified = await verifyPassword(password, user.hashedPassword);
        if (!verified) {
            res.status(400).json({message: "Incorrect password."});
            return;
        }
        const accessToken = jwt.sign({
            user: {
                username: user.reg_no,
                email_id: user.email_id,
                id: user._id
            }
        }, process.env.SECRET_ACCESS_TOKEN, {
            expiresIn: "1m" // increase expiration time for JWT token in production
        });
        res.cookie("access_token", accessToken, {
            // httpOnly: true,
            // secure: true,
            sameSite: "strict",
            maxAge: 55000 // increase expiration time of cookie in production
        }); // enable the httpOnly and secure flags in production
        res.status(200).json({message: "Logged in successfully."});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error."});
    }
};

// @method GET
// @route /api/users/current
// @access PUBLIC (user)
const currentUser = (req,res) => {
    try {
        validateToken(req, res, async (decoded) => {
            const username = decoded.user.username;
            const user = await users.findOne({reg_no: username}).select({"_id":0, "hashedPassword":0, "__v":0})
            res.status(200).json({
                message: "Current User details.",
                user: user
            });
        })
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
    // console.log(req.cookies);
    // if (!req.cookies || !req.cookies.access_token) {
    //     res.status(401).json({message: "Cookie expired."});
    //     return;
    // }
    // const token = req.cookies.access_token;
    // jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, async (error, decoded) => {
    //     if (error) {
    //         res.status(401).json({message: "Authorization failed."});
    //         return;
    //     }
    //     const username = decoded.user.username;
    //     const user = await users.findOne({reg_no: username}).select({"_id":0, "hashedPassword":0, "__v":0})
    //     res.status(200).json({
    //         message: "User Authorized.",
    //         user: user
    //     });
    // });
};


// @method DELETE
// @route /api/users/delete/:reg_no
// @access PRIVATE (admin)
const deleteUser = async (req,res) => {
    try {
        const reg_no = req.params.reg_no;
        const user = await users.findOne({reg_no: reg_no});
        if (!user) {
            res.status(400).json({message: "Invalid registration number."});
            return;
        }
        await users.deleteOne(user);
        res.status(200).json({message: "User deleted successfully."});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error."});
    }
};

// @method PUT
// @route /api/users/update
// @access PUBLIC (user)
const updateUser = (req,res) => {
    try {
        validateToken(req, res, async (decoded) => {
            if (req.body.password || req.body.reg_no) {
                res.status(400).json({message: "Registration Number and Password cannot be updated here."});
                return;
            }
            const reg_no = decoded.user.username;
            const keys = Object.keys(req.body);
            let projection = {};
            keys.forEach((key) => {
                projection[key] = 1
            });
            projection["_id"] = 0; // user cannot update user id.
            const user = await users.findOne({reg_no: reg_no}).select(projection);
            if (!user) {
                res.status(404).json({message: "User not found."});
                return;
            }
            let same = true;
            for (const key of keys) {
                if (user[key] === req.body[key]) {
                    // console.log("Same - " + key + ": " + user[key] + ", " + req.body[key]);
                    continue;
                }
                same = false;
                // console.log("Different" + key + ": " + user[key] + ", " + req.body[key]);
                break;
            }
            if (same) {
                res.status(400).json({message: "Already up-to-date."});
                return;
            }
            const updatedUser = await users.findOneAndUpdate({reg_no: reg_no}, req.body, {new: true}).select({"_id":0, "hashedPassword":0, "__v":0});
            res.status(200).json({message: "User data updated successfully.", user: updatedUser});
        })
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error."});
    }
};

export {getUser, registerUser, loginUser, currentUser, deleteUser, updateUser};