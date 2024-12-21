import User from "../models/User.js";

const getAllUser = async(req,res)=>{
    try{
        const user = await User.find()
        return res.status(200).json(user)
    }catch(err){
        return res.status(500).json(err)
    }
}
const deleteUser = async(req,res) =>{
    try{
        const user =await User.findByIdAndDelete(req.params.id)
        return res.status(200).json(" Xoa thanh cong")
    }catch(err){
        return res.status(500).json(err)
    }
}
export default{getAllUser,deleteUser}