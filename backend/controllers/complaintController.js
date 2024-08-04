import complaints from "../models/complaints.js";
import users from "../models/users.js";
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
// @access PUBLIC (user)
const registerComplaint = (req,res) => {
    try {
        validateToken(req,res, async (decoded) => {
            const user_id = decoded.user.id;
            const user = await users.findOne({_id: user_id}).select({block:1, room_no:1});
            console.log(user);
            const {category, complaint} = req.body;
            const check = await complaints.findOne({user_id: user_id, category: category, complaint: complaint, status: "pending"});
            if (!check) {
                const block = user.block;
                const room_no = user.room_no;
                await complaints.create({user_id, block, room_no, category, complaint});
                res.status(201).json({message: "Complaint registered successfully."});
                return;
            }
            res.status(400).json({message: "complaint already registered."});
        });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error."});
    }
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