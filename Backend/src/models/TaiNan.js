import mongoose from "mongoose"
const TaiNanDB = new mongoose.Schema({
    xe:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Xe',
        required:true,
    },
    ngay:{
        type: Date,
        default: Date.now
    },
    hinhAnh:[String],
    moTa : String,
    linkBV: String,
})
TaiNanDB.statics.createTaiNan = async function (xeId, hinhAnh, moTa, linkBV) {
    const taiNan = new this({
        xe: xeId,
        hinhAnh,
        moTa,
        linkBV
    });
    return await taiNan.save();
    
}
TaiNanDB.statics.getTaiNan = async function () {
    try {
        const taiNans = await this.find({}).populate('xe', 'bienSo').exec();
        const updatedTaiNans = taiNans.map((taiNan) => {
            const updatedHinhAnh = taiNan.hinhAnh.map((img) => {
                if (img.startsWith('http')) {
                    return img;
                }
                return `${process.env.BASE_URL || 'http://localhost:5000'}/uploads/${img}`;
            });
            return {
                ...taiNan._doc,
                hinhAnh: updatedHinhAnh,
            };
        });

        return updatedTaiNans;
    } catch (error) {
        console.log("Lỗi khi lấy db tai nạn"+ error)
    }
    
}
const TaiNan = mongoose.model('TaiNan',TaiNanDB)
export default TaiNan