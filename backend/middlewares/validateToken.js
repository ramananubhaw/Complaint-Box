import jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {
    if (!req.cookies || !req.cookies.access_token) {
        res.status(401).json({message: "Token expired."});
        return;
    }
    const token = req.cookies.access_token;
    // console.log(token);
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (error, decoded) => {
        if (error){
            res.status(401).json({message: "Authorization failed."});
            return;
        }
        next(decoded);
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
