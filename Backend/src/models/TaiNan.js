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
    status:{
        type:Boolean,
        default:true,
    }

})
TaiNanDB.statics.createTaiNan = async function (xeId, hinhAnh, moTa, linkBV,status=true) {
    const taiNan = new this({
        xe: xeId,
        hinhAnh,
        moTa,
        linkBV,
        status
    });
    return await taiNan.save();
    
}
TaiNanDB.statics.getTaiNan = async function () {
    try {
        const taiNans = await this.find({ status: true }).populate('xe', 'bienSo').sort({ ngay: -1 }).exec();

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
TaiNanDB.statics.xacNhanTaiNan = async function (id) {
    try {
        const taiNan = await this.findByIdAndUpdate(
            id,{ status: true },{ new: true }
        );

        if (!taiNan) {
            throw new Error('Không tìm thấy tai nạn với ID được cung cấp.');
        }

        return taiNan;
    } catch (error) {
        console.log("Lỗi khi duyệt tai nạn: " + error);
    }
};
TaiNanDB.statics.getTaiNanChoDuyet= async function () {
    try {
        const choDuyet = await this.find({ status: false }).populate('xe', 'bienSo').sort({ ngay: -1 }).exec();
        const updatedChoDuyet = choDuyet.map((taiNan) => {
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

        return updatedChoDuyet

    } catch (error) {
        console.error('Lỗi khi lấy danh sách tai nạn chờ duyệt:', error);
        throw error;
    }
};
TaiNanDB.statics.deleteTaiNan = async function (id) {
    try {
        const taiNan = await this.findByIdAndDelete(id);
        return taiNan;
    } catch (error) {
        console.error('Lỗi khi xóa tai nạn:', error);
        throw error;
    }
};
const TaiNan = mongoose.model('TaiNan',TaiNanDB)
export default TaiNan