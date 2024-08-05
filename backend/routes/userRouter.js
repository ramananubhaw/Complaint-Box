import express from "express";
import {getUser, registerUser, loginUser, currentUser, deleteUser, updateUser} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/details/:reg_no").get(getUser)
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/current").get(currentUser);
userRouter.route("/delete/:reg_no").delete(deleteUser);
userRouter.route("/update").put(updateUser);

export default userRouter;