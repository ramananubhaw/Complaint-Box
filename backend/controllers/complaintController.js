import mongoose from "mongoose";

const getAllComplaints = (req,res) => {
    res.send("All complaints retrieved successfully.")
};

const getComplaint = (req,res) => {
    res.send("User complaint retrieved successfully.")
};

const registerComplaint = (req,res) => {
    res.send("Complaint registered successfully.")
};

const deleteComplaint = (req,res) => {
    res.send("Complaint deleted successfully.")
};

const updateComplaint = (req,res) => {
    res.send("Complaint updated successfully")
};

export {getAllComplaints, getComplaint, registerComplaint, deleteComplaint, updateComplaint};