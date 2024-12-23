import mongoose from "mongoose";

const LichSuDB = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
     },
    bienSoTimKiem: { 
        type: String,
        required: true
     },
    tainanTimKiem: {
        type: String 
    },
    searchedAt: {
        type: Date,
        default: Date.now
     },
});

const LichSuTimKiem = mongoose.model("LichSuTimKiem",LichSuDB);
export default LichSuTimKiem
