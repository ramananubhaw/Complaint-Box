import express from "express";
import {getAllComplaints, getComplaint, registerComplaint, deleteComplaint, updateComplaintStatus} from "../controllers/complaintController.js";

const complaintRouter = express.Router();

complaintRouter.route("/details").get(getAllComplaints);
complaintRouter.route("/details/:reg_no").get(getComplaint)
complaintRouter.route("/register").post(registerComplaint);
complaintRouter.route("/delete/:reg_no").delete(deleteComplaint);
complaintRouter.route("/update").put(updateComplaintStatus);

export default complaintRouter;