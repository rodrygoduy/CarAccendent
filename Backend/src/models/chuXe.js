import mongoose from "mongoose";

const chuXeSchema = new mongoose.Schema({
  xe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Xe',
    required: true,
  },
  tenChuXe: String,
  soDienThoai: String,
  email: String,
});

const ChuXe = mongoose.model('ChuXe', chuXeSchema);
export default ChuXe;
