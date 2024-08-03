// Improve this code, not linked to userController right now.

import jwt from "jsonwebtoken";

const validateToken = (req) => {
    if (!req.cookies || !req.cookies.access_token) {
        throw new Error("Authorization cookie expired.");
    }
    if (req.cookies) {
        const token = req.cookies["access_token"];
        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (error, decoded) => {
            if (error) {
                console.log("Authorization failed");
                return false;
            }
            console.log(decoded);
            return true;
        });
    }
    return false;
};

/*
const validateToken = (req, res) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startswith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, {complete: true}, (error, decoded) => {
            if (error) {
                res.status(401).json({message: "User not authorized."});
                return;
            }
            console.log(decoded);
            return decoded;
        })
    }
    console.log("Authorization failed.");
    return;
};
*/

export default validateToken;