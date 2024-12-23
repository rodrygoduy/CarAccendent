import LichSuTimKiem from "../models/LichSu.js";

const luuLichSu = async (req, res) => {
  const { bienSoTimKiem, taiNanTimKiem } = req.body;

  if (!bienSoTimKiem || typeof bienSoTimKiem !== "string") {
    return res.status(400).json("Biển số tìm kiếm không hợp lệ");
  }

  try {
    const history = new LichSuTimKiem({
      userId: req.user.userId,
      bienSoTimKiem: bienSoTimKiem.trim(),
      tainanTimKiem: taiNanTimKiem ? taiNanTimKiem.trim() : undefined,
    });
    await history.save();
    return res.status(200).json("Lưu lịch sử thành công");
  } catch (err) {
    console.error("Lỗi khi lưu lịch sử:", err);
    return res.status(500).json("Lỗi lưu lịch sử");
  }
};

const getLichSu = async (req, res) => {
  try {
    console.log("Id nguoi dung",req.user.id)
    const history = await LichSuTimKiem.find({ userId: req.user.id }).sort({  searchedAt: -1, });
    if (history.length === 0) {
      return res.status(404).json("Không có lịch sử nào được tìm thấy");
    }
    return res.status(200).json(history);
  } catch (err) {
    console.error("Lỗi khi lấy lịch sử:", err);
    return res.status(500).json("Lỗi lấy lịch sử");
  }
};
const deleteLichSu = async(req,res)=>{
  try{
    const historyId = req.params.id;
    const deletedHistory = await LichSuTimKiem.findOneAndDelete({
      _id: historyId,
      userId: req.user.id,
      
    });
    res.status(200).json("Xóa lịch sử thành công");
  }catch(err){
    console.log("lỗi xóa lịch sử")
  }
}

export default { luuLichSu, getLichSu ,deleteLichSu};
