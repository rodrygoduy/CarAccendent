import mongoose from "mongoose";
const PhatNguoiDB = new mongoose.Schema({
    xe:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Xe',
        required:true,
    },
    MauBien : String,
    LoaiPhuongTien: String,
    ThoiGianViPham: Date,
    DiaDiemViPham: String,
    HanhViViPham: String,
    TrangThai: String,
    DonViPhatHien:String,
    NoiGiaiQuyet:[String]
})
PhatNguoiDB.statics.createPhatNguoi = async function (xeId, MauBien, LoaiPhuongTien,ThoiGianViPham,DiaDiemViPham,HanhViViPham,TrangThai,DonViPhatHien,NoiGiaiQuyet) {
    const phatNguoi = new this({
        xe: xeId, MauBien, LoaiPhuongTien,ThoiGianViPham,DiaDiemViPham,HanhViViPham,TrangThai,DonViPhatHien,NoiGiaiQuyet
        
    });
    return await phatNguoi.save();
    
}


const PhatNguoi = mongoose.model('PhatNguoi',PhatNguoiDB)
export default PhatNguoi