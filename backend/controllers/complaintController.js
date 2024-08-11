import complaints from "../models/complaints.js";
import users from "../models/users.js";
import validateToken from "../middlewares/validateToken.js";

// @method GET
// @route /api/complaints/details
const getAllComplaints = (req,res) => {
    res.send("All complaints retrieved successfully.")
};

// @method GET
// @route /api/complaints/details
// @access PUBLIC (user)
// @request body {complaint_id}
const getComplaint = (req,res) => {
    validateToken(req, res, async (decoded) => {
        try {
            const user_id = decoded.user.id;
            const complaint_id = req.body.complaint_id;
            const complaint = await complaints.findOne({user_id: user_id, _id: complaint_id}).select({user_id:0, __v:0});
            if (!complaint) {
                res.status(400).json({message: "Complaint not found."});
                return;
            }
            res.status(200).json({message: "Complaint retrieved successfully.", complaint: complaint});
        }
        catch(error) {
            console.log(error);
            res.status(500).json({message: "Internal server error."});
        }
    })
};

// @method POST
// @route /api/complaints/register
// @access PUBLIC (user)
// @request body {category, complaint}
const registerComplaint = (req,res) => {
    validateToken(req,res, async (decoded) => {
        try {
            const user_id = decoded.user.id;
            const reg_no = decoded.user.username;
            const user = await users.findOne({_id: user_id}).select({block:1, room_no:1});
            // console.log(user);
            const {category, complaint} = req.body;
            const check = await complaints.findOne({user_id: user_id, reg_no: reg_no, category: category, complaint: complaint, status: "pending"});
            if (!check) {
                const block = user.block;
                const room_no = user.room_no;
                await complaints.create({user_id, reg_no, block, room_no, category, complaint});
                res.status(201).json({message: "Complaint registered successfully."});
                return;
            }
            res.status(400).json({message: "Complaint already registered."});
        }
        catch(error) {
            console.log(error);
            res.status(500).json({message: "Internal server error."});
        }
    });
};

// @method DELETE
// @route /api/complaints/delete/:reg_no
// @access PRIVATE (admin)
const deleteComplaint = (req,res) => {
    res.send("Complaint deleted successfully.")
};

// @method PUT
// @route /api/complaints/update
// @access PUBLIC (user)
// @request body {complaint_id}
const updateComplaintStatus = (req,res) => {
    try {
        validateToken(req, res, async (decoded) => {
            const user_id = decoded.user.id;
            const complaint_id = req.body.complaint_id;
            const complaint = await complaints.findOne({user_id: user_id, _id: complaint_id});
            if (!complaint) {
                res.status(400).json({message: "Complaint not found."});
                return;
            }
            if (complaint.status=="solved") {
                res.status(400).json({message: "Complaint already solved."});
                return;
            }
            const updatedComplaint = await complaints.findOneAndUpdate({user_id: user_id, _id: complaint_id}, {status: "solved"}, {new: true}).select({user_id:0, "__v":0});
            res.status(200).json({message: "Complaint updated successfully.", complaint: updatedComplaint})
        })
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error."});
    }
};

export {getAllComplaints, getComplaint, registerComplaint, deleteComplaint, updateComplaintStatus};