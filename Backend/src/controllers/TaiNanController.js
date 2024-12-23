import axios from 'axios';
import Xe from '../models/xe.js';
import TaiNan from '../models/TaiNan.js';
import LichSuTimKiem from '../models/LichSu.js';

const getXeTaiNan = async (req, res) => {
    const bienSo = req.query.bienSo;
    console.log(bienSo);
    const userId = req.user?.id
    if(userId){
      console.log("đã đăng nhập có id",userId)
    }
    if (!bienSo) {
        return res.status(400).json({ error: 'Biển số xe là bắt buộc.' });
    }

    try {
        let xe = await Xe.findOne({bienSo})
        let taiNan = xe ? await TaiNan.findOne({xe: xe._id}):null
        if(xe&&taiNan){
            taiNan.hinhAnh = taiNan.hinhAnh.map((img) => {
                if (img.startsWith('http')) {
                  return img; 
                }else{
                    return `http://localhost:5000/uploads/${img}` }
              });
              if (userId) {
                await LichSuTimKiem.create({
                    userId,
                    bienSoTimKiem: bienSo,
                    tainanTimKiem: `Tai nạn: ${taiNan.moTa}`,
                });
            }
            return res.status(200).json({xe,taiNan})
        }
        const response = await axios.get(`https://checkoto.vn/api/tra-cuu-xe-tai-nan.php?bienso=${bienSo}`);
        console.log(response.data);

        const { data } = response.data;
        if (!data || !data.bienso || !data.image || !data.detail) {
            return res.status(404).json({ error: 'Dữ liệu không đầy đủ để xử lý.' });
        }
        
        if(!xe){
            xe = await Xe.createXe(data.bienso)
        }
        taiNan = await TaiNan.findOne({ xe: xe._id, linkBV: data.source });

        if (!taiNan) {
            const taiNanData = {
                xe: xe._id,
                hinhAnh: data.image || [],
                moTa: decodeURIComponent(data.detail) || 'Không có mô tả',
                linkBV: data.source|| 'Không có nguồn'
            }
            taiNan = await TaiNan.createTaiNan(taiNanData.xe, taiNanData.hinhAnh, taiNanData.moTa,taiNanData.linkBV,true);
        }
        if(userId){
          await LichSuTimKiem.create({
            userId,
            bienSoTimKiem:bienSo,
            tainanTimKiem:taiNan ? `Tai nạn: ${taiNan.moTa}` : "Không có tai nạn",
          })
        }
        res.status(200).json({ xe, taiNan });
    } catch (error) {
        console.error('Lỗi khi gọi API từ checkoto.vn:', error);
        res.status(500).json({ error: 'Lỗi khi truy xuất dữ liệu từ API.' });
    }
};
const getTaiNan = async(req,res)=>{
    try{
        const taiNan = await TaiNan.getTaiNan()
        res.status(200).json(taiNan);
        
    }catch(error){
        console.error('Lỗi khi lấy dữ liệu tai nạn gần nhất:', error);
        res.status(500).json({ error: 'Lỗi khi lấy dữ liệu tai nạn gần nhất.' });
    }
}
const dongGopDuLieu = async (req, res) => {
    const { bienSo, moTa, linkBV } = req.body;
    const hinhAnh = req.file ? req.file.filename : null;
  
    if (!bienSo || !hinhAnh || !moTa) {
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
    }
  
    try {
      let xe = await Xe.findOne({ bienSo });
      if (!xe) {
        xe = await Xe.createXe(bienSo);
      }
      const taiNan = await TaiNan.createTaiNan(xe._id, hinhAnh, moTa, linkBV,false);
  
      return res.status(201).json({
        message: 'Vụ tai nạn đã được đóng góp thành công',
        taiNan,
      });
    } catch (error) {
      console.error('Lỗi khi xử lý đóng góp:', error);
      return res.status(500).json({ message: 'Lỗi khi xử lý dữ liệu.' });
    }
  };
const getTaiNanChoDuyet = async(req,res)=>{
  try {
    const z = await TaiNan.getTaiNanChoDuyet();
    res.status(200).json(z);
  }catch(error) {
    console.error('Lỗi khi lấy danh sách tai nạn chờ duyệt:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách tai nạn chờ duyệt.' });
}}
const deleteTaiNan = async (req, res) => {
  const { id } = req.params;
  try {
      const taiNan = await TaiNan.findByIdAndDelete(id);
      res.status(200).json({
          message: 'Tai nạn đã được xóa thành công.'  });
  } catch (error) {
      console.error('Lỗi khi xóa tai nạn:', error);
      res.status(500).json({ error: 'Lỗi khi xóa tai nạn.' });
  }
};
const doneTaiNan = async(req,res)=>{
    const { id } = req.params; 
    try {
        const taiNan = await TaiNan.xacNhanTaiNan(id); 
        return res.status(200).json({
            message: 'Tai nạn đã được duyệt thành công.',
            taiNan, });
    } catch (error) {
        console.error('Lỗi khi duyệt tai nạn:', error);
        return res.status(500).json({ error: 'Lỗi khi duyệt tai nạn.' });
    }
}
export default { getXeTaiNan, getTaiNan,dongGopDuLieu,getTaiNanChoDuyet,deleteTaiNan,doneTaiNan};
