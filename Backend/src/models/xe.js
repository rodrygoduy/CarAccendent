import mongoose from "mongoose"
const xeDB = new mongoose.Schema({
    bienSo:{
        type : String,
        require:true,
        unique:true,
    }
})
xeDB.statics.createXe = async function (bienSo) {
    const xe = new this({bienSo});
    return await xe.save()
    
}
const Xe = mongoose.model('Xe',xeDB)
export default Xe