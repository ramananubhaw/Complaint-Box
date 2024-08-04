import complaints from "../models/complaints.js";
import validateToken from "../middlewares/validateToken.js";

// @method GET
// @route /api/complaints/details
const getAllComplaints = (req,res) => {
    res.send("All complaints retrieved successfully.")
};

// @method GET
// @route /api/complaints/details/:reg_no
const getComplaint = (req,res) => {
    res.send("User complaint retrieved successfully.")
};

// @method POST
// @route /api/complaints/register
const registerComplaint = (req,res) => {
    res.send("Complaint registered successfully.")
};

// @method DELETE
// @route /api/complaints/delete/:reg_no
const deleteComplaint = (req,res) => {
    res.send("Complaint deleted successfully.")
};

// @method PUT
// @route /api/complaints/update/:reg_no
const updateComplaint = (req,res) => {
    res.send("Complaint updated successfully")
};

export {getAllComplaints, getComplaint, registerComplaint, deleteComplaint, updateComplaint};