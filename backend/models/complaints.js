import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    block: {
        type: String,
        maxlength: 2,
        required: true
    },
    room_no: {
        type: Number,
        required: true
    },
    complaint: {
        type: String,
        maxlength: 100,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "solved"],
        default: "pending",
        required: true
    }
}, {timestamps: true});

const complaints = mongoose.model("complaints", complaintSchema);

export default complaints;