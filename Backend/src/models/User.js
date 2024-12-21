import mongoose from "mongoose";
const userDB = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        minlength:6,
        maxlength:20,
        unique:true
    },
    email:{
        type: String,
        required:true,
        minlength:6,
        maxlength:30,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    admin:{
        type:Boolean,
        default:false,
    }
},{timestamps:true}
)
const User = mongoose.model('User',userDB)
export default User