import jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {
    // console.log(req.path);
    if (!req.cookies || !req.cookies.access_token) {
        if (req.path == "/logout") {
            res.status(401).json({message: "Logged out already."});
        }
        else {
            res.status(401).json({message: "Token expired."});
        }
        return;
    }
    const token = req.cookies.access_token;
    // console.log(token);
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (error, decoded) => {
        if (error){
            res.status(401).json({message: "Authorization failed."});
            return;
        }
        if (req.path == "/logout") {
            next();
        }
        else {
            next(decoded);
        }
    });
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
