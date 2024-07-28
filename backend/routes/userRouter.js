import express from "express";
import {getUser, registerUser, deleteUser, updateUser} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/details/:reg_no").get(getUser)
userRouter.route("/register").post(registerUser);
userRouter.route("/delete/:reg_no").delete(deleteUser);
userRouter.route("/update/:reg_no").put(updateUser);

export default userRouter;